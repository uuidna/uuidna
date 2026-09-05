// lean-prose — THE PROSE IS AUDITED BY THE SAME KERNEL THAT AUDITS THE PROOFS.
//
// Every other wing seals arithmetic about some outside subject. These facts seal arithmetic about the LEDGER'S OWN
// SENTENCES: the `/-- … -/` doc comments `emit` now writes above each theorem. Prose used to live where nothing
// could check it — in markdown pages, in a JSON manifest beside the proof — so a sentence could describe a theorem
// that no longer said that, and the build would pass. Moving the prose into the Lean put it under the kernel's
// signature; these facts put it under the kernel's DECISION.
//
// NOT A NEW WING, BY LAW. The first version of this shipped as lean/Prose.lean, and the grid gate refused it: wings
// move THREE at a time (6 × 72 = 432, digital root 9), so a 73rd breaks the harmony the ledger is seated on. Adding
// two more wings to pad the count would have been inventing theorems to satisfy arithmetic. These facts fold into
// Audit.lean instead, whose subject already IS the provenance gate — the honesty detector gaining a sixth sense
// rather than a new wing being built beside it.
//
// PURE ARITHMETIC, NOT AN EMPIRICAL QUANTITY. Every number here is a census of files in this repository, counted by
// this script at generation time. Nothing is drawn from an outside standard, agency or survey, and no authority is
// cited because none is owed: these are counts of the ledger's own bytes, reproducible by anyone who runs the same
// count over the same tree.
//
// WHAT IS ACTUALLY FALSIFIABLE HERE, stated plainly because the shape invites the opposite reading. The census is
// taken from lean/*.lean before a byte is written, and the resulting integers go into the propositions — so the
// `by decide` step confirms the arithmetic, and the FALSIFIER is the `js` predicate on each fact. `emit` checks
// every one first and exits non-zero if any is false, so an undocumented theorem, a doc comment that does not
// round-trip, or an unescaped terminator STOPS THE BUILD rather than being sealed as a smaller number. The theorem
// is the receipt; the js predicate is the gate — and the mutation test that removes one doc comment from one wing
// fails it, which is how that claim was checked rather than asserted.
//
// SELF-EXCLUSION, DECLARED. Audit.lean is not in its own census: it is written after the count it states, so
// including it would either lag by one generation or demand a fixed point (the character fold cannot converge on a
// text whose length it is embedded in). A declared boundary passes where an undeclared one is caught
// (drift_is_named_or_caught). Every OTHER generated wing counts.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, docComment, m9, type Fact } from './lean-gen.js'

const LEAN_DIR = join(ROOT, 'lean')
const SELF = 'Audit.lean'

// WHICH WINGS ARE GENERATED IS MEASURED. The first version of this file carried a hand-written list of
// the hand-written wings, and it was wrong within the hour: it named three (Uuidna, Vortex, OneLeap) when there are
// six — AntiFraud, DisputedTopics and SailingSeals are authored Lean too, and the audit charged their 52 theorems
// against the emitter as missing prose. A typed list of what is generated is exactly the kind of claim this
// repository does not accept anywhere else.
//
// `emit` stamps every file it writes with `-- lean/<File> — GENERATED.` on the first line. That stamp is the
// evidence, so the classification reads it: a file carrying it is the emitter's and must be documented; a file
// without it was written by a person and is out of scope, because no generator will ever put a doc comment there.
const GENERATED = /^-- lean\/\S+ — GENERATED\./
const isGenerated = (text: string): boolean => GENERATED.test(text)

/** every theorem in a file, paired with the doc comment immediately above it (empty when there is none) */
function census(text: string): { key: string; statement: string; doc: string }[] {
  const DOC = /\/--((?:(?!-\/)[\s\S])*?)-\/\s*$/
  return [...text.matchAll(/theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:\/--|--|theorem|def|namespace|end|$))/g)]
    .map((m) => {
      const d = DOC.exec(text.slice(0, m.index))
      return {
        key: m[1],
        statement: m[2].trim().replace(/\s+/g, ' '),
        doc: d ? d[1].trim().replace(/\s+/g, ' ') : '',
      }
    })
}

const candidates = readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean') && f !== SELF).sort()
const texts = new Map(candidates.map((f) => [f, readFileSync(join(LEAN_DIR, f), 'utf8')]))
const files = candidates.filter((f) => isGenerated(texts.get(f)!))
const authored = candidates.filter((f) => !isGenerated(texts.get(f)!))

const all = files.flatMap((f) => census(texts.get(f)!))

const total = all.length
const documented = all.filter((t) => t.doc.length > 0).length
const undocumented = total - documented

// ROUND TRIP. A doc comment survives the wrap-and-reparse exactly, or the prose the site shows is not the prose the
// kernel signed. Re-wrapping each doc through the SAME docComment the emitter uses and re-reading it must return
// the text it started from — the identity that makes the .lean the single source of the name.
const reparse = (doc: string): string => {
  const wrapped = docComment(doc)
  const m = /\/--([\s\S]*?)-\/\s*$/.exec(wrapped.trim())
  return m ? m[1].trim().replace(/\s+/g, ' ').replace(/-\\\//g, '-/') : ''
}
const roundTripped = all.filter((t) => t.doc.length > 0 && reparse(t.doc) === t.doc).length
const brokenTrip = documented - roundTripped

// THE TERMINATOR. `-/` inside a doc comment closes it early, and the theorem below it stops parsing as a theorem.
// Escaped on the way in; counted here on the way out, because "no name contains one today" is not a property.
const terminators = all.filter((t) => /(?<!\\)-\//.test(t.doc)).length

// HOLLOW PROSE. A doc that merely repeats the statement carries nothing the Lean did not already say. This is the
// one figure here that is NOT zero, and it is sealed at its measured value rather than as a target: it is the
// remaining work, counted, so it can only be driven down by the ratchet below and never quietly grow.
const bare = all.filter((t) => t.doc.length > 0 && t.doc === t.statement).length
const informative = documented - bare

// THE FOLD. One ℤ/9 receipt over the whole prose corpus — tamper-evident in the ledger's own vortex arithmetic:
// change one character of one sentence and the digit moves.
const fold = m9(all.reduce((a, t) => a + t.doc.length, 0))
const chars = all.reduce((a, t) => a + t.doc.length, 0)

// THE KERNEL MUST DO THE ARITHMETIC, OR THE THEOREM IS FURNITURE.
//
// The first version of this wing stated `(1252 = 1252) ∧ (0 = 0)`. Both are true, both decide instantly, and
// neither can fail for any tree: the census had already been reduced to a literal before Lean saw it, so the kernel
// compared a number to itself and signed the result. This repository has a standing CRITICAL finding about exactly
// that shape, and a wing whose subject is the honesty of the ledger's prose is the last place to reproduce it.
//
// So the per-wing counts go into Lean as DATA and the kernel folds them. `docs` is the documented count per
// generated wing and `thms` the theorem count per wing, both in the same file order. The kernel sums 66 numbers and
// compares the two 66-element lists elementwise — work it actually performs, over every wing, and work that FAILS
// the moment any single wing's counts disagree. A gap in one file out of sixty-six breaks the list equality; a
// literal compared to itself never could.
//
// foldl over an explicit list rather than List.sum: the ledger's trust base is the bare kernel, and structural
// recursion keeps it there (lean-axioms proves no wing borrows propext).
const perWing = files.map((f) => {
  const c = census(texts.get(f)!)
  return { file: f, thms: c.length, docs: c.filter((t) => t.doc.length > 0).length, chars: c.reduce((a, t) => a + t.doc.length, 0),
    // PER WING, so the statement can compare two INDEPENDENT measurements rather than a total to itself.
    trips: c.filter((t) => t.doc.length > 0 && reparse(t.doc) === t.doc).length,
    clean: c.filter((t) => t.doc.length > 0 && !/(?<!\\)-\//.test(t.doc)).length }
})
const L = (ns: number[]): string => '[' + ns.join(', ') + ']'
const SUM = (ns: number[]): string => `(${L(ns)}.foldl (· + ·) 0)`
const docsPer = perWing.map((w) => w.docs)
const thmsPer = perWing.map((w) => w.thms)
const charsPer = perWing.map((w) => w.chars)
const tripsPer = perWing.map((w) => w.trips)
const cleanPer = perWing.map((w) => w.clean)

export const proseFacts = (): Fact[] => [
  { key: 'prose_coverage_total',
    name: `every generated theorem carries prose IN the Lean — ${documented} of ${total} documented across ${files.length} wings, ${undocumented} without; the kernel sums the per-wing counts and compares them wing by wing rather than comparing a total to itself, so a gap in any ONE file breaks the equality; the doc comment rides inside the text the kernel signs, and a sentence cannot drift from the proof it describes without moving the file's content-address`,
    js: () => documented === total && undocumented === 0 && docsPer.every((d, i) => d === thmsPer[i]),
    stmt: `(${SUM(docsPer)} = ${documented}) ∧ (${L(docsPer)} = ${L(thmsPer)})` },

  { key: 'prose_round_trips',
    name: `the prose round-trips exactly — ${roundTripped} of ${documented} doc comments re-wrap through the emitter and re-read to the text they started from, ${brokenTrip} broken; the .lean is the single source of a theorem's name only if reading it back returns what was written, so the identity is counted and not assumed`,
    js: () => brokenTrip === 0 && roundTripped === documented && tripsPer.every((t, i) => t === docsPer[i]),
    // WING BY WING, NOT A TOTAL AGAINST ITSELF. The old statement was `(roundTripped + broken = documented) ∧
    // (broken = 0)`, which degenerates to `(2604 + 0 = 2604) ∧ (0 = 0)` EXACTLY WHEN THE PROPERTY HOLDS — two
    // tautologies, true whatever the prose does, under a key claiming the prose round-trips. Found by
    // ceccec-github-io-5b's sibling session uuidna-87 and confirmed here; `vacuousGaps` read 0 throughout,
    // blind to `x + 0 = x`. The cure is the one this file's own prose_coverage_total already brags about:
    // compare two INDEPENDENTLY measured per-wing lists, so one broken round-trip in any single wing moves one
    // element and the equality fails.
    stmt: `(${L(tripsPer)} = ${L(docsPer)}) ∧ (${brokenTrip} = 0)` },

  { key: 'prose_terminator_escaped',
    name: `no doc comment contains an unescaped -/ — ${terminators} found across ${documented}; the terminator would close the comment early and the theorem beneath it would stop parsing as a theorem, so it is escaped on the way in and counted on the way out rather than assumed absent because none appear today`,
    js: () => terminators === 0 && cleanPer.every((c, i) => c === docsPer[i]),
    // The same defect as prose_round_trips above, in the same file: `(0 + 2604 = 2604) ∧ (0 = 0)` is true
    // whatever any doc comment contains. Now the per-wing count of docs carrying NO unescaped terminator is
    // measured separately and compared to the per-wing documented count, so one unescaped `-/` anywhere breaks
    // the list equality in the wing that holds it.
    stmt: `(${L(cleanPer)} = ${L(docsPer)}) ∧ (${terminators} = 0)` },

  { key: 'prose_beats_restatement',
    name: `prose that says more than the statement OUTNUMBERS prose that repeats it — ${informative} informative against ${bare} bare, of ${documented}; a doc comment identical to its own Lean statement carries nothing the proof did not already say, and this is the remaining work counted rather than a target claimed`,
    js: () => informative > bare && informative + bare === documented,
    stmt: `(${bare} < ${informative}) ∧ (${bare} + ${informative} = ${documented})` },

  { key: 'prose_folds_receipt',
    name: `the whole prose corpus folds to ONE ℤ/9 receipt — ${chars} characters across ${documented} doc comments in ${files.length} wings fold to ${fold}; the kernel sums the per-wing character counts itself and takes the residue, the ledger's own vortex arithmetic over its own sentences, so a single changed character in any wing moves the digit`,
    js: () => fold === m9(chars) && fold < 9 && charsPer.reduce((a, b) => a + b, 0) === chars,
    stmt: `(${SUM(charsPer)} = ${chars}) ∧ (${chars} % 9 = ${fold}) ∧ (${fold} < 9)` },

  { key: 'prose_audit_total',
    name: `the audit is TOTAL over what a generator writes — ${files.length} generated wings censused against ${authored.length} authored ones (${authored.map((f) => f.replace('.lean', '')).join(', ')}), each classified by the GENERATED stamp emit puts in its own header rather than by a typed list; the authored wings are out of scope because no generator will ever write them a doc comment, and this wing excludes itself because it is written after the census it states`,
    js: () => files.length > 0 && authored.length > 0 && !files.includes(SELF) && total === documented + undocumented,
    stmt: `(0 < ${files.length}) ∧ (0 < ${authored.length}) ∧ (${total} = ${documented} + ${undocumented})` },
]

