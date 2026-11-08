import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DISCOURSE — CONNECTED TEXT ABOVE THE SENTENCE, AS ARITHMETIC (how utterances hang together, not single words). Running
 *  conversation is numbers: cohesive ties, coherence relations, how long a turn runs, how long reference chains get, how
 *  often the topic shifts, connective density, anaphora density, and the utterances spoken. Crosses to `linguistics` —
 *  discourse is the structure linguistics describes. A measure. */

const PROOF = 'discourse arithmetic (cohesion, coherence, turn length, reference chains, topic shifts, connectives, anaphora density, utterance count); connected text above the sentence; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'discourse', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `discourse.${name}`, params })

export class DiscourseFormulas {
  /** COHESION: cohesive ties per hundred sentences. value ⌊links · 100 / sentences⌋. */
  static cohesion(links: number, sentences: number): CrossFormula { return c('discourse-cohesion', 'cohesion(links, sentences) = ⌊links · 100 / sentences⌋', sentences > 0 ? Math.floor((links * 100) / sentences) : 0, nat(links, sentences) && sentences > 0, 'cohesion', [links, sentences]) }
  /** COHERENCE: coherence relations per hundred propositions. value ⌊relations · 100 / propositions⌋. */
  static coherence(relations: number, propositions: number): CrossFormula { return c('discourse-coherence', 'coherence(relations, propositions) = ⌊relations · 100 / propositions⌋', propositions > 0 ? Math.floor((relations * 100) / propositions) : 0, nat(relations, propositions) && propositions > 0, 'coherence', [relations, propositions]) }
  /** TURN LENGTH: words over the turns taken. value ⌊words / turns⌋. */
  static turnlength(words: number, turns: number): CrossFormula { return c('discourse-turnlength', 'turnlength(words, turns) = ⌊words / turns⌋', turns > 0 ? Math.floor(words / turns) : 0, nat(words, turns) && turns > 0, 'turnlength', [words, turns]) }
  /** REFERENCE CHAINS: mentions over the entities referred to. value ⌊mentions / entities⌋. */
  static referencechains(mentions: number, entities: number): CrossFormula { return c('discourse-referencechains', 'referencechains(mentions, entities) = ⌊mentions / entities⌋', entities > 0 ? Math.floor(mentions / entities) : 0, nat(mentions, entities) && entities > 0, 'referencechains', [mentions, entities]) }
  /** TOPIC SHIFTS: shifts per hundred segments. value ⌊shifts · 100 / segments⌋. */
  static topicshifts(shifts: number, segments: number): CrossFormula { return c('discourse-topicshifts', 'topicshifts(shifts, segments) = ⌊shifts · 100 / segments⌋', segments > 0 ? Math.floor((shifts * 100) / segments) : 0, nat(shifts, segments) && segments > 0, 'topicshifts', [shifts, segments]) }
  /** CONNECTIVES: connective density per hundred clauses. value ⌊connectives · 100 / clauses⌋. */
  static connectives(connectives: number, clauses: number): CrossFormula { return c('discourse-connectives', 'connectives(connectives, clauses) = ⌊connectives · 100 / clauses⌋', clauses > 0 ? Math.floor((connectives * 100) / clauses) : 0, nat(connectives, clauses) && clauses > 0, 'connectives', [connectives, clauses]) }
  /** ANAPHORA DENSITY: anaphors per thousand tokens. value ⌊anaphors · 1000 / tokens⌋. */
  static anaphoradensity(anaphors: number, tokens: number): CrossFormula { return c('discourse-anaphoradensity', 'anaphoradensity(anaphors, tokens) = ⌊anaphors · 1000 / tokens⌋', tokens > 0 ? Math.floor((anaphors * 1000) / tokens) : 0, nat(anaphors, tokens) && tokens > 0, 'anaphoradensity', [anaphors, tokens]) }
  /** UTTERANCE COUNT: speakers each contributing a share of utterances. value speakers · perSpeaker. */
  static utterancecount(speakers: number, perSpeaker: number): CrossFormula { return c('discourse-utterancecount', 'utterancecount(speakers, perSpeaker) = speakers · perSpeaker', speakers * perSpeaker, nat(speakers, perSpeaker), 'utterancecount', [speakers, perSpeaker]) }
}

for (const name of ['anaphoradensity', 'coherence', 'cohesion', 'connectives', 'referencechains', 'topicshifts', 'turnlength', 'utterancecount'] as const)
  hexRegisterOf('discourse', name, (DiscourseFormulas[name] as (...x: unknown[]) => unknown).bind(DiscourseFormulas))
