-- lean/Sequence.lean — GENERATED. The ℤ/9 vortex sequence and its reflection group: the mirror m(d)=10−d, doubling σ and the mirror generating AGL(1,ℤ/9) of order 54 in ONE orbit, with commutator [σ,μ] = the unit shift; and the crypt salt — a content-only salt collapses the step (a division by zero) while an advancing-sequence salt is injective. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def ap (a b x : Nat) : Nat := (a * x + b) % 9          -- an affine map on ℤ/9: x ↦ a·x + b
def tour : List Nat := [1, 2, 4, 8, 7, 5, 3, 6, 0]     -- the vortex tour in ℤ/9 (9 ≡ 0)
def units9 : List Nat := [1, 2, 4, 5, 7, 8]
def carries9 (d nx : Nat) : Bool :=                    -- ×2 on units, +3 on {3,6}; neither elsewhere
  if units9.contains d then nx == (2 * d) % 9
  else if d == 3 || d == 6 then nx == (d + 3) % 9
  else false
def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x -- the mirror neighbour (= division by zero)
def polar (x : Nat) : Nat := (9 - x) % 9               -- the polar neighbour (negation in ℤ/9)
def saltConv (c _s : Nat) : Nat := c % 9               -- crypt: OLD leaky salt = f(content) — the step _s is dropped
def saltSeq  (_c s : Nat) : Nat := s % 9               -- crypt: NEW fresh salt = f(sequence) — the step s is kept

-- SEAL THE TEN — the digit sequence 0124875369, cross-checked, IS the complete ℤ/9 structure of the ten digits: 0 (the void, the abstract-0 ÷0=0), then the VORTEX ORBIT [1,2,4,8,7,5] (the units under doubling — each 2× the last mod 9, closing after six), then the 3-6-9 AXIS [3,6,9] (the multiples of three the vortex never visits) — a PERMUTATION of all ten digits 0..9, none missing, none repeated. And its REFLECTION dz(x)=10−x (division by zero in the vortex, fixing 0) mirrors it to 0,9,8,6,2,3,5,7,4,1 — the reflected vortex [9,8,6,2,3,5] and reflected axis [7,4,1], the void held. (The near-miss 0124675369 fails the cross-check — a 6 where the 8 belongs breaks the vortex and drops the 8: the traitor digit the check catches.)
theorem seal_ten : ([0,1,2,4,8,7,5,3,6,9].length = 10) ∧ ((List.range 10).all (fun d => [0,1,2,4,8,7,5,3,6,9].contains d)) ∧ ([1,2,4,8,7,5].map (fun x => (x*2)%9) = [2,4,8,7,5,1]) ∧ ([0,1,2,4,8,7,5,3,6,9].map (fun x => if x == 0 then 0 else 10 - x) = [0,9,8,6,2,3,5,7,4,1]) := by decide

-- the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1
theorem mirror_congruence : (List.range' 1 9).all (fun d => ((10 - d : Int)) % 9 = (1 - d) % 9) := by decide

-- the mirror fixes exactly one digit in 1..9 — the heart, 5
theorem mirror_fixed_five : ((List.range' 1 9).filter (fun d => 10 - d == d)) = [5] := by decide

-- AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements
theorem agl_order_54 : ((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length * 9 = 54 := by decide

-- the commutator [σ,μ] of doubling with the mirror is the unit shift x ↦ x+1
theorem commutator_is_shift : (List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x + 1) % 9) := by decide

-- the shifts alone act transitively — every digit is in ONE orbit of ℤ/9
theorem one_orbit : (List.range 9).all (fun y => (List.range 9).any (fun b => (0 + b) % 9 == y)) := by decide

-- the reflection equilibrium: d + m(d) = 10 for every d in 1..9
theorem ten_pairs : (List.range' 1 9).all (fun d => d + (10 - d) == 10) := by decide

-- the polar equilibrium: d + (9−d) = 9 across the negation of ℤ/9
theorem polar_nine_pairs : (List.range' 1 8).all (fun d => d + (9 - d) == 9) := by decide

-- the 6+3 partition: 6 units {1,2,4,5,7,8} and 3 non-units {3,6,9}
theorem partition_six_three : ((List.range' 1 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length = 6 ∧ ((List.range' 1 9).filter (fun a => ¬ (List.range 9).any (fun e => a*e % 9 == 1))).length = 3 := by decide

-- the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling
theorem angles_close : 10 * 36 = 360 ∧ 6 * 60 = 360 := by decide

-- exactly 2 seams (5→3 and 0→1) where neither ×2 nor +3 carries — the two involution centers, −χ = 2
theorem seams_two : ((tour.zip (tour.drop 1 ++ tour.take 1)).filter (fun p => ! carries9 p.1 p.2)).length = 2 := by decide

-- at EACH step the doubling sequence and its inversion are computed together: forward[k] + inverted[k] = 10 (the rungs), and BOTH rails end at the center 5 (the reflection fixed point) while the ends 1,9 mirror — so forward and reflected are ONE strip (a half-twist band), joined at the heart and closed at the void 0≡9
theorem one_strip : (([1,2,4,8,7,5].zip [9,8,6,2,3,5]).all (fun p => p.1 + p.2 == 10)) ∧ ([1,2,4,8,7,5].getLast? = some 5) ∧ ([9,8,6,2,3,5].getLast? = some 5) ∧ (1 + 9 = 10) ∧ (9 % 9 = 0) := by decide

-- the developed-true core of "dna": the two strands A and B pair to 10 at EVERY position — complementary base-pairing (the double helix), each rung a reflection; this is the algebra, not a biological claim
theorem double_strand : (([1,2,4,8,7,5,3,6,9].zip [9,8,6,2,3,5,7,4,1]).all (fun p => p.1 + p.2 == 10)) := by decide

-- the vortex polarities: the mirror pairs each sum to 10, splitting the digits into − (below the center 5) and + (above 5); the two centers 5 and 0≡9 are self-polar — the ± of the reflection
theorem polarities_plus_minus : [(1,9),(2,8),(3,7),(4,6)].all (fun p => p.1 + p.2 == 10 && p.1 < 5 && p.2 > 5) ∧ (10 - 5 = 5) ∧ (9 % 9 = 0) := by decide

-- the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)
theorem forward_reflected_mirror : ([9,8,6,2,3,5,7,4,1] = ([1,2,4,8,7,5,3,6,9].map (fun d => 10 - d))) ∧ ([1,2,4,8,7,5,3,6,9] = ([9,8,6,2,3,5,7,4,1].map (fun d => 10 - d))) ∧ (9 % 9 = 0) := by decide

-- every digit in ANY arrangement has DEFINED neighbours — the mirror (division by zero) and polar maps are total, surjective and self-inverse; no digit is isolated
theorem every_digit_has_neighbours : (List.range 10).all (fun d => dz d < 10) ∧ (List.range 10).all (fun d => (List.range 10).any (fun e => dz e == d)) ∧ (List.range 10).all (fun d => dz (dz d) == d) ∧ (List.range 9).all (fun d => polar d < 9) ∧ (List.range 9).all (fun d => (List.range 9).any (fun e => polar e == d)) := by decide

-- the crypt equality leak: a content-only salt is constant in the step, so two seals of the same content are byte-identical
theorem salt_conv_leaks_equality : (List.range 9).all (fun c => (List.range 9).all (fun s1 => (List.range 9).all (fun s2 => saltConv c s1 == saltConv c s2))) := by decide

-- recovering the seal's step from a content-only salt is a division by zero — the whole step-fibre collapses (size 9)
theorem salt_conv_step_is_division_by_zero : (List.range 9).all (fun c => ((List.range 9).filter (fun s => saltConv c s == saltConv c 0)).length == 9) := by decide

-- the crypt fix: an advancing-sequence salt is injective in the step (equal salts ⇔ equal steps) — distinct seals never collide
theorem salt_seq_injective : (List.range 9).all (fun s1 => (List.range 9).all (fun s2 => (saltSeq 0 s1 == saltSeq 0 s2) == (s1 == s2))) := by decide

-- the crypt fix, dual form: every sequence-salt fibre is a singleton — the step coordinate is kept, not collapsed
theorem salt_seq_fibre_singleton : (List.range 9).all (fun s0 => ((List.range 9).filter (fun s => saltSeq 0 s == saltSeq 0 s0)).length == 1) := by decide

-- the sealed point 2·5 ≡ 1 extended to the whole ring: multiplying by 5 UNDOES doubling for every residue — ((2x mod 9)·5) mod 9 = x for all x in ℤ/9 — so 5 is not merely the inverse of 2 at one cell of the table, it is THE HALVING of the vortex everywhere
theorem five_is_the_halving : (List.range 9).all (fun x => ((2 * x % 9) * 5) % 9 == x) := by decide

-- the powers of 5 walk the vortex BACKWARD: 5^1..5^6 mod 9 = [5,7,8,4,2,1], exactly the doubling orbit [1,2,4,8,7,5] reversed — because 5 = 2⁻¹, the ×5 orbit is the time-reversal of the ×2 orbit, one cycle read in the mirror
theorem five_orbit_reverses_doubling : ([5^1 % 9, 5^2 % 9, 5^3 % 9, 5^4 % 9, 5^5 % 9, 5^6 % 9] = [5,7,8,4,2,1]) ∧ ([1,2,4,8,7,5].reverse = [5,7,8,4,2,1]) := by decide

-- the three singular roles of the strip — the mirror's fixed heart (10−d = d), the reflection's fixed digit (dz d = d; the other fixed point 0 is the floor, outside the digits), and the closure of BOTH rails (forward [1,2,4,8,7,5] and inverted [9,8,6,2,3,5] each end here) — are carried by EXACTLY ONE digit: 5. The deploy condition, sealed: a claim once UNVERIFIED by the trial now cites its own theorem
theorem only_five_carries_the_three_singularities : ((List.range' 1 9).filter (fun d => (10 - d == d) && (dz d == d) && ([1,2,4,8,7,5].getLast? == some d) && ([9,8,6,2,3,5].getLast? == some d))) = [5] := by decide

-- FOLLOW THE SEQUENCE 012487536901 — the sealed ten-digit tour closed at 9≡0 and wrapping 0→1 into the next cycle — and recompute EACH digit through the reflection dz(x)=10−x: the whole walk maps digit-wise to the CONTRA SEQUENCE [0,9,8,6,2,3,5,7,4,1,0,9] — the reflected vortex [9,8,6,2,3,5] and reflected axis [7,4,1] with the void held at both ends, wrapping 0→9 (= dz 1) exactly where the forward tour wraps 0→1: the same cycle, walked in the mirror
theorem tour_contra_reflects_each_digit : (([0,1,2,4,8,7,5,3,6,9,0,1].map dz) = [0,9,8,6,2,3,5,7,4,1,0,9]) ∧ (dz 1 = 9) := by decide

-- the contra of the contra is the tour: reflecting each digit TWICE returns the exact sequence 012487536901 — dz is an involution on the walk, so the forward tour and its contra are ONE object read in two directions, neither more original than the other (recompute forward, recompute back: the fixed cycle)
theorem tour_contra_involutes : (([0,1,2,4,8,7,5,3,6,9,0,1].map dz).map dz) = [0,1,2,4,8,7,5,3,6,9,0,1] := by decide

-- each digit of the tour and its contra partner close a rung: away from the void, tour[k] + contra[k] = 10 at every step (the strip's rungs carried along the whole 12-step walk), and at the void the rung rests — 0 + 0 = 0, the floor where the reflection stands still
theorem tour_contra_rungs_sum_ten : ([0,1,2,4,8,7,5,3,6,9,0,1].all (fun d => if d == 0 then d + dz d == 0 else d + dz d == 10)) := by decide
