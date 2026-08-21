#!/usr/bin/env node
// Automate the Lean layer for REVERSAL — why undoing an involution and undoing a PATH are different acts, and where
// the walk never goes. PURE ARITHMETIC: every value is a digit of the ring or a count of preimages.
//
// THE DISTINCTION. dz is its own inverse, so undoing one reflection is always possible and always unique — reflect
// again and you are back. Reversing a PATH is a different demand: the walk alternates dz with doubling, so undoing
// it needs BOTH maps inverted, in reverse order, and doubling has no inverse everywhere. The two acts are not the
// same act at a different scale; one always succeeds and the other fails in two distinct ways.
//
// THE TWO FAILURES, MEASURED. Counting preimages under doubling gives [2,1,1,1,1,1,1,1,1,0]: the digit 0 has TWO
// preimages (0 and 9 both double onto it), so a reversal there is AMBIGUOUS — the path cannot say which way it
// came. The digit 9 has NONE, so it is UNREACHED — doubling never produces it, and no reversal arrives there
// because nothing ever left. Under dz every count is exactly 1: no ambiguity, no unexplored digit.
//
// HONEST SCOPE: integrity, not truth. This decides the two maps' preimage structure over the ten digits. It says
// nothing about walks longer than one step, which is the reading these facts support and not itself sealed.
import { emit } from './lean-gen.js'

const D = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const dz = (d: number) => (d === 0 ? 0 : 10 - d)
const dbl = (d: number) => (2 * d) % 9
const preDz = D.map((t) => D.filter((d) => dz(d) === t).length)
const preDbl = D.map((t) => D.filter((d) => dbl(d) === t).length)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d
def dbl (d : Nat) : Nat := (2 * d) % 9
def preOf (f : Nat -> Nat) (t : Nat) : Nat := ((List.range 10).filter (fun d => f d == t)).length`

const FACTS = [
  { key: 'reflection_reverses_uniquely',
    why: 'UNDOING A REFLECTION ALWAYS WORKS AND IS NEVER AMBIGUOUS: every digit has exactly ONE preimage under dz — the census is ten ones — and reflecting twice returns each digit to itself. One way in, one way out, everywhere.',
    js: () => preDz.every((n) => n === 1) && D.every((d) => dz(dz(d)) === d),
    lean: `theorem reflection_reverses_uniquely : ((List.range 10).map (preOf dz) = ${L(preDz)}) ∧ ((List.range 10).all (fun d => dz (dz d) == d)) := by decide` },

  { key: 'doubling_reverses_ambiguously',
    why: 'UNDOING A DOUBLING CAN BE AMBIGUOUS: the digit 0 has TWO preimages, since 0 and 9 both double onto it, so a path arriving at 0 cannot say which digit it came from. That is the first way a path reversal fails where an involution reversal cannot.',
    js: () => preDbl[0] === 2 && dbl(0) === 0 && dbl(9) === 0,
    lean: 'theorem doubling_reverses_ambiguously : (preOf dbl 0 = 2) ∧ (dbl 0 = 0) ∧ (dbl 9 = 0) ∧ (preOf dbl 0 ≠ 1) := by decide' },

  { key: 'nine_is_never_reached',
    why: 'AND THE UNEXPLORED DIGIT: 9 has ZERO preimages under doubling — nothing doubles onto it, so the forward walk never arrives there and no reversal can leave from it. Nine is not merely hard to reach; it is outside the image, and the line proves the count is zero rather than small.',
    js: () => preDbl[9] === 0 && D.every((d) => dbl(d) !== 9),
    lean: 'theorem nine_is_never_reached : (preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => dbl d != 9)) := by decide' },

  { key: 'censuses_differ',
    why: 'THE TWO MAPS DIFFER IN KIND, and the line exhibits it rather than asserting it: dz\'s preimage census is ten ones, doubling\'s is [2,1,1,1,1,1,1,1,1,0], and the two lists are not equal. Both sum to ten — every digit goes somewhere — but only one of them arrives everywhere exactly once.',
    js: () => JSON.stringify(preDz) !== JSON.stringify(preDbl) && preDz.reduce((a, b) => a + b, 0) === 10 && preDbl.reduce((a, b) => a + b, 0) === 10,
    lean: `theorem censuses_differ : ((List.range 10).map (preOf dz) ≠ (List.range 10).map (preOf dbl)) ∧ (${L(preDz)}.foldl (· + ·) 0 = 10) ∧ (${L(preDbl)}.foldl (· + ·) 0 = 10) := by decide` },

  { key: 'path_reverse_needs_both',
    why: 'REVERSING A PATH IS NOT REVERSING A STEP: undoing dz-then-doubling requires undoing the doubling FIRST and the reflection second, so the path inherits doubling\'s failures. Where doubling is ambiguous or undefined the path cannot be walked backwards, even though every reflection in it could be undone on its own.',
    js: () => { const amb: number = preDbl[0], one: number = 1; return amb !== one && preDbl[9] === 0 && preDz.every((n) => n === 1) },
    lean: 'theorem path_reverse_needs_both : (preOf dbl 0 ≠ 1) ∧ (preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => preOf dz d == 1)) := by decide' },

  { key: 'reflection_explores_all',
    why: 'THE REFLECTION LEAVES NOTHING UNEXPLORED: its image is all ten digits, so no digit is outside it, while doubling\'s image holds nine. Ten against nine — the missing one is the digit no doubling produces.',
    js: () => new Set(D.map(dz)).size === 10 && new Set(D.map(dbl)).size === 9,
    lean: 'theorem reflection_explores_all : (((List.range 10).map dz).eraseDups.length = 10) ∧ (((List.range 10).map dbl).eraseDups.length = 9) ∧ (10 ≠ 9) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Reversal.lean', skill: 'reversal', defs: DEFS,
  header: 'REVERSAL — why undoing an INVOLUTION and undoing a PATH are different acts, and where the walk never goes. Undoing a reflection always works and is never ambiguous: every digit has exactly one preimage under dz, the census is ten ones, and reflecting twice returns each digit to itself. Reversing a PATH is a different demand, because the walk alternates dz with doubling and undoing it needs BOTH maps inverted in reverse order — so the path inherits doubling\'s failures, of which there are two distinct kinds. AMBIGUOUS: the digit 0 has TWO preimages, since 0 and 9 both double onto it, so a path arriving at 0 cannot say where it came from. UNREACHED: the digit 9 has ZERO preimages — nothing doubles onto it, so the forward walk never arrives there and no reversal leaves from it. Nine is outside the image, not merely rare. The two censuses are [1,1,1,1,1,1,1,1,1,1] and [2,1,1,1,1,1,1,1,1,0]: both sum to ten, since every digit goes somewhere, but only the reflection arrives everywhere exactly once, and its image is all ten digits against doubling\'s nine. PURE ARITHMETIC, no ledger count, nothing measured from the world. HONEST SCOPE: integrity, not truth — this decides the two maps\' preimage structure over the ten digits, and says nothing about walks longer than one step, which is the reading these facts support and is not itself sealed.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
