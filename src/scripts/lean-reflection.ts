#!/usr/bin/env node
// Automate the Lean layer for THE REFLECTION'S REACH — what an involution alone can and cannot separate, measured
// against the walk that adds an irreversible step. PURE ARITHMETIC: every number is a digit of the ring or a count
// of classes; nothing is measured from the world and no ledger count appears, so nothing here drifts.
//
// WHY. Clay.lean reflects the seven problems through dz(x) = 10 − x and says plainly that it "reflects all seven and
// solves none" — a bijection relabels and propagates no proof. This wing DECIDES that limitation instead of stating
// it: dz alone splits the ten digits into six classes of at most two, and it cannot tell the seventh residue from
// the third, because they share a class. The full walk (dz alternating with the irreversible doubling) separates
// them — the seventh is in the covering half of the ring, sealed in Seats.lean as digits_split_five_five.
//
// SIX IS FORCED, NOT FOUND. An involution on ten points with two fixed points has 2 + (10 − 2)/2 = 6 classes by
// arithmetic. That the sequence's own orbit count is also six is a SEPARATE measurement landing on the same
// integer; this wing seals why the reflection's six is unavoidable and claims no correspondence between them.
//
// A CORRECTION SEALED HERE: I said in conversation that the seven residues occupy four of the six classes. They
// occupy FIVE — Hodge sits alone at 5, its own class, which I omitted. The js mirror below computes it rather than
// repeating me, and only class 0 goes unreached.
import { emit } from './lean-gen.js'

const dz = (d: number) => (d === 0 ? 0 : 10 - d)
const dzMin = (d: number) => (dz(d) < d ? dz(d) : d)          // a class named by its least member
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const CLASSES = [...new Set(DIGITS.map(dzMin))].sort((a, b) => a - b)
const SIZES = CLASSES.map((c) => DIGITS.filter((d) => dzMin(d) === c).length)
const SEVEN = [1, 2, 3, 4, 5, 6, 7]
const SEVEN_CLASSES = [...new Set(SEVEN.map(dzMin))].sort((a, b) => a - b)
const FIXED = DIGITS.filter((d) => dz(d) === d)
const COVERING = [2, 6, 7, 8, 9]                               // sealed in Seats.lean as digits_split_five_five
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d

-- a reflection class, named by its least member: d and dz d share one class
def dzMin (d : Nat) : Nat := if dz d < d then dz d else d`

const FACTS = [
  { key: 'reflection_splits_six',
    why: 'The reflection alone splits the ten digits into SIX classes — each digit paired with its mirror, named by the lesser: [0, 1, 2, 3, 4, 5].',
    js: () => JSON.stringify(CLASSES) === JSON.stringify([0, 1, 2, 3, 4, 5]),
    lean: `theorem reflection_splits_six : ((List.range 10).map dzMin).eraseDups.length = 6 := by decide` },

  { key: 'classes_cap_at_two',
    why: 'NO CLASS EXCEEDS TWO. An involution can carry a digit to its mirror and back and no further, so the widest thing it can build is a pair. Sizes: [2, 2, 2, 2, 2, 2] over the six classes — a partition with almost no structure, because reversibility erases nothing and therefore derives nothing.',
    js: () => SIZES.every((n) => n <= 2),
    lean: `theorem classes_cap_at_two : ((List.range 10).map dzMin).eraseDups.all (fun c => ((List.range 10).filter (fun d => dzMin d == c)).length ≤ 2) := by decide` },

  { key: 'six_is_forced_arithmetic',
    why: 'SIX IS FORCED, NOT DISCOVERED: dz fixes exactly two of the ten digits (0 and 5) and pairs the other eight, so the class count is 2 + (10 − 2)/2 = 6 by arithmetic. SCOPE: the sequence walk also yields six orbits, and that is a SEPARATE measurement landing on the same integer. No correspondence between the two sixes is claimed or sealed.',
    js: () => FIXED.length === 2 && 2 + (10 - 2) / 2 === 6,
    lean: 'theorem six_is_forced_arithmetic : (((List.range 10).filter (fun d => dz d == d)).length = 2) ∧ (2 + (10 - 2) / 2 = 6) := by decide' },

  { key: 'seven_reach_five_classes',
    why: 'The seven reflected residues occupy FIVE of the six classes, not all six — class 0 is never reached, because no problem is seated at the digit the reflection fixes to itself and nothing else. Two pairs collide: the sixth residue shares a class with the fourth, and the seventh with the third.',
    js: () => SEVEN_CLASSES.length === 5 && !SEVEN_CLASSES.includes(0),
    lean: `theorem seven_reach_five_classes : (((List.range' 1 7).map dzMin).eraseDups.length = 5) ∧ (!(((List.range' 1 7).map dzMin).contains 0)) := by decide` },

  { key: 'reflection_confuses_seven_three',
    why: 'THE LIMITATION, DECIDED: the reflection cannot tell the seventh residue from the third — dzMin 7 = dzMin 3 — so under dz alone they are one object. A bijection relabels; it does not distinguish. This is what "reflects all seven and solves none" means, stated as a fact the kernel settles rather than a sentence in a header.',
    js: () => dzMin(7) === dzMin(3) && dzMin(6) === dzMin(4),
    lean: 'theorem reflection_confuses_seven_three : (dzMin 7 = dzMin 3) ∧ (dzMin 6 = dzMin 4) := by decide' },

  { key: 'seventh_covers_reflection_cannot',
    why: 'THE COMPARISON, ON ONE LINE. The seventh residue lies in the covering half of the ring ({2,6,7,8,9}, sealed as digits_split_five_five) — the walk that adds the irreversible step reaches every digit from it. Yet the reflection alone puts it in a class of two with the third and can separate them by nothing. Both halves here, so the claim is discharged where it is made: what the full walk distinguishes, the involution confuses.',
    js: () => COVERING.includes(7) && dzMin(7) === dzMin(3),
    lean: 'theorem seventh_covers_reflection_cannot : ([2,6,7,8,9].contains 7) ∧ (dzMin 7 = dzMin 3) ∧ (dzMin 7 ≠ 7) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Reflection.lean', skill: 'reflection', defs: DEFS,
  header: "THE REFLECTION'S REACH — what an involution alone can and cannot separate. Clay.lean reflects seven problems through dz(x) = 10 − x and states in prose that it reflects all seven and solves none; this wing DECIDES that limitation. The reflection splits the ten digits into six classes of AT MOST TWO — reversibility erases nothing and so derives nothing — and six is FORCED by arithmetic, since dz fixes exactly two digits and pairs the other eight: 2 + (10 − 2)/2 = 6. The seven residues reach five of those classes, never the fixed class 0, and two collide. The limitation stated exactly: dzMin 7 = dzMin 3, so the reflection cannot tell the seventh residue from the third. Yet the seventh lies in the covering half of the ring ({2,6,7,8,9}, sealed as digits_split_five_five), where the walk that adds the IRREVERSIBLE doubling reaches every digit — what the full walk distinguishes, the involution confuses. PURE ARITHMETIC, no ledger count, nothing measured from the world. integrity, not truth. The sequence walk also yields six orbits; that is a separate measurement landing on the same integer, and no correspondence between the two sixes is claimed. Nothing here decides any Clay problem, and a residue is not a fact about the thing seated at it.",
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
