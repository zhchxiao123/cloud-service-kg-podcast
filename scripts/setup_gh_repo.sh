#!/usr/bin/env bash
set -euo pipefail

# Helper script to initialize a local git repo and push to GitHub.
# Run this after creating a new empty repo on GitHub named cloud-service-kg-podcast.

REPO_URL="https://github.com/zhchxiao123/cloud-service-kg-podcast.git"

cd "$(dirname "$0")/.."

echo "Initializing git repository..."
git init -b main

echo "Adding files..."
git add .

echo "Committing..."
git commit -m "Initial commit: podcast series skeleton and cloud-service-kg project

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "Adding remote..."
git remote add origin "$REPO_URL"

echo "Pushing to GitHub..."
git push -u origin main

echo "Done. Next steps:"
echo "1. Enable GitHub Pages (Settings > Pages > Source: GitHub Actions or main branch /docs)"
echo "2. Enable Zenodo–GitHub integration (https://zenodo.org/account/settings/github/)"
echo "3. Create the first release v0.1.0-alpha after EP01 launches"
