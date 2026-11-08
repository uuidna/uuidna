import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUEUEING — WAITING LINES AS ARITHMETIC (chosen by the public-API registry, not by hand). A line is numbers:
 *  how busy the server is, how long the line is, how long a job waits, the length of the whole system, and the rates
 *  at which work arrives and is served. Little's law ties the length to the rate times the wait. Crosses to
 *  `networking` — a queue is what a link fills. A measure. */

const PROOF = 'queueing arithmetic (utilization, average queue, waiting time, Little\'s law, service rate, arrival rate, system length, idle probability); a public-API domain; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'queueing', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `queueing.${name}`, params })

export class QueueingFormulas {
  /** UTILIZATION: how busy the server is, arrivals over service, as a percentage. value ⌊arrival · 100 / service⌋. */
  static utilization(arrival: number, service: number): CrossFormula { return c('queueing-utilization', 'utilization(arrival, service) = ⌊arrival · 100 / service⌋', service > 0 ? Math.floor((arrival * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service, 'utilization', [arrival, service]) }
  /** AVERAGE QUEUE: items seen over the cycles observed. value ⌊items / cycles⌋. */
  static averagequeue(items: number, cycles: number): CrossFormula { return c('queueing-averagequeue', 'averagequeue(items, cycles) = ⌊items / cycles⌋', cycles > 0 ? Math.floor(items / cycles) : 0, nat(items, cycles) && cycles > 0, 'averagequeue', [items, cycles]) }
  /** WAITING TIME: the line drained at the service rate. value ⌊queue / rate⌋. */
  static waitingtime(queue: number, rate: number): CrossFormula { return c('queueing-waitingtime', 'waitingtime(queue, rate) = ⌊queue / rate⌋', rate > 0 ? Math.floor(queue / rate) : 0, nat(queue, rate) && rate > 0, 'waitingtime', [queue, rate]) }
  /** LITTLE'S LAW: the length is the arrival rate times the wait. value arrival · wait. */
  static littleslaw(arrival: number, wait: number): CrossFormula { return c('queueing-littleslaw', 'littleslaw(arrival, wait) = arrival · wait', arrival * wait, nat(arrival, wait), 'littleslaw', [arrival, wait]) }
  /** SERVICE RATE: jobs served over the seconds taken. value ⌊served / seconds⌋. */
  static servicerate(served: number, seconds: number): CrossFormula { return c('queueing-servicerate', 'servicerate(served, seconds) = ⌊served / seconds⌋', seconds > 0 ? Math.floor(served / seconds) : 0, nat(served, seconds) && seconds > 0, 'servicerate', [served, seconds]) }
  /** ARRIVAL RATE: jobs arriving over the seconds watched. value ⌊arrivals / seconds⌋. */
  static arrivalrate(arrivals: number, seconds: number): CrossFormula { return c('queueing-arrivalrate', 'arrivalrate(arrivals, seconds) = ⌊arrivals / seconds⌋', seconds > 0 ? Math.floor(arrivals / seconds) : 0, nat(arrivals, seconds) && seconds > 0, 'arrivalrate', [arrivals, seconds]) }
  /** SYSTEM LENGTH: the ones waiting plus the ones in service. value queue + inservice. */
  static systemlength(queue: number, inservice: number): CrossFormula { return c('queueing-systemlength', 'systemlength(queue, inservice) = queue + inservice', queue + inservice, nat(queue, inservice), 'systemlength', [queue, inservice]) }
  /** IDLE PROBABILITY: the share of time the server is free, as a percentage. value ⌊max(0, service − arrival) · 100 / service⌋. */
  static idleprobability(arrival: number, service: number): CrossFormula { return c('queueing-idleprobability', 'idleprobability(arrival, service) = ⌊max(0, service − arrival) · 100 / service⌋', service > 0 ? Math.floor((Math.max(0, service - arrival) * 100) / service) : 0, nat(arrival, service) && service > 0 && arrival <= service, 'idleprobability', [arrival, service]) }
}

for (const name of ['arrivalrate', 'averagequeue', 'idleprobability', 'littleslaw', 'servicerate', 'systemlength', 'utilization', 'waitingtime'] as const)
  hexRegisterOf('queueing', name, (QueueingFormulas[name] as (...x: unknown[]) => unknown).bind(QueueingFormulas))
