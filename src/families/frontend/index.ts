import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FRONTEND — MANY FRONTENDS, ONE PAYLOAD API. Payload is headless: its REST, GraphQL and Local API feed any frontend —
 *  the Next app here, but equally VitePress (latest), Astro, Nuxt, SvelteKit, Remix. This family is the arithmetic of that:
 *  the localized pages a frontend builds, the queries to hydrate them, the build time, the cache hit rate, hydration, how
 *  many frameworks the one API serves, the headless combinations (endpoints × frontends), and the ISR cadence. Crosses to
 *  `payload`. A measure. */

const PROOF = 'headless frontends on one Payload API (Next, VitePress, Astro, Nuxt, SvelteKit, Remix): localized pages, hydration queries, build time, cache, hydration, frameworks served, endpoints×frontends combinations, ISR cadence'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'frontend', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `frontend.${name}`, params })

export class FrontendFormulas {
  /** THE STATIC PAGES a frontend builds from the content: routes across locales. value routes · locales. */
  static pages(routes: number, locales: number): CrossFormula { return f('frontend-pages', 'pages(routes, locales) = routes · locales', routes * locales, nat(routes, locales), 'pages', [routes, locales]) }
  /** HYDRATION QUERIES: the API calls to fill a page — collections at a population depth. value collections · depth. */
  static fetch(collections: number, depth: number): CrossFormula { return f('frontend-fetch', 'fetch(collections, depth) = collections · depth', collections * depth, nat(collections, depth), 'fetch', [collections, depth]) }
  /** BUILD TIME: pages at a per-page cost. value pages · perPage. */
  static build(pages: number, perPage: number): CrossFormula { return f('frontend-build', 'build(pages, perPage) = pages · perPage', pages * perPage, nat(pages, perPage), 'build', [pages, perPage]) }
  /** THE CDN CACHE HIT RATE as a percentage. value ⌊hits · 100 / requests⌋. */
  static cache(hits: number, requests: number): CrossFormula { return f('frontend-cache', 'cache(hits, requests) = ⌊hits · 100 / requests⌋', requests > 0 ? Math.floor((hits * 100) / requests) : 0, nat(hits, requests) && requests > 0 && hits <= requests, 'cache', [hits, requests]) }
  /** HYDRATION as a percentage: the interactive islands over the total. value ⌊interactive · 100 / total⌋. */
  static hydration(interactive: number, total: number): CrossFormula { return f('frontend-hydration', 'hydration(interactive, total) = ⌊interactive · 100 / total⌋', total > 0 ? Math.floor((interactive * 100) / total) : 0, nat(interactive, total) && total > 0 && interactive <= total, 'hydration', [interactive, total]) }
  /** THE FRAMEWORKS the one Payload API serves. value the count; holds when it serves at least one (it is headless). */
  static frameworks(count: number): CrossFormula { return f('frontend-frameworks', 'frameworks(count) = count; the frontends the headless API serves (Next, VitePress, Astro, Nuxt, SvelteKit, Remix…)', count, nat(count) && count >= 1, 'frameworks', [count], { examples: ['next', 'vitepress', 'astro', 'nuxt', 'sveltekit', 'remix'] }) }
  /** THE HEADLESS COMBINATIONS: one API's endpoints across many frontends. value endpoints · frontends. */
  static headless(endpoints: number, frontends: number): CrossFormula { return f('frontend-headless', 'headless(endpoints, frontends) = endpoints · frontends (one API, many frontends)', endpoints * frontends, nat(endpoints, frontends), 'headless', [endpoints, frontends]) }
  /** THE ISR CADENCE: how many regenerations fit a window at a revalidate interval. value ⌊window / interval⌋. */
  static isr(window: number, interval: number): CrossFormula { return f('frontend-isr', 'isr(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0, nat(window, interval) && interval > 0, 'isr', [window, interval]) }
}

for (const name of ['build', 'cache', 'fetch', 'frameworks', 'headless', 'hydration', 'isr', 'pages'] as const)
  hexRegisterOf('frontend', name, (FrontendFormulas[name] as (...x: unknown[]) => unknown).bind(FrontendFormulas))
