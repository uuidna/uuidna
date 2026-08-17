#!/usr/bin/env node
// LEAN WRITES THE PROSE. The changelog carried the one thing that must never be hand-typed: the theorem COUNT, the
// PRINCIPLE count and the ledger RECEIPT — ledger facts that drift the moment a domain is added and a human forgets
// to update them. So they are no longer written; they are COMPUTED here from the same ledger the site renders, and
// stamped between markers in CHANGELOG.md every `npm run lean`. The audit's `git diff --exit-code` then makes drift
// impossible: change the ledger without re-syncing and the tree is dirty, the gate fails. Data is computed; only the
// narrative around it stays prose (and that prose is gate-checked elsewhere). No unverified changeable data.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { runTrial, THEOREMS, PRINCIPLES, statementCensus } from '../index.js'
import { ROOT } from './api.js'

const TARGET = 1024 // the v1.0.0 milestone (2^10) — the one stated goal, a named constant, not a magic number
const count = THEOREMS.length
const principles = new Set(THEOREMS.map((t) => t.principle)).size
const receipt = runTrial().receipt

// BOTH NUMBERS, ALWAYS — a theorem is its LEAN, not its name. The ledger holds more KEYS than distinct propositions
// because some statements are deliberately sealed in two wings (the ℤ/9 table lives in Core and in Ring, 64 of the
// overlap), and every surface that printed only the key count was quietly using the larger of two true numbers. The
// milestone is measured on the DISTINCT count, because that is what a skeptic recomputing the ledger would find.
const census = statementCensus()
const distinct = census.distinct
const renamings = census.renamings
const remaining = TARGET - distinct

const TODAY = `Today: **${distinct} distinct / ${TARGET} — ${remaining} to go** (${count} keys, ${renamings} deliberate re-namings), across ${principles} principles.`
const CURRENT = `Ledger: **${distinct} distinct propositions** under **${count} keys** (${renamings} re-namings — a statement sealed in two wings is one theorem with two names) across **${principles} principles**, folded to receipt \`${receipt}\``

const path = join(ROOT, 'CHANGELOG.md')
const before = readFileSync(path, 'utf8')
// Replace only the marked regions — the surrounding prose is untouched.
const stamp = (src: string, tag: string, body: string): string => {
  const re = new RegExp(`(<!-- ${tag} -->)[\\s\\S]*?(<!-- /${tag} -->)`)
  if (!re.test(src)) throw new Error(`sync-changelog: marker ${tag} not found in CHANGELOG.md`)
  return src.replace(re, `$1${body}$2`)
}
const after = stamp(stamp(before, 'LEDGER:TODAY', TODAY), 'LEDGER:CURRENT', CURRENT)

if (after !== before) {
  writeFileSync(path, after)
  console.log(`✓ CHANGELOG.md — Lean wrote the ledger line: ${count} theorems, ${principles} principles, receipt ${receipt}.`)
} else {
  console.log(`✓ CHANGELOG.md — already current (${count} theorems, receipt ${receipt}).`)
}
