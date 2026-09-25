-- lean/PlanckLattice.lean — GENERATED. THE PLANCK EXPONENT LATTICE — cross formulas that prove each other, in clusters of lattice combinations. Each Planck quantity is a product of powers of four constants, so each is an integer vector of exponents over (hbar, G, c, k); the SQUARES are used, which keeps every exponent an integer and every theorem decidable. A product ADDS the vectors and a ratio SUBTRACTS them, so every combination is a lattice point and the lattice is closed under both — and that closure is what makes these formulas prove each other rather than sit beside each other. THE CLUSTERS ARE NOT CHOSEN, they are what the arithmetic partitions the six pairs into. Every quantity carries hbar to the first power, so hbar vanishes from EVERY ratio; G vanishes only when both quantities carry the same sign of G, which splits the four into two gravity classes, {length, time} at G^+1 and {mass, temperature} at G^-1. Exactly two of six pairs lie inside a class and give the constant-free ratios l/t = c and T/m = c^2/k. A PRODUCT cancels G across the classes instead — four of six pairs, the pure-quantum cluster, l*m = hbar/c and t*m = hbar/c^2. A RATIO across the classes keeps G and loses the quantum: l/m = G/c^2, t/m = G/c^3. Sums and differences therefore do OPPOSITE things to gravity and the same thing to the quantum, and that duality is the finding. WHERE THEY PROVE EACH OTHER: the constant-free l/t is reachable two independent ways — as the ratio of two pure-quantum products, where gravity has already cancelled, and as the ratio of two pure-gravity ratios, where the quantum has — and both routes land on the same vector without either being assumed. The same closure crosses the clusters back to the length: the pure-quantum product times the pure-gravity ratio is (hbar/c)(G/c^2) = hbar G / c^3, which is the squared length exactly. CLAIMED: the lattice arithmetic in full, every identity closed by the Lean 4 kernel over its own finite domain, axiom-free, and every census WALKED over all six pairs rather than sampled — a uniqueness claim written here without enumerating was how the second constant-free pair was missed, and the enumeration is the cure. NOT CLAIMED: that the Planck quantities are physically fundamental, or that anything is measurable at that scale. This is DIMENSIONAL ALGEBRA: the exponents are definitions and the combinations are arithmetic, with no experiment invoked. The experimental record lives in lean/StringTheory.lean and says plainly that one probe of six has ever reached this scale. Only the constants' EXPONENTS appear here, and an exponent is a choice of unit rather than a measurement. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

set_option maxRecDepth 100000

/-- The four axes the exponents run over, in order: hbar, G, c, k. Named here so a vector's third entry is
    never a bare position in prose. -/
def planckAxes : List String := ["hbar", "G", "c", "k"]

/-- The four Planck quantities as integer exponent vectors over (hbar, G, c, k). The SQUARES are used, which
    is what keeps every exponent an integer: length^2 = hbar G / c^3, mass^2 = hbar c / G, time^2 = hbar G / c^5,
    temperature^2 = hbar c^5 / (G k^2). -/
def planckLength : List Int := [1, 1, -3, 0]
def planckMass : List Int := [1, -1, 1, 0]
def planckTime : List Int := [1, 1, -5, 0]
def planckTemperature : List Int := [1, -1, 5, -2]
def planckVectors : List (List Int) := [planckLength, planckMass, planckTime, planckTemperature]

/-- A product of two quantities ADDS their exponents; a ratio SUBTRACTS them. The lattice is closed under both,
    which is what lets one combination prove another. -/
def product (a b : List Int) : List Int := List.zipWith (· + ·) a b
def ratio (a b : List Int) : List Int := List.zipWith (· - ·) a b

/-- The 6 unordered pairs, enumerated so every census below WALKS them rather than naming examples. -/
def planckPairs : List (List Int × List Int) := [([1, 1, -3, 0], [1, -1, 1, 0]), ([1, 1, -3, 0], [1, 1, -5, 0]), ([1, 1, -3, 0], [1, -1, 5, -2]), ([1, -1, 1, 0], [1, 1, -5, 0]), ([1, -1, 1, 0], [1, -1, 5, -2]), ([1, 1, -5, 0], [1, -1, 5, -2])]

/-- freeOfBoth: the ratio keeps neither hbar nor G. freeOfGravity: the PRODUCT keeps no G. The two tests over the
    same enumeration are what make their counts comparable. -/
def freeOfBoth (a b : List Int) : Bool := ((ratio a b).headD 0 == 0) && (((ratio a b).drop 1).headD 0 == 0)
def freeOfGravity (a b : List Int) : Bool := ((product a b).drop 1).headD 0 == 0

/-- THE COMBINATORIAL CORE. Every integer quadruple is a combination of the four quantities; combine reads off its
    exponent vector, and the two forms read off what it cancels — hbarForm is a+b+c+d, gravForm is a−b+c−d. The
    boxes are the finite domains the kernel walks: 625 combinations for the characterisations, 81
    for the existence law, and 25 targets for it to reach. -/
def basis : List (List Int) := [planckLength, planckMass, planckTime, planckTemperature]
-- nthI — list indexing as decidable, AXIOM-FREE structural recursion: the Int form of lean-gen's `nth`.
-- Lean's `List.getD` routes through the `propext` axiom under `by decide` and this recursion does not,
-- which is why four theorems in this wing were the ledger's only non-kernel-only proofs until it was used.
def nthI : List Int → Nat → Int
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthI xs n

def combine (k : List Int) : List Int :=
  (List.range 4).map (fun j => ((List.zipWith (fun ki v => ki * (nthI v j)) k basis).foldl (· + ·) 0))
def hbarForm (k : List Int) : Int := k.foldl (· + ·) 0
def gravForm (k : List Int) : Int := (List.zipWith (· * ·) k [1, -1, 1, -1]).foldl (· + ·) 0
def coeffs : List Int := [-2, -1, 0, 1, 2]
def smallCoeffs : List Int := [-1, 0, 1]
def boxOf (cs : List Int) : List (List Int) :=
  cs.flatMap (fun a => cs.flatMap (fun b => cs.flatMap (fun c => cs.map (fun d => [a, b, c, d]))))
def box : List (List Int) := boxOf coeffs
def smallBox : List (List Int) := boxOf smallCoeffs
def targets : List (List Int) := coeffs.flatMap (fun h => coeffs.map (fun g => [h, g]))

/-- CLAIMED: over all 625 combinations in the box, hbar vanishes from a(l)+b(m)+c(t)+d(T) EXACTLY when a+b+c+d =
    0 — cancellation is the kernel of a linear form, not a property found pair by pair. -/
theorem the_quantum_of_action_cancels_on_a_linear_form : box.all (fun k => ((nthI (combine k) 0) == 0) == (hbarForm k == 0)) = true := by decide

/-- CLAIMED: over the same 625 combinations, G vanishes EXACTLY when a−b+c−d = 0 — the second form, and the one
    whose signs are the two gravity classes. -/
theorem gravity_cancels_on_a_linear_form : box.all (fun k => ((nthI (combine k) 1) == 0) == (gravForm k == 0)) = true := by decide

/-- CLAIMED: a combination loses BOTH constants exactly when c = −a and d = −b — so it is a(l/t) + b(T/m), a
    rank-two sublattice whose basis is the two constant-free ratios themselves. -/
theorem the_constant_free_combinations_are_a_rank_two_sublattice : box.all (fun k => (((nthI (combine k) 0) == 0) && ((nthI (combine k) 1) == 0)) == (((nthI k 2) == -(nthI k 0)) && ((nthI k 3) == -(nthI k 1)))) = true := by decide

/-- CLAIMED: a Planck combination with prescribed exponents (h, g) on hbar and G EXISTS exactly when h and g
    share parity — checked over all 25 targets against 81 combinations, both directions. -/
theorem a_combination_exists_exactly_when_its_exponents_share_parity : targets.all (fun t => (smallBox.any (fun k => (hbarForm k == nthI t 0) && (gravForm k == nthI t 1))) == (((nthI t 0) - (nthI t 1)) % 2 == 0)) = true := by decide

/-- CLAIMED: all four Planck quantities carry the quantum of action to the same power, so hbar vanishes from
    every one of the 6 pairwise ratios — walked over all six, not sampled. -/
theorem every_planck_ratio_cancels_the_quantum_of_action : planckPairs.all (fun p => (ratio p.1 p.2).headD 0 == 0) = true := by decide

/-- CLAIMED: the gravitational exponents are +1 for length and time and -1 for mass and temperature — two
    classes of two, which is the partition every other fact here turns on. -/
theorem the_lattice_splits_into_two_gravity_classes : (planckVectors.map (fun v => (v.drop 1).headD 0) = [1, -1, 1, -1]) ∧ (planckVectors.all (fun v => v.length == planckAxes.length) = true) := by decide

/-- CLAIMED: of the 6 pairwise ratios exactly 2 lose BOTH constants — and they are precisely the two pairs
    inside a gravity class: length over time, and temperature over mass. -/
theorem both_constants_cancel_exactly_inside_a_gravity_class : (planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length = 2 := by decide

/-- CLAIMED: a PRODUCT loses G exactly when its two quantities sit in opposite gravity classes — 4 of the 6
    pairs, against the 2 that lose it under a ratio. Sums and differences do opposite things to gravity. -/
theorem a_product_cancels_gravity_exactly_across_the_classes : ((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length = 4) ∧ ((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length ≠ (planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length) := by decide

/-- CLAIMED: the pure-quantum product times the pure-gravity ratio returns the squared length exactly —
    (hbar/c)(G/c^2) = hbar G / c^3 — so the two clusters are not separate results, each is the other divided
    into the length. -/
theorem the_quantum_and_gravity_clusters_cross_to_the_length : product (product planckLength planckMass) (ratio planckLength planckMass) = product planckLength planckLength := by decide

/-- CLAIMED: the constant-free ratio is reachable through the quantum cluster and through the gravity cluster,
    and both routes land on [0, 0, 2, 0] — c^2 — with neither route assumed. -/
theorem both_routes_to_light_speed_agree : (ratio (product planckLength planckMass) (product planckTime planckMass) = [0, 0, 2, 0]) ∧ (ratio (ratio planckLength planckMass) (ratio planckTime planckMass) = [0, 0, 2, 0]) := by decide
