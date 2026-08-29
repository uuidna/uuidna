#!/usr/bin/env node
// gen-search-feed — MOST-SEARCHED ONLINE FEEDS LEAN LEADS, WHICH FEED ONLINE RESULTS.
//
// One mill, two surfaces: lean/search-feed.json (the receipt the desk and MCP recompute) and docs/search-feed.md
// (the public page Google can index). Loud theorems are /theorem/<key> doors. Silent queries and harvest that
// decide() confirms but the ledger does not seal are LEADS — desk proposes, captain disposes. Never auto-held
// in lean/leads.json (that record blocks the release).
//
// Default is the declared mill (reconcile-safe). `--online` asks the wired APIs (unanswered math, EU education
// portals, research streams) and folds today's titles in — the research desk's daily ore.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { FEED_QUERIES, MOST_SEARCHED, SEARCH_FEED_PATH, feedPhysicsCite, portalQueries, searchFeed } from '../search-feed.js'
import { pageSafe } from '../quantum/advantage/page/safe/index.js'

const online = process.argv.includes('--online')
const feed = online ? await (await import('../search-feed-online.js')).searchFeedOnline() : searchFeed()
const clean = (s: string): string => pageSafe(s.replace(/`/g, ''))

const doorRows = feed.results.length
  ? feed.results.map((d) =>
    `| ${clean(d.query)}${feedPhysicsCite(d.query)} | [\`${d.key}\`](/theorem/${d.key}) | ${clean(d.skill)} | ${d.resonance} |`).join('\n')
  : '| — no loud neighbour today — | | | |'

const leadRows = feed.leads.length
  ? feed.leads.map((l) => {
    const harvest = l.harvest
      ? `\n  <br><small>mint candidate ${clean(l.harvest.key)} · fragment ${clean(l.harvest.fragment)} — not sealed, never auto-held ([\`legal_only_the_proven_is_admitted\`](/theorem/legal_only_the_proven_is_admitted))</small>`
      : ''
    return `- **${clean(l.query)}** — ${clean(l.what)}${feedPhysicsCite(l.query)}\n  <br><small>owes: ${clean(l.owes)}</small>${harvest}`
  }).join('\n')
  : '- none open today — every declared query rang a sealed door'

const trends = MOST_SEARCHED.map((q) =>
  `- **${clean(q.query)}** — ${clean(q.source)}${feedPhysicsCite(q.query)}`).join('\n')
const portals = portalQueries().map((q) =>
  `- **${clean(q.query)}** — ${clean(q.source)}${feedPhysicsCite(q.query)}`).join('\n')

const page = `---
title: Search feed
description: Most-searched queries and the wired public APIs ring the sealed ledger — loud theorems are the online doors; silence and harvest are leads the desk proposes.
---

# Search feed <Badge type="tip" text="doors from the public's queries" />

Most-searched queries and the wired public APIs (research streams, EU education portals, unanswered math —
sourced, not scraped) ring the sealed ledger by resonance
([\`silence_never_refutes\`](/theorem/silence_never_refutes)). A loud theorem is an **online result**: a
[\`/theorem/&lt;key&gt;\`](/theorems) door. A silent query, or harvest \`decide()\` confirms that the ledger does not
yet seal, is a **lead** the desk proposes. Only the kernel seals; only the captain holds or refuses
([\`legal_only_the_proven_is_admitted\`](/theorem/legal_only_the_proven_is_admitted),
[\`two_coins\`](/theorem/two_coins)). Meaning is null.

Fold receipt \`${feed.receipt}\` · hexbit door [\`${feed.handle}\`](${feed.door}) ·
${feed.results.length} door(s) · ${feed.leads.length} lead(s) · ${feed.silent.length} silent
${online ? '· live API titles folded in' : ''}.

## Online results — loud theorems the queries already ring

| query | theorem | wing | resonance |
|-------|---------|------|-----------|
${doorRows}

## Leads — silence and unsealed harvest (desk proposes)

${leadRows}

## Most searched (declared)

These are the strings people type, and where that fact was read. Traffic ranks are **not** frozen here — a rank
is a measurement that moves.

${trends}

## Wired portals (the APIs' own probes)

The mill asks the same doors \`uuidna_api_mint\` and the search-on-trial already reach: MathOverflow (unanswered
math arrives online), arXiv, Wikipedia, ESCO, data.europa, CORDIS, Gutendex. A coordinate or a dataset code is
not a search string and stays out.

${portals}

## Honest scope

${pageSafe(feed.honest)} A silent query is a notice, not a refute ([\`silence_never_refutes\`](/theorem/silence_never_refutes)). Harvest is a mint candidate, never a seal ([\`legal_only_the_proven_is_admitted\`](/theorem/legal_only_the_proven_is_admitted)). This page
does not scrape Google.
`

writeFileSync(join(ROOT, SEARCH_FEED_PATH), JSON.stringify({
  queries: FEED_QUERIES.map(({ id, query, source }) => ({ id, query, source })),
  online,
  meaning: feed.meaning,
  results: feed.results,
  leads: feed.leads,
  silent: feed.silent,
  receipt: feed.receipt,
  handle: feed.handle,
  door: feed.door,
  honest: feed.honest,
}, null, 2) + '\n')
writeFileSync(join(ROOT, 'docs', 'search-feed.md'), page)
console.log(`✓ gen-search-feed — ${SEARCH_FEED_PATH} + docs/search-feed.md: ${feed.results.length} doors, ${feed.leads.length} leads, ${feed.silent.length} silent${online ? ' · online' : ''}, receipt ${feed.receipt}`)
