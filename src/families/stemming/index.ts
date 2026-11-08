import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STEMMING — REDUCING WORDS TO THEIR ROOTS, AS ARITHMETIC (chosen by the morphology registry, not by hand). A stemmer is
 *  numbers: the stem left after a suffix is cut, characters stripped, how many forms conflate to one root, the overstemming
 *  and understemming error rates, how far an index shrinks, affixes counted, and the root-to-word ratio. Crosses to
 *  `linguistics` — stemming is what linguistics formalizes. A measure. */

const PROOF = 'stemming arithmetic (stem length, suffix stripped, conflation rate, overstemming, understemming, index reduction, affix count, root ratio); a morphology measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stemming', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `stemming.${name}`, params })

export class StemmingFormulas {
  /** AFFIX COUNT: prefixes plus suffixes. value prefixes + suffixes. */
  static affixcount(prefixes: number, suffixes: number): CrossFormula { return c('stemming-affixcount', 'affixcount(prefixes, suffixes) = prefixes + suffixes', prefixes + suffixes, nat(prefixes, suffixes), 'affixcount', [prefixes, suffixes]) }
  /** CONFLATION RATE: forms merged to one root, as a percentage of all forms. value ⌊merged · 100 / total⌋. */
  static conflationrate(merged: number, total: number): CrossFormula { return c('stemming-conflationrate', 'conflationrate(merged, total) = ⌊merged · 100 / total⌋', total > 0 ? Math.floor((merged * 100) / total) : 0, nat(merged, total) && total > 0 && merged <= total, 'conflationrate', [merged, total]) }
  /** INDEX REDUCTION: terms removed from the index by stemming. value max(0, before − after). */
  static indexreduction(before: number, after: number): CrossFormula { return c('stemming-indexreduction', 'indexreduction(before, after) = max(0, before − after)', Math.max(0, before - after), nat(before, after) && after <= before, 'indexreduction', [before, after]) }
  /** OVERSTEMMING: words wrongly conflated, as a percentage. value ⌊wrong · 100 / total⌋. */
  static overstemming(wrong: number, total: number): CrossFormula { return c('stemming-overstemming', 'overstemming(wrong, total) = ⌊wrong · 100 / total⌋', total > 0 ? Math.floor((wrong * 100) / total) : 0, nat(wrong, total) && total > 0 && wrong <= total, 'overstemming', [wrong, total]) }
  /** ROOT RATIO: distinct roots per hundred words. value ⌊roots · 100 / words⌋. */
  static rootratio(roots: number, words: number): CrossFormula { return c('stemming-rootratio', 'rootratio(roots, words) = ⌊roots · 100 / words⌋', words > 0 ? Math.floor((roots * 100) / words) : 0, nat(roots, words) && words > 0 && roots <= words, 'rootratio', [roots, words]) }
  /** STEM LENGTH: the stem left after a suffix is cut. value max(0, word − suffix). */
  static stemlength(word: number, suffix: number): CrossFormula { return c('stemming-stemlength', 'stemlength(word, suffix) = max(0, word − suffix)', Math.max(0, word - suffix), nat(word, suffix) && suffix <= word, 'stemlength', [word, suffix]) }
  /** SUFFIX STRIPPED: characters removed to reach the stem. value max(0, word − stem). */
  static suffixstripped(word: number, stem: number): CrossFormula { return c('stemming-suffixstripped', 'suffixstripped(word, stem) = max(0, word − stem)', Math.max(0, word - stem), nat(word, stem) && stem <= word, 'suffixstripped', [word, stem]) }
  /** UNDERSTEMMING: words wrongly left distinct, as a percentage. value ⌊missed · 100 / total⌋. */
  static understemming(missed: number, total: number): CrossFormula { return c('stemming-understemming', 'understemming(missed, total) = ⌊missed · 100 / total⌋', total > 0 ? Math.floor((missed * 100) / total) : 0, nat(missed, total) && total > 0 && missed <= total, 'understemming', [missed, total]) }
}

for (const name of ['affixcount', 'conflationrate', 'indexreduction', 'overstemming', 'rootratio', 'stemlength', 'suffixstripped', 'understemming'] as const)
  hexRegisterOf('stemming', name, (StemmingFormulas[name] as (...x: unknown[]) => unknown).bind(StemmingFormulas))
