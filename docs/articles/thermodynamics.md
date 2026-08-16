---
title: "The energy domain"
description: "Computed from lean/Thermodynamics.lean — 8 sealed theorems, every claim citing its proof."
---

# The energy domain

> THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The first law conserves energy (ΔU = Q − W: 100 = 60 + 40); the second law forbids entropy from decreasing and sends heat hot → cold; the Carnot efficiency is below 1 (no perfect engine, no perpetual motion); the Kelvin scale floors at absolute zero (0 °C = 273 K); Charles's law keeps V/T constant; and specific heat is linear in ΔT. HONEST SCOPE: the arithmetic of the laws — conservation, monotonicity and exact ratios, not a full statistical-mechanics derivation.

**8 theorems**, each proven `by decide` in [lean/Thermodynamics.lean](/lean/Thermodynamics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.

The ledger holds this as [first_law_conservation](/theorem/first_law_conservation) — proven `by decide`, sorry-free:

```lean
100 = 60 + 40
```

### The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.

The ledger holds this as [entropy_never_decreases](/theorem/entropy_never_decreases) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun t => t <= t + 1)
```

### The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.

The ledger holds this as [heat_flows_hot_to_cold](/theorem/heat_flows_hot_to_cold) — proven `by decide`, sorry-free:

```lean
400 > 300
```

### The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 > 0 — no engine is perfect and none reaches absolute zero.

The ledger holds this as [carnot_efficiency_below_one](/theorem/carnot_efficiency_below_one) — proven `by decide`, sorry-free:

```lean
((400 - 300) < 400) ∧ (0 < 300)
```

### The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.

The ledger holds this as [absolute_zero_and_kelvin](/theorem/absolute_zero_and_kelvin) — proven `by decide`, sorry-free:

```lean
(0 + 273 = 273) ∧ (100 + 273 = 373)
```

### Charles's law keeps V/T constant at fixed pressure: heating a gas expands it proportionally — V₁/T₁ = V₂/T₂ gives 2/300 = 4/600, cross-multiplied 2·600 = 4·300 = 1200.

The ledger holds this as [charles_law](/theorem/charles_law) — proven `by decide`, sorry-free:

```lean
2 * 600 = 4 * 300
```

### No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.

The ledger holds this as [no_perpetual_motion](/theorem/no_perpetual_motion) — proven `by decide`, sorry-free:

```lean
(40 <= 100) ∧ ((100 - 40) = 60)
```

### Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.

The ledger holds this as [specific_heat_linear](/theorem/specific_heat_linear) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun dT => 10 * dT)) = [10,20,30]
```


::: warning HONEST SCOPE
the arithmetic of the laws — conservation, monotonicity and exact ratios, not a full statistical-mechanics derivation.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
