#!/usr/bin/env node
// Automate the Lean layer for THE EXPOSURE — photography as decidable arithmetic, focused on WHERE uuidna DIFFERS
// from the photographic standard and WHY, each difference proven. The standard prints CONVENIENT ROUNDED numbers
// (shutter 1/125, 1/60; aperture f/1.4) for human dials; uuidna keeps the EXACT powers of two the physics actually
// follows (1/128 = 2⁷, 1/64 = 2⁶, f/√2). So the theorems below are not a restatement of the standard — they measure
// the GAP: 1/125 rounds the exact 1/128 (off by 3), 1/60 rounds 1/64 (off by 4), f/1.4 rounds √2 (1.4² = 1.96 < 2).
// Where the standard does NOT round — the full-stop ISO doublings — uuidna and the standard AGREE exactly. WHY the
// difference: the dial rounds for the hand; the ring keeps the power of two, and the doublings fold mod 9 to the
// vortex 1,2,4,8,7,5. the arithmetic of stops and the rounding gap — NOT a light meter or a sensor
// model. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'full_stop_is_exact_doubling',
    why: 'The physics uuidna keeps: a full stop is EXACTLY a doubling, so the exact shutter after 1/64 is 1/128 = 2⁷ — a power of two, not a round number.',
    js: () => 2 ** 7 === 128,
    lean: 'theorem full_stop_is_exact_doubling : 2^7 = 128 := by decide' },

  { key: 'shutter_125_rounds_128',
    why: 'WHERE uuidna DIFFERS: the camera prints 1/125 s, but the exact doubling is 1/128 s (2⁷) — the standard ROUNDS 128 down to 125, off by 3. uuidna keeps 128; the dial keeps the round number.',
    js: () => 2 ** 7 === 128 && 128 - 125 === 3,
    lean: 'theorem shutter_125_rounds_128 : 2^7 = 128 ∧ 128 - 125 = 3 := by decide' },

  { key: 'shutter_60_rounds_64',
    why: 'The same rounding again: 1/60 s is the printed value; the exact stop is 1/64 s (2⁶). The standard rounds 64 to 60, off by 4 — uuidna computes the power of two the dial approximates.',
    js: () => 2 ** 6 === 64 && 64 - 60 === 4,
    lean: 'theorem shutter_60_rounds_64 : 2^6 = 64 ∧ 64 - 60 = 4 := by decide' },

  { key: 'fstop_14_rounds_sqrt_two',
    why: 'The aperture rounds too: f/1.4 is the printed √2, but 1.4² = 1.96, short of the exact 2 (14² = 196 < 200). One stop of AREA is exactly ×2; the f-number the standard engraves is a rounded √2.',
    js: () => 14 * 14 === 196 && 196 < 200,
    lean: 'theorem fstop_14_rounds_sqrt_two : 14 * 14 = 196 ∧ 196 < 200 := by decide' },

  { key: 'fstop_squared_is_exact_power',
    why: 'What uuidna keeps exact: the aperture AREA is powers of two, so f² = 2ⁿ exactly — [1,2,4,8,16] = [2⁰..2⁴]. The printed f-numbers (1, 1.4, 2, 2.8, 4) are the rounded √ of these; the squares are exact.',
    js: () => JSON.stringify([1, 2, 4, 8, 16]) === JSON.stringify(Array.from({ length: 5 }, (_, n) => 2 ** n)),
    lean: 'theorem fstop_squared_is_exact_power : [1,2,4,8,16] = (List.range 5).map (fun n => 2^n) := by decide' },

  { key: 'iso_full_stops_agree_exactly',
    why: 'WHERE uuidna and the standard AGREE: the full-stop ISO scale is EXACT doublings, no rounding — ISO 100 up five stops is 100·2⁵ = 3200, and the standard prints 3200. Sensitivity doubles cleanly; only shutter and aperture carry the rounding.',
    js: () => 100 * 2 ** 5 === 3200,
    lean: 'theorem iso_full_stops_agree_exactly : 100 * 2^5 = 3200 := by decide' },

  { key: 'equivalent_exposure',
    why: 'The one the standard gets exactly right: open one stop of aperture and shorten one stop of shutter and the exposure is unchanged — (1) + (−1) = 0. Reciprocity is exact because it is pure addition of stops.',
    js: () => 1 + (-1) === 0,
    lean: 'theorem equivalent_exposure : (1 : Int) + (-1) = 0 := by decide' },

  { key: 'stops_fold_mod_nine',
    why: 'Why the doubling is uuidna\'s: the exposure light-multipliers 2⁰..2⁵, folded mod 9, ARE the vortex sequence — (List.range 6).map (2^· mod 9) = [1,2,4,8,7,5]. The camera doubles in the same ring uuidna turns on; the standard just rounds the readout.',
    js: () => JSON.stringify(Array.from({ length: 6 }, (_, k) => (2 ** k) % 9)) === JSON.stringify([1, 2, 4, 8, 7, 5]),
    lean: 'theorem stops_fold_mod_nine : (List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5] := by decide' },
]

emit({
  file: 'Photography.lean', skill: 'photography',
  header: 'THE EXPOSURE — where the photographic standard ROUNDS (1/125≈1/128, f/1.4≈√2) and uuidna keeps the EXACT powers of two, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
