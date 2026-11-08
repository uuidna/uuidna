import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CASTING — POURING METAL, AS ARITHMETIC. A foundry is numbers: the shrinkage from hot to cold, how long the pour takes,
 *  how long the metal takes to solidify (Chvorinov's modulus squared), the yield of good casting from metal poured, the
 *  riser a casting needs, the gating ratio, fluidity from superheat, and the cooling rate. Crosses to `manufacturing` —
 *  casting is a manufacturing process. A measure. */

const PROOF = 'casting arithmetic (shrinkage, pour time, solidification modulus, yield, riser, gating ratio, fluidity, cooling rate); a foundry as a measure crossed to manufacturing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'casting', dst: 'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `casting.${name}`, params })

export class CastingFormulas {
  /** SHRINKAGE: the dimension lost from hot to cold. value max(0, hot − cold). */
  static shrinkage(hot: number, cold: number): CrossFormula { return c('casting-shrinkage', 'shrinkage(hot, cold) = max(0, hot − cold)', Math.max(0, hot - cold), nat(hot, cold), 'shrinkage', [hot, cold]) }
  /** POURING TIME: the mould volume at a pour rate. value ⌊volume / rate⌋. */
  static pouringtime(volume: number, rate: number): CrossFormula { return c('casting-pouringtime', 'pouringtime(volume, rate) = ⌊volume / rate⌋', rate > 0 ? Math.floor(volume / rate) : 0, nat(volume, rate) && rate > 0, 'pouringtime', [volume, rate]) }
  /** SOLIDIFICATION: Chvorinov's modulus (V/A) squared. value ⌊volume² / area²⌋. */
  static solidification(volume: number, area: number): CrossFormula { return c('casting-solidification', 'solidification(volume, area) = ⌊volume² / area²⌋', area > 0 ? Math.floor((volume * volume) / (area * area)) : 0, nat(volume, area) && area > 0, 'solidification', [volume, area]) }
  /** YIELD: good casting as a percentage of metal poured. value ⌊casting · 100 / poured⌋. */
  static yield(casting: number, poured: number): CrossFormula { return c('casting-yield', 'yield(casting, poured) = ⌊casting · 100 / poured⌋', poured > 0 ? Math.floor((casting * 100) / poured) : 0, nat(casting, poured) && poured > 0 && casting <= poured, 'yield', [casting, poured]) }
  /** RISERING: the riser as a percentage of casting volume. value ⌊volume · pct / 100⌋. */
  static risering(volume: number, pct: number): CrossFormula { return c('casting-risering', 'risering(volume, pct) = ⌊volume · pct / 100⌋', Math.floor((volume * pct) / 100), nat(volume, pct), 'risering', [volume, pct]) }
  /** GATING RATIO: runner area over ingate area. value ⌊runner / ingate⌋. */
  static gatingratio(runner: number, ingate: number): CrossFormula { return c('casting-gatingratio', 'gatingratio(runner, ingate) = ⌊runner / ingate⌋', ingate > 0 ? Math.floor(runner / ingate) : 0, nat(runner, ingate) && ingate > 0, 'gatingratio', [runner, ingate]) }
  /** FLUIDITY: the flow length from superheat at a coefficient. value superheat · coeff. */
  static fluidity(superheat: number, coeff: number): CrossFormula { return c('casting-fluidity', 'fluidity(superheat, coeff) = superheat · coeff', superheat * coeff, nat(superheat, coeff), 'fluidity', [superheat, coeff]) }
  /** COOLING RATE: the temperature drop over the time taken. value ⌊deltaT / time⌋. */
  static coolingrate(deltaT: number, time: number): CrossFormula { return c('casting-coolingrate', 'coolingrate(deltaT, time) = ⌊deltaT / time⌋', time > 0 ? Math.floor(deltaT / time) : 0, nat(deltaT, time) && time > 0, 'coolingrate', [deltaT, time]) }
}

for (const name of ['coolingrate', 'fluidity', 'gatingratio', 'pouringtime', 'risering', 'shrinkage', 'solidification', 'yield'] as const)
  hexRegisterOf('casting', name, (CastingFormulas[name] as (...x: unknown[]) => unknown).bind(CastingFormulas))
