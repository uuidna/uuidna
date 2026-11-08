import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLAIMS — THE WORK OF PAYING A LOSS, AS ARITHMETIC (chosen by the public-API registry, not by hand). Settling claims is
 *  numbers: how often they come, how big they are, the loss ratio, the reserve still owed, the settled amount after the
 *  deductible, the insured's retained portion, the capped payout, and the incurred loss. Crosses to `insurance` — claims
 *  are what an insurance policy pays out. A measure. */

const PROOF = 'claims arithmetic (frequency, severity, loss ratio, reserve, settlement, deductible, payout, incurred); the registry\'s uncovered loss-settlement domain; a measure crossed to insurance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'claims', dst: 'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `claims.${name}`, params })

export class ClaimsFormulas {
  /** FREQUENCY: claims per thousand policies. value ⌊claims · 1000 / policies⌋. */
  static frequency(claims: number, policies: number): CrossFormula { return c('claims-frequency', 'frequency(claims, policies) = ⌊claims · 1000 / policies⌋', policies > 0 ? Math.floor((claims * 1000) / policies) : 0, nat(claims, policies) && policies > 0, 'frequency', [claims, policies]) }
  /** SEVERITY: the average loss per claim. value ⌊total / claims⌋. */
  static severity(total: number, claims: number): CrossFormula { return c('claims-severity', 'severity(total, claims) = ⌊total / claims⌋', claims > 0 ? Math.floor(total / claims) : 0, nat(total, claims) && claims > 0, 'severity', [total, claims]) }
  /** LOSS RATIO: losses over premium as a percentage. value ⌊losses · 100 / premium⌋. */
  static lossratio(losses: number, premium: number): CrossFormula { return c('claims-lossratio', 'lossratio(losses, premium) = ⌊losses · 100 / premium⌋', premium > 0 ? Math.floor((losses * 100) / premium) : 0, nat(losses, premium) && premium > 0, 'lossratio', [losses, premium]) }
  /** RESERVE: the loss still owed, incurred less paid. value max(0, incurred − paid). */
  static reserve(incurred: number, paid: number): CrossFormula { return c('claims-reserve', 'reserve(incurred, paid) = max(0, incurred − paid)', Math.max(0, incurred - paid), nat(incurred, paid), 'reserve', [incurred, paid]) }
  /** SETTLEMENT: the claim after the deductible is taken off. value max(0, claim − deductible). */
  static settlement(claim: number, deductible: number): CrossFormula { return c('claims-settlement', 'settlement(claim, deductible) = max(0, claim − deductible)', Math.max(0, claim - deductible), nat(claim, deductible), 'settlement', [claim, deductible]) }
  /** DEDUCTIBLE: the insured's retained portion of a loss. value min(loss, ded). */
  static deductible(loss: number, ded: number): CrossFormula { return c('claims-deductible', 'deductible(loss, ded) = min(loss, ded)', Math.min(loss, ded), nat(loss, ded), 'deductible', [loss, ded]) }
  /** PAYOUT: the claim capped at the policy limit. value min(claim, limit). */
  static payout(claim: number, limit: number): CrossFormula { return c('claims-payout', 'payout(claim, limit) = min(claim, limit)', Math.min(claim, limit), nat(claim, limit), 'payout', [claim, limit]) }
  /** INCURRED: the incurred loss, paid plus reserve. value paid + reserve. */
  static incurred(paid: number, reserve: number): CrossFormula { return c('claims-incurred', 'incurred(paid, reserve) = paid + reserve', paid + reserve, nat(paid, reserve), 'incurred', [paid, reserve]) }
}

for (const name of ['deductible', 'frequency', 'incurred', 'lossratio', 'payout', 'reserve', 'settlement', 'severity'] as const)
  hexRegisterOf('claims', name, (ClaimsFormulas[name] as (...x: unknown[]) => unknown).bind(ClaimsFormulas))
