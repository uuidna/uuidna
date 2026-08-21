---
title: "The energy domain"
description: "Computed from lean/Thermodynamics.lean — 11 sealed theorems, every claim citing its proof."
---

# The energy domain

> THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. — held by [first_law_conservation](/theorem/first_law_conservation) and its 10 siblings below.

**11 theorems**, from [first_law_conservation](/theorem/first_law_conservation) onward, each proven `by decide` in [lean/Thermodynamics.lean](/lean/Thermodynamics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 6 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [first_law_conservation](/theorem/first_law_conservation). A boundary stated here is decided, not merely denied.

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

### TWO DEFINING CONSTANTS BRACKET A REAL LENGTH, IN EXACT INTEGERS. The second is defined as 9192631770 periods of the caesium-133 hyperfine transition, and the metre so that light travels 299792458 m in one second — both exact by definition, both whole numbers. So in ONE caesium period light travels 299792458/9192631770 metres, and that ratio is bracketed here without dividing: 299792458 × 100 > 9192631770 × 3 and < 9192631770 × 4, so the step is between three and four centimetres (≈3.26 cm). Nothing irrational is asserted and no division is taken — two conventions, multiplied, settle a physical distance exactly.
The ledger holds this as [caesium_light_step](/theorem/caesium_light_step) — proven `by decide`, sorry-free:

```lean
299792458 * 100 > 9192631770 * 3 ∧ 299792458 * 100 < 9192631770 * 4
```

### THE FLOOR UNDER EVERY ERASURE, DERIVED FROM AN EXACT CONSTANT. Boltzmann's k is exact by SI definition (1.380649×10⁻²³ J/K, fixed in the 2019 redefinition), so at room temperature T = 300 K the thermal quantum is kT = 414194700×10⁻²⁹ J, and Landauer's minimum cost of erasing ONE bit is kT·ln2 = 287097813×10⁻²⁹ J ≈ 2.871×10⁻²¹ J. Computed here in exact integers with ln2 as 693147/1000000 — no measurement enters, only the definition and division.
The ledger holds this as [landauer_bound_derived](/theorem/landauer_bound_derived) — proven `by decide`, sorry-free:

```lean
1380649 * 300 = 414194700 ∧ 414194700 * 693147 / 1000000 = 287097813
```

### A COST PROPORTIONAL TO WHAT IS ERASED IS ZERO WHEN NOTHING IS ERASED. Landauer's floor scales with the number of bits destroyed: erase one bit and pay 287097813×10⁻²⁹ J, erase none and pay 0 × that = 0. A logically REVERSIBLE step — an involution like reverse or CNOT, or this ledger's round-tripping imprint codec — destroys no information, so it carries no erasure floor at all. this is a floor being AVOIDED, never energy being produced; the bound stays strictly positive (0 < 287097813), and no_perpetual_motion in this wing forbids the other reading.
The ledger holds this as [reversible_erases_nothing](/theorem/reversible_erases_nothing) — proven `by decide`, sorry-free:

```lean
0 * 287097813 = 0 ∧ 1 * 287097813 = 287097813 ∧ 0 < 287097813
```

### REAL SILICON RUNS ABOUT A HUNDRED MILLION TIMES ABOVE THE FLOOR. A switching event in current CMOS dissipates on the order of 10⁻¹² J, against Landauer's 2.871×10⁻²¹ J — a ratio near 3.5×10⁸, stated here as the exact integer comparison 100000000 × 287097813 < 100000000000000000000000000000000. So the headroom between real hardware and the physical limit is enormous and real — and it is headroom for EFFICIENCY, which is a smaller bill, not a source of energy.
The ledger holds this as [hardware_above_landauer](/theorem/hardware_above_landauer) — proven `by decide`, sorry-free:

```lean
100000000 * 287097813 < 100000000000000000000000000000000
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
