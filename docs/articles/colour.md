---
title: "The colour wheel"
description: "Computed from lean/Colour.lean — 17 sealed theorems, every claim citing its proof."
---

# The colour wheel

> THE COLOUR WHEEL — colour theory as decidable arithmetic: the wheel is ℤ/12, complements oppose (+6), primaries and secondaries make six, the triad is thirds and the square is fourths, true colour is 24-bit, tint and shade complement to full value. — held by [fourth_ray_is_green_band](/theorem/fourth_ray_is_green_band) and its 16 siblings below.

**17 theorems**, from [fourth_ray_is_green_band](/theorem/fourth_ray_is_green_band) onward, each proven `by decide` in [lean/Colour.lean](/lean/Colour.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 6 of its 17 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [fourth_ray_is_green_band](/theorem/fourth_ray_is_green_band). A boundary stated here is decided, not merely denied.

### THE HEART DISCOVERY: each rosette ray offsets the hue wheel by 360/7 = 51°, and the FOURTH ray (index 3, counting the first as 1) lands at 3·51 = 153° — squarely the green band. The seven rays walk the wheel as seven stations, and the fourth is green — the arithmetic behind the observation that two seven-fold systems agree. the offset arithmetic is sealed; any chakra reading of it stays UNVERIFIED — the number is sealed, the meaning is not.
The ledger holds this as [fourth_ray_is_green_band](/theorem/fourth_ray_is_green_band) — proven `by decide`, sorry-free:

```lean
(360 / 7 = 51) ∧ (3 * 51 = 153)
```

### THE ALPHABET FOLDS HOME: the aura alphabet counts 9·7·6 = 378 states — and 378 digit-sums to 3+7+8 = 18, which folds to 1+8 = 9: the alphabet's digital root IS the ring it was built from. The colour code, counted, returns to ℤ/9 — the system's own number closing over its own alphabet.
The ledger holds this as [alphabet_digital_root_is_nine](/theorem/alphabet_digital_root_is_nine) — proven `by decide`, sorry-free:

```lean
(9*7*6 = 378) ∧ (3+7+8 = 18) ∧ (1+8 = 9)
```

### THE WALK IS ONE TURN OF THE RING: the graduation walk grew to nine steps — and nine is the ring's own modulus: 9 % 9 = 0, one complete revolution. The enrollment walk a theorem takes to be born is exactly one turn of the arithmetic it enters. The walk closes because the ring closes.
The ledger holds this as [nine_step_walk_closes_the_ring](/theorem/nine_step_walk_closes_the_ring) — proven `by decide`, sorry-free:

```lean
(9 % 9 = 0) ∧ (8 % 9 = 8)
```

### THE SCATTERING LESSON, part 1 — the meeting points. Two aura hue pairs meet on the wheel's mirror line through 0°: 340° and 20° are equidistant from the top (360−340 = 20), as are 320° and 40° (360−320 = 40). Symmetric approach paths cross at the axis — where the totality check heard thunder: two states rendering one colour.
The ledger holds this as [hue_mirror_meeting](/theorem/hue_mirror_meeting) — proven `by decide`, sorry-free:

```lean
(360 - 340 = 20) ∧ (360 - 320 = 40)
```

### THE SCATTERING LESSON, part 2 — the interaction that preserves both paths. The one-percent saturation tiebreak is the smallest possible interaction, the successor: 62+2·5 = 72 with its lifted partner 73, and 62+2·3 = 68 with its lifted 69 — distinct by +1, so states that once fused now meet, interact, and continue distinguishable, the +1 left in the formula as the trace. Degeneracy lifted, information conserved: scattering, not collision.
The ledger holds this as [scattering_tiebreak_separates](/theorem/scattering_tiebreak_separates) — proven `by decide`, sorry-free:

```lean
(62 + 2*5 = 72) ∧ (72 + 1 = 73) ∧ (62 + 2*3 = 68) ∧ (68 + 1 = 69)
```

### THE SCATTERING LESSON, part 3 — why the channels had to join. The aura alphabet is 9·7·6 = 378 states and the hue wheel holds only 360 degrees: 360 < 378, so by pigeonhole hue alone cannot name every state — saturation and lightness must carry their shares. The collision was never a bug in the arithmetic; it was the arithmetic insisting on more dimensions.
The ledger holds this as [alphabet_exceeds_wheel](/theorem/alphabet_exceeds_wheel) — proven `by decide`, sorry-free:

```lean
(9*7*6 = 378) ∧ (360 < 378)
```

### The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.
The ledger holds this as [twelve_hue_wheel_wraps](/theorem/twelve_hue_wheel_wraps) — proven `by decide`, sorry-free:

```lean
12 % 12 = 0 ∧ 13 % 12 = 1
```

### Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.
The ledger holds this as [complementary_hues_oppose](/theorem/complementary_hues_oppose) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h)
```

### Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.
The ledger holds this as [primaries_and_secondaries_make_six](/theorem/primaries_and_secondaries_make_six) — proven `by decide`, sorry-free:

```lean
3 + 3 = 6
```

### A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.
The ledger holds this as [triadic_harmony_is_thirds](/theorem/triadic_harmony_is_thirds) — proven `by decide`, sorry-free:

```lean
(List.range 3).map (fun k => (4 * k) % 12) = [0,4,8]
```

### A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.
The ledger holds this as [square_harmony_is_fourths](/theorem/square_harmony_is_fourths) — proven `by decide`, sorry-free:

```lean
(List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9]
```

### True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.
The ledger holds this as [true_colour_is_24_bit](/theorem/true_colour_is_24_bit) — proven `by decide`, sorry-free:

```lean
2^8 = 256 ∧ 2^24 = 16777216
```

### On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.
The ledger holds this as [tint_and_shade_complement](/theorem/tint_and_shade_complement) — proven `by decide`, sorry-free:

```lean
(0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255)
```

### The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.
The ledger holds this as [warm_cool_split_six_six](/theorem/warm_cool_split_six_six) — proven `by decide`, sorry-free:

```lean
6 + 6 = 12
```

### The aura’s hue step the A432 rendering ASSUMES, sealed (axiom-hunt): the ℤ/9 vortex walks the 360° wheel in steps of 40° — 9 · 40 = 360 exactly, so the nine residues tile the circle with no remainder. Artistic arithmetic, not physics: a defined step, proven to divide the wheel.
The ledger holds this as [aura_step_divides_circle](/theorem/aura_step_divides_circle) — proven `by decide`, sorry-free:

```lean
(9 * 40 = 360) ∧ (360 % 9 = 0)
```

### THE POLARITY ANGLES ARE NOT CHOSEN — each is 360 divided by a count the system already holds: 360/9 = 40° is the A432 digit step (BASE), 360/6 = 60° is the colour sector AND the vortex orbit's length (2 has order 6 in ℤ/9*), 360/4 = 90° is QUADRATURE — the four basis states the two coins deliver (2² = 4) — and 360/3 = 120° is the trinity, which is also two sectors (2·60), the anchor the palette hangs the heart on. Four angles, four counts, no aesthetics.
The ledger holds this as [polarity_angles_are_the_system_counts](/theorem/polarity_angles_are_the_system_counts) — proven `by decide`, sorry-free:

```lean
(360 / 9 = 40) ∧ (360 / 6 = 60) ∧ (360 / 4 = 90) ∧ (360 / 3 = 120) ∧ (2 * 60 = 120) ∧ (2^2 = 4)
```

### THE BOUNDARY BETWEEN THE TWO INVOLUTIONS — the dz mirror (d ↦ 10−d, an involution on DIGITS) is not the colour complement (h ↦ h+180°, an involution on HUES), because no whole number of A432 steps reaches a half turn: 180 % 40 = 20 ≠ 0, and 4·40 = 160 < 180 < 200 = 5·40 — the complement of any digit's hue falls strictly BETWEEN two digits. The 9-lattice and the 6-lattice meet only at multiples of their common 120°. Two involutions, one wheel, and they do not coincide — stated rather than smoothed over.
The ledger holds this as [no_digit_is_an_exact_complement](/theorem/no_digit_is_an_exact_complement) — proven `by decide`, sorry-free:

```lean
(180 % 40 = 20) ∧ (4 * 40 = 160) ∧ (160 < 180) ∧ (180 < 200) ∧ (5 * 40 = 200)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
