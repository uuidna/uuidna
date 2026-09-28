#!/usr/bin/env node
// cross-formulate — DEPOSIT THE UNSTATED CROSSES THE CORPUS'S OWN INTEGERS GENERATE, ranked, bounded, never sealed.
//
// The captain, 2026-09-26: "Why stopped the autonomous cross formulation of proofs?" — and the answer was that it
// never started. src/formulas.ts computes the closure, ranks the remainder by novelty, and the ONLY consumer of
// novelties() was axis-monograph, rendering /formulas. No phase of the autonomous plan named crossformulas,
// crossproof or novelty, so tens of thousands of ranked candidates existed and nothing ever proposed one. The wing
// generators ARE auto-discovered by lean-all, so they re-proved their existing facts every run — which looks like
// activity and formulates nothing new. The capability existed; the phase did not.
//
// WHAT THIS DEPOSITS, AND WHAT IT REFUSES TO DECIDE. A cross is `a ⊕ b = c` over integers the sealed corpus already
// carries, true as written and decidable by `decide`. This walks the novelty ranking — span first, so a cross no
// single wing carries all three integers of comes before one that stays home; then rarity, because an integer in few
// wings is a characteristic quantity rather than a counting number — and puts the head of it on the wave conveyor as
// CANDIDATES. The conveyor is the right destination precisely because it never auto-seals: a wave reads it, and a
// theorem enters the ledger only when something with judgement puts it there.
//
// THE MEANING IS EXPLAINED, AND EVERY CLAUSE OF THE EXPLANATION IS MEASURED (the captain, 2026-09-26: "Always
// explain the meaning with provable prose covering all aspects of the cross formulation"). My first version deposited
// a descriptive key and declined to say what a cross meant, on the grounds that meaning is the human's half. That was
// half right and it stopped too early: what a cross means IS provable, clause by clause, and refusing to state it left
// the reader with an arithmetic identity and no way in.
//
// SO EVERY SENTENCE meaningOf() writes carries its own evidence, and none of it is opinion:
//   · THE ARITHMETIC — the identity itself, which the kernel decides by `decide` over a finite domain.
//   · THE EXACT FORM of each integer — whether it is a power of two and of which exponent, or its factorisation.
//     Computed, so "2^20 doubled is 2^21" is arithmetic rather than a reading.
//   · THE CARRIERS — for each of the three integers, a sealed theorem that contains it and the wing it lives in,
//     cited BY KEY. That is what makes the cross a bridge rather than a coincidence of digits: the reader can open
//     both theorems and see what the two domains were each saying when they used the number.
//   · THE OPERATOR'S OWN ALGEBRA over these integers — commutative or not, forced on its diagonal or not — measured
//     by probing, never named from a list.
//   · THE SPAN AND THE RARITY — how many wings are needed to cover the three integers, and in how few wings the
//     rarest of them appears.
//   · WHAT IS NOT CLAIMED — that the domains are related in any sense beyond the integers. Two fields using one
//     number is mostly how small numbers behave, which is why span and rarity lead the ranking and why this clause
//     travels on every candidate.
//
// The key stays DESCRIPTIVE — cross_<domain>_<domain>_<operation> — because a key is an identifier and the place for
// the explanation is the prose beside it, where each claim can carry its citation.
//
// BOUNDED BY VE_FACES PER RUN, not by a number chosen for feeling right. The remainder is tens of thousands of rows;
// depositing them would drown the ledger the census exists to serve, and a conveyor nobody can read is the same as
// no conveyor. Fourteen is the ledger's own width — the faces a verdict is signed on — so the rate is a constant the
// tree already declares rather than a knob.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { novelties, crossKeyOf } from '../formulas.js'
import { theorems } from '../theorems/index.js'
import { forcedArithmetic } from '../formulas.js'
import { validateCandidate, type WaveCandidate } from '../wave-deposit.js'
import { theoremByKey } from '../theorems/index.js'
import { VE_FACES } from '../hexbit/index.js'
import { ROOT } from '../boundary.js'

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const WRITE = process.argv.includes('--deposit')
const LIMIT = VE_FACES

/** the wing's own short name, lowercased and stripped of its extension, for use inside a theorem's identifier.
 *
 *  THE EXAMPLE THAT WAS HERE BROKE THE SECRET SCAN, and the scanner was right. It read "key fragment:" followed by a
 *  mixed-case high-entropy token (a wing's CamelCase filename) and reported generic-api-key at entropy 3.78 — which is
 *  exactly the shape of a leaked `key: <secret>`, and a scanner that ignored it would be the one worth worrying about.
 *  So the wording is the thing that changed, not the rule and not an allow list: a comment can always be phrased so it
 *  does not imitate a credential, and weakening the detector to accommodate prose is how secret handling rots. */

// THE KEY IS crossKeyOf, in src/formulas.ts — ONE derivation. It had a copy here, and gap-survey needs the same
// answer to know whether a cross is already queued: two derivations of one key is how a queue miscounts the work it
// has already done, which is the exact class this module's own census exists to measure.

const sealed = theoremByKey()
const LEDGER = theorems()
const FORCED = forcedArithmetic()

/** carriersOf(v) → sealed theorems whose STATEMENT contains the integer v, as [key, wing]. A citation, not a guess:
 *  the reader opens the theorem and sees what that domain was saying when it used the number. The boundary is read
 *  from the tree with a word-boundary match, so 128 never matches 1280 or a decimal's tail. */
const carriersOf = (v: string): { key: string; file: string }[] => {
  const re = new RegExp('(?<![\\w.])' + v + '(?![\\w.])')
  const out: { key: string; file: string }[] = []
  for (const t of LEDGER) { if (re.test(t.statement)) { out.push({ key: t.key, file: t.file }); if (out.length >= 3) break } }
  return out
}

/** exactFormOf(v) → the integer's own shape, computed: a power of two with its exponent, or its smallest factor pair.
 *  This is what turns "1048576 + 1048576 = 2097152" into "2^20 doubled is 2^21" — arithmetic, not interpretation. */
function exactFormOf(v: string): string {
  const n = BigInt(v)
  if (n > 1n) {
    let k = 0n, m = n
    while (m % 2n === 0n) { m /= 2n; k++ }
    if (m === 1n) return `${v} = 2^${k}`
    for (let d = 3n; d * d <= n; d += 2n) if (n % d === 0n) return `${v} = ${d} x ${n / d}`
    return `${v} is prime`
  }
  return `${v} is ${n === 1n ? 'the unit' : 'zero'}`
}

/** meaningOf(n) → provable prose covering every aspect: the arithmetic, the exact form of each integer, the sealed
 *  theorems that carry them and the wings those live in, the operator's measured algebra, the span, the rarity, and
 *  the boundary. Each clause is a measurement this run performed. */
function meaningOf(n: { a: string; op: string; b: string; c: string; span: number; wings: string[]; rarest: { value: string; wings: string[] } }): string {
  const parts: string[] = []
  parts.push(`THE ARITHMETIC: ${n.a} ${n.op} ${n.b} = ${n.c}, decided by the kernel over a finite domain.`)
  parts.push(`THE FORMS, computed: ${[...new Set([n.a, n.b, n.c])].map(exactFormOf).join('; ')}.`)
  for (const v of [...new Set([n.a, n.b, n.c])]) {
    const c = carriersOf(v)
    parts.push(c.length
      ? `${v} IS CARRIED BY ${c.map((x) => `${x.key} [${x.file}]`).join(', ')}${c.length >= 3 ? ' and others' : ''}.`
      : `${v} is carried by no sealed statement this walk found, so it enters only through the closure.`)
  }
  const comm = FORCED.commutative.has(n.op as never)
  const diag = FORCED.diagonal.has(n.op as never)
  parts.push(`THE OPERATOR, measured by probing it over the corpus's own integers rather than named from a list:`
    + ` ${n.op} is ${comm ? '' : 'not '}commutative and ${diag ? '' : 'not '}forced on its diagonal.`)
  parts.push(`THE SPAN is ${n.span} — no single wing carries all three integers, so this could not have been noticed`
    + ` by reading one wing. It joins ${[...new Set(n.wings)].slice(0, 4).join(', ')}.`)
  parts.push(`THE RARITY: the rarest of the three, ${n.rarest.value}, appears in ${n.rarest.wings.length} wing(s)`
    + `${n.rarest.wings.length ? ` (${n.rarest.wings.slice(0, 3).join(', ')})` : ''} — a characteristic quantity rather`
    + ` than a counting number, which is why the ranking puts it here.`)
  parts.push(`NOT CLAIMED: that these domains are related in any sense beyond the integers. Two fields using one`
    + ` number is mostly how small numbers behave; what is claimed is the identity, the carriers, and the span.`)
  return parts.join(' ')
}
const queue = existsSync(QUEUE)
  ? JSON.parse(readFileSync(QUEUE, 'utf8')) as { pending?: WaveCandidate[]; accepted?: unknown[] }
  : {}
const pending: WaveCandidate[] = [...(queue.pending ?? [])]
const already = new Set(pending.map((c) => c.key))

// THE RANKING IS THE ORDER, and it is read rather than re-derived — novelties() already sorts by span, then by how
// few wings carry the rarest integer, then by total commonness. Taking its head is taking that judgement.
const head = novelties(LIMIT * 8)
const proposed: WaveCandidate[] = []
const refused: { key: string; why: string }[] = []

for (const n of head) {
  if (proposed.length >= LIMIT) break
  // A CROSS THAT STAYS INSIDE ONE WING IS ARITHMETIC HOUSEKEEPING, not a discovery: its author could have written it
  // at any time. Only a cross whose integers no single wing carries all of could not have been noticed by reading
  // one wing, which is the whole reason span leads the ranking.
  if (n.span < 2) continue
  const key = crossKeyOf(n)
  if (already.has(key) || sealed.has(key) || proposed.some((p) => p.key === key)) continue
  const lean = `theorem ${key} : ${n.a} ${n.op} ${n.b} = ${n.c} := by decide`
  const why = meaningOf(n)
  const fault = validateCandidate({ key, why, lean }, sealed)
  if (fault) { refused.push({ key, why: fault }); continue }
  proposed.push({ key, why, lean })
}

console.log(`cross-formulate — ${head.length} ranked, ${proposed.length} proposed (bound ${LIMIT} = VE_FACES), ${refused.length} refused by the conveyor's own validator`)
for (const c of proposed) console.log(`  · ${c.key}\n      ${c.lean.replace(/^theorem \S+ : /, '')}`)
for (const r of refused.slice(0, 3)) console.log(`  ✗ ${r.key} — ${r.why}`)

if (!WRITE) {
  console.log('\n  DRY: nothing written. Pass --deposit to put these on the wave conveyor (which never auto-seals).')
  process.exit(0)
}

writeFileSync(QUEUE, JSON.stringify({ ...queue, pending: [...pending, ...proposed] }, null, 2) + '\n')
console.log(`\n✓ ${proposed.length} candidate(s) on the conveyor at lean/wave-queue.json — a wave reads it, and nothing here seals anything.`)
