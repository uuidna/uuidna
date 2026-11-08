import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HAIL — scaffolded integer measures crossed to meteorology. Every output an exact finite nonnegative integer. */

const PROOF = 'hail arithmetic (diametermm, layers, updraftspeed, terminalvelocity, kineticenergy, damagescale, growthtime, massg); scaffolded from the integer-op palette; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hail', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `hail.${name}`, params })

export class HailFormulas {
  static diametermm(x: number, y: number): CrossFormula { return c('hail-diametermm', 'diametermm(x, y) = x · y', x * y, nat(x, y), 'diametermm', [x, y]) }
  static layers(x: number, y: number): CrossFormula { return c('hail-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  static updraftspeed(x: number, y: number): CrossFormula { return c('hail-updraftspeed', 'updraftspeed(x, y) = x · y', x * y, nat(x, y), 'updraftspeed', [x, y]) }
  static terminalvelocity(x: number, y: number): CrossFormula { return c('hail-terminalvelocity', 'terminalvelocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'terminalvelocity', [x, y]) }
  static kineticenergy(x: number, y: number): CrossFormula { return c('hail-kineticenergy', 'kineticenergy(x, y) = x · y', x * y, nat(x, y), 'kineticenergy', [x, y]) }
  static damagescale(x: number, y: number): CrossFormula { return c('hail-damagescale', 'damagescale(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'damagescale', [x, y]) }
  static growthtime(x: number, y: number): CrossFormula { return c('hail-growthtime', 'growthtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'growthtime', [x, y]) }
  static massg(x: number, y: number): CrossFormula { return c('hail-massg', 'massg(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'massg', [x, y]) }
}

for (const name of ['damagescale', 'diametermm', 'growthtime', 'kineticenergy', 'layers', 'massg', 'terminalvelocity', 'updraftspeed'] as const)
  hexRegisterOf('hail', name, (HailFormulas[name] as (...x: unknown[]) => unknown).bind(HailFormulas))
