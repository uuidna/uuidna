#!/usr/bin/env node
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
console.log()
console.log('A NOTATIONAL STATEMENT IS TRUE AND STAYS. The fix is a word in its key or its prose saying the claim is')
console.log('about decimal writing — never a deletion. Midy\'s theorem is this, and it knows it.')
