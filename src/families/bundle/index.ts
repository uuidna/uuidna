import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BUNDLE — A JS BUILD BUNDLE, AS ARITHMETIC. Shipping a web app is numbers: the chunks a module count splits into, how
 *  much tree-shaking removed, the gzip ratio, how much is code-split behind lazy routes, whether a size budget holds, the
 *  duplicates deduped, average chunk weight, and the runtime overhead. Crosses to `frontend` — the bundle is what the
 *  frontend loads. A measure. */

const PROOF = 'bundle arithmetic (chunks, tree-shaking, gzip ratio, code-splitting, size budget, dedupe, entry weight, runtime overhead); a build measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bundle', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `bundle.${name}`, params })

export class BundleFormulas {
  /** CHUNKS: the chunks a module count splits into at a per-chunk cap. value ⌈modules / perChunk⌉. */
  static chunks(modules: number, perChunk: number): CrossFormula { return c('bundle-chunks', 'chunks(modules, perChunk) = ⌈modules / perChunk⌉', perChunk > 0 ? Math.ceil(modules / perChunk) : 0, nat(modules, perChunk) && perChunk > 0, 'chunks', [modules, perChunk]) }
  /** TREE-SHAKING: the percentage of modules removed as dead code. value ⌊removed · 100 / total⌋. */
  static treeshake(removed: number, total: number): CrossFormula { return c('bundle-treeshake', 'treeshake(removed, total) = ⌊removed · 100 / total⌋', total > 0 ? Math.floor((removed * 100) / total) : 0, nat(removed, total) && total > 0 && removed <= total, 'treeshake', [removed, total]) }
  /** GZIP RATIO: the compressed size as a percentage of the raw size. value ⌊compressed · 100 / raw⌋. */
  static gzip(raw: number, compressed: number): CrossFormula { return c('bundle-gzip', 'gzip(raw, compressed) = ⌊compressed · 100 / raw⌋', raw > 0 ? Math.floor((compressed * 100) / raw) : 0, nat(raw, compressed) && raw > 0 && compressed <= raw, 'gzip', [raw, compressed]) }
  /** CODE-SPLITTING: the percentage of routes loaded lazily. value ⌊lazy · 100 / routes⌋. */
  static split(lazy: number, routes: number): CrossFormula { return c('bundle-split', 'split(lazy, routes) = ⌊lazy · 100 / routes⌋', routes > 0 ? Math.floor((lazy * 100) / routes) : 0, nat(lazy, routes) && routes > 0 && lazy <= routes, 'split', [lazy, routes]) }
  /** SIZE BUDGET: 1 when the bundle fits the budget. value [size ≤ max]. */
  static budget(size: number, max: number): CrossFormula { return c('bundle-budget', 'budget(size, max) = [size ≤ max]', size <= max ? 1 : 0, nat(size, max), 'budget', [size, max]) }
  /** DEDUPE: the duplicate modules collapsed to one copy. value duplicates. */
  static dedupe(duplicates: number): CrossFormula { return c('bundle-dedupe', 'dedupe(duplicates) = duplicates', duplicates, nat(duplicates), 'dedupe', [duplicates]) }
  /** ENTRY WEIGHT: average bytes per chunk. value ⌊size / chunks⌋. */
  static entry(size: number, chunks: number): CrossFormula { return c('bundle-entry', 'entry(size, chunks) = ⌊size / chunks⌋', chunks > 0 ? Math.floor(size / chunks) : 0, nat(size, chunks) && chunks > 0, 'entry', [size, chunks]) }
  /** RUNTIME OVERHEAD: the loader runtime as a percentage of the total. value ⌊runtime · 100 / total⌋. */
  static overhead(runtime: number, total: number): CrossFormula { return c('bundle-overhead', 'overhead(runtime, total) = ⌊runtime · 100 / total⌋', total > 0 ? Math.floor((runtime * 100) / total) : 0, nat(runtime, total) && total > 0 && runtime <= total, 'overhead', [runtime, total]) }
}

for (const name of ['budget', 'chunks', 'dedupe', 'entry', 'gzip', 'overhead', 'split', 'treeshake'] as const)
  hexRegisterOf('bundle', name, (BundleFormulas[name] as (...x: unknown[]) => unknown).bind(BundleFormulas))
