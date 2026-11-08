import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BAKING — THE BAKER'S ARITHMETIC (chosen by the registry, not by hand). A loaf is numbers: water against flour as a
 *  baker's percentage, how far the dough rose, oven spring, crumb openness, the proof rate, Fahrenheit to Celsius, and a
 *  recipe scaled to a batch. Crosses to `cuisine` — baking is the exact corner of cooking. A measure. */

const PROOF = 'baking arithmetic (hydration, leavening, baker\'s percent, oven spring, crumb, proof, temperature, scaling); a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'baking', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `baking.${name}`, params })

export class BakingFormulas {
  /** HYDRATION: water against flour as a baker's percentage. value ⌊water · 100 / flour⌋. */
  static hydration(water: number, flour: number): CrossFormula { return c('baking-hydration', 'hydration(water, flour) = ⌊water · 100 / flour⌋', flour > 0 ? Math.floor((water * 100) / flour) : 0, nat(water, flour) && flour > 0, 'hydration', [water, flour]) }
  /** LEAVENING: how far the dough rose over where it started, as a percentage. value ⌊risen · 100 / initial⌋. */
  static leavening(risen: number, initial: number): CrossFormula { return c('baking-leavening', 'leavening(risen, initial) = ⌊risen · 100 / initial⌋', initial > 0 ? Math.floor((risen * 100) / initial) : 0, nat(risen, initial) && initial > 0, 'leavening', [risen, initial]) }
  /** BAKER'S PERCENT: any ingredient against flour. value ⌊ingredient · 100 / flour⌋. */
  static bakerspercent(ingredient: number, flour: number): CrossFormula { return c('baking-bakerspercent', 'bakerspercent(ingredient, flour) = ⌊ingredient · 100 / flour⌋', flour > 0 ? Math.floor((ingredient * 100) / flour) : 0, nat(ingredient, flour) && flour > 0, 'bakerspercent', [ingredient, flour]) }
  /** OVEN SPRING: the rise gained in the oven above the proofed height. value max(0, final − proofed). */
  static ovenspring(final: number, proofed: number): CrossFormula { return c('baking-ovenspring', 'ovenspring(final, proofed) = max(0, final − proofed)', Math.max(0, final - proofed), nat(final, proofed), 'ovenspring', [final, proofed]) }
  /** CRUMB: openness as volume over mass. value ⌊volume / mass⌋. */
  static crumb(volume: number, mass: number): CrossFormula { return c('baking-crumb', 'crumb(volume, mass) = ⌊volume / mass⌋', mass > 0 ? Math.floor(volume / mass) : 0, nat(volume, mass) && mass > 0, 'crumb', [volume, mass]) }
  /** PROOF: rise rate as risen over time. value ⌊risen / time⌋. */
  static proof(risen: number, time: number): CrossFormula { return c('baking-proof', 'proof(risen, time) = ⌊risen / time⌋', time > 0 ? Math.floor(risen / time) : 0, nat(risen, time) && time > 0, 'proof', [risen, time]) }
  /** TEMPERATURE: Fahrenheit to Celsius. value ⌊(fahrenheit − 32) · 5 / 9⌋. */
  static temperature(fahrenheit: number): CrossFormula { return c('baking-temperature', 'temperature(fahrenheit) = ⌊(fahrenheit − 32) · 5 / 9⌋', Math.floor(((fahrenheit - 32) * 5) / 9), nat(fahrenheit), 'temperature', [fahrenheit]) }
  /** SCALING: a per-loaf amount across a batch. value perloaf · loaves. */
  static scaling(perloaf: number, loaves: number): CrossFormula { return c('baking-scaling', 'scaling(perloaf, loaves) = perloaf · loaves', perloaf * loaves, nat(perloaf, loaves), 'scaling', [perloaf, loaves]) }
}

for (const name of ['bakerspercent', 'crumb', 'hydration', 'leavening', 'ovenspring', 'proof', 'scaling', 'temperature'] as const)
  hexRegisterOf('baking', name, (BakingFormulas[name] as (...x: unknown[]) => unknown).bind(BakingFormulas))
