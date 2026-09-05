---
title: "The structures domain"
description: "Computed from lean/Statics.lean — 9 sealed theorems, every claim citing its proof."
---

# The structures domain

> STATICS — the structures domain, as decidable arithmetic, demarcated. — held by [truss_determinacy_partitions_the_joint_member_grid](/theorem/truss_determinacy_partitions_the_joint_member_grid) and its 8 siblings below.

**9 theorems**, from [truss_determinacy_partitions_the_joint_member_grid](/theorem/truss_determinacy_partitions_the_joint_member_grid) onward, each proven `by decide` in <a href="/lean/Statics.lean">lean/Statics.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 9 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [truss_determinacy_partitions_the_joint_member_grid](/theorem/truss_determinacy_partitions_the_joint_member_grid). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStatics.lean)** — nothing to install. The editor fetches `lean/Statics.lean` from the repository and re-decides all 9 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### MAXWELL'S RULE WALKED, not stated. This wing named m = 2j − 3 in its header and never enumerated it, which is the difference between a claim about trusses and a claim that decides. Over joints 3..12 and members 0..40 — 829 cases — three things are decided. EXACTLY ONE member count per joint count is statically determinate: for each j precisely one m in range satisfies m + 3 = 2j, so the rule picks a point and not a region. THE COST OF A JOINT IS EXACTLY TWO MEMBERS: the determinate m rises by 2 for each joint added, which is why a planar truss grows by triangles. AND THE MECHANISMS ARE COUNTED: below the determinate point sit exactly 2j − 3 under-braced configurations, each of which moves. THE THIRD CLAUSE IS THE ONE THAT DISCRIMINATES and it was checked rather than assumed — under a wrong rule (m = 2j − 2) the first clause STILL HOLDS, because "exactly one m per j" is a property of the shape rather than of the constant, while the mechanism count is false. A conjunct that survives the wrong rule is decoration; the count is the content. SCOPE: planar pin-jointed trusses as counting. It decides the arithmetic of determinacy, NOT whether a given structure stands — a determinate truss can still fail on member strength, buckling or a support that is not what the count assumed.
The ledger holds this as [truss_determinacy_partitions_the_joint_member_grid](/theorem/truss_determinacy_partitions_the_joint_member_grid) — proven `by decide`, sorry-free:

```lean
((List.range' 3 10).all (fun j => ((List.range 41).filter (fun m => m + 3 == 2 * j)).length == 1)) ∧ ((List.range' 3 9).all (fun j => (2 * (j + 1) - 3) - (2 * j - 3) == 2)) ∧ ((List.range' 3 10).all (fun j => ((List.range 41).filter (fun m => m + 3 < 2 * j)).length == 2 * j - 3))
```

### A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.
The ledger holds this as [force_equilibrium](/theorem/force_equilibrium) — proven `by decide`, sorry-free:

```lean
(10 - 6 - 4 : Int) = 0
```

### Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.
The ledger holds this as [moment_balance](/theorem/moment_balance) — proven `by decide`, sorry-free:

```lean
6 * 2 = 4 * 3
```

### A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.
The ledger holds this as [mechanical_advantage](/theorem/mechanical_advantage) — proven `by decide`, sorry-free:

```lean
100 * 1 = 20 * 5
```

### The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 + 1·10 = 2·5. The system pivots freely about that point.
The ledger holds this as [center_of_mass](/theorem/center_of_mass) — proven `by decide`, sorry-free:

```lean
1*0 + 1*10 = 2 * 5
```

### A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each reaction 50 N — 50 + 50 = 100. Symmetry shares the burden.
The ledger holds this as [beam_reactions](/theorem/beam_reactions) — proven `by decide`, sorry-free:

```lean
50 + 50 = 100
```

### A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.
The ledger holds this as [truss_maxwell_rule](/theorem/truss_maxwell_rule) — proven `by decide`, sorry-free:

```lean
2*3 - 3 = 3
```

### Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.
The ledger holds this as [stress_is_force_over_area](/theorem/stress_is_force_over_area) — proven `by decide`, sorry-free:

```lean
100 / 4 = 25
```

### Hooke's law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.
The ledger holds this as [hookes_law](/theorem/hookes_law) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun x => 5 * x)) = [5,10,15]
```


::: warning 
STATICS — the structures domain, as decidable arithmetic, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [truss_determinacy_partitions_the_joint_member_grid](/theorem/truss_determinacy_partitions_the_joint_member_grid) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
