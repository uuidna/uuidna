import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLOUD — THE REGISTRY'S LARGEST DOMAIN, AS ARITHMETIC (chosen by the public-API registry, not by hand). Running compute
 *  is numbers: cost by the hour, uptime, the nodes a load needs, average latency, throughput, storage, egress cost, and
 *  whether the SLA is met. Crosses to `obs` — cloud is what observability watches. A measure. */

const PROOF = 'cloud arithmetic (compute cost, uptime, autoscale nodes, latency, throughput, storage, egress, SLA); the registry\'s largest uncovered domain; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cloud', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `cloud.${name}`, params })

export class CloudFormulas {
  /** COMPUTE COST: instance-hours at an hourly rate. value hours · rate. */
  static cost(hours: number, rate: number): CrossFormula { return c('cloud-cost', 'cost(hours, rate) = hours · rate', hours * rate, nat(hours, rate), 'cost', [hours, rate]) }
  /** UPTIME as a percentage. value ⌊up · 100 / total⌋. */
  static uptime(up: number, total: number): CrossFormula { return c('cloud-uptime', 'uptime(up, total) = ⌊up · 100 / total⌋', total > 0 ? Math.floor((up * 100) / total) : 0, nat(up, total) && total > 0 && up <= total, 'uptime', [up, total]) }
  /** AUTOSCALE: the nodes a load needs at a per-node capacity. value ⌈load / perNode⌉. */
  static scale(load: number, perNode: number): CrossFormula { return c('cloud-scale', 'scale(load, perNode) = ⌈load / perNode⌉', perNode > 0 ? Math.ceil(load / perNode) : 0, nat(load, perNode) && perNode > 0, 'scale', [load, perNode]) }
  /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total / requests⌋. */
  static latency(total: number, requests: number): CrossFormula { return c('cloud-latency', 'latency(total, requests) = ⌊total / requests⌋', requests > 0 ? Math.floor(total / requests) : 0, nat(total, requests) && requests > 0, 'latency', [total, requests]) }
  /** THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. */
  static throughput(requests: number, seconds: number): CrossFormula { return c('cloud-throughput', 'throughput(requests, seconds) = ⌊requests / seconds⌋', seconds > 0 ? Math.floor(requests / seconds) : 0, nat(requests, seconds) && seconds > 0, 'throughput', [requests, seconds]) }
  /** STORAGE: objects at a size each. value objects · size. */
  static storage(objects: number, size: number): CrossFormula { return c('cloud-storage', 'storage(objects, size) = objects · size', objects * size, nat(objects, size), 'storage', [objects, size]) }
  /** EGRESS COST: bytes (GB) at a rate per thousand. value ⌊bytes · rate / 1000⌋. */
  static egress(bytes: number, rate: number): CrossFormula { return c('cloud-egress', 'egress(bytes, rate) = ⌊bytes · rate / 1000⌋', Math.floor((bytes * rate) / 1000), nat(bytes, rate), 'egress', [bytes, rate]) }
  /** THE SLA: 1 when measured uptime meets the target. value [uptime ≥ target]. */
  static sla(uptime: number, target: number): CrossFormula { return c('cloud-sla', 'sla(uptime, target) = [uptime ≥ target]', uptime >= target ? 1 : 0, nat(uptime, target) && uptime <= 100 && target <= 100, 'sla', [uptime, target]) }
}

for (const name of ['cost', 'egress', 'latency', 'scale', 'sla', 'storage', 'throughput', 'uptime'] as const)
  hexRegisterOf('cloud', name, (CloudFormulas[name] as (...x: unknown[]) => unknown).bind(CloudFormulas))
