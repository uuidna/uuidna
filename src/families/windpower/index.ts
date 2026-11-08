import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WINDPOWER — scaffolded integer measures crossed to energy. Every output an exact finite nonnegative integer. */

const PROOF = 'windpower arithmetic (turbineoutput, sweptarea, capacityfactor, cutinspeed, ratedpower, tipspeedratio, farmoutput, availability); scaffolded from the integer-op palette; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'windpower', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `windpower.${name}`, params })

export class WindpowerFormulas {
  static turbineoutput(x: number, y: number): CrossFormula { return c('windpower-turbineoutput', 'turbineoutput(x, y) = x · y', x * y, nat(x, y), 'turbineoutput', [x, y]) }
  static sweptarea(x: number, y: number): CrossFormula { return c('windpower-sweptarea', 'sweptarea(x, y) = x · y', x * y, nat(x, y), 'sweptarea', [x, y]) }
  static capacityfactor(x: number, y: number): CrossFormula { return c('windpower-capacityfactor', 'capacityfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'capacityfactor', [x, y]) }
  static cutinspeed(x: number, y: number): CrossFormula { return c('windpower-cutinspeed', 'cutinspeed(x, y) = x + y', x + y, nat(x, y), 'cutinspeed', [x, y]) }
  static ratedpower(x: number, y: number): CrossFormula { return c('windpower-ratedpower', 'ratedpower(x, y) = x · y', x * y, nat(x, y), 'ratedpower', [x, y]) }
  static tipspeedratio(x: number, y: number): CrossFormula { return c('windpower-tipspeedratio', 'tipspeedratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'tipspeedratio', [x, y]) }
  static farmoutput(x: number, y: number): CrossFormula { return c('windpower-farmoutput', 'farmoutput(x, y) = x · y', x * y, nat(x, y), 'farmoutput', [x, y]) }
  static availability(x: number, y: number): CrossFormula { return c('windpower-availability', 'availability(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'availability', [x, y]) }
}

for (const name of ['availability', 'capacityfactor', 'cutinspeed', 'farmoutput', 'ratedpower', 'sweptarea', 'tipspeedratio', 'turbineoutput'] as const)
  hexRegisterOf('windpower', name, (WindpowerFormulas[name] as (...x: unknown[]) => unknown).bind(WindpowerFormulas))
