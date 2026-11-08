import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTOSCALING — ELASTIC CAPACITY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Right-sizing a running
 *  service is numbers: the replicas a load needs, target utilization, the nodes a scale-out adds, cooldown between events,
 *  spare headroom, queue backlog, cost per replica, and a burst ceiling. Crosses to `concurrency` — autoscaling is what
 *  concurrency demands. A measure. */

const PROOF = 'autoscaling arithmetic (desired replicas, target utilization, scale-out, cooldown, headroom, queue backlog, cost per replica, burst); the registry\'s elastic-capacity domain; a measure crossed to concurrency'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'autoscaling', dst: 'concurrency', formula, value, proof: PROOF, ...extra }, holds, { name: `autoscaling.${name}`, params })

export class AutoscalingFormulas {
  /** DESIRED REPLICAS: the replicas a load needs at a per-replica capacity. value ⌈load / perReplica⌉. */
  static desiredreplicas(load: number, perReplica: number): CrossFormula { return c('autoscaling-desiredreplicas', 'desiredreplicas(load, perReplica) = ⌈load / perReplica⌉', perReplica > 0 ? Math.ceil(load / perReplica) : 0, nat(load, perReplica) && perReplica > 0, 'desiredreplicas', [load, perReplica]) }
  /** TARGET UTILIZATION as a percentage. value ⌊used · 100 / capacity⌋. */
  static targetutilization(used: number, capacity: number): CrossFormula { return c('autoscaling-targetutilization', 'targetutilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'targetutilization', [used, capacity]) }
  /** SCALE-OUT: the current replicas plus a step. value current + step. */
  static scaleout(current: number, step: number): CrossFormula { return c('autoscaling-scaleout', 'scaleout(current, step) = current + step', current + step, nat(current, step), 'scaleout', [current, step]) }
  /** COOLDOWN: total seconds over the scaling events. value ⌊seconds / events⌋. */
  static cooldown(seconds: number, events: number): CrossFormula { return c('autoscaling-cooldown', 'cooldown(seconds, events) = ⌊seconds / events⌋', events > 0 ? Math.floor(seconds / events) : 0, nat(seconds, events) && events > 0, 'cooldown', [seconds, events]) }
  /** HEADROOM: spare capacity over what is used. value max(0, capacity − used). */
  static headroom(capacity: number, used: number): CrossFormula { return c('autoscaling-headroom', 'headroom(capacity, used) = max(0, capacity − used)', Math.max(0, capacity - used), nat(capacity, used) && used <= capacity, 'headroom', [capacity, used]) }
  /** QUEUE BACKLOG: requests arrived over those served. value max(0, arrived − served). */
  static queuebacklog(arrived: number, served: number): CrossFormula { return c('autoscaling-queuebacklog', 'queuebacklog(arrived, served) = max(0, arrived − served)', Math.max(0, arrived - served), nat(arrived, served), 'queuebacklog', [arrived, served]) }
  /** COST PER REPLICA: total cost over the replicas. value ⌊total / replicas⌋. */
  static costperreplica(total: number, replicas: number): CrossFormula { return c('autoscaling-costperreplica', 'costperreplica(total, replicas) = ⌊total / replicas⌋', replicas > 0 ? Math.floor(total / replicas) : 0, nat(total, replicas) && replicas > 0, 'costperreplica', [total, replicas]) }
  /** BURST: a base capacity at a burst factor. value base · factor. */
  static burst(base: number, factor: number): CrossFormula { return c('autoscaling-burst', 'burst(base, factor) = base · factor', base * factor, nat(base, factor), 'burst', [base, factor]) }
}

for (const name of ['burst', 'cooldown', 'costperreplica', 'desiredreplicas', 'headroom', 'queuebacklog', 'scaleout', 'targetutilization'] as const)
  hexRegisterOf('autoscaling', name, (AutoscalingFormulas[name] as (...x: unknown[]) => unknown).bind(AutoscalingFormulas))
