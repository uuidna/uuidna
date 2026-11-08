import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COHORT — A GROUP OF MEMBERS OVER TIME, AS ARITHMETIC (chosen by the public-API registry, not by hand). A cohort is
 *  numbers: how many stay (retention), how big it is, how many engage, revenue per member, daily over monthly use,
 *  how fast it matures, how it compares to a baseline, and how it decays. Crosses to `analytics` — a cohort is what
 *  analytics measures. A measure. */

const PROOF = 'cohort arithmetic (retention, size, engagement, revenue per member, stickiness, maturation, comparison, decay); a group measured over time; a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cohort', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `cohort.${name}`, params })

export class CohortFormulas {
  /** RETENTION as a percentage: members still active over the initial count. value ⌊active · 100 / initial⌋. */
  static retention(active: number, initial: number): CrossFormula { return c('cohort-retention', 'retention(active, initial) = ⌊active · 100 / initial⌋', initial > 0 ? Math.floor((active * 100) / initial) : 0, nat(active, initial) && initial > 0 && active <= initial, 'retention', [active, initial]) }
  /** SIZE: the member count itself. value members. */
  static size(members: number): CrossFormula { return c('cohort-size', 'size(members) = members', members, nat(members), 'size', [members]) }
  /** ENGAGEMENT as a percentage: engaged members over the total. value ⌊engaged · 100 / members⌋. */
  static engagement(engaged: number, members: number): CrossFormula { return c('cohort-engagement', 'engagement(engaged, members) = ⌊engaged · 100 / members⌋', members > 0 ? Math.floor((engaged * 100) / members) : 0, nat(engaged, members) && members > 0 && engaged <= members, 'engagement', [engaged, members]) }
  /** REVENUE per member (ARPU): total revenue over the member count. value ⌊total / members⌋. */
  static revenue(total: number, members: number): CrossFormula { return c('cohort-revenue', 'revenue(total, members) = ⌊total / members⌋', members > 0 ? Math.floor(total / members) : 0, nat(total, members) && members > 0, 'revenue', [total, members]) }
  /** STICKINESS (DAU/MAU) as a percentage: daily active over monthly active. value ⌊daily · 100 / monthly⌋. */
  static stickiness(daily: number, monthly: number): CrossFormula { return c('cohort-stickiness', 'stickiness(daily, monthly) = ⌊daily · 100 / monthly⌋', monthly > 0 ? Math.floor((daily * 100) / monthly) : 0, nat(daily, monthly) && monthly > 0 && daily <= monthly, 'stickiness', [daily, monthly]) }
  /** MATURATION: members converted over the weeks elapsed. value ⌊converted / weeks⌋. */
  static maturation(converted: number, weeks: number): CrossFormula { return c('cohort-maturation', 'maturation(converted, weeks) = ⌊converted / weeks⌋', weeks > 0 ? Math.floor(converted / weeks) : 0, nat(converted, weeks) && weeks > 0, 'maturation', [converted, weeks]) }
  /** COMPARISON as a percentage: the current cohort against a baseline. value ⌊current · 100 / baseline⌋. */
  static comparison(current: number, baseline: number): CrossFormula { return c('cohort-comparison', 'comparison(current, baseline) = ⌊current · 100 / baseline⌋', baseline > 0 ? Math.floor((current * 100) / baseline) : 0, nat(current, baseline) && baseline > 0, 'comparison', [current, baseline]) }
  /** DECAY as a percentage: members remaining over the starting count. value ⌊remaining · 100 / start⌋. */
  static decay(remaining: number, start: number): CrossFormula { return c('cohort-decay', 'decay(remaining, start) = ⌊remaining · 100 / start⌋', start > 0 ? Math.floor((remaining * 100) / start) : 0, nat(remaining, start) && start > 0 && remaining <= start, 'decay', [remaining, start]) }
}

for (const name of ['comparison', 'decay', 'engagement', 'maturation', 'retention', 'revenue', 'size', 'stickiness'] as const)
  hexRegisterOf('cohort', name, (CohortFormulas[name] as (...x: unknown[]) => unknown).bind(CohortFormulas))
