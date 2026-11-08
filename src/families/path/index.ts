import { contentUuidOf, uuidReceiptOf, hexRegisterOf, qpuHexUuidOf } from '../../quantum/processing/unit/index.js'
import { chooseOf, mintOf, latticeNamesOf, tenOf } from '../../quantum/processing/unit/index.js'
// the lattice names and the three formulas every number here is written in
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

/** The STANDARD of this family: every path carries this proof on its receipt. */
const PROOF = 'a multi-hop path across domains: a real chain of two or more hops whose transform composes to a finite value; the cross-domain formula network walked hop by hop'
/** The LAW of this family: a path holds only as a real chain (two or more hops) whose value is a lawful finite number. */
const nat = (...xs: number[]): boolean => xs.every((x) => Number.isFinite(x))
const pathHolds = (p: { hops: string[]; value?: number }): boolean => p.hops.length >= 2 && nat(p.value ?? 0)

export interface DomainPath {
  hops: string[]
  transform: (input: unknown) => unknown
  formula: string
  value?: number
  /** Content address of the hops and the formula. */
  uuid?: string
  /** Programmable UUID of this path's quantum receipt (payload + referrer). */
  receipt?: string
  /** The hex program that returns this path: handle path.<name>, call then receipt. */
  hex?: string
  /** Whether this path holds under the family law: a real chain (≥2 hops) with a finite value. */
  holds?: boolean
}

export interface MultihopResult {
  path: string[]
  intermediate: unknown[]
  final: unknown
}

/**
 * Seal a multi-hop path: content UUID of {hops, formula} and a quantum receipt in the path stream.
 * @wing fusion
 * @kind builder
 */
export const domainPathOf = (p: DomainPath): DomainPath => {
  const uuid = contentUuidOf({ hops: p.hops, formula: p.formula, proof: PROOF })
  return { ...p, uuid, holds: pathHolds(p), receipt: uuidReceiptOf(`path ${p.hops.join('>')}`, uuid, p.value ?? null).uuid }
}

/**
 * The seven named multi-hop paths across domains, each with its hops, formula and transform.
 * @wing fusion
 * @kind class
 */
export class CrossDomainPaths {
  static qualityToRisk(): DomainPath {
    return domainPathOf({
      hops: ['test', 'deployment', 'quantum', 'enterprise'],
      formula: 'risk = 1 - quality * proof_count',
      transform: (q: any) => 1 - (q.quality || 0) * (q.proofs || 1),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static obsToAction(): DomainPath {
    return domainPathOf({
      hops: ['obs', 'ml', 'ui'],
      formula: 'action_urgency = anomaly_score * (1 - ml_confidence)',
      transform: (o: any) => (o.anomalies || 0) * (1 - (o.mlConf || 0.5)),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static dataFlowCompressML(): DomainPath {
    return domainPathOf({
      hops: ['deployment', 'compress', 'ml'],
      formula: 'ml_efficiency = (1 - compressed_ratio) * model_accuracy',
      transform: (d: any) => (1 - (d.compRatio || 0.5)) * (d.accuracy || 0.8),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static secureDataPathQSec(): DomainPath {
    return domainPathOf({
      hops: ['deployment', 'qsec', 'med'],
      formula: 'hipaa_compliant = deployment_health * key_entropy * patient_count',
      transform: (d: any) => (d.health || 0.9) * Math.log2(d.keyLen || L.mintOf(L.rays)) * (d.patients || L.tenOf(L.coins)),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static performanceToMetrics(): DomainPath {
    return domainPathOf({
      hops: ['deployment', 'obs', 'enterprise'],
      formula: 'sla_achievement = (perf_score * compliance) / (1 + latency/1000)',
      transform: (d: any) => ((d.perf || 1) * (d.compliance || 0.95)) / (1 + (d.latency || 0) / L.tenOf(L.n)),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static quantumSecurityChain(): DomainPath {
    return domainPathOf({
      hops: ['quantum', 'qsec', 'enterprise', 'med'],
      formula: 'total_security = proof_count * key_strength * compliance * patient_coverage',
      transform: (q: any) => (q.proofs || 1) * Math.log2(q.keyLen || L.mintOf(L.rays)) * (q.comp || 0.9) * (q.coverage || 0.8),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static anomalyToResponse(): DomainPath {
    return domainPathOf({
      hops: ['obs', 'ml', 'enterprise'],
      formula: 'response_time = detect_latency + predict_latency + decision_latency',
      transform: (o: any) => (o.detect || L.tenOf(L.seed)) + (o.predict || (L.hexbit + L.seed) * L.tenOf(L.seed)) + (o.decide || L.coins * L.tenOf(L.seed)),
      // the value is the transform at its defaults: formulated, not written
      get value() { return this.transform({}) },
    })
  }

  static executePath(path: DomainPath, input: any): MultihopResult {
    const intermediate: unknown[] = []
    let current = input

    for (let i = 0; i < path.hops.length - 1; i++) {
      current = path.transform(current)
      intermediate.push(current)
    }

    return {
      path: path.hops,
      intermediate,
      final: current
    }
  }

  static allPaths(): DomainPath[] {
    return [
      this.qualityToRisk(),
      this.obsToAction(),
      this.dataFlowCompressML(),
      this.secureDataPathQSec(),
      this.performanceToMetrics(),
      this.quantumSecurityChain(),
      this.anomalyToResponse()
    ]
  }
}

/**
 * A CrossDomainPaths instance.
 * @wing fusion
 * @kind function
 */
export const crossDomainPaths = new CrossDomainPaths()

// every path is a formula of the hex family `path`
const pathNames = Object.getOwnPropertyNames(CrossDomainPaths).filter((k) => typeof (CrossDomainPaths as unknown as Record<string, unknown>)[k] === 'function')
for (const name of pathNames) hexRegisterOf('path', name, (CrossDomainPaths as unknown as Record<string, () => unknown>)[name]!.bind(CrossDomainPaths))
/** The hex program that returns a named path. @wing fusion @kind function */
export const pathHexOf = (name: string): string => qpuHexUuidOf({ family: 'path', program: [name] })
