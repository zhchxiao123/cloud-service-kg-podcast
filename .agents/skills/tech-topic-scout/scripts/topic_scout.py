#!/usr/bin/env python3
"""
topic_scout.py — 科技商业选题每日抓取器

多源抓取 → 主题聚合打分 → 输出当日 Top 选题清单(JSON + 可读文本)

依赖:
    pip install requests feedparser

用法:
    python3 topic_scout.py
    python3 topic_scout.py --top 15 --hours 48
    python3 topic_scout.py --out topics.json
"""

import argparse
import json
import re
import sys
import time
from collections import defaultdict
from datetime import datetime, timezone, timedelta

import requests

try:
    import feedparser
except ImportError:
    print("缺少 feedparser，请先运行: pip install feedparser", file=sys.stderr)
    sys.exit(1)


UA = {"User-Agent": "Mozilla/5.0 (compatible; TopicScout/1.0)"}
TIMEOUT = 20


# ============================================================
# 配置区：在这里增删信息源
# ============================================================

# Medium tag RSS（科技商业相关）
MEDIUM_TAGS = [
    "technology", "startup", "business", "venture-capital",
    "artificial-intelligence", "software-engineering", "tech",
]

# 其他通用 RSS 源（媒体 / Substack / 工程博客等）
GENERIC_RSS = [
    ("TechCrunch", "https://techcrunch.com/feed/"),
    ("The Verge", "https://www.theverge.com/rss/index.xml"),
    ("Ars Technica", "https://feeds.arstechnica.com/arstechnica/index"),
    ("Hacker News (frontpage)", "https://hnrss.org/frontpage"),
    # 在这里加你自己的 Substack: ("名字", "https://xxx.substack.com/feed"),
]

# 关键词权重：标题命中这些词额外加分（按你的"科技商业"主题调）
KEYWORD_WEIGHTS = {
    "startup": 2, "funding": 3, "raised": 3, "acquisition": 3, "acquired": 3,
    "ipo": 3, "shutdown": 3, "bankrupt": 3, "layoff": 2, "valuation": 2,
    "ai": 2, "openai": 2, "revenue": 2, "growth": 1, "founder": 2,
    "billion": 2, "million": 1, "why": 2, "how": 1, "failed": 3, "rise": 2,
    "collapse": 3, "pivot": 2, "strategy": 1,
}

STOPWORDS = set("""a an the of to in on for and or with how why what is are was were
this that these those from at by as it its their his her our your my we you they i
new your you're about into over under more most than then them out up down""".split())


# ============================================================
# 抓取器
# ============================================================

def fetch_hn_algolia(hours=24, min_points=50, max_items=60):
    """Hacker News via Algolia Search API —— 自带社区热度排序，主源"""
    since = int((datetime.now(timezone.utc) - timedelta(hours=hours)).timestamp())
    url = "https://hn.algolia.com/api/v1/search_by_date"
    params = {
        "tags": "story",
        "numericFilters": f"created_at_i>{since},points>{min_points}",
        "hitsPerPage": max_items,
    }
    out = []
    try:
        r = requests.get(url, params=params, headers=UA, timeout=TIMEOUT)
        r.raise_for_status()
        for hit in r.json().get("hits", []):
            title = hit.get("title")
            link = hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
            if not title:
                continue
            points = hit.get("points", 0) or 0
            comments = hit.get("num_comments", 0) or 0
            # HN 用真实社区分数作为热度
            heat = points + comments * 1.5
            out.append({
                "title": title.strip(),
                "link": link,
                "source": "HackerNews",
                "heat": heat,
                "discuss": f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
            })
    except Exception as e:
        print(f"[HN] 抓取失败: {e}", file=sys.stderr)
    return out


def fetch_rss(name, url, hours=48, max_items=25):
    """通用 RSS 抓取"""
    out = []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=hours)
    try:
        feed = feedparser.parse(url, request_headers=UA)
        for entry in feed.entries[:max_items]:
            title = getattr(entry, "title", "").strip()
            if not title:
                continue
            # 时间过滤（有的源没有时间则不过滤）
            pub = None
            for key in ("published_parsed", "updated_parsed"):
                if getattr(entry, key, None):
                    pub = datetime.fromtimestamp(time.mktime(getattr(entry, key)), tz=timezone.utc)
                    break
            if pub and pub < cutoff:
                continue
            out.append({
                "title": title,
                "link": getattr(entry, "link", ""),
                "source": name,
                "heat": 0,  # RSS 无热度信号，靠关键词和跨源命中加分
                "discuss": "",
            })
    except Exception as e:
        print(f"[{name}] 抓取失败: {e}", file=sys.stderr)
    return out


def fetch_all_medium(tags, hours=48):
    out = []
    for tag in tags:
        out += fetch_rss(f"Medium/{tag}", f"https://medium.com/feed/tag/{tag}", hours=hours)
        time.sleep(0.5)
    return out


# ============================================================
# 主题聚合 + 打分
# ============================================================

def tokenize(title):
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9\-']+", title.lower())
    return [w for w in words if w not in STOPWORDS and len(w) > 2]


def signature(title):
    """用标题的关键词集合做一个粗粒度主题签名，用于跨源去重/聚合"""
    toks = sorted(set(tokenize(title)))
    return frozenset(toks[:8])


def keyword_bonus(title):
    t = title.lower()
    return sum(w for kw, w in KEYWORD_WEIGHTS.items() if kw in t)


def normalize_heat(items):
    """把不同源的 heat 归一化到 0-10，避免 HN 的大分数碾压一切"""
    by_source = defaultdict(list)
    for it in items:
        by_source[it["source"].split("/")[0]].append(it)
    for src, group in by_source.items():
        heats = [g["heat"] for g in group if g["heat"] > 0]
        if not heats:
            for g in group:
                g["norm_heat"] = 0
            continue
        mx = max(heats)
        for g in group:
            g["norm_heat"] = round(10 * g["heat"] / mx, 2) if mx else 0


def aggregate(items, top=12, max_per_source=4):
    normalize_heat(items)
    clusters = defaultdict(list)
    for it in items:
        clusters[signature(it["title"])].append(it)

    scored = []
    for sig, group in clusters.items():
        if not sig:
            continue
        sources = sorted(set(g["source"].split("/")[0] for g in group))
        cross = len(sources)
        best_heat = max(g["norm_heat"] for g in group)
        kw = max(keyword_bonus(g["title"]) for g in group)
        # 综合分：跨源命中=强信号(权重最高) + 关键词(选题质量) + 热度(降权,只占0-3)
        # 热度从 0-10 压到 0-3，避免 HN 的高分碾压无热度的 Medium/RSS
        score = cross * 6 + kw * 1.5 + best_heat * 0.3
        rep = max(group, key=lambda g: (g["norm_heat"], len(g["title"])))
        # 记录该选题归属的主源(代表条目的源)，用于后续按源配额
        primary = rep["source"].split("/")[0]
        scored.append({
            "score": round(score, 2),
            "title": rep["title"],
            "cross_sources": cross,
            "sources": sources,
            "primary_source": primary,
            "heat": best_heat,
            "keyword_bonus": kw,
            "link": rep["link"],
            "discuss": rep.get("discuss", ""),
            "variants": [g["title"] for g in group if g["title"] != rep["title"]][:3],
        })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return diversify(scored, top, max_per_source=max_per_source)


def diversify(scored, top, max_per_source=4):
    """按源配额选取：保证清单多样性，避免单一源霸榜。
    跨源命中(cross>=2)的强信号优先保留，不受配额限制。"""
    selected = []
    per_source = defaultdict(int)

    # 第一轮：跨源命中的强信号无条件先入选(这些本就是最值得做的)
    for t in scored:
        if len(selected) >= top:
            break
        if t["cross_sources"] >= 2:
            selected.append(t)
            per_source[t["primary_source"]] += 1

    # 第二轮：其余按分数填充，但每个源不超过 max_per_source
    for t in scored:
        if len(selected) >= top:
            break
        if t in selected:
            continue
        src = t["primary_source"]
        if per_source[src] >= max_per_source:
            continue
        selected.append(t)
        per_source[src] += 1

    # 第三轮：如果配额太严导致没填满，放宽限制补齐
    if len(selected) < top:
        for t in scored:
            if len(selected) >= top:
                break
            if t not in selected:
                selected.append(t)

    selected.sort(key=lambda x: x["score"], reverse=True)
    return selected


# ============================================================
# 输出
# ============================================================

def print_report(topics):
    print("\n" + "=" * 70)
    print(f"  当日科技商业选题清单 — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 70)
    for i, t in enumerate(topics, 1):
        flag = "🔥" if t["cross_sources"] >= 2 else "  "
        print(f"\n{flag} [{i}] (score {t['score']}) {t['title']}")
        print(f"     来源: {', '.join(t['sources'])}"
              f"{'  ← 多源命中(强信号)' if t['cross_sources']>=2 else ''}")
        print(f"     热度 {t['heat']} | 关键词加分 {t['keyword_bonus']}")
        if t["link"]:
            print(f"     原文: {t['link']}")
        if t["discuss"]:
            print(f"     讨论: {t['discuss']}")

    # 来源分布统计
    dist = defaultdict(int)
    for t in topics:
        dist[t["primary_source"]] += 1
    print("\n" + "-" * 70)
    print("  来源分布: " + " | ".join(f"{src}×{n}" for src, n in sorted(dist.items(), key=lambda x: -x[1])))
    print("=" * 70)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--top", type=int, default=20, help="输出选题数量")
    ap.add_argument("--hours", type=int, default=36, help="时间窗口(小时)")
    ap.add_argument("--per-source", type=int, default=4, help="每个源最多入选数")
    ap.add_argument("--out", type=str, default="", help="输出 JSON 文件路径")
    args = ap.parse_args()

    print("开始抓取多源...", file=sys.stderr)
    items = []

    print("  → Hacker News", file=sys.stderr)
    items += fetch_hn_algolia(hours=args.hours, min_points=40)

    print("  → Medium", file=sys.stderr)
    items += fetch_all_medium(MEDIUM_TAGS, hours=max(args.hours, 48))

    print("  → 媒体/RSS", file=sys.stderr)
    for name, url in GENERIC_RSS:
        items += fetch_rss(name, url, hours=max(args.hours, 48))
        time.sleep(0.3)

    print(f"共抓到 {len(items)} 条原始条目，聚合中...", file=sys.stderr)
    topics = aggregate(items, top=args.top, max_per_source=args.per_source)

    print_report(topics)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump({
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "raw_count": len(items),
                "topics": topics,
            }, f, ensure_ascii=False, indent=2)
        print(f"\n已写入 {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
