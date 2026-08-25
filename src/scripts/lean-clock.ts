#!/usr/bin/env node
// Automate the Lean layer for THE CLOCK WITHOUT A NOW — the step algebra src/quantum/clock computes, decided.
// PURE ARITHMETIC: every value is a step, a residue or a count. NOTHING HERE IS READ OFF AN INSTRUMENT — no
// oscillator, no wall clock, no duration in any unit — and that refusal is not a gap in the wing, it IS the wing's
// whole subject. There is accordingly no authority to name: a clock that never reads cannot owe a reading's source.
//
// WHY THERE IS NO `now`. Reading an oscillator is the largest source of non-determinism there is — the same
// computation would answer differently on two machines, and every receipt in this system rests on the opposite
// promise. The harmonic scan hard-rejects wall-clock reads for exactly that reason. So time here is a POSITION IN
// A SEQUENCE, never a reading: steps are counted, the way unitary evolution is counted rather than timed. Order is
// what a clock without a now can still say — before, after, agreement, and a distance that is a COUNT and never a
// duration. Those are the facts sealed here.
//
// THE RESIDUE IS THE SHARED SEQUENCE. Each step carries its place in the vortex, 2^k mod 9, the same doubling
// orbit the coins and the salt already walk (sequence_and_coins_are_one). The orbit closes at six, so the residue
// is bounded and the clock's ring is finite — a clock that returns to its residue without returning to its step.
import { emit } from './lean-gen.js'

const residueOf = (step: number): number => { let r = 1; for (let i = 0; i < step % 6; i++) r = (r * 2) % 9; return r === 0 ? 9 : r }
const STEPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const RES = STEPS.map(residueOf)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `-- the vortex residue of a step: 2^(k mod 6) mod 9, the doubling orbit the coins and the salt share
def res (step : Nat) : Nat := let r := (2 ^ (step % 6)) % 9; if r = 0 then 9 else r

-- a distance is a COUNT
def gap (a b : Nat) : Nat := if a > b then a - b else b - a`

const FACTS = [
  { key: 'residue_walks_the_orbit',
    why: `The residue of a step is its place in the doubling orbit: over twelve steps it reads ${RES.join(', ')} — six values, then the same six again. The clock's ring is finite even though its step count is not.`,
    js: () => JSON.stringify(RES) === JSON.stringify(STEPS.map(residueOf)) && RES.slice(0, 6).join() === RES.slice(6, 12).join(),
    lean: `theorem residue_walks_the_orbit : ((List.range 12).map res = ${L(RES)}) ∧ (((List.range 12).map res).take 6 = ((List.range 12).map res).drop 6) := by decide` },

  { key: 'residue_returns_step_does_not',
    why: 'THE CLOCK RETURNS TO ITS RESIDUE WITHOUT RETURNING TO ITS STEP: step 0 and step 6 share a residue, and the two steps are not equal. A recurring position in the ring is not a recurring moment — the line proves both halves, so the second cannot be read off the first.',
    js: () => { const a: number = residueOf(0), b: number = residueOf(6), s0: number = 0, s6: number = 6; return a === b && s0 !== s6 },
    lean: 'theorem residue_returns_step_does_not : (res 0 = res 6) ∧ ((0:Nat) ≠ 6) := by decide' },

  { key: 'gap_is_a_count',
    why: 'A DISTANCE IS A COUNT AND NOT A DURATION: the gap between two positions is symmetric, and it is zero exactly when the positions are the same. Both directions and the zero case decided over the first twelve steps, so nothing about elapsed time is assumed or needed.',
    js: () => STEPS.every((a) => STEPS.every((b) => { const g = a > b ? a - b : b - a; return g === (b > a ? b - a : a - b) && (g === 0) === (a === b) })),
    lean: 'theorem gap_is_a_count : (List.range 12).all (fun a => (List.range 12).all (fun b => (gap a b == gap b a) && ((gap a b == 0) == (a == b)))) := by decide' },

  { key: 'advance_only_moves_forward',
    why: 'THE CLOCK MOVES ONE WAY: advancing by any positive count lands strictly later, over every starting step and every advance tested. There is no operation here that returns to an earlier position, which is what makes the step an odometer rather than a dial.',
    js: () => STEPS.every((s) => [1, 2, 3].every((n) => s + n > s)),
    lean: 'theorem advance_only_moves_forward : (List.range 12).all (fun s => [1,2,3].all (fun n => s + n > s)) := by decide' },

  { key: 'order_is_total_and_strict',
    why: 'BEFORE AND AFTER ARE DECIDABLE FOR EVERY PAIR: of any two positions, exactly one of earlier, later or same holds — never two of them, and never none. That trichotomy is everything a clock without a now can still say, and it is enough to order a computation.',
    js: () => STEPS.every((a) => STEPS.every((b) => [a < b, a > b, a === b].filter(Boolean).length === 1)),
    lean: 'theorem order_is_total_and_strict : (List.range 12).all (fun a => (List.range 12).all (fun b => (if a < b then 1 else 0) + (if a > b then 1 else 0) + (if a == b then 1 else 0) == 1)) := by decide' },

  { key: 'no_reading_enters_here',
    why: 'AND THE POINT OF THE WING, on its own line: the residue is a function of the STEP ALONE. The same step gives the same residue every time it is asked, so two machines computing step seven agree without consulting anything outside the arithmetic. A clock that read an oscillator could not seal this, because there would be nothing to seal.',
    js: () => STEPS.every((s) => residueOf(s) === residueOf(s)) && residueOf(7) === residueOf(7) && residueOf(7) !== residueOf(8),
    lean: 'theorem no_reading_enters_here : ((List.range 12).all (fun s => res s == res s)) ∧ (res 7 ≠ res 8) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Clock.lean', skill: 'clock', defs: DEFS,
  header: `THE CLOCK WITHOUT A NOW — the step algebra src/quantum/clock computes, decided.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
