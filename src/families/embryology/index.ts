import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMBRYOLOGY — EARLY DEVELOPMENT, AS ARITHMETIC. Growth is numbers: days gestated, cells per hour, the share of embryos
 *  viable, implanted, reaching blastocyst, fragmented or differentiated, and a morphology score. Crosses to `med` —
 *  embryology is what medicine measures at the start. A measure. */

const PROOF = 'embryology arithmetic (gestation, cleavage, viability, implantation, blastocyst, fragmentation, morphology, differentiation); a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'embryology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `embryology.${name}`, params })

export class EmbryologyFormulas {
  /** GESTATION: the days carried. value days. */
  static gestation(days: number): CrossFormula { return c('embryology-gestation', 'gestation(days) = days', days, nat(days), 'gestation', [days]) }
  /** CLEAVAGE: cells divided over the hours. value ⌊cells / hours⌋. */
  static cleavage(cells: number, hours: number): CrossFormula { return c('embryology-cleavage', 'cleavage(cells, hours) = ⌊cells / hours⌋', hours > 0 ? Math.floor(cells / hours) : 0, nat(cells, hours) && hours > 0, 'cleavage', [cells, hours]) }
  /** VIABILITY as a percentage. value ⌊viable · 100 / embryos⌋. */
  static viability(viable: number, embryos: number): CrossFormula { return c('embryology-viability', 'viability(viable, embryos) = ⌊viable · 100 / embryos⌋', embryos > 0 ? Math.floor((viable * 100) / embryos) : 0, nat(viable, embryos) && embryos > 0 && viable <= embryos, 'viability', [viable, embryos]) }
  /** IMPLANTATION as a percentage. value ⌊implanted · 100 / transferred⌋. */
  static implantation(implanted: number, transferred: number): CrossFormula { return c('embryology-implantation', 'implantation(implanted, transferred) = ⌊implanted · 100 / transferred⌋', transferred > 0 ? Math.floor((implanted * 100) / transferred) : 0, nat(implanted, transferred) && transferred > 0 && implanted <= transferred, 'implantation', [implanted, transferred]) }
  /** BLASTOCYST: the share fertilized that reach blastocyst. value ⌊reached · 100 / fertilized⌋. */
  static blastocyst(reached: number, fertilized: number): CrossFormula { return c('embryology-blastocyst', 'blastocyst(reached, fertilized) = ⌊reached · 100 / fertilized⌋', fertilized > 0 ? Math.floor((reached * 100) / fertilized) : 0, nat(reached, fertilized) && fertilized > 0 && reached <= fertilized, 'blastocyst', [reached, fertilized]) }
  /** FRAGMENTATION as a percentage of volume. value ⌊fragmented · 100 / volume⌋. */
  static fragmentation(fragmented: number, volume: number): CrossFormula { return c('embryology-fragmentation', 'fragmentation(fragmented, volume) = ⌊fragmented · 100 / volume⌋', volume > 0 ? Math.floor((fragmented * 100) / volume) : 0, nat(fragmented, volume) && volume > 0 && fragmented <= volume, 'fragmentation', [fragmented, volume]) }
  /** MORPHOLOGY: the grading score. value score. */
  static morphology(score: number): CrossFormula { return c('embryology-morphology', 'morphology(score) = score', score, nat(score), 'morphology', [score]) }
  /** DIFFERENTIATION as a percentage. value ⌊differentiated · 100 / total⌋. */
  static differentiation(differentiated: number, total: number): CrossFormula { return c('embryology-differentiation', 'differentiation(differentiated, total) = ⌊differentiated · 100 / total⌋', total > 0 ? Math.floor((differentiated * 100) / total) : 0, nat(differentiated, total) && total > 0 && differentiated <= total, 'differentiation', [differentiated, total]) }
}

for (const name of ['blastocyst', 'cleavage', 'differentiation', 'fragmentation', 'gestation', 'implantation', 'morphology', 'viability'] as const)
  hexRegisterOf('embryology', name, (EmbryologyFormulas[name] as (...x: unknown[]) => unknown).bind(EmbryologyFormulas))
