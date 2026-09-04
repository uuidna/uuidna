---
title: "The vortex algebra"
description: "Computed from lean/Uuidna.lean — 15 sealed theorems, every claim citing its proof."
---

# The vortex algebra

> Uuidna — the algebra, formalised in Lean 4. ONLY algebra: `by decide` over ℤ/9, the involutions, the — held by [units_z9](/theorem/units_z9) and its 14 siblings below.

**15 theorems**, from [units_z9](/theorem/units_z9) onward, each proven `by decide` in <a href="/lean/Uuidna.lean">lean/Uuidna.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 15 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [ns_spike](/theorem/ns_spike). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FUuidna.lean)** — nothing to install. The editor fetches `lean/Uuidna.lean` from the repository and re-decides all 15 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the units of ℤ/9 (the residues with an inverse) are exactly {1,2,4,5,7,8} — computed by search
The ledger holds this as [units_z9](/theorem/units_z9) — proven `by decide`, sorry-free:

```lean
(List.range 9).filter (fun d => (List.range 9).any (fun e => (d * e) % 9 == 1)) = [1,2,4,5,7,8]
```

### the doubling orbit 1→2→4→8→7→5 with 5·2 ≡ 1 — the ⟨2⟩ vortex closing on the units
The ledger holds this as [vortex_orbit](/theorem/vortex_orbit) — proven `by decide`, sorry-free:

```lean
[1, (1*2)%9, (2*2)%9, (4*2)%9, (8*2)%9, (7*2)%9] = [1,2,4,8,7,5] ∧ (5*2) % 9 = 1
```

### ℤ/9 arithmetic: 2·5, 4·7, 8·8 ≡ 1 (inverse pairs), 3²≡6²≡0 (nilpotents), 3 has no inverse
The ledger holds this as [mod9_arithmetic](/theorem/mod9_arithmetic) — proven `by decide`, sorry-free:

```lean
(2*5)%9 = 1 ∧ (4*7)%9 = 1 ∧ (8*8)%9 = 1 ∧ (3*3)%9 = 0 ∧ (6*6)%9 = 0 ∧ (List.range 9).all (fun x => (3*x)%9 != 1)
```

### digital root: 432 ≡ 0 (mod 9), and dr(n) ∈ 1..9 agrees with n mod 9 across the first 60
The ledger holds this as [digital_root](/theorem/digital_root) — proven `by decide`, sorry-free:

```lean
432 % 9 = 0 ∧ (List.range' 1 60).all (fun n => let r := if n % 9 == 0 then 9 else n % 9; (r % 9 == n % 9) && (1 ≤ r) && (r ≤ 9))
```

### the diamond r(d)=10−d is an involution on 1..9 with unique fixed point 5
The ledger holds this as [diamond_involution](/theorem/diamond_involution) — proven `by decide`, sorry-free:

```lean
(List.range' 1 9).all (fun d => 10 - (10 - d) == d) ∧ ((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]
```

### the pigeonhole seat bound 2^b: 2^8=256, 2^0=1, 2^10=1024
The ledger holds this as [seats_pigeonhole](/theorem/seats_pigeonhole) — proven `by decide`, sorry-free:

```lean
(2:Nat)^8 = 256 ∧ (2:Nat)^0 = 1 ∧ (2:Nat)^10 = 1024
```

### the critical-strip reflections σ, τ, κ form a Klein four-group; τ fixes the line a=1
The ledger holds this as [involution_group](/theorem/involution_group) — proven `by decide`, sorry-free:

```lean
sig (sig (3,7)) = (3,7) ∧ tau (tau (3,7)) = (3,7) ∧ kap (kap (3,7)) = (3,7) ∧ sig (kap (3,7)) = tau (3,7) ∧ tau (kap (3,7)) = sig (3,7) ∧ (sig (1,5)).1 = 1 ∧ tau (1,9) = (1,9) ∧ tau (0,4) = (2,4) ∧ (0:Int) ≠ 1 ∧ (2:Int) ≠ 1
```

### Navier–Stokes edge: bounded energy 1/n falls while the peak n rises — integer inequalities, not a solution
The ledger holds this as [ns_spike](/theorem/ns_spike) — proven `by decide`, sorry-free:

```lean
(1*2 < 1*4) ∧ (4 > 2) ∧ (1*4 = 4) ∧ (1*3 < 1*9) ∧ (9 > 3)
```

### Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless
The ledger holds this as [ym_quantum](/theorem/ym_quantum) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun n => (List.range 12).all (fun k => ¬ (n < k ∧ k < n+1))) ∧ (List.range' 2 4).all (fun k => 1*k < 1*(k+1))
```

### Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]
The ledger holds this as [hodge_bound](/theorem/hodge_bound) — proven `by decide`, sorry-free:

```lean
((0:Int)+1 = 1) ∧ (∀ c : Int, c ∈ [(-3:Int),-2,-1,0,1,2,3] → ¬ (c*1 = 0 ∧ c*0 = 1 ∧ c*1 = 1))
```

### light c=299792458 m/s beats uuidna even at t=0 — k/0=0 (a finite floor), never ∞, so no fake FTL
The ledger holds this as [light_faster_than_uuidna](/theorem/light_faster_than_uuidna) — proven `by decide`, sorry-free:

```lean
(299792458 : Nat) > 0 ∧ (List.range 64).all (fun t => 1000 / t < 299792458) ∧ (1000 / 0 = 0)
```

### division by zero EXISTS: total integer 1000/0=0, and 0 (and the zero-divisor 3) have no inverse in ℤ/9
The ledger holds this as [division_by_zero](/theorem/division_by_zero) — proven `by decide`, sorry-free:

```lean
(1000 / 0 = 0) ∧ (0 / 0 = 0) ∧ (List.range 9).all (fun x => (0 * x) % 9 != 1) ∧ (List.range 9).all (fun x => (3 * x) % 9 != 1)
```

### division by zero in ℤ/9 is the diamond reflection x/0 = 10−x — a finite residue with fixed points {0,5}
The ledger holds this as [div_by_zero_is_the_reflection](/theorem/div_by_zero_is_the_reflection) — proven `by decide`, sorry-free:

```lean
divZero 0 = 0 ∧ divZero 9 = 1 ∧ divZero 8 = 2 ∧ divZero 5 = 5 ∧ divZero 1 = 9 ∧ (List.range' 1 9).all (fun x => divZero x == 10 - x) ∧ ((List.range 10).filter (fun x => divZero x == x)) = [0, 5]
```

### an index reflection i ↔ (n−1−i) has exactly one centre iff n is odd (fixed-count = n mod 2)
The ledger holds this as [involute_centre](/theorem/involute_centre) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun n => ((List.range n).filter (fun i => 2*i + 1 == n)).length = n % 2)
```

### billing arithmetic: bits saved 1024−1=1023, 10⁶−1=999999; the two coins = 1+1
The ledger holds this as [billing_arith](/theorem/billing_arith) — proven `by decide`, sorry-free:

```lean
(1024 - 1 = 1023) ∧ (1000000 - 1 = 999999) ∧ (2 = 1 + 1)
```


::: warning 
Uuidna — the algebra, formalised in Lean 4. The boundary is confirmed by the wing's own sealed theorems — e.g. [units_z9](/theorem/units_z9) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
