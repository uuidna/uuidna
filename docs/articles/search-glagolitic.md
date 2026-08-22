---
title: "The search on trial: The Glagolitic numerals & Pliska rosette"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The Glagolitic numerals & Pliska rosette

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The Glagolitic numerals & Pliska rosette* — the wing sealed in [lean/Glagolitic.lean](/lean/Glagolitic.lean) with **10 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `ed05d9ac` | crossref.org | DOI 10.1093/gmo/9781561592630.article.45440: Glagolitic Mass, Glagolitic chant | UNVERIFIED | VERIFIED |
| `f8f46136` | crossref.org | DOI 10.59076/2603-2899.2025.4s.09: Numerals in Readings from the Pentateuch in Croatian-Glagolitic Breviaries and M | UNVERIFIED | VERIFIED |
| `3fb1bc3a` | crossref.org | DOI 10.1093/gao/9781884446054.article.t068170: Pliska | UNVERIFIED | VERIFIED |
| `25fc2091` | crossref.org | DOI 10.54664/ltzr2122: Deciphering the Script of the Pliska Rosette | UNVERIFIED | VERIFIED |
| `c1777149` | crossref.org | DOI 10.1515/9783110218831.3.661: Catalogue of archaeological finds from Pliska | UNVERIFIED | VERIFIED |
| `58e81b9c` | crossref.org | DOI 10.33675/978-3-8253-7878-3: Introduction to Glagolitic Palaeography | UNVERIFIED | VERIFIED |
| `f3e51427` | crossref.org | DOI 10.1093/oed/7726798262: Glagolitic, adj. &amp; n. | UNVERIFIED | VERIFIED |
| `6dad35bb` | crossref.org | DOI 10.1163/1574-9347_bnp_e928360: Pliska | UNVERIFIED | VERIFIED |

**8 findings · 8 usable search-trial combinations · receipt `06dc691a`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [glagolitic_units](/theorem/glagolitic_units) — `(List.range' 1 9) = [1,2,3,4,5,6,7,8,9]`
- [glagolitic_units_sum](/theorem/glagolitic_units_sum) — `((List.range' 1 9).foldl (fun s n => s + n) 0 = 45) ∧ (4 + 5 = 9)`
- [glagolitic_additive](/theorem/glagolitic_additive) — `500 + 80 + 3 = 583`
- [glagolitic_teens_reversed](/theorem/glagolitic_teens_reversed) — `(1 + 10 = 11) ∧ (9 + 10 = 19)`
- [pliska_seven_rays](/theorem/pliska_seven_rays) — `(1+2+3+4+5+6 = 21) ∧ (2 + 1 = 3)`
- [pliska_seven_is_prime](/theorem/pliska_seven_is_prime) — `(List.range' 2 5).all (fun k => 7 % k != 0)`
- [alphabetic_three_ranks](/theorem/alphabetic_three_ranks) — `9 + 9 + 9 = 27 ∧ 9 * 100 = 900`
- [roman_reads_subtractively](/theorem/roman_reads_subtractively) — `10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11`
- [gematria_ignores_order](/theorem/gematria_ignores_order) — `1 + 2 + 3 = 3 + 2 + 1 ∧ 1 + 2 + 3 = 6`
- [gematria_forces_collisions](/theorem/gematria_forces_collisions) — `22 * 22 * 22 = 10648 ∧ 1200 - 3 + 1 = 1198 ∧ 10648 > 1198`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
