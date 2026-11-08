import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is numbers: what the tubule excretes, the clearance of
 *  a marker, the filtration rate, creatinine clearance, filtration fraction, the load filtered, what is reabsorbed, and the
 *  plasma that flows through. Crosses to `nephrology` — the glomerulus is what nephrology measures. A measure. */

const PROOF = 'glomerular arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load, reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF, ...extra }, holds, { name: `glomerular.${name}`, params })

export class GlomerularFormulas {
  /** EXCRETION: the mass leaving per minute — urine concentration at the urine flow. value uc · uf. */
  static excretion(uc: number, uf: number): CrossFormula { return c('glomerular-excretion', 'excretion(uc, uf) = uc · uf', uc * uf, nat(uc, uf), 'excretion', [uc, uf]) }
  /** CLEARANCE: the plasma volume cleared of a marker — the excreted mass over its plasma concentration. value ⌊excreted / pc⌋. */
  static clearance(excreted: number, pc: number): CrossFormula { return c('glomerular-clearance', 'clearance(excreted, pc) = ⌊excreted / pc⌋', pc > 0 ? Math.floor(excreted / pc) : 0, nat(excreted, pc) && pc > 0, 'clearance', [excreted, pc]) }
  /** FILTRATION RATE (GFR): the clearance of the filtration marker — urine conc at the urine flow over plasma conc. value ⌊uc · uf / pc⌋. */
  static filtrationrate(uc: number, uf: number, pc: number): CrossFormula { return c('glomerular-filtrationrate', 'filtrationrate(uc, uf, pc) = ⌊uc · uf / pc⌋', pc > 0 ? Math.floor((uc * uf) / pc) : 0, nat(uc, uf, pc) && pc > 0, 'filtrationrate', [uc, uf, pc]) }
  /** CREATININE CLEARANCE: GFR by creatinine — urine creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. */
  static creatinineclearance(ucr: number, uf: number, pcr: number): CrossFormula { return c('glomerular-creatinineclearance', 'creatinineclearance(ucr, uf, pcr) = ⌊ucr · uf / pcr⌋', pcr > 0 ? Math.floor((ucr * uf) / pcr) : 0, nat(ucr, uf, pcr) && pcr > 0, 'creatinineclearance', [ucr, uf, pcr]) }
  /** FILTRATION FRACTION: the share of plasma flow that is filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. */
  static filtrationfraction(gfr: number, rpf: number): CrossFormula { return c('glomerular-filtrationfraction', 'filtrationfraction(gfr, rpf) = ⌊gfr · 100 / rpf⌋', rpf > 0 ? Math.floor((gfr * 100) / rpf) : 0, nat(gfr, rpf) && rpf > 0 && gfr <= rpf, 'filtrationfraction', [gfr, rpf]) }
  /** FILTERED LOAD: the amount of a solute presented to the tubule — GFR at the plasma concentration. value gfr · pc. */
  static filteredload(gfr: number, pc: number): CrossFormula { return c('glomerular-filteredload', 'filteredload(gfr, pc) = gfr · pc', gfr * pc, nat(gfr, pc), 'filteredload', [gfr, pc]) }
  /** REABSORPTION: what the tubule reclaims — the filtered load less what is excreted. value max(0, filtered − excreted). */
  static reabsorption(filtered: number, excreted: number): CrossFormula { return c('glomerular-reabsorption', 'reabsorption(filtered, excreted) = max(0, filtered − excreted)', Math.max(0, filtered - excreted), nat(filtered, excreted), 'reabsorption', [filtered, excreted]) }
  /** PLASMA FLOW (RPF): the plasma reaching the glomerulus — renal blood flow less the cell fraction (hematocrit). value ⌊rbf · (100 − hct) / 100⌋. */
  static plasmaflow(rbf: number, hct: number): CrossFormula { return c('glomerular-plasmaflow', 'plasmaflow(rbf, hct) = ⌊rbf · (100 − hct) / 100⌋', Math.floor((rbf * Math.max(0, 100 - hct)) / 100), nat(rbf, hct) && hct <= 100, 'plasmaflow', [rbf, hct]) }
}

for (const name of ['clearance', 'creatinineclearance', 'excretion', 'filteredload', 'filtrationfraction', 'filtrationrate', 'plasmaflow', 'reabsorption'] as const)
  hexRegisterOf('glomerular', name, (GlomerularFormulas[name] as (...x: unknown[]) => unknown).bind(GlomerularFormulas))
