import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MICROBIOLOGY — THE LIFE OF A CULTURE, AS ARITHMETIC (chosen by the registry, not by hand). A culture is numbers: cells
 *  double over generations, the generation time, colony-forming units at a dilution, the minimum inhibitory concentration,
 *  the fraction of a population that resists a drug, an inhibition zone, live cells as a fraction, optical density over the
 *  path. Crosses to `med` — microbiology is what medicine measures. A measure. */

const PROOF = 'microbiology arithmetic (growth, generation time, cfu, mic, resistance, inhibition zone, viability, optical density); a registry domain; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'microbiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `microbiology.${name}`, params })

export class MicrobiologyFormulas {
  /** GROWTH: an initial population after so many doublings. value initial · 2^doublings. */
  static growth(initial: number, doublings: number): CrossFormula { return c('microbiology-growth', 'growth(initial, doublings) = initial · 2^doublings', initial * (2 ** doublings), nat(initial, doublings), 'growth', [initial, doublings]) }
  /** GENERATION TIME: elapsed time over the divisions seen. value ⌊time / divisions⌋. */
  static generation(time: number, divisions: number): CrossFormula { return c('microbiology-generation', 'generation(time, divisions) = ⌊time / divisions⌋', divisions > 0 ? Math.floor(time / divisions) : 0, nat(time, divisions) && divisions > 0, 'generation', [time, divisions]) }
  /** CFU: colonies counted at a dilution factor. value colonies · dilution. */
  static cfu(colonies: number, dilution: number): CrossFormula { return c('microbiology-cfu', 'cfu(colonies, dilution) = colonies · dilution', colonies * dilution, nat(colonies, dilution), 'cfu', [colonies, dilution]) }
  /** MIC: the minimum inhibitory concentration. value concentration. */
  static mic(concentration: number): CrossFormula { return c('microbiology-mic', 'mic(concentration) = concentration', concentration, nat(concentration), 'mic', [concentration]) }
  /** RESISTANCE: resistant isolates as a percentage of those tested. value ⌊resistant · 100 / tested⌋. */
  static resistance(resistant: number, tested: number): CrossFormula { return c('microbiology-resistance', 'resistance(resistant, tested) = ⌊resistant · 100 / tested⌋', tested > 0 ? Math.floor((resistant * 100) / tested) : 0, nat(resistant, tested) && tested > 0 && resistant <= tested, 'resistance', [resistant, tested]) }
  /** ZONE: the inhibition zone diameter in mm. value diameter. */
  static zone(diameter: number): CrossFormula { return c('microbiology-zone', 'zone(diameter) = diameter', diameter, nat(diameter), 'zone', [diameter]) }
  /** VIABILITY: live cells as a percentage of the total. value ⌊live · 100 / total⌋. */
  static viability(live: number, total: number): CrossFormula { return c('microbiology-viability', 'viability(live, total) = ⌊live · 100 / total⌋', total > 0 ? Math.floor((live * 100) / total) : 0, nat(live, total) && total > 0 && live <= total, 'viability', [live, total]) }
  /** OPTICAL DENSITY: absorbance over the path length. value ⌊absorbance / path⌋. */
  static od(absorbance: number, path: number): CrossFormula { return c('microbiology-od', 'od(absorbance, path) = ⌊absorbance / path⌋', path > 0 ? Math.floor(absorbance / path) : 0, nat(absorbance, path) && path > 0, 'od', [absorbance, path]) }
}

for (const name of ['cfu', 'generation', 'growth', 'mic', 'od', 'resistance', 'viability', 'zone'] as const)
  hexRegisterOf('microbiology', name, (MicrobiologyFormulas[name] as (...x: unknown[]) => unknown).bind(MicrobiologyFormulas))
