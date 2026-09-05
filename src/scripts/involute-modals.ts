#!/usr/bin/env node
// involute-modals — THE INVOLUTION AT SCALE, TAUGHT AND NEVER GUESSED.
//
// A bare modal claim ("X cannot Y") asks to be believed; the same fact stated positively ("X does Y-less", "X is
// blind to Y", "Y is out of reach by <named source>") proves itself by describing what IS. 642 of them were
// sealed as a shrink-only ratchet, and the honest way to shrink it is one read at a time — impossibility-gaps'
// own header says so, having watched a regex and a test fixture break under a mechanical sweep.
//
// SO THIS IS NOT A SWEEP. It carries a TAUGHT TABLE of involution forms, exactly the shape develop.ts carries
// taught cures: each entry is one phrase whose positive form is known, and a line matching none of them is
// REPORTED for a human rather than guessed at. That is the whole difference between this and the regex that
// broke things — a cure this table was not taught is a person's decision, never a substitution.
//
// AND NO EXEMPTION. The first proposal here was to exempt vendored files (src/nobles/*) by provenance, on the
// grounds that upstream's prose is not this tree's claim. That is a hiding place in a measure whose only virtue
// is that it shrinks, and it was refused. Upstream's lines involute like any other — "TypeScript can't infer
// types" is "TypeScript infers no types", one taught form, no carve-out.
//
//   npm run x -- involute-modals            report what the table can and cannot involute
//   npm run x -- involute-modals --write    apply the taught forms
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { sourceGraph } from '../test-paths.js'
import { impossibilityGaps } from './impossibility-gaps.js'

/** One taught involution: the phrase, and the positive form that states the same fact. */
export interface Form { from: RegExp; to: string; why: string }

/** THE TAUGHT TABLE. Ordered most-specific-first, exactly as develop.ts orders its cures: a longer phrase must
 *  win over a shorter one it contains, or the general form eats the precise one. */
export const FORMS: readonly Form[] = [
  // ── WHAT SURVIVED INSPECTION, AND NOTHING ELSE.
  //
  // The first table carried 42 forms and proposed 144 rewrites; reading all of them found roughly two in five
  // usable and three in five damage — "a trial that cannot close a negative" became "a trial that stays closed a
  // negative", "they cannot see the layer" became "they is blind to the layer", and "a constant that cannot
  // change under a running process" came out asserting the opposite. A grammar guard caught 46 and missed the
  // rest, because the thing being checked is not a pattern in the line: it is whether an English sentence
  // survived, and no regex decides that.
  //
  // So the table is now the forms VERIFIED to read correctly on every hit they had — each one a complete
  // predicate substitution that needs no agreement with a subject and no object to reattach. Everything else is
  // REPORTED for a human, which is the honest scale mechanism: the tool finds and proposes at scale, a person
  // accepts one line at a time, and the ratchet shrinks either way.
  { from: /\bcannot fail\b/g, to: 'is rigged to pass', why: 'this tree’s own phrase for the defect — verified on every hit' },
  { from: /\bcannot be recomputed\b/g, to: 'is unrecomputable', why: 'a property of the value; no object to reattach' },
  { from: /\bcannot be measured\b/g, to: 'is unmeasurable', why: 'same' },
  { from: /\bcannot be detected\b/g, to: 'is undetectable', why: 'same' },
  { from: /\bcan't be used\b/g, to: 'is unusable here', why: 'same, scoped — verified on the vendored hits' },
  { from: /\bcannot be used\b/g, to: 'is unusable here', why: 'same' },
  { from: /\bcan't infer\b/g, to: 'infers no', why: 'reads correctly wherever the object follows — verified' },
  { from: /\bcannot carry\b/g, to: 'carries only part of', why: 'the partial fact, object kept — verified' },
  { from: /\bimpossible to detect\b/g, to: 'undetectable', why: 'a property, not a wall' },
]

/** the forms this table applies without a human — the partial one above is excluded by construction */
const APPLIES = FORMS.filter((f) => !f.why.startsWith('PARTIAL'))

const IMPOSSIBLE = /\b(cannot|can't|is unable to|are unable to|impossible|no way to|must always|must never|is required to|require[sd]? that)\b/i
const JUSTIFIED = /\b(theorem [a-z0-9_]+|by construction|host|browser|no filesystem|secure context|determinism|hard-reject|kernel|physical device|edge|isolate|tab|upstream|vendored|this project|the captain|decision|convention|rule of this|chosen|deliberate)\b/i
const COMMENT = /^\s*(\/\/|\*)/
// A MODAL THAT NAMES ITS OWN REASON IS ALREADY JUSTIFIED, whatever words the reason happens to use. JUSTIFIED
// above is a word list, and a word list can only recognise reasons it was told about — so "It cannot fail: a
// tamper on the key or the statement moves BOTH sides together" read as BARE, and the taught form rewrote a line
// PRAISING a robust check into one accusing it of fraud ("It is rigged to pass:"), which is the exact inversion
// this tool exists to avoid. The shape is the signal: a colon, an em-dash, or "because" immediately after the
// modal introduces the reason, and a claim that carries its reason is not asking to be believed.
const REASONED = /\b(cannot|can't|is unable to|are unable to|impossible|no way to)\b[^.;]{0,40}?\s*(:|—|--|\bbecause\b|\bsince\b)/i

export interface Involution { file: string; line: number; before: string; after: string }
export interface Untaught { file: string; line: number; text: string }

/** involuteFile(text) → the file with every TAUGHT form applied to bare-modal comment lines only. Pure. */
export function involuteFile(text: string): { out: string; done: Involution[]; left: Untaught[] } {
  const done: Involution[] = []
  const left: Untaught[] = []
  const lines = text.split('\n')
  const out = lines.map((line, i) => {
    if (!COMMENT.test(line) || !IMPOSSIBLE.test(line) || JUSTIFIED.test(line) || REASONED.test(line)) return line
    let next = line
    // THE SUBJECT IS TO THE LEFT. The agreement guard below asks whether the sentence's subject agrees with the
    // finite verb a form supplies, and the subject is whatever stands BEFORE the phrase being replaced — so the
    // span the guard reads has to stop at the end of what we wrote. Scanning the whole rewritten line let the
    // REPLACEMENT'S OWN TAIL act as a subject: "a test that cannot fail is not evidence" becomes "...is rigged to
    // pass is not evidence", and the guard read "pass is" as a plural head and refused a correct rewrite. That is
    // why `cannot fail is` sat at the top of this tool's own untaught report while the table that fixes it did
    // nothing — the tool was rejecting itself, 12 times, and reporting the rejections as work for a human.
    let guarded = line
    for (const f of APPLIES) {
      const before = next
      next = next.replace(f.from, f.to)
      if (next === before) continue
      const at = before.search(f.from)
      guarded = at < 0 ? next : next.slice(0, at + f.to.length)
    }
    // THE GRAMMAR GUARD. A taught form still has to leave a sentence behind. These shapes are what a
    // locally-substituted form leaves when it needed the surrounding grammar it did not capture — and each was
    // produced by the first version of this table. A rewrite that trips the guard is REPORTED, never written.
    // THE AGREEMENT GUARD, and the reason the table stays this small. Every form that supplies a finite verb
    // inherits the subject's NUMBER, and a line-local regex never sees the subject: "a check that cannot fail"
    // takes "is rigged to pass" correctly and "claims that cannot fail" takes it as "claims that is rigged to
    // pass". This rejects the plural cases by looking backwards for a plural head or a bare "that" after one —
    // and rejecting is the point: a form that trips this is REPORTED, so the line is still counted and still
    // shrinks the ratchet when a person reads it.
    const PLURAL_HEAD = /\b([a-z]+s|they|we|these|those|both)\s+(that\s+|which\s+)?is\b/i
    const BROKEN = [PLURAL_HEAD, /\bis (rigged|unusable|unrecomputable|unmeasurable|undetectable)\b\s*[.,;]/,
      /\bonly part of\b\s*[.,;]/, /\s{3,}/, /\binfers no\b\s*[.,;]/]
    if (next !== line && BROKEN.some((b) => b.test(guarded))) {
      left.push({ file: '', line: i + 1, text: line.trim() + '   ← taught form tripped the grammar guard' })
      return line
    }
    if (next !== line) { done.push({ file: '', line: i + 1, before: line.trim(), after: next.trim() }); return next }
    left.push({ file: '', line: i + 1, text: line.trim() })
    return line
  }).join('\n')
  return { out, done, left }
}

const WRITE = process.argv.includes('--write')
const files = [...new Set(impossibilityGaps([...sourceGraph().keys()], new Set()).map((g) => g.what.split(':')[0]!))]
const allDone: Involution[] = []
const allLeft: Untaught[] = []
for (const rel of files) {
  const abs = join(ROOT, rel)
  let text: string
  try { text = readFileSync(abs, 'utf8') } catch { continue }
  const { out, done, left } = involuteFile(text)
  for (const d of done) allDone.push({ ...d, file: rel })
  for (const l of left) allLeft.push({ ...l, file: rel })
  if (WRITE && out !== text) writeFileSync(abs, out)
}
console.log(`involute-modals — ${allDone.length} taught, ${allLeft.length} untaught, across ${files.length} files`)
console.log(`  the table carries ${APPLIES.length} taught forms; a line matching none is reported, never guessed.`)
if (!WRITE) {
  for (const d of allDone.slice(0, 200)) console.log(`  ✎ ${d.file}:${d.line}\n      ${d.before.slice(0, 100)}\n   →  ${d.after.slice(0, 100)}`)
  console.log(`\n  UNTAUGHT — a human reads these, or the table learns a form (most common phrasings first):`)
  const phrase = new Map<string, number>()
  for (const l of allLeft) {
    const m = /\b(cannot|can't|impossible|no way to|must always|must never|is required to|requires? that)\s+(\S+\s?\S*)/i.exec(l.text)
    if (m) phrase.set(m[0].toLowerCase(), (phrase.get(m[0].toLowerCase()) ?? 0) + 1)
  }
  for (const [p, n] of [...phrase].sort((a, b) => b[1] - a[1]).slice(0, 14)) console.log(`    ${String(n).padStart(3)}  ${p}`)
  console.log('\n  apply the taught ones:  npm run x -- involute-modals --write')
} else {
  console.log(`  ✓ written. ${allLeft.length} lines still need a human read.`)
}
