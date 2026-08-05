#!/usr/bin/env bash
#
# Blog Publisher - Publish articles to zhchxiao123.github.io
#
# Usage:
#   bash publish.sh --file /path/to/article.md --slug "english-slug"
#
# Options:
#   --file       Path to the markdown article file (required)
#   --slug       English slug for the filename (required)
#   --date       Override date in YYYY-MM-DD format (default: today)
#   --repo-dir   Local clone directory (default: /tmp/blog-repo)
#   --remote     Git remote URL (default: from GITHUB_TOKEN or SSH)
#   --dry-run    Prepare file but don't commit/push
#   --branch     Target branch (default: main)

set -euo pipefail

# ── Defaults ──────────────────────────────────────────────────
TODAY=$(date +%Y-%m-%d)
DATETIME=$(date "+%Y-%m-%d %H:%M:%S +0800")
REPO_DIR=""
DRY_RUN=false
BRANCH="main"
REPO_OWNER="zhchxiao123"
REPO_NAME="zhchxiao123.github.io"
SLUG=""
FILE=""
POST_DATE="$TODAY"

# ── Colors ────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log()  { echo -e "${GREEN}[INFO]${NC}  $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()  { echo -e "${RED}[ERR]${NC}   $1"; }

# ── Parse arguments ───────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --file)       FILE="$2"; shift 2 ;;
        --slug)       SLUG="$2"; shift 2 ;;
        --date)       POST_DATE="$2"; shift 2 ;;
        --repo-dir)   REPO_DIR="$2"; shift 2 ;;
        --remote)     REMOTE_URL="$2"; shift 2 ;;
        --dry-run)    DRY_RUN=true; shift ;;
        --branch)     BRANCH="$2"; shift 2 ;;
        *)
            err "Unknown argument: $1"
            echo "Usage: bash publish.sh --file <path> --slug <slug> [--dry-run] [--date YYYY-MM-DD]"
            exit 1
            ;;
    esac
done

# ── Validate ───────────────────────────────────────────────────
if [[ -z "$FILE" ]]; then
    err "--file is required"
    exit 1
fi
if [[ -z "$SLUG" ]]; then
    # Try to derive slug from filename
    SLUG=$(basename "$FILE" .md | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//')
    if [[ -z "$SLUG" ]]; then
        err "--slug is required (cannot derive from filename)"
        exit 1
    fi
    warn "Slug derived from filename: $SLUG"
fi
if [[ ! -f "$FILE" ]]; then
    err "File not found: $FILE"
    exit 1
fi

# Sanitize slug: lowercase, replace spaces/non-alnum with dash, collapse dashes
SLUG=$(echo "$SLUG" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

POST_FILENAME="${POST_DATE}-${SLUG}.md"

log "Article file: $FILE"
log "Post filename: $POST_FILENAME"
log "Slug: $SLUG"
log "Date: $POST_DATE"

# ── Extract title from frontmatter for commit message ──────────
POST_TITLE=$(grep -m1 '^title:' "$FILE" | sed 's/^title:\s*//' | sed 's/^"//;s/"$//' | sed "s/^'//;s/'$//" || echo "$SLUG")
if [[ -z "$POST_TITLE" ]]; then
    POST_TITLE="$SLUG"
fi

# ── Dry-run: show preview and exit (skip all git operations) ──
if [[ "$DRY_RUN" == true ]]; then
    echo ""
    echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  🔍 DRY RUN — 预览模式（不会实际操作仓库）${NC}"
    echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  📝 标题:       ${YELLOW}$POST_TITLE${NC}"
    echo -e "  📄 源文件:     ${YELLOW}$FILE${NC}"
    echo -e "  📅 发布日期:   ${YELLOW}$POST_DATE${NC}"
    echo -e "  🏷  Slug:       ${YELLOW}$SLUG${NC}"
    echo -e "  📁 目标文件:   ${YELLOW}_posts/$POST_FILENAME${NC}"
    echo -e "  🌿 分支:       ${YELLOW}$BRANCH${NC}"
    echo ""
    echo -e "  ${BLUE}─── Frontmatter 预览 ───${NC}"
    grep -A20 '^---$' "$FILE" | head -20 | sed 's/^/  | /' || true
    echo ""
    echo -e "  ${BLUE}─── 即将执行 ───${NC}"
    echo -e "  1. clone/pull 仓库"
    echo -e "  2. 写入 _posts/$POST_FILENAME"
    echo -e "  3. git commit -m \"Add post: $POST_TITLE\""
    echo -e "  4. git push origin $BRANCH"
    echo ""
    echo -e "  ${BLUE}─── 发布后 URL ───${NC}"
    echo -e "  🔗 ${BLUE}https://zhchxiao123.github.io/posts/$SLUG/${NC}"
    echo ""
    log "Dry run complete. 去掉 --dry-run 即可正式发布。"
    exit 0
fi

# ── Determine git remote ──────────────────────────────────────
if [[ -z "${REMOTE_URL:-}" ]]; then
    if [[ -n "${GITHUB_TOKEN:-}" ]]; then
        REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git"
        log "Using GITHUB_TOKEN for authentication"
    else
        REMOTE_URL="git@github.com:${REPO_OWNER}/${REPO_NAME}.git"
        log "Using SSH for authentication (no GITHUB_TOKEN set)"
    fi
fi

# ── Prepare local clone ────────────────────────────────────────
if [[ -z "$REPO_DIR" ]]; then
    REPO_DIR="/tmp/blog-publisher-${REPO_NAME}"
fi

if [[ -d "$REPO_DIR/.git" ]]; then
    log "Pulling latest from existing clone: $REPO_DIR"
    git -C "$REPO_DIR" checkout "$BRANCH" 2>/dev/null || true
    git -C "$REPO_DIR" pull origin "$BRANCH" --ff-only 2>/dev/null || {
        warn "Pull failed, resetting to remote..."
        git -C "$REPO_DIR" fetch origin "$BRANCH"
        git -C "$REPO_DIR" reset --hard "origin/$BRANCH"
    }
else
    log "Cloning blog repo..."
    git clone --depth 1 --branch "$BRANCH" "$REMOTE_URL" "$REPO_DIR"
fi

# ── Configure git user if not set ──────────────────────────────
if [[ -z "$(git -C "$REPO_DIR" config user.name 2>/dev/null || true)" ]]; then
    git -C "$REPO_DIR" config user.name "zhchxiao123"
    log "Set git user.name = zhchxiao123"
fi
if [[ -z "$(git -C "$REPO_DIR" config user.email 2>/dev/null || true)" ]]; then
    git -C "$REPO_DIR" config user.email "zhchxiao123@users.noreply.github.com"
    log "Set git user.email = zhchxiao123@users.noreply.github.com"
fi

# ── Check if post slug already exists ─────────────────────────
EXISTING=$(find "$REPO_DIR/_posts" -name "*-${SLUG}.md" 2>/dev/null || true)
if [[ -n "$EXISTING" ]]; then
    warn "A post with slug '$SLUG' already exists:"
    warn "  $(basename "$EXISTING")"
    warn "Continuing will OVERWRITE it."
fi

# ── Ensure _posts directory exists ────────────────────────────
mkdir -p "$REPO_DIR/_posts"

# ── Copy post file ─────────────────────────────────────────────
DEST="$REPO_DIR/_posts/$POST_FILENAME"
cp "$FILE" "$DEST"
log "Copied article to: _posts/$POST_FILENAME"

# ── Commit ─────────────────────────────────────────────────────
git -C "$REPO_DIR" add "_posts/$POST_FILENAME"
git -C "$REPO_DIR" commit -m "Add post: $POST_TITLE

Published via Claude Code blog-publisher skill.
Slug: $SLUG
Date: $POST_DATE"

log "Committed: Add post: $POST_TITLE"

# ── Push ───────────────────────────────────────────────────────
git -C "$REPO_DIR" push origin "$BRANCH"

# ── Done ───────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 文章发布成功！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  📝 标题: ${YELLOW}$POST_TITLE${NC}"
echo -e "  🔗 URL:  ${BLUE}https://zhchxiao123.github.io/posts/$SLUG/${NC}"
echo -e "  📅 日期: $POST_DATE"
echo ""
echo -e "  GitHub Actions 将自动部署（约 1-2 分钟后可访问）。"
echo ""
