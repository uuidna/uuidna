import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STAGECRAFT — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'stagecraft arithmetic (flats, riggingpoints, stagearea, scenechanges, trusscombos, sightlines, weightkg, loadmargin); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stagecraft', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `stagecraft.${name}`, params })

export class StagecraftFormulas {
  static flats(x: number, y: number): CrossFormula { return c('stagecraft-flats', 'flats(x, y) = x + y', x + y, nat(x, y), 'flats', [x, y]) }
  static riggingpoints(x: number, y: number): CrossFormula { return c('stagecraft-riggingpoints', 'riggingpoints(x, y) = x · y', x * y, nat(x, y), 'riggingpoints', [x, y]) }
  static stagearea(x: number, y: number): CrossFormula { return c('stagecraft-stagearea', 'stagearea(x, y) = x · y', x * y, nat(x, y), 'stagearea', [x, y]) }
  static scenechanges(x: number, y: number): CrossFormula { return c('stagecraft-scenechanges', 'scenechanges(x, y) = x + y', x + y, nat(x, y), 'scenechanges', [x, y]) }
  static trusscombos(x: number, y: number): CrossFormula { return c('stagecraft-trusscombos', 'trusscombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'trusscombos', [x, y]) }
  static sightlines(x: number, y: number): CrossFormula { return c('stagecraft-sightlines', 'sightlines(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'sightlines', [x, y]) }
  static weightkg(x: number, y: number): CrossFormula { return c('stagecraft-weightkg', 'weightkg(x, y) = x · y', x * y, nat(x, y), 'weightkg', [x, y]) }
  static loadmargin(x: number, y: number): CrossFormula { return c('stagecraft-loadmargin', 'loadmargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'loadmargin', [x, y]) }
}

for (const name of ['flats', 'loadmargin', 'riggingpoints', 'scenechanges', 'sightlines', 'stagearea', 'trusscombos', 'weightkg'] as const)
  hexRegisterOf('stagecraft', name, (StagecraftFormulas[name] as (...x: unknown[]) => unknown).bind(StagecraftFormulas))
