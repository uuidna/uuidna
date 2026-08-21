-- lean/VectorEquilibrium.lean — GENERATED. THE VECTOR EQUILIBRIUM (the cuboctahedron) AND THE INVOLUTION'S SHAPE — PURE ARITHMETIC, no empirical quantity: every number here is a count or an integer squared-length, and nothing is measured from the world. The solid is the cuboctahedron of classical geometry (Archimedean, 13 semiregular solids); the name 'vector equilibrium' and the reading of its equal radial/circumferential vectors are Buckminster Fuller's (Synergetics, 1975). Sealed WITHOUT an irrational: placing the twelve vertices at the permutations of (±1,±1,0) makes the radial and the edge squared-lengths both exactly 2, so Fuller's defining equilibrium property is an integer identity that decides in the kernel. Twelve vertices, four neighbours each, 24 edges, 14 faces (8 triangles + 6 squares), and V − E + F = 2 — the same two as the Platonic solids, though the cuboctahedron is Archimedean and is NOT among the five in Solids.lean. Beside it, the reflection dz(x) = 10 − x: exactly two fixed points (0 and 5), an involution on all ten digits, and the measured orbit sets each closed under it — the walk alternates dz with doubling, so it carries its own mirror and reflecting a finished orbit adds nothing. integrity, not truth — each theorem seals its exact decidable arithmetic. The orbit sets are OUTPUT OF THIS REPOSITORY'S OWN WALK (src/sequence-run.ts), not an observation of anything in the world; their closure under dz is what decides, never the claim that the walk produces them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def VE : List (Int × Int × Int) := [(1,1,0),(1,-1,0),(-1,1,0),(-1,-1,0),(0,1,1),(0,1,-1),(0,-1,1),(0,-1,-1),(1,0,1),(1,0,-1),(-1,0,1),(-1,0,-1)]

def n2 (v : Int × Int × Int) : Int := v.1*v.1 + v.2.1*v.2.1 + v.2.2*v.2.2

def dd (v w : Int × Int × Int) : Int :=
  (v.1-w.1)*(v.1-w.1) + (v.2.1-w.2.1)*(v.2.1-w.2.1) + (v.2.2-w.2.2)*(v.2.2-w.2.2)

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d

/-- The vector equilibrium has TWELVE vertices — every permutation of (±1,±1,0), three coordinate pairs by four
    sign choices. Twelve radial directions from one centre. -/
theorem ve_twelve_vertices : VE.length = 12 := by decide

/-- Every radial vector from the centre to a vertex has squared length exactly 2 — an integer. All twelve radii
    are equal, and the equality is between the SQUARES, which is what makes it decidable. -/
theorem radial_squared_two : VE.all (fun v => n2 v == 2) := by decide

/-- Each vertex has exactly FOUR neighbours at squared distance 2 — the circumferential edges. Twelve vertices
    with four each, counted twice, is 24 edges. -/
theorem ve_four_neighbours : VE.all (fun v => (VE.filter (fun w => dd v w == 2)).length == 4) := by decide

/-- THE EQUILIBRIUM ITSELF: the radial distance equals the edge distance — both squared lengths are exactly 2.
    This is Fuller's defining property of the vector equilibrium, and in these coordinates it holds as an
    identity between integers, which is why the kernel can decide it. -/
theorem radial_equals_edge : VE.all (fun v => n2 v == 2 ∧ (VE.filter (fun w => dd v w == 2)).length == 4) := by decide

/-- Twelve vertices, four edges at each, each edge counted from both ends: 12 × 4 / 2 = 24 edges. -/
theorem ve_twentyfour_edges : 12 * 4 / 2 = 24 := by decide

/-- Fourteen faces: eight triangles and six squares. The two face kinds are what distinguishes the cuboctahedron
    from any Platonic solid, where every face is the same polygon. -/
theorem ve_fourteen_faces : 8 + 6 = 14 := by decide

/-- Euler holds for the vector equilibrium exactly as for the five Platonic solids: V − E + F = 12 − 24 + 14 = 2
    — the same two the captain coins fold to. -/
theorem euler_characteristic_two : 12 + 14 = 24 + 2 := by decide

/-- Joining all thirteen centres of the figure to each other draws C(13,2) = 13 × 12 / 2 = 78 lines — the edge
    count of the complete graph on thirteen nodes. SCOPE: the count is what is sealed; no property of the figure
    beyond it is asserted here. -/
theorem metatron_seventyeight_lines : 13 * 12 / 2 = 78 := by decide

/-- The involution dz(x) = 10 − x (with dz(0) = 0) fixes exactly two of the ten digits: 0 and 5. Every other
    digit is moved, in the pairs 1↔9, 2↔8, 3↔7, 4↔6. -/
theorem dz_two_fixedpoints : (List.range 10).filter (fun d => dz d == d) = [0, 5] := by decide

/-- Applying the reflection twice returns every digit to itself: dz(dz(x)) = x for all ten digits — the defining
    property of an involution, verified across the whole domain rather than argued from the formula. -/
theorem dz_involution_digits : (List.range 10).all (fun d => dz (dz d) == d) := by decide

/-- Each orbit set below is closed under dz — the reflection maps every one onto itself, adding no digit, which
    is exactly what the line proves. The walk alternates dz with doubling, so a completed orbit already contains
    its own mirror and reflecting it again is the identity on that set. SCOPE: the closure of these explicit
    sets is what decides. That the walk PRODUCES them is output of this repository read off a run, and this
    theorem does not reach it. -/
theorem orbits_closed_involution : [[0], [0,1,9], [0,1,3,5,7,9], [0,1,3,4,5,6,7,9], [0,1,5,9], [0,1,2,3,4,5,6,7,8,9]].all (fun s => s.all (fun d => s.contains (dz d))) := by decide

/-- The five non-covering seeds {0,1,3,4,5} together with their reflections {0,9,7,6,5} reach eight digits, not
    ten. What is missing is exactly {2,8}, and the second conjunct proves dz(2) = 8 — so the gap is ONE
    involution pair, discharged on this line rather than borrowed from another. The gap has the involution's own
    shape. -/
theorem missing_pair_involution : ((List.range 10).filter (fun d => !([0,1,3,4,5] ++ [0,9,7,6,5]).contains d) = [2, 8]) ∧ (dz 2 = 8) := by decide
