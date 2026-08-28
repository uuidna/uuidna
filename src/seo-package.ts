// seo-package — SEO PACKAGING LAW (captain, 2026-08-26):
//
// ANY publishable object — a page, a card-as-link, a publication, a theorem, even a solitary link surface —
// ships ONLY as a COMPLETE package of standard Open Graph + microdata (VitePress frontmatter `head` shape).
// Bare `<a href>` without OG/microdata is refused.
//
// Complete package (every field required):
//   · link[rel=canonical]
//   · meta[property=og:title|og:description|og:url|og:type]  (OG uses `property`, not `name` — VitePress config law)
//   · meta[property=uuidna:address]  (content-address / hexbit door preimage)
//   · schema.org JSON-LD (@type) OR RDFa/microdata itemscope equivalent on the object surface
//
// Source of truth: quantumSeo() → Seo.head. This module AUDITS and EMITS the package for pages, cards, and links.
import type { HeadTuple, Seo } from './seo.js'
import { quantumSeo } from './seo.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { isUuidnaUrl } from './handle-permanence.js'

const HOST = 'https://uuidna.com'

/** Required Open Graph properties — `property` attribute (RDFa), never `name`. */
export const SEO_OG_REQUIRED = ['og:title', 'og:description', 'og:url', 'og:type'] as const

export interface SeoPackageGaps {
  ok: boolean
  missing: string[]
  honest: string
}

export interface SeoLinkPackage {
  /** VitePress frontmatter head — same shape transformPageData / quantumSeo emit */
  head: HeadTuple[]
  /** HTML attributes for the object surface (card / VPLink wrapper) */
  microdata: Record<string, string>
  /** Compact HTML: meta siblings + optional JSON-LD script fragment for static cards */
  microdataHtml: string
  canonical: string
  address: string
  handle: string
  receipt: string
  complete: true
}

function propOf(h: HeadTuple): string | undefined {
  if (h[0] !== 'meta') return undefined
  return (h[1] as { property?: string }).property
}

function hasCanonical(head: HeadTuple[]): boolean {
  return head.some((h) => h[0] === 'link' && (h[1] as { rel?: string }).rel === 'canonical')
}

function hasJsonLd(head: HeadTuple[], jsonLd?: Record<string, unknown>): boolean {
  if (jsonLd && typeof jsonLd['@type'] === 'string') return true
  return head.some((h) => h[0] === 'script' && (h[1] as { type?: string }).type === 'application/ld+json')
}

function hasAddress(head: HeadTuple[]): boolean {
  return head.some((h) => propOf(h) === 'uuidna:address')
}

function hasHandleUrl(head: HeadTuple[]): boolean {
  if (head.some((h) => propOf(h) === 'uuidna:handle-url')) return true
  return head.some((h) => h[0] === 'link' && (h[1] as { rel?: string; href?: string }).rel === 'alternate'
    && /^https:\/\/uuidna\.com\/[0-9a-f]{8}$/.test((h[1] as { href?: string }).href ?? ''))
}

/** seoPackageGaps(seo) → missing pieces of the complete OG+microdata package. */
export function seoPackageGaps(seo: Seo): SeoPackageGaps {
  const missing: string[] = []
  if (!hasCanonical(seo.head)) missing.push('link[rel=canonical]')
  for (const p of SEO_OG_REQUIRED) {
    if (!seo.head.some((h) => propOf(h) === p)) missing.push(`meta[property=${p}]`)
  }
  // OG must use property=, never name= for og:* keys
  for (const h of seo.head) {
    if (h[0] !== 'meta') continue
    const name = (h[1] as { name?: string }).name
    if (name && name.startsWith('og:')) missing.push(`og tag uses name= not property= (${name})`)
  }
  if (!hasAddress(seo.head)) missing.push('meta[property=uuidna:address]')
  if (!hasHandleUrl(seo.head)) missing.push('meta[property=uuidna:handle-url] (DOI-class stable door)')
  if (!hasJsonLd(seo.head, seo.jsonLd)) missing.push('schema.org JSON-LD @type')
  if (!isUuidnaUrl(seo.canonical)) missing.push('canonical on uuidna.com')
  if (!seo.title.trim()) missing.push('title')
  if (!seo.description.trim()) missing.push('description')
  return {
    ok: missing.length === 0,
    missing,
    honest:
      'Complete SEO package = canonical + og:title/description/url/type (property=) + uuidna:address + ' +
      'uuidna:handle-url (DOI-class https://uuidna.com/<handle>) + schema.org JSON-LD. Bare links refused.',
  }
}

/** assertSeoPackage(seo) → throws if incomplete — generators call this before emit. */
export function assertSeoPackage(seo: Seo, label = seo.route): void {
  const g = seoPackageGaps(seo)
  if (!g.ok) throw new Error(`SEO package incomplete for ${label}: missing ${g.missing.join(', ')}`)
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

/**
 * packageSeoLink(subject) → COMPLETE package for a solitary link / card-as-link surface.
 * Same OG frontmatter head as a page; microdata HTML so the object itself carries schema.org when embedded.
 */
export function packageSeoLink(subject: {
  key?: string
  slug?: string
  route?: string
  title?: string
  description?: string
}): SeoLinkPackage {
  const seo = subject.key ? quantumSeo({ key: subject.key })
    : subject.slug ? quantumSeo({ slug: subject.slug })
      : quantumSeo({
        route: subject.route ?? '/',
        title: subject.title,
        description: subject.description,
      })
  assertSeoPackage(seo)
  const handle = handleOf(seo.address)
  const ogType = seo.kind === 'page' ? 'website' : 'article'
  const schemaType = (seo.jsonLd['@type'] as string) || (seo.kind === 'page' ? 'WebPage' : 'ScholarlyArticle')
  const microdata: Record<string, string> = {
    itemscope: '',
    itemtype: `https://schema.org/${schemaType}`,
    'data-og-title': seo.title,
    'data-og-description': seo.description.slice(0, 200),
    'data-og-url': seo.canonical,
    'data-og-type': ogType,
    'data-uuidna-address': seo.address,
    'data-uuidna-handle': handle,
    'data-uuidna-handle-url': `${HOST}/${handle}`,
    'data-seo-complete': '1',
  }
  const microdataHtml =
    `<meta itemprop="name" content="${escapeHtml(seo.title)}">` +
    `<meta itemprop="description" content="${escapeHtml(seo.description.slice(0, 300))}">` +
    `<meta itemprop="url" content="${escapeHtml(seo.canonical)}">` +
    `<meta itemprop="identifier" content="${escapeHtml(seo.address)}">` +
    `<meta itemprop="sameAs" content="${escapeHtml(`${HOST}/${handle}`)}">`
  return {
    head: seo.head,
    microdata,
    microdataHtml,
    canonical: seo.canonical,
    address: seo.address,
    handle,
    receipt: toUuid(`seo-package|${seo.canonical}|${seo.address}`),
    complete: true,
  }
}

/** attrsToHtml(microdata) → space-separated HTML attribute string for embedding on a card/link element. */
export function seoMicrodataAttrs(microdata: Record<string, string>): string {
  return Object.entries(microdata)
    .map(([k, v]) => (v === '' ? k : `${k}="${escapeHtml(v)}"`))
    .join(' ')
}
