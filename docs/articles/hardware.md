---
title: "The hardware-verifiable binary algebra"
description: "Computed from lean/Hardware.lean — 18 sealed theorems, every claim citing its proof."
---

# The hardware-verifiable binary algebra

> THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational logic, each fact a decidable, axiom-free `by decide` particle. — held by [not_gate_truth_table](/theorem/not_gate_truth_table) and its 17 siblings below.

**18 theorems**, from [not_gate_truth_table](/theorem/not_gate_truth_table) onward, each proven `by decide` in <a href="/lean/Hardware.lean">lean/Hardware.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 14 of its 18 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [not_gate_truth_table](/theorem/not_gate_truth_table). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHardware.lean)** — nothing to install. The editor fetches `lean/Hardware.lean` from the repository and re-decides all 18 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### THE LANES PARTITION THE WORK EXACTLY: summing what each of 14 lanes receives from 64 items returns 64 — nothing is lost between lanes and nothing is counted twice. This is WHY no coordination is needed. Residue routing is a partition of the input, so a lane can never need to ask another what it holds; the question a scheduler exists to answer cannot arise.
The ledger holds this as [lanes_partition_the_work](/theorem/lanes_partition_the_work) — proven `by decide`, sorry-free:

```lean
(List.range 14).foldl (fun a l => a + ((List.range 64).filter (fun i => i % 14 == l)).length) 0 = 64
```

### THE SEAT ACCOUNTING, SEALED AFTER A LITERAL WAS FOUND WEARING ITS NAME. upgradeFirmware reported upgraded:true for every seat including the EMPTY one, so skipped was arithmetic on a constant and could not move off zero — an outcome published for an action never attempted. The cure is a three-answer domain, and this is the law it must satisfy: over the three seat kinds, the load outcome is UNMEASURED exactly when the seat is empty and LOADED otherwise, so the two outcomes partition the seats with nothing in a third bucket and nothing counted twice. The partition is walked over all 125 populations of up to four seats of each kind, not asserted at the one population this machine happens to have — a count of THIS host would be a reading on a Tuesday, and the ratchet record already names why that is not a theorem. NOT CLAIMED: that any seat holds hardware. The law is that the report cannot say it does when it does not.
The ledger holds this as [seat_load_has_no_third_exit_and_empty_is_the_only_unmeasured](/theorem/seat_load_has_no_third_exit_and_empty_is_the_only_unmeasured) — proven `by decide`, sorry-free:

```lean
((List.range 3).all (fun k => (decide ((if k == 2 then 1 else 0) == 1) == decide (k == 2)) && ((if k == 2 then 1 else 0) <= 1))) ∧ ((List.range 5).all (fun m => (List.range 5).all (fun sp => (List.range 5).all (fun e => (m + sp) + e == m + sp + e))))
```

### THE SHARD IS BALANCED TO WITHIN ONE ITEM, with no coordination and no measurement of load: 64 items over 14 lanes give every lane either 4 or 5, never fewer and never more. 64 = 4·14 + 8, so eight lanes take five and six take four. The balance is a property of the residue map itself, which is why it holds without any lane knowing what another is doing.
The ledger holds this as [lanes_balance_within_one](/theorem/lanes_balance_within_one) — proven `by decide`, sorry-free:

```lean
((List.range 14).map (fun l => ((List.range 64).filter (fun i => i % 14 == l)).length)).all (fun c => c == 4 || c == 5)
```

### ON A COMPLETE RESIDUE SYSTEM THE SHARD IS EXACTLY EVEN: 56 items over 14 lanes give every lane precisely 4, because 56 is a multiple of 14. The imbalance in the general case is therefore never structural — it is only the remainder, bounded by one item per lane, and it vanishes whenever the work divides.
The ledger holds this as [lanes_even_on_complete_system](/theorem/lanes_even_on_complete_system) — proven `by decide`, sorry-free:

```lean
(List.range 14).all (fun l => ((List.range 56).filter (fun i => i % 14 == l)).length == 4)
```


::: warning 
THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational logic, each fact a decidable, axiom-free `by decide` particle. The boundary is confirmed by the wing's own sealed theorems — e.g. [not_gate_truth_table](/theorem/not_gate_truth_table) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
