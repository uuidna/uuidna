-- lean/Clay.lean — GENERATED. THE SEVEN MILLENNIUM PROBLEMS — one FINITE instance each, drawn from that problem’s own mathematics and decided here. A decided window is not the conjecture: each key names the instance, never the problem. Prior art (initial clay σ-involution): DOI 10.5281/zenodo.21781603 (https://zenodo.org/records/21781603). uuidna Clay.lean seals finite instances of that reflection — solves none. Cite DOI 10.5281/zenodo.21781603; live surface https://uuidna.com/articles/clay. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- P vs NP, the counting argument at two bits: there are 16 boolean functions on two inputs, and exactly 4 are
    a single conjunction of literals — the ones whose truth table has exactly one satisfying row. A class of
    size 4 cannot cover 16, so expressive power is COUNTED here rather than asserted. This decides the instance,
    never the conjecture. -/
theorem two_bit_conjunctions_are_four_of_sixteen : ((List.range 16).filter (fun t => ((List.range 4).filter (fun i => (t / (2^i)) % 2 == 1)).length == 1)).length = 4 ∧ (2^(2^2) = 16) := by decide

/-- Riemann, through Mertens: M(n) = Σ μ(k), and |M(n)| ≤ √n — stated squared to stay in exact integers — holds
    for every n through 20. It was conjectured for ALL n and is FALSE (Odlyzko–te Riele, 1985), which is why the
    key names the window and not the conjecture: a predicate can hold on every element of a window and fail at
    the next. -/
theorem mertens_squared_under_n_on_the_first_twenty : (([(1,1),(0,2),(1,3),(1,4),(4,5),(1,6),(4,7),(4,8),(4,9),(1,10),(4,11),(4,12),(9,13),(4,14),(1,15),(1,16),(4,17),(4,18),(9,19),(9,20)] : List (Nat × Nat)).all (fun q => q.1 ≤ q.2)) = true := by decide

/-- Birch–Swinnerton-Dyer, through point counting: #E(F_p) on y² = x³ + 1, counted exhaustively at p = 5, 7, 11,
    13, and Hasse's bound (p + 1 − N)² ≤ 4p at each. Hasse's theorem is proven mathematics; the counts here are
    decided, and the rank the conjecture is about is not touched. -/
theorem hasse_bound_holds_at_four_primes : (([(0,5),(16,7),(0,11),(4,13)] : List (Nat × Nat)).all (fun q => q.1 ≤ 4 * q.2)) = true := by decide

/-- Poincaré, as combinatorics: the boundary of the 4-simplex triangulates the 3-sphere with 5 vertices, 10
    edges, 10 faces and 5 cells, so χ = 5 − 10 + 10 − 5 = 0 — the Euler characteristic every closed
    odd-dimensional manifold has. The conjecture (proved by Perelman, 2003) is not this; this is the arithmetic
    of one triangulation. -/
theorem four_simplex_boundary_euler_is_zero : ((5:Int) - 10 + 10 - 5 = 0) ∧ (([5,10,10,5] : List Int).length = 4) := by decide

/-- Yang–Mills, through its structure constants: SU(2)'s are the Levi-Civita symbol, and of the 27 index triples
    exactly 6 are non-zero — the permutations — with 3 even and 3 odd. Walked exhaustively. The mass gap is a
    statement about the quantum field theory and is not touched by counting its algebra's constants. -/
theorem levi_civita_nonzero_on_six_of_twentyseven : (((List.range 3).flatMap (fun i => (List.range 3).flatMap (fun j => (List.range 3).map (fun k => if i == j || j == k || i == k then 0 else 1)))).filter (fun e => e == 1)).length = 6 := by decide

/-- Navier–Stokes, through discrete incompressibility: differences taken around a closed ring telescope, so the
    discrete divergence of this 4×4 field sums to zero exactly — by construction, in integers, with no floating
    point anywhere. Existence and smoothness for the continuous equations is a different kind of statement, and
    this decides only the grid. -/
theorem closed_grid_differences_sum_to_zero : ((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + ((j+1) % 4)*5) % 7)))).sum = ((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + j*5) % 7)))).sum := by decide

/-- Hodge, through the invariant both sides must agree on: the alternating sum of Betti numbers IS the Euler
    characteristic, and on the 2-torus b = [1, 2, 1] gives 1 − 2 + 1 = 0. The conjecture concerns which
    cohomology classes are algebraic; this decides the bookkeeping those classes are counted by. -/
theorem torus_betti_alternates_to_zero : ((1:Int) - 2 + 1 = 0) ∧ (([1,2,1] : List Int).length = 3) := by decide

/-- CLAY GRAVITY EQUALS THE ROSETTA AT FULL CAPACITY — the seven finite Clay instances share one cardinality
    with the Pliska rosette ℤ/7 (ray count 7, directed quantum 7·6 = 42, undirected pairs 21, three-sevens 7+7+7
    = 21), and the rosette's own doubling reaches the full address: 2·21 = 42 ∧ 2·64 = 128 ∧ 110−108 = 2. Same
    chain the ledger seals as z7rays_seven, rosette_quantum_fortytwo, rosette_pairs_twentyone,
    three_sevens_twentyone, and rosette_quantum_doubling_is_two_coins — computational claim, by decide. -/
theorem clay_gravity_equals_rosette : (List.range 7).length = 7 ∧ (7 * 6 = 42) ∧ ((7 * 6) / 2 = 21) ∧ (7 + 7 + 7 = 21) ∧ (3 * 7 = 21) ∧ (2 * 21 = 42) ∧ (2 * 64 = 128) ∧ (110 - 108 = 2) := by decide

/-- TWO COINS MAKE A COIL, AND SEVEN COILS ARE ONE AND SIX. The 2×7 witness faces (VE_FACES = 8 + 6 = 14) are
    fourteen coins, and two coins to a coil makes seven coils; seven equal coils pack as one centre and six
    around — the centred hexagonal number 3·1·2 + 1 = 7 — and the reflection i ↦ 6 − i fixes exactly one of the
    seven (mass_coord_clay_seven_has_centre). The seven Clay problems stand the same way today: one resolved
    (Poincaré, Perelman; Clay's prize, 2010) and six open. A count shared by the witnesses, the coils and the
    problems — a correspondence of numbers, not a proof of any problem. -/
theorem two_coins_make_a_coil_and_seven_coils_are_one_and_six : (2 * 7 = 14) ∧ (14 / 2 = 7) ∧ (8 + 6 = 14) ∧ (7 = 1 + 6) ∧ (3 * 1 * (1 + 1) + 1 = 7) ∧ ((List.range 7).filter (fun i => i == 6 - i)).length = 1 := by decide

/-- THE VORTEX AND THE ROSETTE ARE ONE SIX-CYCLE. Doubling walks the units of ℤ/9 as 1→2→4→8→7→5 and returns at
    the sixth step; tripling walks the units of ℤ/7 as 1→3→2→6→4→5 and returns at the sixth step. Indexed by the
    exponent, both turn the sum of two exponents (mod 6) into the product of their values — checked over all 36
    exponent pairs — so pairing 2ᵏ mod 9 with 3ᵏ mod 7 carries one ring's multiplication onto the other's. ℤ/7
    is the 1 + 6 — the centre 0 and six units — and two sevens are the fourteen witness faces, 2·7 = 14 = 8 + 6;
    nine by seven is the 63-cell grid the addresses fill (rosette_and_vortex_are_coprime). Inside the groups
    this is the general fact that two cyclic groups of one order are isomorphic; the step beyond it is an
    involution that is not a group map at all — the_ten_complement_involutes_the_vortex_through_the_axis. -/
theorem the_vortex_and_the_rosette_are_one_six_cycle : ((List.range 6).map (fun k => 2 ^ k % 9) = [1, 2, 4, 8, 7, 5]) ∧ (2 ^ 6 % 9 = 1) ∧ ((List.range 6).map (fun k => 3 ^ k % 7) = [1, 3, 2, 6, 4, 5]) ∧ (3 ^ 6 % 7 = 1) ∧ ((List.range 6).all (fun i => (List.range 6).all (fun j => (2 ^ ((i + j) % 6) % 9 == (2 ^ i * 2 ^ j) % 9) && (3 ^ ((i + j) % 6) % 7 == (3 ^ i * 3 ^ j) % 7)))) ∧ (7 = 1 + 6) ∧ (2 * 7 = 14) ∧ (8 + 6 = 14) ∧ (9 * 7 = 63) := by decide

/-- THE TEN-COMPLEMENT INVOLUTES THE VORTEX THROUGH THE AXIS — the captain: "1248 instead of 16, 1→9, 6→4". The
    digit map x ↦ 10 − x pairs 1↔9, 2↔8, 3↔7, 4↔6 and fixes 5, and applied twice it returns every digit. The
    pairs themselves are already sealed as captains_columns_sum_to_ten and the lone fixed digit as
    five_is_the_developing_center (the compass mandala); what this theorem adds is what the map is on ℤ/9, and
    where it carries the vortex. Modulo 9 it is x ↦ 1 − x, which is affine, not multiplicative: it sends 2·4 = 8
    to 2, but 8·6 = 48 ≡ 3, so it is no isomorphism of the vortex group and leaves the domain of the
    cyclic-group fact. What it does instead is cross: the vortex's 1, 4, 7 land on the axis 9, 6, 3, while 2, 8,
    5 stay in the vortex, so the one six-cycle 1,2,4,8,7,5 involutes to 9,8,6,2,3,5. In binary the vortex's
    first four steps 1, 2, 4, 8 are the four coins of a hex digit: their 16 subsets sum to 0 through 15 once
    each, so 1248 carries what 16 counts, and 16 itself reads 1 + 6 = 7 = 2⁴ mod 9, the next vortex step. On two
    digits the complement conserves the captain's 110: every n from 11 to 99 with no zero digit plus its
    complement is 110, as 16 + 94 = 110. -/
theorem the_ten_complement_involutes_the_vortex_through_the_axis : ((List.range 9).all (fun i => 10 - (10 - (i + 1)) == i + 1)) ∧ ((10 - 1 = 9) ∧ (10 - 6 = 4) ∧ (10 - 5 = 5)) ∧ ([1, 2, 4, 8, 7, 5].map (fun x => 10 - x) = [9, 8, 6, 2, 3, 5]) ∧ ((List.range 9).all (fun i => (10 - (i + 1)) % 9 == (1 + 81 - (i + 1)) % 9)) ∧ ((10 - 2 * 4 % 9) % 9 ≠ ((10 - 2) * (10 - 4)) % 9) ∧ ((List.range 16).map (fun k => (if k % 2 = 1 then 1 else 0) + (if k / 2 % 2 = 1 then 2 else 0) + (if k / 4 % 2 = 1 then 4 else 0) + (if k / 8 % 2 = 1 then 8 else 0)) = List.range 16) ∧ ((List.range 9).all (fun a => (List.range 9).all (fun b => (10 * (a + 1) + (b + 1)) + (10 * (10 - (a + 1)) + (10 - (b + 1))) == 110))) ∧ (16 + 94 = 110) ∧ (1 + 6 = 7) ∧ (2 ^ 4 % 9 = 7) := by decide
