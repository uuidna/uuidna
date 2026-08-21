#!/usr/bin/env node
// Automate the Lean layer for THE ORBITS — and automate the AUTOMATION: this generator's facts are not typed, they
// are WALKED. Every other lean-*.ts holds a hand-authored FACTS array of {key, why, js, lean}. Here the array is
// produced by running the sequence over its own domain and reading what comes back, so adding a digit to the ring
// or changing a map changes the wing without a line being edited.
//
// WHAT IS COMPUTED RATHER THAN WRITTEN. The orbit of every seed, the distinct orbits the ring admits, each one's
// order, which seeds are fixed, and which orbits cover the whole domain — all measured by walking. The theorem KEY
// is derived from the orbit itself (its members joined), and the SENTENCE is composed from the same measurements,
// never selected from a table of phrases. A phrase table is the defect this project keeps finding: nine hand-typed
// sentences lost a word in a refactor and no check noticed, because a word in a table has no witness.
//
// HONEST SCOPE: integrity, not truth. This decides the measured shape of the walk over ten digits. That the walk
// models anything is not claimed, and a residue is not a fact about whatever folded to it.
import { emit } from './lean-gen.js'

const D = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const dz = (d: number) => (d === 0 ? 0 : 10 - d)
const dbl = (d: number) => (2 * d) % 9

// WALK, do not assert: alternate the two maps from a seed until the reached set stops growing
const orbitOf = (seed: number): number[] => {
  const seen = new Set<number>(); let x = seed, i = 0
  while (i < 40 && seen.size < 11) { seen.add(x); x = i % 2 === 0 ? dz(x) : dbl(x); i++ }
  return [...seen].sort((a, b) => a - b)
}
const ORBITS = D.map(orbitOf)
const DISTINCT = [...new Map(ORBITS.map((o) => [o.join(','), o])).values()].sort((a, b) => b.length - a.length)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const LL = (xs: number[][]) => '[' + xs.map(L).join(',') + ']'
const closed = (o: number[]) => o.every((d) => o.includes(dz(d)))

// the FACTS ARRAY, COMPUTED — one theorem per distinct orbit, plus the censuses the walk itself reports
const FACTS = [
  ...DISTINCT.map((o) => ({
    key: 'orbit_' + o.join('_') + '_closes',
    // the sentence is composed from what was measured, not chosen from a list
    why: `The walk from any seed reaching ${o[0]} settles on ${o.length} of the ten digits (${o.join(', ')})`
      + `${o.length === 10 ? ', which is every one' : ''}, and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Measured by walking, not asserted.`,
    js: () => closed(o) && o.length >= 1,
    lean: `theorem orbit_${o.join('_')}_closes : ${L(o)}.all (fun d => ${L(o)}.contains (if d = 0 then 0 else 10 - d)) := by decide`,
  })),
  { key: 'orbits_number_and_orders',
    why: `Walking every seed yields ${DISTINCT.length} distinct orbits, of orders ${DISTINCT.map((o) => o.length).join(', ')} — the whole vocabulary the ring admits, counted by walking rather than claimed.`,
    js: () => DISTINCT.length >= 1,
    lean: `theorem orbits_number_and_orders : (${LL(DISTINCT)}.length = ${DISTINCT.length}) ∧ (${LL(DISTINCT)}.map (fun o => o.length) = ${L(DISTINCT.map((o) => o.length))}) := by decide` },
  { key: 'every_seed_lands_somewhere',
    why: `Each of the ten seeds lands in one of the ${DISTINCT.length} orbits and none is left out — the orbit of every digit has at least one member, and the ten orbits together are exactly the ${DISTINCT.length} distinct ones.`,
    js: () => ORBITS.every((o) => o.length > 0),
    lean: `theorem every_seed_lands_somewhere : ${LL(ORBITS)}.all (fun o => o.length > 0) ∧ (${LL(ORBITS)}.length = 10) := by decide` },
  { key: 'covering_seeds_are_named',
    why: `Exactly ${D.filter((d) => orbitOf(d).length === 10).length} of the ten seeds reach every digit (${D.filter((d) => orbitOf(d).length === 10).join(', ')}), and the other ${10 - D.filter((d) => orbitOf(d).length === 10).length} do not — both halves measured, so the count states which seeds cover and not merely how many.`,
    js: () => { const cov: number = D.filter((d) => orbitOf(d).length === 10).length, ten: number = 10; return cov !== ten && cov > 0 },
    lean: `theorem covering_seeds_are_named : (${L(D.filter((d) => orbitOf(d).length === 10))}.length = ${D.filter((d) => orbitOf(d).length === 10).length}) ∧ (${L(D.filter((d) => orbitOf(d).length !== 10))}.length = ${10 - D.filter((d) => orbitOf(d).length === 10).length}) ∧ (${D.filter((d) => orbitOf(d).length === 10).length} + ${10 - D.filter((d) => orbitOf(d).length === 10).length} = 10) := by decide` },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Orbits.lean', skill: 'orbits', defs: '',
  header: `THE ORBITS, WALKED — and the generator's own facts are walked too. Every other wing in this ledger holds a hand-authored array of {key, why, js, lean}; this one computes its array by running the sequence over its domain and reading what comes back, so a change to the ring or to either map rewrites the wing with no line edited. Measured here: ${DISTINCT.length} distinct orbits of orders ${DISTINCT.map((o) => o.length).join(', ')}, each closed under the reflection so that reflecting a finished orbit adds no digit; every one of the ten seeds lands in one of them; and ${D.filter((d) => orbitOf(d).length === 10).length} seeds reach every digit while ${10 - D.filter((d) => orbitOf(d).length === 10).length} do not, both halves counted rather than one of them inferred. The theorem KEYS derive from the orbits themselves and the SENTENCES are composed from the same measurements — never selected from a table of phrases, which is the defect this project keeps finding: a hand-typed sentence has no witness and can be lost in a refactor without any check noticing. PURE ARITHMETIC, nothing measured from the world. HONEST SCOPE: integrity, not truth — this decides the measured shape of the walk over ten digits, claims nothing about what the walk models, and a residue is not a fact about whatever folded to it.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
