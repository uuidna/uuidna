import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RHETORIC — THE ART OF PERSUASION, AS ARITHMETIC. The classical appeals are numbers: credibility per source (ethos),
 *  emotional weight as a share of the whole (pathos), evidence per claim (logos), the fraction of an audience convinced
 *  (persuasion), syllables per line (cadence), repetition as a share of words (emphasis), the share of readers who
 *  understood (clarity), and the devices counted. Crosses to `linguistics` — rhetoric is language wielded. A measure. */

const PROOF = 'rhetoric arithmetic (ethos per source, pathos share, logos per claim, persuasion, cadence, emphasis, clarity, devices); the appeals as whole numbers; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rhetoric', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `rhetoric.${name}`, params })

export class RhetoricFormulas {
  /** ETHOS: credibility spread across its sources. value ⌊credibility / sources⌋. */
  static ethos(credibility: number, sources: number): CrossFormula { return c('rhetoric-ethos', 'ethos(credibility, sources) = ⌊credibility / sources⌋', sources > 0 ? Math.floor(credibility / sources) : 0, nat(credibility, sources) && sources > 0, 'ethos', [credibility, sources]) }
  /** PATHOS: emotional weight as a percentage of the whole. value ⌊emotional · 100 / total⌋. */
  static pathos(emotional: number, total: number): CrossFormula { return c('rhetoric-pathos', 'pathos(emotional, total) = ⌊emotional · 100 / total⌋', total > 0 ? Math.floor((emotional * 100) / total) : 0, nat(emotional, total) && total > 0 && emotional <= total, 'pathos', [emotional, total]) }
  /** LOGOS: evidence per claim made. value ⌊evidence / claims⌋. */
  static logos(evidence: number, claims: number): CrossFormula { return c('rhetoric-logos', 'logos(evidence, claims) = ⌊evidence / claims⌋', claims > 0 ? Math.floor(evidence / claims) : 0, nat(evidence, claims) && claims > 0, 'logos', [evidence, claims]) }
  /** PERSUASION: the share of an audience convinced, as a percentage. value ⌊convinced · 100 / audience⌋. */
  static persuasion(convinced: number, audience: number): CrossFormula { return c('rhetoric-persuasion', 'persuasion(convinced, audience) = ⌊convinced · 100 / audience⌋', audience > 0 ? Math.floor((convinced * 100) / audience) : 0, nat(convinced, audience) && audience > 0 && convinced <= audience, 'persuasion', [convinced, audience]) }
  /** CADENCE: syllables per line. value ⌊syllables / lines⌋. */
  static cadence(syllables: number, lines: number): CrossFormula { return c('rhetoric-cadence', 'cadence(syllables, lines) = ⌊syllables / lines⌋', lines > 0 ? Math.floor(syllables / lines) : 0, nat(syllables, lines) && lines > 0, 'cadence', [syllables, lines]) }
  /** EMPHASIS: repetition as a percentage of the words. value ⌊repetitions · 100 / words⌋. */
  static emphasis(repetitions: number, words: number): CrossFormula { return c('rhetoric-emphasis', 'emphasis(repetitions, words) = ⌊repetitions · 100 / words⌋', words > 0 ? Math.floor((repetitions * 100) / words) : 0, nat(repetitions, words) && words > 0 && repetitions <= words, 'emphasis', [repetitions, words]) }
  /** CLARITY: the share of readers who understood, as a percentage. value ⌊understood · 100 / readers⌋. */
  static clarity(understood: number, readers: number): CrossFormula { return c('rhetoric-clarity', 'clarity(understood, readers) = ⌊understood · 100 / readers⌋', readers > 0 ? Math.floor((understood * 100) / readers) : 0, nat(understood, readers) && readers > 0 && understood <= readers, 'clarity', [understood, readers]) }
  /** DEVICES: the rhetorical devices counted. value count. */
  static devices(count: number): CrossFormula { return c('rhetoric-devices', 'devices(count) = count', count, nat(count), 'devices', [count]) }
}

for (const name of ['cadence', 'clarity', 'devices', 'emphasis', 'ethos', 'logos', 'pathos', 'persuasion'] as const)
  hexRegisterOf('rhetoric', name, (RhetoricFormulas[name] as (...x: unknown[]) => unknown).bind(RhetoricFormulas))
