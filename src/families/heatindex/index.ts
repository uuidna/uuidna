import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEATINDEX — scaffolded integer measures crossed to weather. Every output an exact finite nonnegative integer. */

const PROOF = 'heatindex arithmetic (apparenttemp, humidityfactor, dangerlevel, discomfortindex, coolingload, exposureminutes, riskpct, feelsdelta); scaffolded from the integer-op palette; a measure crossed to weather'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'heatindex', dst: 'weather', formula, value, proof: PROOF, ...extra }, holds, { name: `heatindex.${name}`, params })

export class HeatindexFormulas {
  static apparenttemp(x: number, y: number): CrossFormula { return c('heatindex-apparenttemp', 'apparenttemp(x, y) = x + y', x + y, nat(x, y), 'apparenttemp', [x, y]) }
  static humidityfactor(x: number, y: number): CrossFormula { return c('heatindex-humidityfactor', 'humidityfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'humidityfactor', [x, y]) }
  static dangerlevel(x: number, y: number): CrossFormula { return c('heatindex-dangerlevel', 'dangerlevel(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'dangerlevel', [x, y]) }
  static discomfortindex(x: number, y: number): CrossFormula { return c('heatindex-discomfortindex', 'discomfortindex(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'discomfortindex', [x, y]) }
  static coolingload(x: number, y: number): CrossFormula { return c('heatindex-coolingload', 'coolingload(x, y) = x · y', x * y, nat(x, y), 'coolingload', [x, y]) }
  static exposureminutes(x: number, y: number): CrossFormula { return c('heatindex-exposureminutes', 'exposureminutes(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'exposureminutes', [x, y]) }
  static riskpct(x: number, y: number): CrossFormula { return c('heatindex-riskpct', 'riskpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'riskpct', [x, y]) }
  static feelsdelta(x: number, y: number): CrossFormula { return c('heatindex-feelsdelta', 'feelsdelta(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'feelsdelta', [x, y]) }
}

for (const name of ['apparenttemp', 'coolingload', 'dangerlevel', 'discomfortindex', 'exposureminutes', 'feelsdelta', 'humidityfactor', 'riskpct'] as const)
  hexRegisterOf('heatindex', name, (HeatindexFormulas[name] as (...x: unknown[]) => unknown).bind(HeatindexFormulas))
