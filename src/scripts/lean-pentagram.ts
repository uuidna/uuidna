#!/usr/bin/env node
// Automate the Lean layer for THE PENTAGRAM & THE FIBONACCI DIGITS. Two finite, decidable facts of five-fold
// symmetry: (1) the pentagram is the star polygon {5/2} — stepping +2 mod 5 is coprime to 5, so it draws in a
// SINGLE stroke visiting all five points, and its five point-angles sum to a half-turn (5·36 = 180°); (2) the
// single-digit (mod 9) Fibonacci sequence — the digital-root Fibonacci — is periodic, closing into a 24-cycle
// (its Pisano period), and the SAME recurrence read through the pentagram (mod 5, period 20) and the rosette
// (mod 7, period 16) closes into their own cycles: one sequence, three moduli, three finite periods.
// HONEST SCOPE: these are finite periodic cycles of single digits, decidable `by decide` — NOT a claim about the
// irrational golden ratio the pentagram encodes (φ is not a `by decide` object). COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

// A single-digit Fibonacci cycle mod m: the concrete period-`len` block, checked against the SAME shape the Lean
// `fibCycle` def verifies — length, the [0,1] Fibonacci seed, and the recurrence Fₙ₊₂ ≡ Fₙ + Fₙ₊₁ (mod m) across
// every position INCLUDING the wrap (append the seed pair, so the last two windows prove it closes into a cycle).
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
const fibCycleJS = (m: number, f: number[], len: number): boolean => {
  if (f.length !== len || f[0] !== 0 || f[1] !== 1) return false
  const g = f.concat(f.slice(0, 2))
  for (let i = 0; i + 2 < g.length; i++) if ((g[i] + g[i + 1]) % m !== g[i + 2]) return false
  return true
}

// The three single-digit cycles (verified in JS before a line is written); the Lean carries the same literal lists.
const F9 = [0, 1, 1, 2, 3, 5, 8, 4, 3, 7, 1, 8, 0, 8, 8, 7, 6, 4, 1, 5, 6, 2, 8, 1] //  mod 9  — Pisano period 24
const F5 = [0, 1, 1, 2, 3, 0, 3, 3, 1, 4, 0, 4, 4, 3, 2, 0, 2, 2, 4, 1] //               mod 5  — Pisano period 20
const F7 = [0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1] //                            mod 7  — Pisano period 16

// Shared Lean: fibCycle m f len — the recurrence holds at every position of f, with the seed pair appended so the
// final two windows prove the sequence returns to (0,1) — i.e. closes into a length-`len` cycle. Pure `by decide`.
const DEFS = `def fibCycle (m : Nat) (f : List Nat) (len : Nat) : Bool :=
  (f.length == len) && (f.take 2 == [0, 1]) &&
  (((f ++ f.take 2).zip ((f ++ f.take 2).drop 1)).zip ((f ++ f.take 2).drop 2)).all
    (fun p => (p.1.1 + p.1.2) % m == p.2)`

const lst = (a: number[]) => '[' + a.join(',') + ']'

const FACTS = [
  { key: 'pentagram_single_stroke',
    why: 'The pentagram is the star polygon {5/2}: stepping +2 (mod 5) draws it in a SINGLE stroke — [0,2,4,1,3] — visiting all five points without lifting the pen, because 2 is coprime to 5.',
    js: () => JSON.stringify([0, 1, 2, 3, 4].map((k) => (2 * k) % 5)) === JSON.stringify([0, 2, 4, 1, 3]),
    lean: 'theorem pentagram_single_stroke : (List.range 5).map (fun k => (2*k) % 5) = [0,2,4,1,3] := by decide' },

  { key: 'pentagon_single_stroke',
    why: 'The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.',
    js: () => JSON.stringify([0, 1, 2, 3, 4].map((k) => k % 5)) === JSON.stringify([0, 1, 2, 3, 4]),
    lean: 'theorem pentagon_single_stroke : (List.range 5).map (fun k => k % 5) = [0,1,2,3,4] := by decide' },

  { key: 'pentagram_closes_after_five',
    why: 'The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.',
    js: () => (2 * 5) % 5 === 0,
    lean: 'theorem pentagram_closes_after_five : (2*5) % 5 = 0 := by decide' },

  { key: 'pentagram_step_coprime_five',
    why: 'WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).',
    js: () => gcd(2, 5) === 1,
    lean: 'theorem pentagram_step_coprime_five : Nat.gcd 2 5 = 1 := by decide' },

  { key: 'pentagram_point_angles_half_turn',
    why: 'The five point-angles of the pentagram sum to a half-turn: 5 · 36 = 180°, each sharp point 36° — the {5/2} star angle. A count of degrees, exact.',
    js: () => 5 * 36 === 180,
    lean: 'theorem pentagram_point_angles_half_turn : 5 * 36 = 180 := by decide' },

  { key: 'fib_single_digit_cycle_24',
    why: 'The single-digit (mod 9) Fibonacci — the digital-root Fibonacci — is periodic: 24 single digits satisfy Fₙ₊₂ ≡ Fₙ+Fₙ₊₁ (mod 9) from the seed [0,1] and return to it, closing into a 24-cycle (its Pisano period).',
    js: () => fibCycleJS(9, F9, 24),
    lean: `theorem fib_single_digit_cycle_24 : fibCycle 9 ${lst(F9)} 24 = true := by decide` },

  { key: 'fib_pentagram_cycle_20',
    why: 'The SAME Fibonacci recurrence through the pentagram modulus (mod 5): 20 single digits close into a 20-cycle — the Pisano period π(5)=20. The pentagram lens on the golden sequence.',
    js: () => fibCycleJS(5, F5, 20),
    lean: `theorem fib_pentagram_cycle_20 : fibCycle 5 ${lst(F5)} 20 = true := by decide` },

  { key: 'fib_rosette_cycle_16',
    why: 'The SAME recurrence fused to the rosette modulus (mod 7): 16 single digits close into a 16-cycle — the Pisano period π(7)=16. One sequence, read through pentagram (5), rosette (7) and single digit (9).',
    js: () => fibCycleJS(7, F7, 16),
    lean: `theorem fib_rosette_cycle_16 : fibCycle 7 ${lst(F7)} 16 = true := by decide` },
]

emit({
  file: 'Pentagram.lean',
  header: 'THE PENTAGRAM & THE FIBONACCI DIGITS — the star polygon {5/2} and the single-digit (Pisano) Fibonacci cycles, finite and decidable.',
  defs: DEFS,
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
