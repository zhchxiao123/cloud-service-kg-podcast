# Sources & Tuning Reference

Detailed catalog of information sources, how to add/remove them, scoring tuning, and the planned full-text fetching layer.

## Table of contents
- [Source layers](#source-layers)
- [Currently wired sources](#currently-wired-sources)
- [Adding sources](#adding-sources)
- [Scoring & tuning](#scoring--tuning)
- [Planned: full-text fetching](#planned-full-text-fetching)

## Source layers

A good topic pipeline pulls from three layers. Cross-layer agreement on a topic is the strongest signal.

1. **Community-filtered layer** — already vetted by a crowd; high score = worth doing. (Hacker News; Reddit if re-added.)
2. **Depth layer** — long-form articles that supply detail for synthesis. (Medium, Substack, engineering/post-mortem blogs.)
3. **Signal layer** — raw trends and validation. (Google Trends, Product Hunt, GitHub Trending — not yet wired.)

## Currently wired sources

Configured in the top config block of `scripts/topic_scout.py`.

**Community-filtered**
- Hacker News — via Algolia HN Search API (`hn.algolia.com/api/v1/search_by_date`), free, no auth, carries real points + comment counts as heat. Primary source.

**Depth**
- Medium tag feeds — `medium.com/feed/tag/{tag}`. Current tags: technology, startup, business, venture-capital, artificial-intelligence, software-engineering, tech.
- TechCrunch, The Verge, Ars Technica — standard RSS.
- Hacker News frontpage RSS (`hnrss.org/frontpage`) — secondary HN signal.

**Removed**
- Reddit — public `.json` endpoints now return 403 for unauthenticated requests. To restore, register a Reddit "script" app at reddit.com/prefs/apps, then use `praw` with client_id/client_secret/OAuth. Not worth it unless you specifically need subreddit discussion signal.

## Adding sources

**Add a Medium tag**: append to `MEDIUM_TAGS`. Browse tags at medium.com/tag/{name}.

**Add any RSS source** (Substack, media, engineering blog): append a `(name, url)` tuple to `GENERIC_RSS`.
- Substack: `https://{publication}.substack.com/feed`
- Most engineering/company blogs expose `/feed/`, `/rss/`, or `/atom.xml`.
- Test a feed URL in a browser first — if it returns XML with `<item>` entries, it'll work.

**High-value source types to consider adding** (for tech/business storytelling):
- Company engineering blogs and post-mortems (richest "rise & fall" material — first-hand, detailed).
- VC/analyst Substacks (strategy and deal analysis).
- Lobsters (`lobste.rs`, has RSS) — higher signal-to-noise tech community.

**Sources needing custom code** (not plain RSS, future additions):
- Google Trends — via `pytrends` (unofficial). Best used as a *validation* layer: after picking a topic, check whether search interest is sustained.
- Product Hunt — official GraphQL API. New-product launches.
- GitHub Trending — scrape or unofficial API. Technical-trend bellwether.

## Scoring & tuning

Final score per topic (in `aggregate()`):

```
score = cross_sources * 6  +  keyword_bonus * 1.5  +  normalized_heat * 0.3
```

- **cross_sources** — number of distinct sources the topic appeared in. Weighted highest because multi-source agreement is the best signal. Raise the `6` to favor cross-validated topics even more.
- **keyword_bonus** — sum of `KEYWORD_WEIGHTS` hits in the title. This encodes editorial taste: which words signal a story worth telling.
- **normalized_heat** — community heat (HN points/comments) normalized per-source to 0–10, then down-weighted to ~0–3 so high-heat HN doesn't bulldoze zero-heat Medium/RSS items.

**Per-source quota** (`diversify()`): after scoring, cross-source 🔥 topics are admitted first unconditionally; then remaining slots fill by score but cap each source at `--per-source` (default 4). This is what prevents single-source domination.

**Tuning recipes**
- List too HN-heavy → lower `--per-source` (e.g. 3 or 2).
- Want only company rise/fall stories → in `KEYWORD_WEIGHTS`, raise `shutdown / bankrupt / failed / collapse / acquired / ipo` and drop unrelated words.
- Want more cross-validated, "safe" topics → raise the `cross_sources` coefficient from 6 to 8.
- Clustering feels off (unrelated titles merged, or same story split) → `signature()` currently clusters by shared title keywords, which is crude. Upgrade path: cluster by embedding similarity instead.

## Planned: full-text fetching

**Status: not implemented.** The scout returns titles + links only. To produce scripts, a later module must fetch clean full-text and synthesize across sources. Recommended layered approach (cheapest-first, fall back on failure):

1. **trafilatura** (free, Python) — best open-source clean-text extractor, LLM-friendly output. Handles static HTML well; returns empty on heavy-JS pages.
2. **Jina Reader** (near-free) — prepend `https://r.jina.ai/` to a URL, get clean text back. Good fallback when trafilatura comes up empty/short.
3. **Firecrawl** (paid) — handles JS rendering, anti-bot, paywalls poorly-defended pages; outputs clean markdown built for LLMs. Reserve for the hard cases only.

**Synthesis principle (anti-plagiarism)**: never transcribe a single article into a script. Pull *multiple* articles on the same topic, then have the LLM synthesize/abstract across them into an original take with its own structure and angle. This is both more original (defensible) and higher-quality than restating one source. Skip paywalled content entirely.
