import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FAILURE — FMEA AS ARITHMETIC (failure mode and effects analysis, as numbers). Reliability is counting: the risk priority
 *  number, severity, how often a mode occurs, how well it is detected, criticality, the modes a system has, their root
 *  causes, and the fraction of defects that escape. Crosses to `quality` — failure is what quality measures against. A measure. */

const PROOF = 'failure arithmetic (FMEA rpn, severity, occurrence, detection, criticality, mode count, root causes, escape rate); reliability as counting; a measure crossed to quality'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'failure', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, { name: `failure.${name}`, params })

export class FailureFormulas {
  /** RISK PRIORITY NUMBER: severity · occurrence · detection (the FMEA score). value severity · occurrence · detection. */
  static rpn(severity: number, occurrence: number, detection: number): CrossFormula { return c('failure-rpn', 'rpn(severity, occurrence, detection) = severity · occurrence · detection', severity * occurrence * detection, nat(severity, occurrence, detection), 'rpn', [severity, occurrence, detection]) }
  /** SEVERITY: the harm of an effect over the scope it reaches. value impact · scope. */
  static severity(impact: number, scope: number): CrossFormula { return c('failure-severity', 'severity(impact, scope) = impact · scope', impact * scope, nat(impact, scope), 'severity', [impact, scope]) }
  /** OCCURRENCE: how often a mode occurs, as a percentage. value ⌊failures · 100 / total⌋. */
  static occurrence(failures: number, total: number): CrossFormula { return c('failure-occurrence', 'occurrence(failures, total) = ⌊failures · 100 / total⌋', total > 0 ? Math.floor((failures * 100) / total) : 0, nat(failures, total) && total > 0 && failures <= total, 'occurrence', [failures, total]) }
  /** DETECTION: the share of defects caught, as a percentage. value ⌊caught · 100 / total⌋. */
  static detection(caught: number, total: number): CrossFormula { return c('failure-detection', 'detection(caught, total) = ⌊caught · 100 / total⌋', total > 0 ? Math.floor((caught * 100) / total) : 0, nat(caught, total) && total > 0 && caught <= total, 'detection', [caught, total]) }
  /** CRITICALITY: severity weighted by occurrence (MIL-STD, no detection). value severity · occurrence. */
  static criticality(severity: number, occurrence: number): CrossFormula { return c('failure-criticality', 'criticality(severity, occurrence) = severity · occurrence', severity * occurrence, nat(severity, occurrence), 'criticality', [severity, occurrence]) }
  /** MODE COUNT: the failure modes a system has — components times the modes each. value components · perComponent. */
  static modecount(components: number, perComponent: number): CrossFormula { return c('failure-modecount', 'modecount(components, perComponent) = components · perComponent', components * perComponent, nat(components, perComponent), 'modecount', [components, perComponent]) }
  /** ROOT CAUSES: the causes behind the modes — modes times the causes each. value modes · perMode. */
  static rootcauses(modes: number, perMode: number): CrossFormula { return c('failure-rootcauses', 'rootcauses(modes, perMode) = modes · perMode', modes * perMode, nat(modes, perMode), 'rootcauses', [modes, perMode]) }
  /** ESCAPE RATE: the percentage of defects not caught before shipping. value ⌊max(0, total − caught) · 100 / total⌋. */
  static escaperate(total: number, caught: number): CrossFormula { return c('failure-escaperate', 'escaperate(total, caught) = ⌊max(0, total − caught) · 100 / total⌋', total > 0 ? Math.floor((Math.max(0, total - caught) * 100) / total) : 0, nat(total, caught) && total > 0, 'escaperate', [total, caught]) }
}

for (const name of ['criticality', 'detection', 'escaperate', 'modecount', 'occurrence', 'rootcauses', 'rpn', 'severity'] as const)
  hexRegisterOf('failure', name, (FailureFormulas[name] as (...x: unknown[]) => unknown).bind(FailureFormulas))
