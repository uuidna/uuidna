import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BLOG — THE PAYLOADCMS/WEBSITE BLOGGING USE CASE, AS ARITHMETIC (Posts, Categories, BlogContent). A blog is numbers:
 *  reading time, excerpt fit, posts per category, paginated pages, slug words after stop-words, related-post overlap,
 *  freshness since publish, and the parts of a series. Crosses to `frontend` — a blog is what the front end renders. A measure. */

const PROOF = 'blog arithmetic (reading time, excerpt fit, categories, pagination, slug, related overlap, freshness, series); the payloadcms/website blogging use case (Posts, Categories, BlogContent); a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'blog', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `blog.${name}`, params })

export class BlogFormulas {
  /** READING TIME: words at a reading speed, in minutes. value ⌈words / wpm⌉. */
  static readtime(words: number, wpm: number): CrossFormula { return c('blog-readtime', 'readtime(words, wpm) = ⌈words / wpm⌉', wpm > 0 ? Math.ceil(words / wpm) : 0, nat(words, wpm) && wpm > 0, 'readtime', [words, wpm]) }
  /** EXCERPT: 1 when the content fits the excerpt limit. value [chars ≤ max]. */
  static excerpt(chars: number, max: number): CrossFormula { return c('blog-excerpt', 'excerpt(chars, max) = [chars ≤ max]', chars <= max ? 1 : 0, nat(chars, max), 'excerpt', [chars, max]) }
  /** CATEGORIES: posts spread evenly over the categories. value ⌊posts / cats⌋. */
  static categories(posts: number, cats: number): CrossFormula { return c('blog-categories', 'categories(posts, cats) = ⌊posts / cats⌋', cats > 0 ? Math.floor(posts / cats) : 0, nat(posts, cats) && cats > 0, 'categories', [posts, cats]) }
  /** PAGINATION: the pages a post list needs at a page size. value ⌈posts / perPage⌉. */
  static pagination(posts: number, perPage: number): CrossFormula { return c('blog-pagination', 'pagination(posts, perPage) = ⌈posts / perPage⌉', perPage > 0 ? Math.ceil(posts / perPage) : 0, nat(posts, perPage) && perPage > 0, 'pagination', [posts, perPage]) }
  /** SLUG: title words left after the stop-words are dropped. value max(0, words − stop). */
  static slug(words: number, stop: number): CrossFormula { return c('blog-slug', 'slug(words, stop) = max(0, words − stop)', Math.max(0, words - stop), nat(words, stop), 'slug', [words, stop]) }
  /** RELATED: shared-tag overlap as a percentage. value ⌊shared · 100 / total⌋. */
  static related(shared: number, total: number): CrossFormula { return c('blog-related', 'related(shared, total) = ⌊shared · 100 / total⌋', total > 0 ? Math.floor((shared * 100) / total) : 0, nat(shared, total) && total > 0 && shared <= total, 'related', [shared, total]) }
  /** FRESHNESS: time since a post was published. value max(0, now − published). */
  static freshness(now: number, published: number): CrossFormula { return c('blog-freshness', 'freshness(now, published) = max(0, now − published)', Math.max(0, now - published), nat(now, published), 'freshness', [now, published]) }
  /** SERIES: the parts of a post series. value parts. */
  static series(parts: number): CrossFormula { return c('blog-series', 'series(parts) = parts', parts, nat(parts), 'series', [parts]) }
}

for (const name of ['categories', 'excerpt', 'freshness', 'pagination', 'readtime', 'related', 'series', 'slug'] as const)
  hexRegisterOf('blog', name, (BlogFormulas[name] as (...x: unknown[]) => unknown).bind(BlogFormulas))
