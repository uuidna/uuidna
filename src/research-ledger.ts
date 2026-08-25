// research-ledger — A FINDING IS DATA, WITH ITS VERIFICATION STATUS AS A FIELD.
//
// Five deep-research passes ran on 2026-08-20 and every one of them reported the same way: prose, in a transcript
// that ends when the session does. The findings were good — a published manual's table off by 8%, an agricultural
// report implying a rotor coefficient above its own physical ceiling, a "measured" speedup that was a typed-in
// literal — and all of it would have survived only as recollection. The rosetta census puts the number on it:
// WITNESS is carried by 9 theorems out of 1334, by far the scarcest of the five legs, and the reason is that the
// project had no place to put a witness.
//
// This is that place. Each finding records what was claimed, the value, the source, and — the field that matters —
// HOW WELL IT WAS VERIFIED. Today's agents hit paywalls at Nature, ScienceDirect, AIP, ACS and Sandia, and fell
// back to secondary sources. That is legitimate research, but it is NOT the same as reading the paper, and a
// record that cannot tell the two apart is worth less than one that admits the difference.
//
// TWO DISTINCTIONS THE LEDGER ALREADY DEPENDS ON:
//
//   status  — read | secondary | unread | refuted. `read` means the primary source was actually retrieved and the
//             figure taken from its own text. `secondary` means a citing work reported it. `unread` means it is
//             believed and unchecked, which is the state most recalled facts are in and the state that produced
//             every error of mine today.
//   kind    — convention | measured. A convention (the Faraday constant, 1 kWh = 3600 kJ, the Betz ratio 16/27) is
//             exact by definition and may seal as an EQUALITY. A measurement carries uncertainty and may only ever
//             seal as an integer BRACKET. Confusing the two is how a rounded figure
//             becomes an asserted constant.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

export type Status = 'read' | 'secondary' | 'unread' | 'refuted'
export type Kind = 'convention' | 'measured'

export interface Finding {
  claim: string
  value: string
  units: string
  source: string
  status: Status
  kind: Kind
  note?: string
  /** THE THEOREM THIS FINDING ACTUALLY ANCHORS, by key — the relation the anchoring law governs and which was
   *  recorded nowhere until now.
   *
   *  `anchors(f)` answers "may this anchor a theorem?" and the report counts how many findings pass. Nothing
   *  answered "does any sealed theorem rest on one that does NOT?", because no finding pointed at a theorem and
   *  no theorem pointed back. The law had predicates, a census and no subject, so it could be neither violated
   *  nor satisfied — a control that cannot fire. (The `anchorsTheorem: boolean` field in the report is part of
   *  why this went unseen: it reads as a relation and is a predicate. It keeps its name here because the served
   *  API folds to a handle and renaming a field silently moves that address; the confusion is documented instead.)
   *
   *  OPTIONAL BY DESIGN. Requiring it would mean relabelling twenty-eight findings at once, and whoever knows
   *  which finding a wing rests on is the author of that wing, not this module. Left absent, a finding is exactly
   *  as checkable as it was before; filled in, `tensions()` can finally ask the question the law was written for. */
  theorem?: string
}

/** Only a READ primary source anchors a theorem. Everything else is provisional, and saying so is the point. */
export const anchors = (f: Finding): boolean => f.status === 'read'

/** A measured quantity may not be sealed as an equality — it gets a bracket or it gets nothing. */
export const sealableAsEquality = (f: Finding): boolean => f.kind === 'convention' && f.status === 'read'

/** A TENSION is a claim the tree's own rules forbid, found in what is already sealed rather than proposed as new
 *  work. Three kinds, and each is decidable from the ledger alone — no lexicon, no judgement, no opinion:
 *
 *   · FABRICATED   — a finding names a theorem that is not sealed. The citation verifies nothing.
 *   · UNANCHORED   — a finding anchors a SEALED theorem while `anchors(f)` is false. This is the paradox the
 *                    anchoring law exists to forbid and could not previously detect: a proof standing on evidence
 *                    the tree itself says may not hold it.
 *   · OVERSEALED   — a MEASURED finding anchors a theorem while claiming equality's privileges. A measurement
 *                    gets an integer bracket or it gets nothing.
 *
 *  UNLINKED FINDINGS ARE NOT A TENSION and are deliberately not reported as one. A finding with no `theorem` is
 *  silent, not wrong, and counting silence as a violation is how an audit learns to cry wolf. What the count of
 *  them IS good for is stating this check's own reach — see `tensionReport`. */
export interface Tension { finding: string; theorem: string; kind: 'fabricated' | 'unanchored' | 'oversealed'; why: string }

export function tensions(findings: readonly Finding[], sealedKeys: ReadonlySet<string>): Tension[] {
  const out: Tension[] = []
  for (const f of findings) {
    if (!f.theorem) continue
    if (!sealedKeys.has(f.theorem)) {
      out.push({ finding: f.claim, theorem: f.theorem, kind: 'fabricated',
        why: `names theorem ${f.theorem}, which is not sealed in the ledger — a citation to a proof that does not exist verifies nothing` })
      continue
    }
    if (!anchors(f))
      out.push({ finding: f.claim, theorem: f.theorem, kind: 'unanchored',
        why: `status is ${f.status}, and only a read primary source may anchor a theorem — ${f.theorem} rests on evidence this tree's own rule forbids` })
    else if (f.kind === 'measured')
      out.push({ finding: f.claim, theorem: f.theorem, kind: 'oversealed',
        why: `a measured quantity anchors ${f.theorem}; a measurement seals as an integer BRACKET or as nothing, never as an equality` })
  }
  return out
}

/** The check's own reach, stated with its verdict — because "no tensions" over an unlinked corpus means only that
 *  nothing could be checked, and a report that does not say so is the empty-equals-healthy conflation again. */
export function tensionReport(findings: readonly Finding[], sealedKeys: ReadonlySet<string>): {
  tensions: Tension[]; linked: number; unlinked: number; checkable: boolean; honest: string
} {
  const linked = findings.filter((f) => f.theorem).length
  const found = tensions(findings, sealedKeys)
  return {
    tensions: found, linked, unlinked: findings.length - linked, checkable: linked > 0,
    honest: linked === 0
      ? 'NOT CHECKABLE: no finding names the theorem it anchors, so the anchoring law has no subject here and an ' +
        'empty result is the absence of a question, never a clean bill of health.'
      : `checked ${linked} of ${findings.length} findings; the remaining ${findings.length - linked} name no theorem and are silent rather than clean.`,
  }
}

/** the address of a finding, so a stranger recomputes the same identity from the same four fields */
export const findingAddress = (f: Finding): string => toUuid(`${f.claim}|${f.value}|${f.units}|${f.source}`)

/** Gaps a research ledger can report about itself. Each one is a state a careful reader would object to. */
export function researchGaps(fs: readonly Finding[]): { what: string; fix: string }[] {
  const gaps: { what: string; fix: string }[] = []
  for (const f of fs) {
    if (f.status === 'unread') gaps.push({
      what: `"${f.claim}" is believed but unchecked — no source was retrieved`,
      fix: 'read the primary source, or mark it refuted; an unread finding must never anchor a theorem',
    })
    if (f.kind === 'convention' && f.status !== 'read') gaps.push({
      what: `"${f.claim}" is treated as exact-by-definition but its defining source was not read (${f.status})`,
      fix: 'a convention seals as an EQUALITY, so its definition must come from the standard itself',
    })
  }
  // GROUPED BY THE QUANTITY. This branch was unreachable when it grouped on findingAddress:
  // the address folds claim ∥ value ∥ units ∥ source, so every member of a group already shared its value and the
  // "disagreeing values" test could never come out true. A check that cannot fire is not a check — the exact class
  // the falsifier leg exists to catch — so the key is now the quantity (claim ∥ units), which is what a reader
  // objects to two different numbers for, and src/tests/research-ledger.test.ts drives it to a real gap.
  const byQuantity = new Map<string, Finding[]>()
  for (const f of fs) {
    const q = `${f.claim}|${f.units}`
    byQuantity.set(q, [...(byQuantity.get(q) ?? []), f])
  }
  for (const [, group] of byQuantity) {
    if (group.length > 1 && new Set(group.map((g) => g.value)).size > 1) gaps.push({
      what: `"${group[0].claim}" is recorded with disagreeing values: ${[...new Set(group.map((g) => g.value))].join(' vs ')}`,
      fix: 'two sources disagree — record both with their sources, or resolve which is primary',
    })
  }
  return gaps
}

/** the census, which is the number that made this module necessary */
export const census = (fs: readonly Finding[]): Record<Status, number> => {
  const out: Record<Status, number> = { read: 0, secondary: 0, unread: 0, refuted: 0 }
  for (const f of fs) out[f.status]++
  return out
}

// ── THE SEALED FINDINGS, CARRIED IN SOURCE SO THE HOSTED EDGE CAN SERVE THEM ──────────────────────────────────
//
// lean/research-ledger.json is the human-readable record of the passes. It cannot be READ at the Cloudflare Workers
// edge — that runtime has no filesystem — so the shipped copy is this array, and the two are held together by
// src/tests/research-ledger.test.ts, which fails naming the exact finding that diverged. The same discipline the
// hosted server version already runs under: a stated constant is fine, an unchecked one is how a surface drifts.
export const FINDINGS: readonly Finding[] = [
  { claim: 'Betz limit — maximum fraction of wind kinetic energy any open-flow turbine can capture', value: '16/27', units: 'ratio',
    source: 'Betz, Zeitschrift fur das gesamte Turbinenwesen 26 (1920) 307-309; English translation Wind Engineering 37 (2013) 441-446',
    status: 'read', kind: 'convention', note: 'Joukowsky co-priority, same year, independent. Exact rational: brackets natively.' },
  { claim: 'Faraday constant', value: '96485.3321233100184', units: 'C/mol',
    source: 'NIST CODATA; product of exact e and exact N_A under SI 2019',
    status: 'read', kind: 'convention', note: 'Exact product, sharper than the commonly quoted 96485.33212.' },
  { claim: 'Water-splitting reversible cell potential', value: '1.228891', units: 'V',
    source: 'computed from CODATA Gibbs energy -237.14 kJ/mol over 2F',
    status: 'read', kind: 'measured', note: 'The textbook 1.23 V is a ROUNDING UP — an upper bound, not the value. Real electrolysers run 1.6-2.0 V.' },
  { claim: 'Methane combustion enthalpy, liquid water basis', value: '890.30', units: 'kJ/mol',
    source: 'recomputed from NIST WebBook formation enthalpies: 39351 + 2*28583 - 7487 = 89030',
    status: 'read', kind: 'measured', note: 'The project\'s 890.29 sits at the BOTTOM of the credible band; NIST lists four values spanning 890.3-890.6.' },
  { claim: 'Domestic wastewater internal chemical energy', value: '7.6', units: 'kJ/L',
    source: 'Heidrich, Curtis & Dolfing 2011, Environ. Sci. Technol. 45(2):827, DOI 10.1021/es103058w',
    status: 'read', kind: 'measured', note: 'Independently corroborated by Korth 2021 at 6.7 +/- 2.9 kJ/L by a different method.' },
  { claim: 'Pilot-scale microbial fuel cell volumetric power', value: '600 +/- 452 (range 12-1435)', units: 'mW/m^3',
    source: 'Rossi & Logan 2022, Water Research 225:119179',
    status: 'read', kind: 'measured', note: 'PDF retrieved and text extracted; figures read from the paper\'s own text.' },
  { claim: 'Pilot MFC effluent COD against discharge target', value: '247 +/- 206 against ~60', units: 'mg/L',
    source: 'Rossi & Logan 2022, Water Research 225:119179',
    status: 'read', kind: 'measured', note: 'Refutes \'exhausting pure water\' for the MFC route: cleaner, not clean.' },
  { claim: 'Four-stroke cycle completes in two crankshaft revolutions', value: '2', units: 'revolutions',
    source: 'Runciman, Gas and Oil Engines Simply Explained (Gutenberg 27286); corroborated by Rathbun (Gutenberg 56776)',
    status: 'read', kind: 'convention', note: 'Both books read in full; corroborated independently by the 2:1 camshaft ratio.' },
  { claim: 'One working stroke in four; impulses per revolution equal cylinders divided by two', value: '1 of 4', units: 'strokes',
    source: 'Rathbun, Practical Hand Book of Gas, Oil and Steam Engines (Gutenberg 56776)',
    status: 'read', kind: 'convention', note: 'A firing-frequency fact, NOT an efficiency factor — must not be multiplied into a fuel-energy chain.' },
  { claim: 'No engine book consulted states degrees of crank rotation per stroke or per cycle', value: 'absent', units: 'none',
    source: 'Runciman 27286, Rathbun 56776, Mathot 38415 — all read in full',
    status: 'read', kind: 'measured', note: 'NEGATIVE RESULT. No 180 degrees, no 720 degrees, and no in-line firing order anywhere. Derivation would have fabricated all three.' },
  { claim: 'Fujishima-Honda experimental details: 500 W xenon lamp, few-mA currents, quantum efficiency ~0.1, bias required', value: 'as stated', units: 'mixed',
    source: 'Fujishima & Honda 1972, Nature 238(5358):37-38, DOI 10.1038/238037a0',
    status: 'secondary', kind: 'measured', note: 'Nature paywalled (403 + IdP redirect). Bibliographic record confirmed via Crossref; the experimental details were NOT read.' },
  { claim: 'Shockley-Queisser limit, original paper figure', value: '~30% at 1.1 eV vs 6000 K blackbody', units: 'percent',
    source: 'Shockley & Queisser 1961, J. Appl. Phys. 32(3):510, DOI 10.1063/1.1736034',
    status: 'secondary', kind: 'measured', note: 'AIP returned 403. Citation Crossref-verified; the value is from secondary sources.' },
  { claim: 'Savonius rotor peak coefficient of performance and its tip-speed ratio', value: 'unknown', units: 'ratio',
    source: 'Sandia SAND76-0131 (Blackwell, Sheldahl & Feltz 1977)',
    status: 'unread', kind: 'measured', note: 'Full-text PDF returned 403 at every accessible mirror. Cited only for design conclusions reported consistently in secondary literature.' },
  { claim: 'Thermoelectric module efficiency against Carnot', value: '4.0% actual vs 47.1% Carnot = 8.5% of Carnot', units: 'percent',
    source: 'TECTEG TEG1-12611-8.0 datasheet, read directly',
    status: 'read', kind: 'measured', note: '300/30 C, 13.0 W matched load, ~325 W heat flow. Thermoelectric is ~10x worse than PV on the same area.' },

  // ── THE LEARNING-SCIENCE PASS (2026-08-20). Committed to lean/research-ledger.json as the human record
  // and NOT to this array, which is the copy the filesystem-less edge actually serves — so the hosted surface would
  // have answered with fourteen findings the record already held. Restored here field for field; the test that names
  // the exact divergence is what caught it.
  { claim: 'Interleaving effect size, overall', value: '0.42 (95% CI 0.34-0.50), k=238, I2=77.3%', units: 'Hedges g',
    source: 'Brunmair & Richter 2019, Psychological Bulletin 145(11):1029, doi 10.1037/bul0000209',
    status: 'read', kind: 'measured', note: 'Trim-and-fill corrects to 0.29 (0.20-0.38) with 23 studies estimated missing. Use 0.29 as the planning number, not 0.42.' },
  { claim: 'Interleaving HARMS word learning', value: '-0.39 (95% CI -0.64 to -0.14), k=13', units: 'Hedges g',
    source: 'Brunmair & Richter 2019, Table 2',
    status: 'read', kind: 'measured', note: 'REFUTES the popular claim that interleaving is a general-purpose booster. Range across materials: -0.39 (words, blocking wins) to +0.67 (paintings); expository text is a null at 0.21, p=.119.' },
  { claim: 'Interleaving is a DISCRIMINATION intervention, not a spacing one', value: '0.73 immediate succession vs 0.22 when temporally spaced', units: 'Hedges g',
    source: 'Brunmair & Richter 2019, Results; corroborated by Birnbaum et al. 2013, Memory & Cognition 41:392',
    status: 'read', kind: 'measured', note: 'Spacing REMOVES the benefit. It requires confusable categories to act on.' },
  { claim: 'Interleaving works WORSE on unfamiliar material', value: 'familiarity moderator b = +0.20', units: 'regression coefficient',
    source: 'Brunmair & Richter 2019, Table 3 Model 3',
    status: 'read', kind: 'measured', note: 'Cuts directly against using interleaving for brand-new content. Converges with Hwang 2024 (Language Learning 75(1):5) and Rohrer 2020 caveat 3: BLOCK FIRST, THEN INTERLEAVE.' },
  { claim: 'Classroom interleaving, preregistered cluster RCT', value: '61% vs 38% at one month, d = 0.83 (0.68-0.97), 54 classes', units: 'Cohen d',
    source: 'Rohrer, Dedrick, Hartwig & Cheung 2020, J Educational Psychology 112(1):40, doi 10.1037/edu0000367',
    status: 'read', kind: 'measured', note: 'Authors attribute it to BUNDLING three strategies, so it is not a clean estimate of discriminative contrast. Their own caveats: interleaved assignments take more time (never measured in any study), may need prior blocked practice, and may require corrective feedback.' },
  { claim: 'The 85% rule does NOT apply to curriculum design', value: 'optimum is 85% under Gaussian noise, 82% Laplacian, 75% Cauchy', units: 'percent',
    source: 'Wilson, Shenhav, Straccia & Cohen 2019, Nature Communications 10:4646',
    status: 'read', kind: 'measured', note: 'REFUTED as commonly cited. Binary classification by gradient-descent learners; the number is an artifact of the noise assumption; NO human experiment in the paper; authors call it a first step and disclaim the extension.' },
  { claim: 'Desirable difficulty has no quantified optimum', value: 'none exists', units: 'none',
    source: 'Bjork & Bjork 2020, J Applied Research in Memory and Cognition 9(4)',
    status: 'read', kind: 'measured', note: 'The Bjorks THEMSELVES call for identifying desirable difficulties PROSPECTIVELY. As stated, desirable-vs-undesirable is diagnosed after the fact by whether learning improved.' },
  { claim: 'Cognitive load theory is near-unfalsifiable as commonly applied', value: 'every outcome fits post-hoc', units: 'none',
    source: 'de Jong 2010, Instructional Science 38(2):105',
    status: 'read', kind: 'measured', note: 'Better performance is attributed to germane load, worse to extraneous, so the theory accommodates any result. Also lacks an independent measure of load. This is the SAME defect this ledger encodes as vacuity: a theory no outcome can refute.' },
  { claim: 'Expanding intervals do NOT beat fixed intervals', value: 'g = 0.034, 95% CI [-0.10, 0.17], I2 = 0%', units: 'Hedges g',
    source: 'Latimier, Peyre & Ramus 2021, Educational Psychology Review 33:959, Subset 2; corroborated by Cepeda et al. 2006 Table 8 (t(42)=0.5, p=.61)',
    status: 'read', kind: 'measured', note: 'REFUTES the core scheduling premise of SuperMemo/Anki-style systems. Not a noisy null — a TIGHT null with zero heterogeneity, and retention interval does not moderate it. Cepeda 2006 states the expanding-interval idea spread with little apparent empirical backing.' },
  { claim: 'Retrieval practice vs OTHER ACTIVE strategies is not significant', value: 'g = 0.095, 95% CI [-0.005, 0.194], p = .062, k = 41', units: 'Hedges g',
    source: 'Yang, Luo, Vadillo, Yu & Shanks 2021, Psychological Bulletin 147(4):399, Table 2 control-strategy moderator, Q_B = 153, p < .001',
    status: 'read', kind: 'measured', note: 'THE NUMBER IS RIGHT AND ITS FIRST PROVENANCE WAS NOT. It was supplied fabricated with a read label, retracted by the researcher unprompted, then genuinely verified from Table 2. Recorded with that history because the outcome was luck and the process was not: quizzing beats doing nothing at 0.610, beats restudy at 0.330, and is NOT distinguishable from concept mapping, note-taking or summarising. Also verified in the same pass, correcting an earlier claim of mine: school level is NOT a significant moderator, Q_B = 6.848, p = .144.' },
  { claim: 'Retrieval practice without feedback on material not yet retrievable does nothing', value: 'g = 0.03, 95% CI [-0.21, 0.27], p = .79', units: 'Hedges g',
    source: 'Rowland 2014, Psychological Bulletin 140(6):1432, no-feedback studies partitioned by initial retrieval success',
    status: 'read', kind: 'measured', note: 'At 50% or lower initial success WITHOUT feedback the effect vanishes. The sharpest boundary condition in the literature: it constrains where in a sequence quizzing can be placed at all.' },
  { claim: 'Retrieval-practice TRANSFER, bias-corrected', value: 'd = 0.40 [0.31, 0.50]; untested materials 0.16 [-0.10, 0.43]; at neither moderator d = -0.053 [-0.22, 0.12]', units: 'Cohen d',
    source: 'Pan & Rickard 2018, Psychological Bulletin 144(7):710',
    status: 'read', kind: 'measured', note: 'VERIFIED from primary text: the direct testing effect in the same dataset is 0.68, well above the 0.40 transfer estimate, and at the extreme of no response congruency and no elaborated retrieval transfer is NEGATIVE. Corrections to an earlier draft: problem-solving k is 17 not 18, and the neither-moderator figure is -0.053, not the 0.21 first cited. Worked examples d = 0.045 remains UNVERIFIED — the direction is supported, the value is not.' },
  { claim: 'The optimal study gap is NOT a fixed percentage of the retention interval', value: 'declines from ~43% at a 7-day delay to ~8% at 350 days', units: 'ratio',
    source: 'Cepeda, Vul, Rohrer, Wixted & Pashler 2008, Psychological Science 19(11):1095',
    status: 'read', kind: 'measured', note: 'REFUTES the 10-20% rule circulating in ed-tech. The authors state the optimal gap is not some absolute quantity that can be recommended. Estimated from 32 obscure trivia facts on a coarse grid with no CI on the optimum location. The supported directional claim is ASYMMETRY: erring long is cheap, erring short is expensive.' },
  { claim: 'Cepeda et al. 2006 reports NO Cohen d for spacing', value: '47.3% vs 36.7% correct (10.6 percentage points)', units: 'percentage points',
    source: 'Cepeda, Pashler, Vul, Wixted & Rohrer 2006, Psychological Bulletin 132(3):354, Discussion/Limitations',
    status: 'read', kind: 'measured', note: 'Any citation of Cepeda 2006 d = 0.4 is a FABRICATED ATTRIBUTION. They used change-in-accuracy because the variance data needed for an effect size were absent from most published results.' },
]

export const STATUSES: readonly Status[] = ['read', 'secondary', 'unread', 'refuted'] as const
export const KINDS: readonly Kind[] = ['convention', 'measured'] as const

/** What a finding may be sealed AS. The three answers are the whole doctrine: an unread source seals NOTHING, a
 *  measurement seals only as an integer BRACKET, and only a convention whose defining source was read seals as an
 *  EQUALITY. Derived from the two predicates above rather than restated, so there is one rule. */
export type Seal = 'EQUALITY' | 'BRACKET' | 'NOTHING'
export const sealableAs = (f: Finding): Seal => (!anchors(f) ? 'NOTHING' : sealableAsEquality(f) ? 'EQUALITY' : 'BRACKET')

/** Why, in the caller's terms — so a refusal is a diagnosis and not a verdict handed down. */
export const sealReason = (f: Finding): string =>
  sealableAs(f) === 'EQUALITY'
    ? 'exact by definition AND its defining source was read — it may seal as an equality'
    : sealableAs(f) === 'BRACKET'
      ? 'read at the primary source, but MEASURED — it may anchor a theorem only as an integer bracket'
      : `not read (${f.status}) — it may not anchor a theorem at all until the primary source is retrieved or it is marked refuted`

export interface JudgedFinding extends Finding {
  address: string
  anchorsTheorem: boolean
  sealableAs: Seal
  why: string
}
export const judge = (f: Finding): JudgedFinding =>
  ({ ...f, address: findingAddress(f), anchorsTheorem: anchors(f), sealableAs: sealableAs(f), why: sealReason(f) })

export interface LedgerReport {
  filter: { status: Status | null; kind: Kind | null }
  total: number                                  // findings in the whole ledger, before the filter
  matched: number
  census: Record<Status, number>                 // over the WHOLE ledger — a filter must never shrink the census
  kinds: Record<Kind, number>
  anchoring: { canAnchor: number; cannotAnchor: number; sealsAsEquality: number; sealsAsBracket: number }
  findings: JudgedFinding[]
  gaps: { what: string; fix: string }[]          // the ledger's objections to ITSELF, over the whole ledger
  receipt: string                                // order-invariant over every finding address — the ledger's identity
  honest: string
}

const HONEST_LEDGER =
  'The research ledger reports how well each finding was VERIFIED. `read` means the primary ' +
  'source was retrieved and the figure taken from its own text; `secondary` means a citing work reported it; `unread` ' +
  'means believed and unchecked. Only a `read` finding may anchor a theorem, and only a `read` CONVENTION may seal as ' +
  'an EQUALITY — a measurement gets an integer bracket or nothing. UNREAD is never "false", only not-yet-checked. ' +
  'Integrity — the record recomputes for anyone.'

/** THE ONE REPORT BOTH SURFACES SERVE — the stdio server and the hosted Workers edge call this same function, so a
 *  divergence between them can only be a description. Filters are optional and validated; an
 *  unknown status or kind is REFUSED by name rather than silently matching nothing. */
export function ledgerReport(opts: { status?: unknown; kind?: unknown } = {}, fs: readonly Finding[] = FINDINGS): LedgerReport {
  const status = opts.status === undefined || opts.status === null ? null : String(opts.status) as Status
  const kind = opts.kind === undefined || opts.kind === null ? null : String(opts.kind) as Kind
  if (status !== null && !STATUSES.includes(status))
    throw new Error(`uuidna_research_ledger: unknown status "${String(opts.status)}" — expected one of ${STATUSES.join(', ')} (nothing was computed)`)
  if (kind !== null && !KINDS.includes(kind))
    throw new Error(`uuidna_research_ledger: unknown kind "${String(opts.kind)}" — expected one of ${KINDS.join(', ')} (nothing was computed)`)

  const judged = fs.map(judge)
  const matched = judged.filter((f) => (status === null || f.status === status) && (kind === null || f.kind === kind))
  const kinds: Record<Kind, number> = { convention: 0, measured: 0 }
  for (const f of fs) kinds[f.kind]++
  return {
    filter: { status, kind },
    total: fs.length,
    matched: matched.length,
    census: census(fs),
    kinds,
    anchoring: {
      canAnchor: judged.filter((f) => f.anchorsTheorem).length,
      cannotAnchor: judged.filter((f) => !f.anchorsTheorem).length,
      sealsAsEquality: judged.filter((f) => f.sealableAs === 'EQUALITY').length,
      sealsAsBracket: judged.filter((f) => f.sealableAs === 'BRACKET').length,
    },
    findings: matched,
    gaps: researchGaps(fs),
    receipt: merkleGravity(judged.map((f) => f.address)),
    honest: HONEST_LEDGER,
  }
}
