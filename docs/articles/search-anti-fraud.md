---
title: "The search on trial: Anti-fraud detection"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: Anti-fraud detection

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *Anti-fraud detection* — the wing sealed in [lean/AntiFraud.lean](/lean/AntiFraud.lean) with **13 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `913cbda8` | zenodo.org | zenodo record 11080018: Fraud Types and Detection: Analysis | UNVERIFIED | VERIFIED |
| `84911b32` | zenodo.org | zenodo record 19108834: MANAGING COMPLIANCE RISKS IN BANKING SYSTEMS USING ARTIFICIAL INTELLIGENCE: AN A | UNVERIFIED | VERIFIED |
| `78ebb518` | zenodo.org | zenodo record 18229140: Fraud Detection in Bank Payment Systems Using Machine Learning | UNVERIFIED | VERIFIED |
| `3141a638` | zenodo.org | zenodo record 17355761: AI-Powered Anti-Money Laundering (AML) and fraud detection - enhancing financial | UNVERIFIED | VERIFIED |
| `0b0d2661` | zenodo.org | zenodo record 15656461: Fraud Aware Banking Platform | UNVERIFIED | VERIFIED |
| `5a5451e9` | zenodo.org | zenodo record 13325910: Comparative Analysis On implementation in fraud detection systems Based on Machi | UNVERIFIED | VERIFIED |
| `fd2f79b6` | zenodo.org | zenodo record 13852274: IDNet: A Novel Dataset for Identity Document Analysis and Fraud Detection (part  | UNVERIFIED | VERIFIED |
| `81ba98ac` | zenodo.org | zenodo record 13852757: IDNet: A Novel Dataset for Identity Document Analysis and Fraud Detection (part  | UNVERIFIED | VERIFIED |
| `a948eeac` | crossref.org | DOI 10.4324/9781315263656-2: Developing an Anti-Fraud Culture | UNVERIFIED | VERIFIED |
| `0c257444` | crossref.org | DOI 10.2139/ssrn.972557: Fraud and Anti-Fraud: A Theory of Misreporting and Detection | UNVERIFIED | VERIFIED |
| `fb978e20` | crossref.org | DOI 10.1002/9781119205654.ch8: Advanced Fraud Detection Tools and Techniques | UNVERIFIED | VERIFIED |
| `68a02023` | crossref.org | DOI 10.1002/9781119205654.ch7: Basic Fraud Detection Tools and Techniques | UNVERIFIED | VERIFIED |
| `7e51132a` | crossref.org | DOI 10.1002/9781119205579.ch9: Fraud Detection in Financial Services Companies | UNVERIFIED | VERIFIED |
| `6a5ce004` | crossref.org | DOI 10.5220/0013911700004919: Machine Learning Anti-Fraud Detection Model for Internet Loans | UNVERIFIED | VERIFIED |
| `7f213b0d` | crossref.org | DOI 10.70764/gdpu-fr.2025.1(1)-04: Forensic Auditing in Fraud Detection and Prevention: Integration of Technology,  | UNVERIFIED | VERIFIED |
| `5259fd5a` | crossref.org | DOI 10.1007/s10791-025-09549-7: Dynamic quantification anti-fraud machine learning model for real-time transacti | UNVERIFIED | VERIFIED |

**16 findings · 16 usable search-trial combinations · receipt `c8bd46d3`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [captain_commission_two_coins](/theorem/captain_commission_two_coins) — `(commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0)`
- [forgery_flags_every_mismatch](/theorem/forgery_flags_every_mismatch) — `(((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun `
- [double_spend_walks_every_list](/theorem/double_spend_walks_every_list) — `(lists.length = 27) ∧ ((lists.filter (fun l => [1,2,3].any (fun t => doubleSpent t l))).le`
- [single_claim_never_flags](/theorem/single_claim_never_flags) — `(doubleSpent 1 [1,2,3] = false) ∧ (claimsOf 1 [1,2,3] = 1) ∧ (doubleSpent 3 [3,1,3] = true`
- [vote_passes_iff_weight_paid](/theorem/vote_passes_iff_weight_paid) — `(List.range 4).all (fun w => (List.range 4).all (fun c => (voteOk w c == 1) == (w == c)))`
- [anti_fraud_check_deterministic](/theorem/anti_fraud_check_deterministic) — `(((List.range 2).flatMap (fun f => (List.range 2).flatMap (fun d => (List.range 2).map (fu`
- [sealed_theorem_not_forged](/theorem/sealed_theorem_not_forged) — `((List.range 9).map (fun c => forged c c)).all (fun x => x == 0)`
- [honesty_gate_passes_iff_all_sealed](/theorem/honesty_gate_passes_iff_all_sealed) — `(List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (cl`
- [conformance_failure_detects_intrusion](/theorem/conformance_failure_detects_intrusion) — `(List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (f `
- [honesty_gate_is_theorem_not_oracle](/theorem/honesty_gate_is_theorem_not_oracle) — `(List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => cle`
- [overclaim_with_fake_cite_fails](/theorem/overclaim_with_fake_cite_fails) — `(List.range 2).all (fun f => (List.range 2).all (fun d => cleanAudit f d 1 == 0))`
- [fraud_verdict_is_exactly_one](/theorem/fraud_verdict_is_exactly_one) — `(List.range 2).all (fun c => (List.range 2).all (fun s => verified c s + unverified c s ==`
- [fabricated_cite_stays_unverified](/theorem/fabricated_cite_stays_unverified) — `(unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0)`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
