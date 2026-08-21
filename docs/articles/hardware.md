---
title: "The hardware-verifiable binary algebra"
description: "Computed from lean/Hardware.lean — 14 sealed theorems, every claim citing its proof."
---

# The hardware-verifiable binary algebra

> THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational logic, each fact a decidable, axiom-free `by decide` particle. — held by [not_gate_truth_table](/theorem/not_gate_truth_table) and its 13 siblings below.

**14 theorems**, from [not_gate_truth_table](/theorem/not_gate_truth_table) onward, each proven `by decide` in [lean/Hardware.lean](/lean/Hardware.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 10 of its 14 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [not_gate_truth_table](/theorem/not_gate_truth_table). A boundary stated here is decided.

### The NOT gate as arithmetic: NOT a = 1 − a over a bit. Its truth table is [0,1] ↦ [1,0] — the one-input inverter, sealed exactly.
The ledger holds this as [not_gate_truth_table](/theorem/not_gate_truth_table) — proven `by decide`, sorry-free:

```lean
[0,1].map (fun a => 1 - a) = [1,0]
```

### The AND gate as arithmetic: AND a b = a · b over bits. Its truth table over (0,0),(0,1),(1,0),(1,1) is [0,0,0,1] — one only when both inputs are one.
The ledger holds this as [and_gate_truth_table](/theorem/and_gate_truth_table) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1]
```

### The OR gate as arithmetic: OR a b = a + b − a·b over bits. Its truth table is [0,1,1,1] — zero only when both inputs are zero.
The ledger holds this as [or_gate_truth_table](/theorem/or_gate_truth_table) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 + p.2 - p.1 * p.2) = [0,1,1,1]
```

### The XOR gate as the axiom-free bitwise `lxor`: its truth table over the four rows is [0,1,1,0] — one exactly when the inputs differ. The difference detector, kernel-only.
The ledger holds this as [xor_gate_truth_table](/theorem/xor_gate_truth_table) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].map (fun p => lxor p.1 p.2) = [0,1,1,0]
```

### XOR IS addition in ℤ/2: lxor a b = (a + b) mod 2 for bits. The difference gate and the parity sum are one arithmetic — the binary algebra folds back to the field of two elements.
The ledger holds this as [xor_is_addition_mod_two](/theorem/xor_is_addition_mod_two) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 == (p.1 + p.2) % 2)
```

### The algebra is CLOSED on the bit: every primitive gate returns a value ≤ 1 for bit inputs — NOT, AND, OR, XOR all land back in {0,1}. Combinational logic never leaves 𝔹.
The ledger holds this as [gate_output_is_one_bit](/theorem/gate_output_is_one_bit) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 <= 1) ∧ (p.1 * p.2 <= 1) ∧ (p.1 + p.2 - p.1 * p.2 <= 1) ∧ (lxor p.1 p.2 <= 1))
```

### NAND rebuilds NOT: NAND a a = 1 − a·a = 1 − a for a bit — tie a NAND's inputs together and it inverts. The first leg of NAND's universality.
The ledger holds this as [nand_reconstructs_not](/theorem/nand_reconstructs_not) — proven `by decide`, sorry-free:

```lean
[0,1].all (fun a => (1 - a * a) == (1 - a))
```

### NAND rebuilds AND: AND a b = NOT (NAND a b) = 1 − (1 − a·b) = a·b — a NAND followed by a NAND-inverter is an AND. The second leg.
The ledger holds this as [nand_reconstructs_and](/theorem/nand_reconstructs_and) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1 * p.2)) == p.1 * p.2)
```

### NAND rebuilds OR: OR a b = NAND (NOT a) (NOT b) = 1 − (1−a)(1−b) = a + b − a·b — invert both inputs into a NAND. The third leg.
The ledger holds this as [nand_reconstructs_or](/theorem/nand_reconstructs_or) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1) * (1 - p.2)) == p.1 + p.2 - p.1 * p.2)
```

### NAND is FUNCTIONALLY COMPLETE for {NOT, AND, OR}: across every bit assignment, the three NAND reconstructions all hold at once — so a single gate type generates the whole basis. This is why digital chips are one repeated NAND.
The ledger holds this as [nand_functionally_complete](/theorem/nand_functionally_complete) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun n => ((1 - (n%2) * (n%2)) == (1 - n%2)) ∧ ((1 - (1 - (n%2) * (n/2%2))) == (n%2) * (n/2%2)) ∧ ((1 - (1 - n%2) * (1 - n/2%2)) == (n%2) + (n/2%2) - (n%2) * (n/2%2)))
```

### De Morgan in gates: NOT (a AND b) = (NOT a) OR (NOT b), as 1 − a·b = (1−a) + (1−b) − (1−a)(1−b) over bits. The identity that lets a synthesiser push bubbles through gates.
The ledger holds this as [de_morgan_gate_law](/theorem/de_morgan_gate_law) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 * p.2) == (1 - p.1) + (1 - p.2) - (1 - p.1) * (1 - p.2))
```

### The HALF-ADDER is correct: sum = XOR a b, carry = AND a b, and sum + 2·carry = a + b over every bit pair. The one-bit addition circuit, proven against its arithmetic meaning.
The ledger holds this as [half_adder_correct](/theorem/half_adder_correct) — proven `by decide`, sorry-free:

```lean
[(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 + 2 * (p.1 * p.2) == p.1 + p.2)
```

### The FULL-ADDER is correct: sum = XOR (XOR a b) cin, carry = (a+b+cin)/2, and sum + 2·carry = a + b + cin across all eight input rows. The cell every ripple-carry adder chains, proven exact.
The ledger holds this as [full_adder_correct](/theorem/full_adder_correct) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => lxor (lxor (n%2) (n/2%2)) (n/4%2) + 2 * ((n%2 + n/2%2 + n/4%2) / 2) == n%2 + n/2%2 + n/4%2)
```

### The 2:1 MULTIPLEXER selects: mux s a b = (1−s)·a + s·b equals a when the select is 0 and b when it is 1, across all eight rows. Routing as arithmetic — the primitive every datapath is woven from.
The ledger holds this as [mux_selects_input](/theorem/mux_selects_input) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (1 - n%2) * (n/2%2) + (n%2) * (n/4%2) == (if n%2 == 0 then n/2%2 else n/4%2))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
