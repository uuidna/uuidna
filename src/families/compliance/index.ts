import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPLIANCE — REGULATION AS ARITHMETIC. A regime is numbers: a turnover-based penalty, the gap between controls in
 *  place and controls required, a reporting deadline from an incident, whether a count triggers a report, a risk score,
 *  the remediation effort, whether records are retained long enough, and the control coverage. Crosses to `law`, where
 *  the regulator and the court enforce. A measure, not advice. */

const PROOF = 'compliance arithmetic (turnover penalty, control gap, reporting deadline, reportable trigger, risk score, remediation, retention, coverage); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'compliance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `compliance.${name}`, params })

export class ComplianceFormulas {
  /** A TURNOVER-BASED PENALTY: `pct`% of revenue (the GDPR shape). value ⌊revenue · pct / 100⌋. */
  static penalty(revenue: number, pct: number): CrossFormula { return c('compliance-penalty', 'penalty(revenue, pct) = ⌊revenue · pct / 100⌋', Math.floor((revenue * pct) / 100), nat(revenue, pct) && pct <= 100, 'penalty', [revenue, pct]) }
  /** THE CONTROL GAP: controls required beyond those in place. value max(0, required − controls). */
  static breach(controls: number, required: number): CrossFormula { return c('compliance-breach', 'breach(controls, required) = max(0, required − controls)', Math.max(0, required - controls), nat(controls, required), 'breach', [controls, required]) }
  /** THE REPORTING DEADLINE: `days` after the incident day. value incident + days. */
  static deadline(incident: number, days: number): CrossFormula { return c('compliance-deadline', 'deadline(incident, days) = incident + days', incident + days, nat(incident, days), 'deadline', [incident, days]) }
  /** REPORTABLE: 1 when the count reaches the notification threshold. value [records ≥ threshold]. */
  static reportable(records: number, threshold: number): CrossFormula { return c('compliance-reportable', 'reportable(records, threshold) = [records ≥ threshold]', records >= threshold ? 1 : 0, nat(records, threshold), 'reportable', [records, threshold]) }
  /** THE RISK SCORE: likelihood times impact. value likelihood · impact. */
  static risk(likelihood: number, impact: number): CrossFormula { return c('compliance-risk', 'risk(likelihood, impact) = likelihood · impact', likelihood * impact, nat(likelihood, impact), 'risk', [likelihood, impact]) }
  /** REMEDIATION effort: the gaps at a cost per gap. value gaps · perGap. */
  static remediation(gaps: number, perGap: number): CrossFormula { return c('compliance-remediation', 'remediation(gaps, perGap) = gaps · perGap', gaps * perGap, nat(gaps, perGap), 'remediation', [gaps, perGap]) }
  /** RETENTION: 1 when records are kept at least as long as required. value [years ≥ required]. */
  static retention(years: number, required: number): CrossFormula { return c('compliance-retention', 'retention(years, required) = [years ≥ required]', years >= required ? 1 : 0, nat(years, required), 'retention', [years, required]) }
  /** CONTROL COVERAGE as a percentage. value ⌊controls · 100 / total⌋. */
  static coverage(controls: number, total: number): CrossFormula { return c('compliance-coverage', 'coverage(controls, total) = ⌊controls · 100 / total⌋', total > 0 ? Math.floor((controls * 100) / total) : 0, nat(controls, total) && total > 0, 'coverage', [controls, total]) }
}

for (const name of ['breach', 'coverage', 'deadline', 'penalty', 'remediation', 'reportable', 'retention', 'risk'] as const)
  hexRegisterOf('compliance', name, (ComplianceFormulas[name] as (...x: unknown[]) => unknown).bind(ComplianceFormulas))
