import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MESSAGING — DELIVERY AT SCALE, AS ARITHMETIC (chosen by the registry). A message stream is numbers: the delivery rate,
 *  the open rate, bounces, average latency, the queue backlog, throughput, cost per thousand, and retries. Crosses to
 *  `obs` — messaging is a pipeline you watch. A measure. */

const PROOF = 'messaging arithmetic (delivery, open, bounce, latency, queue backlog, throughput, cost per thousand, retry); a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const m = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'messaging', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `messaging.${name}`, params })

export class MessagingFormulas {
  /** DELIVERY RATE as a percentage: delivered over sent. value ⌊delivered · 100 / sent⌋. */
  static delivery(delivered: number, sent: number): CrossFormula { return m('messaging-delivery', 'delivery(delivered, sent) = ⌊delivered · 100 / sent⌋', sent > 0 ? Math.floor((delivered * 100) / sent) : 0, nat(delivered, sent) && sent > 0 && delivered <= sent, 'delivery', [delivered, sent]) }
  /** OPEN RATE as a percentage: opened over delivered. value ⌊opened · 100 / delivered⌋. */
  static open(opened: number, delivered: number): CrossFormula { return m('messaging-open', 'open(opened, delivered) = ⌊opened · 100 / delivered⌋', delivered > 0 ? Math.floor((opened * 100) / delivered) : 0, nat(opened, delivered) && delivered > 0 && opened <= delivered, 'open', [opened, delivered]) }
  /** BOUNCE RATE as a percentage: bounced over sent. value ⌊bounced · 100 / sent⌋. */
  static bounce(bounced: number, sent: number): CrossFormula { return m('messaging-bounce', 'bounce(bounced, sent) = ⌊bounced · 100 / sent⌋', sent > 0 ? Math.floor((bounced * 100) / sent) : 0, nat(bounced, sent) && sent > 0 && bounced <= sent, 'bounce', [bounced, sent]) }
  /** AVERAGE LATENCY: total milliseconds over the messages. value ⌊total / messages⌋. */
  static latency(total: number, messages: number): CrossFormula { return m('messaging-latency', 'latency(total, messages) = ⌊total / messages⌋', messages > 0 ? Math.floor(total / messages) : 0, nat(total, messages) && messages > 0, 'latency', [total, messages]) }
  /** THE QUEUE BACKLOG: incoming not yet processed. value max(0, incoming − processed). */
  static queue(incoming: number, processed: number): CrossFormula { return m('messaging-queue', 'queue(incoming, processed) = max(0, incoming − processed)', Math.max(0, incoming - processed), nat(incoming, processed), 'queue', [incoming, processed]) }
  /** THROUGHPUT: messages over seconds. value ⌊messages / seconds⌋. */
  static throughput(messages: number, seconds: number): CrossFormula { return m('messaging-throughput', 'throughput(messages, seconds) = ⌊messages / seconds⌋', seconds > 0 ? Math.floor(messages / seconds) : 0, nat(messages, seconds) && seconds > 0, 'throughput', [messages, seconds]) }
  /** COST per thousand messages. value ⌊messages · rate / 1000⌋. */
  static cost(messages: number, rate: number): CrossFormula { return m('messaging-cost', 'cost(messages, rate) = ⌊messages · rate / 1000⌋', Math.floor((messages * rate) / 1000), nat(messages, rate), 'cost', [messages, rate]) }
  /** RETRIES: failed messages, up to the retry ceiling. value min(failed, max). */
  static retry(failed: number, max: number): CrossFormula { return m('messaging-retry', 'retry(failed, max) = min(failed, max)', Math.min(failed, max), nat(failed, max), 'retry', [failed, max]) }
}

for (const name of ['bounce', 'cost', 'delivery', 'latency', 'open', 'queue', 'retry', 'throughput'] as const)
  hexRegisterOf('messaging', name, (MessagingFormulas[name] as (...x: unknown[]) => unknown).bind(MessagingFormulas))
