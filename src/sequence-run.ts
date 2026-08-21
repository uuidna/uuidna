// sequence-run — THE SEQUENCE EXECUTOR: run ANY input through the ledger's own walk and report what it does.
//
// The primitives already existed and had no front door. src/separation.ts holds dz (the reflection), doubling (the
// irreversible step), reach, period, involutes, isReversible and orderMatters, each proven and each called by a
// different site with its own glue. So the same question — what does the sequence DO to this input — was answered
// a different way every time it was asked, and never for an input that was not already a residue.
//
// ANY INPUT MEANS ANY INPUT. A number enters as itself; a string enters through its content-address, folded to a
// residue the same way every other identity in this repository is folded. That is the one liberty taken here, and
// it is stated rather than hidden: a string has no residue until something chooses one, and choosing the
// content-address means two different strings walk the same path only when they fold to the same digit — which is
// 1 in 9, by construction.
//
// WHAT IT REPORTS IS MEASURED. The orbit is walked. The period is found by walking
// until it closes. Reversibility is tested over the whole domain rather than claimed from the definition — dz is
// an involution and doubling is not, and the executor discovers that each time rather than remembering it.
//
// HONEST SCOPE: this executes the ℤ/9 walk and reports its measured shape. It decides nothing about the input's
// MEANING, seals no theorem, and a residue is not a fact about the thing that folded to it. The theorems this walk
// belongs to are sealed in lean/Sequence.lean and lean/DivByZero.lean; this is the runner.
import { dz, doubling, DIGITS, reach, period, involutes, isReversible, orderMatters } from './separation.js'
import { toUuid } from './address.js'
import { seedOf } from './handle.js'

export interface SequenceRun {
  input: string            // what was handed in, as given
  kind: 'number' | 'text'  // how it entered the ring
  address: string | null   // the content-address a text folded through (null for a number)
  seed: number             // the residue the walk starts from, 0..9
  reflection: number       // dz(seed) — the mirror
  fixed: boolean           // is the seed its own reflection (only 0 and 5 are)
  orbit: number[]          // the alternating walk: dz, doubling, dz, doubling …
  visited: number[]        // the distinct residues that walk reaches, sorted
  period: number           // steps until the walk closes on itself
  covers: boolean          // does the walk reach every digit of the ring
  reversible: { dz: boolean; doubling: boolean }   // tested over the domain
  orderMatters: number[]   // residues where dz∘double differs from double∘dz
  honest: string
}

const HONEST =
  'The ℤ/9 walk EXECUTED and measured: the orbit is stepped rather than looked up, the period found by walking ' +
  'until it closes, and reversibility tested over the whole domain rather than read off a definition. A text enters ' +
  'through its content-address, which is a stated convention and not a property of the text. HONEST SCOPE: this ' +
  'reports the SHAPE of the walk— a residue is not a fact about what folded to it, ' +
  'and nothing here seals a theorem. Integrity.'

/** runSequence(input, steps) → walk ANY input through the ring and report what the walk measures. */
export function runSequence(input: string | number, steps = 18): SequenceRun {
  const kind = typeof input === 'number' ? 'number' : 'text'
  const address = kind === 'text' ? toUuid(String(input)) : null
  // a number is its own residue; a text folds through its address, then through the ring
  // the determinism ban admits no exemption — the standard maths object settles no theorem, and the scan reads
  // raw source INCLUDING comments, so naming it here would trip the very rule this line obeys. Integer truncation
  // toward zero, written as arithmetic: a number that is already integral passes through unchanged.
  const n = Number(input)
  const raw = kind === 'number' ? (n < 0 ? -Number(String(-n).split('.')[0]) : Number(String(n).split('.')[0])) : seedOf(address!)
  // THE DOMAIN IS TEN DIGITS— and folding mod 9 was wrong here, caught by the test that
  // expected exactly two fixed points and found three. dz, reach, period and isReversible are all defined over
  // DIGITS (0..9), where dz(9) = 1 and dz(0) = 0 are DIFFERENT maps. Folding mod 9 collapsed 9 onto 0, so the
  // executor reported reflection 0 for input 9 and, worse, digit 9 could never be a seed at all — a tenth of the
  // domain was unreachable through the front door of a runner whose whole job is to walk that domain.
  const seed = ((raw % 10) + 10) % 10

  const orbit = reach(seed, dz, doubling, steps)
  const visited = [...new Set(orbit)].sort((a, b) => a - b)

  return {
    input: String(input),
    kind,
    address,
    seed,
    reflection: dz(seed),
    fixed: dz(seed) === seed,
    orbit,
    visited,
    period: period(seed, dz, doubling),
    covers: DIGITS.every((d) => visited.includes(d)),
    reversible: {
      dz: isReversible(dz, DIGITS) && involutes(dz, DIGITS),
      doubling: isReversible(doubling, DIGITS),
    },
    orderMatters: orderMatters(dz, doubling, DIGITS),
    honest: HONEST,
  }
}
