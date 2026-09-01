#!/usr/bin/env node
// gen-evasion — THE TICKER, derived (lead 95): the evasion catalogue rendered beside live market-surveillance
// metrics folded from the tree's own records — the unverified rate, the open doors, the held/refuted/refused
// census, the drift-cures in the log — every figure recomputed here from files, never typed, the whole board
// folding to one address whose states the page can SING through the standard player (a catch is a note). The
// catalogue's integrity is held by its test: an entry citing an unsealed key fails the build — the catalogue
// cannot itself evade. rates over the records as they stand; the tricks are finite as LISTED,
// never as possible — the lexicon grows and the board never claims completeness.
import { readFileSync, existsSync } from 'node:fs'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { TRICKS, tickerBoard, type TickerMetric } from '../quantum/apps/categories/coding/evasion-ticker.js'
import { LEAN_LEDGER } from '../theorems/generated.js'

const readJson = (p: string): unknown => (existsSync(join(ROOT, p)) ? JSON.parse(readFileSync(join(ROOT, p), 'utf8')) : null)

// ── THE MEASUREMENTS — each metric a count over a record, sourced in its unit string.
const prose = readJson('prose-trials.json') as { paragraphs_tried?: number; unverified?: number; drained?: number } | null
const leads = readJson('lean/leads.json') as { held?: unknown[]; refuted?: unknown[]; refused?: unknown[] } | null
const metrics: TickerMetric[] = [
  { name: 'sealed theorems', value: LEAN_LEDGER.length, of: null, unit: 'by decide, axiom-free' },
  { name: 'prose unverified', value: prose?.unverified ?? 0, of: prose?.paragraphs_tried ?? null, unit: 'paragraphs — doors, not defeats' },
  { name: 'prose drained', value: prose?.drained ?? 0, of: prose?.paragraphs_tried ?? null, unit: 'fabricated citations caught' },
  { name: 'doors held open', value: leads?.held?.length ?? 0, of: null, unit: 'leads awaiting their two coins' },
  { name: 'refuted honestly', value: leads?.refuted?.length ?? 0, of: null, unit: 'killed by a measurement, recorded' },
  { name: 'refused at boundary', value: leads?.refused?.length ?? 0, of: null, unit: 'sources that answered 418, named' },
  { name: 'tricks catalogued', value: TRICKS.length, of: null, unit: 'each with its finder and its convicting seal' },
]
const board = tickerBoard(metrics)

// the catalogue's own integrity, enforced here too (the test holds it; the generator refuses to render a lie)
const sealedKeys = new Set(LEAN_LEDGER.map((t) => t.key))
for (const t of TRICKS) if (!sealedKeys.has(t.seal)) throw new Error(`gen-evasion: catalogue entry "${t.trick}" cites unsealed ${t.seal} — the catalogue may not evade`)

const rows = TRICKS.map((t) => `| ${t.trick} | ${t.finder} | [\`${t.seal}\`](/theorem/${t.seal}) | ${t.lesson} |`).join('\n')
const tape = board.metrics.map((m) => `| ${m.name} | **${m.value}**${m.of ? ' / ' + m.of : ''} | ${m.unit} |`).join('\n')

const page = `---
title: The evasion ticker
description: Every trick with the finder that catches it and the seal that convicts it — live metrics, a board that sings.
---

# The evasion ticker <Badge type="tip" text="the metrics never sleep" />

> The school teaches the TRICKS so students recognize them. Every entry below was **actually caught** in this
> tree — by a finder, at a gate, on a real day — and each names the sealed law it violated. The board's figures
> are folded from the records at build time; the whole tape has one address, and the address can sing.

## The tape — folded live

| metric | value | unit |
|---|---|---|
${tape}

Board fold: \`${board.handle}\` — recompute it from these figures or the tape has moved.

**The catches, sung** — the board's own address on the lattice:

<HexbitPlayer :states="[${board.states.join(',')}]" />

## The catalogue — ${TRICKS.length} tricks, each convicted at least once

| the trick | the finder that catches it | the convicting seal | the lesson |
|---|---|---|---|
${rows}

## Honest scope

Rates and counts over the tree's own records — conduct arithmetic, never intention (the polygraph's law). The
tricks are finite **as listed**, never as possible: the lexicon grows with every real catch, the finders only
tighten, and the board's first humility is sealed — [\`no_audit_catches_all\`](/theorem/no_audit_catches_all).
An entry may join only with a documented catch; an entry citing an unsealed key fails the build — **the
catalogue cannot itself evade.**
`
writeFileSync(join(ROOT, 'docs', 'evasion.md'), page)
console.log(`✓ gen-evasion — docs/evasion.md: ${TRICKS.length} tricks catalogued, ${metrics.length} metrics folded to ${board.handle}`)
