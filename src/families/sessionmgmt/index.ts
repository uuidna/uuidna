import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SESSIONMGMT — THE LIFETIME OF A LOGIN, AS ARITHMETIC. A session is numbers: when it goes idle, its absolute ceiling,
 *  how many may run at once, a token's time-to-live, when renewal opens, how many are live right now, the margin left before
 *  expiry, and how often the sweeper runs. Crosses to `networking` — a session rides a connection. A measure. */

const PROOF = 'sessionmgmt arithmetic (idle timeout, absolute timeout, concurrent limit, token ttl, renewal window, active sessions, expiry margin, cleanup interval); the lifetime of a login as numbers; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sessionmgmt', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `sessionmgmt.${name}`, params })

export class SessionmgmtFormulas {
  /** IDLE TIMEOUT: minutes to seconds plus a grace in seconds. value minutes · 60 + grace. */
  static idletimeout(minutes: number, grace: number): CrossFormula { return c('sessionmgmt-idletimeout', 'idletimeout(minutes, grace) = minutes · 60 + grace', minutes * 60 + grace, nat(minutes, grace), 'idletimeout', [minutes, grace]) }
  /** ABSOLUTE TIMEOUT: the hard ceiling of a session, hours to seconds. value hours · 3600. */
  static absolutetimeout(hours: number): CrossFormula { return c('sessionmgmt-absolutetimeout', 'absolutetimeout(hours) = hours · 3600', hours * 3600, nat(hours), 'absolutetimeout', [hours]) }
  /** CONCURRENT LIMIT: sessions allowed at once, users at a per-user cap. value users · perUser. */
  static concurrentlimit(users: number, perUser: number): CrossFormula { return c('sessionmgmt-concurrentlimit', 'concurrentlimit(users, perUser) = users · perUser', users * perUser, nat(users, perUser), 'concurrentlimit', [users, perUser]) }
  /** TOKEN TTL: a token issued now expires at issued + ttl. value issued + ttl. */
  static tokenttl(issued: number, ttl: number): CrossFormula { return c('sessionmgmt-tokenttl', 'tokenttl(issued, ttl) = issued + ttl', issued + ttl, nat(issued, ttl), 'tokenttl', [issued, ttl]) }
  /** RENEWAL WINDOW: renewal opens a fraction of the ttl before expiry. value ⌊ttl / fraction⌋. */
  static renewalwindow(ttl: number, fraction: number): CrossFormula { return c('sessionmgmt-renewalwindow', 'renewalwindow(ttl, fraction) = ⌊ttl / fraction⌋', fraction > 0 ? Math.floor(ttl / fraction) : 0, nat(ttl, fraction) && fraction > 0, 'renewalwindow', [ttl, fraction]) }
  /** ACTIVE SESSIONS: those opened less those closed, never below zero. value max(0, opened − closed). */
  static activesessions(opened: number, closed: number): CrossFormula { return c('sessionmgmt-activesessions', 'activesessions(opened, closed) = max(0, opened − closed)', Math.max(0, opened - closed), nat(opened, closed), 'activesessions', [opened, closed]) }
  /** EXPIRY MARGIN: the ttl left after some elapsed, never below zero. value max(0, ttl − elapsed). */
  static expirymargin(ttl: number, elapsed: number): CrossFormula { return c('sessionmgmt-expirymargin', 'expirymargin(ttl, elapsed) = max(0, ttl − elapsed)', Math.max(0, ttl - elapsed), nat(ttl, elapsed), 'expirymargin', [ttl, elapsed]) }
  /** CLEANUP INTERVAL: expired sessions swept in batches. value ⌈total / batches⌉. */
  static cleanupinterval(total: number, batches: number): CrossFormula { return c('sessionmgmt-cleanupinterval', 'cleanupinterval(total, batches) = ⌈total / batches⌉', batches > 0 ? Math.ceil(total / batches) : 0, nat(total, batches) && batches > 0, 'cleanupinterval', [total, batches]) }
}

for (const name of ['absolutetimeout', 'activesessions', 'cleanupinterval', 'concurrentlimit', 'expirymargin', 'idletimeout', 'renewalwindow', 'tokenttl'] as const)
  hexRegisterOf('sessionmgmt', name, (SessionmgmtFormulas[name] as (...x: unknown[]) => unknown).bind(SessionmgmtFormulas))
