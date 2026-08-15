#!/usr/bin/env node
// Automate the Lean layer for THE COLOUR WHEEL — colour theory as decidable arithmetic, the art domain of the
// spectrum's visible band. The wheel is ℤ/12 (twelve hues, advance twelve and the hue returns), complementary hues
// sit opposite (a +6 half-turn, self-inverse), three primaries alternate with three secondaries (3+3=6, the
// hexagon), and the classical harmonies are the regular polygons on the wheel: the triad is thirds (+4, {0,4,8}),
// the square is fourths (+3, {0,3,6,9}). True colour is 8 bits a channel (2⁸ = 256), 2²⁴ = 16777216 in all; a tint
// and its shade complement to full value. HONEST SCOPE (integrity, not truth): this is the ARITHMETIC of the colour
// wheel and its harmonies — the geometry a colourist works in — NOT a claim that beauty, taste, or which colours
// "go together" is objective; harmony here means the polygon, not a verdict on art. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'twelve_hue_wheel_wraps',
    why: 'The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.',
    js: () => 12 % 12 === 0 && 13 % 12 === 1,
    lean: 'theorem twelve_hue_wheel_wraps : 12 % 12 = 0 ∧ 13 % 12 = 1 := by decide' },

  { key: 'complementary_hues_oppose',
    why: 'Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.',
    js: () => [...Array(12).keys()].every((h) => (h + 6 + 6) % 12 === h && (h + 6) % 12 !== h),
    lean: 'theorem complementary_hues_oppose : (List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h) := by decide' },

  { key: 'primaries_and_secondaries_make_six',
    why: 'Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.',
    js: () => 3 + 3 === 6,
    lean: 'theorem primaries_and_secondaries_make_six : 3 + 3 = 6 := by decide' },

  { key: 'triadic_harmony_is_thirds',
    why: 'A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.',
    js: () => JSON.stringify([0, 1, 2].map((k) => (4 * k) % 12)) === JSON.stringify([0, 4, 8]),
    lean: 'theorem triadic_harmony_is_thirds : (List.range 3).map (fun k => (4 * k) % 12) = [0,4,8] := by decide' },

  { key: 'square_harmony_is_fourths',
    why: 'A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.',
    js: () => JSON.stringify([0, 1, 2, 3].map((k) => (3 * k) % 12)) === JSON.stringify([0, 3, 6, 9]),
    lean: 'theorem square_harmony_is_fourths : (List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9] := by decide' },

  { key: 'true_colour_is_24_bit',
    why: 'True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.',
    js: () => 2 ** 8 === 256 && 2 ** 24 === 16777216,
    lean: 'theorem true_colour_is_24_bit : 2^8 = 256 ∧ 2^24 = 16777216 := by decide' },

  { key: 'tint_and_shade_complement',
    why: 'On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.',
    js: () => 0 + 255 === 255 && 64 + 191 === 255 && 255 + 0 === 255,
    lean: 'theorem tint_and_shade_complement : (0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255) := by decide' },

  { key: 'warm_cool_split_six_six',
    why: 'The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.',
    js: () => 6 + 6 === 12,
    lean: 'theorem warm_cool_split_six_six : 6 + 6 = 12 := by decide' },

  { key: 'aura_step_divides_circle',
    why: 'The aura’s hue step the A432 rendering ASSUMES, sealed (axiom-hunt): the ℤ/9 vortex walks the 360° wheel in steps of 40° — 9 · 40 = 360 exactly, so the nine residues tile the circle with no remainder. Artistic arithmetic, not physics: a defined step, proven to divide the wheel.',
    js: () => 9 * 40 === 360 && 360 % 9 === 0,
    lean: 'theorem aura_step_divides_circle : (9 * 40 = 360) ∧ (360 % 9 = 0) := by decide' },
]

emit({
  file: 'Colour.lean', skill: 'colour',
  header: 'THE COLOUR WHEEL — colour theory as decidable arithmetic: the wheel is ℤ/12, complements oppose (+6), primaries and secondaries make six, the triad is thirds and the square is fourths, true colour is 24-bit, tint and shade complement to full value. The geometry of the wheel, NOT a claim that taste or beauty is objective.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
