import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TITRATION — VOLUMETRIC ANALYSIS, AS ARITHMETIC. A titration is numbers: the titrant volume to the equivalence point,
 *  an unknown concentration by dilution, the burette endpoint reading, normality from a molarity, the titer, the buffer
 *  ratio, the indicator midpoint, and the back-titration excess. Crosses to `chemistry` — titration is how a concentration
 *  is measured. A measure. */

const PROOF = 'titration arithmetic (equivalence volume, unknown concentration, endpoint reading, normality, titer, buffer ratio, indicator midpoint, back-titration excess); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'titration', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `titration.${name}`, params })

export class TitrationFormulas {
  /** EQUIVALENCE: the titrant volume to neutralise the analyte (Va·Ca = Vb·Cb). value ⌊acidVol · acidConc / baseConc⌋. */
  static equivalence(acidVol: number, acidConc: number, baseConc: number): CrossFormula { return c('titration-equivalence', 'equivalence(acidVol, acidConc, baseConc) = ⌊acidVol · acidConc / baseConc⌋', baseConc > 0 ? Math.floor((acidVol * acidConc) / baseConc) : 0, nat(acidVol, acidConc, baseConc) && baseConc > 0, 'equivalence', [acidVol, acidConc, baseConc]) }
  /** CONCENTRATION: an unknown concentration by dilution (C1·V1 = C2·V2). value ⌊vol1 · conc1 / vol2⌋. */
  static concentration(vol1: number, conc1: number, vol2: number): CrossFormula { return c('titration-concentration', 'concentration(vol1, conc1, vol2) = ⌊vol1 · conc1 / vol2⌋', vol2 > 0 ? Math.floor((vol1 * conc1) / vol2) : 0, nat(vol1, conc1, vol2) && vol2 > 0, 'concentration', [vol1, conc1, vol2]) }
  /** ENDPOINT: the titrant delivered, from the burette readings. value max(0, final − initial). */
  static endpoint(initial: number, final: number): CrossFormula { return c('titration-endpoint', 'endpoint(initial, final) = max(0, final − initial)', Math.max(0, final - initial), nat(initial, final) && final >= initial, 'endpoint', [initial, final]) }
  /** NORMALITY: equivalents per litre, molarity times the n-factor. value molarity · nfactor. */
  static normality(molarity: number, nfactor: number): CrossFormula { return c('titration-normality', 'normality(molarity, nfactor) = molarity · nfactor', molarity * nfactor, nat(molarity, nfactor), 'normality', [molarity, nfactor]) }
  /** TITER: the analyte mass equivalent to a unit volume of titrant. value ⌊mass / volume⌋. */
  static titer(mass: number, volume: number): CrossFormula { return c('titration-titer', 'titer(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'titer', [mass, volume]) }
  /** BUFFER: the conjugate-base to acid ratio (Henderson–Hasselbalch). value ⌊salt / acid⌋. */
  static buffer(acid: number, salt: number): CrossFormula { return c('titration-buffer', 'buffer(acid, salt) = ⌊salt / acid⌋', acid > 0 ? Math.floor(salt / acid) : 0, nat(acid, salt) && acid > 0, 'buffer', [acid, salt]) }
  /** INDICATOR: the colour-change midpoint of the transition range. value ⌊(low + high) / 2⌋. */
  static indicator(low: number, high: number): CrossFormula { return c('titration-indicator', 'indicator(low, high) = ⌊(low + high) / 2⌋', Math.floor((low + high) / 2), nat(low, high) && low <= high, 'indicator', [low, high]) }
  /** BACK-TITRATION: the unreacted excess reagent. value max(0, added − backVol). */
  static backtitration(added: number, backVol: number): CrossFormula { return c('titration-backtitration', 'backtitration(added, backVol) = max(0, added − backVol)', Math.max(0, added - backVol), nat(added, backVol) && added >= backVol, 'backtitration', [added, backVol]) }
}

for (const name of ['backtitration', 'buffer', 'concentration', 'endpoint', 'equivalence', 'indicator', 'normality', 'titer'] as const)
  hexRegisterOf('titration', name, (TitrationFormulas[name] as (...x: unknown[]) => unknown).bind(TitrationFormulas))
