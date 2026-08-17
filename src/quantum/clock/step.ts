// clock/step — THE QUANTUM COMPUTER HAS NO HARDWARE CLOCK, AND MUST NOT. Reading an oscillator is the largest source of
// non-determinism there is: the same computation would answer differently on two machines, and every receipt in this
// system rests on the opposite promise. The harmonic scan hard-rejects wall-clock reads for exactly that reason.
//
// But the machine has always HAD time — scattered, unnamed. The salt sequence advances and rotates a key per step
// (salt_seq_injective); the odometer ticks a version that never returns; the heartbeats measure cost per theorem.
// What was missing is the module that says what those share: time here is a POSITION IN A SEQUENCE, never a reading.
//
// So this clock has no `now()`. A now would require asking the world what time it is, and the answer would not
// recompute. It has STEPS: given a step you get that step's state, deterministically, on any machine, forever —
// which is what a quantum evolution actually needs, since unitary steps are counted, not timed.
//
// HONEST SCOPE: a deterministic step algebra over the sealed sequence laws — the ordering of computation, never a
// measurement of duration, never a wall time, and never a claim about physical clocks.
import { toUuid } from '../../address.js'

/** One position of the clock: the step, its content-address, and its residue in the sealed ℤ/9 sequence. */
export interface Tick {
  step: number      // the position — monotone, never returning
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
  const s = step < 0 ? -(step | 0) : (step | 0)   // no Math.* anywhere — the determinism law admits none, not even here
  return { step: s, address: toUuid('uuidna:clock:step:' + s), residue: residueOf(s) }
}

/** Advance by n steps — the ONLY way this clock moves, and it moves in one direction. */
export const advance = (from: Tick, n = 1): Tick => tick(from.step + (n < 0 ? -(n | 0) : (n | 0)))
