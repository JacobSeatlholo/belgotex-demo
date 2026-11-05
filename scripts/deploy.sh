#!/usr/bin/env bash
# deploy.sh — pushes the Belgotex demo to GitHub via SSH.
#
# Prereq: add the public key (download/github_ssh_public_key.txt) as a
# Deploy Key on https://github.com/JacobSeatlholo/belgotex-demo/settings/keys
# (tick "Allow write access") OR as a personal SSH key on your GitHub account.
#
# Run from the project root:  bash scripts/deploy.sh

set -e

cd "$(dirname "$0")/.."

echo "=== Belgotex demo — deploy to GitHub ==="
echo
echo "Public key (already in download/github_ssh_public_key.txt):"
echo
cat download/github_ssh_public_key.txt
echo
echo ">>> Add that key to GitHub now, then press Enter to push..."
read -r _ok

# Try ssh-keygen first (native); fall back to the paramiko wrapper.
if command -v ssh >/dev/null 2>&1; then
  GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=accept-new" \
    git push -u origin main
else
  echo "(no native ssh — using paramiko wrapper)"
  GIT_SSH_COMMAND="python3 scripts/ssh_wrapper.py" \
    git push -u origin main
fi

echo
echo "=== Push complete ==="
echo "Repo:   https://github.com/JacobSeatlholo/belgotex-demo"
echo "Deploy: https://vercel.com/new (import the repo — Vercel auto-detects Next.js)"
