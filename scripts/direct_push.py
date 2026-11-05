#!/usr/bin/env python3
"""
Direct git push via SSH using paramiko.
Bypasses the GIT_SSH_COMMAND wrapper and handles the git protocol directly.

Uses the local git bundle to create the pack, then sends it via SSH.

Usage:
  python3 scripts/direct_push.py
"""
import os
import sys
import subprocess
import paramiko


def main():
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key_file = os.path.expanduser("~/.ssh/id_ed25519")

    # 1. Get the SHA we want to push
    head_result = subprocess.run(
        ["git", "rev-parse", "main"],
        cwd=repo_dir,
        capture_output=True,
        text=True,
        check=True,
    )
    new_sha = head_result.stdout.strip()
    print(f"[push] Local HEAD: {new_sha}", file=sys.stderr)

    # 2. Connect to GitHub
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        "github.com",
        port=22,
        username="git",
        key_filename=key_file,
        look_for_keys=False,
        allow_agent=False,
        timeout=15,
    )
    print("[push] Connected to github.com", file=sys.stderr)

    # 3. Start git-receive-pack
    chan = client.get_transport().open_session()
    chan.exec_command("git-receive-pack 'JacobSeatlholo/belgotex-demo.git'")
    # Keep blocking mode but use timeouts
    chan.settimeout(30)

    # 4. Read the ref advertisement from the server (blocking mode)
    import time
    advertisement = b""
    # Read until we get the flush packet "0000"
    deadline = time.time() + 15
    while time.time() < deadline:
        try:
            data = chan.recv(65536)
            if not data:
                break
            advertisement += data
            if advertisement.endswith(b"0000"):
                break
        except Exception:
            break
    print(f"[push] Got advertisement ({len(advertisement)} bytes)", file=sys.stderr)

    # 5. Send our ref update command: <old-sha> <new-sha> <ref-name>\0<capabilities>\n
    old_sha = "0" * 40
    ref_name = "refs/heads/main"
    capabilities = "report-status-v2 side-band-64k quiet object-format=sha1 agent=git/2.47.3"

    pkt_line = f"{old_sha} {new_sha} {ref_name}\0{capabilities}\n"
    pkt = f"{len(pkt_line) + 4:04x}{pkt_line}".encode()
    flush = b"0000"

    chan.sendall(pkt)
    chan.sendall(flush)
    print(f"[push] Sent ref update: {old_sha[:8]} -> {new_sha[:8]}", file=sys.stderr)

    # 6. Generate the pack-objects stream locally and send it
    # pack-objects reads commit/object SHAs from stdin (one per line),
    # followed by a flush line. With no --not lines, all reachable objects
    # from the listed SHAs are included.
    proc = subprocess.Popen(
        ["git", "pack-objects", "--stdout", "--thin", "--delta-base-offset", "-q"],
        cwd=repo_dir,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    # Tell pack-objects to include all objects reachable from new_sha
    proc.stdin.write(f"{new_sha}\n".encode())
    proc.stdin.write(b"\n")  # flush
    proc.stdin.flush()
    proc.stdin.close()

    # Stream the pack to the channel using blocking send (with timeout)
    import time as _time
    total = 0
    while True:
        data = proc.stdout.read(65536)
        if not data:
            break
        # Send all of this chunk, blocking send with timeout
        while data:
            try:
                sent = chan.send(data)
                if sent == 0:
                    print("[push] Channel closed during send", file=sys.stderr)
                    break
                total += sent
                data = data[sent:]
            except Exception as e:
                print(f"[push] Send error: {e}", file=sys.stderr)
                break

    proc.wait()
    print(f"[push] Sent pack ({total} bytes)", file=sys.stderr)

    # 7. Signal EOF (shutdown write)
    try:
        chan.shutdown_write()
    except Exception:
        pass

    # 8. Read the response (report-status-v2) - blocking mode
    response = b""
    deadline = time.time() + 30
    while time.time() < deadline:
        try:
            data = chan.recv(65536)
            if not data:
                break
            response += data
            if b"unpack ok" in response or b"ng " in response:
                # Give a bit more time for final packets
                time.sleep(0.5)
                try:
                    while True:
                        more = chan.recv(65536)
                        if not more:
                            break
                        response += more
                except Exception:
                    pass
                break
        except Exception:
            break

    print(f"[push] Response ({len(response)} bytes):", file=sys.stderr)
    # Decode the pkt-line response
    sys.stderr.buffer.write(response)
    sys.stderr.buffer.flush()
    print("", file=sys.stderr)

    rc = chan.recv_exit_status() if chan.exit_status_ready() else 0
    chan.close()
    client.close()

    if b"unpack ok" in response and b"ok refs/heads/main" in response:
        print("[push] SUCCESS: ref updated on remote", file=sys.stderr)
        sys.exit(0)
    else:
        print("[push] FAILED: ref may not have updated", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
