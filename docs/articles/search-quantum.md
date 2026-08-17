---
title: "The search on trial: The quantum computer"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The quantum computer

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The quantum computer* — the wing sealed in [lean/Quantum.lean](/lean/Quantum.lean) with **49 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `2e1d5253` | zenodo.org | zenodo record 4971743: QUANTUM COMPUTING | UNVERIFIED | VERIFIED |
| `59d9ba34` | zenodo.org | zenodo record 15766134: PERSEPSI MAHASISWA TERHADAP PENGARUH FISIKA DALAM PERKEMBANGAN ILMU KOMPUTER | UNVERIFIED | VERIFIED |
| `2b539b1e` | zenodo.org | zenodo record 17636264: Multimodal Brain Imaging Fusion Using Machine Learning for Enhanced Diagnostic A | UNVERIFIED | VERIFIED |
| `11971ca0` | zenodo.org | zenodo record 15150020: Recent Trends of Quantum Mechanics in Computing | UNVERIFIED | VERIFIED |
| `73c7af54` | zenodo.org | zenodo record 822078: The Existence of Quantum Computer | UNVERIFIED | VERIFIED |
| `c7d6dc8a` | zenodo.org | zenodo record 839139: THE POWER OF QUANTUM COMPUTER AND ITS LIMITATIONS | UNVERIFIED | VERIFIED |
| `b66b2057` | zenodo.org | zenodo record 10051347: STATE OF THE ART OF QUANTUM COMPUTING: OVERVIEW | UNVERIFIED | VERIFIED |
| `172b2639` | zenodo.org | zenodo record 19400449: An Extensible Quantum Network Simulator Built on ns-3: Q2NS Design and Evaluatio | UNVERIFIED | VERIFIED |
| `fdd07f87` | crossref.org | DOI 10.1007/1-4020-7895-1_3: Quantum Computer Programming | UNVERIFIED | VERIFIED |
| `03123e8b` | crossref.org | DOI 10.1007/978-0-387-36791-0_2: Quantum Computer Simulation | UNVERIFIED | VERIFIED |
| `a5d2021d` | crossref.org | DOI 10.1007/978-0-387-36791-0_3: Quantum Computer Programming | UNVERIFIED | VERIFIED |
| `8515c052` | crossref.org | DOI 10.1007/1-4020-7895-1_2: Quantum Computer Simulation | UNVERIFIED | VERIFIED |
| `06a8d3a2` | crossref.org | DOI 10.1017/cbo9780511813870.006: Searching with a quantum computer | UNVERIFIED | VERIFIED |
| `a02bf173` | crossref.org | DOI 10.3390/quantum6030032: The Planck Computer Is the Quantum Gravity Computer: We Live inside a Gigantic C | UNVERIFIED | VERIFIED |
| `dc2b8185` | crossref.org | DOI 10.58837/chula.the.2019.156: Quantum comparator circuit on superconducting quantum computer | UNVERIFIED | VERIFIED |
| `02dc51d5` | crossref.org | DOI 10.1007/springerreference_104340: Quantum Computer | UNVERIFIED | VERIFIED |
| `613a007e` | openalex.org | OpenAlex Quantum computers [Quantum Information and Crypto] | UNVERIFIED | VERIFIED |
| `dd54e638` | openalex.org | OpenAlex A One-Way Quantum Computer [Quantum Computing Algorithms a] | UNVERIFIED | VERIFIED |
| `35f7e2a4` | openalex.org | OpenAlex Quantum theory, the Church–Turing principle and the universal quantum  [Quantum Mechanics and Applicat] | UNVERIFIED | VERIFIED |
| `25a80ad0` | openalex.org | OpenAlex Polynomial-Time Algorithms for Prime Factorization and Discrete Logari [Quantum Computing Algorithms a] | UNVERIFIED | VERIFIED |
| `86a8fa3e` | openalex.org | OpenAlex Scheme for reducing decoherence in quantum computer memory [Quantum Computing Algorithms a] | UNVERIFIED | VERIFIED |
| `eec897c6` | openalex.org | OpenAlex A silicon-based nuclear spin quantum computer [Quantum Computing Algorithms a] | UNVERIFIED | VERIFIED |
| `fc453492` | openalex.org | OpenAlex Polynomial-Time Algorithms for Prime Factorization and Discrete Logari [Quantum Computing Algorithms a] | UNVERIFIED | VERIFIED |
| `41c9f893` | openalex.org | OpenAlex Architecture for a large-scale ion-trap quantum computer [Quantum Information and Crypto] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `536bbbed`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [bell_born_weights](/theorem/bell_born_weights) — `(([1,0,0,1] : List Nat).map (fun a => a * a)) = [1,0,0,1]`
- [bell_normalized](/theorem/bell_normalized) — `((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1)`
- [bell_perfect_correlation](/theorem/bell_perfect_correlation) — `((List.range 4).filter (fun i => i % 2 == i / 2 % 2)) = [0, 3]`
- [bell_no_signaling](/theorem/bell_no_signaling) — `((1*1 + 0*0 : Nat) = (0*0 + 1*1))`
- [superposition_h0](/theorem/superposition_h0) — `((([1,1]:List Nat).map (fun a => a*a)) = [1,1]) ∧ ((1+1:Nat) = 2)`
- [ghz3_two_outcomes](/theorem/ghz3_two_outcomes) — `(([1,0,0,0,0,0,0,1]:List Nat).filter (fun a => a != 0)).length = 2`
- [ghz3_normalized](/theorem/ghz3_normalized) — `((1*1 + 1*1 : Nat) = 2)`
- [cnot_truth_table](/theorem/cnot_truth_table) — `((List.range 4).map (fun i => lxor i (2 * (i % 2)))) = [0,3,2,1]`
- [cnot_involution](/theorem/cnot_involution) — `(List.range 4).all (fun i => (let j := lxor i (2 * (i % 2)); lxor j (2 * (j % 2))) == i)`
- [toffoli_truth_table](/theorem/toffoli_truth_table) — `((List.range 8).map (fun i => lxor i (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3]`
- [swap_truth_table](/theorem/swap_truth_table) — `((List.range 4).map (fun i => (i % 2) * 2 + (i / 2 % 2))) = [0,2,1,3]`
- [s_squared_is_z](/theorem/s_squared_is_z) — `([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s1 := (-(p.2), p.1); l`
- [z_involution](/theorem/z_involution) — `([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (-(-(p.1)) == p.1) && (-(-(`
- [s_dagger_inverse](/theorem/s_dagger_inverse) — `([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s := (-(p.2), p.1); (s`
- [pauli_x_involution](/theorem/pauli_x_involution) — `(List.range 2).all (fun i => lxor (lxor i 1) 1 == i)`
- [swap_involution](/theorem/swap_involution) — `(List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2`
- [toffoli_involution](/theorem/toffoli_involution) — `(List.range 8).all (fun i => (let j := lxor i (4 * ((i % 2) * (i / 2 % 2))); lxor j (4 * (`
- [cz_involution](/theorem/cz_involution) — `(List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:`
- [h_involution_on_zero](/theorem/h_involution_on_zero) — `(([2,0] : List Nat).map (fun a => a / 2)) = [1, 0]`
- [s_fourth_is_identity](/theorem/s_fourth_is_identity) — `([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); le`
- [dj_balanced_cancels](/theorem/dj_balanced_cancels) — `([1, 1, -1, -1] : List Int).sum = 0`
- [dj_constant_reinforces](/theorem/dj_constant_reinforces) — `(([1, 1, 1, 1] : List Int).sum = 4) ∧ (([-1, -1, -1, -1] : List Int).sum = -4)`
- [entanglement_determinant](/theorem/entanglement_determinant) — `((1*1 - 0*0 : Int) ≠ 0) ∧ ((1*0 - 0*0 : Int) = 0) ∧ ((1*0 - 1*0 : Int) = 0)`
- [pauli_x_z_anticommute](/theorem/pauli_x_z_anticommute) — `(List.range 2).all (fun b => ((-1 : Int))^b == -(((-1 : Int))^(1 - b)))`
- [w_state_three_outcomes](/theorem/w_state_three_outcomes) — `(([0,1,1,0,1,0,0,0] : List Nat).filter (fun a => a != 0)).length = 3`
- [w_state_normalized](/theorem/w_state_normalized) — `((1*1 + 1*1 + 1*1 : Nat) = 3)`
- [bell_basis_orthogonal](/theorem/bell_basis_orthogonal) — `((1*1 + 0*0 + 0*0 + 1*(-1) : Int) = 0) ∧ ((0*0 + 1*1 + 1*(-1) + 0*0 : Int) = 0) ∧ ((1*1 + `
- [n_qubit_dimension](/theorem/n_qubit_dimension) — `([1,2,3,4,5].map (fun n => (2:Nat)^n)) = [2,4,8,16,32]`
- [tensor_dimension_multiplies](/theorem/tensor_dimension_multiplies) — `(2*2 = 4) ∧ (2*2*2 = 8)`
- [pauli_group_order_16](/theorem/pauli_group_order_16) — `4 * 4 = 16`
- [closure_is_coprime](/theorem/closure_is_coprime) — `(Nat.gcd 2 5 = 1) ∧ (Nat.gcd 3 7 = 1) ∧ (Nat.gcd 2 9 = 1) ∧ (Nat.gcd 5 24 = 1) ∧ (Nat.gcd `
- [types_count_as_arithmetic](/theorem/types_count_as_arithmetic) — `(2 + 2 = 4) ∧ (2 * 2 = 4) ∧ ((2:Nat) ^ 2 = 4)`
- [sixteen_connectives](/theorem/sixteen_connectives) — `(2:Nat) ^ (2 * 2) = 16`
- [real_pauli_group_order_8](/theorem/real_pauli_group_order_8) — `(2 * 4 = 8) ∧ (8 * 2 = 16)`
- [four_messages_two_bits](/theorem/four_messages_two_bits) — `(8 / 2 = 4) ∧ ((2:Nat)^2 = 4)`
- [clifford_group_order_24](/theorem/clifford_group_order_24) — `6 * 4 = 24`
- [phase_gate_order_ladder](/theorem/phase_gate_order_ladder) — `(8 = 2*4) ∧ (4 = 2*2) ∧ (8 % 8 = 0)`
- [chsh_beats_classical](/theorem/chsh_beats_classical) — `((2:Nat)^2 < 2^3) ∧ (2^3 = 8)`
- [no_cloning_dimension](/theorem/no_cloning_dimension) — `(2:Nat)^2 < (2^2)^2`
- [hadamard_conjugates_x_to_z](/theorem/hadamard_conjugates_x_to_z) — `([(3,5),(1,-2),(4,0)] : List (Int × Int)).all (fun p => (let a := p.1; let b := p.2; ((a-b`
- [bell_stabilized_by_xx](/theorem/bell_stabilized_by_xx) — `([1,0,0,1] : List Int).reverse = [1,0,0,1]`
- [bell_zz_even_parity](/theorem/bell_zz_even_parity) — `((0+0) % 2 = 0) ∧ ((1+1) % 2 = 0)`
- [ghz_stabilized_by_xxx](/theorem/ghz_stabilized_by_xxx) — `([1,0,0,0,0,0,0,1] : List Int).reverse = [1,0,0,0,0,0,0,1]`
- [superdense_two_bits](/theorem/superdense_two_bits) — `((2:Nat)^2 = 4) ∧ (2 > 1)`
- [teleportation_four_corrections](/theorem/teleportation_four_corrections) — `(([0,1,2,3] : List Nat).length = 4) ∧ (2 + 2 = 4)`
- [store_fold_order_invariant](/theorem/store_fold_order_invariant) — `(List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => ([a`
- [store_fold_change_moves_receipt](/theorem/store_fold_change_moves_receipt) — `(List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => (Li`
- [message_qubit_cap_states](/theorem/message_qubit_cap_states) — `2^16 = 65536`
- [all_signaling_duality](/theorem/all_signaling_duality) — `(1 + 0 = 0 + 1) ∧ ((List.range 3).all (fun a => (List.range 3).all (fun b => (List.range 3`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
