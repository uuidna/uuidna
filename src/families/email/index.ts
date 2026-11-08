import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMAIL — DELIVERABILITY AND SENDER REPUTATION, AS ARITHMETIC (distinct from generic messaging transport). Sending mail is
 *  numbers: how much reaches the inbox, how much is flagged as spam, who opts out, hard bounces, complaint-driven reputation,
 *  click-through on what was opened, list hygiene, and the throttle a send must respect. Crosses to `messaging` — email is the
 *  reputation layer over the message transport. A measure. */

const PROOF = 'email arithmetic (deliverability, spam rate, opt-out, hard bounce, reputation, click rate, list hygiene, throttle); the sender-reputation layer over messaging transport; a measure crossed to messaging'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'email', dst: 'messaging', formula, value, proof: PROOF, ...extra }, holds, { name: `email.${name}`, params })

export class EmailFormulas {
  /** DELIVERABILITY: the share of sent mail that reached the inbox. value ⌊inbox · 100 / sent⌋. */
  static deliverability(inbox: number, sent: number): CrossFormula { return c('email-deliverability', 'deliverability(inbox, sent) = ⌊inbox · 100 / sent⌋', sent > 0 ? Math.floor((inbox * 100) / sent) : 0, nat(inbox, sent) && sent > 0 && inbox <= sent, 'deliverability', [inbox, sent]) }
  /** SPAM RATE: the share of sent mail flagged as spam. value ⌊flagged · 100 / sent⌋. */
  static spam(flagged: number, sent: number): CrossFormula { return c('email-spam', 'spam(flagged, sent) = ⌊flagged · 100 / sent⌋', sent > 0 ? Math.floor((flagged * 100) / sent) : 0, nat(flagged, sent) && sent > 0 && flagged <= sent, 'spam', [flagged, sent]) }
  /** OPT-OUT RATE: unsubscribes over delivered mail. value ⌊unsub · 100 / delivered⌋. */
  static optout(unsub: number, delivered: number): CrossFormula { return c('email-optout', 'optout(unsub, delivered) = ⌊unsub · 100 / delivered⌋', delivered > 0 ? Math.floor((unsub * 100) / delivered) : 0, nat(unsub, delivered) && delivered > 0 && unsub <= delivered, 'optout', [unsub, delivered]) }
  /** HARD BOUNCE RATE: permanent failures over sent mail. value ⌊bounced · 100 / sent⌋. */
  static hardbounce(bounced: number, sent: number): CrossFormula { return c('email-hardbounce', 'hardbounce(bounced, sent) = ⌊bounced · 100 / sent⌋', sent > 0 ? Math.floor((bounced * 100) / sent) : 0, nat(bounced, sent) && sent > 0 && bounced <= sent, 'hardbounce', [bounced, sent]) }
  /** REPUTATION: complaint rate over sent mail — the lower the better. value ⌊complaints · 100 / sent⌋. */
  static reputation(complaints: number, sent: number): CrossFormula { return c('email-reputation', 'reputation(complaints, sent) = ⌊complaints · 100 / sent⌋', sent > 0 ? Math.floor((complaints * 100) / sent) : 0, nat(complaints, sent) && sent > 0 && complaints <= sent, 'reputation', [complaints, sent]) }
  /** CLICK RATE: clicks over opened mail. value ⌊clicks · 100 / opened⌋. */
  static clickrate(clicks: number, opened: number): CrossFormula { return c('email-clickrate', 'clickrate(clicks, opened) = ⌊clicks · 100 / opened⌋', opened > 0 ? Math.floor((clicks * 100) / opened) : 0, nat(clicks, opened) && opened > 0 && clicks <= opened, 'clickrate', [clicks, opened]) }
  /** LIST HYGIENE: valid addresses over the whole list. value ⌊valid · 100 / total⌋. */
  static hygiene(valid: number, total: number): CrossFormula { return c('email-hygiene', 'hygiene(valid, total) = ⌊valid · 100 / total⌋', total > 0 ? Math.floor((valid * 100) / total) : 0, nat(valid, total) && total > 0 && valid <= total, 'hygiene', [valid, total]) }
  /** THROTTLE: what a send actually delivers under a per-window limit. value min(sent, limit). */
  static throttle(sent: number, limit: number): CrossFormula { return c('email-throttle', 'throttle(sent, limit) = min(sent, limit)', Math.min(sent, limit), nat(sent, limit), 'throttle', [sent, limit]) }
}

for (const name of ['clickrate', 'deliverability', 'hardbounce', 'hygiene', 'optout', 'reputation', 'spam', 'throttle'] as const)
  hexRegisterOf('email', name, (EmailFormulas[name] as (...x: unknown[]) => unknown).bind(EmailFormulas))
