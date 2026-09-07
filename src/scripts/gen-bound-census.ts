#!/usr/bin/env node
// gen-bound-census — THE BOUND CENSUS SEALED TO lean/bound-census.json, decided once per statement and reused.
//
// bound-perturbation.ts widens every `List.range N` in a statement by one and re-decides. Over the whole ledger
// that is two evaluations of ~800 bounded statements and it took 289 s on 2026-09-07 — far too slow for a tool, a
// test or a generator that runs on every pass, which is why nothing served the census and its verdicts lived only
// in a sampled test. The delta-gate law: a verdict depends on the STATEMENT and the INSTRUMENT and nothing else,
// so a row whose statement has not moved keeps its verdict, and a pass over an unchanged ledger costs one digest.
//
// The record carries the digest it was decided under — (instrument source, every bounded key|statement) — so a
// slice that lags the ledger is NAMED rather than silently stale; src/school/missions/index.test.ts compares it to
// the live digest and gives the exact command. A changed instrument invalidates every row (lead 144's rule: a cache
// keyed on its own source), a changed statement invalidates its own row, and nothing else is recomputed.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { ROOT, HERE } from './api.js'
import { LEAN_LEDGER } from '../theorems/generated.js'
import { boundVerdict, isWidenable } from '../bound-perturbation.js'
import type { BoundRow } from '../school/missions/index.js'

const sha = (s: string): string => createHash('sha256').update(s).digest('hex').slice(0, 16)

interface Record_ { why: string; digest: string; instrument: string; census: Record<string, number>; rows: (BoundRow & { statement: string })[] }

const OUT = join(ROOT, 'lean', 'bound-census.json')
const instrument = sha(readFileSync(join(HERE, '..', 'bound-perturbation.js'), 'utf8'))
const bounded = LEAN_LEDGER.filter((t) => isWidenable(t.statement))
const digest = sha(instrument + '\n' + bounded.map((t) => `${t.key}|${t.statement}`).join('\n'))

const prior: Record_ | null = existsSync(OUT) ? (JSON.parse(readFileSync(OUT, 'utf8')) as Record_) : null
if (prior && prior.digest === digest) {
  console.log(`✓ gen-bound-census — lean/bound-census.json already decided under ${digest} (${prior.rows.length} bounded rows); nothing recomputed`)
  process.exit(0)
}
const reuse = new Map<string, BoundRow & { statement: string }>()
if (prior && prior.instrument === instrument) for (const r of prior.rows) reuse.set(`${r.key}|${r.statement}`, r)

let decided = 0
const rows = bounded.map((t) => {
  const kept = reuse.get(`${t.key}|${t.statement}`)
  if (kept) return { ...kept, wing: t.file }
  decided++
  const v = boundVerdict(t.statement)
  if (v === 'not-bounded') throw new Error(`${t.key}: matched List.range but widenBounds left it unchanged — the instrument and the filter disagree`)
  return { key: t.key, wing: t.file, verdict: v, statement: t.statement }
})
const census: Record<string, number> = { bounded: rows.length }
for (const r of rows) census[r.verdict] = (census[r.verdict] ?? 0) + 1

const record: Record_ = {
  why: 'Every bounded statement (List.range) widened by one element and re-decided: load-bearing = the bound carries the theorem; survived-widening = ONE step survived, a lower bound and never a verdict that the bound is decorative. Written by scripts/gen-bound-census, incrementally: a row keeps its verdict while its statement and the instrument are unchanged.',
  digest, instrument, census, rows,
}
writeFileSync(OUT, JSON.stringify(record, null, 1) + '\n')
console.log(`✓ gen-bound-census — ${rows.length} bounded rows (${decided} decided now, ${rows.length - decided} reused) → lean/bound-census.json under ${digest}: ${JSON.stringify(census)}`)
