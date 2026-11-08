import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry every cell runs, not chosen by hand). Breaking
 *  glucose is counting: the pyruvate and NADH it yields, the ATP invested in the prep phase, the net ATP, the lactate of
 *  fermentation, the glucose rebuilt by gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis
 *  is what biochemistry balances. A measure. */

const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glycolysis', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })

export class GlycolysisFormulas {
  /** FLUX: glucose molecules broken per unit time. value ⌊glucose / seconds⌋. */
  static flux(glucose: number, seconds: number): CrossFormula { return c('glycolysis-flux', 'flux(glucose, seconds) = ⌊glucose / seconds⌋', seconds > 0 ? Math.floor(glucose / seconds) : 0, nat(glucose, seconds) && seconds > 0, 'flux', [glucose, seconds]) }
  /** GLUCONEOGENESIS: glucose rebuilt from pyruvate (2 pyruvate per glucose). value ⌊pyruvate / 2⌋. */
  static gluconeogenesis(pyruvate: number): CrossFormula { return c('glycolysis-gluconeogenesis', 'gluconeogenesis(pyruvate) = ⌊pyruvate / 2⌋', Math.floor(pyruvate / 2), nat(pyruvate), 'gluconeogenesis', [pyruvate]) }
  /** GLUCOSE CONSUMED: from net ATP, 2 ATP per glucose. value ⌊atp / 2⌋. */
  static glucoseconsumed(atp: number): CrossFormula { return c('glycolysis-glucoseconsumed', 'glucoseconsumed(atp) = ⌊atp / 2⌋', Math.floor(atp / 2), nat(atp), 'glucoseconsumed', [atp]) }
  /** LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. */
  static lactate(glucose: number): CrossFormula { return c('glycolysis-lactate', 'lactate(glucose) = 2 · glucose', 2 * glucose, nat(glucose), 'lactate', [glucose]) }
  /** NADH: 2 NADH reduced per glucose. value 2 · glucose. */
  static nadh(glucose: number): CrossFormula { return c('glycolysis-nadh', 'nadh(glucose) = 2 · glucose', 2 * glucose, nat(glucose), 'nadh', [glucose]) }
  /** NET ATP: the payoff phase (4 per glucose) less the ATP invested. value max(0, 4 · glucose − invested). */
  static netatp(glucose: number, invested: number): CrossFormula { return c('glycolysis-netatp', 'netatp(glucose, invested) = max(0, 4 · glucose − invested)', Math.max(0, 4 * glucose - invested), nat(glucose, invested), 'netatp', [glucose, invested]) }
  /** PHOSPHORYLATION: the prep phase invests 2 ATP per glucose (hexokinase, PFK). value 2 · glucose. */
  static phosphorylation(glucose: number): CrossFormula { return c('glycolysis-phosphorylation', 'phosphorylation(glucose) = 2 · glucose', 2 * glucose, nat(glucose), 'phosphorylation', [glucose]) }
  /** PYRUVATE: 2 pyruvate per glucose. value 2 · glucose. */
  static pyruvate(glucose: number): CrossFormula { return c('glycolysis-pyruvate', 'pyruvate(glucose) = 2 · glucose', 2 * glucose, nat(glucose), 'pyruvate', [glucose]) }
}

for (const name of ['flux', 'gluconeogenesis', 'glucoseconsumed', 'lactate', 'nadh', 'netatp', 'phosphorylation', 'pyruvate'] as const)
  hexRegisterOf('glycolysis', name, (GlycolysisFormulas[name] as (...x: unknown[]) => unknown).bind(GlycolysisFormulas))
