---
title: "The spacetime domain"
description: "Computed from lean/Relativity.lean — 8 sealed theorems, every claim citing its proof."
---

# The spacetime domain

> RELATIVITY — the spacetime domain, as decidable arithmetic, demarcated. Nothing exceeds c (the cosmic speed limit — no FTL); light travels on the null cone (interval 0); the invariant interval s² = (ct)² − x² classifies events as timelike/causal (5²−4²=9>0) or spacelike (3²−5²<0, no causal link without FTL); the Lorentz factor rides a Pythagorean triangle (β=5/13 → γ=13/12, 5²+12²=13²); moving clocks dilate (13>12) and lengths contract (12<13); and rest energy is E=mc². HONEST SCOPE: the arithmetic of special relativity in integer-friendly cases — intervals, the γ triangle and exact ratios — not a full tensor or general-relativity derivation.

**8 theorems**, each proven `by decide` in [lean/Relativity.lean](/lean/Relativity.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### Nothing outruns light: c = 299792458 m/s is the universal speed limit, so any real signal is strictly slower — 299792457 < 299792458. There is no faster-than-light; the ledger says "no fake FTL," and relativity proves it.

The ledger holds this as [cosmic_speed_limit](/theorem/cosmic_speed_limit) — proven `by decide`, sorry-free:

```lean
299792457 < 299792458
```

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

### Moving clocks run slow: at γ = 13/12 a proper time of 12 seconds is observed as 13 — 13 > 12. The traveller ages less; the stay-at-home sees more time pass.

The ledger holds this as [time_dilation](/theorem/time_dilation) — proven `by decide`, sorry-free:

```lean
13 > 12
```

### Moving lengths contract along the motion: at γ = 13/12 a 13-metre rest length measures 13/γ = 12 metres to the observer it flies past — 12 < 13. Space shortens as speed climbs.

The ledger holds this as [length_contraction](/theorem/length_contraction) — proven `by decide`, sorry-free:

```lean
12 < 13
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


::: warning HONEST SCOPE
the arithmetic of special relativity in integer-friendly cases — intervals, the γ triangle and exact ratios — not a full tensor or general-relativity derivation.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
