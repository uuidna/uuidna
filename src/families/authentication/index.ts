import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTHENTICATION — PROVING WHO IS THERE, AS ARITHMETIC (chosen by the identity registry, not by hand). Access is numbers:
 *  the entropy of a secret, the false-reject and false-accept rates of a biometric, the sessions per user, the lockout
 *  after too many attempts, how long a token lives, the strength of a password, and how many factors are required.
 *  Crosses to `code` — authentication is what the code enforces. A measure. */

const PROOF = 'authentication arithmetic (secret entropy, false-reject, false-accept, sessions, lockout, token life, password strength, factors); an identity-registry domain; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'authentication', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `authentication.${name}`, params })

export class AuthenticationFormulas {
  /** ENTROPY: a bits proxy for a secret over a charset of a given length. value charset · length. */
  static entropy(charset: number, length: number): CrossFormula { return c('authentication-entropy', 'entropy(charset, length) = charset · length', charset * length, nat(charset, length), 'entropy', [charset, length]) }
  /** FALSE REJECT: genuine attempts wrongly refused, as a percentage. value ⌊rejected · 100 / genuine⌋. */
  static falsereject(rejected: number, genuine: number): CrossFormula { return c('authentication-falsereject', 'falsereject(rejected, genuine) = ⌊rejected · 100 / genuine⌋', genuine > 0 ? Math.floor((rejected * 100) / genuine) : 0, nat(rejected, genuine) && genuine > 0 && rejected <= genuine, 'falsereject', [rejected, genuine]) }
  /** FALSE ACCEPT: impostors wrongly admitted, as a percentage. value ⌊accepted · 100 / impostors⌋. */
  static falseaccept(accepted: number, impostors: number): CrossFormula { return c('authentication-falseaccept', 'falseaccept(accepted, impostors) = ⌊accepted · 100 / impostors⌋', impostors > 0 ? Math.floor((accepted * 100) / impostors) : 0, nat(accepted, impostors) && impostors > 0, 'falseaccept', [accepted, impostors]) }
  /** SESSIONS per user: active sessions over the users holding them. value ⌊active / users⌋. */
  static sessions(active: number, users: number): CrossFormula { return c('authentication-sessions', 'sessions(active, users) = ⌊active / users⌋', users > 0 ? Math.floor(active / users) : 0, nat(active, users) && users > 0, 'sessions', [active, users]) }
  /** LOCKOUT: attempts beyond the threshold trigger the lock. value max(0, attempts − threshold). */
  static lockout(attempts: number, threshold: number): CrossFormula { return c('authentication-lockout', 'lockout(attempts, threshold) = max(0, attempts − threshold)', Math.max(0, attempts - threshold), nat(attempts, threshold), 'lockout', [attempts, threshold]) }
  /** TOKEN LIFE: the seconds a token stays valid. value seconds. */
  static tokenlife(seconds: number): CrossFormula { return c('authentication-tokenlife', 'tokenlife(seconds) = seconds', seconds, nat(seconds), 'tokenlife', [seconds]) }
  /** STRENGTH: a password over a count of character classes at a length. value classes · length. */
  static strength(classes: number, length: number): CrossFormula { return c('authentication-strength', 'strength(classes, length) = classes · length', classes * length, nat(classes, length), 'strength', [classes, length]) }
  /** FACTORS: how many factors multi-factor requires. value factors. */
  static mfa(factors: number): CrossFormula { return c('authentication-mfa', 'mfa(factors) = factors', factors, nat(factors), 'mfa', [factors]) }
}

for (const name of ['entropy', 'falseaccept', 'falsereject', 'lockout', 'mfa', 'sessions', 'strength', 'tokenlife'] as const)
  hexRegisterOf('authentication', name, (AuthenticationFormulas[name] as (...x: unknown[]) => unknown).bind(AuthenticationFormulas))
