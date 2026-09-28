#!/usr/bin/env node
// audit-door-demand — THE DOORS SESSIONS ASKED FOR, RANKED BY HOW OFTEN THEY ASKED, read from the log every escape writes.
//
// The captain, 2026-09-28: "cross formulate the remaining leads". A lead is cross-formulated when it names TWO SURFACES
// THAT MUST AGREE AND DO NOT — the captain's own method for finding one — rather than an opinion about what would be
// nice to have. Every lead below is that shape, and every number in it is read off a file this tree already writes.
//
// THE LOG NOBODY READS. Every refused ad-hoc command here may proceed only by stating the gap it fills:
// `UUIDNA_MCP_GAP="<what is missing>" <command>`, and the hook appends that sentence to dist/evidence/mcp-gaps.jsonl.
// Measured the day this was written: 1354 requests, 1139 of them distinct, accumulated across the sessions that have run
// here — and no reader. So the tree has been collecting, in its own words, the exact list of doors it lacks, while
// choosing what to build next stayed a matter of taste.
//
// THE TWO SURFACES THAT MUST AGREE are what sessions ASK the doors for and what the catalogue SERVES. A verb asked for
// hundreds of times and served by nothing named for it is not a preference, it is a measured hole — and ranking by
// demand takes the choice of what to build out of my judgement and puts it in the record.
//
// WHY EACH ROW IS DEMAND AND NEVER ABSENCE, stated because the distinction is the whole discipline: a repeated ask can
// also mean the asker never found the door that exists. So every row carries its own sample sentences rather than a
// count alone, and closing one means either building the door or pointing those asks at what already serves them. Only
// reading the sentences tells you which, which is exactly why this is a lead and not a verdict.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, wrRoot } from '../boundary.js'
import { MCP_CATALOG } from '../mcp.js'

const LOG = join(ROOT, 'dist', 'evidence', 'mcp-gaps.jsonl')

/** THE FAMILIES ARE READ FROM THE ASKS, not declared over them. A family is the VERB a gap sentence uses, because a door
 *  is named by what it does; a sentence matching none is kept unclassified rather than forced into a bucket — the same
 *  honesty the science-class method keeps when it refuses to sweep an unplaceable wing into a default. */
const VERBS = ['commit', 'land', 'push', 'diff', 'status', 'log', 'test', 'time', 'profile', 'wing', 'theorem',
  'ledger', 'endpoint', 'reach', 'wait', 'kill', 'index', 'doc', 'lesson', 'roster', 'receipt'] as const

// A VERB IS MATCHED ON A WORD BOUNDARY, and the first version was not. `low.includes(v)` put every ask about a SKILL
// into the family "a door that kills", because `kill` is a substring of `skill` — 22 rows, every one of them
// misclassified, and the sample sentence printed beside the count said so in plain words ("baking the per-skill
// summary") while the label above it said something else entirely. A ranking is the input to what gets built next, so
// a classifier that reads inside words does not merely mislabel: it aims the work.
const saysVerb = (text: string, verb: string): boolean => new RegExp(`\\b${verb}`, 'i').test(text)

interface Family { verb: string; asks: number; samples: string[] }

const asks: string[] = []
if (existsSync(LOG)) {
  for (const line of readFileSync(LOG, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t) continue
    try {
      const r = JSON.parse(t) as { gap?: string; what?: string }
      const gap = String(r.gap ?? r.what ?? '')
      if (gap) asks.push(gap)
    } catch { /* a corrupt line is skipped, never counted as an ask */ }
  }
}

const distinct = new Set(asks)
const byVerb = new Map<string, Family>()
for (const gap of asks) {
  const low = gap.toLowerCase()
  const verb = VERBS.find((v) => saysVerb(low, v)) ?? 'other'
  const f = byVerb.get(verb) ?? { verb, asks: 0, samples: [] }
  f.asks++
  if (f.samples.length < 3 && !f.samples.includes(gap)) f.samples.push(gap.slice(0, 160))
  byVerb.set(verb, f)
}
const families = [...byVerb.values()]
  .filter((f) => f.verb !== 'other')
  .sort((a, b) => b.asks - a.asks || a.verb.localeCompare(b.verb))
const unclassified = byVerb.get('other')?.asks ?? 0
const served = MCP_CATALOG.length

// TEN IS THE FLOOR, and it is a floor rather than a ranking cut: below it a family is as likely to be one session's
// habit as a hole in the surface, and a lead list padded with habits is one nobody reads.
const leads = families.filter((f) => f.asks >= 10).map((f) => ({
  lead: `${f.asks} recorded ask(s) for a door that ${f.verb}s, against ${served} doors served — sessions stated this gap`
    + ` ${f.asks} times in their own words and the catalogue answers it with nothing named for the verb.`
    + ` Sample: "${f.samples[0] ?? ''}".`,
  status: 'open',
  owes: 'either the door, named by the verb the asks use so the contract is written by demand rather than by taste, or'
    + ' the door these asks failed to find — a repeated ask can mean the asker missed what is already served, and only'
    + ' reading the sentences decides which',
}))

const out = {
  why: 'The doors sessions asked for, ranked by how often they asked. Every refused ad-hoc command in this repository may'
    + ' proceed only by stating the gap it fills, and the hook appends that sentence to dist/evidence/mcp-gaps.jsonl, so'
    + ' this tree has been recording the list of doors it lacks in its own words. This reads that log. Each row is'
    + ' cross-formulated — what sessions ASK against what the catalogue SERVES, two surfaces that must agree — and each'
    + ' is DEMAND rather than absence, because a repeated ask can mean the asker missed a door that exists.'
    + ' Written by src/scripts/audit-door-demand.ts on every run, EMPTY INCLUDED: an absent file and an empty log are'
    + ' different facts.',
  requests: asks.length,
  distinct: distinct.size,
  served,
  families: families.map((f) => ({ verb: f.verb, asks: f.asks })),
  unclassified,
  held: families,
  open: leads.length,
  leads,
}
wrRoot('lean/door-demand.json', JSON.stringify(out, null, 1) + '\n')

console.log(`audit-door-demand — ${asks.length} recorded ask(s), ${distinct.size} distinct, against ${served} served doors`)
for (const f of families.slice(0, 12)) console.log(`  ${String(f.asks).padStart(5)}  a door that ${f.verb}s`)
console.log(`  ${String(unclassified).padStart(5)}  matched no verb — kept unclassified rather than swept into a bucket`)
console.log(`  → ${leads.length} lead(s) at lean/door-demand.json (a family asked for ten times or more)`)
