import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EVIDENCE — WHAT A TRIBUNAL WEIGHS, AS ARITHMETIC, ANY JURISDICTION. Whether a fact is in evidence is a set of
 *  thresholds the jurisdiction sets: the balance of the proof, enough corroboration, the probative value against the
 *  prejudice, an intact chain of custody, every element made out. Exact and jurisdiction-agnostic; a measure crossing to
 *  the `law` family, advice only when law.reviewed confirms it true on the document. */

const PROOF = 'evidence thresholds (balance, the margin by which the facts for stand above the facts against, corroboration, the probative/prejudice balancing test, chain of custody, authentication, sufficiency of the elements); a measure crossed to law, advice only when reviewed true'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const e = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'evidence', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `evidence.${name}`, params })

export class EvidenceFormulas {
  /** THE BALANCE OF THE PROOF: 1 when the facts for outweigh the facts against. value [for > against]. */
  static weight(forFacts: number, against: number): CrossFormula { return e('evidence-weight', 'weight(for, against) = [for > against]', forFacts > against ? 1 : 0, nat(forFacts, against), 'weight', [forFacts, against]) }
  /** THE MARGIN: how far the facts for stand above the facts against. value max(0, for − against). */
  static margin(forFacts: number, against: number): CrossFormula { return e('evidence-margin', 'margin(for, against) = max(0, for − against)', Math.max(0, forFacts - against), nat(forFacts, against), 'margin', [forFacts, against]) }
  /** CORROBORATION: how many independent sources speak to the fact; holds when more than one (corroborated). */
  static corroboration(sources: number): CrossFormula { return e('evidence-corroboration', 'corroboration(sources) = sources; corroborated when > 1', sources, nat(sources) && sources > 1, 'corroboration', [sources]) }
  /** THE BALANCING TEST: admitted when the probative value exceeds the prejudice. value [probative > prejudice]. */
  static admissible(probative: number, prejudice: number): CrossFormula { return e('evidence-admissible', 'admissible(probative, prejudice) = [probative > prejudice]', probative > prejudice ? 1 : 0, nat(probative, prejudice), 'admissible', [probative, prejudice]) }
  /** CHAIN OF CUSTODY: 1 when every link is intact (none broken). value [intact = links]. */
  static chain(links: number, intact: number): CrossFormula { return e('evidence-chain', 'chain(links, intact) = [intact = links]', links > 0 && intact === links ? 1 : 0, nat(links, intact) && intact <= links && links > 0, 'chain', [links, intact]) }
  /** RELEVANCE: the probative value meets the threshold of relevance the matter sets. value [probative ≥ threshold]. */
  static relevance(probative: number, threshold: number): CrossFormula { return e('evidence-relevance', 'relevance(probative, threshold) = [probative ≥ threshold]', probative >= threshold ? 1 : 0, nat(probative, threshold), 'relevance', [probative, threshold]) }
  /** AUTHENTICATION: the marks of authenticity meet what is required to admit the item — fewer marks than the threshold leave it out. value [marks ≥ required]. */
  static authentication(marks: number, required: number): CrossFormula { return e('evidence-authentication', 'authentication(marks, required) = [marks ≥ required]', marks >= required ? 1 : 0, nat(marks, required), 'authentication', [marks, required]) }
  /** SUFFICIENCY: every element of the cause is made out. value [proven = elements]. */
  static sufficiency(elements: number, proven: number): CrossFormula { return e('evidence-sufficiency', 'sufficiency(elements, proven) = [proven = elements]', elements > 0 && proven === elements ? 1 : 0, nat(elements, proven) && proven <= elements && elements > 0, 'sufficiency', [elements, proven]) }
  /** HEARSAY: inadmissible unless an exception applies. value [exceptions > 0]. */
  static hearsay(exceptions: number): CrossFormula { return e('evidence-hearsay', 'hearsay(exceptions) = [exceptions > 0]', exceptions > 0 ? 1 : 0, nat(exceptions), 'hearsay', [exceptions]) }
}

for (const name of ['admissible', 'authentication', 'chain', 'corroboration', 'hearsay', 'margin', 'relevance', 'sufficiency', 'weight'] as const)
  hexRegisterOf('evidence', name, (EvidenceFormulas[name] as (...x: unknown[]) => unknown).bind(EvidenceFormulas))
