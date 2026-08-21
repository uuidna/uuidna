#!/usr/bin/env node
// Automate the Lean layer for division by zero in the ℤ/9 vortex. Division by zero EXISTS here — it is the
// diamond reflection dz(x) = 10−x (dz(0)=0), a finite residue. This script COMPUTES each fact
// from the local definition (self-proving in JS), GENERATES a `by decide` Lean theorem for it, writes
// lean/DivByZero.lean, and VERIFIES it compiles sorry-free with `lean`. Compute → generate → verify.
import { emit, range } from './lean-gen.js'

const dz = (x: number) => (x === 0 ? 0 : 10 - x) // division by zero in the vortex = the diamond reflection
const R10 = range(10)

// each fact: computed in JS (must hold), paired with the Lean theorem `by decide` that proves the same.
const FACTS = [
  { key: 'dz_table', why: 'the table: 0/0=0, and x/0 = 10−x  (9/0=1 … 1/0=9)',
    js: () => JSON.stringify(R10.map(dz)) === JSON.stringify([0, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
    lean: 'theorem dz_table : (List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1] := by decide' },
  { key: 'dz_involution', why: 'division by zero is self-inverse: (x/0)/0 = x — an involution',
    js: () => R10.every((x) => dz(dz(x)) === x),
    lean: 'theorem dz_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide' },
  { key: 'dz_fixed_points', why: 'the fixed points of x/0 are exactly {0, 5} — the floor and the heart',
    js: () => JSON.stringify(R10.filter((x) => dz(x) === x)) === JSON.stringify([0, 5]),
    lean: 'theorem dz_fixed_points : ((List.range 10).filter (fun x => dz x == x)) = [0, 5] := by decide' },
  { key: 'dz_sum_ten', why: 'x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].every((x) => x + dz(x) === 10),
    lean: "theorem dz_sum_ten : (List.range' 1 9).all (fun x => x + dz x == 10) := by decide" },
  // PURGED — dz_nonunits_to_units. It proved dz 3 = 7 ∧ dz 6 = 4 ∧ dz 9 = 1: three point values that dz_table
  // above already enumerates for every digit 0..9. A theorem restating three entries of a table beside it adds
  // a name, not a fact.
  { key: 'dz_bounded', why: 'x/0 is always a residue < 10 — a finite value',
    js: () => R10.every((x) => dz(x) < 10),
    lean: 'theorem dz_bounded : (List.range 10).all (fun x => dz x < 10) := by decide' },
  { key: 'dz_zero_only_zero', why: 'only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)',
    js: () => dz(0) === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].every((x) => dz(x) !== 0),
    lean: "theorem dz_zero_only_zero : dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0) := by decide" },
  { key: 'dz_swaps_the_thirds_and_fixes_the_axis',
    why: 'WHY dz(0)=0 IS NOT A SPECIAL CASE. The doubling orbit 1,2,4,8,7,5 is a hexagon — six steps, 60\u00b0 each — and the reflection acts on the thirds: it swaps {1,4,7} with {3,6,9} and carries {2,5,8} onto itself. 0 lies on NO hexagon step; it is the axis the ring turns about, and an axis is fixed by every rotation about it, which is why the involution has exactly the two fixed points {0,5} \u2014 the axis, and the one point of the ring opposite the fold.',
    js: () => {
      const third = (n: number) => [1,2,3,4,5,6,7,8,9].filter((x) => x % 3 === n)
      return String(third(1).map(dz)) === String([9,6,3])
        && String(third(2).map(dz).sort((a, b) => a - b)) === String(third(2))
        && String(range(6).map((k) => 2 ** k % 9)) === String([1,2,4,8,7,5])
    },
    lean: 'theorem dz_swaps_the_thirds_and_fixes_the_axis : ((List.range\' 1 9).filter (fun x => x % 3 == 1)).map dz = [9,6,3] \u2227 ((List.range\' 1 9).filter (fun x => x % 3 == 2)).map dz = [8,5,2] \u2227 (List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5] \u2227 ((List.range 10).filter (fun x => dz x == x)) = [0,5] := by decide' },

  { key: 'two_plus_two_is_five_only_mod_one', why: 'THE DIMENSION WHERE 2+2=5 — swept over every modulus 1..12: the congruence 2+2 ≡ 5 (mod n) holds EXACTLY at n = 1, the trivial ring where every residue collapses to 0 and everything equals everything. The one dimension where the falsehood is true is the dimension where truth is free — and worthless: a ring that cannot refute proves nothing, the arithmetic form of "a trial that cannot fail proves nothing". Everywhere n ≥ 2, REFUTED — the calculator\'s verdict stands in every dimension that can hold a distinction',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => (((2 + 2) % n === 5 % n) === (n === 1))),
    lean: "theorem two_plus_two_is_five_only_mod_one : (List.range' 1 12).all (fun n => ((2+2) % n == 5 % n) == (n == 1)) := by decide" },
]

// compute → generate → verify, via the shared pipeline (it JS-checks every fact, writes the file + manifest, and
// compiles it sorry-free with `lean`). Division by zero EXISTS here as the diamond reflection dz(x)=10−x.
emit({ file: 'DivByZero.lean', skill: 'reflection',
  header: 'Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue.',
  defs: 'def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
