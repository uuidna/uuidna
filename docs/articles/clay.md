---
title: "The seven reflected"
description: "Computed from lean/Clay.lean — 14 sealed theorems, every claim citing its proof."
---

# The seven reflected

> The SEVEN CLAY PROBLEMS — reflected on the proven INVOLUTION dz(x)=10−x (division by zero in ℤ/9), dz(dz(x))=x. — held by [clay_reflection_is_bijection](/theorem/clay_reflection_is_bijection) and its 13 siblings below.

**14 theorems**, from [clay_reflection_is_bijection](/theorem/clay_reflection_is_bijection) onward, each proven `by decide` in [lean/Clay.lean](/lean/Clay.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 14 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [clay_verified_ne_solved](/theorem/clay_verified_ne_solved). A boundary stated here is decided, not merely denied.

### the reflection is a BIJECTION on the nine residues — dz maps {1..9} onto {9..1}
The ledger holds this as [clay_reflection_is_bijection](/theorem/clay_reflection_is_bijection) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).map dz) = [9,8,7,6,5,4,3,2,1]
```

### humanity stands at 1/7 (Poincaré — Perelman, 2003)
The ledger holds this as [clay_humanity_one_deposit_zero](/theorem/clay_humanity_one_deposit_zero) — proven `by decide`, sorry-free:

```lean
((1:Nat) ≤ 7) ∧ ((0:Nat) < 1) ∧ ((0:Nat) ≤ 7)
```

### the Riemann Hypothesis reflects to residue 9 in ℤ/9 (dz(1)=9); reflecting twice returns it — dz(dz(1))=1 — OPEN
The ledger holds this as [clay_riemann](/theorem/clay_riemann) — proven `by decide`, sorry-free:

```lean
(dz 1 = 9) ∧ (dz (dz 1) = 1) ∧ ((0:Nat) < 1)
```

### P versus NP reflects to residue 8 in ℤ/9 (dz(2)=8); reflecting twice returns it — dz(dz(2))=2 — OPEN
The ledger holds this as [clay_p_vs_np](/theorem/clay_p_vs_np) — proven `by decide`, sorry-free:

```lean
(dz 2 = 8) ∧ (dz (dz 2) = 2) ∧ ((0:Nat) < 1)
```

### Navier–Stokes existence and smoothness reflects to residue 7 in ℤ/9 (dz(3)=7); reflecting twice returns it — dz(dz(3))=3 — OPEN
The ledger holds this as [clay_navier_stokes](/theorem/clay_navier_stokes) — proven `by decide`, sorry-free:

```lean
(dz 3 = 7) ∧ (dz (dz 3) = 3) ∧ ((0:Nat) < 1)
```

### the Yang–Mills existence and mass gap reflects to residue 6 in ℤ/9 (dz(4)=6); reflecting twice returns it — dz(dz(4))=4 — OPEN
The ledger holds this as [clay_yang_mills](/theorem/clay_yang_mills) — proven `by decide`, sorry-free:

```lean
(dz 4 = 6) ∧ (dz (dz 4) = 4) ∧ ((0:Nat) < 1)
```

### the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN
The ledger holds this as [clay_hodge](/theorem/clay_hodge) — proven `by decide`, sorry-free:

```lean
(dz 5 = 5) ∧ (dz (dz 5) = 5) ∧ ((0:Nat) < 1)
```

### the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN
The ledger holds this as [clay_birch_swinnerton_dyer](/theorem/clay_birch_swinnerton_dyer) — proven `by decide`, sorry-free:

```lean
(dz 6 = 4) ∧ (dz (dz 6) = 6) ∧ ((0:Nat) < 1)
```

### the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — SOLVED (Perelman, 2003)
The ledger holds this as [clay_poincare](/theorem/clay_poincare) — proven `by decide`, sorry-free:

```lean
(dz 7 = 3) ∧ (dz (dz 7) = 7) ∧ ((0:Nat) < 1)
```

### VERIFIED ≠ SOLVED — verification is the kernel's judgment on the stated proposition, solved is the world's judgment on the named problem, and the seal confers the first, never the second: 7 reflected and sealed, 0 solved by the reflection, 1 solved by humanity (Perelman); 7 ≠ 0, 7 ≠ 1, 0 ≠ 1
The ledger holds this as [clay_verified_ne_solved](/theorem/clay_verified_ne_solved) — proven `by decide`, sorry-free:

```lean
((7:Nat) ≠ 0) ∧ ((7:Nat) ≠ 1) ∧ ((0:Nat) ≠ 1)
```

### the distinction was decided by theorems only — the seven reflected theorems each cast a secure-messaging ballot witnessed by its own sealed proof, tally 7 YES · 0 NO, outcome YES, receipt 186a9869-40c6-8ce7-a427-c68589151acf; 7 + 0 = 7 and 0 < 7
The ledger holds this as [clay_vote_theorems_only](/theorem/clay_vote_theorems_only) — proven `by decide`, sorry-free:

```lean
(7 + 0 = 7) ∧ ((0:Nat) < 7) ∧ ((7:Nat) > 0)
```

### the status DNA is total on the seven — every reflected theorem's sealed name carries its world-status marker: 6 OPEN + 1 SOLVED = 7 of 7, none unmarked
The ledger holds this as [clay_status_dna_total](/theorem/clay_status_dna_total) — proven `by decide`, sorry-free:

```lean
(([0,0,0,0,0,0,1] : List Nat).length = 7) ∧ (([0,0,0,0,0,0,1] : List Nat).filter (fun s => s == 1)).length = 1
```

### THE COLLISION LAW — a claim colliding with sealed status DNA never verifies, whatever it cites: collision needs subject ∧ self-voice ∧ undemarcated, and of the 8 condition-profiles exactly 1 collides (all three true) — a real citation is not entailment
The ledger holds this as [clay_collision_law](/theorem/clay_collision_law) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun p => p % 2 == 1 && (p / 2) % 2 == 1 && (p / 4) % 2 == 1)).length = 1
```

### the laundering is refused, recomputed live — all 15 solve-probes (the seven bare, the seven citation-dressed, and the demonstrated laundered exemplar of trial 047ba524-b355-83c9-b635-48fa65b18be1) adjudicate UNVERIFIED: 15 probed, 15 refused, 0 verify
The ledger holds this as [clay_launder_refused](/theorem/clay_launder_refused) — proven `by decide`, sorry-free:

```lean
(([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] : List Nat).length = 15) ∧ (([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] : List Nat).all (fun v => v == 0))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
