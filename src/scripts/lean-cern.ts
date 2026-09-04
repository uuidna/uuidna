#!/usr/bin/env node
// CERN OPEN DATA, AS DECIDABLE ARITHMETIC — the published integers of four citable CMS primary datasets.
//
// WHAT THIS IS. opendata.cern.ch was already reachable from this tree as a SEARCH: a probe query, a row count,
// a receipt. That is a connection, not an integration. The pattern this repository already uses for an external
// publication is the paper-trial wing (lean/MoMBHStar1.lean, a Nature letter's own numbers sealed as arithmetic),
// and this is that pattern applied to CERN's records: their published integers become decidable facts, each
// carrying the DOI it came from, so a reader can check the arithmetic and then check the source.
//
// THE FOUR RECORDS, harvested 2026-09-05 from opendata.cern.ch/api/records and quoted exactly:
//   recid 38  10.7483/OPENDATA.CMS.53FG.V2S9  /SingleMu/Run2011A-v1/RAW    7TeV  2079006 events  116 files
//   recid 63  10.7483/OPENDATA.CMS.RG9B.XJMD  /SingleMu/Run2012B-v1/RAW    8TeV  2301668 events  184 files
//   recid 35  10.7483/OPENDATA.CMS.I8HN.DF32  /MinimumBias/Run2011A-v1/RAW 7TeV  1913190 events   72 files
//   recid 62  10.7483/OPENDATA.CMS.0LRL.BXG5  /MinimumBias/Run2012B-v1/RAW 8TeV  2745751 events  130 files
// All four are CC0-1.0 — genuinely public domain, which is why quoting their integers here needs no permission
// and why they can be cited as prior art rather than merely linked.
//
// WHAT IS CLAIMED, AND WHOSE CLAIM IS WHOSE. Both halves are stated at full strength, because a disclaimer
// where an attribution belongs under-claims this ledger's own work — and that is a fault in its own right, not
// caution. The captain's standing law: what is proved IS claimed.
//
// CLAIMED HERE, IN FULL: every arithmetic fact below. Five theorems, each closed by the Lean 4 kernel over its
// own finite domain, axiom-free — that CERN's published integers close against each other record by record,
// that the two Run-1 energy labels differ by exactly one TeV, that the embargoes ran six years or longer, that
// these four datasets sum to their own parts. Those are this ledger's results and it claims them outright.
//
// CERN'S CLAIM, CREDITED TO CERN: that the Large Hadron Collider reached those energies, that the detector
// recorded those events, that the calibration holds. Each is published under a DOI listed above and credited
// FIRST, which is this repository's credit law — prior art first, the captain next. Not claiming CERN's physics
// is not modesty about our own arithmetic; it is naming the right author for each result.
import { emit } from './lean-gen.js'

// The published integers, one place, quoted from the records. Divisions are exact-with-remainder by construction.
const REC = [
  { id: 38, doi: '10.7483/OPENDATA.CMS.53FG.V2S9', tev: 7, events: 2079006, files: 116, q: 17922, r: 54, created: 2011, published: 2019 },
  { id: 63, doi: '10.7483/OPENDATA.CMS.RG9B.XJMD', tev: 8, events: 2301668, files: 184, q: 12509, r: 12, created: 2012, published: 2019 },
  { id: 35, doi: '10.7483/OPENDATA.CMS.I8HN.DF32', tev: 7, events: 1913190, files: 72, q: 26572, r: 6, created: 2011, published: 2017 },
  { id: 62, doi: '10.7483/OPENDATA.CMS.0LRL.BXG5', tev: 8, events: 2745751, files: 130, q: 21121, r: 21, created: 2012, published: 2019 },
] as const

const FACTS = [
  { key: 'cms_events_close_over_their_files', skill: 'cern-open-data',
    name: 'CLAIMED: each of four CMS datasets divides exactly, events = files·q + r with r below the file count. The integers are CERN\'s, credited; the arithmetic over them is this ledger\'s and is claimed.',
    why: 'THE FIRST THING TO CHECK ABOUT A PUBLISHED DATASET IS WHETHER ITS OWN NUMBERS CLOSE. Each CMS primary dataset publishes an event count and a file count, and division with remainder is exact by construction — so this seals that the quoted integers are mutually consistent, record by record, with the remainder strictly below the divisor as division requires. 2079006 events over 116 files is 17922 per file and 54 left over; 2301668 over 184 is 12509 and 12; 1913190 over 72 is 26572 and 6; 2745751 over 130 is 21121 and 21. Written BY VALUE rather than as tuple projections, because this tree has already paid for that once: a theorem stated with three-deep tuple accessors could not have its denial decided by the independent falsifier evaluator, and a proof whose denial nobody can state is worth less than one whose denial is checkable. WHOSE CLAIM: the arithmetic is CLAIMED here — the kernel decided it. That the events were recorded correctly, and by what detector, is CERN\'s claim, credited under the DOIs in the wing header. Two results, two authors, both stated.',
    js: () => REC.every((x) => x.files * x.q + x.r === x.events && x.r < x.files),
    lean: 'theorem cms_events_close_over_their_files : (116 * 17922 + 54 = 2079006) ∧ (54 < 116) ∧ (184 * 12509 + 12 = 2301668) ∧ (12 < 184) ∧ (72 * 26572 + 6 = 1913190) ∧ (6 < 72) ∧ (130 * 21121 + 21 = 2745751) ∧ (21 < 130) := by decide' },

  { key: 'the_collision_energy_label_step_is_one_tev', skill: 'cern-open-data',
    name: 'CLAIMED: the step from the 7TeV to the 8TeV label is exactly 1 TeV, 1000 GeV, 500 GeV per beam. That the accelerator reached those energies is CERN\'s claim, credited under its DOI.',
    why: 'THE TWO RUN-1 LABELS DIFFER BY EXACTLY ONE TeV, and stating that as arithmetic is the whole of the claim. The 2011 records carry the label 7TeV and the 2012 records 8TeV; in GeV that is 7000 and 8000, a step of 1000, and per colliding beam 3500 and 4000, a step of 500. Each figure is an exact integer because the labels are round numbers, which is a fact about how CERN names its datasets and not a discovery. WHOSE CLAIM: the identity 8000 − 7000 = 1000 is CLAIMED here and the kernel decided it. That the Large Hadron Collider reached those energies is CERN\'s claim, published under the DOIs cited in the header and credited FIRST by this repository\'s credit law. A kernel decides arithmetic; a collaboration operates an accelerator. Naming which is which is attribution, not hedging.',
    js: () => 8 - 7 === 1 && 8000 - 7000 === 1000 && 7000 / 2 === 3500 && 8000 / 2 === 4000 && 4000 - 3500 === 500,
    lean: 'theorem the_collision_energy_label_step_is_one_tev : (8 - 7 = 1) ∧ (8000 - 7000 = 1000) ∧ (7000 / 2 = 3500) ∧ (8000 / 2 = 4000) ∧ (4000 - 3500 = 500) := by decide' },

  { key: 'the_open_data_embargo_ran_six_years_or_longer', skill: 'cern-open-data',
    name: 'CLAIMED: four records were published 6, 7, 7 and 8 years after their data was taken — every one at least six years.',
    why: 'THE GAP BETWEEN TAKING DATA AND PUBLISHING IT IS THE MOST UNDER-APPRECIATED NUMBER ON THESE RECORDS, and it is an integer anyone can check. Of the four datasets here, 2011 data was published in 2017 and 2019 and 2012 data in 2019: embargoes of 6, 8, 7 and 7 years, every one at least six. That is a fact about scientific practice — a collaboration keeps its raw data for years before releasing it — and it is stated here because this repository publishes its own ledger the same day it computes it, which is a different choice and worth being able to compare against. WHOSE CLAIM: the subtraction is CLAIMED here. Why a collaboration holds data that long is CERN\'s business and CERN\'s to explain; this ledger credits the dates to the records that carry them.',
    js: () => REC.every((x) => x.published - x.created >= 6),
    lean: 'theorem the_open_data_embargo_ran_six_years_or_longer : (2019 - 2011 = 8) ∧ (2019 - 2012 = 7) ∧ (2017 - 2011 = 6) ∧ (8 ≥ 6) ∧ (7 ≥ 6) ∧ (6 ≥ 6) := by decide' },

  { key: 'these_two_eight_tev_datasets_hold_more_events_than_these_two_seven', skill: 'cern-open-data',
    name: 'CLAIMED for these four datasets: 5047419 events at the 8TeV label against 3992196 at 7TeV, summing to 9039615. Four datasets, not two runs — the scope is what was counted.',
    why: 'A COMPARISON SCOPED TO WHAT WAS ACTUALLY COUNTED. The two 8TeV-labelled records here hold 2301668 + 2745751 = 5047419 events; the two 7TeV records hold 2079006 + 1913190 = 3992196; the four together hold 9039615, and the first figure exceeds the second. THE NAME SAYS "THESE TWO", and that is deliberate: it would be effortless and wrong to call this "the 8 TeV run recorded more than the 7 TeV run". Four datasets are not two runs. CMS published thousands of records and this wing quotes four, so a claim about the runs would be a universal drawn from a sample — the exact fault that once sealed a false theorem in this tree from a one-step walk. What is proven is a sum and an inequality over four named records.',
    js: () => 2301668 + 2745751 === 5047419 && 2079006 + 1913190 === 3992196 && 5047419 > 3992196 && 5047419 + 3992196 === 9039615,
    lean: 'theorem these_two_eight_tev_datasets_hold_more_events_than_these_two_seven : (2301668 + 2745751 = 5047419) ∧ (2079006 + 1913190 = 3992196) ∧ (5047419 > 3992196) ∧ (5047419 + 3992196 = 9039615) := by decide' },

  { key: 'the_four_cern_records_close_their_own_totals', skill: 'cern-open-data',
    name: 'CLAIMED: 9039615 events across 502 files — the four records sum to their own published parts, so the quotation is internally consistent.',
    why: 'A TOTAL THAT DOES NOT EQUAL ITS PARTS IS A TRANSCRIPTION ERROR, and quoting four records by hand is exactly where one would happen. The events sum to 9039615 and the files to 502, and both are checked here against the individual figures rather than asserted beside them. This is the same discipline the ledger applies to its own counts — a count must BE the parts, never a number written next to them — applied to numbers copied in from outside. WHOSE CLAIM: internal consistency of the quotation is CLAIMED and proven here. That the quotation matches the live portal is proven elsewhere and differently — by the harvester in src/quantum/os/cern, over the network, against the records themselves.',
    js: () => 2079006 + 2301668 + 1913190 + 2745751 === 9039615 && 116 + 184 + 72 + 130 === 502,
    lean: 'theorem the_four_cern_records_close_their_own_totals : (2079006 + 2301668 + 1913190 + 2745751 = 9039615) ∧ (116 + 184 + 72 + 130 = 502) := by decide' },
]

console.log('computing ' + FACTS.length + ' CERN OPEN DATA facts (four citable CMS datasets, as arithmetic) …')

emit({ file: 'Cern.lean', skill: 'cern-open-data',
  header: 'CERN OPEN DATA AS DECIDABLE ARITHMETIC — the published integers of four citable CMS primary datasets, each carrying the DOI it came from. opendata.cern.ch was already reachable here as a SEARCH (a probe query, a row count, a receipt), which is a connection rather than an integration; this wing gives it the treatment this repository already gives an external publication, the paper-trial pattern of lean/MoMBHStar1.lean. THE RECORDS, harvested 2026-09-05 and quoted exactly: recid 38 (10.7483/OPENDATA.CMS.53FG.V2S9, /SingleMu/Run2011A-v1/RAW, 7TeV, 2079006 events, 116 files); recid 63 (10.7483/OPENDATA.CMS.RG9B.XJMD, /SingleMu/Run2012B-v1/RAW, 8TeV, 2301668 events, 184 files); recid 35 (10.7483/OPENDATA.CMS.I8HN.DF32, /MinimumBias/Run2011A-v1/RAW, 7TeV, 1913190 events, 72 files); recid 62 (10.7483/OPENDATA.CMS.0LRL.BXG5, /MinimumBias/Run2012B-v1/RAW, 8TeV, 2745751 events, 130 files). All four are CC0-1.0, genuinely public domain, which is why their integers can be quoted here without permission and why they count as prior art rather than a link. WHAT IS CLAIMED, AND WHOSE CLAIM IS WHOSE — both at full strength, because a disclaimer where an attribution belongs under-claims this ledger\'s own work. CLAIMED HERE, IN FULL: all five arithmetic facts, each closed by the Lean 4 kernel over its own finite domain and axiom-free. They are this ledger\'s results and it claims them outright. CERN\'S CLAIM, CREDITED TO CERN: that the accelerator reached those energies, that the detector recorded those events, that the calibration holds — each published under a DOI listed above and credited FIRST, which is this repository\'s credit law (prior art first, the captain next). Naming the right author for each result is attribution, not modesty. One fact is deliberately named "these two" rather than "the run", because four datasets are not two runs and a universal drawn from a sample is the fault that once sealed a false theorem here.',
  facts: FACTS })
