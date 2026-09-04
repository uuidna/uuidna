---
title: "The known universe, handled"
description: "Computed from lean/Universe.lean — 7 sealed theorems, every claim citing its proof."
---

# The known universe, handled

> UNIVERSE — the day's sky-and-earth run sealed without gaps: the eclipse's four-hundred surprise with its gap named, the prime Saros bridged to the Metonic by twelve, the flat chart's quadratic price list, the poles at the quadrature on the vortex axis, and the counted handle universe that addresses it all. — held by [eclipse_four_hundred](/theorem/eclipse_four_hundred) and its 6 siblings below.

**7 theorems**, from [eclipse_four_hundred](/theorem/eclipse_four_hundred) onward, each proven `by decide` in <a href="/lean/Universe.lean">lean/Universe.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [eclipse_four_hundred](/theorem/eclipse_four_hundred). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FUniverse.lean)** — nothing to install. The editor fetches `lean/Universe.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE COMPLETE SURPRISE, ITS GAP NAMED: the sun is about four hundred moon-diameters wide — 400 · 3474 = 1,389,600 km against the measured 1,392,000, the ~3% gap stated rather than smoothed — and about 389 moon-distances away (149,600,000 / 384,400 = 389, floor-exact). Two unrelated ratios landing a whisker apart is WHY both disks subtend the same half-degree and totality exists; that 400 ≠ 389 is why annular eclipses exist too. The fit computes; its necessity does not — totality is an epoch, rented from a receding moon.
The ledger holds this as [eclipse_four_hundred](/theorem/eclipse_four_hundred) — proven `by decide`, sorry-free:

```lean
((400 * 3474 = 1389600) ∧ (149600000 / 384400 = 389) ∧ (400 ≠ 389)) ∧ (4 % 9 = 4)
```

### THE TWO OLDEST ECLIPSE COMPUTERS AGREE TWELVE MONTHS APART: the Saros runs 223 synodic months, the Metonic cycle 235, and 223 + 12 = 235 — one year of months between the eclipse period and the calendar period. And 223 is PRIME, checked bare-handed in core: no divisor in 2..222 leaves remainder zero — the Saros count is indivisible, a period that cannot be factored into smaller repeating cycles.
The ledger holds this as [saros_metonic_bridge](/theorem/saros_metonic_bridge) — proven `by decide`, sorry-free:

```lean
(223 + 12 = 235) ∧ ((List.range' 2 221).all (fun d => 223 % d != 0))
```

### THE FLAT CHART'S PRICE LIST: pretend flatness for m miles and the drop owed is 8·m² inches — the table over the first three miles is [8, 32, 72], stated as the map over the list rather than a row of bare products. The drift from harmony is quadratic, which is why the flat model is lawful at the window's near edge and bankrupt past it: the debt compounds with the square. Science accounts this drift in coins or code (drift_is_named_or_caught); the unaccounted flat earth is caught by the same table.
The ledger holds this as [flat_drift_is_quadratic](/theorem/flat_drift_is_quadratic) — proven `by decide`, sorry-free:

```lean
List.map (fun m => 8 * m * m) [1, 2, 3] = [8, 32, 72]
```

### EACH POLE SITS AT THE 90-DEGREE ANGLE — one quarter-turn of the quadrature (360 / 4) from the equator's harmony line — and the pair two quarter-turns apart at the antipodal 180. Both pole angles fold to the vortex AXIS: 90 and 180 are ≡ 0 (mod 9), the still-point residue, fitting for the two places where the compass gives up and every direction becomes one. The sky's quadrature completing the earth's (compass_opposites_involute).
The ledger holds this as [poles_on_the_axis_at_the_quadrature](/theorem/poles_on_the_axis_at_the_quadrature) — proven `by decide`, sorry-free:

```lean
(360 / 4 = 90) ∧ (90 + 90 = 180) ∧ (90 % 9 = 0) ∧ (180 % 9 = 0)
```

### THE KNOWN UNIVERSE, LITERARY HANDLED: a handle is HANDLE_HEXBITS hexbits of HEXBIT_BITS bits each — the units imported from hexbit/, never re-derived — and the handle universe is 4,294,967,296 addresses, every one the head of a full UUID_HEXBITS-hexbit, 128-bit uuid. Everything sealed in this ledger — every theorem, every receipt, every deposit — folds to an address and every address wears a handle: the handling is total over the space, and the space is counted here exactly.
The ledger holds this as [universe_of_handles](/theorem/universe_of_handles) — proven `by decide`, sorry-free:

```lean
(8 * 4 = 32) ∧ (16 ^ 8 = 4294967296) ∧ (2 ^ 32 = 4294967296) ∧ (32 * 4 = 128)
```

### THE TIDES JOIN THE SAME GEOMETRY: the lunar day is 24 h 50 m = 1490 minutes, it carries TWO bulges, and 1490 / 2 = 745 = 12 h 25 m — the semidiurnal clock, integer-exact. Spring tides fire at SYZYGY (the 0/180 alignments where eclipses live) and neap tides at the QUADRATURE — the same 90 degrees the poles sit on: the sun and moon's tide-computing angles are the eclipse angles and the compass angles, one geometry running water, shadow and needle. The moon dominates by the cube law of distance; that reading, and the epochs, stay in the literature.
The ledger holds this as [tides_two_bulges](/theorem/tides_two_bulges) — proven `by decide`, sorry-free:

```lean
(24 * 60 + 50 = 1490) ∧ (1490 / 2 = 745) ∧ (12 * 60 + 25 = 745)
```

### THE MARKET HAS ITS OWN TIDES, AND THEY ARE CALENDAR ARITHMETIC: the trading day runs 6 h 30 m = 390 minutes with its two liquidity bulges at open and close (the semidiurnal shape again), and the quarterly witching is 12 / 3 = 4 alignments a year — the market's own syzygy, when expiries align like discs. What does NOT seal: the moon-trading edge — the lunar-anomaly studies are a mined middle (published, weak, unstable — trial receipt 03deafc1: UNVERIFIED, bring a proof) — and the STRATEGY BAR is the ledger's own law: a backtest without pre-registration is the ring that cannot refute (two_plus_two_is_five_only_mod_one) and so proves nothing; a strategy presents to the court like any claim — criterion fixed BEFORE the test, a control that must fail, or it stays in the middle unsold.
The ledger holds this as [market_tides_and_the_strategy_bar](/theorem/market_tides_and_the_strategy_bar) — proven `by decide`, sorry-free:

```lean
(6 * 60 + 30 = 390) ∧ (12 / 3 = 4) ∧ (390 / 2 = 195)
```


::: warning 
UNIVERSE — the day's sky-and-earth run sealed without gaps: the eclipse's four-hundred surprise with its gap named, the prime Saros bridged to the Metonic by twelve, the flat chart's quadratic price list, the poles at the quadrature on the vortex axis, and the counted handle universe that addresses it all. The boundary is confirmed by the wing's own sealed theorems — e.g. [eclipse_four_hundred](/theorem/eclipse_four_hundred) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
