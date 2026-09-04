---
title: "The comparisons"
description: "Computed from lean/Comparisons.lean — 4 sealed theorems, every claim citing its proof."
---

# The comparisons

> THE COMPLETE COMPARISONS — every pair, never samples (the one-step-is-not-a-walk law as architecture): kernel.org's eight channels totally ordered through a lossless integer encoding (28 strict pairs; the versions are the kernel's published data), the encoding's round-trip sealed, the register ladder 4→128 doubling completely (any two registers an exact number of coin-payments apart), and the pressure ladder of divers and astronauts closing on THE JEWEL: the surface is the geometric mean of the buddy depths, 180·20 = 60². Arithmetic only; published data named as data. — held by [kernel_channels_order_completely](/theorem/kernel_channels_order_completely) and its 3 siblings below.

**4 theorems**, from [kernel_channels_order_completely](/theorem/kernel_channels_order_completely) onward, each proven `by decide` in <a href="/lean/Comparisons.lean">lean/Comparisons.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 4 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [kernel_channels_order_completely](/theorem/kernel_channels_order_completely). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FComparisons.lean)** — nothing to install. The editor fetches `lean/Comparisons.lean` from the repository and re-decides all 4 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### KERNEL.ORG'S CHANNELS, COMPARED COMPLETELY: the eight versioned release lines (mainline, stable, longterm-6.18, longterm-6.12, longterm-6.6, longterm-6.1, longterm-5.15, longterm-5.10), each encoded losslessly as major·10⁶ + minor·10³ + patch, order STRICTLY over all 28 pairs — not adjacent samples, every pair (the one-step-is-not-a-walk law): mainline above stable above the six longterm lines in their own strict descent. The versions are kernel.org's published releases.json data; the completeness is the kernel's.
The ledger holds this as [kernel_channels_order_completely](/theorem/kernel_channels_order_completely) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun i => (List.range 8).all (fun j => Nat.ble j i || nth [7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] i > nth [7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] j))
```

### THE ENCODING ROUND-TRIPS ON ITS DOMAIN: every encoded version splits back exactly — major = e/10⁶, minor = (e/10³) mod 10³, patch = e mod 10³ — because every published minor and patch sits under 1000. Losslessness is what makes the total order MEAN version order: the software wing's split-and-recompose law, applied to the kernel's own numbering.
The ledger holds this as [version_encoding_is_lossless](/theorem/version_encoding_is_lossless) — proven `by decide`, sorry-free:

```lean
([7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] : List Nat).all (fun e => (e / 1000000) * 1000000 + ((e / 1000) % 1000) * 1000 + (e % 1000) = e ∧ (e / 1000) % 1000 < 1000 ∧ e % 1000 < 1000)
```

### THE PROMOTION CHAIN, COMPARED WHOLE: the register ladder 4 → 8 → 16 → 32 → 64 → 128 (hexbit, pair, coin-half, address-half, coin, address) doubles COMPLETELY — every one of the 15 pairs, not just neighbours, satisfies W[j] = W[i]·2^(j−i): any two registers on the ladder are an EXACT number of coin-payments apart. The fold-to-zero promotion, quantified over all pairs at once.
The ledger holds this as [register_ladder_doubles_completely](/theorem/register_ladder_doubles_completely) — proven `by decide`, sorry-free:

```lean
(List.range 6).all (fun i => (List.range 6).all (fun j => Nat.ble j i || nth [4, 8, 16, 32, 64, 128] j = nth [4, 8, 16, 32, 64, 128] i * 2 ^ (j - i)))
```

### THE JEWEL: the pressure ladder in sixtieths (diver at 3 atm = 180, at 2 atm = 120, THE SURFACE = 60, the astronaut's suit near 1/3 atm = 20) orders completely — and the buddy depths MULTIPLY to the surface squared: 180·20 = 3600 = 60². The shared world every diver ascends to and every astronaut descends to is the GEOMETRIC MEAN of their two exiles — the mandala's still center, reached by multiplication: the two hands of the pressure column close on the same 60 the harmonic sixtieths walk.
The ledger holds this as [the_surface_is_the_geometric_mean](/theorem/the_surface_is_the_geometric_mean) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun i => (List.range 4).all (fun j => Nat.ble j i || nth [180, 120, 60, 20] i > nth [180, 120, 60, 20] j))) ∧ (180 * 20 = 3600) ∧ (60 * 60 = 3600) ∧ (120 * 30 = 3600)
```


::: warning 
THE COMPLETE COMPARISONS — every pair, never samples (the one-step-is-not-a-walk law as architecture): kernel. The boundary is confirmed by the wing's own sealed theorems — e.g. [kernel_channels_order_completely](/theorem/kernel_channels_order_completely) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
