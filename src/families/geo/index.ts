import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GeoFormulas — 8 exact-integer formulas of the geo domain, each at a hex address crossing to cross; develops the geo leads. */

const PROOF = "geo counts: arcseconds(x, y) = x · y; tiles(x) = 2^x; zoomcells(x) = 2^x; gridcells(x, y) = x · y; degrees(x, y) = x / y; area(x, y) = x · y; quadkeys(x) = 2^x; waypoints(x, y) = x + y"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'geo', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `geo.${name}`, params })

export class GeoFormulas {
  /** arcseconds(x, y) = x · y. */
  static arcseconds(x: number, y: number): CrossFormula { return f('geo-arcseconds', 'arcseconds(x, y) = x · y', x * y, nat(x, y), 'arcseconds', [x, y]) }
  /** tiles(x) = 2^x. */
  static tiles(x: number): CrossFormula { return f('geo-tiles', 'tiles(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tiles', [x]) }
  /** zoomcells(x) = 2^x. */
  static zoomcells(x: number): CrossFormula { return f('geo-zoomcells', 'zoomcells(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'zoomcells', [x]) }
  /** gridcells(x, y) = x · y. */
  static gridcells(x: number, y: number): CrossFormula { return f('geo-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  /** degrees(x, y) = x / y. */
  static degrees(x: number, y: number): CrossFormula { return f('geo-degrees', 'degrees(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'degrees', [x, y]) }
  /** area(x, y) = x · y. */
  static area(x: number, y: number): CrossFormula { return f('geo-area', 'area(x, y) = x · y', x * y, nat(x, y), 'area', [x, y]) }
  /** quadkeys(x) = 2^x. */
  static quadkeys(x: number): CrossFormula { return f('geo-quadkeys', 'quadkeys(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'quadkeys', [x]) }
  /** waypoints(x, y) = x + y. */
  static waypoints(x: number, y: number): CrossFormula { return f('geo-waypoints', 'waypoints(x, y) = x + y', x + y, nat(x, y), 'waypoints', [x, y]) }
}

for (const name of ['arcseconds', 'area', 'degrees', 'gridcells', 'quadkeys', 'tiles', 'waypoints', 'zoomcells'] as const)
  hexRegisterOf('geo', name, (GeoFormulas[name] as (...x: unknown[]) => unknown).bind(GeoFormulas))
