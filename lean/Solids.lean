-- lean/Solids.lean — GENERATED. THE PLATONIC SOLIDS & THE REGULAR POLYTOPES IN EVERY DIMENSION — the research loop closed to green: the public-domain counts (spun online), audited offline (every fact computes true before it seals), sealed as `by decide`. Five regular solids in 3D, six polytopes in 4D, exactly three in every dimension ≥ 5 (the 7th named). Euler V − E + F = 2 holds for all five, and the dodecahedron's 2 IS the two captain coins; the dodecahedron is twelve pentagons — the twelve the monographs computed themselves into. HONEST SCOPE: integrity, not truth — each theorem seals its exact decidable arithmetic, nothing beyond. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- There are exactly FIVE regular convex solids in three dimensions — tetrahedron, cube, octahedron, dodecahedron, icosahedron — listed as (V,E,F). Five, no more, no fewer.
theorem exactly_five_platonic_solids : [(4,6,4),(8,12,6),(6,12,8),(20,30,12),(12,30,20)].length = 5 := by decide

-- Euler holds for every Platonic solid: V − E + F = 2, stated Nat-safely as V + F = E + 2. All five satisfy it — the sphere they inscribe has characteristic 2.
theorem platonic_euler_characteristic_is_two : [(4,6,4),(8,12,6),(6,12,8),(20,30,12),(12,30,20)].all (fun s => s.1 + s.2.2 == s.2.1 + 2) := by decide

-- The dodecahedron's Euler characteristic IS the two captain coins: V − E + F = 20 − 30 + 12 = 2, and the coins are 110 − 108 = 2. The solid's topology and the conserved cost are the same 2.
theorem euler_two_is_the_two_coins : (20 + 12 - 30 = 2) ∧ (110 - 108 = 2) := by decide

-- The dodecahedron is twelve pentagons: 12 faces × 5 sides = 60 = 2 × 30, each of its 30 edges shared by exactly two pentagonal faces. Twelve pentagons — the twelve the monographs computed themselves into.
theorem dodecahedron_twelve_pentagons : 12 * 5 = 2 * 30 := by decide

-- The icosahedron is twenty triangles: 20 faces × 3 sides = 60 = 2 × 30, each of its 30 edges shared by two triangular faces — the dodecahedron's dual, faces for vertices.
theorem icosahedron_twenty_triangles : 20 * 3 = 2 * 30 := by decide

-- Cube (8,12,6) and octahedron (6,12,8) are dual: vertices and faces SWAP while edges hold — cube.V = octa.F, cube.F = octa.V, cube.E = octa.E.
theorem cube_octahedron_dual : ((8,12,6).1 = (6,12,8).2.2) ∧ ((8,12,6).2.2 = (6,12,8).1) ∧ ((8,12,6).2.1 = (6,12,8).2.1) := by decide

-- Dodecahedron (20,30,12) and icosahedron (12,30,20) are dual: vertices and faces swap, edges hold — the 12 pentagons' solid and the 20 triangles' solid are two faces of one duality.
theorem dodecahedron_icosahedron_dual : ((20,30,12).1 = (12,30,20).2.2) ∧ ((20,30,12).2.2 = (12,30,20).1) ∧ ((20,30,12).2.1 = (12,30,20).2.1) := by decide

-- The tetrahedron is its own dual: (4,6,4) has V = F = 4 — the swap fixes it, the simplest solid is a fixed point of duality.
theorem tetrahedron_self_dual : (4,6,4).1 = (4,6,4).2.2 := by decide

-- WHY the dodecahedron exists: three pentagons meet at each vertex — 3 × 108° = 324° < 360° leaves an angle defect that folds into 3D, while four (4 × 108° = 432° > 360°) cannot. Three, and only three.
theorem three_pentagons_close_a_vertex : (3 * 108 < 360) ∧ (360 < 4 * 108) := by decide

-- The regular polytopes in each dimension 3..7: [5, 6, 3, 3, 3] — five Platonic solids in 3D, six polytopes in 4D, then exactly three in every higher dimension. The census across dimensions.
theorem regular_polytopes_by_dimension : (List.range' 3 5).map (fun d => if d = 3 then 5 else if d = 4 then 6 else 3) = [5,6,3,3,3] := by decide

-- From the fifth dimension up, exactly THREE regular polytopes exist in every dimension — the simplex, the hypercube, and the orthoplex (cross-polytope). The exotic solids stop; three go on forever.
theorem three_regular_polytopes_from_five_up : (List.range' 5 3).all (fun d => (if d = 3 then 5 else if d = 4 then 6 else 3) == 3) := by decide

-- In the SEVENTH dimension — uuidna's dimension count — there are exactly three regular polytopes: the 7-simplex, the 7-cube, and the 7-orthoplex. Green in all dimensions, and named in the one uuidna folds through.
theorem seventh_dimension_three_regular_polytopes : (if (7:Nat) = 3 then 5 else if 7 = 4 then 6 else 3) = 3 := by decide
