import { STANDING_DOI } from './handle-permanence.js'
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
    // CORRECTED 2026-09-04, VERIFIED BY RESOLUTION rather than by reading this file. The standing record was
    // declared as 21787144, and 21787144 is titled "Quantum Proofs of the Clay Millennium Problems v1.0" — a
    // different work. uuidna's actual record is 22256708 (creator Rouschev, version 0.3.0), and its own DOI is
    // 10.5281/zenodo.22256708. Every publication's metadata builds its `doi` from this field, so until now the
    // whole corpus pointed at someone else's paper as its archive.
    //
    // NOTHING ON THIS FILESYSTEM COULD SEE IT. Every gate here reads the repository; the fact that contradicted
    // this line lived only in the public record. A peer (millennium-solutions, 2026-09-04) hit the same class in
    // their own tree — a deposit whose corrected repo never reached its permanent record — and their advice was
    // to harvest your own DOI and read it back. Doing that is what found this. The check is now in mint-gate.
    //
    // THE CONCEPT DOI IS LEFT AS IT STANDS AND IS NOT SAFE TO CITE AS OURS: 10.5281/zenodo.21787143 is a Zenodo
    // CONCEPT — a version chain — and it currently chains THREE DISTINCT WORKS (21787144 Clay proofs, 21819217
    // the ℤ/9 Vortex Framework, 22256708 uuidna), because "New version" was used to publish different works.
    // A concept DOI always resolves to the newest version, so citing it for uuidna hands a reader whichever work
    // was published last. Deposit records therefore declare isPartOf the VERSION DOI, which is unambiguously
    // ours. Untangling the chain is a Zenodo-side decision for the captain, not a code change.
    standingDoi: STANDING_DOI,
    conceptDoi: '10.5281/zenodo.21787143',
    standingRecordId: STANDING_DOI.split('.').pop()!,
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
      // CERN OPEN DATA, REFERENCED AS CITED SOURCES — the four CMS primary datasets whose published integers
      // lean/Cern.lean does arithmetic over. `references` is DataCite's relation for "this work uses that one",
      // which is exactly what they are: data, credited. They are NOT prior art, and that is measured rather
      // than assumed — CERN's record DOIs declare resourceTypeGeneral "Dataset", and all 16,241 CERN Open Data
      // records return ZERO hits for formal verification, Lean, kernel-verified proof or axiom-free. Nobody
      // there claims what this ledger claims, so filing them as prior art would imply a precedence that does
      // not exist. All four are CC0-1.0, which is why their integers can be quoted without permission.
      { identifier: '10.7483/OPENDATA.CMS.53FG.V2S9', relation: 'references', resource_type: 'dataset' },
      { identifier: '10.7483/OPENDATA.CMS.RG9B.XJMD', relation: 'references', resource_type: 'dataset' },
      { identifier: '10.7483/OPENDATA.CMS.I8HN.DF32', relation: 'references', resource_type: 'dataset' },
      { identifier: '10.7483/OPENDATA.CMS.0LRL.BXG5', relation: 'references', resource_type: 'dataset' },
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
      'machine-checked proof',
    ],
    description: [
      'Initial clay σ-involution prior art: formal sealing of all seven Clay Millennium Prize problems through a',
      'universal self-inverse involution structure (σ² = id), as deposited under this concept DOI.',
      `Bidirectional seal with uuidna: the live finite-instance ledger is ${HANDLE_HOST}/articles/clay`,
      '(computed from lean/Clay.lean — seven decidable windows, each proven by decide, axiom-free). A Lean',
      'by-decide proof SOLVES the statement it states, to the standard mathematics uses: the finite window is',
      'settled, machine-checked, and depends on no axiom beyond the kernel. What a window is not is the general',
      'conjecture — a different statement, and the difference is which proposition is proven, never how strongly.',
      'uuidna cites this DOI as prior art first; this record cites the uuidna.com clay surface.',
      'Version DOI of this deposit series begins at 10.5281/zenodo.21781603; concept DOI 10.5281/zenodo.21781602.',
      'License: canonical uuidna CC BY-NC-ND 4.0 (https://uuidna.com/license) — same license as every uuidna publication.',
    ].join(' '),
    related: [
      { identifier: UUIDNA_REPO, relation: 'isSupplementedBy', resource_type: 'software', scheme: 'url' },
      // THE uuidna RECORD, read from the one constant — this said 21787144, which is a different work entirely.
      { identifier: STANDING_DOI, relation: 'isReferencedBy', resource_type: 'software' },
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
