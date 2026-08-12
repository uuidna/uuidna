#!/usr/bin/env node
// Automate the Lean layer for THE TIDES — the sailor's rule-of-twelfths and the semidiurnal cycle as decidable
// arithmetic, joining Navigation, Sailing and Diving in the captain's domain. Over six hours a tide rises in twelfths
// 1,2,3,3,2,1 = 12 (the full range); the rule is a palindrome (flood mirrors ebb); by the third hour the water is at
// half its range; the middle hours run three times faster than the edges; two highs fall a lunar day apart (12h25m =
// 745 min, ×2 = 24h50m); a spring tide (sun and moon aligned, pulls ADD) exceeds a neap (at the quarter, pulls partly
// cancel); and six hours of flood plus six of ebb make one cycle. HONEST SCOPE: tidal arithmetic and the rule of
// twelfths — NOT a harmonic tide-prediction model. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'rule_of_twelfths',
    why: "The sailor's rule of twelfths: over six hours a tide rises 1,2,3,3,2,1 twelfths of its range — and 1+2+3+3+2+1 = 12, the whole range accounted for.",
    js: () => 1 + 2 + 3 + 3 + 2 + 1 === 12,
    lean: 'theorem rule_of_twelfths : 1 + 2 + 3 + 3 + 2 + 1 = 12 := by decide' },

  { key: 'twelfths_symmetric',
    why: 'The rule is a palindrome — [1,2,3,3,2,1] reversed is itself: flood and ebb mirror, the tide fills as it drains.',
    js: () => JSON.stringify([1, 2, 3, 3, 2, 1].slice().reverse()) === JSON.stringify([1, 2, 3, 3, 2, 1]),
    lean: 'theorem twelfths_symmetric : [1,2,3,3,2,1].reverse = [1,2,3,3,2,1] := by decide' },

  { key: 'half_tide_at_hour_three',
    why: 'By the third hour the water stands at HALF its range: 1+2+3 = 6 of 12 (2·6 = 12) — half-tide falls at mid-flood, not the halfway time by accident but by the twelfths.',
    js: () => 1 + 2 + 3 === 6 && 2 * 6 === 12,
    lean: 'theorem half_tide_at_hour_three : 1 + 2 + 3 = 6 ∧ 2 * 6 = 12 := by decide' },

  { key: 'mid_tide_fastest',
    why: 'The middle hours run fastest: 3 twelfths an hour at mid-tide versus 1 at the turns — 3 > 1, so the water moves most where a grounded keel most needs the depth to change.',
    js: () => 3 > 1,
    lean: 'theorem mid_tide_fastest : 3 > 1 := by decide' },

  { key: 'semidiurnal_period',
    why: 'Two high tides fall a lunar day apart: 12h25m = 745 minutes each, and 745·2 = 1490 = 24h50m — the semidiurnal rhythm, set by the Moon, not the Sun (which would give 24h).',
    js: () => 745 * 2 === 1490,
    lean: 'theorem semidiurnal_period : 745 * 2 = 1490 := by decide' },

  { key: 'spring_exceeds_neap',
    why: 'A spring tide (new or full Moon, Sun and Moon aligned, their pulls ADD) exceeds a neap (at the quarter, pulls partly cancel): 2+1 > 2−1 — the range swells and shrinks with the phase.',
    js: () => 2 + 1 > 2 - 1,
    lean: 'theorem spring_exceeds_neap : 2 + 1 > 2 - 1 := by decide' },

  { key: 'flood_and_ebb',
    why: 'One semidiurnal cycle is six hours of flood and six of ebb: 6 + 6 = 12 — the tide gives back exactly the hours it took.',
    js: () => 6 + 6 === 12,
    lean: 'theorem flood_and_ebb : 6 + 6 = 12 := by decide' },
]

emit({
  file: 'Tides.lean', skill: 'tides',
  header: 'THE TIDES — the rule of twelfths, half-tide, the semidiurnal period and spring/neap, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
