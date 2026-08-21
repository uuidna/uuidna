---
title: "The search on trial: The identifiers"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The identifiers

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The identifiers* — the wing sealed in [lean/Identifiers.lean](/lean/Identifiers.lean) with **6 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `599c1bee` | zenodo.org | zenodo record 17105974: Rethinking the Evaluation of Microservice RCA with a Fault Propagation-Aware Ben | UNVERIFIED | VERIFIED |
| `4011303a` | zenodo.org | zenodo record 2624128: Vad är PIDar? en kort introduktion | UNVERIFIED | VERIFIED |
| `d7a6d352` | zenodo.org | zenodo record 15360626: ARK - A persistent identifier solution for online edition of the "Bulgarian Neur | UNVERIFIED | VERIFIED |
| `97be5ade` | zenodo.org | zenodo record 17662525: Natural Science Identifiers & CETAF Stable Identifiers | UNVERIFIED | VERIFIED |
| `22a1d7d6` | zenodo.org | zenodo record 19068510: Persistent Identifiers | UNVERIFIED | VERIFIED |
| `11792772` | zenodo.org | zenodo record 15655624: Persistent Identifiers | UNVERIFIED | VERIFIED |
| `3c92a1e0` | zenodo.org | zenodo record 2654644: Identifiers & Relationships | UNVERIFIED | VERIFIED |
| `8ea4f3a4` | zenodo.org | zenodo record 4477074: Identifiers at the Smithsonian Institution | UNVERIFIED | VERIFIED |
| `99a9152e` | crossref.org | DOI 10.3403/30143238: Information technology. Unique identifiers | UNVERIFIED | VERIFIED |
| `cc003e3e` | crossref.org | DOI 10.3403/30128110u: Information technology. Unique identifiers | UNVERIFIED | VERIFIED |
| `40523bbe` | crossref.org | DOI 10.3403/30128110: Information technology. Unique identifiers | UNVERIFIED | VERIFIED |
| `ecbaae5a` | crossref.org | DOI 10.3403/30166532: Information technology. Automatic identification and data capture techniques. Da | UNVERIFIED | VERIFIED |
| `0162f819` | crossref.org | DOI 10.3403/02097448: Information technology. Automatic identification and data capture techniques. Da | UNVERIFIED | VERIFIED |
| `547ee855` | crossref.org | DOI 10.3403/02016085: Information technology. EAN/UCC application identifiers and fact data identifier | UNVERIFIED | VERIFIED |
| `997502ea` | crossref.org | DOI 10.3403/02097448u: Information technology � Automatic identification and data capture techniques �  | UNVERIFIED | VERIFIED |
| `37eac8fa` | crossref.org | DOI 10.3403/30435753: Information technology � Automatic identification and data capture techniques �  | UNVERIFIED | VERIFIED |
| `05415f93` | openalex.org | OpenAlex Techniques to Identify Themes [Computational and Text Analysi] | UNVERIFIED | VERIFIED |
| `a3cd83b8` | openalex.org | OpenAlex Mutation in the α-Synuclein Gene Identified in Families with Parkinson [Parkinson's Disease Mechanisms] | UNVERIFIED | VERIFIED |
| `ed51e43b` | openalex.org | OpenAlex Distinct types of diffuse large B-cell lymphoma identified by gene exp [Lymphoma Diagnosis and Treatme] | UNVERIFIED | VERIFIED |
| `8453af78` | openalex.org | OpenAlex Topological domains in mammalian genomes identified by analysis of chr [Genomics and Chromatin Dynamic] | UNVERIFIED | VERIFIED |
| `9fef794f` | openalex.org | OpenAlex UK Biobank: An Open Access Resource for Identifying the Causes of a Wi [Genetic Associations and Epide] | UNVERIFIED | VERIFIED |
| `997776e5` | openalex.org | OpenAlex cytoHubba: identifying hub objects and sub-networks from complex inter [Bioinformatics and Genomic Net] | UNVERIFIED | VERIFIED |
| `27b6dd2c` | openalex.org | OpenAlex Regression Diagnostics -- Identifying Influential Data and Sources of  [Advanced Statistical Methods a] | UNVERIFIED | VERIFIED |
| `f29a0897` | openalex.org | OpenAlex <scp>micro</scp>‐<scp>checker</scp>: software for identifying and corr [Genetic diversity and populati] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `b615180d`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [isbn10_valid_check](/theorem/isbn10_valid_check) — `(([10,9,8,7,6,5,4,3,2,1].zip [0,3,0,6,4,0,6,1,5,2]).map (fun p => p.1 * p.2)).foldl (· + ·`
- [isbn13_valid_check](/theorem/isbn13_valid_check) — `(([1,3,1,3,1,3,1,3,1,3,1,3,1].zip [9,7,8,0,3,0,6,4,0,6,1,5,7]).map (fun p => p.1 * p.2)).f`
- [isbn10_check_alphabet_eleven](/theorem/isbn10_check_alphabet_eleven) — `[0,1,2,3,4,5,6,7,8,9,10].length = 11`
- [isbn10_catches_single_error](/theorem/isbn10_catches_single_error) — `[10,9,8,7,6,5,4,3,2,1].all (fun w => w % 11 != 0)`
- [isbn10_catches_transposition](/theorem/isbn10_catches_transposition) — `([10,9,8,7,6,5,4,3,2,1].zip [9,8,7,6,5,4,3,2,1]).all (fun p => p.1 - p.2 == 1)`
- [isbn13_bookland_prefix](/theorem/isbn13_bookland_prefix) — `979 - 978 = 1 ∧ 978 < 979`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
