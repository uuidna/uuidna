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
//             seal as an integer BRACKET, never by taking a division. Confusing the two is how a rounded figure
//             becomes an asserted constant.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'

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
}

/** Only a READ primary source anchors a theorem. Everything else is provisional, and saying so is the point. */
export const anchors = (f: Finding): boolean => f.status === 'read'

/** A measured quantity may not be sealed as an equality — it gets a bracket or it gets nothing. */
export const sealableAsEquality = (f: Finding): boolean => f.kind === 'convention' && f.status === 'read'

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
      fix: 'a convention seals as an EQUALITY, so its definition must come from the standard itself, not a citing work',
    })
  }
  // GROUPED BY THE QUANTITY, NOT BY THE ADDRESS. This branch was unreachable when it grouped on findingAddress:
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
]

export const STATUSES: readonly Status[] = ['read', 'secondary', 'unread', 'refuted'] as const
export const KINDS: readonly Kind[] = ['convention', 'measured'] as const

/** What a finding may be sealed AS. The three answers are the whole doctrine: an unread source seals NOTHING, a
 *  measurement seals only as an integer BRACKET, and only a convention whose defining source was read seals as an
 *  EQUALITY. Derived from the two predicates above rather than restated, so there is one rule, not three. */
export type Seal = 'EQUALITY' | 'BRACKET' | 'NOTHING'
export const sealableAs = (f: Finding): Seal => (!anchors(f) ? 'NOTHING' : sealableAsEquality(f) ? 'EQUALITY' : 'BRACKET')

/** Why, in the caller's terms — so a refusal is a diagnosis and not a verdict handed down. */
export const sealReason = (f: Finding): string =>
  sealableAs(f) === 'EQUALITY'
    ? 'exact by definition AND its defining source was read — it may seal as an equality'
    : sealableAs(f) === 'BRACKET'
      ? 'read at the primary source, but MEASURED — it may anchor a theorem only as an integer bracket, never by taking a division'
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
  'The research ledger reports how well each finding was VERIFIED, not whether it is true. `read` means the primary ' +
  'source was retrieved and the figure taken from its own text; `secondary` means a citing work reported it; `unread` ' +
  'means believed and unchecked. Only a `read` finding may anchor a theorem, and only a `read` CONVENTION may seal as ' +
  'an EQUALITY — a measurement gets an integer bracket or nothing. UNREAD is never "false", only not-yet-checked. ' +
  'Integrity, not truth.'

/** THE ONE REPORT BOTH SURFACES SERVE — the stdio server and the hosted Workers edge call this same function, so a
 *  divergence between them can only be a description, never an answer. Filters are optional and validated; an
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
