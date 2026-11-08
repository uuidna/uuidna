import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STRENGTH — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'strength arithmetic (volume, intensity, tonnage, density, relativestrength, restratio, progression, workcapacity); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'strength', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `strength.${name}`, params })

export class StrengthFormulas {
  static volume(x: number, y: number, z: number): CrossFormula { return c('strength-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  static intensity(x: number, y: number): CrossFormula { return c('strength-intensity', 'intensity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'intensity', [x, y]) }
  static tonnage(x: number, y: number): CrossFormula { return c('strength-tonnage', 'tonnage(x, y) = x · y', x * y, nat(x, y), 'tonnage', [x, y]) }
  static density(x: number, y: number): CrossFormula { return c('strength-density', 'density(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'density', [x, y]) }
  static relativestrength(x: number, y: number): CrossFormula { return c('strength-relativestrength', 'relativestrength(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'relativestrength', [x, y]) }
  static restratio(x: number, y: number): CrossFormula { return c('strength-restratio', 'restratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'restratio', [x, y]) }
  static progression(x: number, y: number): CrossFormula { return c('strength-progression', 'progression(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'progression', [x, y]) }
  static workcapacity(x: number, y: number): CrossFormula { return c('strength-workcapacity', 'workcapacity(x, y) = x · y', x * y, nat(x, y), 'workcapacity', [x, y]) }
}

for (const name of ['density', 'intensity', 'progression', 'relativestrength', 'restratio', 'tonnage', 'volume', 'workcapacity'] as const)
  hexRegisterOf('strength', name, (StrengthFormulas[name] as (...x: unknown[]) => unknown).bind(StrengthFormulas))
