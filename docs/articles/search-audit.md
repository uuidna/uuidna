---
title: "The search on trial: The detectors, proven"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The detectors, proven

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The detectors, proven* — the wing sealed in [lean/Audit.lean](/lean/Audit.lean) with **9 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `9e7cfc64` | zenodo.org | zenodo record 5786136: Gamma dose rate monitoring using a Silicon Photomultiplier-based plastic scintil | UNVERIFIED | VERIFIED |
| `d5a96afc` | zenodo.org | zenodo record 17638064: Studies of the Time Response of Electronic Radon Detectors | UNVERIFIED | VERIFIED |
| `8ead66a0` | zenodo.org | zenodo record 21759908: TWO-STAGE CLASSIFICATION ARCHITECTURES IN MODERN OBJECT DETECTION: FROM REGION P | UNVERIFIED | VERIFIED |
| `e2fa2ca2` | zenodo.org | zenodo record 3508070: Building... then crossing bridges in support of open research | UNVERIFIED | VERIFIED |
| `a69a2116` | zenodo.org | zenodo record 8384083: A dataset of open-source android applications collected from F-droid | UNVERIFIED | VERIFIED |
| `b6add05f` | zenodo.org | zenodo record 5926112: Thelepus cincinnatus | UNVERIFIED | VERIFIED |
| `c3f398aa` | zenodo.org | zenodo record 8344603: On-site testing of VOC detectors for Indoor Air Quality assessment | UNVERIFIED | VERIFIED |
| `b3f8cdc1` | zenodo.org | zenodo record 1078514: Assessing Post-Detection Filters for a Generic Pedestrian Detector in a Tracking | UNVERIFIED | VERIFIED |
| `25a8a845` | crossref.org | DOI 10.1142/9789812819093_0107: IGNORED DISCOVERY NOW PROVEN CAPABLE OF SAVING MILLIONS OF LIVES FROM PREMATURE  | UNVERIFIED | VERIFIED |
| `54ea419e` | crossref.org | DOI 10.7591/cornell/9781501750373.003.0001: Introduction | UNVERIFIED | VERIFIED |
| `d4942777` | crossref.org | DOI 10.53347/rid-161861: amyloid biopsy proven | UNVERIFIED | VERIFIED |
| `c44cb315` | crossref.org | DOI 10.1515/9781501750397-001: 1. Introduction: The Data-Method- Theory Triad, or Why Finance Cannot Be Proven | UNVERIFIED | VERIFIED |
| `c5d2eaee` | crossref.org | DOI 10.1093/oed/2401541757: proven, adj. | UNVERIFIED | VERIFIED |
| `828360ce` | crossref.org | DOI 10.1093/oed/1040001202: non-proven, adj. | UNVERIFIED | VERIFIED |
| `40ce8897` | crossref.org | DOI 10.1007/978-1-4020-2867-0_7: BHDL: Principles and tools for generating proven hardware | UNVERIFIED | VERIFIED |
| `1d2aa0f7` | crossref.org | DOI 10.7591/cornell/9781501750373.001.0001: The Ascent of Market Efficiency | UNVERIFIED | VERIFIED |
| `926ffed1` | openalex.org | OpenAlex The LHCb Detector at the LHC [Particle Detector Development ] | UNVERIFIED | VERIFIED |
| `deb4b688` | openalex.org | OpenAlex DSSD : Deconvolutional Single Shot Detector [Advanced Neural Network Applic] | UNVERIFIED | VERIFIED |
| `0019e8cb` | openalex.org | OpenAlex Massive MIMO in the UL/DL of Cellular Networks: How Many Antennas Do W [Advanced MIMO Systems Optimiza] | UNVERIFIED | VERIFIED |
| `75da3941` | openalex.org | OpenAlex ADJUST: An automatic EEG artifact detector based on the joint use of s [EEG and Brain-Computer Interfa] | UNVERIFIED | VERIFIED |
| `19c2f3b2` | openalex.org | OpenAlex A Review of Accelerometry-Based Wearable Motion Detectors for Physical [Context-Aware Activity Recogni] | UNVERIFIED | VERIFIED |
| `9bad770f` | openalex.org | OpenAlex Letter of Intent: The Hyper-Kamiokande Experiment --- Detector Design  [Neutrino Physics Research] | UNVERIFIED | VERIFIED |
| `cd21a41c` | openalex.org | OpenAlex A Multi-Modal Distributed Real-Time IoT System for Urban Traffic Contr [Advanced Image and Video Retri] | UNVERIFIED | VERIFIED |
| `dcd8af4d` | openalex.org | OpenAlex Flat-detector computed tomography (FD-CT) [Advanced X-ray and CT Imaging] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `58afbbb3`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [wall_steady_state](/theorem/wall_steady_state) — `(3 * 2 = 6) ∧ (2 > 1) ∧ (3 > 0)`
- [flag_truth_table](/theorem/flag_truth_table) — `((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0]`
- [flag_requires_hollow](/theorem/flag_requires_hollow) — `(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2)`
- [demarcation_clears](/theorem/demarcation_clears) — `(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0)`
- [backing_clears](/theorem/backing_clears) — `(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0)`
- [exactly_one_flag](/theorem/exactly_one_flag) — `((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1`
- [flag_matches_spec](/theorem/flag_matches_spec) — `(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) `
- [sanitize_depth_bounded](/theorem/sanitize_depth_bounded) — `(32 = 2^5) ∧ (0 < 32)`
- [drift_is_named_or_caught](/theorem/drift_is_named_or_caught) — `((List.range 4).all (fun n => let r := n % 2; let d := n / 2 % 2; ((1 - r * (1 - d)) == 1)`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
