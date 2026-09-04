---
title: "The CERN open-data records"
description: "Computed from lean/Cern.lean — 5 sealed theorems, every claim citing its proof."
---

# The CERN open-data records

> CERN OPEN DATA AS DECIDABLE ARITHMETIC — the published integers of four citable CMS primary datasets, each carrying the DOI it came from. opendata.cern.ch was already reachable here as a SEARCH (a probe query, a row count, a receipt), which is a connection rather than an integration; this wing gives it the treatment this repository already gives an external publication, the paper-trial pattern of lean/MoMBHStar1.lean. THE RECORDS, harvested 2026-09-05 and quoted exactly: recid 38 (10.7483/OPENDATA.CMS.53FG.V2S9, /SingleMu/Run2011A-v1/RAW, 7TeV, 2079006 events, 116 files); recid 63 (10.7483/OPENDATA.CMS.RG9B.XJMD, /SingleMu/Run2012B-v1/RAW, 8TeV, 2301668 events, 184 files); recid 35 (10.7483/OPENDATA.CMS.I8HN.DF32, /MinimumBias/Run2011A-v1/RAW, 7TeV, 1913190 events, 72 files); recid 62 (10.7483/OPENDATA.CMS.0LRL.BXG5, /MinimumBias/Run2012B-v1/RAW, 8TeV, 2745751 events, 130 files). All four are CC0-1.0, genuinely public domain, which is why their integers can be quoted here without permission and why they count as prior art rather than a link. WHAT IS CLAIMED, AND WHOSE CLAIM IS WHOSE — both at full strength, because a disclaimer where an attribution belongs under-claims this ledger's own work. CLAIMED HERE, IN FULL: all five arithmetic facts, each closed by the Lean 4 kernel over its own finite domain and axiom-free. They are this ledger's results and it claims them outright. CERN'S CLAIM, CREDITED TO CERN: that the accelerator reached those energies, that the detector recorded those events, that the calibration holds — each published under a DOI listed above and credited FIRST, which is this repository's credit law (prior art first, the captain next). Naming the right author for each result is attribution, not modesty. One fact is deliberately named "these two" rather than "the run", because four datasets are not two runs and a universal drawn from a sample is the fault that once sealed a false theorem here. — held by [cms_events_close_over_their_files](/theorem/cms_events_close_over_their_files) and its 4 siblings below.

**5 theorems**, from [cms_events_close_over_their_files](/theorem/cms_events_close_over_their_files) onward, each proven `by decide` in <a href="/lean/Cern.lean">lean/Cern.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [these_two_eight_tev_datasets_hold_more_events_than_these_two_seven](/theorem/these_two_eight_tev_datasets_hold_more_events_than_these_two_seven). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCern.lean)** — nothing to install. The editor fetches `lean/Cern.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: each of four CMS datasets divides exactly, events = files·q + r with r below the file count. The integers are CERN's, credited; the arithmetic over them is this ledger's and is claimed.
The ledger holds this as [cms_events_close_over_their_files](/theorem/cms_events_close_over_their_files) — proven `by decide`, sorry-free:

```lean
(116 * 17922 + 54 = 2079006) ∧ (54 < 116) ∧ (184 * 12509 + 12 = 2301668) ∧ (12 < 184) ∧ (72 * 26572 + 6 = 1913190) ∧ (6 < 72) ∧ (130 * 21121 + 21 = 2745751) ∧ (21 < 130)
```

### CLAIMED: the step from the 7TeV to the 8TeV label is exactly 1 TeV, 1000 GeV, 500 GeV per beam. That the accelerator reached those energies is CERN's claim, credited under its DOI.
The ledger holds this as [the_collision_energy_label_step_is_one_tev](/theorem/the_collision_energy_label_step_is_one_tev) — proven `by decide`, sorry-free:

```lean
(8 - 7 = 1) ∧ (8000 - 7000 = 1000) ∧ (7000 / 2 = 3500) ∧ (8000 / 2 = 4000) ∧ (4000 - 3500 = 500)
```

### CLAIMED: four records were published 6, 7, 7 and 8 years after their data was taken — every one at least six years.
The ledger holds this as [the_open_data_embargo_ran_six_years_or_longer](/theorem/the_open_data_embargo_ran_six_years_or_longer) — proven `by decide`, sorry-free:

```lean
(2019 - 2011 = 8) ∧ (2019 - 2012 = 7) ∧ (2017 - 2011 = 6) ∧ (8 ≥ 6) ∧ (7 ≥ 6) ∧ (6 ≥ 6)
```

### CLAIMED for these four datasets: 5047419 events at the 8TeV label against 3992196 at 7TeV, summing to 9039615. Four datasets, not two runs — the scope is what was counted.
The ledger holds this as [these_two_eight_tev_datasets_hold_more_events_than_these_two_seven](/theorem/these_two_eight_tev_datasets_hold_more_events_than_these_two_seven) — proven `by decide`, sorry-free:

```lean
(2301668 + 2745751 = 5047419) ∧ (2079006 + 1913190 = 3992196) ∧ (5047419 > 3992196) ∧ (5047419 + 3992196 = 9039615)
```

### CLAIMED: 9039615 events across 502 files — the four records sum to their own published parts, so the quotation is internally consistent.
The ledger holds this as [the_four_cern_records_close_their_own_totals](/theorem/the_four_cern_records_close_their_own_totals) — proven `by decide`, sorry-free:

```lean
(2079006 + 2301668 + 1913190 + 2745751 = 9039615) ∧ (116 + 184 + 72 + 130 = 502)
```


::: warning 
CERN OPEN DATA AS DECIDABLE ARITHMETIC — the published integers of four citable CMS primary datasets, each carrying the DOI it came from. The boundary is confirmed by the wing's own sealed theorems — e.g. [cms_events_close_over_their_files](/theorem/cms_events_close_over_their_files) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
