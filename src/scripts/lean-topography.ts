#!/usr/bin/env node
// Automate the Lean layer for TOPOGRAPHY — the arithmetic that turns terrain into a map, decidable. A contour is a
// line of constant height, so reading elevation is COUNTING: cross n lines of interval h and you climb n·h. Every
// fifth contour is drawn heavy — the index contour — and falls on a round multiple of the interval. Gradient is
// rise over run (a 1-in-20 slope climbs 5 m in 100 m); the slope distance is the Pythagorean hypotenuse, always
// longer than the map's flat run; closer contours mean steeper ground (spacing = interval ÷ gradient). Scale is a
// pure ratio (1:25000 → 1 cm is 250 m); a grid reference splits each square into tenths; a back-bearing is the
// forward turned 180° about the compass (bearings live in ℤ/360); relief is the highest spot height less the
// lowest; and the triangulation that fixed every hilltop rests on a triangle whose angles sum to 180°. HONEST
// SCOPE: the arithmetic of the map — exact ratios, counts and cycles — NOT a survey, a GPS fix, a route planner, or
// safety guidance. The ledger seals only EXACT rational facts — the 3-4-5 slope triple, not the irrational length of
// a general hillside — and Naismith's walking time is a rule-of-thumb ESTIMATE, demarcated where it appears.
// COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit, range } from './lean-gen.js'

const FACTS = [
  { key: 'contour_index_every_fifth',
    why: 'A contour joins points of equal height; every fifth line is drawn heavy — the index contour — so with a 10 m interval the heavy lines fall on multiples of 50 m: [50,100,150,200] all divide by 50, while an intermediate 30 m line does not. The map lets you read height without a number on every ring.',
    js: () => [50, 100, 150, 200].every((h) => h % 50 === 0) && 30 % 50 !== 0,
    lean: 'theorem contour_index_every_fifth : [50,100,150,200].all (fun h => h % 50 == 0) ∧ (30 % 50 != 0) := by decide' },

  { key: 'elevation_counts_intervals',
    why: 'Reading elevation off contours is pure counting: cross n lines of a fixed interval and you have climbed n intervals — five lines of a 20 m interval is 100 m of ascent (5 · 20 = 100). No instrument, just the rings the surveyor already drew.',
    js: () => 5 * 20 === 100,
    lean: 'theorem elevation_counts_intervals : 5 * 20 = 100 := by decide' },

  { key: 'gradient_rise_over_run',
    why: 'Gradient is rise over run: a 1-in-20 slope lifts one unit for every twenty travelled, so over a 100 m run it climbs 5 m (100 / 20 = 5); expressed as a percent grade the same slope is 5% (5 · 100 / 100 = 5). The two ways an engineer names the same hill.',
    js: () => 100 / 20 === 5 && (5 * 100) / 100 === 5,
    lean: 'theorem gradient_rise_over_run : (100 / 20 = 5) ∧ (5 * 100 / 100 = 5) := by decide' },

  { key: 'contour_spacing_inverse_gradient',
    why: 'Closer contours mean steeper ground: for a fixed 10 m interval the horizontal spacing is the interval divided by the gradient, so a steep 1-in-5 slope spaces the lines 50 m apart while a gentle 1-in-10 spaces them 100 m — and 50 < 100, the crowded lines are the cliff. The map encodes slope as density.',
    js: () => 10 * 5 === 50 && 10 * 10 === 100 && 50 < 100,
    lean: 'theorem contour_spacing_inverse_gradient : (10 * 5 = 50) ∧ (10 * 10 = 100) ∧ (50 < 100) := by decide' },

  { key: 'hillside_three_four_five',
    why: 'The distance walked exceeds the distance mapped: a 400 m run that climbs 300 m is a 500 m walk along the ground, because 300² + 400² = 500² — the walker\'s 3-4-5 hillside — and the slope length 500 is strictly greater than the flat run 400. A map measures the shadow, not the climb.',
    js: () => 300 * 300 + 400 * 400 === 500 * 500 && 500 > 400,
    lean: 'theorem hillside_three_four_five : (300 * 300 + 400 * 400 = 500 * 500) ∧ (500 > 400) := by decide' },

  { key: 'map_scale_one_to_25000',
    why: 'Scale is a pure ratio the whole sheet obeys: at 1:25000 a centimetre on the map is 25000 cm on the ground — 250 m (25000 / 100 = 250) — so four centimetres span a kilometre (4 · 250 = 1000). Every measured length multiplies by the same number.',
    js: () => 25000 / 100 === 250 && 4 * 250 === 1000,
    lean: 'theorem map_scale_one_to_25000 : (25000 / 100 = 250) ∧ (4 * 250 = 1000) := by decide' },

  { key: 'six_figure_grid_tenths',
    why: 'A grid reference locates by nested tens: each 100 m square is split into ten, so the sixth figure resolves a point to 10 m (100 / 10 = 10), and a reading of 5 places it 50 m across the square (5 · 10 = 50). Two more figures would divide again to the metre.',
    js: () => 100 / 10 === 10 && 5 * 10 === 50,
    lean: 'theorem six_figure_grid_tenths : (100 / 10 = 10) ∧ (5 * 10 = 50) := by decide' },

  { key: 'back_bearing_mod_360',
    why: 'The return bearing is the outward one turned about-face: add 180° modulo the full circle, so a forward bearing of 45° comes back as 225°, and a forward 200° wraps to 20° ((200 + 180) mod 360). Bearings live in ℤ/360 — the compass is a ring.',
    js: () => (45 + 180) % 360 === 225 && (200 + 180) % 360 === 20,
    lean: 'theorem back_bearing_mod_360 : ((45 + 180) % 360 = 225) ∧ ((200 + 180) % 360 = 20) := by decide' },

  { key: 'relief_is_max_minus_min',
    why: 'The relief of a sheet is its vertical range — the highest spot height less the lowest: a summit at 1085 m over a valley floor at 200 m gives 885 m of relief (1085 − 200 = 885). One subtraction summarises how mountainous the ground is.',
    js: () => 1085 - 200 === 885,
    lean: 'theorem relief_is_max_minus_min : 1085 - 200 = 885 := by decide' },

  { key: 'triangulation_angles_sum',
    why: 'The triangulation that fixed every trig point rests on the triangle: its three angles sum to two right angles — an equilateral 60 + 60 + 60 = 180 and a right-isosceles 90 + 45 + 45 = 180 — so two measured angles give the third, and three known stations fix a fourth. The whole survey is built of triangles.',
    js: () => 60 + 60 + 60 === 180 && 90 + 45 + 45 === 180,
    lean: 'theorem triangulation_angles_sum : (60 + 60 + 60 = 180) ∧ (90 + 45 + 45 = 180) := by decide' },

  { key: 'gunters_chain_measures',
    why: "Gunter's chain laid the grid before the satellite: eighty chains of 66 feet make the mile (80 · 66 = 5280 ft), and a chain by a furlong makes the acre — ten square chains, since a furlong is ten chains — which in yards is 22 · 220 = 4840 sq yd (a chain being 22 yd, a furlong 220 yd). The awkward 66 is chosen precisely so the mile and the acre both come out whole.",
    js: () => 80 * 66 === 5280 && 22 * 220 === 4840,
    lean: 'theorem gunters_chain_measures : ((80 * 66 = 5280) ∧ (22 * 220 = 4840)) \u2227 (8 % 9 = 8) := by decide' },

  { key: 'vertical_exaggeration',
    why: 'A cross-section stretches the vertical to make gentle relief legible: the exaggeration is the vertical scale over the horizontal, so a profile drawn at 1:100 vertical against 1:500 horizontal exaggerates the slopes five-fold (500 / 100 = 5). the profile then LOOKS five times steeper than the land — a reading aid, not the true gradient.',
    js: () => 500 / 100 === 5,
    lean: 'theorem vertical_exaggeration : 500 / 100 = 5 := by decide' },

  { key: 'naismith_rule_estimate',
    why: "Naismith's rule estimates a hill walk: allow an hour per 5 km and an extra hour per 600 m of ascent, so 15 km climbing 1200 m is about (15/5)·60 + (1200/600)·60 = 300 minutes, five hours. a rule-of-thumb ESTIMATE for planning, not a guarantee — it ignores terrain, load, weather and the walker; never stake safety on it.",
    js: () => (15 / 5) * 60 + (1200 / 600) * 60 === 300,
    lean: 'theorem naismith_rule_estimate : (15 / 5) * 60 + (1200 / 600) * 60 = 300 := by decide' },

  // ── THE FIGURE OF THE EARTH — the decidable arithmetic of the reference ellipsoid every map is drawn on.
  // WGS 84 fixes TWO constants by definition (not by measurement): the semi-major axis a = 6 378 137 m exactly,
  // and the inverse flattening 1/f = 298.257223563 exactly. Everything else about the figure is DERIVED from
  // those two, so the derivation is arithmetic and belongs here — computed, never copied from a table.
  // this seals the arithmetic of a DEFINED reference surface, not an empirical finding about the
  // planet. Whether the earth has this shape is a measurement question with no decidable test in this ledger
  // (untested_stays_unproven) — sealing 21385 does not adjudicate it, and must never be cited as if it did.
  { key: 'wgs84_polar_shorter',
    why: 'THE POLAR RADIUS, DERIVED IN INTEGERS. From the two WGS 84 defining constants alone — a = 6378137 m and 1/f = 298.257223563 (scaled to the exact integer 298257223563 over 10⁹) — the semi-minor axis computes as a(1/f − 1)/(1/f) = 6356752 m, and the two axes differ by exactly 21385 m. So the pole sits about 21.4 km closer to the centre than the equator does, and that number is not read off a table: it falls out of the definition by division.',
    // BigInt, not Number: 6378137 × 297257223563 ≈ 1.9e18 overflows MAX_SAFE_INTEGER (9.0e15), so float
    // arithmetic would silently round and the mirror would "agree" with Lean by luck rather than by value.
    js: () => (6378137n * (298257223563n - 1000000000n)) / 298257223563n === 6356752n && 6378137 - 6356752 === 21385,
    lean: 'theorem wgs84_polar_shorter : 6378137 * (298257223563 - 1000000000) / 298257223563 = 6356752 ∧ 6378137 - 6356752 = 21385 := by decide' },


  { key: 'eratosthenes_fiftieth_circle',
    why: 'THE OLDEST MEASUREMENT, AS EXACT ARITHMETIC. Eratosthenes measured the sun 7.2° off vertical at Alexandria when it stood overhead at Syene, and 7.2° is one fiftieth of a circle — in tenths of a degree, 3600 = 50 × 72. So the whole circumference is fifty times the Syene–Alexandria distance. The RATIO is exact and decidable. SCOPE: the resulting circumference is NOT sealed here, because it depends on the length of his stadion, which is genuinely uncertain — the honest half is the fifty.',
    js: () => 3600 === 50 * 72,
    lean: 'theorem eratosthenes_fiftieth_circle : 3600 = 50 * 72 := by decide' },

  { key: 'horizon_distance_finite',
    why: 'THE HORIZON IS BOUNDED, AND THAT IS THE WHOLE POINT. On a sphere of radius R the distance to the horizon from eye height h satisfies d² ≈ 2Rh — so from 2 m up on R = 6371 km, d² = 25484000 m², bracketed exactly between 5048² and 5049²: about 5.05 km, and it GROWS ONLY AS THE SQUARE ROOT of height. A bounded horizon that scales as √h is the arithmetic signature of a curved surface; on an unbounded flat plane the sightline has no such limit. The bracket is exact integer arithmetic — no square root is taken, so nothing irrational is claimed.',
    js: () => 5048 * 5048 <= 2 * 6371000 * 2 && 2 * 6371000 * 2 < 5049 * 5049,
    lean: 'theorem horizon_distance_finite : (5048 * 5048 <= 2 * 6371000 * 2 ∧ 2 * 6371000 * 2 < 5049 * 5049) \u2227 (8 % 9 = 8) := by decide' },

  { key: 'bulge_exceeds_relief',
    why: 'ROTATION SHAPES THE EARTH MORE THAN MOUNTAINS DO. Summit to trench — Everest at 8849 m above sea level (the 2020 joint China–Nepal survey, 8848.86 m) and Challenger Deep at 10935 m below it (Greenaway et al. 2021, ±6 m) — the whole topographic range is 19784 m. The equatorial bulge, the difference between the WGS 84 axes, is 21385 m: LARGER, by 1601 m. So the biggest departure from a sphere is not the terrain at all; it is the flattening a spinning body takes. Two measured extremes and one derived constant, compared in integers.',
    js: () => 8849 + 10935 === 19784 && 21385 > 19784,
    lean: 'theorem bulge_exceeds_relief : 8849 + 10935 = 19784 ∧ 21385 > 19784 := by decide' },

  { key: 'back_bearing_is_involutive_on_every_bearing',
    why: 'THE BACK BEARING IS AN INVOLUTION ON ALL 360 BEARINGS, enumerated. Reciprocal of a bearing b is (b + 180) mod 360, and taking it twice returns b — the fact every compass traverse closes on. It is decided here for every one of the 360 integer bearings, not for a sample: the walk is FACTORED as 36 × 10 because a flat List.range 360 exceeds the kernel\u2019s default recursion depth, and buying depth with set_option is refused in this tree (the raise census in lean-cube counts every instance). Restating the walk on a product keeps the same 360 points inside the ceiling.',
    js: () => range(36).every((t) => range(10).every((u) => {
      const b = t * 10 + u
      return ((b + 180) % 360 + 180) % 360 === b
    })) && 36 * 10 === 360 && 360 === 2 * 180,
    lean: 'theorem back_bearing_is_involutive_on_every_bearing : ((List.range 36).all (fun t => (List.range 10).all (fun u => let b := t * 10 + u; ((b + 180) % 360 + 180) % 360 == b))) ∧ (36 * 10 = 360) ∧ (360 = 2 * 180) := by decide' },
]

console.log('computing ' + FACTS.length + ' TOPOGRAPHY facts (the arithmetic of the map — not a survey, not a route planner) …')

emit({
  file: 'Topography.lean', skill: 'topography',
  header: 'TOPOGRAPHY — the arithmetic that turns terrain into a map: contour intervals and the heavy index contour (every fifth line), elevation read by counting rings, gradient as rise-over-run, contour spacing as the inverse of slope, the Pythagorean slope distance (the walk exceeds the map), scale as a pure ratio (1:25000 → 1 cm is 250 m), the nested-tens grid reference, the back-bearing in ℤ/360, relief as max minus min, the surveyor\'s chain (80 to the mile, 10 sq chains to the acre), triangulation on the 180° triangle, vertical exaggeration, and Naismith\'s walking estimate. exact ratios, counts and cycles of the map — NOT a survey, a GPS fix, or safety guidance; the ledger seals only exact rational facts (the 3-4-5 slope triple, not a general hillside\'s irrational length), and Naismith\'s time is a rule-of-thumb estimate, demarcated where it appears.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
