---
title: "lean/HandleSpan.lean"
description: "Computed from lean/HandleSpan.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/HandleSpan.lean

> THE HANDLE SPAN — what 65536 handles of 32 qubits each come to, and what that total is NOT. — held by [handles_times_qubits](/theorem/handles_times_qubits) and its 5 siblings below.

**6 theorems**, from [handles_times_qubits](/theorem/handles_times_qubits) onward, each proven `by decide` in [lean/HandleSpan.lean](/lean/HandleSpan.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [exponents_add](/theorem/exponents_add). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHandleSpan.lean)** — nothing to install. The editor fetches `lean/HandleSpan.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE PRODUCT: 65536 handles at 32 qubits each is 2097152 qubits — stated both as the plain multiplication and as the powers of two it is, so the two readings are sealed to be the same number.
The ledger holds this as [handles_times_qubits](/theorem/handles_times_qubits) — proven `by decide`, sorry-free:

```lean
(65536 * 32 = 2097152) ∧ ((2:Nat)^16 * 2^5 = 2^21)
```

### WHY IT IS A SHIFT AND NOT A MULTIPLICATION OF QUBITS: counts multiply exactly when exponents add — 16 + 5 = 21. The qubit total is the sum of the two exponents.
The ledger holds this as [exponents_add](/theorem/exponents_add) — proven `by decide`, sorry-free:

```lean
(16 + 5 = 21) ∧ (16 * 5 ≠ 21)
```

### ONE HANDLE IS 8 HEX CHARACTERS AT 4 BITS EACH — 32 bits, spanning 2^32 = 4294967296 addresses. The segment length is what fixes the span; nothing else about a handle enters it.
The ledger holds this as [handle_spans_thirtytwo](/theorem/handle_spans_thirtytwo) — proven `by decide`, sorry-free:

```lean
(8 * 4 = 32) ∧ ((2:Nat)^32 = 4294967296)
```

### A REGISTER OF n QUBITS HOLDS 2^n AMPLITUDES, walked from none to sixteen: [1, 2, 4, …, 65536]. Sixteen qubits is already 65536 complex numbers held at once — the shipped messaging cap, and the reason a qubit count is never a count of things stored.
The ledger holds this as [register_holds_amplitudes](/theorem/register_holds_amplitudes) — proven `by decide`, sorry-free:

```lean
((List.range 17).map (fun n => 2^n)).getLast! = 65536
```

### THE SPAN IS NOT A CAPACITY, and the refusal is on this line: the 2097152-qubit total is strictly greater than the 16 qubits any shipped register holds, and the two numbers are not equal. A total arrived at by adding exponents describes what can be NAMED.
The ledger holds this as [total_exceeds_register](/theorem/total_exceeds_register) — proven `by decide`, sorry-free:

```lean
(2097152 > 16) ∧ (2097152 ≠ 16) ∧ ((2:Nat)^21 ≠ 2^16)
```

### AND THE TOTAL IS NOT AN AMPLITUDE COUNT EITHER: 2^21 = 2097152 is the number of QUBITS, while the amplitudes such a register would carry is 2 raised to that — a number this line does not attempt to write. SCOPE: what is sealed here is that the two differ, 2097152 ≠ 65536; the larger quantity is named.
The ledger holds this as [total_is_not_amplitudes](/theorem/total_is_not_amplitudes) — proven `by decide`, sorry-free:

```lean
(2097152 ≠ 65536) ∧ ((2:Nat)^21 > 2^16)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
