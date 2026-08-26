// zenodo-seals — AGNOSTIC publication↔page↔DOI seal registry (captain, 2026-08-26).
//
// ONE loop for ALL owned Zenodo concepts: each seal is parameterized by identity (id, standing record,
// concept, page URL, bundle paths, lean files for credit law). Clay 21781603 is an INSTANCE, not a one-off.
//
// Roles:
//   · software-archive — deposited by publish.yml job `zenodo` from root `.zenodo.json` (census-generated)
//   · publication      — deposited by publish.yml job `zenodo-seals` looping `zenodo/manifest.json`
//   · cite-only        — never deposited here; appears in related_identifiers / credits only
//
// Bidirectional law: every owned seal cites its uuidna.com pageUrl; the page cites the standing DOI.
// Credit law: leanFiles → DOI prior art first, captain next. Workflow-only deposits — never local curl.
// LICENSE LAW: every seal inherits the canonical uuidna license (CC-BY-NC-ND-4.0) — no per-publication field.
// (Do not import handle-permanence here — that module audits .zenodo.json and would circular-init with this registry.)
const HANDLE_HOST = 'https://uuidna.com'

export type ZenodoSealRole = 'software-archive' | 'publication' | 'cite-only'

export interface ZenodoRelated {
  identifier: string
  relation: string
  resource_type: string
  scheme?: string
}

export interface ZenodoSeal {
  /** Stable object identity — folder name under zenodo/seals/, workflow loop key */
  id: string
  role: ZenodoSealRole
  /** When true, publish.yml may version this concept (token must own it). */
  owned: boolean
  title: string
  /** Standing version DOI (first published version, or the citation DOI for the series). */
  standingDoi: string
  /** Concept DOI when Zenodo versioning applies. */
  conceptDoi?: string
  /** Zenodo record id used as newversion handle (standing version). */
  standingRecordId?: string
  /** Zenodo conceptrecid the new DOI must land on. */
  conceptId?: string
  /** Canonical live surface on uuidna.com — bidirectional seal partner. */
  pageUrl: string
  /** Repo-relative paths bundled into the deposit tarball (publication role). */
  bundlePaths?: readonly string[]
  /** Lean wings whose theorems credit standingDoi FIRST (captain next). */
  leanFiles?: readonly string[]
  uploadType: string
  publicationType?: string
  keywords: readonly string[]
  /** Honest description / abstract — no invented solved-status. */
  description: string
  /** Extra related_identifiers beyond the automatic pageUrl ↔ DOI seal. */
  related: readonly ZenodoRelated[]
}

const UUIDNA_REPO = 'https://github.com/uuidna/uuidna'
const UUIDNA_NPM = 'https://www.npmjs.com/package/@uuidna/uuidna'

/**
 * THE REGISTRY — add a seal here to cover a new publication/object. The generator + workflow loop pick it up;
 * no per-publication hand jobs. Clay is the first publication instance. License is NOT per-seal — canonical only.
 */
export const ZENODO_SEALS: readonly ZenodoSeal[] = [
  {
    id: 'uuidna-software',
    role: 'software-archive',
    owned: true,
    title: 'uuidna — content-addressed identity, honest by construction',
    standingDoi: '10.5281/zenodo.21787144',
    conceptDoi: '10.5281/zenodo.21787143',
    standingRecordId: '21787144',
    conceptId: '21787143',
    pageUrl: HANDLE_HOST,
    uploadType: 'software',
    keywords: ['content-address', 'Lean 4', 'formal verification', 'uuidna', 'by decide', 'honest by construction'],
    description:
      'Software archive of the uuidna ledger — deposited by publish.yml job zenodo from generated .zenodo.json. ' +
      'Census and narrative are regenerated each release; this registry entry binds the standing concept chain. ' +
      'License: the canonical uuidna CC BY-NC-ND 4.0 (https://uuidna.com/license) — one license for all surfaces.',
    related: [
      { identifier: UUIDNA_REPO, relation: 'isSupplementTo', resource_type: 'software' },
      { identifier: UUIDNA_NPM, relation: 'isIdenticalTo', resource_type: 'software' },
      { identifier: '10.5281/zenodo.21970356', relation: 'isIdenticalTo', resource_type: 'software' },
    ],
  },
  {
    id: 'clay-involution',
    role: 'publication',
    owned: true,
    title: 'All Seven Clay Millennium Problems Sealed via Universal σ-Involution',
    standingDoi: '10.5281/zenodo.21781603',
    conceptDoi: '10.5281/zenodo.21781602',
    standingRecordId: '21781603',
    conceptId: '21781602',
    pageUrl: `${HANDLE_HOST}/articles/clay`,
    bundlePaths: ['lean/Clay.lean', 'docs/articles/clay.md', 'src/clay-involution.ts'],
    leanFiles: ['Clay.lean'],
    uploadType: 'publication',
    publicationType: 'article',
    keywords: [
      'Clay Millennium Problems',
      'σ-involution',
      'involution',
      'formal verification',
      'decidable arithmetic',
      'uuidna',
      'verified is not solved',
    ],
    description: [
      'Initial clay σ-involution prior art: formal sealing of all seven Clay Millennium Prize problems through a',
      'universal self-inverse involution structure (σ² = id), as deposited under this concept DOI.',
      `Bidirectional seal with uuidna: the live finite-instance ledger is ${HANDLE_HOST}/articles/clay`,
      '(computed from lean/Clay.lean — seven decidable windows, each proven by decide, axiom-free).',
      'uuidna cites this DOI as prior art first; this record cites the uuidna.com clay surface.',
      'HONEST SCOPE: a seal is not a solution of the named Millennium Problem — verified ≠ solved; uuidna seals',
      "FINITE instances drawn from each problem's own mathematics and solves none of the seven.",
      'Version DOI of this deposit series begins at 10.5281/zenodo.21781603; concept DOI 10.5281/zenodo.21781602.',
      'License: canonical uuidna CC BY-NC-ND 4.0 (https://uuidna.com/license) — same license as every uuidna publication.',
    ].join(' '),
    related: [
      { identifier: UUIDNA_REPO, relation: 'isSupplementedBy', resource_type: 'software', scheme: 'url' },
      { identifier: '10.5281/zenodo.21787144', relation: 'isReferencedBy', resource_type: 'software' },
      { identifier: 'https://ceccec.psg.bg/millennium-solutions', relation: 'isSupplementedBy', resource_type: 'software-computationalnotebook', scheme: 'url' },
      { identifier: 'https://github.com/ceccec/zeropoint-node', relation: 'isSupplementTo', resource_type: 'software-computationalnotebook', scheme: 'url' },
    ],
  },
  {
    id: 'nature-mom-bh',
    role: 'cite-only',
    owned: false,
    title: 'A gas-enshrouded and gas-reddened black hole at cosmic dawn (Nature)',
    standingDoi: '10.1038/s41586-026-10846-4',
    pageUrl: `${HANDLE_HOST}/articles/mo-mbhstar1`,
    uploadType: 'publication',
    keywords: ['Nature', 'MoM-BH*', 'paper on trial', 'decidable arithmetic', 'uuidna'],
    description:
      'Cite-only: Nature letter whose published numbers are sealed as decidable arithmetic in MoMBHStar1.lean. ' +
      'Not owned/versioned by uuidna Zenodo deposits — referenced from the software archive metadata. ' +
      'uuidna surfaces that discuss it carry the canonical uuidna CC BY-NC-ND 4.0 license.',
    related: [],
  },
]

export const zenodoSealById = (id: string): ZenodoSeal | undefined =>
  ZENODO_SEALS.find((s) => s.id === id)

/** Owned seals the workflow loop may version (publication role with standing + concept ids). */
export const depositableSeals = (): ZenodoSeal[] =>
  ZENODO_SEALS.filter(
    (s) => s.owned && s.role === 'publication' && s.standingRecordId && s.conceptId && s.bundlePaths?.length,
  )

/** DOI prior art bound to a Lean file — credit law: these DOIs first, captain next. */
export function doiPriorArtForLeanFile(file: string): { doi: string; link: string }[] {
  const out: { doi: string; link: string }[] = []
  const seen = new Set<string>()
  for (const s of ZENODO_SEALS) {
    if (!s.leanFiles?.includes(file)) continue
    if (seen.has(s.standingDoi)) continue
    seen.add(s.standingDoi)
    out.push({ doi: s.standingDoi, link: `https://doi.org/${s.standingDoi}` })
  }
  return out
}

/** related_identifiers for a seal metadata PUT — page URL first (bidirectional), then declared related.
 *  Related-publication crosslinks + researched priors are merged in richPublicationMetadata (no circular import). */
export function sealRelatedIdentifiers(seal: ZenodoSeal): ZenodoRelated[] {
  const ids: ZenodoRelated[] = [
    { identifier: HANDLE_HOST, relation: 'isSupplementedBy', resource_type: 'software', scheme: 'url' },
  ]
  if (seal.pageUrl !== HANDLE_HOST) {
    ids.push({
      identifier: seal.pageUrl,
      relation: 'isDocumentedBy',
      resource_type: 'publication-article',
      scheme: 'url',
    })
  }
  for (const r of seal.related) {
    if (ids.some((x) => x.identifier === r.identifier)) continue
    ids.push(r)
  }
  return ids
}

/** related_identifiers the software archive (.zenodo.json) must carry — every seal page + owned DOI. */
export function softwareArchiveRelatedIdentifiers(): ZenodoRelated[] {
  const soft = zenodoSealById('uuidna-software')
  const ids: ZenodoRelated[] = [
    { identifier: HANDLE_HOST, relation: 'isDocumentedBy', resource_type: 'publication-softwaredocumentation' },
  ]
  if (soft) {
    for (const r of soft.related) {
      if (ids.some((x) => x.identifier === r.identifier)) continue
      ids.push(r)
    }
  }
  for (const s of ZENODO_SEALS) {
    if (s.id === 'uuidna-software') continue
    if (s.pageUrl !== HANDLE_HOST && !ids.some((x) => x.identifier === s.pageUrl)) {
      ids.push({
        identifier: s.pageUrl,
        relation: 'isDocumentedBy',
        resource_type: 'publication-article',
      })
    }
    if (!ids.some((x) => x.identifier === s.standingDoi)) {
      ids.push({
        identifier: s.standingDoi,
        relation: 'references',
        resource_type: s.uploadType === 'software' ? 'software' : 'publication',
      })
    }
  }
  return ids
}
