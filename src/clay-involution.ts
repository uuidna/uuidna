// clay-involution — INSTANCE of the agnostic zenodo-seals registry (id: clay-involution).
// Constants re-export the seal so Lean headers / school / credits stay stable; the seal itself
// lives in zenodo-seals.ts so clay is not a one-off deposit path.
import { zenodoSealById } from './zenodo-seals.js'

const seal = zenodoSealById('clay-involution')
if (!seal) throw new Error('zenodo-seals registry missing clay-involution instance')

export const CLAY_INVOLUTION_DOI = seal.standingDoi
export const CLAY_INVOLUTION_CONCEPT_DOI = seal.conceptDoi ?? '10.5281/zenodo.21781602'
export const CLAY_INVOLUTION_RECORD_ID = seal.standingRecordId ?? '21781603'
export const CLAY_INVOLUTION_CONCEPT_ID = seal.conceptId ?? '21781602'
export const CLAY_INVOLUTION_DOI_URL = `https://doi.org/${CLAY_INVOLUTION_DOI}`
export const CLAY_INVOLUTION_RECORD_URL = `https://zenodo.org/records/${CLAY_INVOLUTION_RECORD_ID}`
export const CLAY_INVOLUTION_TITLE = seal.title
export const CLAY_UUIDNA_ARTICLE_URL = seal.pageUrl
export const CLAY_UUIDNA_ORIGIN = 'https://uuidna.com'
export const CLAY_UUIDNA_REPO = 'https://github.com/uuidna/uuidna'

/** Short credit line for headers / PRINCIPLE / school — DOI first, then the live clay surface. */
export const CLAY_INVOLUTION_CITE =
  `Prior art (initial clay σ-involution): DOI ${CLAY_INVOLUTION_DOI} ` +
  `(${CLAY_INVOLUTION_RECORD_URL}). uuidna Clay.lean seals finite instances of that reflection — solves none.`
