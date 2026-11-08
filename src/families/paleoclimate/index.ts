import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PALEOCLIMATE — scaffolded integer measures crossed to climate. Every output an exact finite nonnegative integer. */

const PROOF = 'paleoclimate arithmetic (proxyrecords, temperatureanomaly, co2ppm, cyclelength, isotoperatio, interglacials, resolutionyears, correlationpairs); scaffolded from the integer-op palette; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'paleoclimate', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `paleoclimate.${name}`, params })

export class PaleoclimateFormulas {
  static proxyrecords(x: number, y: number): CrossFormula { return c('paleoclimate-proxyrecords', 'proxyrecords(x, y) = x + y', x + y, nat(x, y), 'proxyrecords', [x, y]) }
  static temperatureanomaly(x: number, y: number): CrossFormula { return c('paleoclimate-temperatureanomaly', 'temperatureanomaly(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'temperatureanomaly', [x, y]) }
  static co2ppm(x: number, y: number): CrossFormula { return c('paleoclimate-co2ppm', 'co2ppm(x, y) = x · y', x * y, nat(x, y), 'co2ppm', [x, y]) }
  static cyclelength(x: number, y: number): CrossFormula { return c('paleoclimate-cyclelength', 'cyclelength(x, y) = x · y', x * y, nat(x, y), 'cyclelength', [x, y]) }
  static isotoperatio(x: number, y: number): CrossFormula { return c('paleoclimate-isotoperatio', 'isotoperatio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'isotoperatio', [x, y]) }
  static interglacials(x: number, y: number): CrossFormula { return c('paleoclimate-interglacials', 'interglacials(x, y) = x + y', x + y, nat(x, y), 'interglacials', [x, y]) }
  static resolutionyears(x: number, y: number): CrossFormula { return c('paleoclimate-resolutionyears', 'resolutionyears(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'resolutionyears', [x, y]) }
  static correlationpairs(x: number, y: number): CrossFormula { return c('paleoclimate-correlationpairs', 'correlationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'correlationpairs', [x, y]) }
}

for (const name of ['co2ppm', 'correlationpairs', 'cyclelength', 'interglacials', 'isotoperatio', 'proxyrecords', 'resolutionyears', 'temperatureanomaly'] as const)
  hexRegisterOf('paleoclimate', name, (PaleoclimateFormulas[name] as (...x: unknown[]) => unknown).bind(PaleoclimateFormulas))
