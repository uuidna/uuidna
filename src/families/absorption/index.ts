import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ABSORPTION — SOUND SWALLOWED BY A MATERIAL, AS ARITHMETIC. How much of a sound a surface takes in rather than returns:
 *  the absorption coefficient, the noise reduction coefficient, total sabins, loss on transmission, open porosity, the
 *  sound reduction index, a panel resonator's frequency, and characteristic acoustic impedance. Crosses to `acoustics` —
 *  absorption is what acoustics measures a room by. A measure. */

const PROOF = 'absorption arithmetic (coefficient, NRC, sabins, transmission loss, porosity, reduction index, panel resonance, impedance); sound taken in rather than returned; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'absorption', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `absorption.${name}`, params })

export class AbsorptionFormulas {
  /** ABSORPTION COEFFICIENT: the fraction absorbed, as a percentage. value ⌊absorbed · 100 / incident⌋. */
  static coefficient(absorbed: number, incident: number): CrossFormula { return c('absorption-coefficient', 'coefficient(absorbed, incident) = ⌊absorbed · 100 / incident⌋', incident > 0 ? Math.floor((absorbed * 100) / incident) : 0, nat(absorbed, incident) && incident > 0 && absorbed <= incident, 'coefficient', [absorbed, incident]) }
  /** NOISE REDUCTION COEFFICIENT: the mean of a low- and high-band coefficient. value ⌊(low + high) / 2⌋. */
  static nrc(low: number, high: number): CrossFormula { return c('absorption-nrc', 'nrc(low, high) = ⌊(low + high) / 2⌋', Math.floor((low + high) / 2), nat(low, high), 'nrc', [low, high]) }
  /** SABINS: total absorption of a surface at a coefficient. value area · coefficient. */
  static sabins(area: number, coefficient: number): CrossFormula { return c('absorption-sabins', 'sabins(area, coefficient) = area · coefficient', area * coefficient, nat(area, coefficient), 'sabins', [area, coefficient]) }
  /** TRANSMISSION LOSS: the fraction not transmitted, as a percentage. value ⌊max(0, incident − transmitted) · 100 / incident⌋. */
  static transmissionloss(incident: number, transmitted: number): CrossFormula { return c('absorption-transmissionloss', 'transmissionloss(incident, transmitted) = ⌊max(0, incident − transmitted) · 100 / incident⌋', incident > 0 ? Math.floor((Math.max(0, incident - transmitted) * 100) / incident) : 0, nat(incident, transmitted) && incident > 0, 'transmissionloss', [incident, transmitted]) }
  /** POROSITY: open voids over total volume, as a percentage. value ⌊voids · 100 / total⌋. */
  static porosity(voids: number, total: number): CrossFormula { return c('absorption-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100) / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) }
  /** SOUND REDUCTION INDEX: the level dropped across a partition. value max(0, level1 − level2). */
  static reductionindex(level1: number, level2: number): CrossFormula { return c('absorption-reductionindex', 'reductionindex(level1, level2) = max(0, level1 − level2)', Math.max(0, level1 - level2), nat(level1, level2), 'reductionindex', [level1, level2]) }
  /** PANEL RESONANCE: a panel resonator's frequency, inverse to its mass-depth. value ⌊k / massDepth⌋. */
  static panelresonance(k: number, massDepth: number): CrossFormula { return c('absorption-panelresonance', 'panelresonance(k, massDepth) = ⌊k / massDepth⌋', massDepth > 0 ? Math.floor(k / massDepth) : 0, nat(k, massDepth) && massDepth > 0, 'panelresonance', [k, massDepth]) }
  /** CHARACTERISTIC ACOUSTIC IMPEDANCE: density times the speed of sound. value density · speed. */
  static impedance(density: number, speed: number): CrossFormula { return c('absorption-impedance', 'impedance(density, speed) = density · speed', density * speed, nat(density, speed), 'impedance', [density, speed]) }
}

for (const name of ['coefficient', 'impedance', 'nrc', 'panelresonance', 'porosity', 'reductionindex', 'sabins', 'transmissionloss'] as const)
  hexRegisterOf('absorption', name, (AbsorptionFormulas[name] as (...x: unknown[]) => unknown).bind(AbsorptionFormulas))
