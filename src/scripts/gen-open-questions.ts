#!/usr/bin/env node
// gen-open-questions — THE SCHOOL OF OPEN DOORS, derived (lead 88b). Reads every unverified record the tree
// keeps — the held leads, the research findings, the prose develop fragments, the search-feed, the support
// wave, the axiom-hunt exposed set — and derives docs/open-questions.md:
// the open organised in topics beside the sealed, each claim with its develop plan (adjudicate's own, recomputed
// here, never authored), its involution magnets (where the deep research points — the census law), its sealed
// neighbors (what settled looks like), and the deposit path (a student's answer is a two-coin deposit, not a
// comment). The banner is the wave's own seal: silence never refutes — these are doors, not defeats. Nothing on
// the page is authored except the frame; every item, placement, magnet and plan recomputes from the records and
// the ledger, so the page regrows as doors open and close.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEAN_LEDGER } from '../theorems/generated.js'
import { openQuestions } from '../school/open/questions/index.js'
import { gatherOpenLeads } from '../school/open/questions/springs.js'
import { adjudicate } from '../adjudicate.js'
import { pageSafe } from '../quantum/advantage/page/safe/index.js'

const items = gatherOpenLeads(ROOT)
const topics = openQuestions(items, LEAN_LEDGER)
const total = items.length

const section = topics.map((t) => {
  const rows = t.items.map((p) => {
    const plan = adjudicate(p.claim).develop
    const planLine = typeof plan === 'string' ? plan : plan ? JSON.stringify(plan) : 'name a decidable structure, express the claim over it, and let adjudicate decide'
    // a derived excerpt must not smuggle markup: truncation can split an inline-code span, and a bare < reads
    // as a tag to the Vue template compiler — so the excerpt is plain text, brackets escaped, backticks dropped
    const clean = (s: string): string => pageSafe(s.replace(/`/g, ''))
    const mag = p.involutions.length ? p.involutions.map((i) => `[\`${i.key}\`](/theorem/${i.key})`).join(' · ') : '_none yet — the first magnet is yours to seal_'
    const nb = p.neighbors.length ? p.neighbors.map((n) => `[\`${n.key}\`](/theorem/${n.key})`).join(' · ') : '_no sealed neighbor shares these words_'
    return `- **${clean(p.claim.length > 220 ? p.claim.slice(0, 220) + '…' : p.claim)}**\n  <br><small>door: ${p.source}${p.receipt ? ` · receipt \`${p.receipt}\`` : ''}</small>\n  <br><small>involutions around: ${mag} </small>\n  <br><small>sealed neighbors: ${nb} </small>\n  <br><small>develop: ${clean(String(planLine).slice(0, 200))}</small>`
  }).join('\n')
  return `## ${t.topic} — ${t.items.length} open\n\n${rows}`
}).join('\n\n')

const page = `---
title: Open questions
description: The unverified, organised in topics — every door with its involution magnets and its deposit path.
---

# Open questions <Badge type="tip" text="doors, not defeats" />

> **Silence never refutes** ([\`silence_never_refutes\`](/theorem/silence_never_refutes)): of the four citation
> states exactly one verifies and the other three stay OPEN — none refuted by absence. Every claim below is an
> UNVERIFIED — which is a **notice, not a shrug**: the agent's laws pointing at where deep research goes next.
> The census keeps finding the unexplained self-inverse, so each door lists the sealed **involutions around it**
> — the magnets the research should feel first — beside its plain sealed neighbors, so what is settled sits
> visibly next to what is not.

**${total} open leads** across ${topics.length} topics, derived from the tree's own records — held, refuted, and
refused from lean/leads.json (each adjudicates UNVERIFIED until a seal verifies), plus research findings, prose
develop fragments, search-feed leads, support-wave research-leads, and the axiom-hunt exposed set. After a wave
of external research, local school development files every unverified here so the lab can discuss it. The full
leads record enrolls at [the school](/school#leads); refuted and refused are results, not seals — they stay on
this page until adjudicate returns VERIFIED. Placement is a word-overlap heuristic and says so: what the words
cannot place waits in the **open frontier**, unforced.

**How to answer one**: a student's answer is a **two-coin deposit**, never a comment — name the finite structure,
express the claim as an exact predicate over it, run the [tester](/tools) with its controls, and if the denial
drains, seal it ([the wave](/theorem/denial_drains_to_the_last_coin)). The door then closes as a count, and this
page regrows without it.

${section}

## Honest scope

Organisation, not adjudication: nothing on this page verdicts a claim, and topic placement is shared-words, not
understanding. The records are the tree's own (leads held, findings unsealed, prose fragments owed, search-feed
leads, support-wave research-leads, axiom-hunt exposed); when a record closes, its door leaves this page by
recomputation, never by edit.
`
writeFileSync(join(ROOT, 'docs', 'open-questions.md'), page)
console.log(`✓ gen-open-questions — docs/open-questions.md: ${total} open leads in ${topics.length} topics, derived from the springs against ${LEAN_LEDGER.length} seals`)
