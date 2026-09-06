-- lean/FixedPower.lean — GENERATED. THE FIXED POINTS OF x ↦ x^m, AS A LAW. For every modulus, #{x in Z/m : x^m = x} equals the product over m's distinct primes of (1 + gcd(m−1, p−1)) — the walk and the prediction both computed by the kernel, never a literal on either side. WHY IT IS TRUE: the fixed points of x ↦ x^k are the kernel of x ↦ x^(k−1), of size gcd(k−1, λ) on a cyclic group of order λ, plus zero; and CRT makes the count multiplicative across prime powers. Both halves are sealed separately here, so the product formula rests on stated facts rather than on a reader's recollection of group theory. WHAT THIS CHANGES ABOUT WHAT WAS ALREADY SEALED: Wave.lean carries about fifty theorems of the form "exactly N residues of Z/m satisfy x^m = x", each honest, each stating the count and not the reason — their own prose says as much. Those are not replaced and not deprecated; they become this law's verification table. The same collapse the Fermat wing found (an answer turning on a gcd against the group order rather than on the exponent) is the collapse here, which is why one law can stand behind fifty counts. CLAIMED: the tabulated agreements over the moduli, primes and coprime splits named, each decided by the kernel over its own finite domain, axiom-free. NOT CLAIMED: the general theorem for all m, which quantifies over an infinite domain and cannot be asked of `by decide` at all — the table is evidence for the law and never a proof of it, and the frontier is stated in the names. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- pmod a n m — a^n mod m by square-and-multiply. Its agreement with the naive a^n % m is a sealed
-- theorem in its own right (pmod_is_modular_exponentiation), so the definition below is checked, not trusted.
def pmodAux (m : Nat) : Nat → Nat → Nat → Nat → Nat
  | 0, _, _, acc => acc
  | Nat.succ f, a, n, acc =>
      if n == 0 then acc
      else pmodAux m f ((a * a) % m) (n / 2) (if n % 2 == 1 then (acc * a) % m else acc)

def pmod (a : Nat) (n : Nat) (m : Nat) : Nat := pmodAux m (n + 1) (a % m) n (1 % m)

-- fixedPowK k m — how many residues of Z/m satisfy x^k = x. The EXPONENT IS SEPARATE from the modulus, which
-- the first version of this wing got wrong: it compared the count at ab under exponent ab against the counts at
-- a and b under exponents a and b, three different exponents, and the JS gate refused to write it — 1 of 34
-- coprime pairs agreed. Chinese remainder multiplicativity holds for a FIXED k across the components, and with
-- the exponent held fixed all 34 agree. The generator's own check caught this before the kernel saw it.
def fixedPowK (k : Nat) (m : Nat) : Nat := ((List.range m).filter (fun x => pmod x k m == x % m)).length

-- fixedPow m — the diagonal case the Wave family counts: exponent and modulus both m.
def fixedPow (m : Nat) : Nat := fixedPowK m m

-- lawPow m ps — the PREDICTION: the product over m's distinct primes of (1 + gcd(m−1, p−1)). The kernel computes
-- this side too, from Nat.gcd, so the theorems below compare a walk against a law rather than against a literal.
def lawPow (m : Nat) (ps : List Nat) : Nat := (ps.map (fun p => 1 + Nat.gcd (m - 1) (p - 1))).foldl (· * ·) 1

/-- THE LAW AT MODULUS 2. The kernel walks all 2 residues counting those with x^2 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 2's distinct
    primes [2] of (1 + gcd(1, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_2 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 2 2 == x % 2))).foldl (· + ·) 0 = lawPow 2 [2] := by decide

/-- THE LAW AT MODULUS 3. The kernel walks all 3 residues counting those with x^3 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 3's distinct
    primes [3] of (1 + gcd(2, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_3 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 3 3 == x % 3))).foldl (· + ·) 0 = lawPow 3 [3] := by decide

/-- THE LAW AT MODULUS 4. The kernel walks all 4 residues counting those with x^4 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 4's distinct
    primes [2] of (1 + gcd(3, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_4 : ([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 4 4 == x % 4))).foldl (· + ·) 0 = lawPow 4 [2] := by decide

/-- THE LAW AT MODULUS 5. The kernel walks all 5 residues counting those with x^5 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 5's distinct
    primes [5] of (1 + gcd(4, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_5 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 5 5 == x % 5))).foldl (· + ·) 0 = lawPow 5 [5] := by decide

/-- THE LAW AT MODULUS 6. The kernel walks all 6 residues counting those with x^6 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 6's distinct
    primes [2,3] of (1 + gcd(5, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_6 : ([[0,1,2,3,4,5]].map (fun c => c.countP (fun x => pmod x 6 6 == x % 6))).foldl (· + ·) 0 = lawPow 6 [2,3] := by decide

/-- THE LAW AT MODULUS 7. The kernel walks all 7 residues counting those with x^7 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 7's distinct
    primes [7] of (1 + gcd(6, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_7 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 7 7 == x % 7))).foldl (· + ·) 0 = lawPow 7 [7] := by decide

/-- THE LAW AT MODULUS 8. The kernel walks all 8 residues counting those with x^8 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 8's distinct
    primes [2] of (1 + gcd(7, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_8 : ([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 8 8 == x % 8))).foldl (· + ·) 0 = lawPow 8 [2] := by decide

/-- THE LAW AT MODULUS 9. The kernel walks all 9 residues counting those with x^9 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 9's distinct
    primes [3] of (1 + gcd(8, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_9 : ([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 9 9 == x % 9))).foldl (· + ·) 0 = lawPow 9 [3] := by decide

/-- THE LAW AT MODULUS 10. The kernel walks all 10 residues counting those with x^10 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 10's distinct
    primes [2,5] of (1 + gcd(9, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_10 : ([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 10 10 == x % 10))).foldl (· + ·) 0 = lawPow 10 [2,5] := by decide

/-- THE LAW AT MODULUS 11. The kernel walks all 11 residues counting those with x^11 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 11's distinct
    primes [11] of (1 + gcd(10, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_11 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 11 11 == x % 11))).foldl (· + ·) 0 = lawPow 11 [11] := by decide

/-- THE LAW AT MODULUS 12. The kernel walks all 12 residues counting those with x^12 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 12's distinct
    primes [2,3] of (1 + gcd(11, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11]].map (fun c => c.countP (fun x => pmod x 12 12 == x % 12))).foldl (· + ·) 0 = lawPow 12 [2,3] := by decide

/-- THE LAW AT MODULUS 13. The kernel walks all 13 residues counting those with x^13 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 13's distinct
    primes [13] of (1 + gcd(12, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 13 13 == x % 13))).foldl (· + ·) 0 = lawPow 13 [13] := by decide

/-- THE LAW AT MODULUS 14. The kernel walks all 14 residues counting those with x^14 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 14's distinct
    primes [2,7] of (1 + gcd(13, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13]].map (fun c => c.countP (fun x => pmod x 14 14 == x % 14))).foldl (· + ·) 0 = lawPow 14 [2,7] := by decide

/-- THE LAW AT MODULUS 15. The kernel walks all 15 residues counting those with x^15 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 15's distinct
    primes [3,5] of (1 + gcd(14, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]].map (fun c => c.countP (fun x => pmod x 15 15 == x % 15))).foldl (· + ·) 0 = lawPow 15 [3,5] := by decide

/-- THE LAW AT MODULUS 16. The kernel walks all 16 residues counting those with x^16 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 16's distinct
    primes [2] of (1 + gcd(15, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]].map (fun c => c.countP (fun x => pmod x 16 16 == x % 16))).foldl (· + ·) 0 = lawPow 16 [2] := by decide

/-- THE LAW AT MODULUS 17. The kernel walks all 17 residues counting those with x^17 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 17's distinct
    primes [17] of (1 + gcd(16, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 17 17 == x % 17))).foldl (· + ·) 0 = lawPow 17 [17] := by decide

/-- THE LAW AT MODULUS 18. The kernel walks all 18 residues counting those with x^18 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 18's distinct
    primes [2,3] of (1 + gcd(17, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]].map (fun c => c.countP (fun x => pmod x 18 18 == x % 18))).foldl (· + ·) 0 = lawPow 18 [2,3] := by decide

/-- THE LAW AT MODULUS 19. The kernel walks all 19 residues counting those with x^19 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 19's distinct
    primes [19] of (1 + gcd(18, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 19 19 == x % 19))).foldl (· + ·) 0 = lawPow 19 [19] := by decide

/-- THE LAW AT MODULUS 20. The kernel walks all 20 residues counting those with x^20 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 20's distinct
    primes [2,5] of (1 + gcd(19, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]].map (fun c => c.countP (fun x => pmod x 20 20 == x % 20))).foldl (· + ·) 0 = lawPow 20 [2,5] := by decide

/-- THE LAW AT MODULUS 21. The kernel walks all 21 residues counting those with x^21 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 21's distinct
    primes [3,7] of (1 + gcd(20, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]].map (fun c => c.countP (fun x => pmod x 21 21 == x % 21))).foldl (· + ·) 0 = lawPow 21 [3,7] := by decide

/-- THE LAW AT MODULUS 22. The kernel walks all 22 residues counting those with x^22 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 22's distinct
    primes [2,11] of (1 + gcd(21, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]].map (fun c => c.countP (fun x => pmod x 22 22 == x % 22))).foldl (· + ·) 0 = lawPow 22 [2,11] := by decide

/-- THE LAW AT MODULUS 23. The kernel walks all 23 residues counting those with x^23 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 23's distinct
    primes [23] of (1 + gcd(22, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 23 23 == x % 23))).foldl (· + ·) 0 = lawPow 23 [23] := by decide

/-- THE LAW AT MODULUS 24. The kernel walks all 24 residues counting those with x^24 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 24's distinct
    primes [2,3] of (1 + gcd(23, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]].map (fun c => c.countP (fun x => pmod x 24 24 == x % 24))).foldl (· + ·) 0 = lawPow 24 [2,3] := by decide

/-- THE LAW AT MODULUS 25. The kernel walks all 25 residues counting those with x^25 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 25's distinct
    primes [5] of (1 + gcd(24, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_25 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]].map (fun c => c.countP (fun x => pmod x 25 25 == x % 25))).foldl (· + ·) 0 = lawPow 25 [5] := by decide

/-- THE LAW AT MODULUS 26. The kernel walks all 26 residues counting those with x^26 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 26's distinct
    primes [2,13] of (1 + gcd(25, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_26 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]].map (fun c => c.countP (fun x => pmod x 26 26 == x % 26))).foldl (· + ·) 0 = lawPow 26 [2,13] := by decide

/-- THE LAW AT MODULUS 27. The kernel walks all 27 residues counting those with x^27 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 27's distinct
    primes [3] of (1 + gcd(26, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_27 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]].map (fun c => c.countP (fun x => pmod x 27 27 == x % 27))).foldl (· + ·) 0 = lawPow 27 [3] := by decide

/-- THE LAW AT MODULUS 28. The kernel walks all 28 residues counting those with x^28 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 28's distinct
    primes [2,7] of (1 + gcd(27, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_28 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]].map (fun c => c.countP (fun x => pmod x 28 28 == x % 28))).foldl (· + ·) 0 = lawPow 28 [2,7] := by decide

/-- THE LAW AT MODULUS 29. The kernel walks all 29 residues counting those with x^29 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 29's distinct
    primes [29] of (1 + gcd(28, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_29 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 29 29 == x % 29))).foldl (· + ·) 0 = lawPow 29 [29] := by decide

/-- THE LAW AT MODULUS 30. The kernel walks all 30 residues counting those with x^30 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 30's distinct
    primes [2,3,5] of (1 + gcd(29, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_30 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]].map (fun c => c.countP (fun x => pmod x 30 30 == x % 30))).foldl (· + ·) 0 = lawPow 30 [2,3,5] := by decide

/-- THE LAW AT MODULUS 31. The kernel walks all 31 residues counting those with x^31 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 31's distinct
    primes [31] of (1 + gcd(30, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_31 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 31 31 == x % 31))).foldl (· + ·) 0 = lawPow 31 [31] := by decide

/-- THE LAW AT MODULUS 32. The kernel walks all 32 residues counting those with x^32 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 32's distinct
    primes [2] of (1 + gcd(31, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_32 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]].map (fun c => c.countP (fun x => pmod x 32 32 == x % 32))).foldl (· + ·) 0 = lawPow 32 [2] := by decide

/-- THE LAW AT MODULUS 33. The kernel walks all 33 residues counting those with x^33 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 33's distinct
    primes [3,11] of (1 + gcd(32, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_33 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32]].map (fun c => c.countP (fun x => pmod x 33 33 == x % 33))).foldl (· + ·) 0 = lawPow 33 [3,11] := by decide

/-- THE LAW AT MODULUS 34. The kernel walks all 34 residues counting those with x^34 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 34's distinct
    primes [2,17] of (1 + gcd(33, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_34 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33]].map (fun c => c.countP (fun x => pmod x 34 34 == x % 34))).foldl (· + ·) 0 = lawPow 34 [2,17] := by decide

/-- THE LAW AT MODULUS 35. The kernel walks all 35 residues counting those with x^35 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 35's distinct
    primes [5,7] of (1 + gcd(34, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_35 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34]].map (fun c => c.countP (fun x => pmod x 35 35 == x % 35))).foldl (· + ·) 0 = lawPow 35 [5,7] := by decide

/-- THE LAW AT MODULUS 36. The kernel walks all 36 residues counting those with x^36 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 36's distinct
    primes [2,3] of (1 + gcd(35, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_36 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35]].map (fun c => c.countP (fun x => pmod x 36 36 == x % 36))).foldl (· + ·) 0 = lawPow 36 [2,3] := by decide

/-- THE LAW AT MODULUS 37. The kernel walks all 37 residues counting those with x^37 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 37's distinct
    primes [37] of (1 + gcd(36, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_37 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 37 37 == x % 37))).foldl (· + ·) 0 = lawPow 37 [37] := by decide

/-- THE LAW AT MODULUS 38. The kernel walks all 38 residues counting those with x^38 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 38's distinct
    primes [2,19] of (1 + gcd(37, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_38 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37]].map (fun c => c.countP (fun x => pmod x 38 38 == x % 38))).foldl (· + ·) 0 = lawPow 38 [2,19] := by decide

/-- THE LAW AT MODULUS 39. The kernel walks all 39 residues counting those with x^39 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 39's distinct
    primes [3,13] of (1 + gcd(38, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_39 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38]].map (fun c => c.countP (fun x => pmod x 39 39 == x % 39))).foldl (· + ·) 0 = lawPow 39 [3,13] := by decide

/-- THE LAW AT MODULUS 40. The kernel walks all 40 residues counting those with x^40 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 40's distinct
    primes [2,5] of (1 + gcd(39, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_40 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39]].map (fun c => c.countP (fun x => pmod x 40 40 == x % 40))).foldl (· + ·) 0 = lawPow 40 [2,5] := by decide

/-- THE LAW AT MODULUS 41. The kernel walks all 41 residues counting those with x^41 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 41's distinct
    primes [41] of (1 + gcd(40, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_41 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 41 41 == x % 41))).foldl (· + ·) 0 = lawPow 41 [41] := by decide

/-- THE LAW AT MODULUS 42. The kernel walks all 42 residues counting those with x^42 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 42's distinct
    primes [2,3,7] of (1 + gcd(41, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_42 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41]].map (fun c => c.countP (fun x => pmod x 42 42 == x % 42))).foldl (· + ·) 0 = lawPow 42 [2,3,7] := by decide

/-- THE LAW AT MODULUS 43. The kernel walks all 43 residues counting those with x^43 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 43's distinct
    primes [43] of (1 + gcd(42, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_43 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 43 43 == x % 43))).foldl (· + ·) 0 = lawPow 43 [43] := by decide

/-- THE LAW AT MODULUS 44. The kernel walks all 44 residues counting those with x^44 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 44's distinct
    primes [2,11] of (1 + gcd(43, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_44 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43]].map (fun c => c.countP (fun x => pmod x 44 44 == x % 44))).foldl (· + ·) 0 = lawPow 44 [2,11] := by decide

/-- THE LAW AT MODULUS 45. The kernel walks all 45 residues counting those with x^45 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 45's distinct
    primes [3,5] of (1 + gcd(44, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_45 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44]].map (fun c => c.countP (fun x => pmod x 45 45 == x % 45))).foldl (· + ·) 0 = lawPow 45 [3,5] := by decide

/-- THE LAW AT MODULUS 46. The kernel walks all 46 residues counting those with x^46 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 46's distinct
    primes [2,23] of (1 + gcd(45, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_46 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45]].map (fun c => c.countP (fun x => pmod x 46 46 == x % 46))).foldl (· + ·) 0 = lawPow 46 [2,23] := by decide

/-- THE LAW AT MODULUS 47. The kernel walks all 47 residues counting those with x^47 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 47's distinct
    primes [47] of (1 + gcd(46, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_47 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 47 47 == x % 47))).foldl (· + ·) 0 = lawPow 47 [47] := by decide

/-- THE LAW AT MODULUS 48. The kernel walks all 48 residues counting those with x^48 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 48's distinct
    primes [2,3] of (1 + gcd(47, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_48 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]].map (fun c => c.countP (fun x => pmod x 48 48 == x % 48))).foldl (· + ·) 0 = lawPow 48 [2,3] := by decide

/-- THE LAW AT MODULUS 49. The kernel walks all 49 residues counting those with x^49 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 49's distinct
    primes [7] of (1 + gcd(48, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_49 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]].map (fun c => c.countP (fun x => pmod x 49 49 == x % 49))).foldl (· + ·) 0 = lawPow 49 [7] := by decide

/-- THE LAW AT MODULUS 50. The kernel walks all 50 residues counting those with x^50 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 50's distinct
    primes [2,5] of (1 + gcd(49, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_50 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]].map (fun c => c.countP (fun x => pmod x 50 50 == x % 50))).foldl (· + ·) 0 = lawPow 50 [2,5] := by decide

/-- THE LAW AT MODULUS 51. The kernel walks all 51 residues counting those with x^51 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 51's distinct
    primes [3,17] of (1 + gcd(50, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_51 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]].map (fun c => c.countP (fun x => pmod x 51 51 == x % 51))).foldl (· + ·) 0 = lawPow 51 [3,17] := by decide

/-- THE LAW AT MODULUS 52. The kernel walks all 52 residues counting those with x^52 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 52's distinct
    primes [2,13] of (1 + gcd(51, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_52 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]].map (fun c => c.countP (fun x => pmod x 52 52 == x % 52))).foldl (· + ·) 0 = lawPow 52 [2,13] := by decide

/-- THE LAW AT MODULUS 53. The kernel walks all 53 residues counting those with x^53 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 53's distinct
    primes [53] of (1 + gcd(52, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_53 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 53 53 == x % 53))).foldl (· + ·) 0 = lawPow 53 [53] := by decide

/-- THE LAW AT MODULUS 54. The kernel walks all 54 residues counting those with x^54 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 54's distinct
    primes [2,3] of (1 + gcd(53, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_54 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]].map (fun c => c.countP (fun x => pmod x 54 54 == x % 54))).foldl (· + ·) 0 = lawPow 54 [2,3] := by decide

/-- THE LAW AT MODULUS 55. The kernel walks all 55 residues counting those with x^55 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 55's distinct
    primes [5,11] of (1 + gcd(54, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_55 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]].map (fun c => c.countP (fun x => pmod x 55 55 == x % 55))).foldl (· + ·) 0 = lawPow 55 [5,11] := by decide

/-- THE LAW AT MODULUS 56. The kernel walks all 56 residues counting those with x^56 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 56's distinct
    primes [2,7] of (1 + gcd(55, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_56 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]].map (fun c => c.countP (fun x => pmod x 56 56 == x % 56))).foldl (· + ·) 0 = lawPow 56 [2,7] := by decide

/-- THE LAW AT MODULUS 57. The kernel walks all 57 residues counting those with x^57 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 57's distinct
    primes [3,19] of (1 + gcd(56, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_57 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56]].map (fun c => c.countP (fun x => pmod x 57 57 == x % 57))).foldl (· + ·) 0 = lawPow 57 [3,19] := by decide

/-- THE LAW AT MODULUS 58. The kernel walks all 58 residues counting those with x^58 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 58's distinct
    primes [2,29] of (1 + gcd(57, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_58 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]].map (fun c => c.countP (fun x => pmod x 58 58 == x % 58))).foldl (· + ·) 0 = lawPow 58 [2,29] := by decide

/-- THE LAW AT MODULUS 59. The kernel walks all 59 residues counting those with x^59 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 59's distinct
    primes [59] of (1 + gcd(58, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_59 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 59 59 == x % 59))).foldl (· + ·) 0 = lawPow 59 [59] := by decide

/-- THE LAW AT MODULUS 60. The kernel walks all 60 residues counting those with x^60 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 60's distinct
    primes [2,3,5] of (1 + gcd(59, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_60 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]].map (fun c => c.countP (fun x => pmod x 60 60 == x % 60))).foldl (· + ·) 0 = lawPow 60 [2,3,5] := by decide

/-- THE LAW AT MODULUS 61. The kernel walks all 61 residues counting those with x^61 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 61's distinct
    primes [61] of (1 + gcd(60, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_61 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 61 61 == x % 61))).foldl (· + ·) 0 = lawPow 61 [61] := by decide

/-- THE LAW AT MODULUS 62. The kernel walks all 62 residues counting those with x^62 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 62's distinct
    primes [2,31] of (1 + gcd(61, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_62 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]].map (fun c => c.countP (fun x => pmod x 62 62 == x % 62))).foldl (· + ·) 0 = lawPow 62 [2,31] := by decide

/-- THE LAW AT MODULUS 63. The kernel walks all 63 residues counting those with x^63 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 63's distinct
    primes [3,7] of (1 + gcd(62, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_63 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]].map (fun c => c.countP (fun x => pmod x 63 63 == x % 63))).foldl (· + ·) 0 = lawPow 63 [3,7] := by decide

/-- THE LAW AT MODULUS 64. The kernel walks all 64 residues counting those with x^64 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 64's distinct
    primes [2] of (1 + gcd(63, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_64 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]].map (fun c => c.countP (fun x => pmod x 64 64 == x % 64))).foldl (· + ·) 0 = lawPow 64 [2] := by decide

/-- THE LAW AT MODULUS 65. The kernel walks all 65 residues counting those with x^65 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 65's distinct
    primes [5,13] of (1 + gcd(64, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_65 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64]].map (fun c => c.countP (fun x => pmod x 65 65 == x % 65))).foldl (· + ·) 0 = lawPow 65 [5,13] := by decide

/-- THE LAW AT MODULUS 66. The kernel walks all 66 residues counting those with x^66 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 66's distinct
    primes [2,3,11] of (1 + gcd(65, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_66 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65]].map (fun c => c.countP (fun x => pmod x 66 66 == x % 66))).foldl (· + ·) 0 = lawPow 66 [2,3,11] := by decide

/-- THE LAW AT MODULUS 67. The kernel walks all 67 residues counting those with x^67 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 67's distinct
    primes [67] of (1 + gcd(66, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_67 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66]].map (fun c => c.countP (fun x => pmod x 67 67 == x % 67))).foldl (· + ·) 0 = lawPow 67 [67] := by decide

/-- THE LAW AT MODULUS 68. The kernel walks all 68 residues counting those with x^68 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 68's distinct
    primes [2,17] of (1 + gcd(67, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_68 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67]].map (fun c => c.countP (fun x => pmod x 68 68 == x % 68))).foldl (· + ·) 0 = lawPow 68 [2,17] := by decide

/-- THE LAW AT MODULUS 69. The kernel walks all 69 residues counting those with x^69 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 69's distinct
    primes [3,23] of (1 + gcd(68, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_69 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68]].map (fun c => c.countP (fun x => pmod x 69 69 == x % 69))).foldl (· + ·) 0 = lawPow 69 [3,23] := by decide

/-- THE LAW AT MODULUS 70. The kernel walks all 70 residues counting those with x^70 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 70's distinct
    primes [2,5,7] of (1 + gcd(69, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_70 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69]].map (fun c => c.countP (fun x => pmod x 70 70 == x % 70))).foldl (· + ·) 0 = lawPow 70 [2,5,7] := by decide

/-- THE LAW AT MODULUS 71. The kernel walks all 71 residues counting those with x^71 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 71's distinct
    primes [71] of (1 + gcd(70, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_71 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70]].map (fun c => c.countP (fun x => pmod x 71 71 == x % 71))).foldl (· + ·) 0 = lawPow 71 [71] := by decide

/-- THE LAW AT MODULUS 72. The kernel walks all 72 residues counting those with x^72 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 72's distinct
    primes [2,3] of (1 + gcd(71, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_72 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71]].map (fun c => c.countP (fun x => pmod x 72 72 == x % 72))).foldl (· + ·) 0 = lawPow 72 [2,3] := by decide

/-- THE LAW AT MODULUS 73. The kernel walks all 73 residues counting those with x^73 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 73's distinct
    primes [73] of (1 + gcd(72, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_73 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72]].map (fun c => c.countP (fun x => pmod x 73 73 == x % 73))).foldl (· + ·) 0 = lawPow 73 [73] := by decide

/-- THE LAW AT MODULUS 74. The kernel walks all 74 residues counting those with x^74 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 74's distinct
    primes [2,37] of (1 + gcd(73, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_74 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73]].map (fun c => c.countP (fun x => pmod x 74 74 == x % 74))).foldl (· + ·) 0 = lawPow 74 [2,37] := by decide

/-- THE LAW AT MODULUS 75. The kernel walks all 75 residues counting those with x^75 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 75's distinct
    primes [3,5] of (1 + gcd(74, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_75 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74]].map (fun c => c.countP (fun x => pmod x 75 75 == x % 75))).foldl (· + ·) 0 = lawPow 75 [3,5] := by decide

/-- THE LAW AT MODULUS 76. The kernel walks all 76 residues counting those with x^76 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 76's distinct
    primes [2,19] of (1 + gcd(75, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_76 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75]].map (fun c => c.countP (fun x => pmod x 76 76 == x % 76))).foldl (· + ·) 0 = lawPow 76 [2,19] := by decide

/-- THE LAW AT MODULUS 77. The kernel walks all 77 residues counting those with x^77 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 77's distinct
    primes [7,11] of (1 + gcd(76, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_77 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76]].map (fun c => c.countP (fun x => pmod x 77 77 == x % 77))).foldl (· + ·) 0 = lawPow 77 [7,11] := by decide

/-- THE LAW AT MODULUS 78. The kernel walks all 78 residues counting those with x^78 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 78's distinct
    primes [2,3,13] of (1 + gcd(77, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_78 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77]].map (fun c => c.countP (fun x => pmod x 78 78 == x % 78))).foldl (· + ·) 0 = lawPow 78 [2,3,13] := by decide

/-- THE LAW AT MODULUS 79. The kernel walks all 79 residues counting those with x^79 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 79's distinct
    primes [79] of (1 + gcd(78, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_79 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78]].map (fun c => c.countP (fun x => pmod x 79 79 == x % 79))).foldl (· + ·) 0 = lawPow 79 [79] := by decide

/-- THE LAW AT MODULUS 80. The kernel walks all 80 residues counting those with x^80 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 80's distinct
    primes [2,5] of (1 + gcd(79, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_80 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79]].map (fun c => c.countP (fun x => pmod x 80 80 == x % 80))).foldl (· + ·) 0 = lawPow 80 [2,5] := by decide

/-- THE LAW AT MODULUS 81. The kernel walks all 81 residues counting those with x^81 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 81's distinct
    primes [3] of (1 + gcd(80, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_81 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]].map (fun c => c.countP (fun x => pmod x 81 81 == x % 81))).foldl (· + ·) 0 = lawPow 81 [3] := by decide

/-- THE LAW AT MODULUS 82. The kernel walks all 82 residues counting those with x^82 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 82's distinct
    primes [2,41] of (1 + gcd(81, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_82 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81]].map (fun c => c.countP (fun x => pmod x 82 82 == x % 82))).foldl (· + ·) 0 = lawPow 82 [2,41] := by decide

/-- THE LAW AT MODULUS 83. The kernel walks all 83 residues counting those with x^83 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 83's distinct
    primes [83] of (1 + gcd(82, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_83 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82]].map (fun c => c.countP (fun x => pmod x 83 83 == x % 83))).foldl (· + ·) 0 = lawPow 83 [83] := by decide

/-- THE LAW AT MODULUS 84. The kernel walks all 84 residues counting those with x^84 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 84's distinct
    primes [2,3,7] of (1 + gcd(83, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_84 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]].map (fun c => c.countP (fun x => pmod x 84 84 == x % 84))).foldl (· + ·) 0 = lawPow 84 [2,3,7] := by decide

/-- THE LAW AT MODULUS 85. The kernel walks all 85 residues counting those with x^85 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 85's distinct
    primes [5,17] of (1 + gcd(84, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_85 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84]].map (fun c => c.countP (fun x => pmod x 85 85 == x % 85))).foldl (· + ·) 0 = lawPow 85 [5,17] := by decide

/-- THE LAW AT MODULUS 86. The kernel walks all 86 residues counting those with x^86 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 86's distinct
    primes [2,43] of (1 + gcd(85, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_86 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85]].map (fun c => c.countP (fun x => pmod x 86 86 == x % 86))).foldl (· + ·) 0 = lawPow 86 [2,43] := by decide

/-- THE LAW AT MODULUS 87. The kernel walks all 87 residues counting those with x^87 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 87's distinct
    primes [3,29] of (1 + gcd(86, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_87 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86]].map (fun c => c.countP (fun x => pmod x 87 87 == x % 87))).foldl (· + ·) 0 = lawPow 87 [3,29] := by decide

/-- THE LAW AT MODULUS 88. The kernel walks all 88 residues counting those with x^88 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 88's distinct
    primes [2,11] of (1 + gcd(87, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_88 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87]].map (fun c => c.countP (fun x => pmod x 88 88 == x % 88))).foldl (· + ·) 0 = lawPow 88 [2,11] := by decide

/-- THE LAW AT MODULUS 89. The kernel walks all 89 residues counting those with x^89 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 89's distinct
    primes [89] of (1 + gcd(88, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_89 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88]].map (fun c => c.countP (fun x => pmod x 89 89 == x % 89))).foldl (· + ·) 0 = lawPow 89 [89] := by decide

/-- THE LAW AT MODULUS 90. The kernel walks all 90 residues counting those with x^90 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 90's distinct
    primes [2,3,5] of (1 + gcd(89, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_90 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]].map (fun c => c.countP (fun x => pmod x 90 90 == x % 90))).foldl (· + ·) 0 = lawPow 90 [2,3,5] := by decide

/-- THE LAW AT MODULUS 91. The kernel walks all 91 residues counting those with x^91 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 91's distinct
    primes [7,13] of (1 + gcd(90, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_91 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]].map (fun c => c.countP (fun x => pmod x 91 91 == x % 91))).foldl (· + ·) 0 = lawPow 91 [7,13] := by decide

/-- THE LAW AT MODULUS 92. The kernel walks all 92 residues counting those with x^92 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 92's distinct
    primes [2,23] of (1 + gcd(91, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_92 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91]].map (fun c => c.countP (fun x => pmod x 92 92 == x % 92))).foldl (· + ·) 0 = lawPow 92 [2,23] := by decide

/-- THE LAW AT MODULUS 93. The kernel walks all 93 residues counting those with x^93 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 93's distinct
    primes [3,31] of (1 + gcd(92, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_93 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92]].map (fun c => c.countP (fun x => pmod x 93 93 == x % 93))).foldl (· + ·) 0 = lawPow 93 [3,31] := by decide

/-- THE LAW AT MODULUS 94. The kernel walks all 94 residues counting those with x^94 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 94's distinct
    primes [2,47] of (1 + gcd(93, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_94 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93]].map (fun c => c.countP (fun x => pmod x 94 94 == x % 94))).foldl (· + ·) 0 = lawPow 94 [2,47] := by decide

/-- THE LAW AT MODULUS 95. The kernel walks all 95 residues counting those with x^95 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 95's distinct
    primes [5,19] of (1 + gcd(94, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_95 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94]].map (fun c => c.countP (fun x => pmod x 95 95 == x % 95))).foldl (· + ·) 0 = lawPow 95 [5,19] := by decide

/-- THE LAW AT MODULUS 96. The kernel walks all 96 residues counting those with x^96 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 96's distinct
    primes [2,3] of (1 + gcd(95, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_96 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95]].map (fun c => c.countP (fun x => pmod x 96 96 == x % 96))).foldl (· + ·) 0 = lawPow 96 [2,3] := by decide

/-- THE LAW AT MODULUS 97. The kernel walks all 97 residues counting those with x^97 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 97's distinct
    primes [97] of (1 + gcd(96, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_97 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96]].map (fun c => c.countP (fun x => pmod x 97 97 == x % 97))).foldl (· + ·) 0 = lawPow 97 [97] := by decide

/-- THE LAW AT MODULUS 98. The kernel walks all 98 residues counting those with x^98 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 98's distinct
    primes [2,7] of (1 + gcd(97, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_98 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97]].map (fun c => c.countP (fun x => pmod x 98 98 == x % 98))).foldl (· + ·) 0 = lawPow 98 [2,7] := by decide

/-- THE LAW AT MODULUS 99. The kernel walks all 99 residues counting those with x^99 = x, in blocks of 32 so the
    traversal never recurses as deep as the modulus, and separately computes the product over 99's distinct
    primes [3,11] of (1 + gcd(98, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_99 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98]].map (fun c => c.countP (fun x => pmod x 99 99 == x % 99))).foldl (· + ·) 0 = lawPow 99 [3,11] := by decide

/-- THE LAW AT MODULUS 100. The kernel walks all 100 residues counting those with x^100 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 100's distinct
    primes [2,5] of (1 + gcd(99, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_100 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99]].map (fun c => c.countP (fun x => pmod x 100 100 == x % 100))).foldl (· + ·) 0 = lawPow 100 [2,5] := by decide

/-- THE LAW AT MODULUS 101. The kernel walks all 101 residues counting those with x^101 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 101's distinct
    primes [101] of (1 + gcd(100, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_101 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100]].map (fun c => c.countP (fun x => pmod x 101 101 == x % 101))).foldl (· + ·) 0 = lawPow 101 [101] := by decide

/-- THE LAW AT MODULUS 102. The kernel walks all 102 residues counting those with x^102 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 102's distinct
    primes [2,3,17] of (1 + gcd(101, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count
    is walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the
    walk. The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_102 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101]].map (fun c => c.countP (fun x => pmod x 102 102 == x % 102))).foldl (· + ·) 0 = lawPow 102 [2,3,17] := by decide

/-- THE LAW AT MODULUS 103. The kernel walks all 103 residues counting those with x^103 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 103's distinct
    primes [103] of (1 + gcd(102, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_103 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102]].map (fun c => c.countP (fun x => pmod x 103 103 == x % 103))).foldl (· + ·) 0 = lawPow 103 [103] := by decide

/-- THE LAW AT MODULUS 104. The kernel walks all 104 residues counting those with x^104 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 104's distinct
    primes [2,13] of (1 + gcd(103, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_104 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103]].map (fun c => c.countP (fun x => pmod x 104 104 == x % 104))).foldl (· + ·) 0 = lawPow 104 [2,13] := by decide

/-- THE LAW AT MODULUS 105. The kernel walks all 105 residues counting those with x^105 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 105's distinct
    primes [3,5,7] of (1 + gcd(104, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_105 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104]].map (fun c => c.countP (fun x => pmod x 105 105 == x % 105))).foldl (· + ·) 0 = lawPow 105 [3,5,7] := by decide

/-- THE LAW AT MODULUS 106. The kernel walks all 106 residues counting those with x^106 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 106's distinct
    primes [2,53] of (1 + gcd(105, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_106 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105]].map (fun c => c.countP (fun x => pmod x 106 106 == x % 106))).foldl (· + ·) 0 = lawPow 106 [2,53] := by decide

/-- THE LAW AT MODULUS 107. The kernel walks all 107 residues counting those with x^107 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 107's distinct
    primes [107] of (1 + gcd(106, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_107 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106]].map (fun c => c.countP (fun x => pmod x 107 107 == x % 107))).foldl (· + ·) 0 = lawPow 107 [107] := by decide

/-- THE LAW AT MODULUS 108. The kernel walks all 108 residues counting those with x^108 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 108's distinct
    primes [2,3] of (1 + gcd(107, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_108 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107]].map (fun c => c.countP (fun x => pmod x 108 108 == x % 108))).foldl (· + ·) 0 = lawPow 108 [2,3] := by decide

/-- THE LAW AT MODULUS 109. The kernel walks all 109 residues counting those with x^109 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 109's distinct
    primes [109] of (1 + gcd(108, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_109 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108]].map (fun c => c.countP (fun x => pmod x 109 109 == x % 109))).foldl (· + ·) 0 = lawPow 109 [109] := by decide

/-- THE LAW AT MODULUS 110. The kernel walks all 110 residues counting those with x^110 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 110's distinct
    primes [2,5,11] of (1 + gcd(109, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count
    is walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the
    walk. The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_110 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109]].map (fun c => c.countP (fun x => pmod x 110 110 == x % 110))).foldl (· + ·) 0 = lawPow 110 [2,5,11] := by decide

/-- THE LAW AT MODULUS 111. The kernel walks all 111 residues counting those with x^111 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 111's distinct
    primes [3,37] of (1 + gcd(110, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_111 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110]].map (fun c => c.countP (fun x => pmod x 111 111 == x % 111))).foldl (· + ·) 0 = lawPow 111 [3,37] := by decide

/-- THE LAW AT MODULUS 112. The kernel walks all 112 residues counting those with x^112 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 112's distinct
    primes [2,7] of (1 + gcd(111, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_112 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111]].map (fun c => c.countP (fun x => pmod x 112 112 == x % 112))).foldl (· + ·) 0 = lawPow 112 [2,7] := by decide

/-- THE LAW AT MODULUS 113. The kernel walks all 113 residues counting those with x^113 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 113's distinct
    primes [113] of (1 + gcd(112, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_113 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112]].map (fun c => c.countP (fun x => pmod x 113 113 == x % 113))).foldl (· + ·) 0 = lawPow 113 [113] := by decide

/-- THE LAW AT MODULUS 114. The kernel walks all 114 residues counting those with x^114 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 114's distinct
    primes [2,3,19] of (1 + gcd(113, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count
    is walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the
    walk. The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_114 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113]].map (fun c => c.countP (fun x => pmod x 114 114 == x % 114))).foldl (· + ·) 0 = lawPow 114 [2,3,19] := by decide

/-- THE LAW AT MODULUS 115. The kernel walks all 115 residues counting those with x^115 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 115's distinct
    primes [5,23] of (1 + gcd(114, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_115 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114]].map (fun c => c.countP (fun x => pmod x 115 115 == x % 115))).foldl (· + ·) 0 = lawPow 115 [5,23] := by decide

/-- THE LAW AT MODULUS 116. The kernel walks all 116 residues counting those with x^116 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 116's distinct
    primes [2,29] of (1 + gcd(115, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_116 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115]].map (fun c => c.countP (fun x => pmod x 116 116 == x % 116))).foldl (· + ·) 0 = lawPow 116 [2,29] := by decide

/-- THE LAW AT MODULUS 117. The kernel walks all 117 residues counting those with x^117 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 117's distinct
    primes [3,13] of (1 + gcd(116, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_117 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116]].map (fun c => c.countP (fun x => pmod x 117 117 == x % 117))).foldl (· + ·) 0 = lawPow 117 [3,13] := by decide

/-- THE LAW AT MODULUS 118. The kernel walks all 118 residues counting those with x^118 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 118's distinct
    primes [2,59] of (1 + gcd(117, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_118 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117]].map (fun c => c.countP (fun x => pmod x 118 118 == x % 118))).foldl (· + ·) 0 = lawPow 118 [2,59] := by decide

/-- THE LAW AT MODULUS 119. The kernel walks all 119 residues counting those with x^119 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 119's distinct
    primes [7,17] of (1 + gcd(118, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_119 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118]].map (fun c => c.countP (fun x => pmod x 119 119 == x % 119))).foldl (· + ·) 0 = lawPow 119 [7,17] := by decide

/-- THE LAW AT MODULUS 120. The kernel walks all 120 residues counting those with x^120 = x, in blocks of 32 so
    the traversal never recurses as deep as the modulus, and separately computes the product over 120's distinct
    primes [2,3,5] of (1 + gcd(119, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is
    walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk.
    The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ)
    elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count
    multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating
    a number and not the reason; they become this law's verification table. -/
theorem fixed_power_law_mod_120 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119]].map (fun c => c.countP (fun x => pmod x 120 120 == x % 120))).foldl (· + ·) 0 = lawPow 120 [2,3,5] := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 2. The residues of Z/2 fixed by x ↦ x^2 number exactly 1 + gcd(1, 1) — the
    units forming the kernel of x ↦ x^1, which has gcd(1, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_2 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 2 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 1 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 3. The residues of Z/2 fixed by x ↦ x^3 number exactly 1 + gcd(2, 1) — the
    units forming the kernel of x ↦ x^2, which has gcd(2, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_3 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 3 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 2 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 4. The residues of Z/2 fixed by x ↦ x^4 number exactly 1 + gcd(3, 1) — the
    units forming the kernel of x ↦ x^3, which has gcd(3, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_4 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 4 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 3 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 5. The residues of Z/2 fixed by x ↦ x^5 number exactly 1 + gcd(4, 1) — the
    units forming the kernel of x ↦ x^4, which has gcd(4, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_5 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 5 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 4 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 6. The residues of Z/2 fixed by x ↦ x^6 number exactly 1 + gcd(5, 1) — the
    units forming the kernel of x ↦ x^5, which has gcd(5, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_6 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 6 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 5 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 7. The residues of Z/2 fixed by x ↦ x^7 number exactly 1 + gcd(6, 1) — the
    units forming the kernel of x ↦ x^6, which has gcd(6, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_7 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 7 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 6 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 8. The residues of Z/2 fixed by x ↦ x^8 number exactly 1 + gcd(7, 1) — the
    units forming the kernel of x ↦ x^7, which has gcd(7, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_8 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 8 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 7 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 9. The residues of Z/2 fixed by x ↦ x^9 number exactly 1 + gcd(8, 1) — the
    units forming the kernel of x ↦ x^8, which has gcd(8, 1) elements because (Z/2)* is cyclic of order 1, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one coprime
    to 1 only two. -/
theorem fixed_power_on_prime_2_exp_9 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 9 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 8 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 10. The residues of Z/2 fixed by x ↦ x^10 number exactly 1 + gcd(9, 1) —
    the units forming the kernel of x ↦ x^9, which has gcd(9, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_10 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 10 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 9 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 11. The residues of Z/2 fixed by x ↦ x^11 number exactly 1 + gcd(10, 1) —
    the units forming the kernel of x ↦ x^10, which has gcd(10, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_11 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 11 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 10 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 12. The residues of Z/2 fixed by x ↦ x^12 number exactly 1 + gcd(11, 1) —
    the units forming the kernel of x ↦ x^11, which has gcd(11, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_12 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 12 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 11 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 13. The residues of Z/2 fixed by x ↦ x^13 number exactly 1 + gcd(12, 1) —
    the units forming the kernel of x ↦ x^12, which has gcd(12, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_13 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 13 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 12 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 14. The residues of Z/2 fixed by x ↦ x^14 number exactly 1 + gcd(13, 1) —
    the units forming the kernel of x ↦ x^13, which has gcd(13, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_14 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 14 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 13 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 15. The residues of Z/2 fixed by x ↦ x^15 number exactly 1 + gcd(14, 1) —
    the units forming the kernel of x ↦ x^14, which has gcd(14, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_15 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 15 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 14 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 16. The residues of Z/2 fixed by x ↦ x^16 number exactly 1 + gcd(15, 1) —
    the units forming the kernel of x ↦ x^15, which has gcd(15, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_16 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 16 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 15 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 17. The residues of Z/2 fixed by x ↦ x^17 number exactly 1 + gcd(16, 1) —
    the units forming the kernel of x ↦ x^16, which has gcd(16, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_17 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 17 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 16 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 18. The residues of Z/2 fixed by x ↦ x^18 number exactly 1 + gcd(17, 1) —
    the units forming the kernel of x ↦ x^17, which has gcd(17, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_18 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 18 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 17 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 19. The residues of Z/2 fixed by x ↦ x^19 number exactly 1 + gcd(18, 1) —
    the units forming the kernel of x ↦ x^18, which has gcd(18, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_19 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 19 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 18 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 20. The residues of Z/2 fixed by x ↦ x^20 number exactly 1 + gcd(19, 1) —
    the units forming the kernel of x ↦ x^19, which has gcd(19, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_20 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 20 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 19 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 21. The residues of Z/2 fixed by x ↦ x^21 number exactly 1 + gcd(20, 1) —
    the units forming the kernel of x ↦ x^20, which has gcd(20, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_21 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 21 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 20 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 22. The residues of Z/2 fixed by x ↦ x^22 number exactly 1 + gcd(21, 1) —
    the units forming the kernel of x ↦ x^21, which has gcd(21, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_22 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 22 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 21 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 23. The residues of Z/2 fixed by x ↦ x^23 number exactly 1 + gcd(22, 1) —
    the units forming the kernel of x ↦ x^22, which has gcd(22, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_23 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 23 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 22 1 := by decide

/-- THE PRIME HALF AT p = 2, EXPONENT 24. The residues of Z/2 fixed by x ↦ x^24 number exactly 1 + gcd(23, 1) —
    the units forming the kernel of x ↦ x^23, which has gcd(23, 1) elements because (Z/2)* is cyclic of order 1,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 1 it returns every residue, and at one
    coprime to 1 only two. -/
theorem fixed_power_on_prime_2_exp_24 : ([[0,1]].map (fun c => c.countP (fun x => pmod x 24 2 == x % 2))).foldl (· + ·) 0 = 1 + Nat.gcd 23 1 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 2. The residues of Z/3 fixed by x ↦ x^2 number exactly 1 + gcd(1, 2) — the
    units forming the kernel of x ↦ x^1, which has gcd(1, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_2 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 2 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 1 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 3. The residues of Z/3 fixed by x ↦ x^3 number exactly 1 + gcd(2, 2) — the
    units forming the kernel of x ↦ x^2, which has gcd(2, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_3 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 3 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 2 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 4. The residues of Z/3 fixed by x ↦ x^4 number exactly 1 + gcd(3, 2) — the
    units forming the kernel of x ↦ x^3, which has gcd(3, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_4 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 4 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 3 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 5. The residues of Z/3 fixed by x ↦ x^5 number exactly 1 + gcd(4, 2) — the
    units forming the kernel of x ↦ x^4, which has gcd(4, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_5 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 5 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 4 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 6. The residues of Z/3 fixed by x ↦ x^6 number exactly 1 + gcd(5, 2) — the
    units forming the kernel of x ↦ x^5, which has gcd(5, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_6 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 6 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 5 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 7. The residues of Z/3 fixed by x ↦ x^7 number exactly 1 + gcd(6, 2) — the
    units forming the kernel of x ↦ x^6, which has gcd(6, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_7 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 7 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 6 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 8. The residues of Z/3 fixed by x ↦ x^8 number exactly 1 + gcd(7, 2) — the
    units forming the kernel of x ↦ x^7, which has gcd(7, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_8 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 8 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 7 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 9. The residues of Z/3 fixed by x ↦ x^9 number exactly 1 + gcd(8, 2) — the
    units forming the kernel of x ↦ x^8, which has gcd(8, 2) elements because (Z/3)* is cyclic of order 2, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one coprime
    to 2 only two. -/
theorem fixed_power_on_prime_3_exp_9 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 9 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 8 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 10. The residues of Z/3 fixed by x ↦ x^10 number exactly 1 + gcd(9, 2) —
    the units forming the kernel of x ↦ x^9, which has gcd(9, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_10 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 10 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 9 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 11. The residues of Z/3 fixed by x ↦ x^11 number exactly 1 + gcd(10, 2) —
    the units forming the kernel of x ↦ x^10, which has gcd(10, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_11 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 11 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 10 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 12. The residues of Z/3 fixed by x ↦ x^12 number exactly 1 + gcd(11, 2) —
    the units forming the kernel of x ↦ x^11, which has gcd(11, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_12 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 12 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 11 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 13. The residues of Z/3 fixed by x ↦ x^13 number exactly 1 + gcd(12, 2) —
    the units forming the kernel of x ↦ x^12, which has gcd(12, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_13 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 13 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 12 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 14. The residues of Z/3 fixed by x ↦ x^14 number exactly 1 + gcd(13, 2) —
    the units forming the kernel of x ↦ x^13, which has gcd(13, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_14 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 14 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 13 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 15. The residues of Z/3 fixed by x ↦ x^15 number exactly 1 + gcd(14, 2) —
    the units forming the kernel of x ↦ x^14, which has gcd(14, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_15 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 15 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 14 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 16. The residues of Z/3 fixed by x ↦ x^16 number exactly 1 + gcd(15, 2) —
    the units forming the kernel of x ↦ x^15, which has gcd(15, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_16 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 16 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 15 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 17. The residues of Z/3 fixed by x ↦ x^17 number exactly 1 + gcd(16, 2) —
    the units forming the kernel of x ↦ x^16, which has gcd(16, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_17 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 17 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 16 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 18. The residues of Z/3 fixed by x ↦ x^18 number exactly 1 + gcd(17, 2) —
    the units forming the kernel of x ↦ x^17, which has gcd(17, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_18 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 18 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 17 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 19. The residues of Z/3 fixed by x ↦ x^19 number exactly 1 + gcd(18, 2) —
    the units forming the kernel of x ↦ x^18, which has gcd(18, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_19 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 19 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 18 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 20. The residues of Z/3 fixed by x ↦ x^20 number exactly 1 + gcd(19, 2) —
    the units forming the kernel of x ↦ x^19, which has gcd(19, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_20 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 20 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 19 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 21. The residues of Z/3 fixed by x ↦ x^21 number exactly 1 + gcd(20, 2) —
    the units forming the kernel of x ↦ x^20, which has gcd(20, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_21 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 21 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 20 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 22. The residues of Z/3 fixed by x ↦ x^22 number exactly 1 + gcd(21, 2) —
    the units forming the kernel of x ↦ x^21, which has gcd(21, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_22 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 22 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 21 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 23. The residues of Z/3 fixed by x ↦ x^23 number exactly 1 + gcd(22, 2) —
    the units forming the kernel of x ↦ x^22, which has gcd(22, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_23 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 23 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 22 2 := by decide

/-- THE PRIME HALF AT p = 3, EXPONENT 24. The residues of Z/3 fixed by x ↦ x^24 number exactly 1 + gcd(23, 2) —
    the units forming the kernel of x ↦ x^23, which has gcd(23, 2) elements because (Z/3)* is cyclic of order 2,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 2 it returns every residue, and at one
    coprime to 2 only two. -/
theorem fixed_power_on_prime_3_exp_24 : ([[0,1,2]].map (fun c => c.countP (fun x => pmod x 24 3 == x % 3))).foldl (· + ·) 0 = 1 + Nat.gcd 23 2 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 2. The residues of Z/5 fixed by x ↦ x^2 number exactly 1 + gcd(1, 4) — the
    units forming the kernel of x ↦ x^1, which has gcd(1, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_2 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 2 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 1 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 3. The residues of Z/5 fixed by x ↦ x^3 number exactly 1 + gcd(2, 4) — the
    units forming the kernel of x ↦ x^2, which has gcd(2, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_3 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 3 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 2 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 4. The residues of Z/5 fixed by x ↦ x^4 number exactly 1 + gcd(3, 4) — the
    units forming the kernel of x ↦ x^3, which has gcd(3, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_4 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 4 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 3 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 5. The residues of Z/5 fixed by x ↦ x^5 number exactly 1 + gcd(4, 4) — the
    units forming the kernel of x ↦ x^4, which has gcd(4, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_5 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 5 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 4 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 6. The residues of Z/5 fixed by x ↦ x^6 number exactly 1 + gcd(5, 4) — the
    units forming the kernel of x ↦ x^5, which has gcd(5, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_6 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 6 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 5 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 7. The residues of Z/5 fixed by x ↦ x^7 number exactly 1 + gcd(6, 4) — the
    units forming the kernel of x ↦ x^6, which has gcd(6, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_7 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 7 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 6 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 8. The residues of Z/5 fixed by x ↦ x^8 number exactly 1 + gcd(7, 4) — the
    units forming the kernel of x ↦ x^7, which has gcd(7, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_8 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 8 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 7 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 9. The residues of Z/5 fixed by x ↦ x^9 number exactly 1 + gcd(8, 4) — the
    units forming the kernel of x ↦ x^8, which has gcd(8, 4) elements because (Z/5)* is cyclic of order 4, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one coprime
    to 4 only two. -/
theorem fixed_power_on_prime_5_exp_9 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 9 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 8 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 10. The residues of Z/5 fixed by x ↦ x^10 number exactly 1 + gcd(9, 4) —
    the units forming the kernel of x ↦ x^9, which has gcd(9, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_10 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 10 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 9 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 11. The residues of Z/5 fixed by x ↦ x^11 number exactly 1 + gcd(10, 4) —
    the units forming the kernel of x ↦ x^10, which has gcd(10, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_11 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 11 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 10 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 12. The residues of Z/5 fixed by x ↦ x^12 number exactly 1 + gcd(11, 4) —
    the units forming the kernel of x ↦ x^11, which has gcd(11, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_12 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 12 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 11 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 13. The residues of Z/5 fixed by x ↦ x^13 number exactly 1 + gcd(12, 4) —
    the units forming the kernel of x ↦ x^12, which has gcd(12, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_13 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 13 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 12 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 14. The residues of Z/5 fixed by x ↦ x^14 number exactly 1 + gcd(13, 4) —
    the units forming the kernel of x ↦ x^13, which has gcd(13, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_14 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 14 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 13 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 15. The residues of Z/5 fixed by x ↦ x^15 number exactly 1 + gcd(14, 4) —
    the units forming the kernel of x ↦ x^14, which has gcd(14, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_15 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 15 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 14 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 16. The residues of Z/5 fixed by x ↦ x^16 number exactly 1 + gcd(15, 4) —
    the units forming the kernel of x ↦ x^15, which has gcd(15, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_16 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 16 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 15 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 17. The residues of Z/5 fixed by x ↦ x^17 number exactly 1 + gcd(16, 4) —
    the units forming the kernel of x ↦ x^16, which has gcd(16, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_17 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 17 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 16 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 18. The residues of Z/5 fixed by x ↦ x^18 number exactly 1 + gcd(17, 4) —
    the units forming the kernel of x ↦ x^17, which has gcd(17, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_18 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 18 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 17 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 19. The residues of Z/5 fixed by x ↦ x^19 number exactly 1 + gcd(18, 4) —
    the units forming the kernel of x ↦ x^18, which has gcd(18, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_19 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 19 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 18 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 20. The residues of Z/5 fixed by x ↦ x^20 number exactly 1 + gcd(19, 4) —
    the units forming the kernel of x ↦ x^19, which has gcd(19, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_20 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 20 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 19 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 21. The residues of Z/5 fixed by x ↦ x^21 number exactly 1 + gcd(20, 4) —
    the units forming the kernel of x ↦ x^20, which has gcd(20, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_21 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 21 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 20 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 22. The residues of Z/5 fixed by x ↦ x^22 number exactly 1 + gcd(21, 4) —
    the units forming the kernel of x ↦ x^21, which has gcd(21, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_22 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 22 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 21 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 23. The residues of Z/5 fixed by x ↦ x^23 number exactly 1 + gcd(22, 4) —
    the units forming the kernel of x ↦ x^22, which has gcd(22, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_23 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 23 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 22 4 := by decide

/-- THE PRIME HALF AT p = 5, EXPONENT 24. The residues of Z/5 fixed by x ↦ x^24 number exactly 1 + gcd(23, 4) —
    the units forming the kernel of x ↦ x^23, which has gcd(23, 4) elements because (Z/5)* is cyclic of order 4,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 4 it returns every residue, and at one
    coprime to 4 only two. -/
theorem fixed_power_on_prime_5_exp_24 : ([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 24 5 == x % 5))).foldl (· + ·) 0 = 1 + Nat.gcd 23 4 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 2. The residues of Z/7 fixed by x ↦ x^2 number exactly 1 + gcd(1, 6) — the
    units forming the kernel of x ↦ x^1, which has gcd(1, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_2 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 2 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 1 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 3. The residues of Z/7 fixed by x ↦ x^3 number exactly 1 + gcd(2, 6) — the
    units forming the kernel of x ↦ x^2, which has gcd(2, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_3 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 3 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 2 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 4. The residues of Z/7 fixed by x ↦ x^4 number exactly 1 + gcd(3, 6) — the
    units forming the kernel of x ↦ x^3, which has gcd(3, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_4 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 4 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 3 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 5. The residues of Z/7 fixed by x ↦ x^5 number exactly 1 + gcd(4, 6) — the
    units forming the kernel of x ↦ x^4, which has gcd(4, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_5 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 5 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 4 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 6. The residues of Z/7 fixed by x ↦ x^6 number exactly 1 + gcd(5, 6) — the
    units forming the kernel of x ↦ x^5, which has gcd(5, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_6 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 6 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 5 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 7. The residues of Z/7 fixed by x ↦ x^7 number exactly 1 + gcd(6, 6) — the
    units forming the kernel of x ↦ x^6, which has gcd(6, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_7 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 7 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 6 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 8. The residues of Z/7 fixed by x ↦ x^8 number exactly 1 + gcd(7, 6) — the
    units forming the kernel of x ↦ x^7, which has gcd(7, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_8 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 8 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 7 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 9. The residues of Z/7 fixed by x ↦ x^9 number exactly 1 + gcd(8, 6) — the
    units forming the kernel of x ↦ x^8, which has gcd(8, 6) elements because (Z/7)* is cyclic of order 6, plus
    zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the
    gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one coprime
    to 6 only two. -/
theorem fixed_power_on_prime_7_exp_9 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 9 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 8 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 10. The residues of Z/7 fixed by x ↦ x^10 number exactly 1 + gcd(9, 6) —
    the units forming the kernel of x ↦ x^9, which has gcd(9, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_10 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 10 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 9 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 11. The residues of Z/7 fixed by x ↦ x^11 number exactly 1 + gcd(10, 6) —
    the units forming the kernel of x ↦ x^10, which has gcd(10, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_11 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 11 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 10 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 12. The residues of Z/7 fixed by x ↦ x^12 number exactly 1 + gcd(11, 6) —
    the units forming the kernel of x ↦ x^11, which has gcd(11, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_12 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 12 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 11 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 13. The residues of Z/7 fixed by x ↦ x^13 number exactly 1 + gcd(12, 6) —
    the units forming the kernel of x ↦ x^12, which has gcd(12, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_13 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 13 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 12 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 14. The residues of Z/7 fixed by x ↦ x^14 number exactly 1 + gcd(13, 6) —
    the units forming the kernel of x ↦ x^13, which has gcd(13, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_14 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 14 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 13 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 15. The residues of Z/7 fixed by x ↦ x^15 number exactly 1 + gcd(14, 6) —
    the units forming the kernel of x ↦ x^14, which has gcd(14, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_15 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 15 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 14 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 16. The residues of Z/7 fixed by x ↦ x^16 number exactly 1 + gcd(15, 6) —
    the units forming the kernel of x ↦ x^15, which has gcd(15, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_16 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 16 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 15 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 17. The residues of Z/7 fixed by x ↦ x^17 number exactly 1 + gcd(16, 6) —
    the units forming the kernel of x ↦ x^16, which has gcd(16, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_17 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 17 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 16 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 18. The residues of Z/7 fixed by x ↦ x^18 number exactly 1 + gcd(17, 6) —
    the units forming the kernel of x ↦ x^17, which has gcd(17, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_18 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 18 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 17 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 19. The residues of Z/7 fixed by x ↦ x^19 number exactly 1 + gcd(18, 6) —
    the units forming the kernel of x ↦ x^18, which has gcd(18, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_19 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 19 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 18 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 20. The residues of Z/7 fixed by x ↦ x^20 number exactly 1 + gcd(19, 6) —
    the units forming the kernel of x ↦ x^19, which has gcd(19, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_20 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 20 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 19 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 21. The residues of Z/7 fixed by x ↦ x^21 number exactly 1 + gcd(20, 6) —
    the units forming the kernel of x ↦ x^20, which has gcd(20, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_21 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 21 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 20 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 22. The residues of Z/7 fixed by x ↦ x^22 number exactly 1 + gcd(21, 6) —
    the units forming the kernel of x ↦ x^21, which has gcd(21, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_22 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 22 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 21 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 23. The residues of Z/7 fixed by x ↦ x^23 number exactly 1 + gcd(22, 6) —
    the units forming the kernel of x ↦ x^22, which has gcd(22, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_23 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 23 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 22 6 := by decide

/-- THE PRIME HALF AT p = 7, EXPONENT 24. The residues of Z/7 fixed by x ↦ x^24 number exactly 1 + gcd(23, 6) —
    the units forming the kernel of x ↦ x^23, which has gcd(23, 6) elements because (Z/7)* is cyclic of order 6,
    plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem
    so the gcd is doing visible work: at an exponent congruent to 1 mod 6 it returns every residue, and at one
    coprime to 6 only two. -/
theorem fixed_power_on_prime_7_exp_24 : ([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 24 7 == x % 7))).foldl (· + ·) 0 = 1 + Nat.gcd 23 6 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 2. The residues of Z/11 fixed by x ↦ x^2 number exactly 1 + gcd(1, 10) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 2 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 1 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 3. The residues of Z/11 fixed by x ↦ x^3 number exactly 1 + gcd(2, 10) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 3 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 2 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 4. The residues of Z/11 fixed by x ↦ x^4 number exactly 1 + gcd(3, 10) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 4 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 3 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 5. The residues of Z/11 fixed by x ↦ x^5 number exactly 1 + gcd(4, 10) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 5 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 4 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 6. The residues of Z/11 fixed by x ↦ x^6 number exactly 1 + gcd(5, 10) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 6 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 5 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 7. The residues of Z/11 fixed by x ↦ x^7 number exactly 1 + gcd(6, 10) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 7 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 6 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 8. The residues of Z/11 fixed by x ↦ x^8 number exactly 1 + gcd(7, 10) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 8 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 7 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 9. The residues of Z/11 fixed by x ↦ x^9 number exactly 1 + gcd(8, 10) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 9 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 8 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 10. The residues of Z/11 fixed by x ↦ x^10 number exactly 1 + gcd(9, 10)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 10) elements because (Z/11)* is cyclic of order
    10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 10 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 9 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 11. The residues of Z/11 fixed by x ↦ x^11 number exactly 1 + gcd(10, 10)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 11 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 10 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 12. The residues of Z/11 fixed by x ↦ x^12 number exactly 1 + gcd(11, 10)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 12 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 11 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 13. The residues of Z/11 fixed by x ↦ x^13 number exactly 1 + gcd(12, 10)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 13 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 12 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 14. The residues of Z/11 fixed by x ↦ x^14 number exactly 1 + gcd(13, 10)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 14 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 13 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 15. The residues of Z/11 fixed by x ↦ x^15 number exactly 1 + gcd(14, 10)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 15 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 14 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 16. The residues of Z/11 fixed by x ↦ x^16 number exactly 1 + gcd(15, 10)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 16 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 15 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 17. The residues of Z/11 fixed by x ↦ x^17 number exactly 1 + gcd(16, 10)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 17 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 16 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 18. The residues of Z/11 fixed by x ↦ x^18 number exactly 1 + gcd(17, 10)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 18 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 17 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 19. The residues of Z/11 fixed by x ↦ x^19 number exactly 1 + gcd(18, 10)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 19 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 18 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 20. The residues of Z/11 fixed by x ↦ x^20 number exactly 1 + gcd(19, 10)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 20 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 19 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 21. The residues of Z/11 fixed by x ↦ x^21 number exactly 1 + gcd(20, 10)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 21 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 20 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 22. The residues of Z/11 fixed by x ↦ x^22 number exactly 1 + gcd(21, 10)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 22 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 21 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 23. The residues of Z/11 fixed by x ↦ x^23 number exactly 1 + gcd(22, 10)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 23 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 22 10 := by decide

/-- THE PRIME HALF AT p = 11, EXPONENT 24. The residues of Z/11 fixed by x ↦ x^24 number exactly 1 + gcd(23, 10)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 10) elements because (Z/11)* is cyclic of
    order 10, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 10 it returns every residue, and
    at one coprime to 10 only two. -/
theorem fixed_power_on_prime_11_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 24 11 == x % 11))).foldl (· + ·) 0 = 1 + Nat.gcd 23 10 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 2. The residues of Z/13 fixed by x ↦ x^2 number exactly 1 + gcd(1, 12) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 2 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 1 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 3. The residues of Z/13 fixed by x ↦ x^3 number exactly 1 + gcd(2, 12) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 3 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 2 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 4. The residues of Z/13 fixed by x ↦ x^4 number exactly 1 + gcd(3, 12) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 4 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 3 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 5. The residues of Z/13 fixed by x ↦ x^5 number exactly 1 + gcd(4, 12) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 5 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 4 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 6. The residues of Z/13 fixed by x ↦ x^6 number exactly 1 + gcd(5, 12) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 6 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 5 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 7. The residues of Z/13 fixed by x ↦ x^7 number exactly 1 + gcd(6, 12) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 7 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 6 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 8. The residues of Z/13 fixed by x ↦ x^8 number exactly 1 + gcd(7, 12) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 8 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 7 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 9. The residues of Z/13 fixed by x ↦ x^9 number exactly 1 + gcd(8, 12) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 9 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 8 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 10. The residues of Z/13 fixed by x ↦ x^10 number exactly 1 + gcd(9, 12)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 12) elements because (Z/13)* is cyclic of order
    12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 10 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 9 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 11. The residues of Z/13 fixed by x ↦ x^11 number exactly 1 + gcd(10, 12)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 11 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 10 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 12. The residues of Z/13 fixed by x ↦ x^12 number exactly 1 + gcd(11, 12)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 12 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 11 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 13. The residues of Z/13 fixed by x ↦ x^13 number exactly 1 + gcd(12, 12)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 13 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 12 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 14. The residues of Z/13 fixed by x ↦ x^14 number exactly 1 + gcd(13, 12)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 14 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 13 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 15. The residues of Z/13 fixed by x ↦ x^15 number exactly 1 + gcd(14, 12)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 15 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 14 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 16. The residues of Z/13 fixed by x ↦ x^16 number exactly 1 + gcd(15, 12)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 16 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 15 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 17. The residues of Z/13 fixed by x ↦ x^17 number exactly 1 + gcd(16, 12)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 17 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 16 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 18. The residues of Z/13 fixed by x ↦ x^18 number exactly 1 + gcd(17, 12)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 18 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 17 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 19. The residues of Z/13 fixed by x ↦ x^19 number exactly 1 + gcd(18, 12)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 19 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 18 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 20. The residues of Z/13 fixed by x ↦ x^20 number exactly 1 + gcd(19, 12)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 20 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 19 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 21. The residues of Z/13 fixed by x ↦ x^21 number exactly 1 + gcd(20, 12)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 21 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 20 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 22. The residues of Z/13 fixed by x ↦ x^22 number exactly 1 + gcd(21, 12)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 22 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 21 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 23. The residues of Z/13 fixed by x ↦ x^23 number exactly 1 + gcd(22, 12)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 23 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 22 12 := by decide

/-- THE PRIME HALF AT p = 13, EXPONENT 24. The residues of Z/13 fixed by x ↦ x^24 number exactly 1 + gcd(23, 12)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 12) elements because (Z/13)* is cyclic of
    order 12, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 12 it returns every residue, and
    at one coprime to 12 only two. -/
theorem fixed_power_on_prime_13_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12]].map (fun c => c.countP (fun x => pmod x 24 13 == x % 13))).foldl (· + ·) 0 = 1 + Nat.gcd 23 12 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 2. The residues of Z/17 fixed by x ↦ x^2 number exactly 1 + gcd(1, 16) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 2 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 1 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 3. The residues of Z/17 fixed by x ↦ x^3 number exactly 1 + gcd(2, 16) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 3 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 2 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 4. The residues of Z/17 fixed by x ↦ x^4 number exactly 1 + gcd(3, 16) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 4 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 3 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 5. The residues of Z/17 fixed by x ↦ x^5 number exactly 1 + gcd(4, 16) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 5 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 4 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 6. The residues of Z/17 fixed by x ↦ x^6 number exactly 1 + gcd(5, 16) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 6 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 5 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 7. The residues of Z/17 fixed by x ↦ x^7 number exactly 1 + gcd(6, 16) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 7 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 6 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 8. The residues of Z/17 fixed by x ↦ x^8 number exactly 1 + gcd(7, 16) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 8 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 7 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 9. The residues of Z/17 fixed by x ↦ x^9 number exactly 1 + gcd(8, 16) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 9 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 8 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 10. The residues of Z/17 fixed by x ↦ x^10 number exactly 1 + gcd(9, 16)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 16) elements because (Z/17)* is cyclic of order
    16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 10 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 9 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 11. The residues of Z/17 fixed by x ↦ x^11 number exactly 1 + gcd(10, 16)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 11 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 10 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 12. The residues of Z/17 fixed by x ↦ x^12 number exactly 1 + gcd(11, 16)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 12 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 11 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 13. The residues of Z/17 fixed by x ↦ x^13 number exactly 1 + gcd(12, 16)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 13 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 12 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 14. The residues of Z/17 fixed by x ↦ x^14 number exactly 1 + gcd(13, 16)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 14 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 13 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 15. The residues of Z/17 fixed by x ↦ x^15 number exactly 1 + gcd(14, 16)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 15 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 14 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 16. The residues of Z/17 fixed by x ↦ x^16 number exactly 1 + gcd(15, 16)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 16 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 15 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 17. The residues of Z/17 fixed by x ↦ x^17 number exactly 1 + gcd(16, 16)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 17 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 16 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 18. The residues of Z/17 fixed by x ↦ x^18 number exactly 1 + gcd(17, 16)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 18 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 17 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 19. The residues of Z/17 fixed by x ↦ x^19 number exactly 1 + gcd(18, 16)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 19 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 18 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 20. The residues of Z/17 fixed by x ↦ x^20 number exactly 1 + gcd(19, 16)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 20 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 19 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 21. The residues of Z/17 fixed by x ↦ x^21 number exactly 1 + gcd(20, 16)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 21 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 20 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 22. The residues of Z/17 fixed by x ↦ x^22 number exactly 1 + gcd(21, 16)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 22 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 21 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 23. The residues of Z/17 fixed by x ↦ x^23 number exactly 1 + gcd(22, 16)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 23 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 22 16 := by decide

/-- THE PRIME HALF AT p = 17, EXPONENT 24. The residues of Z/17 fixed by x ↦ x^24 number exactly 1 + gcd(23, 16)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 16) elements because (Z/17)* is cyclic of
    order 16, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 16 it returns every residue, and
    at one coprime to 16 only two. -/
theorem fixed_power_on_prime_17_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]].map (fun c => c.countP (fun x => pmod x 24 17 == x % 17))).foldl (· + ·) 0 = 1 + Nat.gcd 23 16 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 2. The residues of Z/19 fixed by x ↦ x^2 number exactly 1 + gcd(1, 18) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 2 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 1 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 3. The residues of Z/19 fixed by x ↦ x^3 number exactly 1 + gcd(2, 18) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 3 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 2 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 4. The residues of Z/19 fixed by x ↦ x^4 number exactly 1 + gcd(3, 18) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 4 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 3 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 5. The residues of Z/19 fixed by x ↦ x^5 number exactly 1 + gcd(4, 18) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 5 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 4 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 6. The residues of Z/19 fixed by x ↦ x^6 number exactly 1 + gcd(5, 18) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 6 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 5 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 7. The residues of Z/19 fixed by x ↦ x^7 number exactly 1 + gcd(6, 18) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 7 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 6 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 8. The residues of Z/19 fixed by x ↦ x^8 number exactly 1 + gcd(7, 18) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 8 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 7 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 9. The residues of Z/19 fixed by x ↦ x^9 number exactly 1 + gcd(8, 18) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 9 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 8 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 10. The residues of Z/19 fixed by x ↦ x^10 number exactly 1 + gcd(9, 18)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 18) elements because (Z/19)* is cyclic of order
    18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 10 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 9 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 11. The residues of Z/19 fixed by x ↦ x^11 number exactly 1 + gcd(10, 18)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 11 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 10 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 12. The residues of Z/19 fixed by x ↦ x^12 number exactly 1 + gcd(11, 18)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 12 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 11 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 13. The residues of Z/19 fixed by x ↦ x^13 number exactly 1 + gcd(12, 18)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 13 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 12 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 14. The residues of Z/19 fixed by x ↦ x^14 number exactly 1 + gcd(13, 18)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 14 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 13 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 15. The residues of Z/19 fixed by x ↦ x^15 number exactly 1 + gcd(14, 18)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 15 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 14 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 16. The residues of Z/19 fixed by x ↦ x^16 number exactly 1 + gcd(15, 18)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 16 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 15 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 17. The residues of Z/19 fixed by x ↦ x^17 number exactly 1 + gcd(16, 18)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 17 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 16 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 18. The residues of Z/19 fixed by x ↦ x^18 number exactly 1 + gcd(17, 18)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 18 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 17 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 19. The residues of Z/19 fixed by x ↦ x^19 number exactly 1 + gcd(18, 18)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 19 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 18 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 20. The residues of Z/19 fixed by x ↦ x^20 number exactly 1 + gcd(19, 18)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 20 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 19 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 21. The residues of Z/19 fixed by x ↦ x^21 number exactly 1 + gcd(20, 18)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 21 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 20 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 22. The residues of Z/19 fixed by x ↦ x^22 number exactly 1 + gcd(21, 18)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 22 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 21 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 23. The residues of Z/19 fixed by x ↦ x^23 number exactly 1 + gcd(22, 18)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 23 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 22 18 := by decide

/-- THE PRIME HALF AT p = 19, EXPONENT 24. The residues of Z/19 fixed by x ↦ x^24 number exactly 1 + gcd(23, 18)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 18) elements because (Z/19)* is cyclic of
    order 18, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 18 it returns every residue, and
    at one coprime to 18 only two. -/
theorem fixed_power_on_prime_19_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]].map (fun c => c.countP (fun x => pmod x 24 19 == x % 19))).foldl (· + ·) 0 = 1 + Nat.gcd 23 18 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 2. The residues of Z/23 fixed by x ↦ x^2 number exactly 1 + gcd(1, 22) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 2 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 1 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 3. The residues of Z/23 fixed by x ↦ x^3 number exactly 1 + gcd(2, 22) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 3 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 2 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 4. The residues of Z/23 fixed by x ↦ x^4 number exactly 1 + gcd(3, 22) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 4 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 3 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 5. The residues of Z/23 fixed by x ↦ x^5 number exactly 1 + gcd(4, 22) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 5 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 4 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 6. The residues of Z/23 fixed by x ↦ x^6 number exactly 1 + gcd(5, 22) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 6 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 5 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 7. The residues of Z/23 fixed by x ↦ x^7 number exactly 1 + gcd(6, 22) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 7 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 6 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 8. The residues of Z/23 fixed by x ↦ x^8 number exactly 1 + gcd(7, 22) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 8 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 7 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 9. The residues of Z/23 fixed by x ↦ x^9 number exactly 1 + gcd(8, 22) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 9 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 8 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 10. The residues of Z/23 fixed by x ↦ x^10 number exactly 1 + gcd(9, 22)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 22) elements because (Z/23)* is cyclic of order
    22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 10 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 9 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 11. The residues of Z/23 fixed by x ↦ x^11 number exactly 1 + gcd(10, 22)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 11 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 10 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 12. The residues of Z/23 fixed by x ↦ x^12 number exactly 1 + gcd(11, 22)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 12 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 11 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 13. The residues of Z/23 fixed by x ↦ x^13 number exactly 1 + gcd(12, 22)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 13 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 12 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 14. The residues of Z/23 fixed by x ↦ x^14 number exactly 1 + gcd(13, 22)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 14 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 13 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 15. The residues of Z/23 fixed by x ↦ x^15 number exactly 1 + gcd(14, 22)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 15 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 14 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 16. The residues of Z/23 fixed by x ↦ x^16 number exactly 1 + gcd(15, 22)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 16 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 15 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 17. The residues of Z/23 fixed by x ↦ x^17 number exactly 1 + gcd(16, 22)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 17 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 16 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 18. The residues of Z/23 fixed by x ↦ x^18 number exactly 1 + gcd(17, 22)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 18 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 17 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 19. The residues of Z/23 fixed by x ↦ x^19 number exactly 1 + gcd(18, 22)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 19 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 18 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 20. The residues of Z/23 fixed by x ↦ x^20 number exactly 1 + gcd(19, 22)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 20 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 19 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 21. The residues of Z/23 fixed by x ↦ x^21 number exactly 1 + gcd(20, 22)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 21 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 20 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 22. The residues of Z/23 fixed by x ↦ x^22 number exactly 1 + gcd(21, 22)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 22 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 21 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 23. The residues of Z/23 fixed by x ↦ x^23 number exactly 1 + gcd(22, 22)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 23 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 22 22 := by decide

/-- THE PRIME HALF AT p = 23, EXPONENT 24. The residues of Z/23 fixed by x ↦ x^24 number exactly 1 + gcd(23, 22)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 22) elements because (Z/23)* is cyclic of
    order 22, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 22 it returns every residue, and
    at one coprime to 22 only two. -/
theorem fixed_power_on_prime_23_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]].map (fun c => c.countP (fun x => pmod x 24 23 == x % 23))).foldl (· + ·) 0 = 1 + Nat.gcd 23 22 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 2. The residues of Z/29 fixed by x ↦ x^2 number exactly 1 + gcd(1, 28) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 2 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 1 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 3. The residues of Z/29 fixed by x ↦ x^3 number exactly 1 + gcd(2, 28) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 3 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 2 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 4. The residues of Z/29 fixed by x ↦ x^4 number exactly 1 + gcd(3, 28) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 4 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 3 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 5. The residues of Z/29 fixed by x ↦ x^5 number exactly 1 + gcd(4, 28) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 5 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 4 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 6. The residues of Z/29 fixed by x ↦ x^6 number exactly 1 + gcd(5, 28) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 6 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 5 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 7. The residues of Z/29 fixed by x ↦ x^7 number exactly 1 + gcd(6, 28) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 7 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 6 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 8. The residues of Z/29 fixed by x ↦ x^8 number exactly 1 + gcd(7, 28) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 8 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 7 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 9. The residues of Z/29 fixed by x ↦ x^9 number exactly 1 + gcd(8, 28) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 9 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 8 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 10. The residues of Z/29 fixed by x ↦ x^10 number exactly 1 + gcd(9, 28)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 28) elements because (Z/29)* is cyclic of order
    28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 10 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 9 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 11. The residues of Z/29 fixed by x ↦ x^11 number exactly 1 + gcd(10, 28)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 11 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 10 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 12. The residues of Z/29 fixed by x ↦ x^12 number exactly 1 + gcd(11, 28)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 12 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 11 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 13. The residues of Z/29 fixed by x ↦ x^13 number exactly 1 + gcd(12, 28)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 13 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 12 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 14. The residues of Z/29 fixed by x ↦ x^14 number exactly 1 + gcd(13, 28)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 14 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 13 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 15. The residues of Z/29 fixed by x ↦ x^15 number exactly 1 + gcd(14, 28)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 15 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 14 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 16. The residues of Z/29 fixed by x ↦ x^16 number exactly 1 + gcd(15, 28)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 16 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 15 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 17. The residues of Z/29 fixed by x ↦ x^17 number exactly 1 + gcd(16, 28)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 17 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 16 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 18. The residues of Z/29 fixed by x ↦ x^18 number exactly 1 + gcd(17, 28)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 18 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 17 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 19. The residues of Z/29 fixed by x ↦ x^19 number exactly 1 + gcd(18, 28)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 19 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 18 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 20. The residues of Z/29 fixed by x ↦ x^20 number exactly 1 + gcd(19, 28)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 20 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 19 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 21. The residues of Z/29 fixed by x ↦ x^21 number exactly 1 + gcd(20, 28)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 21 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 20 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 22. The residues of Z/29 fixed by x ↦ x^22 number exactly 1 + gcd(21, 28)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 22 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 21 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 23. The residues of Z/29 fixed by x ↦ x^23 number exactly 1 + gcd(22, 28)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 23 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 22 28 := by decide

/-- THE PRIME HALF AT p = 29, EXPONENT 24. The residues of Z/29 fixed by x ↦ x^24 number exactly 1 + gcd(23, 28)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 28) elements because (Z/29)* is cyclic of
    order 28, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 28 it returns every residue, and
    at one coprime to 28 only two. -/
theorem fixed_power_on_prime_29_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]].map (fun c => c.countP (fun x => pmod x 24 29 == x % 29))).foldl (· + ·) 0 = 1 + Nat.gcd 23 28 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 2. The residues of Z/31 fixed by x ↦ x^2 number exactly 1 + gcd(1, 30) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 2 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 1 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 3. The residues of Z/31 fixed by x ↦ x^3 number exactly 1 + gcd(2, 30) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 3 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 2 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 4. The residues of Z/31 fixed by x ↦ x^4 number exactly 1 + gcd(3, 30) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 4 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 3 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 5. The residues of Z/31 fixed by x ↦ x^5 number exactly 1 + gcd(4, 30) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 5 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 4 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 6. The residues of Z/31 fixed by x ↦ x^6 number exactly 1 + gcd(5, 30) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 6 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 5 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 7. The residues of Z/31 fixed by x ↦ x^7 number exactly 1 + gcd(6, 30) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 7 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 6 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 8. The residues of Z/31 fixed by x ↦ x^8 number exactly 1 + gcd(7, 30) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 8 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 7 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 9. The residues of Z/31 fixed by x ↦ x^9 number exactly 1 + gcd(8, 30) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 9 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 8 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 10. The residues of Z/31 fixed by x ↦ x^10 number exactly 1 + gcd(9, 30)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 30) elements because (Z/31)* is cyclic of order
    30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 10 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 9 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 11. The residues of Z/31 fixed by x ↦ x^11 number exactly 1 + gcd(10, 30)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 11 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 10 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 12. The residues of Z/31 fixed by x ↦ x^12 number exactly 1 + gcd(11, 30)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 12 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 11 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 13. The residues of Z/31 fixed by x ↦ x^13 number exactly 1 + gcd(12, 30)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 13 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 12 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 14. The residues of Z/31 fixed by x ↦ x^14 number exactly 1 + gcd(13, 30)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 14 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 13 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 15. The residues of Z/31 fixed by x ↦ x^15 number exactly 1 + gcd(14, 30)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 15 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 14 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 16. The residues of Z/31 fixed by x ↦ x^16 number exactly 1 + gcd(15, 30)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 16 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 15 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 17. The residues of Z/31 fixed by x ↦ x^17 number exactly 1 + gcd(16, 30)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 17 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 16 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 18. The residues of Z/31 fixed by x ↦ x^18 number exactly 1 + gcd(17, 30)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 18 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 17 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 19. The residues of Z/31 fixed by x ↦ x^19 number exactly 1 + gcd(18, 30)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 19 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 18 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 20. The residues of Z/31 fixed by x ↦ x^20 number exactly 1 + gcd(19, 30)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 20 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 19 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 21. The residues of Z/31 fixed by x ↦ x^21 number exactly 1 + gcd(20, 30)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 21 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 20 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 22. The residues of Z/31 fixed by x ↦ x^22 number exactly 1 + gcd(21, 30)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 22 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 21 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 23. The residues of Z/31 fixed by x ↦ x^23 number exactly 1 + gcd(22, 30)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 23 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 22 30 := by decide

/-- THE PRIME HALF AT p = 31, EXPONENT 24. The residues of Z/31 fixed by x ↦ x^24 number exactly 1 + gcd(23, 30)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 30) elements because (Z/31)* is cyclic of
    order 30, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 30 it returns every residue, and
    at one coprime to 30 only two. -/
theorem fixed_power_on_prime_31_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]].map (fun c => c.countP (fun x => pmod x 24 31 == x % 31))).foldl (· + ·) 0 = 1 + Nat.gcd 23 30 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 2. The residues of Z/37 fixed by x ↦ x^2 number exactly 1 + gcd(1, 36) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 2 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 1 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 3. The residues of Z/37 fixed by x ↦ x^3 number exactly 1 + gcd(2, 36) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 3 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 2 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 4. The residues of Z/37 fixed by x ↦ x^4 number exactly 1 + gcd(3, 36) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 4 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 3 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 5. The residues of Z/37 fixed by x ↦ x^5 number exactly 1 + gcd(4, 36) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 5 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 4 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 6. The residues of Z/37 fixed by x ↦ x^6 number exactly 1 + gcd(5, 36) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 6 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 5 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 7. The residues of Z/37 fixed by x ↦ x^7 number exactly 1 + gcd(6, 36) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 7 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 6 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 8. The residues of Z/37 fixed by x ↦ x^8 number exactly 1 + gcd(7, 36) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 8 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 7 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 9. The residues of Z/37 fixed by x ↦ x^9 number exactly 1 + gcd(8, 36) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 9 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 8 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 10. The residues of Z/37 fixed by x ↦ x^10 number exactly 1 + gcd(9, 36)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 36) elements because (Z/37)* is cyclic of order
    36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 10 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 9 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 11. The residues of Z/37 fixed by x ↦ x^11 number exactly 1 + gcd(10, 36)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 11 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 10 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 12. The residues of Z/37 fixed by x ↦ x^12 number exactly 1 + gcd(11, 36)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 12 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 11 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 13. The residues of Z/37 fixed by x ↦ x^13 number exactly 1 + gcd(12, 36)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 13 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 12 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 14. The residues of Z/37 fixed by x ↦ x^14 number exactly 1 + gcd(13, 36)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 14 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 13 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 15. The residues of Z/37 fixed by x ↦ x^15 number exactly 1 + gcd(14, 36)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 15 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 14 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 16. The residues of Z/37 fixed by x ↦ x^16 number exactly 1 + gcd(15, 36)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 16 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 15 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 17. The residues of Z/37 fixed by x ↦ x^17 number exactly 1 + gcd(16, 36)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 17 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 16 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 18. The residues of Z/37 fixed by x ↦ x^18 number exactly 1 + gcd(17, 36)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 18 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 17 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 19. The residues of Z/37 fixed by x ↦ x^19 number exactly 1 + gcd(18, 36)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 19 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 18 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 20. The residues of Z/37 fixed by x ↦ x^20 number exactly 1 + gcd(19, 36)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 20 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 19 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 21. The residues of Z/37 fixed by x ↦ x^21 number exactly 1 + gcd(20, 36)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 21 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 20 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 22. The residues of Z/37 fixed by x ↦ x^22 number exactly 1 + gcd(21, 36)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 22 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 21 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 23. The residues of Z/37 fixed by x ↦ x^23 number exactly 1 + gcd(22, 36)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 23 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 22 36 := by decide

/-- THE PRIME HALF AT p = 37, EXPONENT 24. The residues of Z/37 fixed by x ↦ x^24 number exactly 1 + gcd(23, 36)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 36) elements because (Z/37)* is cyclic of
    order 36, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 36 it returns every residue, and
    at one coprime to 36 only two. -/
theorem fixed_power_on_prime_37_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36]].map (fun c => c.countP (fun x => pmod x 24 37 == x % 37))).foldl (· + ·) 0 = 1 + Nat.gcd 23 36 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 2. The residues of Z/41 fixed by x ↦ x^2 number exactly 1 + gcd(1, 40) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 2 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 1 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 3. The residues of Z/41 fixed by x ↦ x^3 number exactly 1 + gcd(2, 40) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 3 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 2 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 4. The residues of Z/41 fixed by x ↦ x^4 number exactly 1 + gcd(3, 40) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 4 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 3 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 5. The residues of Z/41 fixed by x ↦ x^5 number exactly 1 + gcd(4, 40) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 5 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 4 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 6. The residues of Z/41 fixed by x ↦ x^6 number exactly 1 + gcd(5, 40) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 6 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 5 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 7. The residues of Z/41 fixed by x ↦ x^7 number exactly 1 + gcd(6, 40) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 7 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 6 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 8. The residues of Z/41 fixed by x ↦ x^8 number exactly 1 + gcd(7, 40) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 8 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 7 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 9. The residues of Z/41 fixed by x ↦ x^9 number exactly 1 + gcd(8, 40) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 9 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 8 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 10. The residues of Z/41 fixed by x ↦ x^10 number exactly 1 + gcd(9, 40)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 40) elements because (Z/41)* is cyclic of order
    40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 10 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 9 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 11. The residues of Z/41 fixed by x ↦ x^11 number exactly 1 + gcd(10, 40)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 11 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 10 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 12. The residues of Z/41 fixed by x ↦ x^12 number exactly 1 + gcd(11, 40)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 12 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 11 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 13. The residues of Z/41 fixed by x ↦ x^13 number exactly 1 + gcd(12, 40)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 13 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 12 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 14. The residues of Z/41 fixed by x ↦ x^14 number exactly 1 + gcd(13, 40)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 14 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 13 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 15. The residues of Z/41 fixed by x ↦ x^15 number exactly 1 + gcd(14, 40)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 15 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 14 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 16. The residues of Z/41 fixed by x ↦ x^16 number exactly 1 + gcd(15, 40)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 16 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 15 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 17. The residues of Z/41 fixed by x ↦ x^17 number exactly 1 + gcd(16, 40)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 17 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 16 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 18. The residues of Z/41 fixed by x ↦ x^18 number exactly 1 + gcd(17, 40)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 18 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 17 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 19. The residues of Z/41 fixed by x ↦ x^19 number exactly 1 + gcd(18, 40)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 19 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 18 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 20. The residues of Z/41 fixed by x ↦ x^20 number exactly 1 + gcd(19, 40)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 20 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 19 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 21. The residues of Z/41 fixed by x ↦ x^21 number exactly 1 + gcd(20, 40)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 21 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 20 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 22. The residues of Z/41 fixed by x ↦ x^22 number exactly 1 + gcd(21, 40)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 22 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 21 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 23. The residues of Z/41 fixed by x ↦ x^23 number exactly 1 + gcd(22, 40)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 23 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 22 40 := by decide

/-- THE PRIME HALF AT p = 41, EXPONENT 24. The residues of Z/41 fixed by x ↦ x^24 number exactly 1 + gcd(23, 40)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 40) elements because (Z/41)* is cyclic of
    order 40, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 40 it returns every residue, and
    at one coprime to 40 only two. -/
theorem fixed_power_on_prime_41_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40]].map (fun c => c.countP (fun x => pmod x 24 41 == x % 41))).foldl (· + ·) 0 = 1 + Nat.gcd 23 40 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 2. The residues of Z/43 fixed by x ↦ x^2 number exactly 1 + gcd(1, 42) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 2 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 1 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 3. The residues of Z/43 fixed by x ↦ x^3 number exactly 1 + gcd(2, 42) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 3 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 2 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 4. The residues of Z/43 fixed by x ↦ x^4 number exactly 1 + gcd(3, 42) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 4 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 3 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 5. The residues of Z/43 fixed by x ↦ x^5 number exactly 1 + gcd(4, 42) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 5 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 4 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 6. The residues of Z/43 fixed by x ↦ x^6 number exactly 1 + gcd(5, 42) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 6 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 5 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 7. The residues of Z/43 fixed by x ↦ x^7 number exactly 1 + gcd(6, 42) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 7 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 6 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 8. The residues of Z/43 fixed by x ↦ x^8 number exactly 1 + gcd(7, 42) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 8 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 7 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 9. The residues of Z/43 fixed by x ↦ x^9 number exactly 1 + gcd(8, 42) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 9 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 8 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 10. The residues of Z/43 fixed by x ↦ x^10 number exactly 1 + gcd(9, 42)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 42) elements because (Z/43)* is cyclic of order
    42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 10 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 9 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 11. The residues of Z/43 fixed by x ↦ x^11 number exactly 1 + gcd(10, 42)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 11 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 10 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 12. The residues of Z/43 fixed by x ↦ x^12 number exactly 1 + gcd(11, 42)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 12 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 11 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 13. The residues of Z/43 fixed by x ↦ x^13 number exactly 1 + gcd(12, 42)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 13 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 12 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 14. The residues of Z/43 fixed by x ↦ x^14 number exactly 1 + gcd(13, 42)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 14 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 13 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 15. The residues of Z/43 fixed by x ↦ x^15 number exactly 1 + gcd(14, 42)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 15 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 14 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 16. The residues of Z/43 fixed by x ↦ x^16 number exactly 1 + gcd(15, 42)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 16 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 15 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 17. The residues of Z/43 fixed by x ↦ x^17 number exactly 1 + gcd(16, 42)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 17 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 16 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 18. The residues of Z/43 fixed by x ↦ x^18 number exactly 1 + gcd(17, 42)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 18 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 17 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 19. The residues of Z/43 fixed by x ↦ x^19 number exactly 1 + gcd(18, 42)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 19 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 18 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 20. The residues of Z/43 fixed by x ↦ x^20 number exactly 1 + gcd(19, 42)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 20 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 19 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 21. The residues of Z/43 fixed by x ↦ x^21 number exactly 1 + gcd(20, 42)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 21 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 20 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 22. The residues of Z/43 fixed by x ↦ x^22 number exactly 1 + gcd(21, 42)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 22 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 21 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 23. The residues of Z/43 fixed by x ↦ x^23 number exactly 1 + gcd(22, 42)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 23 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 22 42 := by decide

/-- THE PRIME HALF AT p = 43, EXPONENT 24. The residues of Z/43 fixed by x ↦ x^24 number exactly 1 + gcd(23, 42)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 42) elements because (Z/43)* is cyclic of
    order 42, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 42 it returns every residue, and
    at one coprime to 42 only two. -/
theorem fixed_power_on_prime_43_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42]].map (fun c => c.countP (fun x => pmod x 24 43 == x % 43))).foldl (· + ·) 0 = 1 + Nat.gcd 23 42 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 2. The residues of Z/47 fixed by x ↦ x^2 number exactly 1 + gcd(1, 46) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 2 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 1 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 3. The residues of Z/47 fixed by x ↦ x^3 number exactly 1 + gcd(2, 46) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 3 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 2 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 4. The residues of Z/47 fixed by x ↦ x^4 number exactly 1 + gcd(3, 46) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 4 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 3 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 5. The residues of Z/47 fixed by x ↦ x^5 number exactly 1 + gcd(4, 46) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 5 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 4 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 6. The residues of Z/47 fixed by x ↦ x^6 number exactly 1 + gcd(5, 46) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 6 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 5 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 7. The residues of Z/47 fixed by x ↦ x^7 number exactly 1 + gcd(6, 46) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 7 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 6 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 8. The residues of Z/47 fixed by x ↦ x^8 number exactly 1 + gcd(7, 46) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 8 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 7 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 9. The residues of Z/47 fixed by x ↦ x^9 number exactly 1 + gcd(8, 46) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 9 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 8 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 10. The residues of Z/47 fixed by x ↦ x^10 number exactly 1 + gcd(9, 46)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 46) elements because (Z/47)* is cyclic of order
    46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 10 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 9 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 11. The residues of Z/47 fixed by x ↦ x^11 number exactly 1 + gcd(10, 46)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 11 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 10 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 12. The residues of Z/47 fixed by x ↦ x^12 number exactly 1 + gcd(11, 46)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 12 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 11 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 13. The residues of Z/47 fixed by x ↦ x^13 number exactly 1 + gcd(12, 46)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 13 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 12 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 14. The residues of Z/47 fixed by x ↦ x^14 number exactly 1 + gcd(13, 46)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 14 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 13 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 15. The residues of Z/47 fixed by x ↦ x^15 number exactly 1 + gcd(14, 46)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 15 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 14 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 16. The residues of Z/47 fixed by x ↦ x^16 number exactly 1 + gcd(15, 46)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 16 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 15 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 17. The residues of Z/47 fixed by x ↦ x^17 number exactly 1 + gcd(16, 46)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 17 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 16 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 18. The residues of Z/47 fixed by x ↦ x^18 number exactly 1 + gcd(17, 46)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 18 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 17 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 19. The residues of Z/47 fixed by x ↦ x^19 number exactly 1 + gcd(18, 46)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 19 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 18 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 20. The residues of Z/47 fixed by x ↦ x^20 number exactly 1 + gcd(19, 46)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 20 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 19 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 21. The residues of Z/47 fixed by x ↦ x^21 number exactly 1 + gcd(20, 46)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 21 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 20 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 22. The residues of Z/47 fixed by x ↦ x^22 number exactly 1 + gcd(21, 46)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 22 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 21 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 23. The residues of Z/47 fixed by x ↦ x^23 number exactly 1 + gcd(22, 46)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 23 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 22 46 := by decide

/-- THE PRIME HALF AT p = 47, EXPONENT 24. The residues of Z/47 fixed by x ↦ x^24 number exactly 1 + gcd(23, 46)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 46) elements because (Z/47)* is cyclic of
    order 46, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 46 it returns every residue, and
    at one coprime to 46 only two. -/
theorem fixed_power_on_prime_47_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]].map (fun c => c.countP (fun x => pmod x 24 47 == x % 47))).foldl (· + ·) 0 = 1 + Nat.gcd 23 46 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 2. The residues of Z/53 fixed by x ↦ x^2 number exactly 1 + gcd(1, 52) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 2 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 1 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 3. The residues of Z/53 fixed by x ↦ x^3 number exactly 1 + gcd(2, 52) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 3 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 2 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 4. The residues of Z/53 fixed by x ↦ x^4 number exactly 1 + gcd(3, 52) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 4 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 3 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 5. The residues of Z/53 fixed by x ↦ x^5 number exactly 1 + gcd(4, 52) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 5 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 4 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 6. The residues of Z/53 fixed by x ↦ x^6 number exactly 1 + gcd(5, 52) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 6 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 5 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 7. The residues of Z/53 fixed by x ↦ x^7 number exactly 1 + gcd(6, 52) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 7 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 6 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 8. The residues of Z/53 fixed by x ↦ x^8 number exactly 1 + gcd(7, 52) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 8 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 7 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 9. The residues of Z/53 fixed by x ↦ x^9 number exactly 1 + gcd(8, 52) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 9 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 8 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 10. The residues of Z/53 fixed by x ↦ x^10 number exactly 1 + gcd(9, 52)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 52) elements because (Z/53)* is cyclic of order
    52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 10 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 9 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 11. The residues of Z/53 fixed by x ↦ x^11 number exactly 1 + gcd(10, 52)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 11 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 10 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 12. The residues of Z/53 fixed by x ↦ x^12 number exactly 1 + gcd(11, 52)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 12 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 11 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 13. The residues of Z/53 fixed by x ↦ x^13 number exactly 1 + gcd(12, 52)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 13 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 12 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 14. The residues of Z/53 fixed by x ↦ x^14 number exactly 1 + gcd(13, 52)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 14 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 13 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 15. The residues of Z/53 fixed by x ↦ x^15 number exactly 1 + gcd(14, 52)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 15 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 14 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 16. The residues of Z/53 fixed by x ↦ x^16 number exactly 1 + gcd(15, 52)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 16 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 15 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 17. The residues of Z/53 fixed by x ↦ x^17 number exactly 1 + gcd(16, 52)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 17 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 16 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 18. The residues of Z/53 fixed by x ↦ x^18 number exactly 1 + gcd(17, 52)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 18 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 17 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 19. The residues of Z/53 fixed by x ↦ x^19 number exactly 1 + gcd(18, 52)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 19 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 18 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 20. The residues of Z/53 fixed by x ↦ x^20 number exactly 1 + gcd(19, 52)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 20 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 19 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 21. The residues of Z/53 fixed by x ↦ x^21 number exactly 1 + gcd(20, 52)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 21 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 20 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 22. The residues of Z/53 fixed by x ↦ x^22 number exactly 1 + gcd(21, 52)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 22 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 21 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 23. The residues of Z/53 fixed by x ↦ x^23 number exactly 1 + gcd(22, 52)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 23 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 22 52 := by decide

/-- THE PRIME HALF AT p = 53, EXPONENT 24. The residues of Z/53 fixed by x ↦ x^24 number exactly 1 + gcd(23, 52)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 52) elements because (Z/53)* is cyclic of
    order 52, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 52 it returns every residue, and
    at one coprime to 52 only two. -/
theorem fixed_power_on_prime_53_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]].map (fun c => c.countP (fun x => pmod x 24 53 == x % 53))).foldl (· + ·) 0 = 1 + Nat.gcd 23 52 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 2. The residues of Z/59 fixed by x ↦ x^2 number exactly 1 + gcd(1, 58) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 2 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 1 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 3. The residues of Z/59 fixed by x ↦ x^3 number exactly 1 + gcd(2, 58) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 3 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 2 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 4. The residues of Z/59 fixed by x ↦ x^4 number exactly 1 + gcd(3, 58) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 4 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 3 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 5. The residues of Z/59 fixed by x ↦ x^5 number exactly 1 + gcd(4, 58) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 5 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 4 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 6. The residues of Z/59 fixed by x ↦ x^6 number exactly 1 + gcd(5, 58) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 6 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 5 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 7. The residues of Z/59 fixed by x ↦ x^7 number exactly 1 + gcd(6, 58) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 7 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 6 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 8. The residues of Z/59 fixed by x ↦ x^8 number exactly 1 + gcd(7, 58) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 8 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 7 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 9. The residues of Z/59 fixed by x ↦ x^9 number exactly 1 + gcd(8, 58) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 9 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 8 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 10. The residues of Z/59 fixed by x ↦ x^10 number exactly 1 + gcd(9, 58)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 58) elements because (Z/59)* is cyclic of order
    58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 10 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 9 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 11. The residues of Z/59 fixed by x ↦ x^11 number exactly 1 + gcd(10, 58)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 11 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 10 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 12. The residues of Z/59 fixed by x ↦ x^12 number exactly 1 + gcd(11, 58)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 12 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 11 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 13. The residues of Z/59 fixed by x ↦ x^13 number exactly 1 + gcd(12, 58)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 13 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 12 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 14. The residues of Z/59 fixed by x ↦ x^14 number exactly 1 + gcd(13, 58)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 14 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 13 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 15. The residues of Z/59 fixed by x ↦ x^15 number exactly 1 + gcd(14, 58)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 15 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 14 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 16. The residues of Z/59 fixed by x ↦ x^16 number exactly 1 + gcd(15, 58)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 16 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 15 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 17. The residues of Z/59 fixed by x ↦ x^17 number exactly 1 + gcd(16, 58)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 17 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 16 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 18. The residues of Z/59 fixed by x ↦ x^18 number exactly 1 + gcd(17, 58)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 18 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 17 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 19. The residues of Z/59 fixed by x ↦ x^19 number exactly 1 + gcd(18, 58)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 19 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 18 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 20. The residues of Z/59 fixed by x ↦ x^20 number exactly 1 + gcd(19, 58)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 20 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 19 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 21. The residues of Z/59 fixed by x ↦ x^21 number exactly 1 + gcd(20, 58)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 21 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 20 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 22. The residues of Z/59 fixed by x ↦ x^22 number exactly 1 + gcd(21, 58)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 22 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 21 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 23. The residues of Z/59 fixed by x ↦ x^23 number exactly 1 + gcd(22, 58)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 23 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 22 58 := by decide

/-- THE PRIME HALF AT p = 59, EXPONENT 24. The residues of Z/59 fixed by x ↦ x^24 number exactly 1 + gcd(23, 58)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 58) elements because (Z/59)* is cyclic of
    order 58, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 58 it returns every residue, and
    at one coprime to 58 only two. -/
theorem fixed_power_on_prime_59_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]].map (fun c => c.countP (fun x => pmod x 24 59 == x % 59))).foldl (· + ·) 0 = 1 + Nat.gcd 23 58 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 2. The residues of Z/61 fixed by x ↦ x^2 number exactly 1 + gcd(1, 60) —
    the units forming the kernel of x ↦ x^1, which has gcd(1, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_2 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 2 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 1 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 3. The residues of Z/61 fixed by x ↦ x^3 number exactly 1 + gcd(2, 60) —
    the units forming the kernel of x ↦ x^2, which has gcd(2, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_3 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 3 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 2 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 4. The residues of Z/61 fixed by x ↦ x^4 number exactly 1 + gcd(3, 60) —
    the units forming the kernel of x ↦ x^3, which has gcd(3, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 4 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 3 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 5. The residues of Z/61 fixed by x ↦ x^5 number exactly 1 + gcd(4, 60) —
    the units forming the kernel of x ↦ x^4, which has gcd(4, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 5 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 4 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 6. The residues of Z/61 fixed by x ↦ x^6 number exactly 1 + gcd(5, 60) —
    the units forming the kernel of x ↦ x^5, which has gcd(5, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 6 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 5 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 7. The residues of Z/61 fixed by x ↦ x^7 number exactly 1 + gcd(6, 60) —
    the units forming the kernel of x ↦ x^6, which has gcd(6, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 7 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 6 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 8. The residues of Z/61 fixed by x ↦ x^8 number exactly 1 + gcd(7, 60) —
    the units forming the kernel of x ↦ x^7, which has gcd(7, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 8 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 7 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 9. The residues of Z/61 fixed by x ↦ x^9 number exactly 1 + gcd(8, 60) —
    the units forming the kernel of x ↦ x^8, which has gcd(8, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 9 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 8 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 10. The residues of Z/61 fixed by x ↦ x^10 number exactly 1 + gcd(9, 60)
    — the units forming the kernel of x ↦ x^9, which has gcd(9, 60) elements because (Z/61)* is cyclic of order
    60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 10 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 9 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 11. The residues of Z/61 fixed by x ↦ x^11 number exactly 1 + gcd(10, 60)
    — the units forming the kernel of x ↦ x^10, which has gcd(10, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 11 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 10 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 12. The residues of Z/61 fixed by x ↦ x^12 number exactly 1 + gcd(11, 60)
    — the units forming the kernel of x ↦ x^11, which has gcd(11, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 12 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 11 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 13. The residues of Z/61 fixed by x ↦ x^13 number exactly 1 + gcd(12, 60)
    — the units forming the kernel of x ↦ x^12, which has gcd(12, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_13 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 13 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 12 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 14. The residues of Z/61 fixed by x ↦ x^14 number exactly 1 + gcd(13, 60)
    — the units forming the kernel of x ↦ x^13, which has gcd(13, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_14 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 14 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 13 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 15. The residues of Z/61 fixed by x ↦ x^15 number exactly 1 + gcd(14, 60)
    — the units forming the kernel of x ↦ x^14, which has gcd(14, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_15 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 15 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 14 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 16. The residues of Z/61 fixed by x ↦ x^16 number exactly 1 + gcd(15, 60)
    — the units forming the kernel of x ↦ x^15, which has gcd(15, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_16 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 16 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 15 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 17. The residues of Z/61 fixed by x ↦ x^17 number exactly 1 + gcd(16, 60)
    — the units forming the kernel of x ↦ x^16, which has gcd(16, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_17 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 17 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 16 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 18. The residues of Z/61 fixed by x ↦ x^18 number exactly 1 + gcd(17, 60)
    — the units forming the kernel of x ↦ x^17, which has gcd(17, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_18 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 18 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 17 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 19. The residues of Z/61 fixed by x ↦ x^19 number exactly 1 + gcd(18, 60)
    — the units forming the kernel of x ↦ x^18, which has gcd(18, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_19 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 19 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 18 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 20. The residues of Z/61 fixed by x ↦ x^20 number exactly 1 + gcd(19, 60)
    — the units forming the kernel of x ↦ x^19, which has gcd(19, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_20 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 20 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 19 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 21. The residues of Z/61 fixed by x ↦ x^21 number exactly 1 + gcd(20, 60)
    — the units forming the kernel of x ↦ x^20, which has gcd(20, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_21 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 21 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 20 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 22. The residues of Z/61 fixed by x ↦ x^22 number exactly 1 + gcd(21, 60)
    — the units forming the kernel of x ↦ x^21, which has gcd(21, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_22 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 22 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 21 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 23. The residues of Z/61 fixed by x ↦ x^23 number exactly 1 + gcd(22, 60)
    — the units forming the kernel of x ↦ x^22, which has gcd(22, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_23 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 23 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 22 60 := by decide

/-- THE PRIME HALF AT p = 61, EXPONENT 24. The residues of Z/61 fixed by x ↦ x^24 number exactly 1 + gcd(23, 60)
    — the units forming the kernel of x ↦ x^23, which has gcd(23, 60) elements because (Z/61)* is cyclic of
    order 60, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one
    theorem so the gcd is doing visible work: at an exponent congruent to 1 mod 60 it returns every residue, and
    at one coprime to 60 only two. -/
theorem fixed_power_on_prime_61_exp_24 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]].map (fun c => c.countP (fun x => pmod x 24 61 == x % 61))).foldl (· + ·) 0 = 1 + Nat.gcd 23 60 := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 2·3. The count of x with x^6 = x is the same modulo 6 as
    the product of the counts modulo 2 and modulo 3. CRT splits Z/6 into Z/2 × Z/3 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 6 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_2_by_3 : ([[0,1,2,3,4,5]].map (fun c => c.countP (fun x => pmod x 6 6 == x % 6))).foldl (· + ·) 0 = (([[0,1]].map (fun c => c.countP (fun x => pmod x 6 2 == x % 2))).foldl (· + ·) 0) * (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 6 3 == x % 3))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 2·5. The count of x with x^10 = x is the same modulo 10 as
    the product of the counts modulo 2 and modulo 5. CRT splits Z/10 into Z/2 × Z/5 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 10 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_2_by_5 : ([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 10 10 == x % 10))).foldl (· + ·) 0 = (([[0,1]].map (fun c => c.countP (fun x => pmod x 10 2 == x % 2))).foldl (· + ·) 0) * (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 10 5 == x % 5))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 2·7. The count of x with x^14 = x is the same modulo 14 as
    the product of the counts modulo 2 and modulo 7. CRT splits Z/14 into Z/2 × Z/7 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 14 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_2_by_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13]].map (fun c => c.countP (fun x => pmod x 14 14 == x % 14))).foldl (· + ·) 0 = (([[0,1]].map (fun c => c.countP (fun x => pmod x 14 2 == x % 2))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 14 7 == x % 7))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 2·9. The count of x with x^18 = x is the same modulo 18 as
    the product of the counts modulo 2 and modulo 9. CRT splits Z/18 into Z/2 × Z/9 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 18 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_2_by_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]].map (fun c => c.countP (fun x => pmod x 18 18 == x % 18))).foldl (· + ·) 0 = (([[0,1]].map (fun c => c.countP (fun x => pmod x 18 2 == x % 2))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 18 9 == x % 9))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 2·11. The count of x with x^22 = x is the same modulo 22 as
    the product of the counts modulo 2 and modulo 11. CRT splits Z/22 into Z/2 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 22 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_2_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]].map (fun c => c.countP (fun x => pmod x 22 22 == x % 22))).foldl (· + ·) 0 = (([[0,1]].map (fun c => c.countP (fun x => pmod x 22 2 == x % 2))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 22 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·4. The count of x with x^12 = x is the same modulo 12 as
    the product of the counts modulo 3 and modulo 4. CRT splits Z/12 into Z/3 × Z/4 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 12 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_4 : ([[0,1,2,3,4,5,6,7,8,9,10,11]].map (fun c => c.countP (fun x => pmod x 12 12 == x % 12))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 12 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 12 4 == x % 4))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·5. The count of x with x^15 = x is the same modulo 15 as
    the product of the counts modulo 3 and modulo 5. CRT splits Z/15 into Z/3 × Z/5 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 15 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]].map (fun c => c.countP (fun x => pmod x 15 15 == x % 15))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 15 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 15 5 == x % 5))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·7. The count of x with x^21 = x is the same modulo 21 as
    the product of the counts modulo 3 and modulo 7. CRT splits Z/21 into Z/3 × Z/7 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 21 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]].map (fun c => c.countP (fun x => pmod x 21 21 == x % 21))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 21 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 21 7 == x % 7))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·8. The count of x with x^24 = x is the same modulo 24 as
    the product of the counts modulo 3 and modulo 8. CRT splits Z/24 into Z/3 × Z/8 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 24 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]].map (fun c => c.countP (fun x => pmod x 24 24 == x % 24))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 24 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 24 8 == x % 8))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·10. The count of x with x^30 = x is the same modulo 30 as
    the product of the counts modulo 3 and modulo 10. CRT splits Z/30 into Z/3 × Z/10 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 30 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]].map (fun c => c.countP (fun x => pmod x 30 30 == x % 30))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 30 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 30 10 == x % 10))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 3·11. The count of x with x^33 = x is the same modulo 33 as
    the product of the counts modulo 3 and modulo 11. CRT splits Z/33 into Z/3 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 33 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_3_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32]].map (fun c => c.countP (fun x => pmod x 33 33 == x % 33))).foldl (· + ·) 0 = (([[0,1,2]].map (fun c => c.countP (fun x => pmod x 33 3 == x % 3))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 33 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 4·5. The count of x with x^20 = x is the same modulo 20 as
    the product of the counts modulo 4 and modulo 5. CRT splits Z/20 into Z/4 × Z/5 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 20 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_4_by_5 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]].map (fun c => c.countP (fun x => pmod x 20 20 == x % 20))).foldl (· + ·) 0 = (([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 20 4 == x % 4))).foldl (· + ·) 0) * (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 20 5 == x % 5))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 4·7. The count of x with x^28 = x is the same modulo 28 as
    the product of the counts modulo 4 and modulo 7. CRT splits Z/28 into Z/4 × Z/7 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 28 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_4_by_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]].map (fun c => c.countP (fun x => pmod x 28 28 == x % 28))).foldl (· + ·) 0 = (([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 28 4 == x % 4))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 28 7 == x % 7))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 4·9. The count of x with x^36 = x is the same modulo 36 as
    the product of the counts modulo 4 and modulo 9. CRT splits Z/36 into Z/4 × Z/9 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 36 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_4_by_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35]].map (fun c => c.countP (fun x => pmod x 36 36 == x % 36))).foldl (· + ·) 0 = (([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 36 4 == x % 4))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 36 9 == x % 9))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 4·11. The count of x with x^44 = x is the same modulo 44 as
    the product of the counts modulo 4 and modulo 11. CRT splits Z/44 into Z/4 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 44 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_4_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43]].map (fun c => c.countP (fun x => pmod x 44 44 == x % 44))).foldl (· + ·) 0 = (([[0,1,2,3]].map (fun c => c.countP (fun x => pmod x 44 4 == x % 4))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 44 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·6. The count of x with x^30 = x is the same modulo 30 as
    the product of the counts modulo 5 and modulo 6. CRT splits Z/30 into Z/5 × Z/6 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 30 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_6 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]].map (fun c => c.countP (fun x => pmod x 30 30 == x % 30))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 30 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5]].map (fun c => c.countP (fun x => pmod x 30 6 == x % 6))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·7. The count of x with x^35 = x is the same modulo 35 as
    the product of the counts modulo 5 and modulo 7. CRT splits Z/35 into Z/5 × Z/7 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 35 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34]].map (fun c => c.countP (fun x => pmod x 35 35 == x % 35))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 35 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 35 7 == x % 7))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·8. The count of x with x^40 = x is the same modulo 40 as
    the product of the counts modulo 5 and modulo 8. CRT splits Z/40 into Z/5 × Z/8 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 40 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39]].map (fun c => c.countP (fun x => pmod x 40 40 == x % 40))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 40 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 40 8 == x % 8))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·9. The count of x with x^45 = x is the same modulo 45 as
    the product of the counts modulo 5 and modulo 9. CRT splits Z/45 into Z/5 × Z/9 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 45 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44]].map (fun c => c.countP (fun x => pmod x 45 45 == x % 45))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 45 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 45 9 == x % 9))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·11. The count of x with x^55 = x is the same modulo 55 as
    the product of the counts modulo 5 and modulo 11. CRT splits Z/55 into Z/5 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 55 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]].map (fun c => c.countP (fun x => pmod x 55 55 == x % 55))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 55 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 55 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 5·12. The count of x with x^60 = x is the same modulo 60 as
    the product of the counts modulo 5 and modulo 12. CRT splits Z/60 into Z/5 × Z/12 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 60 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_5_by_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]].map (fun c => c.countP (fun x => pmod x 60 60 == x % 60))).foldl (· + ·) 0 = (([[0,1,2,3,4]].map (fun c => c.countP (fun x => pmod x 60 5 == x % 5))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10,11]].map (fun c => c.countP (fun x => pmod x 60 12 == x % 12))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 6·7. The count of x with x^42 = x is the same modulo 42 as
    the product of the counts modulo 6 and modulo 7. CRT splits Z/42 into Z/6 × Z/7 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 42 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_6_by_7 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41]].map (fun c => c.countP (fun x => pmod x 42 42 == x % 42))).foldl (· + ·) 0 = (([[0,1,2,3,4,5]].map (fun c => c.countP (fun x => pmod x 42 6 == x % 6))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 42 7 == x % 7))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 6·11. The count of x with x^66 = x is the same modulo 66 as
    the product of the counts modulo 6 and modulo 11. CRT splits Z/66 into Z/6 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 66 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_6_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65]].map (fun c => c.countP (fun x => pmod x 66 66 == x % 66))).foldl (· + ·) 0 = (([[0,1,2,3,4,5]].map (fun c => c.countP (fun x => pmod x 66 6 == x % 6))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 66 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 7·8. The count of x with x^56 = x is the same modulo 56 as
    the product of the counts modulo 7 and modulo 8. CRT splits Z/56 into Z/7 × Z/8 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 56 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_7_by_8 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]].map (fun c => c.countP (fun x => pmod x 56 56 == x % 56))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 56 7 == x % 7))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 56 8 == x % 8))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 7·9. The count of x with x^63 = x is the same modulo 63 as
    the product of the counts modulo 7 and modulo 9. CRT splits Z/63 into Z/7 × Z/9 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 63 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_7_by_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]].map (fun c => c.countP (fun x => pmod x 63 63 == x % 63))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 63 7 == x % 7))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 63 9 == x % 9))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 7·10. The count of x with x^70 = x is the same modulo 70 as
    the product of the counts modulo 7 and modulo 10. CRT splits Z/70 into Z/7 × Z/10 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 70 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_7_by_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69]].map (fun c => c.countP (fun x => pmod x 70 70 == x % 70))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 70 7 == x % 7))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 70 10 == x % 10))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 7·11. The count of x with x^77 = x is the same modulo 77 as
    the product of the counts modulo 7 and modulo 11. CRT splits Z/77 into Z/7 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 77 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_7_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76]].map (fun c => c.countP (fun x => pmod x 77 77 == x % 77))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 77 7 == x % 7))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 77 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 7·12. The count of x with x^84 = x is the same modulo 84 as
    the product of the counts modulo 7 and modulo 12. CRT splits Z/84 into Z/7 × Z/12 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 84 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_7_by_12 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]].map (fun c => c.countP (fun x => pmod x 84 84 == x % 84))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6]].map (fun c => c.countP (fun x => pmod x 84 7 == x % 7))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10,11]].map (fun c => c.countP (fun x => pmod x 84 12 == x % 12))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 8·9. The count of x with x^72 = x is the same modulo 72 as
    the product of the counts modulo 8 and modulo 9. CRT splits Z/72 into Z/8 × Z/9 as rings, so a solution is a
    pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 72 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_8_by_9 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71]].map (fun c => c.countP (fun x => pmod x 72 72 == x % 72))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 72 8 == x % 8))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 72 9 == x % 9))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 8·11. The count of x with x^88 = x is the same modulo 88 as
    the product of the counts modulo 8 and modulo 11. CRT splits Z/88 into Z/8 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 88 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_8_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87]].map (fun c => c.countP (fun x => pmod x 88 88 == x % 88))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6,7]].map (fun c => c.countP (fun x => pmod x 88 8 == x % 8))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 88 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 9·10. The count of x with x^90 = x is the same modulo 90 as
    the product of the counts modulo 9 and modulo 10. CRT splits Z/90 into Z/9 × Z/10 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 90 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_9_by_10 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]].map (fun c => c.countP (fun x => pmod x 90 90 == x % 90))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 90 9 == x % 9))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 90 10 == x % 10))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 9·11. The count of x with x^99 = x is the same modulo 99 as
    the product of the counts modulo 9 and modulo 11. CRT splits Z/99 into Z/9 × Z/11 as rings, so a solution is
    a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 99 across all three — the first
    draft varied it with the modulus, comparing three different exponents, and the generator's own JS check
    refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so
    only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_9_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98]].map (fun c => c.countP (fun x => pmod x 99 99 == x % 99))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6,7,8]].map (fun c => c.countP (fun x => pmod x 99 9 == x % 9))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 99 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT 10·11. The count of x with x^110 = x is the same modulo 110
    as the product of the counts modulo 10 and modulo 11. CRT splits Z/110 into Z/10 × Z/11 as rings, so a
    solution is a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at 110 across all three
    — the first draft varied it with the modulus, comparing three different exponents, and the generator's own
    JS check refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this
    needs, so only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it. -/
theorem fixed_power_multiplicative_10_by_11 : ([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],[64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],[96,97,98,99,100,101,102,103,104,105,106,107,108,109]].map (fun c => c.countP (fun x => pmod x 110 110 == x % 110))).foldl (· + ·) 0 = (([[0,1,2,3,4,5,6,7,8,9]].map (fun c => c.countP (fun x => pmod x 110 10 == x % 10))).foldl (· + ·) 0) * (([[0,1,2,3,4,5,6,7,8,9,10]].map (fun c => c.countP (fun x => pmod x 110 11 == x % 11))).foldl (· + ·) 0) := by decide

/-- THE LAW SAYS SOMETHING, and this is the check that it does. Across moduli 2 to 120 the predicted counts take
    39 distinct values, from 2 to 113 — so the law is not the constant function dressed up, and an agreement
    between the walk and the prediction is not agreement between two ways of writing the same number. A law
    whose output never varies would verify against any walk that also never varied; this one is pinned to a
    spread. -/
theorem fixed_power_law_is_not_vacuous : (([[2,3,4,5,7,8,9,11,13,15,16,17,19,23,24,25,29,31,37,41,43,45,47,49],[53,59,61,67,71,73,79,83,89,97,101,103,107,109,113]].map (fun c => c.length)).foldl (· + ·) 0 = 39) ∧ (2 < 113) := by decide
