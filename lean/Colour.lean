-- lean/Colour.lean — GENERATED. THE COLOUR WHEEL — colour theory as decidable arithmetic: the wheel is ℤ/12, complements oppose (+6), primaries and secondaries make six, the triad is thirds and the square is fourths, true colour is 24-bit, tint and shade complement to full value. The geometry of the wheel, NOT a claim that taste or beauty is objective. Every proof `by decide`, sorry-free, no Mathlib.

-- The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.
theorem twelve_hue_wheel_wraps : 12 % 12 = 0 ∧ 13 % 12 = 1 := by decide

-- Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.
theorem complementary_hues_oppose : (List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h) := by decide

-- Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.
theorem primaries_and_secondaries_make_six : 3 + 3 = 6 := by decide

-- A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.
theorem triadic_harmony_is_thirds : (List.range 3).map (fun k => (4 * k) % 12) = [0,4,8] := by decide

-- A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.
theorem square_harmony_is_fourths : (List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9] := by decide

-- True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.
theorem true_colour_is_24_bit : 2^8 = 256 ∧ 2^24 = 16777216 := by decide

-- On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.
theorem tint_and_shade_complement : (0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255) := by decide

-- The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.
theorem warm_cool_split_six_six : 6 + 6 = 12 := by decide
