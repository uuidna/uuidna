import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REINSURANCE — INSURANCE OF INSURERS, AS ARITHMETIC (a carrier cedes part of a risk so a loss is shared, not borne alone).
 *  Running the treaty is numbers: the share ceded, what the carrier retains, treaty capacity, the quota-share paid, surplus
 *  lines, the recovery above a retention, the width of a layer, and how a layer splits into bands. Crosses to `insurance` —
 *  reinsurance is insurance one level up. A measure. */

const PROOF = 'reinsurance arithmetic (cession, retention, treaty capacity, quota share, surplus lines, recovery, layer width, attachment bands); insurance of insurers; a measure crossed to insurance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'reinsurance', dst: 'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `reinsurance.${name}`, params })

export class ReinsuranceFormulas {
  /** CESSION: the part of a risk ceded at a rate (percent). value ⌊risk · rate / 100⌋. */
  static cession(risk: number, rate: number): CrossFormula { return c('reinsurance-cession', 'cession(risk, rate) = ⌊risk · rate / 100⌋', Math.floor((risk * rate) / 100), nat(risk, rate), 'cession', [risk, rate]) }
  /** RETENTION: what the carrier keeps after ceding. value max(0, total − ceded). */
  static retention(total: number, ceded: number): CrossFormula { return c('reinsurance-retention', 'retention(total, ceded) = max(0, total − ceded)', Math.max(0, total - ceded), nat(total, ceded), 'retention', [total, ceded]) }
  /** TREATY CAPACITY: a per-cession limit over the cessions it covers. value limit · cessions. */
  static treaty(limit: number, cessions: number): CrossFormula { return c('reinsurance-treaty', 'treaty(limit, cessions) = limit · cessions', limit * cessions, nat(limit, cessions), 'treaty', [limit, cessions]) }
  /** QUOTA SHARE: the reinsurer's fixed share (percent) of a loss. value ⌊share · loss / 100⌋. */
  static quota(share: number, loss: number): CrossFormula { return c('reinsurance-quota', 'quota(share, loss) = ⌊share · loss / 100⌋', Math.floor((share * loss) / 100), nat(share, loss) && share <= 100, 'quota', [share, loss]) }
  /** SURPLUS: lines of cover at a line size each. value lines · line. */
  static surplus(lines: number, line: number): CrossFormula { return c('reinsurance-surplus', 'surplus(lines, line) = lines · line', lines * line, nat(lines, line), 'surplus', [lines, line]) }
  /** RECOVERY: the loss above a retention, recovered from the reinsurer. value max(0, loss − retention). */
  static recovery(loss: number, retention: number): CrossFormula { return c('reinsurance-recovery', 'recovery(loss, retention) = max(0, loss − retention)', Math.max(0, loss - retention), nat(loss, retention), 'recovery', [loss, retention]) }
  /** LAYER: the width of an excess-of-loss layer. value max(0, upper − lower). */
  static layer(upper: number, lower: number): CrossFormula { return c('reinsurance-layer', 'layer(upper, lower) = max(0, upper − lower)', Math.max(0, upper - lower), nat(upper, lower), 'layer', [upper, lower]) }
  /** ATTACHMENT: a layer split into equal bands. value ⌊layer / bands⌋. */
  static attachment(layer: number, bands: number): CrossFormula { return c('reinsurance-attachment', 'attachment(layer, bands) = ⌊layer / bands⌋', bands > 0 ? Math.floor(layer / bands) : 0, nat(layer, bands) && bands > 0, 'attachment', [layer, bands]) }
}

for (const name of ['attachment', 'cession', 'layer', 'quota', 'recovery', 'retention', 'surplus', 'treaty'] as const)
  hexRegisterOf('reinsurance', name, (ReinsuranceFormulas[name] as (...x: unknown[]) => unknown).bind(ReinsuranceFormulas))
