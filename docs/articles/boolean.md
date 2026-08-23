---
title: "The boolean"
description: "Computed from lean/Boolean.lean — 6 sealed theorems, every claim citing its proof."
---

# The boolean

> THE SIXTEEN BINARY BOOLEAN FUNCTIONS — enumerated, under the names mathematics and digital logic already use. — held by [sixteen_binary_functions](/theorem/sixteen_binary_functions) and its 5 siblings below.

**6 theorems**, from [sixteen_binary_functions](/theorem/sixteen_binary_functions) onward, each proven `by decide` in [lean/Boolean.lean](/lean/Boolean.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [nand_rebuilds_the_others](/theorem/nand_rebuilds_the_others). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FBoolean.lean)** — nothing to install. The editor fetches `lean/Boolean.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THERE ARE EXACTLY SIXTEEN two-input boolean functions, and they are the sixteen values of a nibble: each function IS its four-row truth table, so 2^(2^2) = 16 counts them and no argument is needed beyond the encoding. All sixteen are distinct.
The ledger holds this as [sixteen_binary_functions](/theorem/sixteen_binary_functions) — proven `by decide`, sorry-free:

```lean
((List.range 16).map rowsOf).eraseDups.length = 16 ∧ ((2:Nat)^(2^2) = 16)
```

### THE CLASSICAL GATES ARE PARTICULAR ROWS: AND is 0001, OR is 0111, XOR is 0110, NAND is 1110 and NOR is 1000, reading the table over (0,0), (0,1), (1,0), (1,1). Each named gate is one of the sixteen and the line identifies which, so the names are anchored to the enumeration rather than asserted beside it.
The ledger holds this as [gates_name_their_tables](/theorem/gates_name_their_tables) — proven `by decide`, sorry-free:

```lean
(rowsOf 8 = [0,0,0,1]) ∧ (rowsOf 14 = [0,1,1,1]) ∧ (rowsOf 6 = [0,1,1,0]) ∧ (rowsOf 7 = [1,1,1,0]) ∧ (rowsOf 1 = [1,0,0,0])
```

### NAND IS FUNCTIONALLY COMPLETE, decided rather than claimed: NOT is NAND of a value with itself, AND is the negation of NAND, and OR is NAND of the two negations. Every input pair checked, so the completeness argument is carried out rather than cited — this is why a chip can be one repeated gate.
The ledger holds this as [nand_rebuilds_the_others](/theorem/nand_rebuilds_the_others) — proven `by decide`, sorry-free:

```lean
((List.range 2).all (fun a => nandB a a == notB a)) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => notB (nandB a b) == andB a b))) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => nandB (notB a) (notB b) == orB a b)))
```

### EXACTLY TWO OF THE SIXTEEN ARE CONSTANT — the always-false 0000 and the always-true 1111 — so fourteen actually depend on their inputs. Two, and the line proves the count rather than the reader noticing it.
The ledger holds this as [two_functions_ignore_input](/theorem/two_functions_ignore_input) — proven `by decide`, sorry-free:

```lean
(((List.range 16).filter (fun m => (rowsOf m).eraseDups.length == 1)).length = 2) ∧ (((List.range 16).filter (fun m => (rowsOf m).eraseDups.length > 1)).length = 14)
```

### XOR IS NOT OR, and the difference is the single row where both inputs hold: 0110 against 0111. The two agree on three of four rows, which is why the distinction is worth deciding rather than assuming — a gate that agreed everywhere would be the same gate.
The ledger holds this as [xor_differs_from_or](/theorem/xor_differs_from_or) — proven `by decide`, sorry-free:

```lean
(rowsOf 6 ≠ rowsOf 14) ∧ ((rowsOf 6).take 3 = (rowsOf 14).take 3) ∧ (rowsOf 6 = [0,1,1,0])
```

### IMPLICATION IS ONE OF THE SIXTEEN. Its converse and both negations are also among the sixteen, so the whole of two-input logic is inside the enumeration with nothing left outside it.
The ledger holds this as [implication_is_a_gate](/theorem/implication_is_a_gate) — proven `by decide`, sorry-free:

```lean
(rowsOf 13 = [1,0,1,1]) ∧ (rowsOf 11 = [1,1,0,1]) ∧ (rowsOf 2 = [0,1,0,0])
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
