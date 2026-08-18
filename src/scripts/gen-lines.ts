#!/usr/bin/env node
// src/scripts/gen-lines.ts — lean/statement-index.json: every Lean line that more than one key seals, with the
// wings that seal it. Generated, so the declaration is a measurement of the ledger rather than a memory of it.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { statementCensus } from '../editorial.js'

const census = statementCensus()
const reuse: Record<string, string[]> = {}
const wings: Record<string, string[]> = {}
for (const g of census.groups.filter((x) => new Set(x.files).size > 1)) {
  reuse[g.statement] = [...g.keys].sort()
  wings[g.statement] = [...new Set(g.files)].sort()
}
const out = {
  why: 'Each Lean line, indexed by its statement, with every key that seals it. A wing verifies STANDALONE — no lean file imports another — so a fact needed in two wings is re-proven in both, on purpose, and that cost is declared here rather than discovered by census. A statement sealed twice inside ONE file is never declared: it buys no independence and one of the two must go. This list may only SHRINK.',
  distinct: census.distinct,
  keys: census.entries,
  renamings: census.renamings,
  reuse,
  wings,
}
writeFileSync(join(ROOT, 'lean/statement-index.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`✓ gen-lines — ${Object.keys(reuse).length} reused Lean line(s) declared across ${census.entries} keys / ${census.distinct} distinct`)
