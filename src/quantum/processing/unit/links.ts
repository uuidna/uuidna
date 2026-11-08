/**
 * The external link graph a crawler reads off the citation strings this repo already publishes.
 * Zenodo (10.5281 and zenodo.org) and GitHub (the repository the unit prints) are the sources.
 * https://qpu.uuidna.com and the paths under it are the target. Each pair is also stored in reverse.
 * Nothing here fetches. An email, an ORCID, and a Referer are not edges.
 * @wing presentation
 * @kind builder
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { installCloudflare, hexDecodeOf, qpuHexUuidOf, sitemapOf, unit } from './index.js'

export type QpuLinkEdge = {
  from: string
  to: string
  holds: false
  /** Set when a formula address already mints for this citation. A URL pair does not. */
  address?: string
  /** The host end is not a page the unit's sitemap lists. */
  lead?: true
}

export type QpuLinkGraph = {
  kind: 'links'
  edges: QpuLinkEdge[]
  holds: false
  next?: { handle: string; uuid: string }
  lead?: { href: string; lead: true }[]
}

/** https hrefs and 10.5281 DOIs in one citation string. Query strings stay out, so a second https is its own href. */
export const hrefsOf = (text: string): string[] => {
  const found: string[] = []
  for (const match of text.matchAll(/https:\/\/[^\s<>"'`)\\?]+/g)) {
    const href = match[0].replace(/[.,;:\]]+$/, '')
    if (!href.includes('@')) found.push(href)
  }
  for (const match of text.matchAll(/(?:doi:)?(10\.5281\/zenodo\.\d+)/gi)) found.push(`https://doi.org/${match[1]}`)
  return found
}

const canonicalOf = (href: string): string | undefined => {
  let raw = href
  if (raw.startsWith('git+')) raw = raw.slice(4)
  if (raw.endsWith('.git')) raw = raw.slice(0, -4)
  if (!URL.canParse(raw)) return undefined
  const url = new URL(raw)
  if (url.protocol !== 'https:' || url.username || url.password) return undefined
  url.hash = ''
  url.search = ''
  if (url.host === 'doi.org') {
    const doi = /^\/(10\.5281\/zenodo\.\d+)$/.exec(url.pathname)
    return doi ? `https://doi.org/${doi[1]}` : undefined
  }
  if (url.host === 'zenodo.org') {
    const record = /^\/records\/(\d+)$/.exec(url.pathname)
    return record ? `https://zenodo.org/records/${record[1]}` : undefined
  }
  if (url.host === 'github.com') {
    if (!/^\/uuidna\/qpu(?:\/.*)?$/.test(url.pathname)) return undefined
    return `https://github.com${url.pathname.replace(/\/$/, '')}`
  }
  if (url.host === unit.host) {
    const path = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '')
    return `https://${unit.host}${path}`
  }
  return undefined
}

const kindOf = (href: string): 'zenodo' | 'github' | 'host' | undefined => {
  const url = new URL(href)
  if (url.host === 'doi.org' || url.host === 'zenodo.org') return 'zenodo'
  if (url.host === 'github.com') return 'github'
  if (url.host === unit.host) return 'host'
  return undefined
}

/** Classified citation hrefs: Zenodo, this repository, and the host. ORCID and any other host are left out. */
export const citationHrefsOf = (text: string): string[] =>
  [...new Set(hrefsOf(text).map(canonicalOf).filter((href): href is string => href !== undefined))].sort()

/**
 * The citation lines the files already print, kept in the bundle so an isolate without the repo
 * files parses the same hrefs. The test checks this set against CITATION.cff and .zenodo.json.
 */
export const bundledCitationOf = (): string =>
  [
    'url: https://qpu.uuidna.com',
    'repository-code: https://github.com/uuidna/qpu',
    'value: 10.5281/zenodo.23156998',
    'value: 10.5281/zenodo.22700098',
    'https://doi.org/10.5281/zenodo.21781602',
    'https://doi.org/10.5281/zenodo.21781603',
    'https://zenodo.org/records/21781603',
    'https://zenodo.org/records/23156998',
    'https://qpu.uuidna.com/cite',
    'https://qpu.uuidna.com/api',
    'https://qpu.uuidna.com/quantum/processing/unit',
    'https://qpu.uuidna.com/license',
    'https://github.com/uuidna/qpu',
  ].join('\n')

const fileTextOf = (name: string): string => {
  try {
    return readFileSync(fileURLToPath(new URL(`../../../../${name}`, import.meta.url)), 'utf8')
  } catch {
    return ''
  }
}

/** CITATION.cff and the Zenodo description, notes, and related identifiers. Empty when the files are not on this isolate. */
export const citationFileTextOf = (): string => {
  const cff = fileTextOf('CITATION.cff')
  const raw = fileTextOf('.zenodo.json')
  if (!raw) return cff
  try {
    const doc = JSON.parse(raw) as { description?: unknown; notes?: unknown; related_identifiers?: unknown }
    const parts = [cff, doc.description, doc.notes, JSON.stringify(doc.related_identifiers ?? [])].filter((row): row is string => typeof row === 'string')
    return parts.join('\n')
  } catch {
    return cff
  }
}

const pagesOf = (): Set<string> => {
  const locs = [...sitemapOf().matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1] ?? '')
  const pages = new Set<string>()
  for (const loc of locs) {
    const href = canonicalOf(loc)
    if (href) pages.add(href)
  }
  return pages
}

/** graph.edges with no params: the formula already exists. A URL pair is not that call, so the edge holds false. */
const nextOf = (): { handle: string; uuid: string } | undefined => {
  try {
    const uuid = qpuHexUuidOf({ family: 'graph', program: ['edges'], params: [] })
    const decoded = hexDecodeOf(uuid)
    if (decoded.holds && 'program' in decoded && decoded.program[0] === 'edges' && decoded.params.length === 0)
      return { handle: decoded.handle, uuid: decoded.uuid }
  } catch {
    /* graph is not registered in this isolate yet */
  }
  return undefined
}

const pairsOf = (text: string, pages: Set<string>, edges: Map<string, QpuLinkEdge>): void => {
  const hrefs = citationHrefsOf(text)
  const external = hrefs.filter((href) => {
    const kind = kindOf(href)
    return kind === 'zenodo' || kind === 'github'
  })
  const hosts = hrefs.filter((href) => kindOf(href) === 'host')
  for (const from of external) {
    for (const to of hosts) {
      const lead = pages.has(to) ? undefined : (true as const)
      const forward = `${from}\n${to}`
      const back = `${to}\n${from}`
      if (!edges.has(forward)) edges.set(forward, { from, to, holds: false, ...(lead ? { lead } : {}) })
      if (!edges.has(back)) edges.set(back, { from: to, to: from, holds: false, ...(lead ? { lead } : {}) })
    }
  }
}

/**
 * Edges between the citation hrefs. One document pairs only the hrefs it contains.
 * The cite strings, the bundled citation lines, and the files when this isolate can read them.
 */
export const linkGraphOf = (citeTexts: readonly string[]): QpuLinkGraph => {
  const pages = pagesOf()
  const edges = new Map<string, QpuLinkEdge>()
  pairsOf([...citeTexts, installCloudflare.qpu].join('\n'), pages, edges)
  pairsOf(bundledCitationOf(), pages, edges)
  const files = citationFileTextOf()
  if (files) pairsOf(files, pages, edges)
  const rows = [...edges.values()].sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to))
  const lead = [...new Set(rows.filter((edge) => edge.lead).flatMap((edge) => [edge.from, edge.to].filter((href) => kindOf(href) === 'host')))].sort()
  return {
    kind: 'links' as const,
    edges: rows,
    holds: false as const,
    get next() {
      return nextOf()
    },
    ...(lead.length ? { lead: lead.map((href) => ({ href, lead: true as const })) } : {}),
  }
}
