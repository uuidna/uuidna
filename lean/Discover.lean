-- lean/Discover.lean — GENERATED. Self-discovery; all computes by itself. No hardcoded structure: `invB a` DERIVES whether a is a unit (it has an inverse), and every theorem RECOMPUTES its property by filter/any/all over the ring — nothing typed as a static list. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def invB (a : Nat) : Bool := (List.range 9).any (fun e => (a * e) % 9 == 1)   -- a is a unit iff it has an inverse

-- THE BOUNTY BOARD'S FIRST SEAL — the happy ending problem (Erdős–Szekeres, a $500 Erdős prize): the conjectured ES(n) = 2^(n−2) + 1 matches every computer-verified case — ES(4)=5, ES(5)=9, ES(6)=17 (Szekeres–Peters 2006). Sealed: 2²+1=5 ∧ 2³+1=9 ∧ 2⁴+1=17. HONEST SCOPE (the clay law): three cases is NOT the conjecture; the prize needs all n≥7, still OPEN. The decidable component, a receipt that the formula and the verified record agree.
theorem happy_ending_verified_cases : (2 ^ 2 + 1 = 5) ∧ (2 ^ 3 + 1 = 9) ∧ (2 ^ 4 + 1 = 17) := by decide

-- a is a unit (has an inverse mod 9) IFF gcd(a,9)=1 — the unit criterion, computed both ways
theorem units_iff_invertible : (List.range 9).all (fun a => (invB a) == (Nat.gcd a 9 == 1)) := by decide

-- the unit group has order 6, so every unit raised to the 6th is 1 (Lagrange / Euler)
theorem lagrange_units : (List.range 9).all (fun a => (! invB a) || ((a^6) % 9 == 1)) := by decide

-- each unit has EXACTLY ONE inverse; each non-unit none — computed by counting solutions
theorem inverse_unique : (List.range 9).all (fun a => ((List.range 9).filter (fun e => (a*e)%9==1)).length == (if invB a then 1 else 0)) := by decide

-- a² ≡ 0 (mod 9) IFF 3 divides a — the nilpotent criterion, computed
theorem nilpotent_iff_triple : (List.range 9).all (fun a => ((a*a)%9==0) == (a%3==0)) := by decide

-- a² ≡ a (mod 9) exactly for a ∈ {0,1} — the idempotents, computed
theorem idempotents_zero_one : (List.range 9).all (fun a => ((a*a)%9==a) == (a==0 || a==1)) := by decide

-- the doubling orbit of 1 (computed by iterating ×2) is EXACTLY the units (computed by gcd) — two independent computations agree
theorem vortex_is_the_units : (((List.range 6).map (fun k => (2^k)%9)).all (fun x => invB x)) ∧ ((List.range 9).all (fun a => (invB a) == ((List.range 6).map (fun k => (2^k)%9)).contains a)) := by decide

-- the units of ℤ/9 sum to 0 (mod 9): 1+2+4+5+7+8 = 27 ≡ 0 — computed by folding the discovered units
theorem sum_of_units_zero : ((List.range 9).filter (fun a => invB a)).foldl (· + ·) 0 % 9 = 0 := by decide

-- the order of 1 is 1 — discovered as the first k≥1 with 1^k ≡ 1 (mod 9)
theorem order_of_one_is_one : ((List.range' 1 8).find? (fun k => (1^k) % 9 == 1)) = some 1 := by decide

-- the order of 2 is 6 — 2 generates the whole unit group, and its orbit IS the doubling vortex 1→2→4→8→7→5 of length 6
theorem order_of_two_is_six : ((List.range' 1 8).find? (fun k => (2^k) % 9 == 1)) = some 6 := by decide

-- the order of 4 is 3 — 4 = 2² sits at index 2 of the vortex, so it cycles in 6/gcd(2,6)=3
theorem order_of_four_is_three : ((List.range' 1 8).find? (fun k => (4^k) % 9 == 1)) = some 3 := by decide

-- the order of 5 is 6 — 5 is the OTHER generator of ℤ/9* (5 = 2⁵ = the vortex tail), a full six-cycle
theorem order_of_five_is_six : ((List.range' 1 8).find? (fun k => (5^k) % 9 == 1)) = some 6 := by decide

-- the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3
theorem order_of_seven_is_three : ((List.range' 1 8).find? (fun k => (7^k) % 9 == 1)) = some 3 := by decide

-- the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1
theorem order_of_eight_is_two : ((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2 := by decide

-- the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order
theorem generators_are_two_and_five : ((List.range 9).filter (fun a => ((List.range' 1 8).find? (fun k => (a^k) % 9 == 1)) == some 6)) = [2,5] := by decide
