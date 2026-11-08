import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THERMOCHEMISTRY — THE HEAT OF REACTIONS, AS ARITHMETIC (the energy a reaction gives or takes, counted exactly). Enthalpy
 *  scales with moles, entropy is heat over temperature, Gibbs is what is left after the temperature claims the entropy, the
 *  heat capacity is heat per degree, calorimetry is mass · heat · rise, bond energy sums the bonds, Hess's law sums the steps,
 *  and the activation energy is the hill a reaction climbs. Crosses to `chemistry` — thermochemistry is chemistry's energy. A measure. */

const PROOF = 'thermochemistry arithmetic (enthalpy, entropy, Gibbs free energy, heat capacity, calorimetry, bond energy, Hess\'s law, activation energy); the heat of reactions as exact integers; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'thermochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `thermochemistry.${name}`, params })

export class ThermochemistryFormulas {
  /** ENTHALPY: the heat of a reaction over its moles. value moles · deltaH. */
  static enthalpy(moles: number, deltaH: number): CrossFormula { return c('thermochemistry-enthalpy', 'enthalpy(moles, deltaH) = moles · deltaH', moles * deltaH, nat(moles, deltaH), 'enthalpy', [moles, deltaH]) }
  /** ENTROPY: heat spread over temperature. value ⌊heat / temp⌋. */
  static entropy(heat: number, temp: number): CrossFormula { return c('thermochemistry-entropy', 'entropy(heat, temp) = ⌊heat / temp⌋', temp > 0 ? Math.floor(heat / temp) : 0, nat(heat, temp) && temp > 0, 'entropy', [heat, temp]) }
  /** GIBBS FREE ENERGY: what the enthalpy keeps after the temperature claims the entropy. value max(0, deltaH − temp · deltaS). */
  static gibbs(deltaH: number, temp: number, deltaS: number): CrossFormula { return c('thermochemistry-gibbs', 'gibbs(deltaH, temp, deltaS) = max(0, deltaH − temp · deltaS)', Math.max(0, deltaH - temp * deltaS), nat(deltaH, temp, deltaS), 'gibbs', [deltaH, temp, deltaS]) }
  /** HEAT CAPACITY: heat per degree of rise. value ⌊heat / deltaTemp⌋. */
  static heatcapacity(heat: number, deltaTemp: number): CrossFormula { return c('thermochemistry-heatcapacity', 'heatcapacity(heat, deltaTemp) = ⌊heat / deltaTemp⌋', deltaTemp > 0 ? Math.floor(heat / deltaTemp) : 0, nat(heat, deltaTemp) && deltaTemp > 0, 'heatcapacity', [heat, deltaTemp]) }
  /** CALORIMETRY: the heat a mass takes to rise. value mass · specific · deltaTemp. */
  static calorimetry(mass: number, specific: number, deltaTemp: number): CrossFormula { return c('thermochemistry-calorimetry', 'calorimetry(mass, specific, deltaTemp) = mass · specific · deltaTemp', mass * specific * deltaTemp, nat(mass, specific, deltaTemp), 'calorimetry', [mass, specific, deltaTemp]) }
  /** BOND ENERGY: the energy held in equal bonds. value bonds · energy. */
  static bondenergy(bonds: number, energy: number): CrossFormula { return c('thermochemistry-bondenergy', 'bondenergy(bonds, energy) = bonds · energy', bonds * energy, nat(bonds, energy), 'bondenergy', [bonds, energy]) }
  /** HESS'S LAW: the path's enthalpy is the sum of its steps. value step1 + step2 + step3. */
  static hesslaw(step1: number, step2: number, step3: number): CrossFormula { return c('thermochemistry-hesslaw', 'hesslaw(step1, step2, step3) = step1 + step2 + step3', step1 + step2 + step3, nat(step1, step2, step3), 'hesslaw', [step1, step2, step3]) }
  /** ACTIVATION ENERGY: the hill from forward over reverse barriers. value max(0, forward − reverse). */
  static activationenergy(forward: number, reverse: number): CrossFormula { return c('thermochemistry-activationenergy', 'activationenergy(forward, reverse) = max(0, forward − reverse)', Math.max(0, forward - reverse), nat(forward, reverse), 'activationenergy', [forward, reverse]) }
}

for (const name of ['activationenergy', 'bondenergy', 'calorimetry', 'enthalpy', 'entropy', 'gibbs', 'heatcapacity', 'hesslaw'] as const)
  hexRegisterOf('thermochemistry', name, (ThermochemistryFormulas[name] as (...x: unknown[]) => unknown).bind(ThermochemistryFormulas))
