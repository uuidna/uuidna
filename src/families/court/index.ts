import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE COURT, FOR A LAW FIRM OR A BENCH — THE ARITHMETIC A MATTER TURNS ON, ANY JURISDICTION, A LEAD UNTIL REVIEWED.
 *  What a court or a firm computes on a matter is arithmetic over the numbers that jurisdiction supplies: whether the
 *  evidence meets the standard of proof, the damages with statutory interest, the taxed costs, the share under
 *  comparative fault, the expected value of a claim, a statutory cap, a fee. These are exact and jurisdiction-agnostic —
 *  you pass the jurisdiction's own percentages, rates and periods. NONE of it is legal ADVICE: it crosses to the `law`
 *  family whose `reviewed(confirmed)` gate is the one that turns a computed conclusion into counsel, and only once a
 *  legal review has confirmed it TRUE against the authoritative document. Until then every result is a lead — computed,
 *  receipted, never asserted as advice. Run in waves (split.kelvin → 0): time split, no heat.
 *  The court's own result is the boolean (0 or 1) an existing formula already computed. A sum, a fee, a share or a
 *  period is the measure beside it. Where none of the fifteen court or law formulas computes that bit, the lead stays
 *  a lead and names the boolean that is missing. The integer is not turned into a 1. */

const PROOF = 'court arithmetic for a matter (standard of proof, damages, statutory interest, costs, comparative-fault apportionment, settlement value, statutory cap, fees; and across instances — criminal restitution, tax penalty, adverse-possession period, bankruptcy distribution, liquidated-damages reasonableness, statute-of-limitations bar, regulatory-deadline compliance); jurisdiction-agnostic. A MEASURE crossed to law, advice only when law.reviewed confirms it TRUE on the document — otherwise a lead, never counsel'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
/** Boolean first, then the missing name, then the measure. The formula's value stays the integer the arithmetic computed. */
const hoist = (extra: Record<string, unknown>): { work: Record<string, unknown>; rest: Record<string, unknown> } => {
  const boolean = extra.boolean
  const measure = extra.measure
  const lead = extra.lead
  const missing = extra.missing
  const rest = { ...extra }
  delete rest.boolean
  delete rest.measure
  delete rest.missing
  if (lead === true) delete rest.lead
  const work: Record<string, unknown> = {}
  if (boolean === 0 || boolean === 1) work.boolean = boolean
  else if (lead === true) work.lead = true
  if (typeof missing === 'string') work.missing = missing
  if (typeof measure === 'number') work.measure = measure
  if ((boolean === 0 || boolean === 1) && lead === true) work.lead = true
  return { work, rest }
}
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => {
  const { work, rest } = hoist(extra)
  return crossFormulaOf({ ...work, id, src: 'court', dst: 'law', formula, value, proof: PROOF, ...rest }, holds, { name: `court.${name}`, params })
}

export class CourtFormulas {
  /** THE STANDARD OF PROOF met: 1 when `confidence` reaches the `required` percentage the jurisdiction sets for the
   *  matter — balance of probabilities (51), clear and convincing (~75), beyond reasonable doubt (~90). value [conf ≥ req]. */
  static standard(confidence: number, required: number): CrossFormula { const boolean = confidence >= required ? 1 : 0; return c('court-standard', 'standard(confidence, required) = [confidence ≥ required]', boolean, nat(confidence, required) && confidence <= 100 && required <= 100, 'standard', [confidence, required], { boolean }) }
  /** DAMAGES with simple statutory interest: principal plus principal · rate% · years. The jurisdiction sets the rate. */
  static damages(principal: number, rate: number, years: number): CrossFormula { const measure = principal + Math.floor((principal * rate * years) / 100); return c('court-damages', 'damages(principal, rate, years) = principal + ⌊principal · rate · years / 100⌋', measure, nat(principal, rate, years), 'damages', [principal, rate, years], { lead: true, missing: 'adjudged', measure }) }
  /** STATUTORY INTEREST over `days` at `rate`% per annum (365-day year, rounded down). */
  static interest(principal: number, rate: number, days: number): CrossFormula { const measure = Math.floor((principal * rate * days) / 36500); return c('court-interest', 'interest(principal, rate, days) = ⌊principal · rate · days / 36500⌋', measure, nat(principal, rate, days), 'interest', [principal, rate, days], { lead: true, missing: 'interest-due', measure }) }
  /** TAXED COSTS: billable `hours` at an hourly `rate`. */
  static costs(hours: number, rate: number): CrossFormula { const measure = hours * rate; return c('court-costs', 'costs(hours, rate) = hours · rate', measure, nat(hours, rate), 'costs', [hours, rate], { lead: true, missing: 'taxed', measure }) }
  /** COMPARATIVE-FAULT APPORTIONMENT: a defendant's share of the `award` at `fault` of `total` fault units. */
  static apportion(award: number, fault: number, total: number): CrossFormula { const measure = total > 0 ? Math.floor((award * fault) / total) : 0; return c('court-apportion', 'apportion(award, fault, total) = ⌊award · fault / total⌋', measure, nat(award, fault, total) && total > 0 && fault <= total, 'apportion', [award, fault, total], { lead: true, missing: 'share-adjudged', measure }) }
  /** THE EXPECTED VALUE OF A CLAIM at `prob`% chance of success — what a settlement is measured against (a lead, not advice). */
  static settlement(claim: number, prob: number): CrossFormula { const measure = Math.floor((claim * prob) / 100); return c('court-settlement', 'settlement(claim, prob) = ⌊claim · prob / 100⌋', measure, nat(claim, prob) && prob <= 100, 'settlement', [claim, prob], { lead: true, missing: 'settled', measure }) }
  /** A STATUTORY DAMAGES CAP applied: the award, limited to the jurisdiction's statutory maximum. */
  static cap(award: number, statutory: number): CrossFormula { const measure = Math.min(award, statutory); return c('court-cap', 'cap(award, statutory) = min(award, statutory)', measure, nat(award, statutory), 'cap', [award, statutory], { lead: true, missing: 'capped', measure }) }
  /** A FEE by percentage: a contingency fee or a filing fee, `pct`% of the `amount`. */
  static fee(amount: number, pct: number): CrossFormula { const measure = Math.floor((amount * pct) / 100); return c('court-fee', 'fee(amount, pct) = ⌊amount · pct / 100⌋', measure, nat(amount, pct) && pct <= 100, 'fee', [amount, pct], { lead: true, missing: 'fee-allowed', measure }) }
  /** CRIMINAL RESTITUTION: the economic `harm` at the jurisdiction's restitution `multiplier`% (≤ 200), plus any fixed
   *  `punitive` the sentencing order adds. value ⌊harm · multiplier / 100⌋ + punitive. */
  static restitution(harm: number, multiplier: number, punitive: number): CrossFormula { const measure = Math.floor((harm * multiplier) / 100) + punitive; return c('court-restitution', 'restitution(harm, multiplier, punitive) = ⌊harm · multiplier / 100⌋ + punitive', measure, nat(harm, multiplier, punitive) && multiplier <= 200, 'restitution', [harm, multiplier, punitive], { lead: true, missing: 'restitution-ordered', measure }) }
  /** TAX / REGULATORY PENALTY with daily escalation: the `base` penalty plus base · `days` late · `rate`% per annum. */
  static penalty(base: number, days: number, rate: number): CrossFormula { const measure = base + Math.floor((base * days * rate) / 36500); return c('court-penalty', 'penalty(base, days, rate) = base + ⌊base · days · rate / 36500⌋', measure, nat(base, days, rate) && rate <= 100, 'penalty', [base, days, rate], { lead: true, missing: 'penalty-imposed', measure }) }
  /** ADVERSE POSSESSION period met: 1 when `held` years of open, continuous occupation reach the jurisdiction's
   *  `required` statutory period. The factual elements are law.reviewed's; this is the temporal check. value [held ≥ required]. */
  static possession(held: number, required: number): CrossFormula { const boolean = held >= required ? 1 : 0; return c('court-possession', 'possession(held, required) = [held ≥ required]', boolean, nat(held, required), 'possession', [held, required], { boolean }) }
  /** BANKRUPTCY PRO-RATA DISTRIBUTION: a creditor's share of the `estate` for its `claim` of `total` claims in the class. */
  static distribution(estate: number, claim: number, total: number): CrossFormula { const measure = total > 0 ? Math.floor((estate * claim) / total) : 0; return c('court-distribution', 'distribution(estate, claim, total) = ⌊estate · claim / total⌋', measure, nat(estate, claim, total) && total > 0 && claim <= total, 'distribution', [estate, claim, total], { lead: true, missing: 'dividend-adjudged', measure }) }
  /** LIQUIDATED DAMAGES reasonableness: 1 when the `clause` does not exceed the actual `harm` (a reasonable estimate,
   *  enforceable); 0 when it does (an unenforceable penalty). value [clause ≤ harm]. */
  static liquidated(clause: number, harm: number): CrossFormula { const boolean = clause <= harm ? 1 : 0; return c('court-liquidated', 'liquidated(clause, harm) = [clause ≤ harm]', boolean, nat(clause, harm), 'liquidated', [clause, harm], { boolean }) }
  /** STATUTE OF LIMITATIONS: 1 when the claim is time-barred — `elapsed` days since accrual exceed the `limit` the
   *  jurisdiction sets. value [elapsed > limit]. */
  static barred(elapsed: number, limit: number): CrossFormula { const boolean = elapsed > limit ? 1 : 0; return c('court-barred', 'barred(elapsed, limit) = [elapsed > limit]', boolean, nat(elapsed, limit), 'barred', [elapsed, limit], { boolean }) }
  /** REGULATORY DEADLINE compliance: 1 when a filing or breach-notification made in `elapsed` days is within the
   *  `deadline` the regulation sets (GDPR 72h, SEC, HMRC …). value [elapsed ≤ deadline]. */
  static compliant(elapsed: number, deadline: number): CrossFormula { const boolean = elapsed <= deadline ? 1 : 0; return c('court-compliant', 'compliant(elapsed, deadline) = [elapsed ≤ deadline]', boolean, nat(elapsed, deadline), 'compliant', [elapsed, deadline], { boolean }) }
}

for (const name of ['apportion', 'barred', 'cap', 'compliant', 'costs', 'damages', 'distribution', 'fee', 'interest', 'liquidated', 'penalty', 'possession', 'restitution', 'settlement', 'standard'] as const)
  hexRegisterOf('court', name, (CourtFormulas[name] as (...x: unknown[]) => unknown).bind(CourtFormulas))
