#!/usr/bin/env bash
# deploy.sh — pushes the Belgotex demo to GitHub via SSH.
#
# This script works in sandboxed environments without a native ssh binary
# by using a paramiko-based Python wrapper (scripts/direct_push.py).
#
# Prereq: add the public key (download/github_ssh_public_key.txt) as a
# Deploy Key on https://github.com/JacobSeatlholo/belgotex-demo/settings/keys
# (tick "Allow write access") OR as a personal SSH key on your GitHub account.
#
# Run from the project root:  bash scripts/deploy.sh

set -e

cd "$(dirname "$0")/.."

echo "=== Belgotex demo, push to GitHub ==="
echo
echo "Repo: https://github.com/JacobSeatlholo/belgotex-demo"
echo

# Use direct_push.py (paramiko-based git protocol) for reliable pushes
# from sandbox environments without a native ssh binary.
python3 scripts/direct_push.py

echo
echo "=== Push complete ==="
echo "Repo:   https://github.com/JacobSeatlholo/belgotex-demo"
echo "Deploy: https://vercel.com/new (import the repo, Vercel auto-detects Next.js)"
