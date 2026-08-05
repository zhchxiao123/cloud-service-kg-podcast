---
name: tech-topic-scout
description: Discover and rank trending tech/business topics from multiple sources (Hacker News, Medium, tech media RSS) for content creation — especially short videos, threads, newsletters, or articles. Use this whenever the user wants content ideas, story angles, "what should I make a video about", trending tech/startup/business topics, daily topic research, or anything involving sourcing and ranking topics from across the web for a content pipeline. Trigger even when the user doesn't say "skill" — e.g. "今天有什么科技选题", "find me trending startup stories", "what's hot in tech business today", "give me video ideas about tech".
---

# Tech Topic Scout

Discover and rank trending technology/business topics by aggregating multiple sources, scoring them, and outputting a ranked, diversified topic list ready to feed a content pipeline (video scripts, threads, newsletters).

The core insight: a good topic is one that (a) shows up across multiple independent sources (strong signal), (b) hits "story-worthy" keywords like *failed / acquired / funding / shutdown*, and (c) has community heat. The scoring rewards all three, and a per-source quota keeps any single source (especially high-heat Hacker News) from dominating the list.

## When to use

Use this skill when the user wants:
- Daily/periodic content topic ideas in tech, startups, business, or AI
- Story angles or "what should I make about X" for videos, threads, newsletters, articles
- A ranked list of what's trending across multiple sources, not just one feed
- The first ("discovery") stage of a content production pipeline

## Workflow

### Step 1 — Run the topic scout

Run the bundled script. It requires `requests` and `feedparser`:

```bash
pip install requests feedparser
python scripts/topic_scout.py --top 20 --hours 36 --out topics.json
```

Key flags:
- `--top N` — number of topics in the final list (default 20)
- `--hours N` — time window to look back (default 36)
- `--per-source N` — max topics any single source may contribute (default 4; lower = more diverse)
- `--out FILE` — also write structured JSON (feed this to later pipeline stages)

The script prints a ranked report and (with `--out`) writes JSON. Each topic carries: title, score, which sources it appeared in, cross-source count, community heat, the article link, and a discussion link.

### Step 2 — Help the user pick / refine

After running, present the ranked list. Topics marked 🔥 appeared in **2+ independent sources** — these are the strongest signals and usually the best bets. Point those out first.

If the list looks too dominated by one source, lower `--per-source`. If the user wants a tighter topical focus (e.g. only company rise/fall stories), edit `KEYWORD_WEIGHTS` in the script to up-weight the relevant signal words (see references/sources.md).

### Step 3 — Fetch full article text (NOT YET IMPLEMENTED)

The discovery stage only returns titles + links. To turn a chosen topic into a script, the next stage fetches clean full-text from the article links and synthesizes across multiple sources.

**This stage is a planned extension and is not yet built.** When the user asks to go from topics → full text → script, explain that full-text fetching is the next module to add, and recommend the layered approach documented in `references/sources.md` (trafilatura → Jina Reader → Firecrawl, cheapest-first with fallback). Do not fabricate a `fetch_article.py` — it does not exist yet.

## Customizing sources

All sources live in the config block near the top of `scripts/topic_scout.py`:
- `MEDIUM_TAGS` — Medium tag feeds to pull
- `GENERIC_RSS` — any RSS source (media, Substack, engineering blogs)
- `KEYWORD_WEIGHTS` — words that boost a topic's score (your "taste" encoded)

See `references/sources.md` for the full source catalog, how to add Substack/engineering-blog feeds, and tuning guidance.

## Important notes

- **Hacker News** is fetched via the Algolia HN Search API (free, no auth) and carries real community scores — it's the primary heat signal.
- **Reddit was intentionally removed** — its public endpoints now block unauthenticated requests. If the user wants it back, it requires registering a Reddit app and using the `praw` library with OAuth.
- **Skip paywalled articles** (e.g. Medium members-only, The Information) for full-text synthesis — they're often un-fetchable and legally grey. Public articles provide more than enough material.
- This skill does **discovery and ranking only** — it surfaces and scores topics. Judging the *angle/hook* of a topic (what makes it click-worthy) is a human/LLM editorial step the script can't do.
