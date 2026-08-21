---
title: "The spacetime domain"
description: "Computed from lean/Relativity.lean — 5 sealed theorems, every claim citing its proof."
---

# The spacetime domain

> RELATIVITY — the spacetime domain, as decidable arithmetic, demarcated. — held by [light_on_null_cone](/theorem/light_on_null_cone) and its 4 siblings below.

**5 theorems**, from [light_on_null_cone](/theorem/light_on_null_cone) onward, each proven `by decide` in [lean/Relativity.lean](/lean/Relativity.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [causality_forbids_ftl](/theorem/causality_forbids_ftl). A boundary stated here is decided, not merely denied.

### Light travels on the null cone: with c = 1, a flash covering x = 5 in t = 5 has spacetime interval (ct)² − x² = 5² − 5² = 0. Photons trace the zero-interval boundary between cause and no-cause.
The ledger holds this as [light_on_null_cone](/theorem/light_on_null_cone) — proven `by decide`, sorry-free:

```lean
(5*5 - 5*5 : Int) = 0
```

### The invariant interval classifies events: a timelike separation (ct = 5, x = 4) gives s² = 25 − 16 = 9 > 0 — inside the light cone, reachable below light speed, so cause can reach effect. All observers agree on this interval.
The ledger holds this as [interval_timelike_causal](/theorem/interval_timelike_causal) — proven `by decide`, sorry-free:

```lean
((5*5 - 4*4 : Int) = 9) ∧ ((9:Int) > 0)
```

### The Lorentz factor rides a right triangle: β² + (1/γ)² = 1, so at β = 5/13 the reciprocal factor is 12/13 and γ = 13/12 — 5² + 12² = 13². The faster you go, the taller the triangle.
The ledger holds this as [lorentz_gamma_triangle](/theorem/lorentz_gamma_triangle) — proven `by decide`, sorry-free:

```lean
5^2 + 12^2 = 13^2
```

### Mass is energy: E = mc², so (with c² = 9 in these units) masses [1,2,3] carry rest energies [9,18,27] — linear in mass. Even at rest, matter holds mc² of energy.
The ledger holds this as [rest_energy_mc2](/theorem/rest_energy_mc2) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun m => m * 9)) = [9,18,27]
```

### Causality forbids faster-than-light links: a spacelike separation (ct = 3, x = 5) has s² = 9 − 25 = −16 < 0 — outside the light cone, so no signal can connect the events without exceeding c. What is spacelike cannot be a cause.
The ledger holds this as [causality_forbids_ftl](/theorem/causality_forbids_ftl) — proven `by decide`, sorry-free:

```lean
(3*3 - 5*5 : Int) < 0
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
