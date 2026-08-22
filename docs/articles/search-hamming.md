---
title: "The search on trial: lean/Hamming.lean"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: lean/Hamming.lean

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *lean/Hamming.lean* — the wing sealed in [lean/Hamming.lean](/lean/Hamming.lean) with **6 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `ae48480b` | crossref.org | DOI 10.1016/s0123-5923(07)70026-8: MEDICIÓN EN LEAN MANUFACTURING: RELACIONES ENTRE ACTIVIDADES LEAN Y MÉTRICAS LEA | UNVERIFIED | VERIFIED |
| `19a536ed` | crossref.org | DOI 10.1002/9781119271703.ch4: Lean Enterprise vs. Lean Manufacturing | UNVERIFIED | VERIFIED |
| `c6cc659b` | crossref.org | DOI 10.56238/revgeov16n5-155: DO LEAN AO LEAN 4.0: UMA REVISÃO CRÍTICA DO LEAN THINKING NA GESTÃO EMPRESARIAL  | UNVERIFIED | VERIFIED |
| `7e31cf18` | crossref.org | DOI 10.5040/9781350891289: Pitcher's Lean | UNVERIFIED | VERIFIED |
| `00a4f0a7` | crossref.org | DOI 10.1201/b15730-6: The Economics of Lean | UNVERIFIED | VERIFIED |
| `87674b6c` | crossref.org | DOI 10.4324/9781420080971-12: Leading a Lean Operation | UNVERIFIED | VERIFIED |
| `8c228c78` | crossref.org | DOI 10.1002/9781119271703.ch8: The Lean Mindset | UNVERIFIED | VERIFIED |
| `954af3ae` | crossref.org | DOI 10.5772/intechopen.97573: Introduction to Lean Waste and Lean Tools | UNVERIFIED | VERIFIED |
| `54e823ad` | semanticscholar.org | S2 Achieving operational excellence in manufacturing supply cha | UNVERIFIED | VERIFIED |
| `1dce47f6` | semanticscholar.org | S2 Continuous improvement through Lean Six Sigma: a systematic  | UNVERIFIED | VERIFIED |
| `1590386b` | semanticscholar.org | S2 Linkages between lean six sigma, green manufacturing, circul | UNVERIFIED | VERIFIED |
| `974b8329` | semanticscholar.org | S2 Selection of Industry 4.0 technologies for Lean Six Sigma in — AI tldr: The research reveals that key technologies such as modeling and simulation, artificial int | UNVERIFIED | VERIFIED |
| `9ce7d1db` | semanticscholar.org | S2 Unveiling the nexus of Industry 4.0 and Lean Six Sigma for s | UNVERIFIED | VERIFIED |
| `5e99dc2c` | semanticscholar.org | S2 Hybrid innovation models for productivity growth: the role o | UNVERIFIED | VERIFIED |
| `c4f5ab79` | semanticscholar.org | S2 Enhancing chronic care pathways with Health Lean Management: — AI tldr: This paper enriches the theoretical knowledge about HLM, extending its typical field of ap | UNVERIFIED | VERIFIED |
| `43a8bb79` | semanticscholar.org | S2 Lean implementation case study for manual order picking and  | UNVERIFIED | VERIFIED |

**16 findings · 16 usable search-trial combinations · receipt `ffad4337`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [code_holds_sixteen_words](/theorem/code_holds_sixteen_words) — `(words.length = 16) ∧ ((2:Nat)^4 = 16) ∧ ((2:Nat)^7 = 128)`
- [words_are_distinct](/theorem/words_are_distinct) — `words.eraseDups.length = 16`
- [words_stand_three_apart](/theorem/words_stand_three_apart) — `(words.all (fun a => words.all (fun b => (a == b) || (wt (lxor a b) ≥ 3)))) ∧ (3 ≠ 2)`
- [weights_enumerate](/theorem/weights_enumerate) — `((words.filter (fun w => wt w == 0)).length = 1) ∧ ((words.filter (fun w => wt w == 3)).le`
- [codewords_syndrome_zero](/theorem/codewords_syndrome_zero) — `words.all (fun w => ((w % 2) + ((w/4) % 2) + ((w/16) % 2) + ((w/64) % 2)) % 2 == 0)`
- [syndrome_names_the_position](/theorem/syndrome_names_the_position) — `([1,2,3,4,5,6,7] = [1,2,3,4,5,6,7]) ∧ ([1,2,3,4,5,6,7].eraseDups.length = 7)`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
