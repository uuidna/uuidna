---
title: "UUID quantum programs"
description: "Computed from lean/UuidProgram.lean — 11 sealed theorems, every claim citing its proof."
---

# UUID quantum programs

> UUID QUANTUM PROGRAMS — a UUID register and the program it names, with exact quantum semantics: every theorem states what the program at adb1b053-39db-3a30-0000-000000000000 (uuidna_quantum) computes, and its JS mirror calls that program by its UUID — held by [uuidprog_address](/theorem/uuidprog_address) and its 10 siblings below.

**11 theorems** and **12,100 decided cases**, from [uuidprog_address](/theorem/uuidprog_address) onward, each proven `by decide` in <a href="/lean/UuidProgram.lean">lean/UuidProgram.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FUuidProgram.lean)** — nothing to install. The editor fetches `lean/UuidProgram.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the program's UUID is a valid 32-digit address whose program field is uuidna_quantum's derived 8-hex program
The ledger holds this as [uuidprog_address](/theorem/uuidprog_address) — proven `by decide`, sorry-free:

```lean
quantumProgram.valid = true ∧ quantumProgram.program = [3, 9, 13, 11, 3, 10, 3, 0]
```

### the address splits into handle · program · params · envelope and the four fields rejoin to the whole UUID
The ledger holds this as [uuidprog_layout](/theorem/uuidprog_layout) — proven `by decide`, sorry-free:

```lean
quantumProgram.handle ++ quantumProgram.program ++ quantumProgram.params ++ quantumProgram.envelope = quantumProgram.hex
```

### Hadamard is unitary up to its scale: H · H† = 2 · I
The ledger holds this as [uuidprog_h_unitary](/theorem/uuidprog_h_unitary) — proven `by decide`, sorry-free:

```lean
Same 2 (mm 2 H (dag H)) (smul 2 idm)
```

### X, Z and S are unitary, and S squared is Z
The ledger holds this as [uuidprog_paulis_unitary](/theorem/uuidprog_paulis_unitary) — proven `by decide`, sorry-free:

```lean
Same 2 (mm 2 X (dag X)) idm ∧ Same 2 (mm 2 Z (dag Z)) idm ∧ Same 2 (mm 2 S (dag S)) idm ∧ Same 2 (mm 2 S S) Z
```

### CNOT and SWAP are unitary and each is its own inverse
The ledger holds this as [uuidprog_cnot_swap](/theorem/uuidprog_cnot_swap) — proven `by decide`, sorry-free:

```lean
Same 4 (mm 4 CNOT (dag CNOT)) idm ∧ Same 4 (mm 4 CNOT CNOT) idm ∧ Same 4 (mm 4 SWAP (dag SWAP)) idm ∧ Same 4 (mm 4 SWAP SWAP) idm
```

### Toffoli is unitary and its own inverse
The ledger holds this as [uuidprog_toffoli](/theorem/uuidprog_toffoli) — proven `by decide`, sorry-free:

```lean
Same 8 (mm 8 TOFFOLI (dag TOFFOLI)) idm ∧ Same 8 (mm 8 TOFFOLI TOFFOLI) idm
```

### conjugating by Hadamard swaps X and Z and negates Y — the stabilizer tableau's H rule (swap the x and z bits, flip the phase where both are set)
The ledger holds this as [uuidprog_tableau_h](/theorem/uuidprog_tableau_h) — proven `by decide`, sorry-free:

```lean
Same 2 (mm 2 (mm 2 H X) (dag H)) (smul 2 Z) ∧ Same 2 (mm 2 (mm 2 H Z) (dag H)) (smul 2 X) ∧ Same 2 (mm 2 (mm 2 H Y) (dag H)) (smul (-2) Y)
```

### conjugating by S sends X to Y and Y to −X and leaves Z — the stabilizer tableau's S rule (z gains x, the phase flips where both are set)
The ledger holds this as [uuidprog_tableau_s](/theorem/uuidprog_tableau_s) — proven `by decide`, sorry-free:

```lean
Same 2 (mm 2 (mm 2 S X) (dag S)) Y ∧ Same 2 (mm 2 (mm 2 S Y) (dag S)) (smul (-1) X) ∧ Same 2 (mm 2 (mm 2 S Z) (dag S)) Z
```

### conjugating by CNOT copies X from control to target and Z from target to control — the stabilizer tableau's CNOT rule (x of the target gains x of the control, z of the control gains z of the target)
The ledger holds this as [uuidprog_tableau_cnot](/theorem/uuidprog_tableau_cnot) — proven `by decide`, sorry-free:

```lean
Same 4 (mm 4 (mm 4 CNOT (kron 2 X idm)) (dag CNOT)) (kron 2 X X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm X)) (dag CNOT)) (kron 2 idm X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 Z idm)) (dag CNOT)) (kron 2 Z idm) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm Z)) (dag CNOT)) (kron 2 Z Z)
```

### the program at adb1b053-39db-3a30-0000-000000000000, run on the Bell circuit, puts weight on exactly 00 and 11, in equal shares — the weights its door serves
The ledger holds this as [uuidprog_bell_runs](/theorem/uuidprog_bell_runs) — proven `by decide`, sorry-free:

```lean
(List.range 4).map (fun r => (bell r).normSq) = [1, 0, 0, 1]
```

### the program at adb1b053-39db-3a30-0000-000000000000, run on the GHZ circuit, puts weight on exactly 000 and 111, in equal shares — the weights its door serves
The ledger holds this as [uuidprog_ghz_runs](/theorem/uuidprog_ghz_runs) — proven `by decide`, sorry-free:

```lean
(List.range 8).map (fun r => (ghz r).normSq) = [1, 0, 0, 0, 0, 0, 0, 1]
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
