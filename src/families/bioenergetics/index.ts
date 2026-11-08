import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOENERGETICS — THE ENERGY OF THE LIVING CELL, AS ARITHMETIC. Life runs on numbers: the energy an ATP hydrolysis
 *  releases, the proton-motive force across a membrane, how efficiently fuel becomes work, the Gibbs free energy of a
 *  reaction, the ATP an electron-transport chain yields, the P/O ratio, a redox potential, and the ATP a glucose repays.
 *  Crosses to `biochemistry` — bioenergetics is the thermodynamics the chemistry obeys. A measure. */

const PROOF = 'bioenergetics arithmetic (ATP hydrolysis, proton-motive force, energy efficiency, Gibbs free energy, electron transport, P/O ratio, redox potential, ATP yield); a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bioenergetics', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `bioenergetics.${name}`, params })

export class BioenergeticsFormulas {
  /** ATP HYDROLYSIS: energy released by hydrolysing moles of ATP at kJ per mole. value moles · perMole. */
  static atphydrolysis(moles: number, perMole: number): CrossFormula { return c('bioenergetics-atphydrolysis', 'atphydrolysis(moles, perMole) = moles · perMole', moles * perMole, nat(moles, perMole), 'atphydrolysis', [moles, perMole]) }
  /** ENERGY EFFICIENCY as a percentage: useful work out of the energy spent. value ⌊useful · 100 / total⌋. */
  static efficiency(useful: number, total: number): CrossFormula { return c('bioenergetics-efficiency', 'efficiency(useful, total) = ⌊useful · 100 / total⌋', total > 0 ? Math.floor((useful * 100) / total) : 0, nat(useful, total) && total > 0 && useful <= total, 'efficiency', [useful, total]) }
  /** ELECTRON TRANSPORT: the ATP produced from NADH at a per-NADH yield. value nadh · perNadh. */
  static electrontransport(nadh: number, perNadh: number): CrossFormula { return c('bioenergetics-electrontransport', 'electrontransport(nadh, perNadh) = nadh · perNadh', nadh * perNadh, nat(nadh, perNadh), 'electrontransport', [nadh, perNadh]) }
  /** GIBBS FREE ENERGY: ΔG = ΔH − T·ΔS, clamped at 0. value max(0, enthalpy − temp · entropy). */
  static gibbsfree(enthalpy: number, temp: number, entropy: number): CrossFormula { return c('bioenergetics-gibbsfree', 'gibbsfree(enthalpy, temp, entropy) = max(0, enthalpy − temp · entropy)', Math.max(0, enthalpy - temp * entropy), nat(enthalpy, temp, entropy), 'gibbsfree', [enthalpy, temp, entropy]) }
  /** PHOSPHATE (P/O) RATIO ×10: ATP made per oxygen reduced. value ⌊atp · 10 / oxygen⌋. */
  static phosphateratio(atp: number, oxygen: number): CrossFormula { return c('bioenergetics-phosphateratio', 'phosphateratio(atp, oxygen) = ⌊atp · 10 / oxygen⌋', oxygen > 0 ? Math.floor((atp * 10) / oxygen) : 0, nat(atp, oxygen) && oxygen > 0, 'phosphateratio', [atp, oxygen]) }
  /** PROTON-MOTIVE FORCE across the membrane (mV): Δψ plus 59 mV per unit of ΔpH. value psi + 59 · ph. */
  static protonmotive(psi: number, ph: number): CrossFormula { return c('bioenergetics-protonmotive', 'protonmotive(psi, ph) = psi + 59 · ph', psi + 59 * ph, nat(psi, ph), 'protonmotive', [psi, ph]) }
  /** REDOX POTENTIAL of a pair (mV): the cathode half-cell less the anode, clamped at 0. value max(0, cathode − anode). */
  static redoxpotential(cathode: number, anode: number): CrossFormula { return c('bioenergetics-redoxpotential', 'redoxpotential(cathode, anode) = max(0, cathode − anode)', Math.max(0, cathode - anode), nat(cathode, anode), 'redoxpotential', [cathode, anode]) }
  /** ATP YIELD: the ATP a cell repays per molecule of glucose. value glucose · perGlucose. */
  static yield(glucose: number, perGlucose: number): CrossFormula { return c('bioenergetics-yield', 'yield(glucose, perGlucose) = glucose · perGlucose', glucose * perGlucose, nat(glucose, perGlucose), 'yield', [glucose, perGlucose]) }
}

for (const name of ['atphydrolysis', 'efficiency', 'electrontransport', 'gibbsfree', 'phosphateratio', 'protonmotive', 'redoxpotential', 'yield'] as const)
  hexRegisterOf('bioenergetics', name, (BioenergeticsFormulas[name] as (...x: unknown[]) => unknown).bind(BioenergeticsFormulas))
