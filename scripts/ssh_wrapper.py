#!/usr/bin/env python3
"""
SSH command wrapper using paramiko, so `git push` works in environments
without an `ssh` binary (like this sandbox).

Mimics the subset of `ssh` behavior that git needs:
  ssh [-p PORT] [-i KEYFILE] [-o OPTION=VALUE...] user@host COMMAND

Used via:  GIT_SSH_COMMAND="python3 /path/to/ssh_wrapper.py"
"""
import os
import sys
import select
import threading
import paramiko


def parse_args(argv):
    port = 22
    key_file = os.path.expanduser("~/.ssh/id_ed25519")
    options = {}
    target = None
    command = None

    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "-p":
            port = int(argv[i + 1]); i += 2; continue
        if a.startswith("-p"):
            port = int(a[2:]); i += 1; continue
        if a == "-i":
            key_file = argv[i + 1]; i += 2; continue
        if a.startswith("-i"):
            key_file = a[2:]; i += 1; continue
        if a == "-o":
            k, _, v = argv[i + 1].partition("=")
            options[k] = v; i += 2; continue
        if a.startswith("-o"):
            k, _, v = a[2:].partition("=")
            options[k] = v; i += 1; continue
        if a.startswith("-"):
            i += 1; continue
        if target is None:
            target = a; i += 1; continue
        command = " ".join(argv[i:])
        break

    if target is None:
        sys.stderr.write("ssh_wrapper: no target host\n")
        sys.exit(2)

    user, _, host = target.partition("@")
    if not host:
        host = user
        user = "git"

    return port, key_file, options, user, host, command


def main():
    port, key_file, options, user, host, command = parse_args(sys.argv[1:])

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
            timeout=20,
            banner_timeout=20,
            auth_timeout=20,
        )
    except paramiko.AuthenticationException as e:
        sys.stderr.write(f"ssh_wrapper: authentication failed: {e}\n")
        sys.stderr.write(
            "\nThe SSH public key has NOT been added to GitHub yet.\n"
            "Add this key as a Deploy Key on the repo (Settings > Deploy keys > Add deploy key)\n"
            "or as a personal SSH key on your GitHub account (Settings > SSH and GPG keys).\n\n"
            "Public key to add:\n\n"
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

    if command is None:
        sys.stderr.write("ssh_wrapper: no command given\n")
        client.close()
        sys.exit(2)

    transport = client.get_transport()
    chan = transport.open_session()
    chan.exec_command(command)
    chan.setblocking(False)

    def pump_stdin():
        try:
            while True:
                data = os.read(0, 65536)
                if not data:
                    try:
                        chan.shutdown_write()
                    except Exception:
                        pass
                    break
                chan.sendall(data)
        except Exception:
            pass

    t = threading.Thread(target=pump_stdin, daemon=True)
    t.start()

    while True:
        r, _, _ = select.select([chan], [], [], 1.0)
        if chan.recv_ready():
            data = chan.recv(65536)
            if not data:
                break
            sys.stdout.buffer.write(data)
            sys.stdout.buffer.flush()
        if chan.recv_stderr_ready():
            data = chan.recv_stderr(65536)
            sys.stderr.buffer.write(data)
            sys.stderr.buffer.flush()
        if chan.exit_status_ready() and not chan.recv_ready() and not chan.recv_stderr_ready():
            break

    rc = chan.recv_exit_status() if chan.exit_status_ready() else 0
    chan.close()
    client.close()
    sys.exit(rc)


if __name__ == "__main__":
    main()
