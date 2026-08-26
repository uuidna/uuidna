// publication-metadata — ONE rich metadata schema for EVERY publication (captain, 2026-08-26).
//
// Agnostic: clay, Nature cites, software archive pages — same required fields. Completeness fails on thin
// records or one-way seals. LICENSE LAW: every publication carries the canonical uuidna license
// (legalFacts().license.spdx / package.json) — no per-publication drift (cc-by-4.0 on clay is refused).
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { legalFacts } from './legal.js'
import { handleOf } from './handle.js'
import { toUuid } from './address.js'
import { HANDLE_HOST, handleUrl } from './handle-permanence.js'
import {
  ZENODO_SEALS,
  depositableSeals,
  sealRelatedIdentifiers,
  type ZenodoSeal,
} from './zenodo-seals.js'

/** Zenodo / package.json form of the SPDX id (lowercase). */
export function zenodoLicenseId(spdx: string = legalFacts().license.spdx): string {
  return spdx.toLowerCase()
}

export const CANONICAL_LICENSE_SPDX = (): string => legalFacts().license.spdx
export const CANONICAL_LICENSE_ZENODO = (): string => zenodoLicenseId()
export const CANONICAL_LICENSE_URL = (): string => legalFacts().license.canonical

/** Required scholarly + SEO + uuidna seal fields — one schema for all publications. */
export const PUBLICATION_METADATA_REQUIRED = [
  'id',
  'title',
  'abstract',
  'authors',
  'keywords',
  'license',
  'licenseUrl',
  'language',
  'publicationDate',
  'doi',
  'doiUrl',
  'pageUrl',
  'handle',
  'handleUrl',
  'address',
  'relatedIdentifiers',
  'og',
  'jsonLd',
] as const

export type PublicationMetadataField = (typeof PUBLICATION_METADATA_REQUIRED)[number]

export interface PublicationOg {
  title: string
  description: string
  url: string
  type: 'article' | 'website'
}

export interface PublicationMetadata {
  id: string
  title: string
  abstract: string
  authors: readonly { name: string }[]
  keywords: readonly string[]
  /** Must equal CANONICAL_LICENSE_SPDX() — license identity law. */
  license: string
  licenseUrl: string
  language: string
  publicationDate: string
  doi: string
  doiUrl: string
  pageUrl: string
  handle: string
  handleUrl: string
  address: string
  relatedIdentifiers: readonly { identifier: string; relation: string; resource_type: string; scheme?: string }[]
  og: PublicationOg
  jsonLd: Record<string, unknown>
  complete: true
}

export interface MetadataGap {
  id: string
  field?: string
  what: string
  fix: string
}

export interface PublicationMetadataAudit {
  ok: boolean
  gaps: MetadataGap[]
  count: number
  license: string
  receipt: string
  honest: string
}

const DEFAULT_AUTHOR = { name: 'Rouschev, Tsvetan' }
/** Stable publication date for the clay prior-art deposit (verified Zenodo metadata) — other seals may set theirs. */
const SEAL_DATES: Record<string, string> = {
  'clay-involution': '2026-08-04',
  'uuidna-software': '2026-08-16',
  'nature-mom-bh': '2026-01-01',
}

function pageCitesDoi(pagePath: string | undefined, doi: string): boolean {
  if (!pagePath || !existsSync(join(ROOT, pagePath))) return false
  const text = readFileSync(join(ROOT, pagePath), 'utf8')
  return text.includes(doi) || text.includes(`doi.org/${doi}`)
}

function articlePathFromPageUrl(pageUrl: string): string | undefined {
  const m = pageUrl.match(/^https:\/\/uuidna\.com\/articles\/([a-z0-9-]+)$/)
  if (m) return `docs/articles/${m[1]}.md`
  if (pageUrl === HANDLE_HOST || pageUrl === HANDLE_HOST + '/') return 'docs/index.md'
  return undefined
}

/**
 * richPublicationMetadata(seal) → complete package. License is ALWAYS the canonical uuidna license —
 * seal.license is ignored if present (drift refused at audit).
 */
export function richPublicationMetadata(seal: ZenodoSeal): PublicationMetadata {
  const lf = legalFacts()
  const license = lf.license.spdx
  const licenseUrl = lf.license.canonical
  const address = toUuid(`publication-meta|${seal.id}|${seal.standingDoi}|${seal.pageUrl}`)
  const handle = handleOf(address)
  const hUrl = handleUrl(handle)
  const doiUrl = `https://doi.org/${seal.standingDoi}`
  const abstract = seal.description.trim()
  const authors = [DEFAULT_AUTHOR]
  const keywords = seal.keywords.length ? seal.keywords : ['uuidna']
  const publicationDate = SEAL_DATES[seal.id] ?? '2026-08-26'
  const related = sealRelatedIdentifiers(seal)
  const og: PublicationOg = {
    title: seal.title,
    description: abstract.slice(0, 300),
    url: seal.pageUrl,
    type: seal.role === 'software-archive' ? 'website' : 'article',
  }
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': seal.role === 'software-archive' ? 'SoftwareSourceCode' : 'ScholarlyArticle',
    name: seal.title,
    description: abstract,
    author: authors.map((a) => ({ '@type': 'Person', name: a.name })),
    datePublished: publicationDate,
    license: licenseUrl,
    keywords: [...keywords],
    url: seal.pageUrl,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'DOI', value: seal.standingDoi },
      { '@type': 'PropertyValue', propertyID: 'uuidna-handle', value: handle },
      { '@type': 'PropertyValue', propertyID: 'uuidna-address', value: address },
    ],
    sameAs: [doiUrl, hUrl, seal.pageUrl],
    inLanguage: 'en',
  }
  return {
    id: seal.id,
    title: seal.title,
    abstract,
    authors,
    keywords,
    license,
    licenseUrl,
    language: 'eng',
    publicationDate,
    doi: seal.standingDoi,
    doiUrl,
    pageUrl: seal.pageUrl,
    handle,
    handleUrl: hUrl,
    address,
    relatedIdentifiers: related,
    og,
    jsonLd,
    complete: true,
  }
}

/** Zenodo deposit metadata — rich set + license identity (always canonical). */
export function richZenodoDepositMetadata(seal: ZenodoSeal): Record<string, unknown> {
  const rich = richPublicationMetadata(seal)
  const meta: Record<string, unknown> = {
    title: rich.title,
    description: rich.abstract,
    upload_type: seal.uploadType,
    access_right: 'open',
    license: zenodoLicenseId(rich.license),
    creators: [...rich.authors],
    keywords: [...rich.keywords],
    language: rich.language,
    publication_date: rich.publicationDate,
    related_identifiers: rich.relatedIdentifiers,
  }
  if (seal.publicationType) meta.publication_type = seal.publicationType
  return meta
}

function missingFields(m: PublicationMetadata): string[] {
  const miss: string[] = []
  for (const f of PUBLICATION_METADATA_REQUIRED) {
    const v = m[f]
    if (v === undefined || v === null) { miss.push(f); continue }
    if (typeof v === 'string' && !v.trim()) miss.push(f)
    if (Array.isArray(v) && v.length === 0) miss.push(f)
    if (f === 'og' && (!m.og.title || !m.og.url || !m.og.description)) miss.push('og incomplete')
    if (f === 'jsonLd' && typeof m.jsonLd['@type'] !== 'string') miss.push('jsonLd.@type')
  }
  if (m.abstract.length < 80) miss.push('abstract too thin (<80 chars)')
  if (m.keywords.length < 3) miss.push('keywords too thin (<3)')
  if (m.authors.length < 1) miss.push('authors empty')
  return miss
}

/**
 * publicationMetadataAudit() → completeness + bidirectional seal + LICENSE IDENTITY for every registry seal.
 * Fails if any publication declares a license other than the canonical uuidna SPDX.
 */
export function publicationMetadataAudit(): PublicationMetadataAudit {
  const gaps: MetadataGap[] = []
  const canon = CANONICAL_LICENSE_SPDX()
  const canonZ = CANONICAL_LICENSE_ZENODO()
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { license?: string }
  if (String(pkg.license).toUpperCase() !== canon.toUpperCase()) {
    gaps.push({
      id: 'package',
      field: 'license',
      what: `package.json license "${pkg.license}" ≠ canonical "${canon}"`,
      fix: 'package.json must declare the same SPDX as legalFacts().license.spdx',
    })
  }

  for (const seal of ZENODO_SEALS) {
    const rich = richPublicationMetadata(seal)
    for (const f of missingFields(rich)) {
      gaps.push({
        id: seal.id,
        field: f,
        what: `publication ${seal.id} thin/incomplete: ${f}`,
        fix: 'fill PUBLICATION_METADATA_REQUIRED — one rich schema for all publications',
      })
    }
    // LICENSE IDENTITY — rich metadata always uses canonical; refuse any leftover per-seal license key
    if (rich.license.toUpperCase() !== canon.toUpperCase()) {
      gaps.push({
        id: seal.id,
        field: 'license',
        what: `publication ${seal.id} license "${rich.license}" ≠ canonical "${canon}"`,
        fix: 'every publication must carry CC-BY-NC-ND-4.0 (legalFacts / package.json) — no per-publication license',
      })
    }
    if (Object.prototype.hasOwnProperty.call(seal, 'license')) {
      gaps.push({
        id: seal.id,
        field: 'license',
        what: `seal registry ${seal.id} still declares a per-seal license field`,
        fix: 'remove license from ZenodoSeal entries — seals inherit the canonical uuidna license only',
      })
    }
    // Bidirectional: DOI package cites pageUrl; page cites DOI (when article exists)
    const citesPage = rich.relatedIdentifiers.some((r) => r.identifier === seal.pageUrl || r.identifier === HANDLE_HOST)
    if (!citesPage) {
      gaps.push({
        id: seal.id,
        what: `publication ${seal.id} one-way seal — metadata missing pageUrl/uuidna.com related_identifier`,
        fix: 'sealRelatedIdentifiers must include the live uuidna.com surface',
      })
    }
    const art = articlePathFromPageUrl(seal.pageUrl)
    if (art && seal.role !== 'cite-only') {
      if (!pageCitesDoi(art, seal.standingDoi)) {
        gaps.push({
          id: seal.id,
          what: `page ${art} does not cite DOI ${seal.standingDoi} (one-way seal)`,
          fix: `page must cite the standing DOI — bidirectional seal = complete`,
        })
      }
    }
  }

  // Generated zenodo seal files must also carry the canonical license
  for (const seal of depositableSeals()) {
    const p = join(ROOT, 'zenodo', 'seals', `${seal.id}.json`)
    if (!existsSync(p)) continue
    const meta = JSON.parse(readFileSync(p, 'utf8')) as { license?: string }
    if (zenodoLicenseId(meta.license ?? '') !== canonZ) {
      gaps.push({
        id: seal.id,
        field: 'license',
        what: `zenodo/seals/${seal.id}.json license "${meta.license}" ≠ "${canonZ}"`,
        fix: 'run gen-zenodo-seals — deposit metadata must mirror the canonical license',
      })
    }
  }

  const zPath = join(ROOT, '.zenodo.json')
  if (existsSync(zPath)) {
    const z = JSON.parse(readFileSync(zPath, 'utf8')) as { license?: string }
    if (zenodoLicenseId(z.license ?? '') !== canonZ) {
      gaps.push({
        id: 'uuidna-software',
        field: 'license',
        what: `.zenodo.json license "${z.license}" ≠ "${canonZ}"`,
        fix: 'gen-zenodo must emit package.json license — license identity law',
      })
    }
  }

  return {
    ok: gaps.length === 0,
    gaps,
    count: ZENODO_SEALS.length,
    license: canon,
    receipt: toUuid(`pub-meta-audit|${canon}|${gaps.length}|${ZENODO_SEALS.length}`),
    honest:
      'One rich schema for all publications: title, abstract, authors, keywords, license (= canonical CC-BY-NC-ND-4.0), ' +
      'language, dates, DOI, related identifiers, pageUrl, handle, OG, JSON-LD. Bidirectional page↔DOI. Thin or ' +
      'one-way seals fail. No per-publication license drift.',
  }
}
