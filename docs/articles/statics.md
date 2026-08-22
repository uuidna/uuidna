---
title: "The structures domain"
description: "Computed from lean/Statics.lean — 8 sealed theorems, every claim citing its proof."
---

# The structures domain

> STATICS — the structures domain, as decidable arithmetic, demarcated. — held by [force_equilibrium](/theorem/force_equilibrium) and its 7 siblings below.

**8 theorems**, from [force_equilibrium](/theorem/force_equilibrium) onward, each proven `by decide` in [lean/Statics.lean](/lean/Statics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [mechanical_advantage](/theorem/mechanical_advantage). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStatics.lean)** — nothing to install. The editor fetches `lean/Statics.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
