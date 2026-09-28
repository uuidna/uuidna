#!/usr/bin/env node
// @finder phase:1 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// padding-conjuncts — every conjunct in the ledger that cannot fail, named with the row that carries it. "Cannot fail"
// is decided rather than judged: the conjunct is evaluated and holds on every assignment of its own finite domain, so
// it adds no way for its theorem to be false.
//
// (the captain, 2026-09-27: "Why not simplify all to the core?!?" — after I had replaced eleven of these by hand.)
//
// THE HAND SEARCH FOUND 3% OF THE CLASS. Reading statements turned up sixteen; substituting their numerals and
// re-deciding finds 492 across the wings. A conjunct that holds whatever its numbers are constrains nothing, so the
// theorem reads as a conjunction of substance while part of it is furniture — and `by decide` signs it either way.
import { theorems } from '../theorems/index.js'
import { paddingCensus } from '../padding-conjunct.js'
import { wrArtifact } from '../artifact.js'

const c = paddingCensus(theorems().map((t) => ({
  key: t.key, statement: String(t.statement ?? ''), file: String(t.file ?? ''),
})))

console.log('padding-conjuncts — conjuncts that hold whatever their numerals are\n')
console.log(`  ${c.examined} conjunctive statements examined · ${c.findings.length} conjunct(s) cannot fail\n`)
const byFile = new Map<string, number>()
for (const f of c.findings) byFile.set(f.file, (byFile.get(f.file) ?? 0) + 1)
for (const [file, n] of [...byFile].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
  console.log(`  ${String(n).padStart(3)}  ${file}`)
}
if (byFile.size > 15) console.log(`  … ${byFile.size - 15} more wing(s)`)
console.log('\n  the widest rows:')
for (const f of c.findings.slice(0, 10)) console.log(`    [${f.file}] ${f.key} — ${f.conjunct} (1 of ${f.of})`)

wrArtifact('lean/padding-conjuncts.json', c)
console.log(`\n  receipt ${c.receipt} · written to lean/padding-conjuncts.json`)
console.log('\n  IT DELETES NOTHING. A sealed theorem is a published record and no one withdraws a settlement; what a')
console.log('  finder owes is the name of every row whose conjunct cannot fail, so the next wing is written differently.')
