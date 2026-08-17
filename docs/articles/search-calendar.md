---
title: "The search on trial: The calendar"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The calendar

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The calendar* — the wing sealed in [lean/Calendar.lean](/lean/Calendar.lean) with **9 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `4d641563` | zenodo.org | zenodo record 6778361: Contributions Calendar | UNVERIFIED | VERIFIED |
| `e118809d` | zenodo.org | zenodo record 10943680: kalendar | UNVERIFIED | VERIFIED |
| `a56c83d3` | zenodo.org | zenodo record 2702057: DEMOGRAPHY IN PERSONS, EVENTS, DOCUMENTS. MEMORABLE DATES 2017. | UNVERIFIED | VERIFIED |
| `dd624736` | zenodo.org | zenodo record 3485139: DEMOGRAPHY IN PERSONS, EVENTS, DOCUMENTS. MEMORABLE DATES 2017. | UNVERIFIED | VERIFIED |
| `0f0ebe14` | zenodo.org | zenodo record 12777444: Ficedula tricolor subsp. diversa Vaurie 1953 | UNVERIFIED | VERIFIED |
| `3c0c4de4` | zenodo.org | zenodo record 15615636: An Interview About Shepseskaf | UNVERIFIED | VERIFIED |
| `7b2a7979` | zenodo.org | zenodo record 4382331: East Asian calendar conversion database | UNVERIFIED | VERIFIED |
| `1c928475` | zenodo.org | zenodo record 12573961: Cakawi [sic] Cam 1969 | UNVERIFIED | VERIFIED |
| `ebc70768` | crossref.org | DOI 10.1093/0198270348.003.0005: Calendar and Community: The Emergence of the Normative Jewish Calendar | UNVERIFIED | VERIFIED |
| `69faf410` | crossref.org | DOI 10.32614/cran.package.jcalendar: jcalendaR: Interconversion Between the Japanese Calendar System and the Western  | UNVERIFIED | VERIFIED |
| `52ae763d` | crossref.org | DOI 10.1177/002205740305701426: Book Review: Nature Calendar Series: The Bird Calendar, the Wild Flower Calendar | UNVERIFIED | VERIFIED |
| `009ff1cc` | crossref.org | DOI 10.1163/1878-9781_ejiw_com_0004860: Calendar and calendar disputes | UNVERIFIED | VERIFIED |
| `221343d3` | crossref.org | DOI 10.1093/gao/9781884446054.article.t013157: Calendar | UNVERIFIED | VERIFIED |
| `21870b01` | crossref.org | DOI 10.2307/j.ctvh1dj98.16: Between Crucifixion and Calendar Reform: | UNVERIFIED | VERIFIED |
| `ad970004` | crossref.org | DOI 10.1109/mpul.2017.2736620: Calendar [Calendar] | UNVERIFIED | VERIFIED |
| `5f561b58` | crossref.org | DOI 10.1163/1874-6772_seg_a55_1984: Calendar. Intercalations in the Roman calendar, 191-46 B.C. | UNVERIFIED | VERIFIED |
| `ce093cf2` | openalex.org | OpenAlex The melatonin rhythm: both a clock and a calendar [Circadian rhythm and melatonin] | UNVERIFIED | VERIFIED |
| `4c4eaed5` | openalex.org | OpenAlex Caesar's Calendar [Historical and Architectural S] | UNVERIFIED | VERIFIED |
| `187fe1f2` | openalex.org | OpenAlex Calendar Aging of Lithium-Ion Batteries [Advancements in Battery Materi] | UNVERIFIED | VERIFIED |
| `587f28db` | openalex.org | OpenAlex The Life History Calendar: A Technique for Collecting Retrospective Da [Cognitive Abilities and Testin] | UNVERIFIED | VERIFIED |
| `d4f4aab6` | openalex.org | OpenAlex Hidden Rhythms: Schedules and Calendars in Social Life. [Complex Systems and Decision M] | UNVERIFIED | VERIFIED |
| `d887b31f` | openalex.org | OpenAlex Aging mechanism in Li ion cells and calendar life predictions [Advancements in Battery Materi] | UNVERIFIED | VERIFIED |
| `40174380` | openalex.org | OpenAlex Hidden Rhythms: Schedules and Calendars in Social Life [Globalization and Cultural Ide] | UNVERIFIED | VERIFIED |
| `93c58005` | openalex.org | OpenAlex An accelerated calendar and cycle life study of Li-ion cells [Advanced Battery Technologies ] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `fd1848ff`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [week_is_z7](/theorem/week_is_z7) — `[0,1,2,3,4,5,6].length = 7 ∧ 7 % 7 = 0`
- [common_year_shifts_one](/theorem/common_year_shifts_one) — `365 % 7 = 1`
- [leap_year_shifts_two](/theorem/leap_year_shifts_two) — `366 % 7 = 2`
- [leap_years_per_400](/theorem/leap_years_per_400) — `100 - 4 + 1 = 97`
- [gregorian_cycle_400_years](/theorem/gregorian_cycle_400_years) — `400 * 365 + 97 = 146097 ∧ 146097 % 7 = 0`
- [century_leap_rule](/theorem/century_leap_rule) — `2000 % 400 = 0 ∧ 1900 % 100 = 0 ∧ 1900 % 400 ≠ 0`
- [doomsday_even_months](/theorem/doomsday_even_months) — `[94,157,220,283,346].all (fun d => d % 7 == 3)`
- [months_sum_common_365](/theorem/months_sum_common_365) — `[31,28,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 365`
- [months_sum_leap_366](/theorem/months_sum_leap_366) — `[31,29,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 366`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
