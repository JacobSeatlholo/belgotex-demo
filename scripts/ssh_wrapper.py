#!/usr/bin/env python3
"""
SSH wrapper for git using paramiko's exec_command.

The trick: paramiko's exec_command returns a Channel where stdout.channel
IS the channel and is bidirectional. We can write to it AND read from it.

Usage:
  GIT_SSH_COMMAND="python3 scripts/ssh_wrapper.py" git push ...
"""
import os
import sys
import select
import threading
import paramiko


def parse_args(argv):
    port = 22
    key_file = os.path.expanduser("~/.ssh/id_ed25519")
    target = None
    command_parts = []

    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "-p":
            port = int(argv[i + 1]); i += 2; continue
        if a.startswith("-p") and len(a) > 2:
            port = int(a[2:]); i += 1; continue
        if a == "-i":
            key_file = argv[i + 1]; i += 2; continue
        if a.startswith("-i") and len(a) > 2:
            key_file = a[2:]; i += 1; continue
        if a == "-o":
            i += 2; continue
        if a.startswith("-o") and "=" in a:
            i += 1; continue
        if a.startswith("-G"):
            i += 1; continue
        if a.startswith("-"):
            i += 1; continue
        if target is None:
            target = a; i += 1; continue
        command_parts = argv[i:]
        break

    if target is None:
        sys.stderr.write("ssh_wrapper: no target host\n")
        sys.exit(2)

    user, _, host = target.partition("@")
    if not host:
        host = user
        user = "git"

    return port, key_file, user, host, " ".join(command_parts)


def main():
    port, key_file, user, host, command = parse_args(sys.argv[1:])

    if not command:
        sys.stderr.write("ssh_wrapper: no command given\n")
        sys.exit(2)

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        client.connect(
            hostname=host,
            port=port,
            username=user,
            key_filename=key_file,
            look_for_keys=False,
            allow_agent=False,
            timeout=15,
            banner_timeout=15,
            auth_timeout=15,
        )
    except paramiko.AuthenticationException as e:
        sys.stderr.write(f"ssh_wrapper: authentication failed: {e}\n\n")
        sys.stderr.write(
            "The SSH public key has NOT been added to GitHub yet.\n"
            "Add this key as a Deploy Key (with write access) on the repo at\n"
            "Settings > Deploy keys > Add deploy key, or as a personal SSH key\n"
            "at Settings > SSH and GPG keys:\n\n"
        )
        try:
            with open(os.path.expanduser("~/.ssh/id_ed25519.pub")) as f:
                sys.stderr.write(f.read())
        except OSError:
            pass
        sys.exit(1)
    except Exception as e:
        sys.stderr.write(f"ssh_wrapper: connection error: {e}\n")
        sys.exit(1)

    transport = client.get_transport()
    chan = transport.open_session()
    # IMPORTANT: do not request a PTY for git
    chan.exec_command(command)

    # Set non-blocking
    chan.setblocking(False)

    # Background: pump stdin (fd 0) -> channel.send
    def pump_stdin():
        try:
            while True:
                data = os.read(0, 65536)
                if not data:
                    # EOF on stdin
                    try:
                        chan.shutdown_write()
                    except Exception:
                        pass
                    return
                # Send with retry on WouldBlock
                while data:
                    try:
                        sent = chan.send(data)
                        if sent == 0:
                            return
                        data = data[sent:]
                    except Exception:
                        return
        except Exception:
            pass

    t = threading.Thread(target=pump_stdin, daemon=True)
    t.start()

    # Main: read channel -> stdout/stderr
    rc = 0
    try:
        while True:
            r, _, _ = select.select([chan], [], [], 1.0)
            if r:
                if chan.recv_ready():
                    data = chan.recv(65536)
                    if not data:
                        break
                    sys.stdout.buffer.write(data)
                    sys.stdout.buffer.flush()
                if chan.recv_stderr_ready():
                    data = chan.recv_stderr(65536)
                    if data:
                        sys.stderr.buffer.write(data)
                        sys.stderr.buffer.flush()
            if chan.exit_status_ready():
                # Drain
                while chan.recv_ready():
                    data = chan.recv(65536)
                    if not data:
                        break
                    sys.stdout.buffer.write(data)
                    sys.stdout.buffer.flush()
                while chan.recv_stderr_ready():
                    data = chan.recv_stderr(65536)
                    if not data:
                        break
                    sys.stderr.buffer.write(data)
                    sys.stderr.buffer.flush()
                rc = chan.recv_exit_status()
                break
    finally:
        t.join(timeout=2)
        chan.close()
        client.close()

    sys.exit(rc)


if __name__ == "__main__":
    main()
