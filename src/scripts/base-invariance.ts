#!/usr/bin/env node
// base-invariance — WHICH SEALED STATEMENTS ARE CLAIMS ABOUT DECIMAL WRITING, asked of the whole ledger.
//
// A statement whose truth dies when its base-ten artefacts are rewritten in another base is a true claim about
// notation. That is not a defect and must not be deleted — Midy's theorem and casting out nines are exactly this, and
// they belong here. What the guard demands is that such a statement DECLARE the dependency, so a reader cannot take a
// fact about decimal for a fact about music, physics or the world. See src/base-invariance.ts for the failure that
// prompted it: I reported three wings sharing 142857 as a real entanglement, and ord_8(7) = 1 refutes it in one line.

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../theorems/index.js'
import { holds } from '../involution/index.js'
import { baseCensus, baseVerdictOf, type BaseVerdict } from '../base-invariance.js'

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
  // asking the evaluator about all 71,089 would spend the run on statements the guard cannot judge.
  .filter((t) => /\b(?:9+|10+|142857|588235294117647)\b/.test(String(t.statement ?? '')))
  .map((t) => ({ key: String(t.key), file: String(t.file), statement: String(t.statement ?? '') }))

console.log(`statements carrying a base-ten artefact: ${rows.length} of ${theorems().length}`)

const verdicts: BaseVerdict[] = rows.map((r) =>
  baseVerdictOf(r, (s) => holds(s, wingSource(r.file))))
const c = baseCensus(verdicts)

console.log(`invariant ${c.invariant} · NOTATIONAL ${c.notational} · suspect ${c.suspect} · unread ${c.unread} · no artefact ${c.noArtefact}`)
console.log()
const notational = verdicts.filter((v) => v.verdict === 'notational')
for (const v of notational.slice(0, 20)) {
  const f = v.failedIn[0]!
  const how = f.absent.length > 0
    ? `no analogue in base ${f.base} for ${f.absent.map((a) => a.numeral).join(', ')}`
    : `base ${f.base}: ${f.swapped.map((s) => `${s.from}→${s.to}`).join(', ')}`
  console.log(`  ✗ ${v.key}  [${v.file}]`)
  console.log(`      ${how}`)
}
if (notational.length > 20) console.log(`  … and ${notational.length - 20} more`)

// THE CENSUS IS WRITTEN, not only printed. 1,442 findings cannot be read from a terminal tail, and re-running the
// evaluator over 2,844 statements to ask a follow-up question is the kind of cost this tree calls a crack. The
// artefact is committed so the gate can read it and a reader can analyse it without paying for the walk again.
const byWing = new Map<string, { notational: number; suspect: number; invariant: number }>()
for (const v of verdicts) {
  const w = byWing.get(v.file) ?? { notational: 0, suspect: 0, invariant: 0 }
  if (v.verdict === 'notational') w.notational += 1
  else if (v.verdict === 'suspect') w.suspect += 1
  else if (v.verdict === 'invariant') w.invariant += 1
  byWing.set(v.file, w)
}
const wings = [...byWing].map(([wing, n]) => ({ wing, ...n }))
  .sort((a, b) => b.notational - a.notational || a.wing.localeCompare(b.wing))
writeFileSync(join(ROOT, 'lean', 'base-invariance.json'), JSON.stringify({
  kind: 'base-invariance-census',
  asked: c.asked,
  invariant: c.invariant,
  notational: c.notational,
  suspect: c.suspect,
  unread: c.unread,
  honest: 'notational means the statement is TRUE and depends on base-ten writing; it must declare that, never be '
    + 'deleted. A one-digit artefact cannot convict, so those are suspect and a reader decides.',
  wings,
  notationalKeys: c.notationalKeys,
}, null, 2) + '\n')
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
