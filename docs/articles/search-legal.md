---
title: "The search on trial: The legal vocabulary"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The legal vocabulary

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The legal vocabulary* — the wing sealed in [lean/Legal.lean](/lean/Legal.lean) with **10 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `39fb3e86` | crossref.org | DOI 10.3403/00122960u: General metrology | UNVERIFIED | VERIFIED |
| `11aa030d` | crossref.org | DOI 10.3403/00122960: General metrology | UNVERIFIED | VERIFIED |
| `e14f780b` | crossref.org | DOI 10.2139/ssrn.6454203: Derivative Vocabulary of Legal Discourse | UNVERIFIED | VERIFIED |
| `980fa2b0` | crossref.org | DOI 10.3726/978-3-653-00659-9/5: Chapter 3: Vocabulary Use Across Different Legal Genres 53 | UNVERIFIED | VERIFIED |
| `5705b78f` | crossref.org | DOI 10.3998/mpub.223607: Strategies for Legal Case Reading and Vocabulary Development | UNVERIFIED | VERIFIED |
| `c8ca62b6` | crossref.org | DOI 10.2139/ssrn.4465023: Specifics of Teaching Vocabulary of a Legal English Course | UNVERIFIED | VERIFIED |
| `1fbe9504` | crossref.org | DOI 10.2307/j.ctvr33c9g.6: Hegel’s Vocabulary | UNVERIFIED | VERIFIED |
| `239035b8` | crossref.org | DOI 10.2139/ssrn.5296201: CULTURAL ASPECTS OF LEGAL TRANSLATION VOCABULARY IN A CHILDREN'S CARTOON | UNVERIFIED | VERIFIED |
| `5f46a82c` | openalex.org | OpenAlex Legal Vocabulary [Legal Language and Interpretat] | UNVERIFIED | VERIFIED |
| `44f259f5` | openalex.org | OpenAlex Identifying spoken technical legal vocabulary in a law school classroo [Translation Studies and Practi] | UNVERIFIED | VERIFIED |
| `e2eea8a0` | openalex.org | OpenAlex Legal vocabulary in Early English translations of the Bible: a study o [Hermeneutics and Narrative Ide] | UNVERIFIED | VERIFIED |
| `d7e2fbef` | openalex.org | OpenAlex A Study of the Translation of English Legal Vocabulary under the Guida [Translation Studies and Practi] | UNVERIFIED | VERIFIED |
| `99499dc0` | openalex.org | OpenAlex Kant: The Metaphysics of Morals [Philosophical Ethics and Theor] | UNVERIFIED | VERIFIED |
| `54a8e578` | openalex.org | OpenAlex Expanding the Legal Vocabulary: The Challenge Posed by the Deconstruct [Judicial and Constitutional St] | UNVERIFIED | VERIFIED |
| `d50579dd` | openalex.org | OpenAlex Legal vocabulary and the indexer [Artificial Intelligence in Law] | UNVERIFIED | VERIFIED |
| `28b039c7` | openalex.org | OpenAlex Defining and Describing What We Do: Doctrinal Legal Research [Legal Education and Practice I] | UNVERIFIED | VERIFIED |

**16 findings · 16 usable search-trial combinations · receipt `a3cb0272`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [solutions_not_skipped](/theorem/solutions_not_skipped) — `(List.range 4).all (fun a => (List.range 4).all (fun u => (List.range 4).all (fun r => a +`
- [legal_verdict_is_exactly_one](/theorem/legal_verdict_is_exactly_one) — `(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; lp t h c + lr t`
- [legal_only_the_proven_is_admitted](/theorem/legal_only_the_proven_is_admitted) — `(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c == 1)`
- [legal_non_justiciable_is_never_refuted](/theorem/legal_non_justiciable_is_never_refuted) — `(List.range 2).all (fun h => (List.range 2).all (fun c => lr 0 h c == 0))`
- [legal_refuted_iff_test_fails_uncited](/theorem/legal_refuted_iff_test_fails_uncited) — `(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lr t h c == 1)`
- [legal_remand_is_total_nothing_discarded](/theorem/legal_remand_is_total_nothing_discarded) — `(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c + lre`
- [trial_computes_only_with_two_coins](/theorem/trial_computes_only_with_two_coins) — `(List.range 8).filter (fun k => 32 * k == 64) = [2]`
- [court_theorem_beats_assertion](/theorem/court_theorem_beats_assertion) — `(List.range 2).all (fun a => (List.range 2).all (fun b => (a*(1-b) + b*(1-a) == (a+b) % 2)`
- [court_loser_pays_the_two_coins](/theorem/court_loser_pays_the_two_coins) — `(List.range 2).all (fun a => (List.range 2).all (fun b => 2*(a*(1-b)) + 2*(b*(1-a)) == 2*(`
- [court_loser_develops_the_proven](/theorem/court_loser_develops_the_proven) — `(List.range 2).all (fun a => (List.range 2).all (fun b => a + b - a*b == max a b))`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
