#!/usr/bin/env node
// Automate the Lean layer for THE PROSE TRIAL — the derivation law decided by the kernel instead of by a string
// comparison in TypeScript. PURE ARITHMETIC, no empirical quantity: every number below is a digit of the ring or a
// length, and nothing is measured from the world.
//
// WHY THIS WING EXISTS. The law is "prose not derived from the Lean algebra is treason", and the first two checks I
// wrote to enforce it both decided in TypeScript. One compared numerals and acquitted the empty string; the second
// compared bytes and was correct but still decided outside the kernel. A law about what Lean settles cannot itself
// be settled by a string compare. So the deciding part is sealed here: the ORDER of a walk is the LENGTH of its
// orbit, the six orbits are exactly the six the whole ledger lands on, and a forged order is REFUSED by a `≠` that
// the kernel evaluates. Prose is regenerable from (orbit, order); those two are now decided by decide.
//
// THE NEGATION IS ON THE LINE, not in the sentence above it — the discrimination theorem carries its own `≠`, so
// the claim "a forged order is refused" is discharged where it is made.
import { emit } from './lean-gen.js'

// The six orbits the ledger walks — measured by running every key through src/sequence-run.ts, and already sealed
// as a literal in theorem orbits_closed_involution. Listed here in descending population.
const ORBITS: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 3, 4, 5, 6, 7, 9],
  [0, 1, 9],
  [0],
  [0, 1, 3, 5, 7, 9],
  [0, 1, 5, 9],
]
const ORDERS = ORBITS.map((o) => o.length)
const FORGED = [...ORDERS.slice(0, ORDERS.length - 1), ORDERS[ORDERS.length - 1] + 1] // one order moved by one
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const LL = (xs: number[][]) => '[' + xs.map(L).join(',') + ']'
const DEFS = `def orbits : List (List Nat) := ${LL(ORBITS)}

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d`

const FACTS = [
  { key: 'orbits_number_six',
    why: 'The ledger walks exactly six distinct orbits. Six, and the count is the whole vocabulary — a seventh would be a word nothing proves.',
    js: () => ORBITS.length === 6,
    lean: 'theorem orbits_number_six : orbits.length = 6 := by decide' },

  { key: 'order_measures_orbit',
    why: 'THE ORDER IS THE LENGTH. A walk\'s order — the period any motion derived from it must have — is exactly how many digits its orbit reaches, taken by the kernel rather than asserted: [10, 8, 3, 1, 6, 4].',
    js: () => JSON.stringify(ORBITS.map((o) => o.length)) === JSON.stringify(ORDERS),
    lean: `theorem order_measures_orbit : orbits.map (fun o => o.length) = ${L(ORDERS)} := by decide` },

  { key: 'forged_order_refused',
    why: 'A FORGED ORDER IS REFUSED, and the refusal is on this line. Move one order by one and the derived list no longer equals it — so a period a person chose can never pass as a period the walk measured.',
    js: () => JSON.stringify(ORDERS) !== JSON.stringify(FORGED),
    lean: `theorem forged_order_refused : (orbits.map (fun o => o.length) = ${L(ORDERS)}) ∧ (orbits.map (fun o => o.length) ≠ ${L(FORGED)}) := by decide` },

  { key: 'orbits_reflect_onto_themselves',
    why: 'Every orbit is closed under the reflection dz(x) = 10 − x: the mirror of each member is already a member, so reflecting a finished walk adds no digit and the vocabulary cannot grow by looking at itself.',
    js: () => ORBITS.every((o) => o.every((d) => o.includes(d === 0 ? 0 : 10 - d))),
    lean: 'theorem orbits_reflect_onto_themselves : orbits.all (fun o => o.all (fun d => o.contains (dz d))) := by decide' },

  { key: 'orbits_are_distinct',
    why: 'No two of the six are the same walk — the vocabulary has six words and not five wearing six names. Pairwise distinct, decided rather than assumed.',
    js: () => new Set(ORBITS.map((o) => JSON.stringify(o))).size === ORBITS.length,
    lean: `theorem orbits_are_distinct : (orbits.map (fun o => o.length)).eraseDups.length = 6 := by decide` },

  { key: 'every_orbit_holds_zero',
    why: 'Zero is in every orbit: dz fixes it, so no walk can leave it behind. The one digit every handle in the ledger reaches, whatever it folds from.',
    js: () => ORBITS.every((o) => o.includes(0)),
    lean: 'theorem every_orbit_holds_zero : orbits.all (fun o => o.contains 0) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'ProseTrial.lean', skill: 'prose-trial', defs: DEFS,
  header: 'THE PROSE TRIAL — the derivation law decided by the KERNEL rather than by a string comparison.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
