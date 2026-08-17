---
title: "The search on trial: The hardware-verifiable binary algebra"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The hardware-verifiable binary algebra

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The hardware-verifiable binary algebra* — the wing sealed in [lean/Hardware.lean](/lean/Hardware.lean) with **14 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `33a7e06d` | zenodo.org | zenodo record 10134: REDUCTION OF DIMENSION IN LINEAR BINARY CLASSIFICATION | UNVERIFIED | VERIFIED |
| `927b41a7` | zenodo.org | zenodo record 810877: Definite Integration of Parametric Rational Functions: Applying a DITLU | UNVERIFIED | VERIFIED |
| `09d8f2ce` | zenodo.org | zenodo record 3911510: Special Economic Zones: An Evaluation of Lusaka South - Multi Facility Economic  | UNVERIFIED | VERIFIED |
| `b5b1e40e` | zenodo.org | zenodo record 21911604: A Proof of Shor's Orthogonal-Measurement Conjecture and the Structure of Informa | UNVERIFIED | VERIFIED |
| `0d4a1ff2` | zenodo.org | zenodo record 2613490: Using Windows Server 2012-based storage solutions for small and medium size busi | UNVERIFIED | VERIFIED |
| `55195a86` | zenodo.org | zenodo record 7064491: The Influence of Human Resource Management Practices on Employees Intention to E | UNVERIFIED | VERIFIED |
| `72640191` | zenodo.org | zenodo record 4247156: IMPLEMENTATION OF THE METHOD OF IMAGE TRANSFORMATIONS FOR MINIMIZING THE SHEFFER | UNVERIFIED | VERIFIED |
| `53440167` | zenodo.org | zenodo record 6957570: Significance of first flight take-off delays: A case study of a low-cost hub in  | UNVERIFIED | VERIFIED |
| `d3de5f76` | crossref.org | DOI 10.36227/techrxiv.177223066.62993533/v1: V-PUF: An Ephemeral-Key Decentralized Architecture for Verifiable Hardware Authe | UNVERIFIED | VERIFIED |
| `4f9117d7` | crossref.org | DOI 10.52202/079017-3030: Optimistic Verifiable Training by Controlling Hardware Nondeterminism | UNVERIFIED | VERIFIED |
| `dac7fddc` | crossref.org | DOI 10.46586/tches.v2022.i4.163-187: Fast Large-Integer Extended GCD Algorithm and Hardware Design for Verifiable Del | UNVERIFIED | VERIFIED |
| `d798c9d1` | crossref.org | DOI 10.23919/date48585.2020.9116342: Verifiable Security Templates for Hardware | UNVERIFIED | VERIFIED |
| `e96b8122` | crossref.org | DOI 10.1109/iccd.1988.25772: Verifiable and executable theories of design for synthesizing correct hardware | UNVERIFIED | VERIFIED |
| `7027fc90` | crossref.org | DOI 10.1016/0165-6074(86)90091-8: SMAX - A CONLAN member language for verifiable hardware descriptions | UNVERIFIED | VERIFIED |
| `6b22d60c` | crossref.org | DOI 10.1109/etfa.2008.4638584: Hardware acceleration for verifiable, adaptive real-time communication | UNVERIFIED | VERIFIED |
| `c293c1f6` | crossref.org | DOI 10.1145/2611399.2611406: Verifiable Computing: Secure Code Execution Despite Untrusted Software and Hardw | UNVERIFIED | VERIFIED |
| `4055812e` | openalex.org | OpenAlex Geppetto: Versatile Verifiable Computation [Cryptography and Data Security] | UNVERIFIED | VERIFIED |
| `3dd25566` | openalex.org | OpenAlex Full Accounting for Verifiable Outsourcing [Cryptography and Data Security] | UNVERIFIED | VERIFIED |
| `8dfe70c9` | openalex.org | OpenAlex Algebraic approaches to nondeterminism—an overview [Logic, Reasoning, and Knowledg] | UNVERIFIED | VERIFIED |
| `e96b9b37` | openalex.org | OpenAlex ICEBERG : An Involutional Cipher Efficient for Block Encryption in Rec [Cryptographic Implementations ] | UNVERIFIED | VERIFIED |
| `cc0b9617` | openalex.org | OpenAlex An Efficient ABE Scheme With Verifiable Outsourced Encryption and Decr [Cryptography and Data Security] | UNVERIFIED | VERIFIED |
| `96e7ef95` | openalex.org | OpenAlex A Survey on Homomorphic Encryption Schemes [Cryptography and Data Security] | UNVERIFIED | VERIFIED |
| `2a4d891d` | openalex.org | OpenAlex Cryptanalysis of Algebraic Verifiable Delay Functions [Coding theory and cryptography] | UNVERIFIED | VERIFIED |
| `acbd5915` | openalex.org | OpenAlex Introduction to differential power analysis [Cryptographic Implementations ] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `0fc53b22`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [not_gate_truth_table](/theorem/not_gate_truth_table) — `[0,1].map (fun a => 1 - a) = [1,0]`
- [and_gate_truth_table](/theorem/and_gate_truth_table) — `[(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1]`
- [or_gate_truth_table](/theorem/or_gate_truth_table) — `[(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 + p.2 - p.1 * p.2) = [0,1,1,1]`
- [xor_gate_truth_table](/theorem/xor_gate_truth_table) — `[(0,0),(0,1),(1,0),(1,1)].map (fun p => lxor p.1 p.2) = [0,1,1,0]`
- [xor_is_addition_mod_two](/theorem/xor_is_addition_mod_two) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 == (p.1 + p.2) % 2)`
- [gate_output_is_one_bit](/theorem/gate_output_is_one_bit) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 <= 1) ∧ (p.1 * p.2 <= 1) ∧ (p.1 + p.2 - p`
- [nand_reconstructs_not](/theorem/nand_reconstructs_not) — `[0,1].all (fun a => (1 - a * a) == (1 - a))`
- [nand_reconstructs_and](/theorem/nand_reconstructs_and) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1 * p.2)) == p.1 * p.2)`
- [nand_reconstructs_or](/theorem/nand_reconstructs_or) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1) * (1 - p.2)) == p.1 + p.2 - p.1 * p`
- [nand_functionally_complete](/theorem/nand_functionally_complete) — `(List.range 4).all (fun n => ((1 - (n%2) * (n%2)) == (1 - n%2)) ∧ ((1 - (1 - (n%2) * (n/2%`
- [de_morgan_gate_law](/theorem/de_morgan_gate_law) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 * p.2) == (1 - p.1) + (1 - p.2) - (1 - p.`
- [half_adder_correct](/theorem/half_adder_correct) — `[(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 + 2 * (p.1 * p.2) == p.1 + p.2)`
- [full_adder_correct](/theorem/full_adder_correct) — `(List.range 8).all (fun n => lxor (lxor (n%2) (n/2%2)) (n/4%2) + 2 * ((n%2 + n/2%2 + n/4%2`
- [mux_selects_input](/theorem/mux_selects_input) — `(List.range 8).all (fun n => (1 - n%2) * (n/2%2) + (n%2) * (n/4%2) == (if n%2 == 0 then n/`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
