import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE SCORED INSTRUMENTS AND MEASUREMENT REGRESSIONS court experts compute. Even the disciplines that look like pure
 *  opinion run on arithmetic: a psychologist totals a PCL-R or a Static-99R and reads a band; an anthropologist puts a
 *  femur length through the Trotter-Gleser regression for stature; a linguist computes Flesch reading ease; a
 *  radiologist reads Hounsfield units; a polygrapher sums ESS scores. These formulas ARE those measures, exact and at a
 *  hex address. Two honesties the formulas carry: the score is a measure, never the verdict — the opinion is the
 *  expert's; and some instruments (polygraph, and bite-mark odontology) are scientifically contested and often
 *  inadmissible, which the reading states. Develops the psychology, anthropology, linguistics, radiology and polygraph
 *  leads as the capabilities they actually are. */

const PROOF = 'PCL-R (0–40, ≥30 NA cutoff); Static-99R risk bands; Trotter-Gleser stature regression; Flesch reading ease; Hounsfield unit tissue ranges; ESS polygraph scoring (contested, often inadmissible)'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scale', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `scale.${name}`, params })

export class ScaleFormulas {
  /** PCL-R psychopathy score (0–40): 1 when it meets the common North-American research cutoff of 30. The score is a
   *  measure; the clinical and legal conclusion is the examiner's. */
  static pclr(score: number): CrossFormula { return f('scale-pclr', 'pclr(score) = [score ≥ 30] (PCL-R NA research cutoff, 0–40)', score >= 30 ? 1 : 0, nat(score) && score <= 40, 'pclr', [score], { band: score >= 30 ? 'meets cutoff' : 'below cutoff' }) }
  /** Static-99R recidivism-risk band from the total score: 1 low (≤0), 2 below-average (1–2), 3 average (3–4), 4 above-average (5), 5 well-above (≥6). */
  static static99(score: number): CrossFormula { const band = score <= 0 ? 1 : score <= 2 ? 2 : score <= 4 ? 3 : score === 5 ? 4 : 5; return f('scale-static99', 'static99(score) → risk band 1..5', band, nat(score) && score <= 12, 'static99', [score], { band: ['', 'low', 'below average', 'average', 'above average', 'well above average'][band] }) }
  /** Stature in cm from a femur length (mm), Trotter-Gleser for males: 2.38·(femur/10) + 61 cm. The jurisdiction's own
   *  population table refines it; this is the classic regression. */
  static stature(femurMm: number): CrossFormula { return f('scale-stature', 'stature(femurMm) = 2.38 · femur_cm + 61 (Trotter-Gleser, male)', Math.round(2.38 * (femurMm / 10) + 61), nat(femurMm) && femurMm > 0, 'stature', [femurMm], { cm: true }) }
  /** Flesch reading ease (authorship / document readability): 206.835 − 1.015·(words/sentences) − 84.6·(syllables/words). */
  static flesch(sentences: number, words: number, syllables: number): CrossFormula { return f('scale-flesch', 'flesch = 206.835 − 1.015·(words/sentences) − 84.6·(syllables/words)', sentences > 0 && words > 0 ? Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)) : 0, nat(sentences, words, syllables) && sentences > 0 && words > 0, 'flesch', [sentences, words, syllables]) }
  /** Hounsfield-unit tissue class a radiologist reads: 1 air (≤ −900), 2 fat (−100..−50), 3 water/fluid (−10..+15), 4 soft tissue (+20..+80), 5 bone (≥ +300). value the class, 0 between bands. */
  static hounsfield(huPlus1000: number): CrossFormula { const hu = huPlus1000 - 1000; const c = hu <= -900 ? 1 : hu >= -100 && hu <= -50 ? 2 : hu >= -10 && hu <= 15 ? 3 : hu >= 20 && hu <= 80 ? 4 : hu >= 300 ? 5 : 0; return f('scale-hounsfield', 'hounsfield(HU+1000) → tissue class 1 air .. 5 bone', c, nat(huPlus1000), 'hounsfield', [huPlus1000], { hu, tissue: ['between bands', 'air', 'fat', 'fluid', 'soft tissue', 'bone'][c] }) }
  /** ESS polygraph total score → call: 2 no-deception-indicated (≥ +2), 1 deception-indicated (≤ −4), 0 inconclusive.
   *  CONTESTED: polygraph evidence is scientifically disputed and inadmissible in many courts; this scores the test, it
   *  does not establish truth. (Offset: the raw score + 100.) */
  static polygraph(scorePlus100: number): CrossFormula { const s = scorePlus100 - 100; const call = s >= 2 ? 2 : s <= -4 ? 1 : 0; return f('scale-polygraph', 'polygraph(score+100) → 2 NDI / 1 DI / 0 inconclusive (ESS). CONTESTED, often inadmissible', call, nat(scorePlus100), 'polygraph', [scorePlus100], { score: s, call: ['inconclusive', 'deception indicated', 'no deception indicated'][call], admissible: 'contested — often excluded' }) }
}

for (const name of ['flesch', 'hounsfield', 'pclr', 'polygraph', 'static99', 'stature'] as const)
  hexRegisterOf('scale', name, (ScaleFormulas[name] as (...x: unknown[]) => unknown).bind(ScaleFormulas))
