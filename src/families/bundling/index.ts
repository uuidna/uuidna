import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BUNDLING — SHIPPING THE SMALLEST BUILD, AS ARITHMETIC (chosen by the build registry, not by hand). Packing a build is
 *  numbers: the chunks modules split into, the bytes tree-shaking drops, the minify and gzip ratios, the split points a
 *  route graph needs, a cache-busting fingerprint, load time over the wire, and the duplicate copies deduped. Crosses to
 *  `compression` — bundling is compression applied to a build. A measure. */

const PROOF = 'bundling arithmetic (chunks, tree-shake, minify ratio, gzip ratio, split points, cache hash, load time, dedupe); the build pipeline as integers; a measure crossed to compression'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bundling', dst: 'compression', formula, value, proof: PROOF, ...extra }, holds, { name: `bundling.${name}`, params })

export class BundlingFormulas {
  /** CHUNKS: the chunks modules split into at a per-chunk cap. value ⌈modules / perChunk⌉. */
  static chunks(modules: number, perChunk: number): CrossFormula { return c('bundling-chunks', 'chunks(modules, perChunk) = ⌈modules / perChunk⌉', perChunk > 0 ? Math.ceil(modules / perChunk) : 0, nat(modules, perChunk) && perChunk > 0, 'chunks', [modules, perChunk]) }
  /** TREE-SHAKE: the bytes dropped as dead code. value max(0, total − used). */
  static treeshake(total: number, used: number): CrossFormula { return c('bundling-treeshake', 'treeshake(total, used) = max(0, total − used)', Math.max(0, total - used), nat(total, used) && used <= total, 'treeshake', [total, used]) }
  /** MINIFY RATIO: percent shaved by minification. value ⌊max(0, original − minified) · 100 / original⌋. */
  static minifyratio(original: number, minified: number): CrossFormula { return c('bundling-minifyratio', 'minifyratio(original, minified) = ⌊max(0, original − minified) · 100 / original⌋', original > 0 ? Math.floor((Math.max(0, original - minified) * 100) / original) : 0, nat(original, minified) && original > 0 && minified <= original, 'minifyratio', [original, minified]) }
  /** GZIP RATIO: how many times smaller after gzip. value ⌊raw / compressed⌋. */
  static gzipratio(raw: number, compressed: number): CrossFormula { return c('bundling-gzipratio', 'gzipratio(raw, compressed) = ⌊raw / compressed⌋', compressed > 0 ? Math.floor(raw / compressed) : 0, nat(raw, compressed) && compressed > 0, 'gzipratio', [raw, compressed]) }
  /** SPLIT POINTS: the code-split points a route graph needs. value routes + entries. */
  static splitpoints(routes: number, entries: number): CrossFormula { return c('bundling-splitpoints', 'splitpoints(routes, entries) = routes + entries', routes + entries, nat(routes, entries), 'splitpoints', [routes, entries]) }
  /** CACHE HASH: a cache-busting fingerprint. value (bytes · 31 + seed) mod 65536. */
  static cachehash(bytes: number, seed: number): CrossFormula { return c('bundling-cachehash', 'cachehash(bytes, seed) = (bytes · 31 + seed) mod 65536', (bytes * 31 + seed) % 65536, nat(bytes, seed), 'cachehash', [bytes, seed]) }
  /** LOAD TIME: milliseconds to ship the bytes over the wire. value ⌊bytes / bandwidth⌋. */
  static loadtime(bytes: number, bandwidth: number): CrossFormula { return c('bundling-loadtime', 'loadtime(bytes, bandwidth) = ⌊bytes / bandwidth⌋', bandwidth > 0 ? Math.floor(bytes / bandwidth) : 0, nat(bytes, bandwidth) && bandwidth > 0, 'loadtime', [bytes, bandwidth]) }
  /** DEDUPE: the duplicate copies removed. value max(0, copies − unique). */
  static dedupe(copies: number, unique: number): CrossFormula { return c('bundling-dedupe', 'dedupe(copies, unique) = max(0, copies − unique)', Math.max(0, copies - unique), nat(copies, unique) && unique <= copies, 'dedupe', [copies, unique]) }
}

for (const name of ['cachehash', 'chunks', 'dedupe', 'gzipratio', 'loadtime', 'minifyratio', 'splitpoints', 'treeshake'] as const)
  hexRegisterOf('bundling', name, (BundlingFormulas[name] as (...x: unknown[]) => unknown).bind(BundlingFormulas))
