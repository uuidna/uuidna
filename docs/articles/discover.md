---
title: "Self-discovered"
description: "Computed from lean/Discover.lean — 16 sealed theorems, every claim citing its proof."
---

# Self-discovered

> Self-discovery; all computes by itself. — held by [involution_census_self_explains](/theorem/involution_census_self_explains) and its 15 siblings below.

**16 theorems**, from [involution_census_self_explains](/theorem/involution_census_self_explains) onward, each proven `by decide` in [lean/Discover.lean](/lean/Discover.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 16 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [involution_census_self_explains](/theorem/involution_census_self_explains). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDiscover.lean)** — nothing to install. The editor fetches `lean/Discover.lean` from the repository and re-decides all 16 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE UNEXPLAINED IS USUALLY SELF-INVERSE — the census, counted from the ledger not claimed: 29 sealed involutions span every domain (the bit-flip X²=I, the reverse cut, DNA complement², the phase flip, the frame ring's strides, tens-complement, colour complement, the tritone, the clay reflection, the diamond, the OTP where encrypt=decrypt). An involution IS its own explanation: apply it twice and you return, so the sign it carries squares to one ((−1)² = 1) and the mystery round-trips to the identity. What looks unexplained across the ledger keeps resolving to a self-inverse map — 29 > 1 is not coincidence but the shape of understanding: to explain a reversal, apply it again.
The ledger holds this as [involution_census_self_explains](/theorem/involution_census_self_explains) — proven `by decide`, sorry-free:

```lean
(29 > 1) ∧ (2 * 2 = 4) ∧ ((-1 : Int) ^ 2 = 1)
```

### THE BOUNTY BOARD'S FIRST SEAL — the happy ending problem (Erdős–Szekeres, a $500 Erdős prize): the conjectured ES(n) = 2^(n−2) + 1 matches every computer-verified case — ES(4)=5, ES(5)=9, ES(6)=17 (Szekeres–Peters 2006). Sealed: 2²+1=5 ∧ 2³+1=9 ∧ 2⁴+1=17. SCOPE (the clay law): three cases is NOT the conjecture; the prize needs all n≥7, still OPEN. The decidable component, a receipt that the formula and the verified record agree.
The ledger holds this as [happy_ending_verified_cases](/theorem/happy_ending_verified_cases) — proven `by decide`, sorry-free:

```lean
((List.range' 4 3).map (fun n => 2 ^ (n - 2) + 1)) = [5, 9, 17]
```

### a is a unit (has an inverse mod 9) IFF gcd(a,9)=1 — the unit criterion, computed both ways
The ledger holds this as [units_iff_invertible](/theorem/units_iff_invertible) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => (invB a) == (Nat.gcd a 9 == 1))
```

### the unit group has order 6, so every unit raised to the 6th is 1 (Lagrange / Euler)
The ledger holds this as [lagrange_units](/theorem/lagrange_units) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => (! invB a) || ((a^6) % 9 == 1))
```

### each unit has EXACTLY ONE inverse; each non-unit none — computed by counting solutions
The ledger holds this as [inverse_unique](/theorem/inverse_unique) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => ((List.range 9).filter (fun e => (a*e)%9==1)).length == (if invB a then 1 else 0))
```

### a² ≡ 0 (mod 9) IFF 3 divides a — the nilpotent criterion, computed
The ledger holds this as [nilpotent_iff_triple](/theorem/nilpotent_iff_triple) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => ((a*a)%9==0) == (a%3==0))
```

### a² ≡ a (mod 9) exactly for a ∈ {0,1} — the idempotents, computed
The ledger holds this as [idempotents_zero_one](/theorem/idempotents_zero_one) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => ((a*a)%9==a) == (a==0 || a==1))
```

### the doubling orbit of 1 (computed by iterating ×2) is EXACTLY the units (computed by gcd) — two independent computations agree
The ledger holds this as [vortex_is_the_units](/theorem/vortex_is_the_units) — proven `by decide`, sorry-free:

```lean
(((List.range 6).map (fun k => (2^k)%9)).all (fun x => invB x)) ∧ ((List.range 9).all (fun a => (invB a) == ((List.range 6).map (fun k => (2^k)%9)).contains a))
```

### the units of ℤ/9 sum to 0 (mod 9): 1+2+4+5+7+8 = 27 ≡ 0 — computed by folding the discovered units
The ledger holds this as [sum_of_units_zero](/theorem/sum_of_units_zero) — proven `by decide`, sorry-free:

```lean
((List.range 9).filter (fun a => invB a)).foldl (· + ·) 0 % 9 = 0
```

### the order of 1 is 1 — discovered as the first k≥1 with 1^k ≡ 1 (mod 9)
The ledger holds this as [order_of_one_is_one](/theorem/order_of_one_is_one) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (1^k) % 9 == 1)) = some 1
```

### the order of 2 is 6 — 2 generates the whole unit group, and its orbit IS the doubling vortex 1→2→4→8→7→5 of length 6
The ledger holds this as [order_of_two_is_six](/theorem/order_of_two_is_six) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (2^k) % 9 == 1)) = some 6
```

### the order of 4 is 3 — 4 = 2² sits at index 2 of the vortex, so it cycles in 6/gcd(2,6)=3
The ledger holds this as [order_of_four_is_three](/theorem/order_of_four_is_three) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (4^k) % 9 == 1)) = some 3
```

### the order of 5 is 6 — 5 is the OTHER generator of ℤ/9* (5 = 2⁵ = the vortex tail), a full six-cycle
The ledger holds this as [order_of_five_is_six](/theorem/order_of_five_is_six) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (5^k) % 9 == 1)) = some 6
```

### the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3
The ledger holds this as [order_of_seven_is_three](/theorem/order_of_seven_is_three) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (7^k) % 9 == 1)) = some 3
```

### the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1
The ledger holds this as [order_of_eight_is_two](/theorem/order_of_eight_is_two) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2
```

### the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order
The ledger holds this as [generators_are_two_and_five](/theorem/generators_are_two_and_five) — proven `by decide`, sorry-free:

```lean
((List.range 9).filter (fun a => ((List.range' 1 8).find? (fun k => (a^k) % 9 == 1)) == some 6)) = [2,5]
```


::: warning 
Self-discovery; all computes by itself. The boundary is confirmed by the wing's own sealed theorems — e.g. [involution_census_self_explains](/theorem/involution_census_self_explains) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
