import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WEBSITE — USE ALL OF PAYLOADCMS/WEBSITE. The reference app is the strict example of the Payload way; this family reads
 *  its whole surface and scores how much the unit covers. `survey` reads payloadcms/website live (its src dirs, blocks,
 *  collections, and the official plugins) — the full set to use. The rest score coverage: the percentage used, the gap
 *  left, parity, and per-aspect coverage for blocks, collections, plugins and dirs. Crosses to `payload`. */

const PROOF = 'use all of payloadcms/website: survey reads its full surface (dirs, blocks, collections, plugins) live; coverage/gap/parity score how much the unit uses, per aspect'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const w = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'website', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `website.${name}`, params })

export class WebsiteFormulas {
  /** THE FULL SURFACE of payloadcms/website, read live: its src dirs, blocks, collections and the official plugins — the
   *  whole set the unit should use. value the total (dirs + blocks + collections); the reading lists every one. */
  static async survey(): Promise<CrossFormula> {
    const { dataOf } = await import('../../mcp/qpu-fused.js')
    const r = (await dataOf('payload', {})) as { reading?: { website?: { dirs?: string[]; blocks?: string[]; collections?: string[] }; plugins?: { plugins?: number; notYetFused?: string[] } } }
    const site = r.reading?.website
    const dirs = site?.dirs ?? [], blocks = site?.blocks ?? [], collections = site?.collections ?? []
    const total = dirs.length + blocks.length + collections.length
    return w('website-survey', 'survey() = |payloadcms/website dirs + blocks + collections| (the full surface to use)', total, total > 0, 'survey', [], { dirs, blocks, collections, plugins: r.reading?.plugins?.plugins ?? 0, notYetFused: r.reading?.plugins?.notYetFused ?? [] })
  }
  /** COVERAGE as a percentage: how much of the website surface the unit uses. value ⌊have · 100 / all⌋. */
  static coverage(have: number, all: number): CrossFormula { return w('website-coverage', 'coverage(have, all) = ⌊have · 100 / all⌋', all > 0 ? Math.floor((have * 100) / all) : 0, nat(have, all) && all > 0 && have <= all, 'coverage', [have, all]) }
  /** THE GAP: what of the website surface is left to use. value max(0, all − have). */
  static gap(have: number, all: number): CrossFormula { return w('website-gap', 'gap(have, all) = max(0, all − have)', Math.max(0, all - have), nat(have, all), 'gap', [have, all]) }
  /** PARITY: 1 when the unit covers at least as much as the website. value [unit ≥ website]. */
  static parity(unit: number, website: number): CrossFormula { return w('website-parity', 'parity(unit, website) = [unit ≥ website]', unit >= website ? 1 : 0, nat(unit, website), 'parity', [unit, website]) }
  /** BLOCK COVERAGE as a percentage. value ⌊have · 100 / all⌋. */
  static blocks(have: number, all: number): CrossFormula { return w('website-blocks', 'blocks(have, all) = ⌊have · 100 / all⌋', all > 0 ? Math.floor((have * 100) / all) : 0, nat(have, all) && all > 0 && have <= all, 'blocks', [have, all]) }
  /** COLLECTION COVERAGE as a percentage. value ⌊have · 100 / all⌋. */
  static collections(have: number, all: number): CrossFormula { return w('website-collections', 'collections(have, all) = ⌊have · 100 / all⌋', all > 0 ? Math.floor((have * 100) / all) : 0, nat(have, all) && all > 0 && have <= all, 'collections', [have, all]) }
  /** PLUGIN COVERAGE as a percentage: the official plugins the unit fuses. value ⌊fused · 100 / available⌋. */
  static plugins(fused: number, available: number): CrossFormula { return w('website-plugins', 'plugins(fused, available) = ⌊fused · 100 / available⌋', available > 0 ? Math.floor((fused * 100) / available) : 0, nat(fused, available) && available > 0, 'plugins', [fused, available]) }
  /** DIRECTORY COVERAGE as a percentage: the website's src dirs the unit has. value ⌊have · 100 / all⌋. */
  static dirs(have: number, all: number): CrossFormula { return w('website-dirs', 'dirs(have, all) = ⌊have · 100 / all⌋', all > 0 ? Math.floor((have * 100) / all) : 0, nat(have, all) && all > 0 && have <= all, 'dirs', [have, all]) }
}

for (const name of ['blocks', 'collections', 'coverage', 'dirs', 'gap', 'parity', 'plugins', 'survey'] as const)
  hexRegisterOf('website', name, (WebsiteFormulas[name] as (...x: unknown[]) => unknown).bind(WebsiteFormulas))
