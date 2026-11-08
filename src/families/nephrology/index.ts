import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NEPHROLOGY — THE KIDNEY, AS ARITHMETIC (chosen by the medical registry, not by hand). Renal function is numbers:
 *  filtration rate, clearance, creatinine, the filtration fraction, dialysis removal, protein in the urine, electrolyte
 *  concentration, and tubular reabsorption. Crosses to `med` — nephrology is one of medicine's measures. A measure. */

const PROOF = 'nephrology arithmetic (gfr, clearance, creatinine, filtration fraction, dialysis, proteinuria, electrolyte, reabsorption); a renal measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nephrology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `nephrology.${name}`, params })

export class NephrologyFormulas {
  /** GFR: glomerular filtration rate, filtrate volume over minutes. value ⌊filtrate / minutes⌋. */
  static gfr(filtrate: number, minutes: number): CrossFormula { return c('nephrology-gfr', 'gfr(filtrate, minutes) = ⌊filtrate / minutes⌋', minutes > 0 ? Math.floor(filtrate / minutes) : 0, nat(filtrate, minutes) && minutes > 0, 'gfr', [filtrate, minutes]) }
  /** CLEARANCE: a substance cleared, urine over plasma. value ⌊urine / plasma⌋. */
  static clearance(urine: number, plasma: number): CrossFormula { return c('nephrology-clearance', 'clearance(urine, plasma) = ⌊urine / plasma⌋', plasma > 0 ? Math.floor(urine / plasma) : 0, nat(urine, plasma) && plasma > 0, 'clearance', [urine, plasma]) }
  /** CREATININE: serum level, production over the filtration rate. value ⌊production / gfr⌋. */
  static creatinine(production: number, gfr_: number): CrossFormula { return c('nephrology-creatinine', 'creatinine(production, gfr) = ⌊production / gfr⌋', gfr_ > 0 ? Math.floor(production / gfr_) : 0, nat(production, gfr_) && gfr_ > 0, 'creatinine', [production, gfr_]) }
  /** FILTRATION FRACTION: filtered of renal flow, as a percentage. value ⌊filtered · 100 / renal⌋. */
  static filtration(filtered: number, renal: number): CrossFormula { return c('nephrology-filtration', 'filtration(filtered, renal) = ⌊filtered · 100 / renal⌋', renal > 0 ? Math.floor((filtered * 100) / renal) : 0, nat(filtered, renal) && renal > 0 && filtered <= renal, 'filtration', [filtered, renal]) }
  /** DIALYSIS: removed of the load, as a percentage. value ⌊removed · 100 / load⌋. */
  static dialysis(removed: number, load: number): CrossFormula { return c('nephrology-dialysis', 'dialysis(removed, load) = ⌊removed · 100 / load⌋', load > 0 ? Math.floor((removed * 100) / load) : 0, nat(removed, load) && load > 0 && removed <= load, 'dialysis', [removed, load]) }
  /** PROTEINURIA: protein over urine volume. value ⌊protein / volume⌋. */
  static proteinuria(protein: number, volume: number): CrossFormula { return c('nephrology-proteinuria', 'proteinuria(protein, volume) = ⌊protein / volume⌋', volume > 0 ? Math.floor(protein / volume) : 0, nat(protein, volume) && volume > 0, 'proteinuria', [protein, volume]) }
  /** ELECTROLYTE: ions over volume, a concentration. value ⌊ions / volume⌋. */
  static electrolyte(ions: number, volume: number): CrossFormula { return c('nephrology-electrolyte', 'electrolyte(ions, volume) = ⌊ions / volume⌋', volume > 0 ? Math.floor(ions / volume) : 0, nat(ions, volume) && volume > 0, 'electrolyte', [ions, volume]) }
  /** REABSORPTION: reabsorbed of filtered, as a percentage. value ⌊reabsorbed · 100 / filtered⌋. */
  static reabsorption(reabsorbed: number, filtered: number): CrossFormula { return c('nephrology-reabsorption', 'reabsorption(reabsorbed, filtered) = ⌊reabsorbed · 100 / filtered⌋', filtered > 0 ? Math.floor((reabsorbed * 100) / filtered) : 0, nat(reabsorbed, filtered) && filtered > 0 && reabsorbed <= filtered, 'reabsorption', [reabsorbed, filtered]) }
}

for (const name of ['clearance', 'creatinine', 'dialysis', 'electrolyte', 'filtration', 'gfr', 'proteinuria', 'reabsorption'] as const)
  hexRegisterOf('nephrology', name, (NephrologyFormulas[name] as (...x: unknown[]) => unknown).bind(NephrologyFormulas))
