import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLICY — PUBLIC POLICY AS ARITHMETIC (chosen by the registry, not by hand). Weighing a policy is numbers: the benefit
 *  per unit cost, the share of the population it touches, how much of what was proposed got adopted, how much of what is
 *  subject actually complies, outcome per unit spend, the share of a target reached, the lag before a law takes effect,
 *  and benefit shared per group. Crosses to `law` — policy is what law enacts. A measure. */

const PROOF = 'policy arithmetic (cost-benefit, population impact, adoption, compliance, efficiency, reach, enactment lag, equity); a measure crossed to law'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'policy', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `policy.${name}`, params })

export class PolicyFormulas {
  /** COST-BENEFIT: benefit per unit cost, as a percentage. value ⌊benefit · 100 / cost⌋. */
  static costbenefit(benefit: number, cost: number): CrossFormula { return c('policy-costbenefit', 'costbenefit(benefit, cost) = ⌊benefit · 100 / cost⌋', cost > 0 ? Math.floor((benefit * 100) / cost) : 0, nat(benefit, cost) && cost > 0, 'costbenefit', [benefit, cost]) }
  /** IMPACT: the share of the population affected, as a percentage. value ⌊affected · 100 / population⌋. */
  static impact(affected: number, population: number): CrossFormula { return c('policy-impact', 'impact(affected, population) = ⌊affected · 100 / population⌋', population > 0 ? Math.floor((affected * 100) / population) : 0, nat(affected, population) && population > 0 && affected <= population, 'impact', [affected, population]) }
  /** ADOPTION: the share of what was proposed that got adopted, as a percentage. value ⌊adopted · 100 / proposed⌋. */
  static adoption(adopted: number, proposed: number): CrossFormula { return c('policy-adoption', 'adoption(adopted, proposed) = ⌊adopted · 100 / proposed⌋', proposed > 0 ? Math.floor((adopted * 100) / proposed) : 0, nat(adopted, proposed) && proposed > 0 && adopted <= proposed, 'adoption', [adopted, proposed]) }
  /** COMPLIANCE: the share of those subject that comply, as a percentage. value ⌊compliant · 100 / subject⌋. */
  static compliance(compliant: number, subject: number): CrossFormula { return c('policy-compliance', 'compliance(compliant, subject) = ⌊compliant · 100 / subject⌋', subject > 0 ? Math.floor((compliant * 100) / subject) : 0, nat(compliant, subject) && subject > 0 && compliant <= subject, 'compliance', [compliant, subject]) }
  /** EFFICIENCY: outcome per unit spend. value ⌊outcome / spend⌋. */
  static efficiency(outcome: number, spend: number): CrossFormula { return c('policy-efficiency', 'efficiency(outcome, spend) = ⌊outcome / spend⌋', spend > 0 ? Math.floor(outcome / spend) : 0, nat(outcome, spend) && spend > 0, 'efficiency', [outcome, spend]) }
  /** REACH: the share of a target reached, as a percentage. value ⌊served · 100 / target⌋. */
  static reach(served: number, target: number): CrossFormula { return c('policy-reach', 'reach(served, target) = ⌊served · 100 / target⌋', target > 0 ? Math.floor((served * 100) / target) : 0, nat(served, target) && target > 0 && served <= target, 'reach', [served, target]) }
  /** LAG: the delay from enactment to effect. value max(0, effective − enacted). */
  static lag(enacted: number, effective: number): CrossFormula { return c('policy-lag', 'lag(enacted, effective) = max(0, effective − enacted)', Math.max(0, effective - enacted), nat(enacted, effective), 'lag', [enacted, effective]) }
  /** EQUITY: benefit shared per group. value ⌊benefit / group⌋. */
  static equity(benefit_: number, group: number): CrossFormula { return c('policy-equity', 'equity(benefit, group) = ⌊benefit / group⌋', group > 0 ? Math.floor(benefit_ / group) : 0, nat(benefit_, group) && group > 0, 'equity', [benefit_, group]) }
}

for (const name of ['adoption', 'compliance', 'costbenefit', 'efficiency', 'equity', 'impact', 'lag', 'reach'] as const)
  hexRegisterOf('policy', name, (PolicyFormulas[name] as (...x: unknown[]) => unknown).bind(PolicyFormulas))
