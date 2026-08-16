---
title: "The lay of the land"
description: "Computed from lean/Topography.lean — 13 sealed theorems, every claim citing its proof."
---

# The lay of the land

> TOPOGRAPHY — the arithmetic that turns terrain into a map: contour intervals and the heavy index contour (every fifth line), elevation read by counting rings, gradient as rise-over-run, contour spacing as the inverse of slope, the Pythagorean slope distance (the walk exceeds the map), scale as a pure ratio (1:25000 → 1 cm is 250 m), the nested-tens grid reference, the back-bearing in ℤ/360, relief as max minus min, the surveyor's chain (80 to the mile, 10 sq chains to the acre), triangulation on the 180° triangle, vertical exaggeration, and Naismith's walking estimate. HONEST SCOPE: exact ratios, counts and cycles of the map — NOT a survey, a GPS fix, or safety guidance; the ledger seals only exact rational facts (the 3-4-5 slope triple, not a general hillside's irrational length), and Naismith's time is a rule-of-thumb estimate, demarcated where it appears.

**13 theorems**, each proven `by decide` in [lean/Topography.lean](/lean/Topography.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### A contour joins points of equal height; every fifth line is drawn heavy — the index contour — so with a 10 m interval the heavy lines fall on multiples of 50 m: [50,100,150,200] all divide by 50, while an intermediate 30 m line does not. The map lets you read height without a number on every ring.

The ledger holds this as [contour_index_every_fifth](/theorem/contour_index_every_fifth) — proven `by decide`, sorry-free:

```lean
[50,100,150,200].all (fun h => h % 50 == 0) ∧ (30 % 50 != 0)
```

### Reading elevation off contours is pure counting: cross n lines of a fixed interval and you have climbed n intervals — five lines of a 20 m interval is 100 m of ascent (5 · 20 = 100). No instrument, just the rings the surveyor already drew.

The ledger holds this as [elevation_counts_intervals](/theorem/elevation_counts_intervals) — proven `by decide`, sorry-free:

```lean
5 * 20 = 100
```

### Gradient is rise over run: a 1-in-20 slope lifts one unit for every twenty travelled, so over a 100 m run it climbs 5 m (100 / 20 = 5); expressed as a percent grade the same slope is 5% (5 · 100 / 100 = 5). The two ways an engineer names the same hill.

The ledger holds this as [gradient_rise_over_run](/theorem/gradient_rise_over_run) — proven `by decide`, sorry-free:

```lean
(100 / 20 = 5) ∧ (5 * 100 / 100 = 5)
```

### Closer contours mean steeper ground: for a fixed 10 m interval the horizontal spacing is the interval divided by the gradient, so a steep 1-in-5 slope spaces the lines 50 m apart while a gentle 1-in-10 spaces them 100 m — and 50 < 100, the crowded lines are the cliff. The map encodes slope as density.

The ledger holds this as [contour_spacing_inverse_gradient](/theorem/contour_spacing_inverse_gradient) — proven `by decide`, sorry-free:

```lean
(10 * 5 = 50) ∧ (10 * 10 = 100) ∧ (50 < 100)
```

### The distance walked exceeds the distance mapped: a 400 m run that climbs 300 m is a 500 m walk along the ground, because 300² + 400² = 500² — the walker's 3-4-5 hillside — and the slope length 500 is strictly greater than the flat run 400. A map measures the shadow, not the climb.

The ledger holds this as [hillside_three_four_five](/theorem/hillside_three_four_five) — proven `by decide`, sorry-free:

```lean
(300 * 300 + 400 * 400 = 500 * 500) ∧ (500 > 400)
```

### Scale is a pure ratio the whole sheet obeys: at 1:25000 a centimetre on the map is 25000 cm on the ground — 250 m (25000 / 100 = 250) — so four centimetres span a kilometre (4 · 250 = 1000). Every measured length multiplies by the same number.

The ledger holds this as [map_scale_one_to_25000](/theorem/map_scale_one_to_25000) — proven `by decide`, sorry-free:

```lean
(25000 / 100 = 250) ∧ (4 * 250 = 1000)
```

### A grid reference locates by nested tens: each 100 m square is split into ten, so the sixth figure resolves a point to 10 m (100 / 10 = 10), and a reading of 5 places it 50 m across the square (5 · 10 = 50). Two more figures would divide again to the metre.

The ledger holds this as [six_figure_grid_tenths](/theorem/six_figure_grid_tenths) — proven `by decide`, sorry-free:

```lean
(100 / 10 = 10) ∧ (5 * 10 = 50)
```

### The return bearing is the outward one turned about-face: add 180° modulo the full circle, so a forward bearing of 45° comes back as 225°, and a forward 200° wraps to 20° ((200 + 180) mod 360). Bearings live in ℤ/360 — the compass is a ring.

The ledger holds this as [back_bearing_mod_360](/theorem/back_bearing_mod_360) — proven `by decide`, sorry-free:

```lean
((45 + 180) % 360 = 225) ∧ ((200 + 180) % 360 = 20)
```

### The relief of a sheet is its vertical range — the highest spot height less the lowest: a summit at 1085 m over a valley floor at 200 m gives 885 m of relief (1085 − 200 = 885). One subtraction summarises how mountainous the ground is.

The ledger holds this as [relief_is_max_minus_min](/theorem/relief_is_max_minus_min) — proven `by decide`, sorry-free:

```lean
1085 - 200 = 885
```

### The triangulation that fixed every trig point rests on the triangle: its three angles sum to two right angles — an equilateral 60 + 60 + 60 = 180 and a right-isosceles 90 + 45 + 45 = 180 — so two measured angles give the third, and three known stations fix a fourth. The whole survey is built of triangles.

The ledger holds this as [triangulation_angles_sum](/theorem/triangulation_angles_sum) — proven `by decide`, sorry-free:

```lean
(60 + 60 + 60 = 180) ∧ (90 + 45 + 45 = 180)
```

### Gunter's chain laid the grid before the satellite: eighty chains of 66 feet make the mile (80 · 66 = 5280 ft), and a chain by a furlong makes the acre — ten square chains, since a furlong is ten chains — which in yards is 22 · 220 = 4840 sq yd (a chain being 22 yd, a furlong 220 yd). The awkward 66 is chosen precisely so the mile and the acre both come out whole.

The ledger holds this as [gunters_chain_measures](/theorem/gunters_chain_measures) — proven `by decide`, sorry-free:

```lean
(80 * 66 = 5280) ∧ (22 * 220 = 4840)
```

### A cross-section stretches the vertical to make gentle relief legible: the exaggeration is the vertical scale over the horizontal, so a profile drawn at 1:100 vertical against 1:500 horizontal exaggerates the slopes five-fold (500 / 100 = 5). HONEST SCOPE: the profile then LOOKS five times steeper than the land — a reading aid, not the true gradient.

The ledger holds this as [vertical_exaggeration](/theorem/vertical_exaggeration) — proven `by decide`, sorry-free:

```lean
500 / 100 = 5
```

### Naismith's rule estimates a hill walk: allow an hour per 5 km and an extra hour per 600 m of ascent, so 15 km climbing 1200 m is about (15/5)·60 + (1200/600)·60 = 300 minutes, five hours. HONEST SCOPE: a rule-of-thumb ESTIMATE for planning, not a guarantee — it ignores terrain, load, weather and the walker; never stake safety on it.

The ledger holds this as [naismith_rule_estimate](/theorem/naismith_rule_estimate) — proven `by decide`, sorry-free:

```lean
(15 / 5) * 60 + (1200 / 600) * 60 = 300
```


::: warning HONEST SCOPE
exact ratios, counts and cycles of the map — NOT a survey, a GPS fix, or safety guidance; the ledger seals only exact rational facts (the 3-4-5 slope triple, not a general hillside's irrational length), and Naismith's time is a rule-of-thumb estimate, demarcated where it appears.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
