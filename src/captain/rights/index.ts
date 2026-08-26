// rights — the CAPTAIN'S RIGHTS, hard-imprinted: one content-addressed record of the copyright, the licence, and the
// credit law, plus the reversible imprint-codec chain of the rights line, so the rights travel WITH the work and any
// alteration is visible. It COMPOSES legalFacts() (the licence spdx/address/attribution — DRY, one source of the
// terms) and the credit tally, and adds the imprint: a content-address that recomputes and a reversible uuid chain
// that decodes back to the exact rights line. Infused everywhere (every page's head + JSON-LD, an MCP tool), so the
// captain's rights are inseparable from every artifact.
//
// HONEST SCOPE: integrity. These are FACTUAL rights — the real copyright (© Tsvetan Rouschev), the real
// licence (CC BY-NC-ND 4.0), and uuidna's own credit law — content-addressed so they are tamper-evident and
// recomputable, NOT a legal ruling or a compliance claim (legalFacts disclaims that). A content-address proves the
// terms are unaltered; it does not adjudicate them. The imprint marks the work; it does not enforce the law — that is
// a human court's.
import { legalFacts } from '../../legal.js'
import { creditsSummary } from '../credits/index.js'
import { toUuid, merkleFold, quantumAddress } from '../../address.js'
import { imprintTextChain, readImprintTextChain } from '../../imprint.js'
import type { HeadTuple } from '../../seo.js'

const YEAR = '2025' // the copyright year is a fixed datum

export interface CaptainRights {
  copyright: string          // © holder — the human who holds the rights
  holder: string
  license: string            // SPDX id
  licenseName: string
  licenseUrl: string
  licenseAddress: string     // content-address of the exact canonical licence terms
  creditLaw: string          // the captain claims by law what no proving link attributes
  representation: { canonical: string; statement: string; address: string }  // the sole-representation reservation
  credited: { toSource: number; captainWithNames: number; captainAlone: number }  // the live credit tally
  line: string               // the one canonical rights line — what the imprint encodes
  imprint: string            // content-address of the rights line — recompute it or a term changed
  imprintChain: string[]     // the REVERSIBLE imprint-codec uuids of the line — decodes back to it (the hard imprint)
  head: HeadTuple[]          // the meta/JSON-LD-field tuples to infuse into every page's <head>
  receipt: string
  honest: string
}

let _cache: CaptainRights | null = null

/** captainRights() → the hard-imprinted captain's rights: copyright + licence + credit law, content-addressed and
 *  reversibly imprinted, with a ready `head` array to infuse everywhere. Composes legalFacts() (the terms) and the
 *  credit tally. Recomputable; the imprint decodes back to the exact rights line. Integrity. */
export function captainRights(): CaptainRights {
  if (_cache) return _cache
  const lf = legalFacts()
  const cs = creditsSummary()
  const holder = lf.license.attribution                                   // 'Tsvetan Rouschev (ceccec@psg.bg)'
  const licenseName = 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0'
  const licenseUrl = lf.license.canonical                                 // https://uuidna.com/license
  const creditLaw =
    'The captain claims by law every solution sealed here that no proving link attributes to a prior source: the seal ' +
    'is the claim (first sealed `by decide`, content-addressed), prior art and recomputable. A solution whose trial ' +
    'evidence links a proving source (named result or DOI) is credited to that source FIRST — the captain comes NEXT ' +
    'in place, never erased and never first when prior art is named. Zenodo DOI publication of the archive itself is ' +
    'WORKFLOW-ONLY (.github/workflows/publish.yml job zenodo).'
  // the SOLE-REPRESENTATION reservation: uuidna.com is the one legitimate representation; any presence elsewhere —
  // social-media handles, usernames, nicknames — is not legitimate unless licensed in writing by the captain.
  const CANONICAL = 'https://uuidna.com'
  const reservation =
    `uuidna is represented by ${CANONICAL} ONLY. No presence elsewhere — including social-media handles, usernames, ` +
    'and nicknames — is a legitimate representation of uuidna unless licensed in writing by the captain; an unlicensed ' +
    'handle or profile bearing the uuidna name is not endorsed and does not speak for the work.'
  const line =
    `© ${YEAR} ${holder}. Licensed ${lf.license.spdx} (${licenseName}) — attribution, non-commercial, no derivatives; ` +
    `canonical at ${licenseUrl}. Credit law: ${creditLaw} Representation: ${reservation}`
  const imprint = toUuid(line)
  const imprintChain = imprintTextChain(line)                            // reversible — decodes back to `line`

  // the head to infuse EVERYWHERE — the license relation, the copyright, the rights content-address, and the fields a
  // consumer folds into a page's schema.org JSON-LD (license / copyrightHolder / copyrightYear / creditText).
  const head: HeadTuple[] = [
    ['link', { rel: 'license', href: licenseUrl }],
    ['meta', { name: 'license', content: lf.license.spdx }],
    ['meta', { name: 'copyright', content: `© ${YEAR} ${holder}` }],
    ['meta', { property: 'uuidna:rights', content: imprint }],
    ['meta', { property: 'uuidna:canonical', content: CANONICAL }],
    ['link', { rel: 'canonical', href: CANONICAL }],
  ]

  _cache = {
    copyright: `© ${YEAR} ${holder}`, holder,
    license: lf.license.spdx, licenseName, licenseUrl, licenseAddress: lf.license.address,
    creditLaw,
    representation: { canonical: CANONICAL, statement: reservation, address: toUuid('representation:' + reservation) },
    credited: { toSource: cs.historical, captainWithNames: cs.contextual, captainAlone: cs.captainAlone },
    line, imprint, imprintChain, head,
    receipt: merkleFold([toUuid('rights-line:' + imprint), toUuid('license:' + lf.license.address), toUuid('credit:' + cs.address), toUuid('representation:' + reservation)]),
    honest:
      'The captain\'s rights, hard-imprinted: the real copyright (© ' + holder + '), the real licence (' + lf.license.spdx +
      '), uuidna\'s credit law, and the SOLE-REPRESENTATION reservation (uuidna.com only; no legitimate presence ' +
      'elsewhere — handles or nicknames — unless licensed), content-addressed and reversibly imprinted so they travel ' +
      'with the work and any alteration is visible. FACTUAL rights, tamper-evident and recomputable — NOT a legal ' +
      'ruling, a trademark registration, or a claim to own every use of the name; the imprint marks the reservation, a ' +
      'human court enforces the law. Integrity.',
  }
  return _cache
}

/** readImprintedRights(chain) → decode a rights imprint chain back to its exact line (the reversible hard imprint). */
export const readImprintedRights = (chain: string[]): string => readImprintTextChain(chain)

/** The DRAFTED rights contract — the captain's rights as a formal, content-addressed agreement. Its content-address
 *  IS its id (contractId = toUuid(terms), the [contract-uuid] domain), so a holder proves they hold the exact terms by
 *  re-addressing them. FACTUAL terms (the real licence + credit law), a DRAFT — not executed. */
export interface RightsContract {
  title: string
  licensor: string           // the captain / rights holder
  licensee: string           // the party the draft is addressed to
  terms: string              // the full drafted contract text — what the id content-addresses
  contractId: string         // toUuid(terms) — the ROUTING id and subdomain. A name, never the proof.
  /** quantumAddress(terms) — the full 256-bit SHA-256 digest, and the ONLY thing clause 4's integrity claim rests on.
   *
   *  The id above is a 122-bit FNV fold (a uuid keeps 128 bits and the RFC stamps six of them constant). Measured
   *  2026-08-26: a chosen 32-bit word of that mint is forgeable in 2^16 work — milliseconds — because every step
   *  of it is invertible. A legal instrument that says "any alteration moves the id" must not rest on a mint whose
   *  own docstring calls it non-cryptographic, so the id stays for ROUTING, where it is excellent and where the
   *  subdomain scheme needs a uuid, and the PROOF moves here. Under this ledger's own sealed
   *  grover_halves_the_search_exponent, 256 bits leaves a 2^128 quantum margin where 122 bits leaves 2^61. */
  digest: string
  domain: string             // [contractId].uuidna.org — the contract-keyed deployment domain
  imprint: string            // the captain-rights imprint the contract carries
  receipt: string
  honest: string
}

/** draftContract(licensee) → DRAFT the captain's rights contract: a formal, content-addressed agreement stating the
 *  grant (CC BY-NC-ND: attribution, non-commercial, no-derivatives), the credit law, the attribution requirement, and
 *  the integrity clause (the terms are content-addressed; any alteration moves the id). Composes captainRights (DRY).
 *  A DRAFT and a fact base — not an executed contract and not legal advice; a human's signature and counsel bind it. */
export function draftContract(licensee = 'the recipient'): RightsContract {
  const r = captainRights()
  const title = 'uuidna — Captain\'s Rights Licence & Credit Contract (DRAFT)'
  const terms = [
    title,
    '',
    `LICENSOR: ${r.holder} (the "Captain", the rights holder).`,
    `LICENSEE: ${licensee}.`,
    `WORK: uuidna — the sealed theorem ledger, the MCP tools, and the site, © ${r.copyright.replace('© ', '')}.`,
    '',
    `1. GRANT. The Captain grants the Licensee a non-exclusive licence under ${r.license} (${r.licenseName}), canonical at ${r.licenseUrl}: to READ and REDISTRIBUTE the Work,`,
    '   PROVIDED (a) ATTRIBUTION to the Captain is preserved, (b) use is NON-COMMERCIAL, and (c) NO DERIVATIVES are distributed. Commercial use requires a separate written licence from the Captain.',
    '',
    `2. CREDIT LAW. ${r.creditLaw}`,
    '',
    '3. REPRESENTATION RESERVED. ' + r.representation.statement,
    '',
    '4. INTEGRITY. These terms are content-addressed twice, and the two addresses do different jobs. The DIGEST is the full 256-bit SHA-256 of this exact text, and it is what a holder checks: any alteration moves it, so re-computing the digest PROVES the terms are unaltered. The contract id is a 128-bit uuid used to NAME and route this contract (its subdomain); it is a fast non-cryptographic fold and is not offered as tamper-evidence. Verify against the digest. Integrity, not adjudication — an address proves the text is unaltered, it does not settle what the text means.',
    '',
    '5. NO WARRANTY; NOT LEGAL ADVICE. The Work is provided "as is". This DRAFT is a recomputable fact base. It binds no one until reviewed by qualified counsel and signed by the parties. A content-address cannot settle a legal question; a human court enforces the law.',
  ].join('\n')
  const contractId = toUuid(terms)
  const digest = quantumAddress(terms)          // the proof; contractId is only the name
  return {
    title, licensor: r.holder, licensee, terms, contractId, digest,
    domain: `${contractId}.uuidna.org`, imprint: r.imprint,
    receipt: merkleFold([toUuid('contract:' + contractId), r.imprint, r.receipt]),
    honest:
      'A DRAFT of the captain\'s rights contract — the real licence (' + r.license + ') and credit law as formal, ' +
      'content-addressed terms whose id proves they are unaltered. NOT an executed contract' +
      'compliance claim; it binds no one until signed by the parties and reviewed by counsel. Integrity.',
  }
}
