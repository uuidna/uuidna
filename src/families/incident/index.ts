import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INCIDENT — RUNNING AN OUTAGE, AS ARITHMETIC (chosen by the operations registry, not by hand). Responding to failure is
 *  numbers: time to repair, time to acknowledge, the error budget left, how far the blast reaches, how bad it is, how much
 *  of the postmortem got done, how often it comes back, and whether it breached the SLA. Crosses to `reliability` — incident
 *  is what reliability is measured against. A measure. */

const PROOF = 'incident arithmetic (mttr, mtta, error budget, blast radius, severity, postmortem score, recurrence, SLA impact); the operations registry\'s uncovered domain; a measure crossed to reliability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'incident', dst: 'reliability', formula, value, proof: PROOF, ...extra }, holds, { name: `incident.${name}`, params })

export class IncidentFormulas {
  /** MEAN TIME TO REPAIR: total downtime minutes over the incidents. value ⌊downtime / incidents⌋. */
  static mttr(downtime: number, incidents: number): CrossFormula { return c('incident-mttr', 'mttr(downtime, incidents) = ⌊downtime / incidents⌋', incidents > 0 ? Math.floor(downtime / incidents) : 0, nat(downtime, incidents) && incidents > 0, 'mttr', [downtime, incidents]) }
  /** MEAN TIME TO ACKNOWLEDGE: total ack minutes over the alerts. value ⌊acktime / alerts⌋. */
  static mtta(acktime: number, alerts: number): CrossFormula { return c('incident-mtta', 'mtta(acktime, alerts) = ⌊acktime / alerts⌋', alerts > 0 ? Math.floor(acktime / alerts) : 0, nat(acktime, alerts) && alerts > 0, 'mtta', [acktime, alerts]) }
  /** ERROR BUDGET LEFT: the budget minus what was consumed, never below zero. value max(0, budget − consumed). */
  static errorbudget(budget: number, consumed: number): CrossFormula { return c('incident-errorbudget', 'errorbudget(budget, consumed) = max(0, budget − consumed)', Math.max(0, budget - consumed), nat(budget, consumed), 'errorbudget', [budget, consumed]) }
  /** BLAST RADIUS: services hit times the users on each. value services · users. */
  static blastradius(services: number, users: number): CrossFormula { return c('incident-blastradius', 'blastradius(services, users) = services · users', services * users, nat(services, users), 'blastradius', [services, users]) }
  /** SEVERITY: impact weight times the scope. value impact · scope. */
  static severity(impact: number, scope: number): CrossFormula { return c('incident-severity', 'severity(impact, scope) = impact · scope', impact * scope, nat(impact, scope), 'severity', [impact, scope]) }
  /** POSTMORTEM SCORE: action items done as a percentage. value ⌊done · 100 / actions⌋. */
  static postmortemscore(done: number, actions: number): CrossFormula { return c('incident-postmortemscore', 'postmortemscore(done, actions) = ⌊done · 100 / actions⌋', actions > 0 ? Math.floor((done * 100) / actions) : 0, nat(done, actions) && actions > 0 && done <= actions, 'postmortemscore', [done, actions]) }
  /** RECURRENCE: how many times per period an incident returns. value ⌊count / months⌋. */
  static recurrence(count: number, months: number): CrossFormula { return c('incident-recurrence', 'recurrence(count, months) = ⌊count / months⌋', months > 0 ? Math.floor(count / months) : 0, nat(count, months) && months > 0, 'recurrence', [count, months]) }
  /** THE SLA IMPACT: 1 when downtime breaches the allowance. value [downtime > allowed]. */
  static slaimpact(downtime: number, allowed: number): CrossFormula { return c('incident-slaimpact', 'slaimpact(downtime, allowed) = [downtime > allowed]', downtime > allowed ? 1 : 0, nat(downtime, allowed), 'slaimpact', [downtime, allowed]) }
}

for (const name of ['blastradius', 'errorbudget', 'mtta', 'mttr', 'postmortemscore', 'recurrence', 'severity', 'slaimpact'] as const)
  hexRegisterOf('incident', name, (IncidentFormulas[name] as (...x: unknown[]) => unknown).bind(IncidentFormulas))
