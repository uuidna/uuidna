import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FIREWALL — PACKET POLICY AS ARITHMETIC (chosen by the networking registry, not by hand). Filtering traffic is numbers:
 *  the block rate, throughput, the rules in force, inspection latency, the false-block rate, connections against capacity,
 *  deep inspection, and port coverage. Crosses to `networking` — the firewall is what networking enforces. A measure. */

const PROOF = 'firewall arithmetic (block rate, throughput, rule count, latency, false-block, connections, inspection, coverage); a networking policy measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'firewall', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `firewall.${name}`, params })

export class FirewallFormulas {
  /** BLOCK RATE: blocked packets as a percentage of total. value ⌊blocked · 100 / total⌋. */
  static blockrate(blocked: number, total: number): CrossFormula { return c('firewall-blockrate', 'blockrate(blocked, total) = ⌊blocked · 100 / total⌋', total > 0 ? Math.floor((blocked * 100) / total) : 0, nat(blocked, total) && total > 0 && blocked <= total, 'blockrate', [blocked, total]) }
  /** THROUGHPUT: packets over seconds. value ⌊packets / seconds⌋. */
  static throughput(packets: number, seconds: number): CrossFormula { return c('firewall-throughput', 'throughput(packets, seconds) = ⌊packets / seconds⌋', seconds > 0 ? Math.floor(packets / seconds) : 0, nat(packets, seconds) && seconds > 0, 'throughput', [packets, seconds]) }
  /** RULES in force. value count. */
  static rules(count: number): CrossFormula { return c('firewall-rules', 'rules(count) = count', count, nat(count), 'rules', [count]) }
  /** INSPECTION LATENCY in microseconds. value microseconds. */
  static latency(microseconds: number): CrossFormula { return c('firewall-latency', 'latency(microseconds) = microseconds', microseconds, nat(microseconds), 'latency', [microseconds]) }
  /** FALSE-BLOCK RATE: legitimate packets as a percentage of blocked. value ⌊legitimate · 100 / blocked⌋. */
  static falseblock(legitimate: number, blocked: number): CrossFormula { return c('firewall-falseblock', 'falseblock(legitimate, blocked) = ⌊legitimate · 100 / blocked⌋', blocked > 0 ? Math.floor((legitimate * 100) / blocked) : 0, nat(legitimate, blocked) && blocked > 0 && legitimate <= blocked, 'falseblock', [legitimate, blocked]) }
  /** CONNECTIONS against capacity, as a percentage. value ⌊active · 100 / capacity⌋. */
  static connections(active: number, capacity: number): CrossFormula { return c('firewall-connections', 'connections(active, capacity) = ⌊active · 100 / capacity⌋', capacity > 0 ? Math.floor((active * 100) / capacity) : 0, nat(active, capacity) && capacity > 0 && active <= capacity, 'connections', [active, capacity]) }
  /** DEEP INSPECTION: inspected packets as a percentage of total packets. value ⌊inspected · 100 / packets⌋. */
  static inspection(inspected: number, packets: number): CrossFormula { return c('firewall-inspection', 'inspection(inspected, packets) = ⌊inspected · 100 / packets⌋', packets > 0 ? Math.floor((inspected * 100) / packets) : 0, nat(inspected, packets) && packets > 0 && inspected <= packets, 'inspection', [inspected, packets]) }
  /** PORT COVERAGE: ports covered as a percentage of total. value ⌊ports · 100 / total⌋. */
  static coverage(ports: number, total: number): CrossFormula { return c('firewall-coverage', 'coverage(ports, total) = ⌊ports · 100 / total⌋', total > 0 ? Math.floor((ports * 100) / total) : 0, nat(ports, total) && total > 0 && ports <= total, 'coverage', [ports, total]) }
}

for (const name of ['blockrate', 'connections', 'coverage', 'falseblock', 'inspection', 'latency', 'rules', 'throughput'] as const)
  hexRegisterOf('firewall', name, (FirewallFormulas[name] as (...x: unknown[]) => unknown).bind(FirewallFormulas))
