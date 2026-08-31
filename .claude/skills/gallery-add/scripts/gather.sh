#!/usr/bin/env bash
# Gather everything a Gallery entry needs about an upstream project, in one pass.
#
# Usage: gather.sh <owner/repo | github url>
#
# Prints four sections: repo metadata (including the default branch, which raw
# asset URLs need), the README, candidate logo/icon assets with sizes, and the
# raw-URL prefix to download from. Requires `gh` to be authenticated.

set -uo pipefail

if [ $# -ne 1 ]; then
  echo "usage: $(basename "$0") <owner/repo | github url>" >&2
  exit 64
fi

# Accept a full URL, a git remote, or a bare owner/repo.
repo="${1#*github.com[:/]}"
repo="${repo#https://}"
repo="${repo#http://}"
repo="${repo#github.com/}"
repo="${repo%.git}"
repo="${repo%/}"

if ! [[ "$repo" =~ ^[^/]+/[^/]+$ ]]; then
  echo "could not read '$1' as owner/repo" >&2
  exit 64
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "gh is not authenticated — run 'gh auth login' first" >&2
  exit 69
fi

echo "=== METADATA ($repo) ==="
gh api "repos/$repo" --jq '{
  full_name,
  description,
  homepage,
  license: .license.spdx_id,
  default_branch,
  archived,
  stars: .stargazers_count,
  topics,
  pushed_at
}' || exit 1

branch=$(gh api "repos/$repo" --jq .default_branch)

echo
echo "=== README ==="
# Trimmed: badge walls and the long credits tail at the bottom are rarely useful,
# and the feature list is almost always in the first couple of screens.
gh api "repos/$repo/readme" --jq '.content' 2>/dev/null | base64 -d | head -120 \
  || echo "(no README)"

echo
echo "=== CANDIDATE LOGO ASSETS (size, path) ==="
echo "Prefer square app icons/brandmarks over README banners; SVG, or 256-512px PNG."
gh api "repos/$repo/git/trees/HEAD?recursive=1" \
  --jq '.tree[] | select(.type=="blob") | select(.path|test("(?i)(icon|logo|appicon|brandmark).*\\.(svg|png)$")) | "\(.size)\t\(.path)"' \
  2>/dev/null | sort -n | head -25 \
  || echo "(none found — check the website or the release assets)"

echo
echo "=== RAW URL PREFIX (default branch: $branch) ==="
echo "https://raw.githubusercontent.com/$repo/$branch/"
echo
echo "Download with:  curl -sSLf -o src/content/gallery/logos/<id>.<ext> '<prefix><path>'"
