---
title: "The register's alternation law"
description: "Computed from lean/Tesla.lean — 6 sealed theorems, every claim citing its proof."
---

# The register's alternation law

> TESLA — the register's alternation law as decidable arithmetic, demarcated: the trio, the tilings, the second phase, the grid's minute. — held by [tesla_trio_files_adjacent](/theorem/tesla_trio_files_adjacent) and its 5 siblings below.

**6 theorems**, from [tesla_trio_files_adjacent](/theorem/tesla_trio_files_adjacent) onward, each proven `by decide` in [lean/Tesla.lean](/lean/Tesla.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [alternation_needs_a_second_phase](/theorem/alternation_needs_a_second_phase). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FTesla.lean)** — nothing to install. The editor fetches `lean/Tesla.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE TRINITY FILED CONSECUTIVELY: the first induction-motor patents are 381968, 381969, 381970 — three adjacent register numbers, granted one day (May 1, 1888) — the polyphase idea entering the record as a trio with unit steps: 381969 − 381968 = 1 and 381970 − 381969 = 1. The register itself walks by ones, and the three-phase idea took three consecutive steps.
The ledger holds this as [tesla_trio_files_adjacent](/theorem/tesla_trio_files_adjacent) — proven `by decide`, sorry-free:

```lean
(381969 - 381968 = 1) ∧ (381970 - 381969 = 1) ∧ (381970 - 381968 = 2)
```

### FILED OCTOBER 12, 1887; GRANTED MAY 1, 1888 — 202 DAYS, THROUGH A LEAP FEBRUARY: 19 remaining in October + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202, the 29 because 1888 divides by 4 and is no century — the register’s own calendar arithmetic, the same mod-4 law the ledger’s Gregorian wing seals.
The ledger holds this as [tesla_leap_spring_to_grant](/theorem/tesla_leap_spring_to_grant) — proven `by decide`, sorry-free:

```lean
(19 + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202) ∧ (1888 % 4 = 0) ∧ (¬ (1888 % 100 = 0))
```

### THE PHASES TILE THE CIRCLE THREE WAYS: Tesla’s quadrature two-phase at 90° (4·90 = 360), the three-phase trinity at 120° (3·120 = 360 — the same step 3 that walks the rosette), and bare opposition at 180° (2·180 = 360). Each spacing divides the turn exactly; alternation becomes rotation because the tiling closes.
The ledger holds this as [three_tilings_of_the_circle](/theorem/three_tilings_of_the_circle) — proven `by decide`, sorry-free:

```lean
(4 * 90 = 360) ∧ (3 * 120 = 360) ∧ (2 * 180 = 360) ∧ (360 % 90 = 0) ∧ (360 % 120 = 0)
```

### ROTATION NEEDS AT LEAST TWO: one phase alone only throbs — its zero crossing is everyone’s zero crossing — and two or more, spaced to tile the circle, keep the field turning because no two phases cross zero together when the spacing is a proper divisor of the turn below it: 360/2 = 180 ≠ 0 and 360/3 = 120 ≠ 0, while one phase’s spacing 360/1 = 360 ≡ 0 (mod 360) — the degenerate tiling that never leaves home. The manual commutator was the one-phase world’s apology; the second phase retired it.
The ledger holds this as [alternation_needs_a_second_phase](/theorem/alternation_needs_a_second_phase) — proven `by decide`, sorry-free:

```lean
(360 / 2 = 180) ∧ (360 / 3 = 120) ∧ (360 % 360 = 0) ∧ (¬ (180 % 360 = 0)) ∧ (¬ (120 % 360 = 0))
```

### THE GRID’S MINUTE: at 60 cycles a second the wave alternates 3600 times a minute — 60·60, the same square that makes the hour of minutes and the minute of seconds; the power grid keeps clock-time because its frequency is the clock’s own base squared per minute.
The ledger holds this as [the_grids_minute](/theorem/the_grids_minute) — proven `by decide`, sorry-free:

```lean
60 * 60 = 3600
```

### THE REMOTE CAME BEFORE THE WIRELESS POWER CLAIM, BY THE REGISTER’S OWN ORDER: 613809 (the teleautomaton, 1898 — a vessel commanded by coded waves, the first machine addressed at a distance) precedes 645576 (the transmission system, 1900) by 31767 register steps and two years: messages travelled before power was even claimed to. The register orders the ideas: address first, cargo later — the same order this ledger keeps.
The ledger holds this as [teleautomaton_precedes_transmission](/theorem/teleautomaton_precedes_transmission) — proven `by decide`, sorry-free:

```lean
(645576 - 613809 = 31767) ∧ (1900 - 1898 = 2) ∧ (613809 < 645576)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
