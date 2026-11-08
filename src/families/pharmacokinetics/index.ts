import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHARMACOKINETICS — WHAT THE BODY DOES TO A DRUG, AS ARITHMETIC. Dosing is numbers: the volume a dose distributes into,
 *  how fast it is cleared, the exposure over time, the peak reached, the steady-state level under a maintained rate, the
 *  loading dose to fill the volume, how much accumulates across doses, and the fraction an organ extracts. Crosses to
 *  `pharmacology` — kinetics is what pharmacology measures. A measure. */

const PROOF = 'pharmacokinetics arithmetic (volume of distribution, clearance, AUC exposure, Cmax, steady state, loading dose, accumulation, extraction ratio); dosing as integers; a measure crossed to pharmacology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pharmacokinetics', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name: `pharmacokinetics.${name}`, params })

export class PharmacokineticsFormulas {
  /** VOLUME OF DISTRIBUTION: the dose over the plasma concentration it reaches. value ⌊dose / conc⌋. */
  static volume(dose: number, conc: number): CrossFormula { return c('pk-volume', 'volume(dose, conc) = ⌊dose / conc⌋', conc > 0 ? Math.floor(dose / conc) : 0, nat(dose, conc) && conc > 0, 'volume', [dose, conc]) }
  /** CLEARANCE: the volume of distribution times the elimination rate constant. value vd · ke. */
  static clearancerate(vd: number, ke: number): CrossFormula { return c('pk-clearancerate', 'clearancerate(vd, ke) = vd · ke', vd * ke, nat(vd, ke), 'clearancerate', [vd, ke]) }
  /** AUC: total exposure, the dose over the clearance. value ⌊dose / cl⌋. */
  static auc(dose: number, cl: number): CrossFormula { return c('pk-auc', 'auc(dose, cl) = ⌊dose / cl⌋', cl > 0 ? Math.floor(dose / cl) : 0, nat(dose, cl) && cl > 0, 'auc', [dose, cl]) }
  /** CMAX: the peak concentration, the dose over the volume it fills. value ⌊dose / vol⌋. */
  static cmax(dose: number, vol: number): CrossFormula { return c('pk-cmax', 'cmax(dose, vol) = ⌊dose / vol⌋', vol > 0 ? Math.floor(dose / vol) : 0, nat(dose, vol) && vol > 0, 'cmax', [dose, vol]) }
  /** STEADY STATE: the level a maintained infusion rate holds against clearance. value ⌊rate / cl⌋. */
  static steadystate(rate: number, cl: number): CrossFormula { return c('pk-steadystate', 'steadystate(rate, cl) = ⌊rate / cl⌋', cl > 0 ? Math.floor(rate / cl) : 0, nat(rate, cl) && cl > 0, 'steadystate', [rate, cl]) }
  /** LOADING DOSE: the target concentration times the volume to fill. value conc · vol. */
  static loadingdose(conc: number, vol: number): CrossFormula { return c('pk-loadingdose', 'loadingdose(conc, vol) = conc · vol', conc * vol, nat(conc, vol), 'loadingdose', [conc, vol]) }
  /** ACCUMULATION: intervals to steady state, five half-lives over the dosing interval. value ⌊5 · halflife / interval⌋. */
  static accumulation(halflife: number, interval: number): CrossFormula { return c('pk-accumulation', 'accumulation(halflife, interval) = ⌊5 · halflife / interval⌋', interval > 0 ? Math.floor((5 * halflife) / interval) : 0, nat(halflife, interval) && interval > 0, 'accumulation', [halflife, interval]) }
  /** EXTRACTION RATIO: the fraction an organ clears of what flows through it, as a percentage. value ⌊cl · 100 / flow⌋. */
  static extraction(cl: number, flow: number): CrossFormula { return c('pk-extraction', 'extraction(cl, flow) = ⌊cl · 100 / flow⌋', flow > 0 ? Math.floor((cl * 100) / flow) : 0, nat(cl, flow) && flow > 0 && cl <= flow, 'extraction', [cl, flow]) }
}

for (const name of ['accumulation', 'auc', 'clearancerate', 'cmax', 'extraction', 'loadingdose', 'steadystate', 'volume'] as const)
  hexRegisterOf('pharmacokinetics', name, (PharmacokineticsFormulas[name] as (...x: unknown[]) => unknown).bind(PharmacokineticsFormulas))
