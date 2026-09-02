---
title: "The trinities"
description: "Computed from lean/Trinities.lean — 6 sealed theorems, every claim citing its proof."
---

# The trinities

> THE TRINITY COVERING — how many threes span a space. — held by [trinities_span_powers](/theorem/trinities_span_powers) and its 5 siblings below.

**6 theorems**, from [trinities_span_powers](/theorem/trinities_span_powers) onward, each proven `by decide` in [lean/Trinities.lean](/lean/Trinities.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [trinity_exceeds_qubit](/theorem/trinity_exceeds_qubit). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FTrinities.lean)** — nothing to install. The editor fetches `lean/Trinities.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A TRINITY IS THREE, and n of them span 3^n — the same shape as n qubits spanning 2^n. Walked from none to six: [1, 3, 9, 27, 81, 243, 729]. Nine is two trinities and eighty-one is four.
The ledger holds this as [trinities_span_powers](/theorem/trinities_span_powers) — proven `by decide`, sorry-free:

```lean
(List.range 7).map (fun n => 3^n) = [1,3,9,27,81,243,729]
```

### A TRINITY IS WORTH MORE THAN A QUBIT AND LESS THAN TWO: 2^1 < 3 < 2^2. Threes therefore never divide a binary space evenly, which is why a fold of fifteen leaves is five trinities and not a power of two.
The ledger holds this as [trinity_exceeds_qubit](/theorem/trinity_exceeds_qubit) — proven `by decide`, sorry-free:

```lean
((2:Nat)^1 < 3) ∧ (3 < (2:Nat)^2)
```

### COVERING 10^9 TAKES 19 TRINITIES, AND 18 DO NOT — both halves on one line, so this states THE bound and not merely a bound. 3^19 reaches it; 3^18 falls short. A theorem that only said "19 suffice" would be satisfied by any larger number and would seal nothing.
The ledger holds this as [trinities_cover_billion](/theorem/trinities_cover_billion) — proven `by decide`, sorry-free:

```lean
((3:Nat)^19 ≥ 10^9) ∧ ((3:Nat)^18 < 10^9)
```

### COVERING 2^64 TAKES 41 TRINITIES, AND 40 DO NOT — both halves on one line, so this states THE bound and not merely a bound. 3^41 reaches it; 3^40 falls short. A theorem that only said "41 suffice" would be satisfied by any larger number and would seal nothing.
The ledger holds this as [trinities_cover_word](/theorem/trinities_cover_word) — proven `by decide`, sorry-free:

```lean
((3:Nat)^41 ≥ 2^64) ∧ ((3:Nat)^40 < 2^64)
```

### COVERING 2^128 TAKES 81 TRINITIES, AND 80 DO NOT — both halves on one line, so this states THE bound and not merely a bound. 3^81 reaches it; 3^80 falls short. A theorem that only said "81 suffice" would be satisfied by any larger number and would seal nothing.
The ledger holds this as [trinities_cover_address](/theorem/trinities_cover_address) — proven `by decide`, sorry-free:

```lean
((3:Nat)^81 ≥ 2^128) ∧ ((3:Nat)^80 < 2^128)
```

### THE COVERING NUMBER FOR THE ADDRESS SPACE IS THE RING'S OWN TABLE SIZE: 81 = 9^2 = 3^4, the full Z/9 multiplication table. SCOPE: this seals the arithmetic identity and nothing else. 128 divided by log2(3) is 80.76, so any space near 2^128 needs about eighty-one threes — the coincidence is decidable, its meaning is not, and no meaning is claimed here.
The ledger holds this as [eightyone_squares_nine](/theorem/eightyone_squares_nine) — proven `by decide`, sorry-free:

```lean
(81 = 9^2) ∧ (81 = 3^4) ∧ (9 = 3^2)
```


::: warning 
THE TRINITY COVERING — how many threes span a space. The boundary is confirmed by the wing's own sealed theorems — e.g. [trinities_span_powers](/theorem/trinities_span_powers) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
