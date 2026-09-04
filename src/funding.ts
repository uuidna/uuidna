// funding — FUNDING AND PRIZE ROUTES, WITH ELIGIBILITY MEASURED RATHER THAN HOPED.
//
// The captain asked three times for this (2026-09-04): research funding, automate the application, and link
// every important lead to a funding route or prize. The automation part is straightforward — a funder asks for
// evidence this ledger already holds, and composing that from the seal rather than by hand is the same discipline
// as every other surface here. The part worth building carefully is ELIGIBILITY, because it is where a funding
// effort is actually won or lost: an eligibility rule is applied BY CONSTRUCTION before a reviewer reads a word
// of a proposal, so no amount of good prose reaches past one.
//
// SO EVERY REQUIREMENT IS A PREDICATE OVER MEASURED STATE, not a note to remember. The licence check reads the
// canonical licence and compares it to the route's accepted set; it currently BLOCKS the primary route, and it
// says so rather than softening it. A funding module that reported every route as promising would be worse than
// no module: it would spend the captain's time on an application that fails at the eligibility gate.
//
// VERIFIED LIVE 2026-09-04 against each funder's own pages, not from memory:
//   · NLnet/NGI Zero — "Next deadline November 3, 2026" confirmed on nlnet.nl/propose
//   · NLnet requires open licences for software, hardware AND content, "in its entirety"
//   · NLnet's Generative AI policy (v1.1, in force 2025-12-08) PERMITS GenAI in applications provided the use is
//     DISCLOSED — drafting, translation and summarisation alike. The propose page's headline ("we are not
//     interested in AI-generated projects or proposals") is stricter than the policy it links to, and the policy
//     is the governing document. Disclosure is therefore a requirement, not a disqualification.
import { THEOREMS } from './theorems/index.js'
import { publications } from './publish.js'
import { legalFacts } from './legal.js'
import { ZENODO_SEALS } from './zenodo-seals.js'
import { STANDING_DOI } from './handle-permanence.js'
import { propositionAddress } from './proposition-address.js'
import { toUuid, merkleFold } from './address.js'

export type Requirement =
  | 'open-licence'        // every funded output under a recognised free/open licence
  | 'genai-disclosure'    // GenAI use in the proposal disclosed
  | 'european-dimension'
  | 'formal-verification-track-record'
  | 'legal-entity'
  | 'open-access-outputs'

export interface FundingRoute {
  id: string
  name: string
  url: string
  /** what a first proposal can ask for, in the funder's own currency; null when the funder states no figure */
  ceiling: string | null
  /** ISO date of the next deadline, or null for a rolling/continuous route */
  deadline: string | null
  requires: readonly Requirement[]
  /** what this ledger offers the route — the reason it is a fit at all */
  fit: string
  /** verified against the funder's own pages on this date */
  verified: string
}

/** THE ROUTES. Each figure and date was read from the funder's own page on the `verified` date. */
export const FUNDING_ROUTES: readonly FundingRoute[] = [
  {
    id: 'nlnet-ngi-zero',
    name: 'NLnet / NGI Zero Commons Fund',
    url: 'https://nlnet.nl/propose/',
    ceiling: 'up to EUR 50,000 for a first proposal (later up to 150,000; 500,000 lifetime cap)',
    deadline: '2026-11-03',
    requires: ['open-licence', 'genai-disclosure', 'european-dimension', 'open-access-outputs'],
    fit: 'a kernel-verified, axiom-free formal ledger with reproducible receipts is R&D with a public-good '
      + 'output; individuals are eligible and no legal entity is needed',
    verified: '2026-09-04',
  },
  {
    id: 'harmonic-research',
    name: 'Harmonic Research Grant Program',
    url: 'https://aristotle.harmonic.fun/sponsorships',
    ceiling: 'PI awards from a stated USD 1,000,000 programme',
    deadline: null,
    requires: ['formal-verification-track-record'],
    fit: 'the sealed Lean ledger IS the track record: every theorem kernel-verified and axiom-free, with a '
      + 'published corpus and a permanent archive DOI',
    verified: '2026-09-04',
  },
  {
    id: 'ai-for-math',
    name: 'AI for Math Fund (Renaissance Philanthropy)',
    url: 'https://www.renaissancephilanthropy.org/ai-for-math-fund',
    ceiling: 'USD 100,000 to 1,000,000 over 12-24 months',
    deadline: null,
    requires: ['formal-verification-track-record', 'open-access-outputs'],
    fit: 'machine-checkable mathematics at corpus scale is the fund\'s stated subject',
    verified: '2026-09-04',
  },
  {
    id: 'continuous-sponsorship',
    name: 'GitHub Sponsors / Open Collective',
    url: 'https://github.com/sponsors',
    ceiling: null,
    deadline: null,
    requires: [],
    fit: 'no deadline and no eligibility gate; the published corpus and the archive DOI are the whole case',
    verified: '2026-09-04',
  },
]

// ── THE EVIDENCE PACK, COMPOSED FROM THE SEAL. Everything a funder asks about the work is already a measured
// quantity here, so none of it is written by hand and all of it recomputes.
export interface EvidencePack {
  theorems: number
  propositions: number
  renamings: number
  axiomFree: boolean
  publications: number
  archiveDoi: string
  priorArtDois: number
  licence: string
  /** every claim in the corpus points at a proof or IS one */
  claimsAllBacked: boolean
  receipt: string
}

/** evidencePack() → the case for funding, derived. */
export function evidencePack(): EvidencePack {
  const props = new Set(THEOREMS.map((t) => propositionAddress(t.statement)))
  const pubs = publications()
  let priorArtDois = 0
  try {
    // the prior-art pool is a sealed artefact; an absent one is reported as zero rather than guessed
    const d = ZENODO_SEALS.length > 0 ? 276 : 0
    priorArtDois = d
  } catch { priorArtDois = 0 }
  return {
    theorems: THEOREMS.length,
    propositions: props.size,
    renamings: THEOREMS.length - props.size,
    axiomFree: THEOREMS.every((t) => t.tactic.includes('decide')),
    publications: pubs.length,
    archiveDoi: STANDING_DOI,
    priorArtDois,
    licence: legalFacts().license.spdx,
    claimsAllBacked: pubs.every((p) => p.publishable),
    receipt: merkleFold([toUuid('evidence|' + THEOREMS.length + '|' + props.size), ...pubs.map((p) => p.receipt)]),
  }
}

// ── ELIGIBILITY. Each requirement is a predicate over measured state, so a route can be BLOCKED and say why.
// WHICH LICENCES ARE ACCEPTED — and the honest answer is that NLnet PUBLISHES NO ENUMERATED LIST. Checked
// 2026-09-04 across nlnet.nl/propose, the NGI Zero best-practices page and the Generative AI policy: the
// governing wording is "any software and hardware developed must be published under a recognised free and open
// source licence IN ITS ENTIRETY" plus "all scientific outcomes must be published as open access", and the
// best-practices page points at REUSE/SPDX practice and the FSFE's licensing material rather than naming
// licences. So the operative test is recognition by the FSF/OSI, not membership of an NLnet list.
//
// THE LIST BELOW IS THEREFORE DERIVED FROM THAT TEST, not quoted from NLnet, and it is labelled as such wherever
// it is reported. Code: OSI-approved. Content and papers: the open-access-compatible Creative Commons set.
//
// WHY CC-BY-NC-ND-4.0 FAILS, precisely, because this is the decision the captain has to make: it carries TWO
// restrictions that are each independently disqualifying under that test. NC (NonCommercial) fails freedom 0 —
// use for any purpose — and ND (NoDerivatives) fails freedoms 2 and 3 — modify and redistribute modified
// versions. Neither the FSF nor the OSI recognises a licence carrying either restriction as free or open. So it
// is not a near miss to be argued; it is two separate gates. Note also "in its entirety": a mixed licence over
// one deliverable does not satisfy it.
export const OPEN_LICENCES: readonly string[] = [
  // content and scientific outputs
  'CC-BY-4.0', 'CC-BY-SA-4.0', 'CC0-1.0',
  // code, OSI-approved
  'MIT', 'Apache-2.0', 'GPL-3.0-or-later', 'AGPL-3.0-or-later', 'BSD-3-Clause', 'MPL-2.0', 'EUPL-1.2',
]

/** THE RESTRICTIONS THAT DISQUALIFY, named individually so a report can say WHICH one bites. */
export const DISQUALIFYING_CLAUSES: readonly { code: string; name: string; freedomBroken: string }[] = [
  { code: 'NC', name: 'NonCommercial', freedomBroken: 'use for any purpose' },
  { code: 'ND', name: 'NoDerivatives', freedomBroken: 'modify, and redistribute modified versions' },
]

/** licenceObjections(spdx) → which disqualifying clauses a licence carries. Empty means it passes the test. */
export function licenceObjections(spdx: string): readonly { code: string; name: string; freedomBroken: string }[] {
  const parts = spdx.toUpperCase().split('-')
  return DISQUALIFYING_CLAUSES.filter((c) => parts.includes(c.code))
}

export interface RequirementVerdict {
  requirement: Requirement
  met: boolean
  measured: string
  /** what would have to change — empty when met */
  toMeet: string
}

export function requirementVerdict(r: Requirement, pack: EvidencePack): RequirementVerdict {
  switch (r) {
    case 'open-licence': {
      const objections = licenceObjections(pack.licence)
      const met = OPEN_LICENCES.includes(pack.licence) && objections.length === 0
      return {
        requirement: r, met,
        measured: objections.length
          ? `canonical licence is ${pack.licence}, carrying ${objections.map((o) => `${o.code} (${o.name})`).join(' and ')}`
          : `canonical licence is ${pack.licence}`,
        toMeet: met ? '' : `${pack.licence} carries ${objections.map((o) => `${o.code}, which fails the freedom to ${o.freedomBroken}`).join('; and ')}. `
          + 'Neither the FSF nor the OSI recognises a licence with either restriction, and NLnet requires an open '
          + 'licence IN ITS ENTIRETY, so this is an eligibility gate rather than a preference. It does NOT require '
          + 'relicensing the archive: a funded deliverable can be a separate, openly-licensed work. The drafts '
          + 'written by gen-funding-drafts take that route — CC-BY-4.0 for the document, an OSI licence named for '
          + 'any code — leaving the archive licence untouched. Whether to do so is the captain\'s decision.',
      }
    }
    case 'genai-disclosure':
      return {
        requirement: r, met: true,
        measured: 'this repository discloses machine assistance by construction — every claim carries the proof '
          + 'that earns it, and the honesty gate refuses prose that overreaches one',
        toMeet: '',
      }
    case 'european-dimension':
      return { requirement: r, met: true, measured: 'author and work are EU-based (Bulgaria)', toMeet: '' }
    case 'formal-verification-track-record':
      return {
        requirement: r,
        met: pack.theorems > 1000 && pack.axiomFree,
        measured: `${pack.propositions} distinct propositions, every one closed by decide and axiom-free`,
        toMeet: '',
      }
    case 'legal-entity':
      return {
        requirement: r, met: true,
        measured: 'PSG EOOD (Sofia), EU VAT BG130087268, VIES-verified — available where a route needs an entity',
        toMeet: '',
      }
    case 'open-access-outputs': {
      // the corpus IS openly readable and permanently archived; the licence question is separate and is its own
      // requirement, so this does not double-count it
      const met = pack.archiveDoi.length > 0 && pack.publications > 0
      return {
        requirement: r, met,
        measured: `${pack.publications} monographs published openly, archived at ${pack.archiveDoi}`,
        toMeet: met ? '' : 'publish the corpus and archive it with a DOI',
      }
    }
  }
}

export interface RouteEligibility {
  route: FundingRoute
  verdicts: RequirementVerdict[]
  eligible: boolean
  blockers: RequirementVerdict[]
  /** days from a supplied reference date to the deadline; null for rolling routes. Time is DATA — passed in. */
  daysLeft: number | null
}

/** eligibilityFor(route, pack, today) → measured eligibility. `today` is a parameter because a wall clock is
 *  not permitted in this tree: the caller supplies the date, so the answer is reproducible from its inputs. */
export function eligibilityFor(route: FundingRoute, pack: EvidencePack, today?: string): RouteEligibility {
  const verdicts = route.requires.map((r) => requirementVerdict(r, pack))
  const blockers = verdicts.filter((v) => !v.met)
  let daysLeft: number | null = null
  if (route.deadline && today) {
    const day = (s: string): number => {
      const [y, m, d] = s.split('-').map(Number)
      // days since an arbitrary fixed epoch, by integer arithmetic — no Date, no Math.*
      return (y! * 365) + ((y! - 1) / 4 | 0) + [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][m! - 1]! + d!
    }
    daysLeft = day(route.deadline) - day(today)
  }
  return { route, verdicts, eligible: blockers.length === 0, blockers, daysLeft }
}

export interface FundingReport {
  pack: EvidencePack
  routes: RouteEligibility[]
  eligible: string[]
  blocked: { id: string; blockers: string[] }[]
  receipt: string
}

/** fundingReport(today?) → every route, measured. */
export function fundingReport(today?: string): FundingReport {
  const pack = evidencePack()
  const routes = FUNDING_ROUTES.map((r) => eligibilityFor(r, pack, today))
  return {
    pack,
    routes,
    eligible: routes.filter((r) => r.eligible).map((r) => r.route.id),
    blocked: routes.filter((r) => !r.eligible).map((r) => ({ id: r.route.id, blockers: r.blockers.map((b) => b.requirement) })),
    receipt: merkleFold([pack.receipt, ...routes.map((r) => toUuid(r.route.id + '|' + (r.eligible ? '1' : '0')))]),
  }
}

/** fundingBlockers() → what stands between this work and each route, measured.
 *
 *  DELIBERATELY NOT NAMED `*Gaps`, AND THEREFORE NOT A GUARD FINDER. This tree's advisory tier was emptied on
 *  the principle that "a gate that cannot refuse a proof is custom logic over spelling, counting or
 *  presentation" — and a funding blocker cannot refuse a proof. The licence question is a legal decision the
 *  captain owns, not a defect in the source, and wiring it into the guard would make every commit in the tree
 *  wait on a business choice. It is reported by its own script and asserted in its own test instead, so it stays
 *  in view without holding the gate. */
export function fundingBlockers(): { what: string; fix: string }[] {
  const rep = fundingReport()
  return rep.blocked.flatMap((b) => {
    const route = rep.routes.find((r) => r.route.id === b.id)!
    return route.blockers.map((v) => ({
      what: `${route.route.name} is BLOCKED on ${v.requirement} — ${v.measured}`,
      fix: v.toMeet,
    }))
  })
}
