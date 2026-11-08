import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEAVENING — scaffolded integer measures crossed to biochemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'leavening arithmetic (riseratio, co2volume, fermentationrate, yeastactivity, doublingtime, gasretention, acidityph, ovenspring); scaffolded from the integer-op palette; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'leavening', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `leavening.${name}`, params })

export class LeaveningFormulas {
  static riseratio(x: number, y: number): CrossFormula { return c('leavening-riseratio', 'riseratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'riseratio', [x, y]) }
  static co2volume(x: number, y: number): CrossFormula { return c('leavening-co2volume', 'co2volume(x, y) = x · y', x * y, nat(x, y), 'co2volume', [x, y]) }
  static fermentationrate(x: number, y: number): CrossFormula { return c('leavening-fermentationrate', 'fermentationrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'fermentationrate', [x, y]) }
  static yeastactivity(x: number, y: number): CrossFormula { return c('leavening-yeastactivity', 'yeastactivity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yeastactivity', [x, y]) }
  static doublingtime(x: number, y: number): CrossFormula { return c('leavening-doublingtime', 'doublingtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'doublingtime', [x, y]) }
  static gasretention(x: number, y: number): CrossFormula { return c('leavening-gasretention', 'gasretention(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'gasretention', [x, y]) }
  static acidityph(x: number, y: number): CrossFormula { return c('leavening-acidityph', 'acidityph(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'acidityph', [x, y]) }
  static ovenspring(x: number, y: number): CrossFormula { return c('leavening-ovenspring', 'ovenspring(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'ovenspring', [x, y]) }
}

for (const name of ['acidityph', 'co2volume', 'doublingtime', 'fermentationrate', 'gasretention', 'ovenspring', 'riseratio', 'yeastactivity'] as const)
  hexRegisterOf('leavening', name, (LeaveningFormulas[name] as (...x: unknown[]) => unknown).bind(LeaveningFormulas))
