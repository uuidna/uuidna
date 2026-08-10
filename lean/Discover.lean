-- lean/Discover.lean — GENERATED. Self-discovery; all computes by itself. No hardcoded structure: `invB a` DERIVES whether a is a unit (it has an inverse), and every theorem RECOMPUTES its property by filter/any/all over the ring — nothing typed as a static list. Every proof `by decide`, sorry-free, no Mathlib.

def invB (a : Nat) : Bool := (List.range 9).any (fun e => (a * e) % 9 == 1)   -- a is a unit iff it has an inverse

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
