import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MARITIME — ADMIRALTY AS ARITHMETIC. Shipping law is numbers: demurrage for laytime over-run, freight by tonnage,
 *  general-average contribution, a salvage award, register tonnage, the change in draft, apportioned collision fault, and
 *  a tonnage-based limitation of liability. Crosses to `law`, where the admiralty court decides. A measure, not advice. */

const PROOF = 'admiralty arithmetic (demurrage, freight, general average, salvage, tonnage, draft, collision apportionment, limitation of liability); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const m = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'maritime', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `maritime.${name}`, params })

export class MaritimeFormulas {
  /** DEMURRAGE: laytime days used beyond those allowed. value max(0, used − allowed). */
  static demurrage(allowed: number, used: number): CrossFormula { return m('maritime-demurrage', 'demurrage(allowed, used) = max(0, used − allowed)', Math.max(0, used - allowed), nat(allowed, used), 'demurrage', [allowed, used]) }
  /** FREIGHT: tonnage at a rate per ton. value tonnage · rate. */
  static freight(tonnage: number, rate: number): CrossFormula { return m('maritime-freight', 'freight(tonnage, rate) = tonnage · rate', tonnage * rate, nat(tonnage, rate), 'freight', [tonnage, rate]) }
  /** GENERAL AVERAGE as a percentage: the sacrificed loss over the values at risk. value ⌊loss · 100 / values⌋. */
  static generalaverage(loss: number, values: number): CrossFormula { return m('maritime-generalaverage', 'generalaverage(loss, values) = ⌊loss · 100 / values⌋', values > 0 ? Math.floor((loss * 100) / values) : 0, nat(loss, values) && values > 0, 'generalaverage', [loss, values]) }
  /** A SALVAGE AWARD: `pct`% of the salved value. value ⌊value · pct / 100⌋. */
  static salvage(value: number, pct: number): CrossFormula { return m('maritime-salvage', 'salvage(value, pct) = ⌊value · pct / 100⌋', Math.floor((value * pct) / 100), nat(value, pct) && pct <= 100, 'salvage', [value, pct]) }
  /** REGISTER TONNAGE (approx): length × beam × depth over 100. value ⌊length · beam · depth / 100⌋. */
  static tonnage(length: number, beam: number, depth: number): CrossFormula { return m('maritime-tonnage', 'tonnage(length, beam, depth) = ⌊length · beam · depth / 100⌋', Math.floor((length * beam * depth) / 100), nat(length, beam, depth), 'tonnage', [length, beam, depth]) }
  /** THE CHANGE IN DRAFT: cargo over the tonnes-per-centimetre immersion. value ⌊cargo / tpc⌋. */
  static draft(cargo: number, tpc: number): CrossFormula { return m('maritime-draft', 'draft(cargo, tpc) = ⌊cargo / tpc⌋', tpc > 0 ? Math.floor(cargo / tpc) : 0, nat(cargo, tpc) && tpc > 0, 'draft', [cargo, tpc]) }
  /** COLLISION APPORTIONMENT as a percentage of fault. value ⌊fault · 100 / total⌋. */
  static collision(fault: number, total: number): CrossFormula { return m('maritime-collision', 'collision(fault, total) = ⌊fault · 100 / total⌋', total > 0 ? Math.floor((fault * 100) / total) : 0, nat(fault, total) && total > 0 && fault <= total, 'collision', [fault, total]) }
  /** LIMITATION OF LIABILITY: tonnage at a per-ton unit of account. value tonnage · units. */
  static limitation(tonnage: number, units: number): CrossFormula { return m('maritime-limitation', 'limitation(tonnage, units) = tonnage · units', tonnage * units, nat(tonnage, units), 'limitation', [tonnage, units]) }
}

for (const name of ['collision', 'demurrage', 'draft', 'freight', 'generalaverage', 'limitation', 'salvage', 'tonnage'] as const)
  hexRegisterOf('maritime', name, (MaritimeFormulas[name] as (...x: unknown[]) => unknown).bind(MaritimeFormulas))
