---
title: "The search on trial: Command authentication"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: Command authentication

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *Command authentication* — the wing sealed in [lean/Command.lean](/lean/Command.lean) with **7 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `f2fe0517` | zenodo.org | zenodo record 18348666: Before the Thruster Fires: Securing European Space Infrastructure at the Moment  | UNVERIFIED | VERIFIED |
| `40e47741` | zenodo.org | zenodo record 13942717: njublockchain/web3research-etl: v0.0.1 | UNVERIFIED | VERIFIED |
| `9e2f85ab` | zenodo.org | zenodo record 14599182: njublockchain/web3research-py: v0.0.9 | UNVERIFIED | VERIFIED |
| `ec5f803a` | zenodo.org | zenodo record 3987013: Comparative Study on Outcomes of Medical Management versus Combined Surgical and | UNVERIFIED | VERIFIED |
| `bb3f0afb` | zenodo.org | zenodo record 11078206: Security and Secrets Management: Integration of Security Tools like Vault and Se | UNVERIFIED | VERIFIED |
| `0c8b9b68` | zenodo.org | zenodo record 18345701: Systems and Methods for Anti-Coercion Satellite Command Execution Using Authorit | UNVERIFIED | VERIFIED |
| `51843850` | zenodo.org | zenodo record 18689472: Hardware-Rooted Space Security: Cryptographically Isolated Execution Authority E | UNVERIFIED | VERIFIED |
| `57ea53f7` | zenodo.org | zenodo record 6363490: Magnetic susceptibility-weighted imaging mapped the migratory route of a paragon | UNVERIFIED | VERIFIED |
| `5024c4a3` | crossref.org | DOI 10.17487/rfc1734: POP3 AUTHentication command | UNVERIFIED | VERIFIED |
| `d7169450` | crossref.org | DOI 10.32920/ryerson.14656188: Continuous Authentication Based On Learning User Command Sequence | UNVERIFIED | VERIFIED |
| `a079da7c` | crossref.org | DOI 10.32920/ryerson.14656188.v1: Continuous Authentication Based On Learning User Command Sequence | UNVERIFIED | VERIFIED |
| `29909364` | crossref.org | DOI 10.1109/isgt-asia.2019.8881793: On Optimization of Command-Delaying for Advanced Command Authentication in Smart | UNVERIFIED | VERIFIED |
| `c9cd5bb3` | crossref.org | DOI 10.1109/tencon.2002.1181235: A CCSDS command authentication scheme | UNVERIFIED | VERIFIED |
| `03689641` | crossref.org | DOI 10.1109/ises67504.2025.00087: Secure Command Authentication for Drone Control Using ECDSA | UNVERIFIED | VERIFIED |
| `fd037da0` | crossref.org | DOI 10.1109/vlsi-soc.2017.8203494: Continuous authentication of UAV flight command data using behaviometrics | UNVERIFIED | VERIFIED |
| `fc2cc50d` | crossref.org | DOI 10.1117/12.2520442: Combination of GMM-UBM and DTW for voice command authentication system | UNVERIFIED | VERIFIED |
| `843dafc8` | openalex.org | OpenAlex Command Authentication Using Multiagent System for Attacks on the Econ [Smart Grid Security and Resili] | UNVERIFIED | VERIFIED |
| `3e1d18c7` | openalex.org | OpenAlex Kerberos: an authentication service for computer networks [Advanced Authentication Protoc] | UNVERIFIED | VERIFIED |
| `5f9ceee0` | openalex.org | OpenAlex Command authentication via faster than real time simulation [Smart Grid Security and Resili] | UNVERIFIED | VERIFIED |
| `660706cc` | openalex.org | OpenAlex Securing Substations through Command Authentication Using On-the-fly S [Smart Grid Security and Resili] | UNVERIFIED | VERIFIED |
| `d63d7165` | openalex.org | OpenAlex Data Attack Detection and Command Authentication via Cyber-Physical Co [Smart Grid Security and Resili] | UNVERIFIED | VERIFIED |
| `0819455e` | openalex.org | OpenAlex On Optimization of Command-Delaying for Advanced Command Authenticatio [Smart Grid Security and Resili] | UNVERIFIED | VERIFIED |
| `54539ed2` | openalex.org | OpenAlex An Efficient Real-Time Broadcast Authentication Scheme for Command and [Security in Wireless Sensor Ne] | UNVERIFIED | VERIFIED |
| `817b81b5` | openalex.org | OpenAlex Authentication in distributed systems [Security and Verification in C] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `26c0ae58`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [accept_truth_table](/theorem/accept_truth_table) — `((List.range 4).map (fun n => accept (n%2) (n/2%2))) = [0,0,0,1]`
- [unsigned_rejected](/theorem/unsigned_rejected) — `(List.range 2).all (fun v => accept 0 v == 0)`
- [bad_signature_rejected](/theorem/bad_signature_rejected) — `(List.range 2).all (fun s => accept s 0 == 0)`
- [accept_matches_spec](/theorem/accept_matches_spec) — `(List.range 4).all (fun n => accept (n%2) (n/2%2) == (if (n%2 == 1) && (n/2%2 == 1) then 1`
- [only_correct_tag_verifies](/theorem/only_correct_tag_verifies) — `((List.range 8).filter (fun tag => tag == 5)).length = 1`
- [tamper_changes_tag](/theorem/tamper_changes_tag) — `(List.range 9).all (fun m1 => (List.range 9).all (fun m2 => (m1 == m2) || ((7 + m1) % 9 !=`
- [linear_tag_is_forgeable](/theorem/linear_tag_is_forgeable) — `(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
