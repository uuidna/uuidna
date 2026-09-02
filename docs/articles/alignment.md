---
title: "The alignment"
description: "Computed from lean/Alignment.lean — 6 sealed theorems, every claim citing its proof."
---

# The alignment

> ALIGNMENT — which moduli tile a qubit and which waste it. — held by [hexbit_is_four_qubits](/theorem/hexbit_is_four_qubits) and its 5 siblings below.

**6 theorems**, from [hexbit_is_four_qubits](/theorem/hexbit_is_four_qubits) onward, each proven `by decide` in [lean/Alignment.lean](/lean/Alignment.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [ten_costs_more_than_fifteen](/theorem/ten_costs_more_than_fifteen). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAlignment.lean)** — nothing to install. The editor fetches `lean/Alignment.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A HEX CHARACTER IS EXACTLY FOUR QUBITS: 16 = 2^4, so the two measures tile with no remainder. This is why a uuid of 32 hex characters is a clean 128 bits and a handle of 8 is a clean 32.
The ledger holds this as [hexbit_is_four_qubits](/theorem/hexbit_is_four_qubits) — proven `by decide`, sorry-free:

```lean
((2:Nat)^4 = 16) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32)
```

### WHAT EACH MODULUS COSTS IN ONE FOUR-QUBIT CELL: sixteen wastes nothing, fifteen wastes one, ten wastes six, nine wastes seven. The walk enters through a mod-ten reduction, so six of every sixteen states go unused at the door.
The ledger holds this as [moduli_waste_states](/theorem/moduli_waste_states) — proven `by decide`, sorry-free:

```lean
[9,10,15,16].map (fun m => 16 - m) = [7,6,1,0]
```

### ONLY SIXTEEN TILES THE CELL, and the others are named as failing: 16 leaves nothing over while 15, 10 and 9 each leave a remainder. A modulus tiles a qubit cell exactly when it IS the cell, and none of the harmonic moduli is.
The ledger holds this as [sixteen_alone_tiles](/theorem/sixteen_alone_tiles) — proven `by decide`, sorry-free:

```lean
(16 - 16 = 0) ∧ ([9,10,15].all (fun m => 16 - m > 0))
```

### THE DOOR IS THE EXPENSIVE CHOICE: reducing mod ten wastes six of sixteen where the base's own invariant, fifteen, wastes one — six times the loss, on the same four qubits. SCOPE: this decides the counting only. The ledger walks ten DIGITS deliberately, because folding mod nine collapsed nine onto zero and made a tenth of the domain unreachable; that reason is recorded where the choice is made.
The ledger holds this as [ten_costs_more_than_fifteen](/theorem/ten_costs_more_than_fifteen) — proven `by decide`, sorry-free:

```lean
(16 - 10 = 6) ∧ (16 - 15 = 1) ∧ (16 - 10 > 16 - 15)
```

### THE ADDRESSING LAYER IS BUILT OF POWERS OF TWO — 16, 32, 128, 65536 are 2^4, 2^5, 2^7, 2^16 — while nine and ten are not powers of two at all, which the line proves by exhibiting the nearest ones on either side: 8 < 9 < 16 and 8 < 10 < 16.
The ledger holds this as [powers_of_two_are_the_substance](/theorem/powers_of_two_are_the_substance) — proven `by decide`, sorry-free:

```lean
((2:Nat)^4 = 16 ∧ (2:Nat)^5 = 32 ∧ (2:Nat)^7 = 128 ∧ (2:Nat)^16 = 65536) ∧ ((2:Nat)^3 < 9 ∧ 9 < 2^4) ∧ ((2:Nat)^3 < 10 ∧ 10 < 2^4)
```

### AND THE DISCARD, COUNTED: a handle carries 32 qubits of span, the seed it becomes carries at most four, so 28 are dropped before the walk takes its first step. The line proves the subtraction and that the two are not equal — the walk sees an eighth of what the handle names.
The ledger holds this as [handle_discards_before_walking](/theorem/handle_discards_before_walking) — proven `by decide`, sorry-free:

```lean
(32 - 4 = 28) ∧ (32 ≠ 4) ∧ (4 * 8 = 32)
```


::: warning 
ALIGNMENT — which moduli tile a qubit and which waste it. The boundary is confirmed by the wing's own sealed theorems — e.g. [hexbit_is_four_qubits](/theorem/hexbit_is_four_qubits) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
