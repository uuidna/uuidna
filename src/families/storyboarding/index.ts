import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STORYBOARDING — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'storyboarding arithmetic (panels, shotcombos, framesize, sequenceorderings, aspectratio, gridcells, transitiontypes, coverage); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'storyboarding', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `storyboarding.${name}`, params })

export class StoryboardingFormulas {
  static panels(x: number, y: number): CrossFormula { return c('storyboarding-panels', 'panels(x, y) = x · y', x * y, nat(x, y), 'panels', [x, y]) }
  static shotcombos(x: number, y: number): CrossFormula { return c('storyboarding-shotcombos', 'shotcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'shotcombos', [x, y]) }
  static framesize(x: number, y: number): CrossFormula { return c('storyboarding-framesize', 'framesize(x, y) = x · y', x * y, nat(x, y), 'framesize', [x, y]) }
  static sequenceorderings(x: number): CrossFormula { return c('storyboarding-sequenceorderings', 'sequenceorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'sequenceorderings', [x]) }
  static aspectratio(x: number, y: number): CrossFormula { return c('storyboarding-aspectratio', 'aspectratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aspectratio', [x, y]) }
  static gridcells(x: number, y: number): CrossFormula { return c('storyboarding-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  static transitiontypes(x: number, y: number): CrossFormula { return c('storyboarding-transitiontypes', 'transitiontypes(x, y) = x + y', x + y, nat(x, y), 'transitiontypes', [x, y]) }
  static coverage(x: number, y: number): CrossFormula { return c('storyboarding-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['aspectratio', 'coverage', 'framesize', 'gridcells', 'panels', 'sequenceorderings', 'shotcombos', 'transitiontypes'] as const)
  hexRegisterOf('storyboarding', name, (StoryboardingFormulas[name] as (...x: unknown[]) => unknown).bind(StoryboardingFormulas))
