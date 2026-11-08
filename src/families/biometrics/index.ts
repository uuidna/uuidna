import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOMETRICS — IDENTITY AS ARITHMETIC (chosen by the registry, not by hand). Matching people to templates is numbers:
 *  the false accept and false reject rates, overall accuracy, enrollment success, the match score, template size,
 *  verification throughput, and liveness against spoofs. Crosses to `code` — a biometric check is a program. A measure. */

const PROOF = 'biometrics arithmetic (false accept, false reject, accuracy, enrollment, match score, template size, throughput, liveness); identity as a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biometrics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `biometrics.${name}`, params })

export class BiometricsFormulas {
  /** FALSE ACCEPT RATE in basis points: impostors wrongly accepted. value ⌊falseaccepts · 10000 / impostors⌋. */
  static far(falseaccepts: number, impostors: number): CrossFormula { return c('biometrics-far', 'far(falseaccepts, impostors) = ⌊falseaccepts · 10000 / impostors⌋', impostors > 0 ? Math.floor((falseaccepts * 10000) / impostors) : 0, nat(falseaccepts, impostors) && impostors > 0, 'far', [falseaccepts, impostors]) }
  /** FALSE REJECT RATE in basis points: genuine users wrongly rejected. value ⌊falserejects · 10000 / genuine⌋. */
  static frr(falserejects: number, genuine: number): CrossFormula { return c('biometrics-frr', 'frr(falserejects, genuine) = ⌊falserejects · 10000 / genuine⌋', genuine > 0 ? Math.floor((falserejects * 10000) / genuine) : 0, nat(falserejects, genuine) && genuine > 0, 'frr', [falserejects, genuine]) }
  /** ACCURACY as a percentage: correct decisions over all. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('biometrics-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** ENROLLMENT success as a percentage: enrolled over attempts. value ⌊enrolled · 100 / attempts⌋. */
  static enrollment(enrolled: number, attempts: number): CrossFormula { return c('biometrics-enrollment', 'enrollment(enrolled, attempts) = ⌊enrolled · 100 / attempts⌋', attempts > 0 ? Math.floor((enrolled * 100) / attempts) : 0, nat(enrolled, attempts) && attempts > 0 && enrolled <= attempts, 'enrollment', [enrolled, attempts]) }
  /** MATCH SCORE as a percentage: features matched over features compared. value ⌊matched · 100 / features⌋. */
  static matchscore(matched: number, features: number): CrossFormula { return c('biometrics-matchscore', 'matchscore(matched, features) = ⌊matched · 100 / features⌋', features > 0 ? Math.floor((matched * 100) / features) : 0, nat(matched, features) && features > 0 && matched <= features, 'matchscore', [matched, features]) }
  /** TEMPLATE SIZE: the bytes a stored template takes. value bytes. */
  static templatesize(bytes: number): CrossFormula { return c('biometrics-templatesize', 'templatesize(bytes) = bytes', bytes, nat(bytes), 'templatesize', [bytes]) }
  /** THROUGHPUT: verifications over seconds. value ⌊verifications / seconds⌋. */
  static throughput(verifications: number, seconds: number): CrossFormula { return c('biometrics-throughput', 'throughput(verifications, seconds) = ⌊verifications / seconds⌋', seconds > 0 ? Math.floor(verifications / seconds) : 0, nat(verifications, seconds) && seconds > 0, 'throughput', [verifications, seconds]) }
  /** LIVENESS: detections over spoof attempts, as a percentage. value ⌊detected · 100 / spoofs⌋. */
  static liveness(detected: number, spoofs: number): CrossFormula { return c('biometrics-liveness', 'liveness(detected, spoofs) = ⌊detected · 100 / spoofs⌋', spoofs > 0 ? Math.floor((detected * 100) / spoofs) : 0, nat(detected, spoofs) && spoofs > 0, 'liveness', [detected, spoofs]) }
}

for (const name of ['accuracy', 'enrollment', 'far', 'frr', 'liveness', 'matchscore', 'templatesize', 'throughput'] as const)
  hexRegisterOf('biometrics', name, (BiometricsFormulas[name] as (...x: unknown[]) => unknown).bind(BiometricsFormulas))
