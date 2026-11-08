import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PACING — scaffolded integer measures crossed to sports. Every output an exact finite nonnegative integer. */

const PROOF = 'pacing arithmetic (pace, speed, spliteven, negativesplit, targettime, lapaverage, effortzone, fade); scaffolded from the integer-op palette; a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pacing', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `pacing.${name}`, params })

export class PacingFormulas {
  static pace(x: number, y: number): CrossFormula { return c('pacing-pace', 'pace(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pace', [x, y]) }
  static speed(x: number, y: number): CrossFormula { return c('pacing-speed', 'speed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'speed', [x, y]) }
  static spliteven(x: number, y: number): CrossFormula { return c('pacing-spliteven', 'spliteven(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'spliteven', [x, y]) }
  static negativesplit(x: number, y: number): CrossFormula { return c('pacing-negativesplit', 'negativesplit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'negativesplit', [x, y]) }
  static targettime(x: number, y: number): CrossFormula { return c('pacing-targettime', 'targettime(x, y) = x · y', x * y, nat(x, y), 'targettime', [x, y]) }
  static lapaverage(x: number, y: number): CrossFormula { return c('pacing-lapaverage', 'lapaverage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lapaverage', [x, y]) }
  static effortzone(x: number, y: number): CrossFormula { return c('pacing-effortzone', 'effortzone(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'effortzone', [x, y]) }
  static fade(x: number, y: number): CrossFormula { return c('pacing-fade', 'fade(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'fade', [x, y]) }
}

for (const name of ['effortzone', 'fade', 'lapaverage', 'negativesplit', 'pace', 'speed', 'spliteven', 'targettime'] as const)
  hexRegisterOf('pacing', name, (PacingFormulas[name] as (...x: unknown[]) => unknown).bind(PacingFormulas))
