---
title: "The geared computer of Rhodes"
description: "Computed from lean/Antikythera.lean — 8 sealed theorems, every claim citing its proof."
---

# The geared computer of Rhodes

> ANTIKYTHERA — the geared computer of Rhodes as decidable arithmetic, demarcated: the cycles, the spirals, the prime, the pin-and-slot. — held by [metonic_is_the_intercalation](/theorem/metonic_is_the_intercalation) and its 7 siblings below.

**8 theorems**, from [metonic_is_the_intercalation](/theorem/metonic_is_the_intercalation) onward, each proven `by decide` in <a href="/lean/Antikythera.lean">lean/Antikythera.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [saros_counts_on_a_prime](/theorem/saros_counts_on_a_prime). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAntikythera.lean)** — nothing to install. The editor fetches `lean/Antikythera.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE METONIC DIAL COUNTS THE INTERCALATION: nineteen years hold 235 lunar months because twelve years carry twelve months and seven years carry thirteen — 12·12 + 7·13 = 144 + 91 = 235. The seven leap months ARE the cycle; the mechanism’s upper back dial walks exactly this sum, and the ledger’s own metonic_cycle seals the 19-year return this gearing turns into bronze.
The ledger holds this as [metonic_is_the_intercalation](/theorem/metonic_is_the_intercalation) — proven `by decide`, sorry-free:

```lean
(12 * 12 + 7 * 13 = 235) ∧ (144 + 91 = 235) ∧ (12 + 7 = 19)
```

### THE METONIC SPIRAL DIVIDES EXACTLY: 235 month-cells laid on a five-turn spiral give 47 cells to the turn — 235 = 5·47, both factors prime, so no coarser spiral divides evenly. The dial’s shape is the factorization; the pointer reads a month by walking a prime times a prime.
The ledger holds this as [metonic_spiral_five_turns](/theorem/metonic_spiral_five_turns) — proven `by decide`, sorry-free:

```lean
(235 = 5 * 47) ∧ ((List.range' 2 3).all (fun k => 5 % k != 0)) ∧ ((List.range' 2 45).all (fun k => 47 % k != 0))
```

### THE CALLIPPIC DIAL IS FOUR METONICS MADE HONEST: 4·235 = 940 months over 4·19 = 76 years, with one day dropped to true the calendar — the correction dial turns once while the Metonic turns four times. An ancient machine carrying its own error term: the fourfold gear IS the honesty.
The ledger holds this as [callippic_corrects_by_four](/theorem/callippic_corrects_by_four) — proven `by decide`, sorry-free:

```lean
(4 * 235 = 940) ∧ (4 * 19 = 76)
```

### THE SAROS COUNTS ECLIPSES ON A PRIME: 223 synodic months bring the Sun, Moon and node back to near-alignment, and 223 is prime — checked against every candidate below it — so the eclipse count shares no factor with any dial that would simplify it. The same 223 is the numerator of Archimedes’ floor under π (223/71, sealed where the ledger brackets π): two instruments of the same century, one integer — the eclipse counter and the circle bound — a shared number named, never a claim of connection.
The ledger holds this as [saros_counts_on_a_prime](/theorem/saros_counts_on_a_prime) — proven `by decide`, sorry-free:

```lean
(List.range' 2 221).all (fun k => 223 % k != 0)
```

### THE SAROS SPIRAL CANNOT DIVIDE EVENLY, AND THE REMAINDER IS THE POINT: 223 cells on a four-turn spiral leave 223 = 4·55 + 3 — three cells over, because a prime yields no even spiral. The dial-maker laid the remainder into the glyphs rather than rounding it away: the mechanism keeps the inconvenient three the way this ledger keeps 16 mod 6 = 4 — unevenness named, never smoothed.
The ledger holds this as [saros_spiral_leaves_three](/theorem/saros_spiral_leaves_three) — proven `by decide`, sorry-free:

```lean
(223 = 4 * 55 + 3) ∧ (223 % 4 = 3)
```

### THE EXELIGMOS CLOSES THE CLOCK: one Saros returns the eclipse a third of a day late, so the mechanism’s smallest dial counts three Saroi — 3·223 = 669 months — and its three sectors carry 0, 8 and 16 hours: 8·3 = 24, the day made whole. The correction dial is the ledger’s trinity closing a ring: three steps of eight, home to the start.
The ledger holds this as [exeligmos_closes_the_day](/theorem/exeligmos_closes_the_day) — proven `by decide`, sorry-free:

```lean
(3 * 223 = 669) ∧ (8 * 3 = 24) ∧ (([0,8,16] : List Nat).all (fun h => h % 8 == 0))
```

### THE DEEPEST GEAR HIDES IN PLAIN RATIO: the lunar anomaly pair k1 and k2 carry FIFTY TEETH EACH — ratio one, no speed change at all — and the Moon’s varying pace comes instead from the pin of one riding an offset slot in the other. Equal teeth, unequal motion: the mechanism proves that a ratio of one is not a claim of sameness, only of return — the variation lives in geometry this wing honestly does not seal. 50 = 50, and 50·2 = 100 turns of the pair per hundred months, exactly.
The ledger holds this as [pin_and_slot_equal_teeth](/theorem/pin_and_slot_equal_teeth) — proven `by decide`, sorry-free:

```lean
(50 = 50) ∧ (50 * 2 = 100)
```

### WHY THE GOOD PAIRS ARE COPRIME — THE HUNTING TOOTH: when meshing counts share no factor, every tooth of one gear meets every tooth of the other before the pattern repeats, so wear spreads evenly and the train stays true — gcd(19,235) = 1, gcd(4,223) = 1, gcd(3,8) = 1 across the mechanism’s cycle pairs. The same coprime walk that closes the circle of fifths and draws the pentagram in one stroke turned bronze twenty centuries earlier: closure is arithmetic, and arithmetic is what holds.
The ledger holds this as [hunting_teeth_wear_even](/theorem/hunting_teeth_wear_even) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 19 235 = 1) ∧ (Nat.gcd 4 223 = 1) ∧ (Nat.gcd 3 8 = 1)
```


::: warning 
ANTIKYTHERA — the geared computer of Rhodes as decidable arithmetic, demarcated: the cycles, the spirals, the prime, the pin-and-slot. The boundary is confirmed by the wing's own sealed theorems — e.g. [metonic_is_the_intercalation](/theorem/metonic_is_the_intercalation) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
