#!/usr/bin/env node
// Automate the Lean layer for DIVING — the decidable arithmetic of trimix gas laws, demarcated. A gas mix's
// fractions sum to 100%; absolute pressure rises 1 atm per 10 m; Dalton's law makes the partial pressures sum to
// the absolute pressure; air's ppO2 leaves the breathable window at depth (why deep dives blend trimix); gases are
// blended by partial pressure to the fill; helium is non-narcotic (it lowers the equivalent narcotic depth); and a
// direct ascent that exceeds the Haldane ratio needs a decompression stop. HARD SAFETY SCOPE: this is ARITHMETIC,
// NOT a dive planner, NOT dive tables, NOT medical or safety advice. NEVER plan or execute a dive on these numbers
// — use certified training, cut tables, and a dive computer. Diving is life-critical. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'trimix_fractions_sum_100',
    why: 'A breathing mix is complete: the oxygen, helium and nitrogen fractions sum to 100%. Trimix 18/45 is 18% O₂, 45% He, 37% N₂ — 18 + 45 + 37 = 100.',
    js: () => 18 + 45 + 37 === 100,
    lean: 'theorem trimix_fractions_sum_100 : 18 + 45 + 37 = 100 := by decide' },

  { key: 'absolute_pressure_at_depth',
    why: 'Absolute pressure rises one atmosphere per 10 m of seawater: P(d) = 1 + d/10, so depths [0,10,20,30,40] m give [1,2,3,4,5] atm.',
    js: () => JSON.stringify([0, 10, 20, 30, 40].map((d) => 1 + (d - (d % 10)) / 10)) === JSON.stringify([1, 2, 3, 4, 5]),
    lean: 'theorem absolute_pressure_at_depth : (([0,10,20,30,40] : List Nat).map (fun d => 1 + d/10)) = [1,2,3,4,5] := by decide' },

  { key: 'partial_pressures_sum_to_absolute',
    why: "Dalton's law: at 30 m (4 atm), the partial pressures of trimix 18/45 sum to the absolute pressure — 18·4 + 45·4 + 37·4 = 100·4 (each fraction times the pressure, totalling 4 atm).",
    js: () => 18 * 4 + 45 * 4 + 37 * 4 === 100 * 4,
    lean: 'theorem partial_pressures_sum_to_absolute : 18*4 + 45*4 + 37*4 = 100*4 := by decide' },

  { key: 'air_ppO2_in_window_at_surface',
    why: 'The breathable oxygen window is a partial pressure of about 0.16 to 1.60 atm (×100: 16 to 160). Air at the surface sits inside it — 16 ≤ 21 ≤ 160 — neither hypoxic below nor toxic above.',
    js: () => 16 <= 21 && 21 <= 160,
    lean: 'theorem air_ppO2_in_window_at_surface : (16 <= 21) ∧ (21 <= 160) := by decide' },

  { key: 'air_oxygen_toxic_deep',
    why: 'Why deep dives blend trimix: air is 21% O₂, and at 70 m (8 atm) its ppO₂ is 0.21·8 = 1.68 atm — above the 1.60 ceiling (21·8 = 168 > 160). Reducing the oxygen fraction (trimix) keeps ppO₂ in range at depth.',
    js: () => 21 * 8 > 160,
    lean: 'theorem air_oxygen_toxic_deep : 21 * 8 > 160 := by decide' },

  { key: 'gas_blend_by_partial_pressure',
    why: 'Blending is conserved by partial pressure: to fill trimix 18/45 to 200 bar, add O₂ to 36, He to 90, and top with N₂ to 74 — 36 + 90 + 74 = 200 (each is the fraction of the 200-bar fill).',
    js: () => 36 + 90 + 74 === 200,
    lean: 'theorem gas_blend_by_partial_pressure : 36 + 90 + 74 = 200 := by decide' },

  { key: 'helium_reduces_narcosis',
    why: 'Helium is non-narcotic: with 45% He the narcotic fraction (O₂+N₂) is 55%, so the equivalent narcotic depth is less than the real depth — at 40 m, 40·55 < 40·100. Trimix keeps a clear head deep.',
    js: () => 40 * 55 < 40 * 100,
    lean: 'theorem helium_reduces_narcosis : 40 * 55 < 40 * 100 := by decide' },

  { key: 'ascent_needs_a_stop',
    why: 'Decompression is bounded by the Haldane supersaturation ratio (classically ~2:1): from 4 atm you may ascend to 2 atm (ratio 2, tolerable) but not straight to 1 atm (ratio 4 > 2) — a direct ascent needs a stop. A model of the rule; never a plan.',
    js: () => (4 - (4 % 2)) / 2 === 2 && (4 - (4 % 1)) / 1 === 4 && 4 > 2,
    lean: 'theorem ascent_needs_a_stop : ((4 / 2 : Nat) = 2) ∧ ((4 / 1 : Nat) = 4) ∧ ((4 : Nat) > 2) := by decide' },
]

// compute → generate → verify. The arithmetic of trimix gas laws — fractions, Dalton, the oxygen window, blending,
// narcosis, the decompression ratio. HARD SAFETY DEMARCATION: algebra, never a dive plan; use training and a computer.
emit({ file: 'Diving.lean', skill: 'diving',
  header: 'DIVING — the decidable arithmetic of trimix gas laws, demarcated. A mix\'s fractions sum to 100%; absolute pressure is 1 + depth/10 atm; Dalton\'s law makes the partial pressures sum to the absolute pressure; air\'s ppO₂ (0.21·P) leaves the 0.16–1.60 window at depth, so deep dives blend trimix; gases blend by partial pressure to the fill; helium is non-narcotic (lower equivalent narcotic depth); and a direct ascent exceeding the ~2:1 Haldane ratio needs a stop. HARD SAFETY SCOPE: ARITHMETIC ONLY — NOT a dive planner, NOT dive tables, NOT medical or safety advice. Never plan or execute a dive on these numbers; use certified training, cut tables, and a dive computer. Diving is life-critical.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
