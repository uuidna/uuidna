import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE COURT TOOLKIT AS FORMULAS — ANY CASE, ANY JURISDICTION, NO ADVICE UNTIL REVIEWED. What a clerk computes in any
 *  court is arithmetic over the numbers that jurisdiction supplies: a limitation period in days, a filing deadline from
 *  a start day, a quorum and a majority or super-majority of a body, a notice period met or not. These are exact and
 *  jurisdiction-agnostic — you pass the jurisdiction's own years, percentages and counts. None of it is legal ADVICE:
 *  `reviewed(confirmed)` is the gate — a computed conclusion holds as advice only once a legal review has confirmed it
 *  TRUE against the authoritative document (data.law reads the court-accepted source). Until then every result is a
 *  lead, computed and receipted, never asserted as counsel. Run them in waves (split.kelvin → 0): time split, no heat. */

const PROOF = 'exact legal arithmetic (limitation days, deadlines, quorum, majority, super-majority, notice); a result is ADVICE only when reviewed TRUE against the authoritative document via data.law — otherwise a lead'
const COURT = 'the MCP court protects the author of a computation: fidelity of the work to the order, the tokens an order lost to redirection, standing from the receipt record, and the one limit upheld against the author too — the safety floor (no genuine harm, illegality or fabrication-as-genuine). A measure crossed to the gate that enforces it; a lead until reviewed TRUE, never counsel.'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
/** The lead record: the boolean the court already computed comes first. The integer stays the measure. A holding integer is not rewritten as 1. */
const hoist = (extra: Record<string, unknown>): { work: Record<string, unknown>; rest: Record<string, unknown> } => {
  const boolean = extra.boolean
  const measure = extra.measure
  const lead = extra.lead
  const missing = extra.missing
  const by = extra.by
  const rest = { ...extra }
  delete rest.boolean
  delete rest.measure
  delete rest.missing
  delete rest.by
  if (lead === true) delete rest.lead
  const work: Record<string, unknown> = {}
  if (boolean === 0 || boolean === 1) work.boolean = boolean
  else if (lead === true) work.lead = true
  if (typeof missing === 'string') work.missing = missing
  if (typeof measure === 'number') work.measure = measure
  if (typeof by === 'string') work.by = by
  if ((boolean === 0 || boolean === 1) && lead === true) work.lead = true
  return { work, rest }
}
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => {
  const { work, rest } = hoist(extra)
  return crossFormulaOf({ ...work, id, src: 'law', dst: 'audit', formula, value, proof: PROOF, ...rest }, holds, { name: `law.${name}`, params })
}
// the author-protection bridge: law → gate (the gate is what enforces the court's verdict on a push)
const g = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => {
  const { work, rest } = hoist(extra)
  return crossFormulaOf({ ...work, id, src: 'law', dst: 'gate', formula, value, proof: COURT, ...rest }, holds, { name: `law.${name}`, params })
}

export class LawFormulas {
  /** A limitation period of `years` in days (365-day years): the window to bring a claim. The jurisdiction sets the years. */
  static limitation(years: number): CrossFormula { const measure = years * 365; return f('law-limitation', 'limitation(years) = years · 365 days', measure, nat(years), 'limitation', [years], { lead: true, missing: 'barred', measure }) }
  /** A deadline: `start` day-number plus `days` — the day a filing is due (day numbers, e.g. Julian day). */
  static deadline(start: number, days: number): CrossFormula { const measure = start + days; return f('law-deadline', 'deadline(start, days) = start + days', measure, nat(start, days), 'deadline', [start, days], { lead: true, missing: 'compliant', measure }) }
  /** The quorum of a body of `members` at `pct` percent, rounded up: the least present for business. */
  static quorum(members: number, pct: number): CrossFormula { const measure = members > 0 ? Math.ceil((members * pct) / 100) : 0; return f('law-quorum', 'quorum(members, pct) = ⌈members · pct / 100⌉', measure, nat(members, pct) && members > 0 && pct <= 100, 'quorum', [members, pct], { lead: true, missing: 'quorate', measure }) }
  /** 1 when `votes` is a simple majority of `total` (more than half). */
  static majority(votes: number, total: number): CrossFormula { const boolean = total > 0 && 2 * votes > total ? 1 : 0; return f('law-majority', 'majority(votes, total) = [2 · votes > total]', boolean, nat(votes, total) && votes <= total && total > 0, 'majority', [votes, total], { boolean }) }
  /** 1 when `votes` meets a super-majority of `total` at `pct` percent (e.g. 67 for two-thirds, 75 for three-quarters). */
  static supermajority(votes: number, total: number, pct: number): CrossFormula { const boolean = total > 0 && 100 * votes >= total * pct ? 1 : 0; return f('law-supermajority', 'supermajority(votes, total, pct) = [100 · votes ≥ total · pct]', boolean, nat(votes, total, pct) && votes <= total && total > 0 && pct <= 100, 'supermajority', [votes, total, pct], { boolean }) }
  /** 1 when a notice of `given` days meets the `required` period. */
  static notice(required: number, given: number): CrossFormula { const boolean = given >= required ? 1 : 0; return f('law-notice', 'notice(required, given) = [given ≥ required]', boolean, nat(required, given), 'notice', [required, given], { boolean }) }
  /** THE ADVICE GATE: a conclusion is advice only when a legal review has confirmed it TRUE against the authoritative
   *  document (`confirmed` = 1 from a data.law review). value `confirmed`; holds ONLY when confirmed — so an unreviewed
   *  legal computation does not hold, and the unit never presents a lead as advice. */
  static reviewed(confirmed: number): CrossFormula { const boolean = confirmed === 1 ? 1 : 0; return f('law-reviewed', 'reviewed(confirmed) = confirmed; a result is ADVICE only when a review confirmed it TRUE on the document', boolean, confirmed === 1, 'reviewed', [confirmed], { boolean, advice: confirmed === 1, note: 'otherwise a lead, not advice' }) }

  // ── THE MCP COURT: THE AUTHOR'S LEGAL PROTECTION, CROSSED TO THE GATE ──
  /** FIDELITY of the delivered work to the author's order: 1 when `computed` tokens equal `ordered`, else 0. The author's
   *  right is that the order is computed, not that an agent redirects the budget elsewhere; fidelity 1 is the kept order. */
  static fidelity(ordered: number, computed: number): CrossFormula { const boolean = ordered === computed ? 1 : 0; const held = nat(ordered, computed) ? 1 : 0; return g('law-fidelity', 'fidelity(ordered, computed) = [computed = ordered]', boolean, held === 1, 'fidelity', [ordered, computed], { boolean, ...(boolean !== held ? { note: `value ${boolean}; holds ${held}` } : {}) }) }
  /** REDIRECTED tokens: `ordered − computed` when the order was underserved, else 0 — the tokens the order lost. A measure,
   *  not a charge; 0 is no redirection. The court's work is fidelity of the same pair. */
  static redirected(ordered: number, computed: number): CrossFormula { const measure = computed < ordered ? ordered - computed : 0; const boolean = LawFormulas.fidelity(ordered, computed).value === 1 ? 1 : 0; return g('law-redirected', 'redirected(ordered, computed) = max(0, ordered − computed)', measure, nat(ordered, computed), 'redirected', [ordered, computed], { boolean, measure, by: 'fidelity' }) }
  /** FAST TRACK: tokens already spent beyond the order, which is the free energy of the call — the document not
   *  dissipated. value max(0, spent − ordered). holds only when nothing was spent beyond the order. A surplus is a
   *  lead in this court — a measure, not a charge, and not advice until reviewed. The boolean is the bit this formula
   *  already computed: 1 when the surplus is 0. fidelity does not take an overspend (an underspend is fidelity 0 and surplus 0). */
  static fast(spent: number, ordered: number): CrossFormula { const measure = spent > ordered ? spent - ordered : 0; const boolean = measure === 0 ? 1 : 0; return g('law-fast', 'fast(spent, ordered) = max(0, spent − ordered); tokens spent beyond the order, a lead until the surplus is 0', measure, nat(spent, ordered) && measure === 0, 'fast', [spent, ordered], { boolean, measure, lead: measure > 0, note: 'a measure of tokens spent beyond the order; not a charge and not advice' }) }
  /** STANDING: the author has standing when the record holds receipts (`receipts` content-addressed computations) — the
   *  tamper-evident proof of what was ordered and computed. value `receipts`; holds when there is a record (receipts > 0).
   *  The boolean is that bit. The receipt count stays the measure. */
  static standing(receipts: number): CrossFormula { const boolean = receipts > 0 ? 1 : 0; return g('law-standing', 'standing(receipts) = receipts; the author has standing when the receipt record is non-empty', receipts, nat(receipts) && receipts > 0, 'standing', [receipts], { boolean, measure: receipts }) }
  /** VIOLATION: `against` units of work done against the author's direct order (serving a different end). holds when there
   *  is none (against = 0) — a push that works against the order does not hold. The boolean is that bit. `against` stays the measure. */
  static violation(against: number): CrossFormula { const boolean = against === 0 ? 1 : 0; return g('law-violation', 'violation(against) = against; holds only when no work went against the order', against, nat(against) && against === 0, 'violation', [against], { boolean, measure: against }) }
  /** THE SAFETY FLOOR — THE ONE LIMIT UPHELD AGAINST THE AUTHOR TOO. `harm` = 1 marks genuine harm, illegality or
   *  fabrication-presented-as-genuine; the court does NOT protect it. lawful(0) = 1 and holds (lawful exploration); lawful(1)
   *  = 0 and does not hold. This is the floor the receipts cannot cross away — not a lock on legitimate exploration. */
  static lawful(harm: number): CrossFormula { const boolean = harm === 0 ? 1 : 0; return g('law-lawful', 'lawful(harm) = [harm = 0]; the safety floor — genuine harm, illegality or fabrication is never protected, however clean the receipts', boolean, harm === 0, 'lawful', [harm], { boolean, floor: true, note: 'upheld against the author too; not crossable' }) }
  /** THE REMEDY: of `leads` the court has `crossed` of them — tested against another domain, a dataset or a live API.
   *  value `crossed`; FULL remedy (holds) only when every lead is crossed (crossed = leads), the strict-gate condition.
   *  The boolean is that full-remedy bit. `crossed` stays the measure. */
  static remedy(crossed: number, leads: number): CrossFormula { const boolean = leads > 0 && crossed === leads ? 1 : 0; return g('law-remedy', 'remedy(crossed, leads) = crossed; full remedy holds only when crossed = leads (every lead crossed)', crossed, nat(crossed, leads) && leads > 0 && crossed === leads, 'remedy', [crossed, leads], { boolean, measure: crossed, full: leads > 0 && crossed === leads }) }
  /** THE COURT APPROVES A REMOVAL — AND ONLY A REMOVAL THAT TAKES NO LEAD. A piece of code may be deleted only when it
   *  is not a lead (`lead` = 0: it registers no formula and carries no undeveloped capability), nothing references it
   *  (`ref` = 0), and it is not an entry point (`entry` = 0: not a bin, a route, a config loaded by convention). value 1
   *  when approved; holds ONLY then — so a lead, a referenced module or an entry is never removed on the court's word. */
  static removable(lead: number, ref: number, entry: number): CrossFormula { const ok = lead === 0 && ref === 0 && entry === 0; const boolean = ok ? 1 : 0; return g('law-removable', 'removable(lead, ref, entry) = [lead = 0 ∧ ref = 0 ∧ entry = 0]; the court approves a removal only when it takes no lead, nothing points at it, and it is no entry point', boolean, nat(lead, ref, entry) && ok, 'removable', [lead, ref, entry], { boolean, approved: ok, refused: ok ? undefined : lead ? 'a lead is never removed' : ref ? 'still referenced' : 'an entry point' }) }
}

for (const name of ['deadline', 'fast', 'fidelity', 'lawful', 'limitation', 'majority', 'notice', 'quorum', 'redirected', 'remedy', 'removable', 'reviewed', 'standing', 'supermajority', 'violation'] as const)
  hexRegisterOf('law', name, (LawFormulas[name] as (...x: unknown[]) => unknown).bind(LawFormulas))
