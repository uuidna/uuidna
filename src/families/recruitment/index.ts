import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECRUITMENT — HIRING AS ARITHMETIC (chosen by the registry, not by hand). Hiring is numbers: the funnel across stages,
 *  the yield from applicants to hires, days to fill, cost per hire, total offer value, offer acceptance, recruiters a req
 *  load needs, and retention after a year. Crosses to `sociology` — hiring is a social process measured. A measure. */

const PROOF = 'recruitment arithmetic (funnel, yield, time-to-fill, cost-per-hire, offer value, acceptance, sourcing capacity, retention); a hiring domain measured; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'recruitment', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `recruitment.${name}`, params })

export class RecruitmentFormulas {
  /** FUNNEL: interviews touched across every stage. value applicants · stages. */
  static funnel(applicants: number, stages: number): CrossFormula { return c('recruitment-funnel', 'funnel(applicants, stages) = applicants · stages', Math.max(0, applicants * stages), nat(applicants, stages), 'funnel', [applicants, stages]) }
  /** YIELD: hires per hundred applicants. value ⌊hires · 100 / applicants⌋. */
  static yield(hires: number, applicants: number): CrossFormula { return c('recruitment-yield', 'yield(hires, applicants) = ⌊hires · 100 / applicants⌋', applicants > 0 ? Math.max(0, Math.floor((hires * 100) / applicants)) : 0, nat(hires, applicants) && applicants > 0 && hires <= applicants, 'yield', [hires, applicants]) }
  /** TIME TO FILL: average days to fill a role. value ⌊days / roles⌋. */
  static timetofill(days: number, roles: number): CrossFormula { return c('recruitment-timetofill', 'timetofill(days, roles) = ⌊days / roles⌋', roles > 0 ? Math.max(0, Math.floor(days / roles)) : 0, nat(days, roles) && roles > 0, 'timetofill', [days, roles]) }
  /** COST PER HIRE: spend over the hires it bought. value ⌊spend / hires⌋. */
  static costperhire(spend: number, hires: number): CrossFormula { return c('recruitment-costperhire', 'costperhire(spend, hires) = ⌊spend / hires⌋', hires > 0 ? Math.max(0, Math.floor(spend / hires)) : 0, nat(spend, hires) && hires > 0, 'costperhire', [spend, hires]) }
  /** OFFER: total offer value at a salary each. value offers · salary. */
  static offer(offers: number, salary: number): CrossFormula { return c('recruitment-offer', 'offer(offers, salary) = offers · salary', Math.max(0, offers * salary), nat(offers, salary), 'offer', [offers, salary]) }
  /** ACCEPTANCE: accepted per hundred offers. value ⌊accepted · 100 / offers⌋. */
  static acceptance(accepted: number, offers: number): CrossFormula { return c('recruitment-acceptance', 'acceptance(accepted, offers) = ⌊accepted · 100 / offers⌋', offers > 0 ? Math.max(0, Math.floor((accepted * 100) / offers)) : 0, nat(accepted, offers) && offers > 0 && accepted <= offers, 'acceptance', [accepted, offers]) }
  /** SOURCING: recruiters a req load needs at a per-recruiter capacity. value ⌈openings / perRecruiter⌉. */
  static sourcing(openings: number, perRecruiter: number): CrossFormula { return c('recruitment-sourcing', 'sourcing(openings, perRecruiter) = ⌈openings / perRecruiter⌉', perRecruiter > 0 ? Math.max(0, Math.ceil(openings / perRecruiter)) : 0, nat(openings, perRecruiter) && perRecruiter > 0, 'sourcing', [openings, perRecruiter]) }
  /** RETENTION: hires still here per hundred, a year on. value ⌊stayed · 100 / hired⌋. */
  static retention(stayed: number, hired: number): CrossFormula { return c('recruitment-retention', 'retention(stayed, hired) = ⌊stayed · 100 / hired⌋', hired > 0 ? Math.max(0, Math.floor((stayed * 100) / hired)) : 0, nat(stayed, hired) && hired > 0 && stayed <= hired, 'retention', [stayed, hired]) }
}

for (const name of ['acceptance', 'costperhire', 'funnel', 'offer', 'retention', 'sourcing', 'timetofill', 'yield'] as const)
  hexRegisterOf('recruitment', name, (RecruitmentFormulas[name] as (...x: unknown[]) => unknown).bind(RecruitmentFormulas))
