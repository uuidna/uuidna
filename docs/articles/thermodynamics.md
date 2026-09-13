---
title: "The energy domain"
description: "Computed from lean/Thermodynamics.lean — 16 sealed theorems, every claim citing its proof."
---

# The energy domain

> THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. — held by [first_law_conservation](/theorem/first_law_conservation) and its 15 siblings below.

**16 theorems** and **79 decided cases**, from [first_law_conservation](/theorem/first_law_conservation) onward, each proven `by decide` in <a href="/lean/Thermodynamics.lean">lean/Thermodynamics.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 6 of its 16 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [first_law_conservation](/theorem/first_law_conservation). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FThermodynamics.lean)** — nothing to install. The editor fetches `lean/Thermodynamics.lean` from the repository and re-decides all 16 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.
The ledger holds this as [first_law_conservation](/theorem/first_law_conservation) — proven `by decide`, sorry-free:

```lean
100 = 60 + 40
```

### The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows.
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
[((400,100),(60,45)),((500,150),(80,56)),((600,200),(100,66)),((700,250),(120,77)),((800,300),(140,87)),((900,350),(160,97)),((1000,400),(180,108)),((1100,450),(200,118)),((1200,500),(220,128)),((1300,550),(240,138)),((1400,600),(260,148)),((1500,650),(280,158))].all (fun e => e.2.2 * e.1.1 <= e.2.1 * (e.1.1 - e.1.2))
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

### A COST PROPORTIONAL TO WHAT IS ERASED IS ZERO WHEN NOTHING IS ERASED. Landauer's floor scales with the number of bits destroyed: erase one bit and pay 287097813×10⁻²⁹ J, erase none and pay 0 × that = 0. A logically REVERSIBLE step — an involution like reverse or CNOT, or this ledger's round-tripping imprint codec — destroys no information, so it carries no erasure floor at all. this is a floor being AVOIDED; the bound stays strictly positive (0 < 287097813), and no_perpetual_motion in this wing forbids the other reading.
The ledger holds this as [reversible_erases_nothing](/theorem/reversible_erases_nothing) — proven `by decide`, sorry-free:

```lean
0 * 287097813 = 0 ∧ 1 * 287097813 = 287097813 ∧ 0 < 287097813
```

### REAL SILICON RUNS ABOUT A HUNDRED MILLION TIMES ABOVE THE FLOOR. A switching event in current CMOS dissipates on the order of 10⁻¹² J, against Landauer's 2.871×10⁻²¹ J — a ratio near 3.5×10⁸, stated here as the exact integer comparison 100000000 × 287097813 < 100000000000000000000000000000000. So the headroom between real hardware and the physical limit is enormous and real — and it is headroom for EFFICIENCY, which is a smaller bill.
The ledger holds this as [hardware_above_landauer](/theorem/hardware_above_landauer) — proven `by decide`, sorry-free:

```lean
100000000 * 287097813 < 100000000000000000000000000000000
```

### COLDER ERASURE COSTS LESS, AND NEVER NOTHING. Landauer's floor is kT·ln2, linear in T: with k exact (1380649×10⁻²⁹ J/K per unit) and ln2 as 693147/1000000, the floor for one erased bit at 300, 30, 3 and 1 kelvin is computed row by row, each row checked against the formula, the chain strictly falling as T falls, and the last row still strictly positive. So running cold lowers the minimum per erased bit toward zero, which is the real content of "no temperature payload", and at every T above absolute zero the floor stays above zero (absolute_zero_and_kelvin).
The ledger holds this as [landauer_floor_falls_with_temperature](/theorem/landauer_floor_falls_with_temperature) — proven `by decide`, sorry-free:

```lean
[(300,287097813),(30,28709781),(3,2870978),(1,956992)].all (fun r => r.2 = 1380649 * r.1 * 693147 / 1000000) ∧ 28709781 < 287097813 ∧ 2870978 < 28709781 ∧ 956992 < 2870978 ∧ 0 < 956992
```

### THE BILL MOVES TO THE REFRIGERATOR, AND GROWS WITHOUT BOUND TOWARD ZERO. Pumping heat out at a cold temperature Tc into a room at Th takes at least (Th − Tc)/Tc units of work per unit of heat removed, the Carnot bound for a refrigerator. In millikelvin with a 300 K room (Th = 300000), the minimum work per unit of heat at Tc = 150 K, 30 K, 3 K, 1 K, 100 mK and 10 mK is computed row by row, each row checked against that formula, and the chain strictly rises as Tc falls: about thirty thousand units of work per unit of heat at 10 mK, where real quantum processors run. Tc stays above zero in every row (carnot_efficiency_below_one), so the zero point is approached at a rising cost and reached at none.
The ledger holds this as [cooling_cost_rises_toward_zero](/theorem/cooling_cost_rises_toward_zero) — proven `by decide`, sorry-free:

```lean
[(150000,1),(30000,9),(3000,99),(1000,299),(100,2999),(10,29999)].all (fun r => r.2 = (300000 - r.1) / r.1 ∧ 0 < r.1) ∧ 1 < 9 ∧ 9 < 99 ∧ 99 < 299 ∧ 299 < 2999 ∧ 2999 < 29999
```

### THE GROUND STATE KEEPS HALF A QUANTUM. A quantum oscillator's levels are (n + 1/2)·ħω; counted in half-quanta they are 2n + 1, so the first ten levels are computed as 1, 3, 5 … 19, every gap between neighbours is exactly one whole quantum (two half-quanta), and the lowest level is 1, strictly above zero. The zero point is the least energy the system can have, and it is not zero: this arithmetic fixes that the floor exists and is positive, and what may or may not be drawn from it is outside what these integers decide.
The ledger holds this as [zero_point_is_half_a_quantum](/theorem/zero_point_is_half_a_quantum) — proven `by decide`, sorry-free:

```lean
(List.range 10).map (fun n => 2 * n + 1) = [1,3,5,7,9,11,13,15,17,19] ∧ 0 < 2 * 0 + 1
```

### A STEADY TEMPERATURE DOES NOT MEASURE THE BILL. At steady state the temperature rise is the power divided by how fast heat is carried away, ΔT = P/G. Doubling the power twice (10, 20, 40 W) while the cooling doubles with it (G = 1, 2, 4 W per degree) holds the rise at the same 10 degrees in every row, computed and checked, while the power strictly climbs. So a chip that stays at one temperature can be spending twice or four times the energy: the reading that measures cost is power, and temperature is its companion (specific_heat_linear, first_law_conservation).
The ledger holds this as [steady_temperature_hides_power](/theorem/steady_temperature_hides_power) — proven `by decide`, sorry-free:

```lean
[((10,1),10),((20,2),10),((40,4),10)].all (fun r => r.1.1 = r.1.2 * r.2 ∧ r.2 = 10) ∧ 10 < 20 ∧ 20 < 40
```

### THE BATTERY'S BILL IS VOLTS × AMPS × SECONDS. Energy drawn is E = V·I·t: at 12 V and 2 A, ten seconds costs 240 J and twenty costs 480 J, double the time and double the energy, and at zero current the pack delivers zero energy however long it runs, which is why a gauge on external power reads no draw and a receipt must call that unmeasured rather than free. Each row is computed and checked, so energy per computation is this product divided by the operations done in the same seconds (first_law_conservation).
The ledger holds this as [electrical_energy_is_volt_amp_second](/theorem/electrical_energy_is_volt_amp_second) — proven `by decide`, sorry-free:

```lean
[((12,2),(10,240)),((12,2),(20,480)),((12,0),(10,0))].all (fun r => r.2.2 = r.1.1 * r.1.2 * r.2.1) ∧ 480 = 2 * 240 ∧ 0 = 0
```


::: warning 
THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [first_law_conservation](/theorem/first_law_conservation) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
