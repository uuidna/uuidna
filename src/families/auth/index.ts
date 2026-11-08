import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTH — THE PAYLOAD CMS AUTHENTICATION API, AS ARITHMETIC. Signing in is numbers: whether a lockout trips, the life left
 *  in a token, the share of api keys active, the share of users verified, password strength, concurrent sessions, token
 *  expiry, and the failed-attempt ratio. Crosses to `payload` — auth is the gate Payload stands behind. A measure. */

const PROOF = 'auth arithmetic (lockout, token life, api keys, verified users, password strength, sessions, expiry, fail ratio); the Payload CMS authentication API as exact integers; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'auth', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `auth.${name}`, params })

export class AuthFormulas {
  /** LOCKOUT: 1 when failed attempts reach the max. value [attempts ≥ max]. */
  static lockout(attempts: number, max: number): CrossFormula { return c('auth-lockout', 'lockout(attempts, max) = [attempts ≥ max]', attempts >= max ? 1 : 0, nat(attempts, max), 'lockout', [attempts, max]) }
  /** TOKEN LIFE: seconds left on a JWT. value max(0, expiry − issued). */
  static token(issued: number, expiry: number): CrossFormula { return c('auth-token', 'token(issued, expiry) = max(0, expiry − issued)', Math.max(0, expiry - issued), nat(issued, expiry), 'token', [issued, expiry]) }
  /** API KEYS: the share active, as a percentage. value ⌊active · 100 / total⌋. */
  static apikeys(active: number, total: number): CrossFormula { return c('auth-apikeys', 'apikeys(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'apikeys', [active, total]) }
  /** VERIFIED: the share of users verified, as a percentage. value ⌊verified · 100 / users⌋. */
  static verified(verified: number, users: number): CrossFormula { return c('auth-verified', 'verified(verified, users) = ⌊verified · 100 / users⌋', users > 0 ? Math.floor((verified * 100) / users) : 0, nat(verified, users) && users > 0 && verified <= users, 'verified', [verified, users]) }
  /** PASSWORD STRENGTH: length times character classes. value length · classes. */
  static strength(length: number, classes: number): CrossFormula { return c('auth-strength', 'strength(length, classes) = length · classes', length * classes, nat(length, classes), 'strength', [length, classes]) }
  /** SESSIONS: concurrent sessions capped at the max. value min(active, max). */
  static sessions(active: number, max: number): CrossFormula { return c('auth-sessions', 'sessions(active, max) = min(active, max)', Math.min(active, max), nat(active, max), 'sessions', [active, max]) }
  /** EXPIRY: seconds until a token expires. value max(0, exp − now). */
  static expiry(now: number, exp: number): CrossFormula { return c('auth-expiry', 'expiry(now, exp) = max(0, exp − now)', Math.max(0, exp - now), nat(now, exp), 'expiry', [now, exp]) }
  /** FAIL RATIO: the share of attempts that failed, as a percentage. value ⌊failed · 100 / attempts⌋. */
  static failratio(failed: number, attempts: number): CrossFormula { return c('auth-failratio', 'failratio(failed, attempts) = ⌊failed · 100 / attempts⌋', attempts > 0 ? Math.floor((failed * 100) / attempts) : 0, nat(failed, attempts) && attempts > 0 && failed <= attempts, 'failratio', [failed, attempts]) }
}

for (const name of ['apikeys', 'expiry', 'failratio', 'lockout', 'sessions', 'strength', 'token', 'verified'] as const)
  hexRegisterOf('auth', name, (AuthFormulas[name] as (...x: unknown[]) => unknown).bind(AuthFormulas))
