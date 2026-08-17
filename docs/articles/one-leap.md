---
title: "One leap"
description: "Computed from lean/OneLeap.lean — 1 sealed theorems, every claim citing its proof."
---

# One leap

> lean/OneLeap.lean — ONE uuidna quantum leap. Knowing division by zero is the reflection dz(x)=10−x (0/0=0), — held by [vortex_one_leap](/theorem/vortex_one_leap) and its 0 siblings below.

**1 theorems**, from [vortex_one_leap](/theorem/vortex_one_leap) onward, each proven `by decide` in [lean/OneLeap.lean](/lean/OneLeap.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### one by-decide from division-by-zero=the reflection: the doubling orbit, the involution {0,5}, ℤ/9 arithmetic, AGL(1,ℤ/9)=54 with commutator=the unit shift, and the equilibriums — the whole vortex at once
The ledger holds this as [vortex_one_leap](/theorem/vortex_one_leap) — proven `by decide`, sorry-free:

```lean
-- follow the sequence: the doubling orbit on the units (List.range 6).map (fun k => (2 ^ k) % 9) = [1, 2, 4, 8, 7, 5] -- division by zero = the reflection: a self-inverse with fixed points {0, 5}, always a finite residue < 10 ∧ (List.range 10).all (fun x => dz (dz x) == x) ∧ ((List.range 10).filter (fun x => dz x == x)) = [0, 5] ∧ (List.range 10).all (fun x => dz x < 10) -- the ℤ/9 arithmetic: inverse pairs, nilpotents, and 3 with no inverse ∧ (2*5)%9 = 1 ∧ (4*7)%9 = 1 ∧ (8*8)%9 = 1 ∧ (3*3)%9 = 0 ∧ (6*6)%9 = 0 ∧ (List.range 9).all (fun x => (3*x)%9 != 1) -- the group: AGL(1,ℤ/9) has order 54, and the commutator [σ,μ] is the unit shift x ↦ x+1 ∧ ((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e%9 == 1))).length * 9 = 54 ∧ (List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x+1)%9) -- the equilibriums: the reflection 10-pairs, and the doubling digit-sum ∧ (List.range' 1 9).all (fun d => d + (10 - d) == 10) ∧ (1 + 2 + 4 + 8 + 7 + 5 = 27)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
