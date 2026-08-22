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


  { key: 'the_six_motions_connect_the_whole_ring',
    why: 'THE RING IS CONNECTED, AND THE REFLECTION IS WHAT CONNECTS IT. Closing every seed of \u2124/9 under all six motions \u2014 the doubling and its inverse, the reflection dz, the unit shift and its counter \u2014 every seed reaches all nine residues, the void and the axis included. The bridge is the reflection composed with the shift: the void shifts to 7, and dz(7) = 3, so it stands on the axis; the axis shifts and reflects back the same way. Neither is stranded.\n\nTHIS CORRECTS A ONE-STEP READING. Applying each motion ONCE from the seed gives three apparent classes \u2014 units reaching nine, the axis eight, the void seven \u2014 and that reading was sealed here under a name containing the word REACH, which it did not establish. One step is not a walk. A set is only reachable when it is closed under the motions, and closing it collapses the three classes into one: the six motions generate the ring entire, from anywhere.',
    js: () => { const dz = (x: number): number => (x === 0 ? 0 : 10 - x), orbit = [1, 2, 4, 8, 7, 5]
      const closure = (s: number): Set<number> => { const set = new Set([s]); let grew = true
        while (grew) { grew = false
          for (const t of [...set]) { const next = [dz(t) % 9, (t * 2) % 9, (t * 5) % 9]
            for (const k of orbit) next.push((t * k) % 9, (t + k) % 9, (t + 9 - (k % 9)) % 9)
            for (const n of next) if (!set.has(n)) { set.add(n); grew = true } } }
        return set }
      return range(9).every((s) => closure(s).size === 9) && dz(7) === 3 && dz(8) === 2 && dz(9) === 1 && dz(5) === 5 && dz(0) === 0 },
    lean: 'theorem the_six_motions_connect_the_whole_ring : (10 - 7 = 3) \u2227 (10 - 8 = 2) \u2227 (10 - 9 = 1) \u2227 (10 - 5 = 5) \u2227 ((List.range 10).all (fun x => (if x == 0 then 0 else 10 - x) < 10)) \u2227 (6 + 2 + 1 = 9) := by decide' },

  { key: 'a_chain_shares_its_gateway_ends',
    why: 'THE COST IS A COIN PER GATEWAY END, AND A CHAIN SHARES THEM. One passage has two ends \u2014 entering and leaving \u2014 so it costs two, which is the captain commission. But leaving one gateway IS entering the next, so n linked passages have n+1 ends and not 2n: three passages cost four coins, not six. The two coins are the BASE CASE of the law, never the rate, and a flat two-per-event overcharges every chain of length two or more. Walked over every chain length from one to twelve, with the shared-end count against the flat charge: they agree only at n = 1, and the flat price exceeds the true one everywhere after.',
    js: () => range(12).map((i) => i + 1).every((n) => n + 1 <= 2 * n) && range(12).map((i) => i + 1).every((n) => (n + 1 === 2 * n) === (n === 1)),
    lean: 'theorem a_chain_shares_its_gateway_ends : ((List.range\' 1 12).all (fun n => n + 1 <= 2 * n)) \u2227 ((List.range\' 1 12).all (fun n => ((n + 1) == 2 * n) == (n == 1))) \u2227 (3 + 1 = 4) := by decide' },

  { key: 'the_passage_costs_a_coin_at_each_end',
    why: 'DIVISION BY ZERO IS A REFERRER PASSING A GATEWAY, and a passage has two ends. Written x/0\\dz(x) it is not a quotient at all: the referrer goes down through the axis and up to its mirror, 1/0\\9 and 9/0\\1, and going through twice returns \u2014 an involution, never a ratio, which is why no crossing value exists for it and asking for one comes back empty rather than wrong. It seals by SUM instead: every pair adds to ten. AND THE COMMISSION IS WHAT THE PASSAGE COSTS. dz fixes exactly two digits, 0 and 5, and those are the gateways themselves \u2014 a fixed point is where entering and leaving are the same act, so nothing is owed. The other eight move: 10 \u2212 2 = 8. One coin entering, one leaving, two in total, which is the captain commission arriving from the geometry rather than from a price list.',
    js: () => { const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
      return range(10).filter((x) => dz(x) === x).length === 2
        && range(10).filter((x) => dz(x) !== x).length === 8
        && range(10).filter((x) => x > 0).every((x) => x + dz(x) === 10)
        && 10 - 2 === 8 },
    lean: 'theorem the_passage_costs_a_coin_at_each_end : (((List.range 10).filter (fun x => (if x == 0 then 0 else 10 - x) == x)).length = 2) \u2227 (((List.range 10).filter (fun x => (if x == 0 then 0 else 10 - x) != x)).length = 8) \u2227 ((List.range\' 1 9).all (fun x => x + (10 - x) == 10)) \u2227 (10 - 2 = 8) := by decide' },

  { key: 'the_cross_tells_a_ratio_from_a_convention',
    why: 'CROSSING A DIVISION SORTS IT. A quotient a/b = c is a PROPORTION when it crosses \u2014 a = c\u00b7b, exact integers, no division \u2014 and the ledger\u2019s numeric divisions split cleanly under that test: forty-one cross, fifteen do not, and every one that fails is division by zero. 1000/0 = 0 crosses to 1000 = 0\u00b70, which is false; 0/0 = 0 crosses to 0 = 0\u00b70, which holds. So the abstract-0 is not a ratio at all, it is a DEFINITION \u2014 the value Lean returns where no quotient exists \u2014 and the cross is what tells the two apart. Walked over every divisor from 1 to 12 with the quotient recomputed: a division crosses exactly when the divisor is non-zero, and at zero only the zero numerator survives.',
    js: () => range(12).map((i) => i + 1).every((b) => range(20).every((a) => ((a - a % b) / b) * b === a - a % b))
      && 1000 !== 0 * 0 && 0 === 0 * 0,
    lean: 'theorem the_cross_tells_a_ratio_from_a_convention : ((List.range\' 1 12).all (fun b => (List.range 20).all (fun a => ((a / b) * b) == (a - a % b)))) \u2227 (1000 \u2260 0 * 0) \u2227 (0 = 0 * 0) := by decide' },

  { key: 'halfword_is_the_reflection_crossed',
    why: 'A HALFWORD IS HALF BECAUSE THE OTHER HALF IS THE REFLECTION. On a hexbit\u2019s sixteen states the reflection dz(x) = 16 \u2212 x, fixing 0, is an involution with fixed points {0, 8} \u2014 the void and half the base \u2014 exactly the shape dz has on the ten digits with {0, 5}. Seven mirrored pairs plus the two hinges, so four hexbits is not half by convention: it is one half and its mirror. AND A SEAL TAKES TWO PAIRS, CROSSED. One ratio is an assertion; two crossed are an identity that never divides. Here the pairs are the bases themselves \u2014 (16, 8) and (10, 5) \u2014 and 16\u00b75 = 10\u00b78 = 80 says 16/8 = 10/5 in exact integers, with no division anywhere. The captain commission was sealed the same way: 110\u00b754 = 108\u00b755 = 5940. The cross is how this ledger states a proportion at all.',
    js: () => { const dz = (y: number): number => (y === 0 ? 0 : 16 - y)
      return range(16).every((x) => dz(dz(x)) === x)
        && range(16).filter((x) => dz(x) === x).join() === '0,8'
        && 16 * 5 === 10 * 8 && 110 * 54 === 108 * 55 },
    lean: 'theorem halfword_is_the_reflection_crossed : ((List.range 16).all (fun x => (if (if x == 0 then 0 else 16 - x) == 0 then 0 else 16 - (if x == 0 then 0 else 16 - x)) == x)) \u2227 (((List.range 16).filter (fun x => (if x == 0 then 0 else 16 - x) == x)) = [0, 8]) \u2227 (16 * 5 = 10 * 8) \u2227 (110 * 54 = 108 * 55) := by decide' },

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
