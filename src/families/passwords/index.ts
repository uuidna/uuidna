import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PASSWORDS — DEFENSIVE STRENGTH, AS ARITHMETIC (chosen by the public-API registry, not by hand). A credential policy is
 *  numbers: the entropy a password carries, the keyspace left after overhead, the lockout window, rotation cadence, the
 *  score above a minimum length, the hashing cost, the bonus for extra factors, and the risk of reuse. Crosses to
 *  `hashing` — a password is only ever stored as its hash. A measure. */

const PROOF = 'passwords arithmetic (entropy, keyspace, lockout window, rotation, min-length score, hash cost, mfa bonus, reuse risk); defensive strength metrics; a measure crossed to hashing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const bpc = (a: number): number => (a >= 64 ? 6 : a >= 52 ? 5 : a >= 16 ? 4 : a >= 10 ? 3 : a >= 4 ? 2 : a >= 2 ? 1 : 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'passwords', dst: 'hashing', formula, value, proof: PROOF, ...extra }, holds, { name: `passwords.${name}`, params })

export class PasswordsFormulas {
  /** ENTROPY: length times the bits each character carries, from an integer bits-per-char table. value length · bpc(alphabet). */
  static entropybits(length: number, alphabet: number): CrossFormula { return c('passwords-entropybits', 'entropybits(length, alphabet) = length · bpc(alphabet)', length * bpc(alphabet), nat(length, alphabet), 'entropybits', [length, alphabet]) }
  /** KEYSPACE: the entropy bits left after reserving some for salt and pepper overhead. value max(0, entropy − reserved). */
  static keyspacebits(entropy: number, reserved: number): CrossFormula { return c('passwords-keyspacebits', 'keyspacebits(entropy, reserved) = max(0, entropy − reserved)', Math.max(0, entropy - reserved), nat(entropy, reserved), 'keyspacebits', [entropy, reserved]) }
  /** LOCKOUT WINDOW: the minutes needed to cover the allowed attempts at a per-minute rate. value ⌈attempts / perMinute⌉. */
  static lockoutwindow(attempts: number, perMinute: number): CrossFormula { return c('passwords-lockoutwindow', 'lockoutwindow(attempts, perMinute) = ⌈attempts / perMinute⌉', perMinute > 0 ? Math.ceil(attempts / perMinute) : 0, nat(attempts, perMinute) && perMinute > 0, 'lockoutwindow', [attempts, perMinute]) }
  /** ROTATION: how often to rotate, the policy maximum shortened by a risk factor. value ⌊maxDays / risk⌋. */
  static rotationdays(maxDays: number, risk: number): CrossFormula { return c('passwords-rotationdays', 'rotationdays(maxDays, risk) = ⌊maxDays / risk⌋', risk > 0 ? Math.floor(maxDays / risk) : 0, nat(maxDays, risk) && risk > 0, 'rotationdays', [maxDays, risk]) }
  /** MIN-LENGTH SCORE: the characters a password has beyond the policy minimum. value max(0, length − minimum). */
  static minlengthscore(length: number, minimum: number): CrossFormula { return c('passwords-minlengthscore', 'minlengthscore(length, minimum) = max(0, length − minimum)', Math.max(0, length - minimum), nat(length, minimum), 'minlengthscore', [length, minimum]) }
  /** HASH COST: the total work of hashing, rounds at a cost per round. value rounds · msPerRound. */
  static hashcost(rounds: number, msPerRound: number): CrossFormula { return c('passwords-hashcost', 'hashcost(rounds, msPerRound) = rounds · msPerRound', rounds * msPerRound, nat(rounds, msPerRound), 'hashcost', [rounds, msPerRound]) }
  /** MFA BONUS: the strength points added by each extra authentication factor. value factors · perFactor. */
  static mfabonus(factors: number, perFactor: number): CrossFormula { return c('passwords-mfabonus', 'mfabonus(factors, perFactor) = factors · perFactor', factors * perFactor, nat(factors, perFactor), 'mfabonus', [factors, perFactor]) }
  /** REUSE RISK: the percentage of accounts whose password is breached and reused. value ⌊breached · 100 / accounts⌋. */
  static reuserisk(accounts: number, breached: number): CrossFormula { return c('passwords-reuserisk', 'reuserisk(accounts, breached) = ⌊breached · 100 / accounts⌋', accounts > 0 ? Math.floor((breached * 100) / accounts) : 0, nat(accounts, breached) && accounts > 0 && breached <= accounts, 'reuserisk', [accounts, breached]) }
}

for (const name of ['entropybits', 'hashcost', 'keyspacebits', 'lockoutwindow', 'mfabonus', 'minlengthscore', 'reuserisk', 'rotationdays'] as const)
  hexRegisterOf('passwords', name, (PasswordsFormulas[name] as (...x: unknown[]) => unknown).bind(PasswordsFormulas))
