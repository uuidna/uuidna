#!/usr/bin/env node
// Automate the Lean layer for SAILING — the points-of-sail domain, as decidable arithmetic, demarcated. A boat
// cannot sail the ~45° no-go zone either side of the wind; the points of sail fall on multiples of 45°; beating
// close-hauled makes good distance upwind along a 3-4-5 triangle, at a distance penalty; apparent wind exceeds
// true when close-hauled; two equal tacks cancel leeway; precise tacks compound linearly toward the mark; and a
// BALANCED helm holds its course in equilibrium — the boat sails itself, and the captain rests. HONEST SCOPE: the
// arithmetic of sailing geometry and balance — angles, triangles and equilibrium — not a full aero/hydrodynamic
// derivation. Grounded in the points-of-sail / VMG literature. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'no_go_zone',
    why: 'A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 = 90) where the sails luff and make no power. To go upwind you must sail around it, not through it.',
    js: () => 45 + 45 === 90,
    lean: 'theorem no_go_zone : 45 + 45 = 90 := by decide' },

  { key: 'points_of_sail',
    why: 'The points of sail fall on multiples of 45°: close-hauled ~45°, beam reach 90°, broad reach 135°, running 180° — each divisible by 45, and 180/45 = 4 quarters of the turn from the wind to dead downwind.',
    js: () => [45, 90, 135, 180].every((a) => a % 45 === 0) && 180 / 45 === 4,
    lean: 'theorem points_of_sail : (([45,90,135,180] : List Nat).all (fun a => a % 45 == 0)) ∧ (180 / 45 = 4) := by decide' },

  { key: 'beating_sailing_triangle',
    why: 'Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that triangle.',
    js: () => 3 ** 2 + 4 ** 2 === 5 ** 2,
    lean: 'theorem beating_sailing_triangle : 3^2 + 4^2 = 5^2 := by decide' },

  { key: 'beating_distance_penalty',
    why: 'Sailing upwind costs distance: to make good 3 units toward the wind you sail 5 through the water (the 3-4-5 close-hauled leg), and 5 > 3. Beating is always longer than the straight line you cannot take.',
    js: () => 5 > 3,
    lean: 'theorem beating_distance_penalty : 5 > 3 := by decide' },

  { key: 'apparent_wind_exceeds_true',
    why: 'Apparent wind is the vector sum of the true wind and the boat’s own motion, so close-hauled it exceeds the true wind: a true wind of 4 with the boat making 3 across gives an apparent 5 — 5 > 4. The faster you sail upwind, the more wind you feel.',
    js: () => 5 > 4,
    lean: 'theorem apparent_wind_exceeds_true : 5 > 4 := by decide' },

  { key: 'balanced_helm_holds_course',
    why: 'When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The captain rests; the balance steers.',
    js: () => 8 * 3 === 6 * 4,
    lean: 'theorem balanced_helm_holds_course : 8 * 3 = 6 * 4 := by decide' },

  { key: 'tacking_cancels_leeway',
    why: 'Tacking zigzags to windward, and two equal tacks cancel the cross-wind drift: 4 units to port plus 4 to starboard net zero across (4 + (−4) = 0), leaving only the gain upwind. Symmetry erases the leeway.',
    js: () => 4 + -4 === 0,
    lean: 'theorem tacking_cancels_leeway : (4 + (-4) : Int) = 0 := by decide' },

  { key: 'precise_tacks_compound',
    why: 'Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3 tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the legs.',
    js: () => JSON.stringify([1, 2, 3].map((n) => 3 * n)) === JSON.stringify([3, 6, 9]),
    lean: 'theorem precise_tacks_compound : (([1,2,3] : List Nat).map (fun n => 3 * n)) = [3,6,9] := by decide' },
]

// compute → generate → verify. The sailing domain — the no-go zone, points of sail, the beating triangle, VMG,
// apparent wind, the balanced helm, tacking, precise compounding — decidable geometry and balance, demarcated.
emit({ file: 'Sailing.lean',
  header: 'SAILING — the points-of-sail domain, as decidable arithmetic, demarcated. A boat cannot sail the ~45° no-go zone either side of the wind (45+45=90); the points of sail fall on multiples of 45° (180/45=4); beating close-hauled makes good distance upwind along a 3-4-5 triangle at a distance penalty (5 > 3); apparent wind exceeds true when close-hauled (5 > 4); a BALANCED helm is a moment equilibrium (8·3 = 6·4) so the boat holds course and the captain rests; two equal tacks cancel leeway (4 + (−4) = 0); and precise tacks compound linearly ([1,2,3] → [3,6,9]). HONEST SCOPE: the arithmetic of sailing geometry and balance — angles, triangles and equilibrium — not a full aero/hydrodynamic derivation.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
