import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BILINGUALISM — THE TWO-LANGUAGE MIND, AS ARITHMETIC. Speaking two languages is numbers: which language dominates, how
 *  often a speaker code-switches, the gap between proficiencies, how fast words are retrieved, how much one language
 *  transfers into the other, how balanced the two are, the hours of exposure accrued, and the rate of interference.
 *  Crosses to `cognition` — bilingualism is a cognitive system. A measure. */

const PROOF = 'bilingualism arithmetic (language dominance, code-switching, proficiency gap, lexical access, transfer, balance, exposure, interference); the two-language mind as a measure crossed to cognition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bilingualism', dst: 'cognition', formula, value, proof: PROOF, ...extra }, holds, { name: `bilingualism.${name}`, params })

export class BilingualismFormulas {
  /** LANGUAGE BALANCE: how even the two languages are, 100 = perfect balance. value max(0, 100 − ⌊|l1 − l2| · 100 / (l1 + l2)⌋). */
  static balanceindex(l1: number, l2: number): CrossFormula { return c('bilingualism-balanceindex', 'balanceindex(l1, l2) = max(0, 100 − ⌊|l1 − l2| · 100 / (l1 + l2)⌋)', (l1 + l2) > 0 ? Math.max(0, 100 - Math.floor((Math.abs(l1 - l2) * 100) / (l1 + l2))) : 0, nat(l1, l2) && (l1 + l2) > 0, 'balanceindex', [l1, l2]) }
  /** CODE-SWITCH RATE: switches per hundred utterances. value ⌊switches · 100 / utterances⌋. */
  static codeswitchrate(switches: number, utterances: number): CrossFormula { return c('bilingualism-codeswitchrate', 'codeswitchrate(switches, utterances) = ⌊switches · 100 / utterances⌋', utterances > 0 ? Math.floor((switches * 100) / utterances) : 0, nat(switches, utterances) && utterances > 0, 'codeswitchrate', [switches, utterances]) }
  /** LANGUAGE DOMINANCE: the share of the first language as a percentage. value ⌊l1 · 100 / (l1 + l2)⌋. */
  static dominanceratio(l1: number, l2: number): CrossFormula { return c('bilingualism-dominanceratio', 'dominanceratio(l1, l2) = ⌊l1 · 100 / (l1 + l2)⌋', (l1 + l2) > 0 ? Math.floor((l1 * 100) / (l1 + l2)) : 0, nat(l1, l2) && (l1 + l2) > 0, 'dominanceratio', [l1, l2]) }
  /** EXPOSURE HOURS: days of contact at so many hours each day. value days · perday. */
  static exposurehours(days: number, perday: number): CrossFormula { return c('bilingualism-exposurehours', 'exposurehours(days, perday) = days · perday', days * perday, nat(days, perday), 'exposurehours', [days, perday]) }
  /** INTERFERENCE RATE: cross-linguistic errors per hundred items. value ⌊errors · 100 / items⌋. */
  static interferencerate(errors: number, items: number): CrossFormula { return c('bilingualism-interferencerate', 'interferencerate(errors, items) = ⌊errors · 100 / items⌋', items > 0 ? Math.floor((errors * 100) / items) : 0, nat(errors, items) && items > 0, 'interferencerate', [errors, items]) }
  /** LEXICAL ACCESS: average retrieval time per word, in milliseconds. value ⌊total / words⌋. */
  static lexicalaccess(total: number, words: number): CrossFormula { return c('bilingualism-lexicalaccess', 'lexicalaccess(total, words) = ⌊total / words⌋', words > 0 ? Math.floor(total / words) : 0, nat(total, words) && words > 0, 'lexicalaccess', [total, words]) }
  /** PROFICIENCY GAP: how far the first language leads the second. value max(0, l1 − l2). */
  static proficiencygap(l1: number, l2: number): CrossFormula { return c('bilingualism-proficiencygap', 'proficiencygap(l1, l2) = max(0, l1 − l2)', Math.max(0, l1 - l2), nat(l1, l2), 'proficiencygap', [l1, l2]) }
  /** TRANSFER RATE: cross-linguistic transfers per hundred structures. value ⌊transfers · 100 / structures⌋. */
  static transferrate(transfers: number, structures: number): CrossFormula { return c('bilingualism-transferrate', 'transferrate(transfers, structures) = ⌊transfers · 100 / structures⌋', structures > 0 ? Math.floor((transfers * 100) / structures) : 0, nat(transfers, structures) && structures > 0, 'transferrate', [transfers, structures]) }
}

for (const name of ['balanceindex', 'codeswitchrate', 'dominanceratio', 'exposurehours', 'interferencerate', 'lexicalaccess', 'proficiencygap', 'transferrate'] as const)
  hexRegisterOf('bilingualism', name, (BilingualismFormulas[name] as (...x: unknown[]) => unknown).bind(BilingualismFormulas))
