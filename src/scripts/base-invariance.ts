#!/usr/bin/env node
// @finder phase:9 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// base-invariance — WHICH SEALED STATEMENTS ARE CLAIMS ABOUT DECIMAL WRITING, asked of the whole ledger.
//
// A statement whose truth dies when its base-ten artefacts are rewritten in another base is a true claim about
// notation. That is not a defect and must not be deleted — Midy's theorem and casting out nines are exactly this, and
// they belong here. What the guard demands is that such a statement DECLARE the dependency, so a reader cannot take a
// fact about decimal for a fact about music, physics or the world. See src/base-invariance.ts for the failure that
// prompted it: I reported three wings sharing 142857 as a real entanglement, and ord_8(7) = 1 refutes it in one line.

import { readFileSync } from 'node:fs'
import { theorems } from '../theorems/index.js'
import { holds } from '../involution/index.js'
import { baseCensus, baseVerdictOf, type BaseVerdict } from '../base-invariance.js'
import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'
import { wrArtifact } from '../artifact.js'

const sourceOf = new Map<string, string>()
const wingSource = (file: string): string => {
  const hit = sourceOf.get(file)
  if (hit !== undefined) return hit
  let src = ''
  try { src = readFileSync(new URL(`../../lean/${file}`, import.meta.url), 'utf8') } catch { src = '' }
  sourceOf.set(file, src)
  return src
}

const ARG = process.argv.slice(2)
const only = ARG.find((a) => a.endsWith('.lean')) ?? null

const rows = theorems()
  .filter((t) => only === null || String(t.file) === only)
  // ARTEFACTS ONLY: a statement with no numeral that is a function of ten has nothing for a base change to move, and
  // asking the evaluator about all 71,089 would spend the run on statements the guard cannot judge BY CONSTRUCTION: their shapes lie outside the evaluator's grammar, so it returns no verdict rather than a wrong one.
  .filter((t) => /\b(?:9+|10+|142857|588235294117647)\b/.test(String(t.statement ?? '')))
  .map((t) => ({ key: String(t.key), file: String(t.file), statement: String(t.statement ?? '') }))

console.log(`statements carrying a base-ten artefact: ${rows.length} of ${theorems().length}`)

// A DECLARATION IS READ FROM THE WING'S OWN PROSE, in the doc comment that precedes the theorem. The markers are the
// words a declaration would actually use; a key claiming a base-ten fact while saying nothing about base ten is the gap.
const DECLARES = /base[- ]ten|base 10|decimal (?:writing|notation|expansion|representation)|notational|in this base|casting out nines/i
const declaresIn = (file: string, key: string): boolean => {
  const src = wingSource(file)
  const at = src.indexOf(`theorem ${key}`)
  if (at < 0) return false
  // the doc comment immediately above the theorem
  const before = src.slice(0, at)
  const open = before.lastIndexOf('/--')
  if (open < 0) return false
  return DECLARES.test(before.slice(open))
}

// THE WALK IS THE EXPENSIVE PART — 2,844 statements through the evaluator, about twenty minutes — so it is paid once
// per change rather than once per question. The digest covers the ledger AND this door's rule: src/base-invariance.ts
// holds the verdict logic and this file holds the declaration marker, so correcting either invalidates the receipt by
// construction. A receipt keyed on the ledger alone would serve a stale answer after a corrected rule, which is the
// defect audit-citations was measured committing on 2026-09-03.
// A RECEIPT HOLDS THE ANSWER, NOT THE WORKING, and the first version got that wrong: storing all 2,844 verdicts with
// their full restatements produced a 3.8MB file, nearly four times the largest cache this tree commits, and almost all
// of it was rewritten statement text nothing reads back. What the door reports is the census, the findings with how each
// failed, and the by-wing table — so that is what is kept.
interface Finding { key: string; file: string; how: string }
interface Answer {
  asked: number; invariant: number; notational: number; declared: number; suspect: number; unread: number
  findings: Finding[]
  wings: { wing: string; notational: number; suspect: number; invariant: number }[]
  notationalKeys: string[]
}

const howFailed = (v: BaseVerdict): string => {
  const f = v.failedIn[0]
  if (f === undefined) return 'no restatement recorded'
  return f.absent.length > 0
    ? `no analogue in base ${f.base} for ${f.absent.map((a) => a.numeral).join(', ')}`
    : `base ${f.base}: ${f.swapped.map((sw) => `${sw.from}→${sw.to}`).join(', ')}`
}

const receipt = await servedAsync<Answer>({
  path: 'lean/base-invariance-receipt.json',
  inputs: ledgerAndRule(['dist/base-invariance.js', 'dist/scripts/base-invariance.js']),
  compute: async () => {
    const verdicts = rows.map((r) =>
      baseVerdictOf(r, (st) => holds(st, wingSource(r.file)), [8, 12, 16], declaresIn(r.file, r.key)))
    const census = baseCensus(verdicts)
    const byWing = new Map<string, { notational: number; suspect: number; invariant: number }>()
    for (const v of verdicts) {
      const w = byWing.get(v.file) ?? { notational: 0, suspect: 0, invariant: 0 }
      if (v.verdict === 'notational') w.notational += 1
      else if (v.verdict === 'suspect') w.suspect += 1
      else if (v.verdict === 'invariant') w.invariant += 1
      byWing.set(v.file, w)
    }
    return {
      asked: census.asked,
      invariant: census.invariant,
      notational: census.notational,
      declared: census.declared,
      suspect: census.suspect,
      unread: census.unread,
      findings: verdicts.filter((v) => v.verdict === 'notational')
        .map((v) => ({ key: v.key, file: v.file, how: howFailed(v) })),
      wings: [...byWing].map(([wing, n]) => ({ wing, ...n }))
        .sort((a, b) => b.notational - a.notational || a.wing.localeCompare(b.wing)),
      notationalKeys: census.notationalKeys,
    }
  },
}, fsStore)
const c = receipt.value
console.log(receipt.hit
  ? `served by receipt ${receipt.digest} — the walk was not repeated`
  : `walked ${rows.length} statements and earned receipt ${receipt.digest}`)

console.log(`invariant ${c.invariant} · NOTATIONAL ${c.notational} · declared ${c.declared} · suspect ${c.suspect} · unread ${c.unread}`)
console.log()
const notational = c.findings
for (const v of notational.slice(0, 20)) {
  console.log(`  ✗ ${v.key}  [${v.file}]`)
  console.log(`      ${v.how}`)
}
if (notational.length > 20) console.log(`  … and ${notational.length - 20} more`)

// THE CENSUS IS WRITTEN, not only printed. 1,442 findings cannot be read from a terminal tail BY CONSTRUCTION — a tail keeps its last lines and discards the rest — and re-running the
// evaluator over 2,844 statements to ask a follow-up question is the kind of cost this tree calls a crack. The
// artefact is committed so the gate can read it and a reader can analyse it without paying for the walk again.
const wings = c.wings
wrArtifact('lean/base-invariance.json', {
  kind: 'base-invariance-census',
  asked: c.asked,
  invariant: c.invariant,
  notational: c.notational,
  declared: c.declared,
  suspect: c.suspect,
  unread: c.unread,
  honest: 'notational means the statement is TRUE and depends on base-ten writing; it must declare that, never be '
    + 'deleted. A one-digit artefact cannot convict, so those are suspect and a reader decides.',
  wings,
  notationalKeys: c.notationalKeys,
})
console.log()
console.log('notational by wing (top 12):')
for (const w of wings.filter((x) => x.notational > 0).slice(0, 12)) {
  console.log(`  ${String(w.notational).padStart(5)} notational · ${String(w.suspect).padStart(4)} suspect · ${String(w.invariant).padStart(4)} invariant   ${w.wing}`)
}
console.log()
console.log('✓ lean/base-invariance.json written — the census, so a follow-up question costs no second walk')
console.log()
console.log('A NOTATIONAL STATEMENT IS TRUE AND STAYS. The fix is a word in its key or its prose saying the claim is')
console.log('about decimal writing — never a deletion. Midy\'s theorem is this, and it knows it.')
