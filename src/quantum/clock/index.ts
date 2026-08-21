// clock — THE QUANTUM COMPUTER HAS NO HARDWARE CLOCK, AND MUST NOT. Reading an oscillator is the largest source of
// non-determinism there is: the same computation would answer differently on two machines, and every receipt in this
// system rests on the opposite promise. The harmonic scan hard-rejects wall-clock reads for exactly that reason.
//
// The machine always HAD time, scattered and unnamed: the salt sequence advances and rotates a key per step
// (salt_seq_injective), the odometer ticks a version that never returns, the heartbeats measure cost per theorem.
// What was missing is the module naming what they share — time here is a POSITION IN A SEQUENCE.
//
// So this clock has no `now()`. A now would ask the world what time it is, and the answer would not recompute. It
// has STEPS, total and deterministic on any machine, which is what a quantum evolution needs: unitary steps are
// counted, not timed. Order is what a clock without a now can still say — before, after, agreement, and a distance
// that is a COUNT and never a duration.
//
// ONE WORD, ONE NAME, MANY FACES: the folder is the module and every face is an `index.*` — index.ts is the code,
// index.md is what it means. A second named file would be a second name for one thing.
//
// HONEST SCOPE: a deterministic step algebra over the sealed sequence laws — the ordering of computation
// measurement of duration.
import { toUuid } from '../../address.js'

/** One position of the clock: the step, its content-address, and its residue in the sealed ℤ/9 sequence. */
export interface Tick {
  step: number      // the position — monotone
  address: string   // the step's content-address: the same step recomputes the same uuid on any machine
  residue: number   // its place in the ℤ/9 vortex — the sequence 2^k mod 9 the coins and the salt share
}

/** The vortex residue of a step — 2^k mod 9, the sealed doubling sequence (sequence_and_coins_are_one). */
export const residueOf = (step: number): number => {
  let r = 1
  for (let i = 0; i < step % 6; i++) r = (r * 2) % 9   // the orbit closes at 6 (vortex_orbit), so the walk is bounded
  return r === 0 ? 9 : r
}

/** The clock at a step. Deterministic and total: no reading, no randomness, no failure. */
export const tick = (step: number): Tick => {
  const s = step < 0 ? -(step | 0) : (step | 0)   // no Math.* anywhere — the determinism law admits none
  return { step: s, address: toUuid('uuidna:clock:step:' + s), residue: residueOf(s) }
}

/** Advance by n steps — the ONLY way this clock moves, and it moves in one direction. */
export const advance = (from: Tick, n = 1): Tick => tick(from.step + (n < 0 ? -(n | 0) : (n | 0)))

/** Monotone by construction: a later step is never an earlier one (the odometer's law, in the small). */
export const isAfter = (a: Tick, b: Tick): boolean => a.step > b.step

/** Two clocks agree iff they are at the same step — no drift is possible, because there is nothing to drift from. */
export const agree = (a: Tick, b: Tick): boolean => a.step === b.step && a.address === b.address

/** The distance between two positions, in steps — a COUNT. */
export const between = (a: Tick, b: Tick): number => (a.step > b.step ? a.step - b.step : b.step - a.step)
