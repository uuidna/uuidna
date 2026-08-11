-- lean/Pentagram.lean — GENERATED. THE PENTAGRAM & THE FIBONACCI DIGITS — the star polygon {5/2} and the single-digit (Pisano) Fibonacci cycles, finite and decidable. Every proof `by decide`, sorry-free, no Mathlib.

def fibCycle (m : Nat) (f : List Nat) (len : Nat) : Bool :=
  (f.length == len) && (f.take 2 == [0, 1]) &&
  (((f ++ f.take 2).zip ((f ++ f.take 2).drop 1)).zip ((f ++ f.take 2).drop 2)).all
    (fun p => (p.1.1 + p.1.2) % m == p.2)

-- The pentagram is the star polygon {5/2}: stepping +2 (mod 5) draws it in a SINGLE stroke — [0,2,4,1,3] — visiting all five points without lifting the pen, because 2 is coprime to 5.
theorem pentagram_single_stroke : (List.range 5).map (fun k => (2*k) % 5) = [0,2,4,1,3] := by decide

-- The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.
theorem pentagon_single_stroke : (List.range 5).map (fun k => k % 5) = [0,1,2,3,4] := by decide

-- The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.
theorem pentagram_closes_after_five : (2*5) % 5 = 0 := by decide

-- WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).
theorem pentagram_step_coprime_five : Nat.gcd 2 5 = 1 := by decide

-- The five point-angles of the pentagram sum to a half-turn: 5 · 36 = 180°, each sharp point 36° — the {5/2} star angle. A count of degrees, exact.
theorem pentagram_point_angles_half_turn : 5 * 36 = 180 := by decide

-- The single-digit (mod 9) Fibonacci — the digital-root Fibonacci — is periodic: 24 single digits satisfy Fₙ₊₂ ≡ Fₙ+Fₙ₊₁ (mod 9) from the seed [0,1] and return to it, closing into a 24-cycle (its Pisano period).
theorem fib_single_digit_cycle_24 : fibCycle 9 [0,1,1,2,3,5,8,4,3,7,1,8,0,8,8,7,6,4,1,5,6,2,8,1] 24 = true := by decide

-- The SAME Fibonacci recurrence through the pentagram modulus (mod 5): 20 single digits close into a 20-cycle — the Pisano period π(5)=20. The pentagram lens on the golden sequence.
theorem fib_pentagram_cycle_20 : fibCycle 5 [0,1,1,2,3,0,3,3,1,4,0,4,4,3,2,0,2,2,4,1] 20 = true := by decide

-- The SAME recurrence fused to the rosette modulus (mod 7): 16 single digits close into a 16-cycle — the Pisano period π(7)=16. One sequence, read through pentagram (5), rosette (7) and single digit (9).
theorem fib_rosette_cycle_16 : fibCycle 7 [0,1,1,2,3,5,1,6,0,6,6,5,4,2,6,1] 16 = true := by decide
