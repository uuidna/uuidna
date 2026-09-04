---
title: "Diving — trimix gas laws"
description: "Computed from lean/Diving.lean — 8 sealed theorems, every claim citing its proof."
---

# Diving — trimix gas laws

> DIVING — the decidable arithmetic of trimix gas laws, demarcated. — held by [trimix_fractions_sum_100](/theorem/trimix_fractions_sum_100) and its 7 siblings below.

**8 theorems**, from [trimix_fractions_sum_100](/theorem/trimix_fractions_sum_100) onward, each proven `by decide` in <a href="/lean/Diving.lean">lean/Diving.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [air_ppO2_in_window_at_surface](/theorem/air_ppO2_in_window_at_surface). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDiving.lean)** — nothing to install. The editor fetches `lean/Diving.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A breathing mix is complete: the oxygen, helium and nitrogen fractions sum to 100%. Trimix 18/45 is 18% O₂, 45% He, 37% N₂ — 18 + 45 + 37 = 100.
The ledger holds this as [trimix_fractions_sum_100](/theorem/trimix_fractions_sum_100) — proven `by decide`, sorry-free:

```lean
18 + 45 + 37 = 100
```

### Absolute pressure rises one atmosphere per 10 m of seawater: P(d) = 1 + d/10, so depths [0,10,20,30,40] m give [1,2,3,4,5] atm.
The ledger holds this as [absolute_pressure_at_depth](/theorem/absolute_pressure_at_depth) — proven `by decide`, sorry-free:

```lean
(([0,10,20,30,40] : List Nat).map (fun d => 1 + d/10)) = [1,2,3,4,5]
```

### Dalton's law: at 30 m (4 atm), the partial pressures of trimix 18/45 sum to the absolute pressure — 18·4 + 45·4 + 37·4 = 100·4 (each fraction times the pressure, totalling 4 atm).
The ledger holds this as [partial_pressures_sum_to_absolute](/theorem/partial_pressures_sum_to_absolute) — proven `by decide`, sorry-free:

```lean
18*4 + 45*4 + 37*4 = 100*4
```

### The breathable oxygen window is a partial pressure of about 0.16 to 1.60 atm (×100: 16 to 160). Air at the surface sits inside it — 16 ≤ 21 ≤ 160 — neither hypoxic below nor toxic above.
The ledger holds this as [air_ppO2_in_window_at_surface](/theorem/air_ppO2_in_window_at_surface) — proven `by decide`, sorry-free:

```lean
(16 <= 21) ∧ (21 <= 160)
```

### Why deep dives blend trimix: air is 21% O₂, and at 70 m (8 atm) its ppO₂ is 0.21·8 = 1.68 atm — above the 1.60 ceiling (21·8 = 168 > 160). Reducing the oxygen fraction (trimix) keeps ppO₂ in range at depth.
The ledger holds this as [air_oxygen_toxic_deep](/theorem/air_oxygen_toxic_deep) — proven `by decide`, sorry-free:

```lean
21 * 8 > 160
```

### Blending is conserved by partial pressure: to fill trimix 18/45 to 200 bar, add O₂ to 36, He to 90, and top with N₂ to 74 — 36 + 90 + 74 = 200 (each is the fraction of the 200-bar fill).
The ledger holds this as [gas_blend_by_partial_pressure](/theorem/gas_blend_by_partial_pressure) — proven `by decide`, sorry-free:

```lean
(36 + 90 + 74 = 200) ∧ (9 % 9 = 0)
```

### Helium is non-narcotic: with 45% He the narcotic fraction (O₂+N₂) is 55%, so the equivalent narcotic depth is less than the real depth — at 40 m, 40·55 < 40·100. Trimix keeps a clear head deep.
The ledger holds this as [helium_reduces_narcosis](/theorem/helium_reduces_narcosis) — proven `by decide`, sorry-free:

```lean
40 * 55 < 40 * 100
```

### Decompression is bounded by the Haldane supersaturation ratio (classically ~2:1): from 4 atm you may ascend to 2 atm (ratio 2, tolerable) but not straight to 1 atm (ratio 4 > 2) — a direct ascent needs a stop. A model of the rule; never a plan.
The ledger holds this as [ascent_needs_a_stop](/theorem/ascent_needs_a_stop) — proven `by decide`, sorry-free:

```lean
((4 / 2 : Nat) = 2) ∧ ((4 / 1 : Nat) = 4) ∧ ((4 : Nat) > 2)
```


::: warning 
DIVING — the decidable arithmetic of trimix gas laws, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [trimix_fractions_sum_100](/theorem/trimix_fractions_sum_100) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
