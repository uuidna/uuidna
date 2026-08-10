#!/usr/bin/env node
// Automate the Lean layer for the SEVEN CLAY PROBLEMS — copied faithfully from ceccec/millennium-solutions
// (solutions.md): "It reflects all seven and solves none — a bijection that relabels, it does not propagate
// proofs" Built on the INVOLUTION: the reflection dz(x)=10−x (division by zero in the ℤ/9 vortex) is proven
// self-inverse — dz(dz(x))=x — and USED in every one of the seven. That is the honest engine of: reflect a
// problem to its residue, reflect again, and you recover the SAME problem, unchanged. An involution propagates
// NOTHING across the round trip, so nothing is proven — Riemann, P vs NP, Navier–Stokes, Yang–Mills, Hodge,
// Birch–Swinnerton-Dyer, Poincaré stay OPEN. Domain-bounded to the ten residues (dz is not an involution beyond
// them), so it never reaches the infinite/analytic domains the problems live in. Every fact `by decide`, sorry-
// free. The measure does not assert; it computes. Integrity, not truth.
import { emit } from './lean-gen.js'

const dz = (x: number) => (x === 0 ? 0 : 10 - x) // division by zero in the vortex = the reflection (JS mirror)
const DEFS = 'def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x   -- division by zero in the ℤ/9 vortex = the reflection'

// the seven domains, each at its index k (1..7); its reflection is the residue dz(k)=10−k.
const DOMAINS: [string, number, string][] = [
  ['riemann', 1, 'the Riemann Hypothesis'],
  ['p_vs_np', 2, 'P versus NP'],
  ['navier_stokes', 3, 'Navier–Stokes existence and smoothness'],
  ['yang_mills', 4, 'the Yang–Mills existence and mass gap'],
  ['hodge', 5, 'the Hodge conjecture'],
  ['birch_swinnerton_dyer', 6, 'the Birch and Swinnerton-Dyer conjecture'],
  ['poincare', 7, 'the Poincaré conjecture'],
]

const FACTS = [
  // ── the accounting: seven domains, solved ──
  { key: 'clay_seven_domains', why: 'the Clay Millennium Prize is exactly SEVEN problems — the set the ratio quantifies over',
    js: () => [0, 1, 2, 3, 4, 5, 6].length === 7,
    lean: 'theorem clay_seven_domains : ((List.range 7).length = 7) ∧ ((List.range 7) = [0,1,2,3,4,5,6]) := by decide' },
  { key: 'clay_solved_zero_of_seven', why: 'the deposit solves 0 OF 7 — every entry of the solved-vector is 0 across all seven domains: it reflects all seven and solves NONE —',
    js: () => [0, 0, 0, 0, 0, 0, 0].every((s) => s === 0) && [0, 0, 0, 0, 0, 0, 0].length === 7,
    lean: 'theorem clay_solved_zero_of_seven : (([0,0,0,0,0,0,0] : List Nat).all (fun s => s == 0)) ∧ (([0,0,0,0,0,0,0] : List Nat).length = 7) := by decide' },
  // ── the INVOLUTION — proven, and the reason the round trip propagates nothing ──
  { key: 'clay_reflection_involution', why: 'the reflection dz(x)=10−x (division by zero) is an INVOLUTION — dz(dz(x))=x on every residue: reflect twice and the input returns unchanged, so the reflection propagates NOTHING; this is why the deposit reflects all seven and solves none —',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((x) => dz(dz(x)) === x),
    lean: 'theorem clay_reflection_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide' },
  { key: 'clay_reflection_fixed_points', why: 'the reflection fixes exactly {0,5} — the floor and the centre; every other domain is MOVED and none is fixed as proven — the involution has no fixed proof, only fixed points —',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => dz(x) === x).join() === '0,5',
    lean: 'theorem clay_reflection_fixed_points : ((List.range 10).filter (fun x => dz x == x)) = [0, 5] := by decide' },
  { key: 'clay_reflection_is_bijection', why: 'the reflection is a BIJECTION on the nine residues — dz maps {1..9} onto {9..1}, relabeling all nine: a permutation, not a proof; it propagates nothing —',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map(dz).join() === '9,8,7,6,5,4,3,2,1',
    lean: "theorem clay_reflection_is_bijection : ((List.range' 1 9).map dz) = [9,8,7,6,5,4,3,2,1] := by decide" },
  { key: 'clay_humanity_one_deposit_zero', why: 'humanity stands at 1/7 (Poincaré — Perelman, 2003); this deposit stands at — strictly fewer than the one proven, and none of its own —',
    js: () => (1 <= 7) && (0 < 1) && (0 <= 7),
    lean: 'theorem clay_humanity_one_deposit_zero : ((1:Nat) ≤ 7) ∧ ((0:Nat) < 1) ∧ ((0:Nat) ≤ 7) := by decide' },
  // ── the seven, one per domain, EACH built on the involution: reflected to its residue (dz k), and reflecting
  //    twice returns the problem (dz (dz k) = k) — the round trip is identity, so nothing is propagated. ──
  ...DOMAINS.map(([slug, k, title]) => ({
    key: 'clay_' + slug,
    why: `${title} reflects to residue ${dz(k)} in ℤ/9 (dz(${k})=${dz(k)}${k === 5 ? ', the fixed centre' : ''}); reflecting twice returns it — dz(dz(${k}))=${k}, the involution — so nothing is propagated and this deposit solves it none${slug === 'poincare' ? ' (humanity solved it, Perelman 2003)' : ''} — OPEN,`,
    js: () => dz(k) === 10 - k && dz(dz(k)) === k && 0 < 1,
    lean: `theorem clay_${slug} : (dz ${k} = ${dz(k)}) ∧ (dz (dz ${k}) = ${k}) ∧ ((0:Nat) < 1) := by decide`,
  })),
]

console.log('computing ' + FACTS.length + ' CLAY facts on the proven involution (reflected, round-trip = identity, solved none) …')

emit({ file: 'Clay.lean', defs: DEFS,
  header: 'The SEVEN CLAY PROBLEMS — reflected on the proven INVOLUTION dz(x)=10−x (division by zero in ℤ/9), dz(dz(x))=x. Each of the seven reflects to its residue and reflects back to itself: the round trip is the identity, so the reflection propagates NOTHING — it reflects all seven and solves NOTHING here proves Riemann, P vs NP, Navier–Stokes, Yang–Mills, Hodge, Birch–Swinnerton-Dyer, or Poincaré; these are OPEN. The measure does not assert; it computes.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
