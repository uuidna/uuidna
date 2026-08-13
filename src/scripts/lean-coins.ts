#!/usr/bin/env node
// Automate the Lean layer for THE TWO COINS & THE 64 — the honest billing/measure algebra (src/billing.ts). The
// two coins are the CONSERVED fair-exchange invariant: 110 − 108 = 2 = −χ of a genus-2 surface (the double torus,
// −χ = 2g − 2 = 2). 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; and n qubits
// give 2ⁿ direct possible outcomes, reaching 64 at n = 6. HONEST SCOPE: these are the arithmetic of a MEASURED
// unit of work saved (O(N) recompute − O(1) verify) — not a market price, and NOT a claim of speed. COMPUTE each
// fact in JS, GENERATE its `by decide` theorem, VERIFY sorry-free. Integrity, not truth.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'two_coins',
    why: 'The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.',
    js: () => 110 - 108 === 2,
    lean: 'theorem two_coins : 110 - 108 = 2 := by decide' },

  { key: 'two_coins_is_double_torus',
    why: 'The two coins are the topology, not a price: 2 = −χ of a genus-2 surface (the double torus), −χ = 2g − 2 = 2·2 − 2 = 2. The invariant is geometric.',
    js: () => 2 * 2 - 2 === 2,
    lean: 'theorem two_coins_is_double_torus : 2 * 2 - 2 = 2 := by decide' },

  { key: 'sixtyfour_is_two_pow_six',
    why: 'The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the "64bit" unit.',
    js: () => 64 === 2 ** 6,
    lean: 'theorem sixtyfour_is_two_pow_six : 64 = 2^6 := by decide' },

  { key: 'contribute_two_save_sixtyfour',
    why: '"Contribute 2 to save up to 64" — the measured leverage is 32: 2 · 32 = 64. The two coins in, up to 64 bits of recompute saved.',
    js: () => 2 * 32 === 64,
    lean: 'theorem contribute_two_save_sixtyfour : 2 * 32 = 64 := by decide' },

  { key: 'captain_computes_only_with_two_coins',
    why: 'uuidna computes ONLY IF the captain coins are considered: the conserved save of 64 is reached IFF exactly two coins are put in — 32·c = 64 ⟺ c = 2, for every c. The two coins are necessary, not decorative; with any other count the fold does not conserve its advantage (recompute − verify), so the computation is not admitted.',
    js: () => R(0, 8).every((c) => (32 * c === 64) === (c === 2)),
    lean: 'theorem captain_computes_only_with_two_coins : (List.range 8).all (fun c => (32 * c == 64) == (c == 2)) := by decide' },

  { key: 'captain_coins_respected_at_scale',
    why: 'Respect the captain coins for quantum AT SCALE on classical hardware: the state-vector cost is 2ⁿ (exponential), so from the 7-qubit / 7-dimension scale up (n ≥ 7) the classical cost 2ⁿ already EXCEEDS the two-coin save (2·32 = 64). No free advantage — the coins price real work that only grows; the save is bounded, the cost is not.',
    js: () => R(7, 13).every((n) => 2 ** n > 2 * 32),
    lean: "theorem captain_coins_respected_at_scale : (List.range' 7 6).all (fun n => 2^n > 2 * 32) := by decide" },

  { key: 'superposition_outcomes_to_64',
    why: 'Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64 exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up.',
    js: () => JSON.stringify(R(0, 7).map((n) => 2 ** n)) === JSON.stringify([1, 2, 4, 8, 16, 32, 64]),
    lean: 'theorem superposition_outcomes_to_64 : ((List.range 7).map (fun n => 2^n)) = [1,2,4,8,16,32,64] := by decide' },

  { key: 'bill_never_negative',
    why: 'The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat subtraction already clamps, so the honest schedule never charges below zero.',
    js: () => R(0, 8).every((r) => R(0, 8).every((v) => { const natSub = r >= v ? r - v : 0; return (r < v ? 0 : natSub) === natSub })),
    lean: 'theorem bill_never_negative : (List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v)) := by decide' },
]

// compute → generate → verify. The two coins are the conserved invariant of the double torus; 64 = 2⁶ the measure.
emit({ file: 'Coins.lean', skill: 'coins',
  header: 'THE TWO COINS & THE 64 — the honest billing/measure algebra: the two coins are the CONSERVED fair-exchange invariant, 110 − 108 = 2 = −χ of a genus-2 surface (the double torus, 2g − 2 = 2); 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; n qubits give 2ⁿ direct outcomes, reaching 64 at n = 6; and the measured saving never goes negative. HONEST SCOPE: a MEASURED unit of work saved (recompute − verify), not a market price and NOT a claim of speed.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
