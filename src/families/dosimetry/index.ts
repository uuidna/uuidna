import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DOSIMETRY — RADIATION DOSE AS ARITHMETIC (chosen by the physics registry, not by hand). Dose is numbers: energy
 *  deposited per mass, the equivalent dose a radiation weighting gives, the effective dose a tissue carries, the rate it
 *  arrives at, how a treatment splits into fractions, the cumulative course, the shielding layers a thickness is, and the
 *  exposure time a target needs. Crosses to `radiology` — dosimetry is what radiology measures. A measure. */

const PROOF = 'dosimetry arithmetic (absorbed dose, equivalent dose, effective dose, dose rate, fractionation, cumulative, shielding, exposure time); the physics registry\'s uncovered dose domain; a measure crossed to radiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dosimetry', dst: 'radiology', formula, value, proof: PROOF, ...extra }, holds, { name: `dosimetry.${name}`, params })

export class DosimetryFormulas {
  /** ABSORBED DOSE: energy deposited over mass (Gray = J/kg). value ⌊energy / mass⌋. */
  static absorbeddose(energy: number, mass: number): CrossFormula { return c('dosimetry-absorbeddose', 'absorbeddose(energy, mass) = ⌊energy / mass⌋', mass > 0 ? Math.floor(energy / mass) : 0, nat(energy, mass) && mass > 0, 'absorbeddose', [energy, mass]) }
  /** EQUIVALENT DOSE: absorbed dose weighted by the radiation (Sievert = Gray · wR). value dose · wr. */
  static equivalentdose(dose: number, wr: number): CrossFormula { return c('dosimetry-equivalentdose', 'equivalentdose(dose, wr) = dose · wr', dose * wr, nat(dose, wr), 'equivalentdose', [dose, wr]) }
  /** EFFECTIVE DOSE: equivalent dose weighted by the tissue (wT as a percent). value ⌊dose · wt / 100⌋. */
  static effectivedose(dose: number, wt: number): CrossFormula { return c('dosimetry-effectivedose', 'effectivedose(dose, wt) = ⌊dose · wt / 100⌋', Math.floor((dose * wt) / 100), nat(dose, wt) && wt <= 100, 'effectivedose', [dose, wt]) }
  /** DOSE RATE: dose over the time it took. value ⌊dose / time⌋. */
  static doserate(dose: number, time: number): CrossFormula { return c('dosimetry-doserate', 'doserate(dose, time) = ⌊dose / time⌋', time > 0 ? Math.floor(dose / time) : 0, nat(dose, time) && time > 0, 'doserate', [dose, time]) }
  /** FRACTIONATION: a total dose split into equal fractions, the dose per fraction. value ⌊total / fractions⌋. */
  static fractionation(total: number, fractions: number): CrossFormula { return c('dosimetry-fractionation', 'fractionation(total, fractions) = ⌊total / fractions⌋', fractions > 0 ? Math.floor(total / fractions) : 0, nat(total, fractions) && fractions > 0, 'fractionation', [total, fractions]) }
  /** CUMULATIVE: dose per session over a course of sessions. value perSession · sessions. */
  static cumulative(perSession: number, sessions: number): CrossFormula { return c('dosimetry-cumulative', 'cumulative(perSession, sessions) = perSession · sessions', perSession * sessions, nat(perSession, sessions), 'cumulative', [perSession, sessions]) }
  /** SHIELDING: the half-value layers a thickness is, at a half-value-layer size. value ⌈thickness / hvl⌉. */
  static shielding(thickness: number, hvl: number): CrossFormula { return c('dosimetry-shielding', 'shielding(thickness, hvl) = ⌈thickness / hvl⌉', hvl > 0 ? Math.ceil(thickness / hvl) : 0, nat(thickness, hvl) && hvl > 0, 'shielding', [thickness, hvl]) }
  /** EXPOSURE TIME: the time to reach a target dose at a rate. value ⌈target / rate⌉. */
  static exposuretime(target: number, rate: number): CrossFormula { return c('dosimetry-exposuretime', 'exposuretime(target, rate) = ⌈target / rate⌉', rate > 0 ? Math.ceil(target / rate) : 0, nat(target, rate) && rate > 0, 'exposuretime', [target, rate]) }
}

for (const name of ['absorbeddose', 'cumulative', 'doserate', 'effectivedose', 'equivalentdose', 'exposuretime', 'fractionation', 'shielding'] as const)
  hexRegisterOf('dosimetry', name, (DosimetryFormulas[name] as (...x: unknown[]) => unknown).bind(DosimetryFormulas))
