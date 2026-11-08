import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPIROMETRY — THE LUNG FUNCTION TEST, AS ARITHMETIC. A spirometer reads volumes and flows in whole millilitres and
 *  litres-per-minute: the FEV1/FVC ratio, the vital capacity, FEV1 from a known ratio, peak expiratory flow, the forced
 *  vital capacity, tidal volume from minute ventilation, residual volume, and total lung capacity. Crosses to
 *  `pulmonology` — spirometry is the measure pulmonology reads. A measure. */

const PROOF = 'spirometry arithmetic (FEV1/FVC ratio, vital capacity, FEV1, peak flow, forced vital capacity, tidal volume, residual volume, total lung capacity); whole millilitres and litres-per-minute; a measure crossed to pulmonology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'spirometry', dst: 'pulmonology', formula, value, proof: PROOF, ...extra }, holds, { name: `spirometry.${name}`, params })

export class SpirometryFormulas {
  /** FEV1/FVC RATIO as a percentage. value ⌊fev1 · 100 / fvc⌋. */
  static fev1fvcratio(fev1: number, fvc: number): CrossFormula { return c('spirometry-fev1fvcratio', 'fev1fvcratio(fev1, fvc) = ⌊fev1 · 100 / fvc⌋', fvc > 0 ? Math.floor((fev1 * 100) / fvc) : 0, nat(fev1, fvc) && fvc > 0 && fev1 <= fvc, 'fev1fvcratio', [fev1, fvc]) }
  /** VITAL CAPACITY: the sum of the inspiratory reserve, tidal, and expiratory reserve volumes. value irv + tv + erv. */
  static vitalcapacity(irv: number, tv: number, erv: number): CrossFormula { return c('spirometry-vitalcapacity', 'vitalcapacity(irv, tv, erv) = irv + tv + erv', irv + tv + erv, nat(irv, tv, erv), 'vitalcapacity', [irv, tv, erv]) }
  /** FEV1 from a forced vital capacity at a known ratio. value ⌊fvc · ratio / 100⌋. */
  static fev1(fvc: number, ratio: number): CrossFormula { return c('spirometry-fev1', 'fev1(fvc, ratio) = ⌊fvc · ratio / 100⌋', Math.floor((fvc * ratio) / 100), nat(fvc, ratio) && ratio <= 100, 'fev1', [fvc, ratio]) }
  /** PEAK EXPIRATORY FLOW: the volume exhaled over the minutes taken. value ⌊volume / minutes⌋. */
  static peakflow(volume: number, minutes: number): CrossFormula { return c('spirometry-peakflow', 'peakflow(volume, minutes) = ⌊volume / minutes⌋', minutes > 0 ? Math.floor(volume / minutes) : 0, nat(volume, minutes) && minutes > 0, 'peakflow', [volume, minutes]) }
  /** FORCED VITAL CAPACITY: the volume exhaled, start less the residual at the end. value max(0, start − end). */
  static forcedvitalcapacity(start: number, end: number): CrossFormula { return c('spirometry-forcedvitalcapacity', 'forcedvitalcapacity(start, end) = max(0, start − end)', Math.max(0, start - end), nat(start, end) && start >= end, 'forcedvitalcapacity', [start, end]) }
  /** TIDAL VOLUME: minute ventilation over the respiratory rate. value ⌊minute / rate⌋. */
  static tidalvolume(minute: number, rate: number): CrossFormula { return c('spirometry-tidalvolume', 'tidalvolume(minute, rate) = ⌊minute / rate⌋', rate > 0 ? Math.floor(minute / rate) : 0, nat(minute, rate) && rate > 0, 'tidalvolume', [minute, rate]) }
  /** RESIDUAL VOLUME: total lung capacity less the vital capacity. value max(0, tlc − vc). */
  static residualvolume(tlc: number, vc: number): CrossFormula { return c('spirometry-residualvolume', 'residualvolume(tlc, vc) = max(0, tlc − vc)', Math.max(0, tlc - vc), nat(tlc, vc) && tlc >= vc, 'residualvolume', [tlc, vc]) }
  /** TOTAL LUNG CAPACITY: the vital capacity plus the residual volume. value vc + rv. */
  static totalcapacity(vc: number, rv: number): CrossFormula { return c('spirometry-totalcapacity', 'totalcapacity(vc, rv) = vc + rv', vc + rv, nat(vc, rv), 'totalcapacity', [vc, rv]) }
}

for (const name of ['fev1', 'fev1fvcratio', 'forcedvitalcapacity', 'peakflow', 'residualvolume', 'tidalvolume', 'totalcapacity', 'vitalcapacity'] as const)
  hexRegisterOf('spirometry', name, (SpirometryFormulas[name] as (...x: unknown[]) => unknown).bind(SpirometryFormulas))
