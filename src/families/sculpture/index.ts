import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCULPTURE — scaffolded integer measures crossed to materials. Every output an exact finite nonnegative integer. */

const PROOF = 'sculpture arithmetic (volume, masskg, removalratio, facetcount, supportpoints, scaleratio, toolpasses, balancemargin); scaffolded from the integer-op palette; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sculpture', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `sculpture.${name}`, params })

export class SculptureFormulas {
  static volume(x: number, y: number, z: number): CrossFormula { return c('sculpture-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  static masskg(x: number, y: number): CrossFormula { return c('sculpture-masskg', 'masskg(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'masskg', [x, y]) }
  static removalratio(x: number, y: number): CrossFormula { return c('sculpture-removalratio', 'removalratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'removalratio', [x, y]) }
  static facetcount(x: number, y: number): CrossFormula { return c('sculpture-facetcount', 'facetcount(x, y) = x · y', x * y, nat(x, y), 'facetcount', [x, y]) }
  static supportpoints(x: number, y: number): CrossFormula { return c('sculpture-supportpoints', 'supportpoints(x, y) = x + y', x + y, nat(x, y), 'supportpoints', [x, y]) }
  static scaleratio(x: number, y: number): CrossFormula { return c('sculpture-scaleratio', 'scaleratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'scaleratio', [x, y]) }
  static toolpasses(x: number, y: number): CrossFormula { return c('sculpture-toolpasses', 'toolpasses(x, y) = x · y', x * y, nat(x, y), 'toolpasses', [x, y]) }
  static balancemargin(x: number, y: number): CrossFormula { return c('sculpture-balancemargin', 'balancemargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'balancemargin', [x, y]) }
}

for (const name of ['balancemargin', 'facetcount', 'masskg', 'removalratio', 'scaleratio', 'supportpoints', 'toolpasses', 'volume'] as const)
  hexRegisterOf('sculpture', name, (SculptureFormulas[name] as (...x: unknown[]) => unknown).bind(SculptureFormulas))
