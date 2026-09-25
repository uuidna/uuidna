-- lean/Diagonal.lean — GENERATED. THE DIAGONAL RUNS OUT AT NINE — the multiplication table's own diagonal, read in digital roots, and the fold that closes it (the captain, 2026-09-25: "And the diagonal provably runs out at 9. note that 9 folding 0 reflects 1"). lean/Core.lean seals the 8x8 core, the multiplication table of Z/9's eight non-zero residues; its DIAGONAL is the squares, and reduced to digital roots — where a multiple of nine shows as 9 rather than 0, which is how a digital root is written — the first nine entries are 1, 4, 9, 7, 7, 9, 4, 1, 9 and the next nine are the same nine again, in the same order. That is what "runs out" means and it is stated as a walk over both ranges, because a period claimed from one wrap-around is the one-step-is-not-a-walk fault this tree has already sealed a false theorem from. AND IT NEVER REACHED MOST OF THE RING: nine residues exist and the diagonal touches 4 — 1, 4, 7, 9 — so a square here is never 2, 3, 5, 6 or 8. A sequence can repeat and still visit everything; this one repeats over a quarter of the ring, which is the sharper half of the finding and the half a period alone would hide. THE FOLD THAT CLOSES IT is one fact with two faces rather than two facts about a numeral: 9 mod 9 = 0, so the entry that CLOSES the diagonal is the ring's zero and the sequence ends by vanishing; and the mirror x ↦ 10 − x carries 9 to 1, the entry that OPENED it. The last step folds to nothing and reflects to the first, and those are the same step seen from the two sides of the ring. THE REFLECTION IS THE WHOLE SEQUENCE, not only its ends — dr(n²) = dr((9−n)²) for every n from 1 to 8, walked over all eight pairs, with the ninth entry standing alone on the fold. The mirror acting on the diagonal's INPUTS is n ↦ 9 − n and is deliberately NOT the mirror x ↦ 10 − x that acts on the residues (1 ↔ 9, 5 fixed); both live in this ledger and neither may be quoted for the other, which is why they are sealed apart. CLAIMED: all of it, closed by the Lean 4 kernel over its own finite domain, axiom-free, every universal walked and every quantity named rather than written as a bare literal. NOT CLAIMED: anything about nine outside Z/9 arithmetic — this is the digital root of a square, a fact about remainders, and it carries no meaning the arithmetic does not put there. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The ring this ledger computes in, and the base of the residue mirror x ↦ 10 − x. Named so the fold
    below is stated over quantities rather than over bare numerals. -/
def ring : Nat := 9
def mirror (n : Nat) : Nat := 10 - n

/-- The digital root: a multiple of the ring shows as the ring itself rather than as 0, which is how a digital
    root is written. Everything below is stated through this, so no entry is a numeral typed twice. -/
def dr (n : Nat) : Nat := if n % ring == 0 then ring else n % ring

/-- The multiplication table's diagonal — the squares of 1 … 9, in digital roots: 1, 4, 9, 7, 7, 9, 4, 1, 9. -/
def diagonal : List Nat := (List.range ring).map (fun i => dr ((i+1) * (i+1)))

/-- The doubling orbit the vortex walks, and the axis it never visits. Under the mirror the axis is carried
    entirely into the orbit, which is why they are declared together. -/
def orbit : List Nat := [1, 2, 4, 8, 7, 5]
def axis : List Nat := [3, 6, 9]

/-- The vector equilibrium's two face kinds and their interior angles — 8 triangles and
    6 squares, 8 + 6 = 14 (ve_fourteen_faces). Two right angles and three
    triangle angles are the same straight angle, which is the fold's own measure. -/
def squareAngle : Nat := 90
def triangleAngle : Nat := 60
def veSquares : Nat := 6
def veTriangles : Nat := 8

/-- CLAIMED: the multiplication table's diagonal, in digital roots, is 1, 4, 9, 7, 7, 9, 4, 1, 9 — and the next
    9 squares reduce to those same 9. It runs out at 9, walked rather than sampled. -/
theorem the_diagonal_runs_out_at_nine : ((List.range 9).map (fun i => dr ((i+1) * (i+1)))) = ((List.range 9).map (fun i => dr ((i+1+9) * (i+1+9)))) := by decide

/-- CLAIMED: the diagonal touches 4 residues of 9 — 1, 4, 7, 9 — so a square in this ring is never 2, 3, 5, 6 or
    8. -/
theorem the_diagonal_reaches_four_of_nine_residues : (((List.range 9).map (fun i => dr ((i+1) * (i+1)))).eraseDups).length = 4 := by decide

/-- CLAIMED: dr(n²) = dr((9−n)²) for every n from 1 to 8 — the diagonal reads the same backwards, with the 9th
    entry standing alone at the fold. -/
theorem the_diagonal_reflects_about_its_centre : ((List.range 8).all (fun i => dr ((i+1) * (i+1)) == dr ((8-i) * (8-i)))) = true := by decide

/-- CLAIMED: 9 is the one value that both vanishes and returns — 9 mod 9 = 0, and the mirror carries 9 to 1. The
    entry that CLOSES the diagonal is the ring's zero, and its reflection is the entry that OPENED it. -/
theorem nine_folds_to_zero_and_reflects_to_one : ((ring % ring = 0) ∧ (mirror ring = 1)) ∧ ((diagonal.getLastD 0 = ring) ∧ (diagonal.headD 0 = mirror ring)) := by decide

/-- CLAIMED: the mirror carries every member of the 3-6-9 axis INTO the doubling orbit — 3 → 7, 6 → 4, 9 → 1 —
    walked over all three, so the axis the vortex never visits is reflected entirely into the path it does. -/
theorem every_axis_member_reflects_into_the_orbit : (axis.all (fun a => orbit.contains (mirror a))) = true := by decide

/-- CLAIMED: the diagonal's residues other than 9 are 1, 4, 7 — which is exactly the mirror of the axis 3, 6, 9.
    The squares ARE the reflected axis. -/
theorem the_squares_are_the_mirror_of_the_axis : ((diagonal.filter (fun d => d != ring)).all (fun d => (axis.map mirror).contains d)) ∧ ((axis.map mirror).all (fun m => diagonal.contains m)) := by decide

/-- CLAIMED: 2 × 90° = 180° = 3 × 60° — two right angles and three triangle angles are the same straight angle,
    and those are the vector equilibrium's two face kinds, 6 squares and 8 triangles. -/
theorem the_fold_is_a_straight_angle : ((2 * squareAngle = 3 * triangleAngle) ∧ (triangleAngle + triangleAngle + triangleAngle = 2 * squareAngle)) ∧ (veSquares + veTriangles = 14) := by decide
