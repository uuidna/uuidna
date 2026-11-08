import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRAGMATICS — MEANING IN USE, AS ARITHMETIC. What an utterance does beyond what it says: implicature over what is
 *  stated, deixis per context, politeness over requests, relevance over utterances, turn-taking per speaker, speech acts
 *  over intent, presupposition per statement, and cooperation over the maxims. Crosses to `linguistics` — pragmatics is
 *  what linguistics describes in use. A measure. */

const PROOF = 'pragmatics arithmetic (implicature, deixis, politeness, relevance, turn-taking, speech acts, presupposition, cooperation); meaning in use; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pragmatics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `pragmatics.${name}`, params })

export class PragmaticsFormulas {
  /** IMPLICATURE: what is inferred as a percentage of what is stated. value ⌊inferred · 100 / stated⌋. */
  static implicature(inferred: number, stated: number): CrossFormula { return c('pragmatics-implicature', 'implicature(inferred, stated) = ⌊inferred · 100 / stated⌋', stated > 0 ? Math.floor((inferred * 100) / stated) : 0, nat(inferred, stated) && stated > 0, 'implicature', [inferred, stated]) }
  /** DEIXIS: references resolved per unit of context. value ⌊references / context⌋. */
  static deixis(references: number, context: number): CrossFormula { return c('pragmatics-deixis', 'deixis(references, context) = ⌊references / context⌋', context > 0 ? Math.floor(references / context) : 0, nat(references, context) && context > 0, 'deixis', [references, context]) }
  /** POLITENESS: mitigated requests as a percentage of all requests. value ⌊mitigated · 100 / requests⌋. */
  static politeness(mitigated: number, requests: number): CrossFormula { return c('pragmatics-politeness', 'politeness(mitigated, requests) = ⌊mitigated · 100 / requests⌋', requests > 0 ? Math.floor((mitigated * 100) / requests) : 0, nat(mitigated, requests) && requests > 0 && mitigated <= requests, 'politeness', [mitigated, requests]) }
  /** RELEVANCE: relevant utterances as a percentage of all utterances. value ⌊relevant · 100 / utterances⌋. */
  static relevance(relevant: number, utterances: number): CrossFormula { return c('pragmatics-relevance', 'relevance(relevant, utterances) = ⌊relevant · 100 / utterances⌋', utterances > 0 ? Math.floor((relevant * 100) / utterances) : 0, nat(relevant, utterances) && utterances > 0 && relevant <= utterances, 'relevance', [relevant, utterances]) }
  /** TURN-TAKING: turns per speaker in a conversation. value ⌊turns / speakers⌋. */
  static turntaking(turns: number, speakers: number): CrossFormula { return c('pragmatics-turntaking', 'turntaking(turns, speakers) = ⌊turns / speakers⌋', speakers > 0 ? Math.floor(turns / speakers) : 0, nat(turns, speakers) && speakers > 0, 'turntaking', [turns, speakers]) }
  /** SPEECH ACTS: performed as a percentage of intended. value ⌊performed · 100 / intended⌋. */
  static speechact(performed: number, intended: number): CrossFormula { return c('pragmatics-speechact', 'speechact(performed, intended) = ⌊performed · 100 / intended⌋', intended > 0 ? Math.floor((performed * 100) / intended) : 0, nat(performed, intended) && intended > 0, 'speechact', [performed, intended]) }
  /** PRESUPPOSITION: assumptions carried per statement. value ⌊assumed / statements⌋. */
  static presupposition(assumed: number, statements: number): CrossFormula { return c('pragmatics-presupposition', 'presupposition(assumed, statements) = ⌊assumed / statements⌋', statements > 0 ? Math.floor(assumed / statements) : 0, nat(assumed, statements) && statements > 0, 'presupposition', [assumed, statements]) }
  /** COOPERATION: informative contributions as a percentage of the maxims. value ⌊informative · 100 / maxims⌋. */
  static cooperation(informative: number, maxims: number): CrossFormula { return c('pragmatics-cooperation', 'cooperation(informative, maxims) = ⌊informative · 100 / maxims⌋', maxims > 0 ? Math.floor((informative * 100) / maxims) : 0, nat(informative, maxims) && maxims > 0 && informative <= maxims, 'cooperation', [informative, maxims]) }
}

for (const name of ['cooperation', 'deixis', 'implicature', 'politeness', 'presupposition', 'relevance', 'speechact', 'turntaking'] as const)
  hexRegisterOf('pragmatics', name, (PragmaticsFormulas[name] as (...x: unknown[]) => unknown).bind(PragmaticsFormulas))
