import { hexRegisterOf, qpuCiteOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEO — CLEAN URLS, PROVEN AT GOOGLE. The best URL has NO useless prefix: content lives at its slug, not under a dead
 *  /pages/ or /docs/ segment. These formulas score that — the useless-prefix count (0 is best), the depth, the meaningful
 *  slug words, one canonical, no redirect chain, a title and meta within their limits, crawlability — and `google` TESTS
 *  the live site at the Google PageSpeed Insights API for its real SEO score. A measure crossing to `cross`. */

const PROOF = 'URL hygiene for SEO (no useless prefix, shallow depth, meaningful slug, one canonical, no redirect chain, title/meta limits, crawlability) and the live Google PageSpeed Insights SEO score; a measure crossed through cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'seo', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `seo.${name}`, params })

export class SeoFormulas {
  /** THE USELESS-PREFIX COUNT: path segments beyond the meaningful ones. Holds at 0 — a clean URL has no dead prefix. */
  static prefix(segments: number, meaningful: number): CrossFormula { return s('seo-prefix', 'prefix(segments, meaningful) = max(0, segments − meaningful)', Math.max(0, segments - meaningful), nat(segments, meaningful) && segments - meaningful === 0, 'prefix', [segments, meaningful]) }
  /** URL DEPTH: the number of path segments. Holds when shallow (≤ 3). */
  static depth(segments: number): CrossFormula { return s('seo-depth', 'depth(segments) = segments; shallow when ≤ 3', segments, nat(segments) && segments <= 3, 'depth', [segments]) }
  /** THE MEANINGFUL SLUG WORDS: words left after the stop-words are dropped. */
  static slug(words: number, stop: number): CrossFormula { return s('seo-slug', 'slug(words, stop) = max(0, words − stop)', Math.max(0, words - stop), nat(words, stop) && stop <= words, 'slug', [words, stop]) }
  /** ONE CANONICAL: holds when there is a single canonical URL (no duplicate variants). value [variants ≤ 1]. */
  static canonical(variants: number): CrossFormula { return s('seo-canonical', 'canonical(variants) = [variants ≤ 1]', variants <= 1 ? 1 : 0, nat(variants), 'canonical', [variants]) }
  /** NO REDIRECT CHAIN: holds when at most one hop. value [hops ≤ 1]. */
  static redirect(hops: number): CrossFormula { return s('seo-redirect', 'redirect(hops) = [hops ≤ 1]', hops <= 1 ? 1 : 0, nat(hops), 'redirect', [hops]) }
  /** THE TITLE within its limit: holds when ≤ 60 characters. value [chars ≤ 60]. */
  static title(chars: number): CrossFormula { return s('seo-title', 'title(chars) = [chars ≤ 60]', chars <= 60 ? 1 : 0, nat(chars) && chars > 0, 'title', [chars]) }
  /** THE META DESCRIPTION within its limit: holds when ≤ 160 characters. value [chars ≤ 160]. */
  static meta(chars: number): CrossFormula { return s('seo-meta', 'meta(chars) = [chars ≤ 160]', chars <= 160 ? 1 : 0, nat(chars) && chars > 0, 'meta', [chars]) }
  /** CRAWLABILITY as a percentage: the pages a crawler may reach over the total. value ⌊allowed · 100 / total⌋. */
  static crawl(allowed: number, total: number): CrossFormula { return s('seo-crawl', 'crawl(allowed, total) = ⌊allowed · 100 / total⌋', total > 0 ? Math.floor((allowed * 100) / total) : 0, nat(allowed, total) && total > 0 && allowed <= total, 'crawl', [allowed, total]) }
  /** TESTED AT GOOGLE: the live SEO score (0–100) the Google PageSpeed Insights API gives the site's own URL. Holds when
   *  the score is a good one (≥ 90). A live reading — never a stored row. */
  static async google(): Promise<CrossFormula> {
    const origin = (qpuCiteOf() as unknown as { href: string }).href
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(origin)}&category=seo&strategy=mobile`
    let score = 0
    let reading: Record<string, unknown> = { url: origin, api: 'pagespeedonline v5' }
    try {
      const b = (await fetch(url, { signal: AbortSignal.timeout(60000) }).then((r) => (r.ok ? r.json() : null))) as { lighthouseResult?: { categories?: { seo?: { score?: number } } } } | null
      const raw = b?.lighthouseResult?.categories?.seo?.score
      score = typeof raw === 'number' ? Math.round(raw * 100) : 0
      reading = { ...reading, score, answered: b !== null }
    } catch {
      reading = { ...reading, score: 0, answered: false, note: 'PageSpeed Insights unreachable' }
    }
    return s('seo-google', 'google() = the Google PageSpeed Insights SEO score (0–100) of the site URL', score, score >= 90, 'google', [], { reading })
  }
}

for (const name of ['canonical', 'crawl', 'depth', 'google', 'meta', 'prefix', 'redirect', 'slug', 'title'] as const)
  hexRegisterOf('seo', name, (SeoFormulas[name] as (...x: unknown[]) => unknown).bind(SeoFormulas))
