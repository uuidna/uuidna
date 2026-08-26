// clay-involution — THE INITIAL CLAY σ-INVOLUTION prior art (Zenodo record 21781603).
//
// Verified metadata (zenodo.org/api/records/21781603, fetched 2026-08-26):
//   DOI          10.5281/zenodo.21781603
//   concept DOI  10.5281/zenodo.21781602  (conceptrecid 21781602)
//   title        All Seven Clay Millennium Problems Sealed via Universal σ-Involution
//   creator      Rouschev, Tsvetan
//   license      cc-by-4.0 (the publication's own license — distinct from uuidna's CC-BY-NC-ND)
// The record already cites https://uuidna.com (isSupplementedBy). This tree cites the DOI wherever Clay is
// sealed or documented — credit law: prior DOI first, captain next. Honest scope: the deposit is the initial
// clay involution sealing; uuidna's Clay.lean seals FINITE instances and solves none of the seven.
//
// Zenodo UPDATE path: workflow-only — publish.yml job `zenodo-clay` versions this concept on a release tag.
// Local scripts regenerate `.zenodo.clay.json` only; never curl the deposit API from a laptop.
export const CLAY_INVOLUTION_DOI = '10.5281/zenodo.21781603'
export const CLAY_INVOLUTION_CONCEPT_DOI = '10.5281/zenodo.21781602'
export const CLAY_INVOLUTION_RECORD_ID = '21781603'
export const CLAY_INVOLUTION_CONCEPT_ID = '21781602'
export const CLAY_INVOLUTION_DOI_URL = `https://doi.org/${CLAY_INVOLUTION_DOI}`
export const CLAY_INVOLUTION_RECORD_URL = 'https://zenodo.org/records/21781603'
export const CLAY_INVOLUTION_TITLE =
  'All Seven Clay Millennium Problems Sealed via Universal σ-Involution'
export const CLAY_INVOLUTION_LICENSE = 'cc-by-4.0'
export const CLAY_UUIDNA_ARTICLE_URL = 'https://uuidna.com/articles/clay'
export const CLAY_UUIDNA_ORIGIN = 'https://uuidna.com'
export const CLAY_UUIDNA_REPO = 'https://github.com/uuidna/uuidna'

/** Short credit line for headers / PRINCIPLE / school — DOI first, then the live clay surface. */
export const CLAY_INVOLUTION_CITE =
  `Prior art (initial clay σ-involution): DOI ${CLAY_INVOLUTION_DOI} ` +
  `(${CLAY_INVOLUTION_RECORD_URL}). uuidna Clay.lean seals finite instances of that reflection — solves none.`

/**
 * Zenodo deposition metadata for a NEW VERSION of concept 21781602 (standing record 21781603).
 * Bidirectional seal: this side cites uuidna.com + /articles/clay + the uuidna repo; uuidna's .zenodo.json
 * and Clay surfaces cite DOI 10.5281/zenodo.21781603. Does not claim any Millennium Problem is solved.
 */
export function clayInvolutionZenodoMetadata(creatorName = 'Rouschev, Tsvetan'): Record<string, unknown> {
  const description = [
    'Initial clay σ-involution prior art: formal sealing of all seven Clay Millennium Prize problems through a',
    'universal self-inverse involution structure (σ² = id), as deposited under this concept DOI.',
    '',
    'Bidirectional seal with uuidna: the live finite-instance ledger is',
    `${CLAY_UUIDNA_ARTICLE_URL} (computed from lean/Clay.lean — seven decidable windows, each proven by decide,`,
    'axiom-free). uuidna cites this DOI as prior art first; this record cites the uuidna.com clay surface.',
    'HONEST SCOPE: a seal is not a solution of the named Millennium Problem — verified ≠ solved; uuidna seals',
    "FINITE instances drawn from each problem's own mathematics and solves none of the seven.",
    `Version DOI of this deposit series begins at ${CLAY_INVOLUTION_DOI}; concept DOI ${CLAY_INVOLUTION_CONCEPT_DOI}.`,
  ].join(' ')

  return {
    title: CLAY_INVOLUTION_TITLE,
    description,
    upload_type: 'publication',
    publication_type: 'article',
    access_right: 'open',
    license: CLAY_INVOLUTION_LICENSE,
    creators: [{ name: creatorName }],
    keywords: [
      'Clay Millennium Problems',
      'σ-involution',
      'involution',
      'formal verification',
      'decidable arithmetic',
      'uuidna',
      'verified is not solved',
    ],
    related_identifiers: [
      // live doors — bidirectional with uuidna's clay surfaces and archive
      { identifier: CLAY_UUIDNA_ORIGIN, relation: 'isSupplementedBy', resource_type: 'software', scheme: 'url' },
      { identifier: CLAY_UUIDNA_ARTICLE_URL, relation: 'isDocumentedBy', resource_type: 'publication-article', scheme: 'url' },
      { identifier: CLAY_UUIDNA_REPO, relation: 'isSupplementedBy', resource_type: 'software', scheme: 'url' },
      { identifier: '10.5281/zenodo.21787144', relation: 'isReferencedBy', resource_type: 'software' },
      // historical supplements already on the 21781603 deposit (preserved, not invented)
      { identifier: 'https://ceccec.psg.bg/millennium-solutions', relation: 'isSupplementedBy', resource_type: 'software-computationalnotebook', scheme: 'url' },
      { identifier: 'https://github.com/ceccec/zeropoint-node', relation: 'isSupplementTo', resource_type: 'software-computationalnotebook', scheme: 'url' },
    ],
  }
}
