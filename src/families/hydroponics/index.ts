import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDROPONICS — SOILLESS GROWING, AS ARITHMETIC. Running a nutrient-film or deep-water bed is numbers: the conductivity of
 *  the solution, how far the pH is from target, the nitrogen-to-potassium ratio, the pump's flow rate, how densely a tray is
 *  planted, how much reservoir a crop needs, the concentrate to dose, and the volume a deep-water-culture run holds. Crosses
 *  to `agriculture` — hydroponics is agriculture without soil. A measure. */

const PROOF = 'hydroponics arithmetic (solution conductivity, pH distance, N:K ratio, pump flow, planting density, reservoir need, concentrate dose, DWC volume); soilless growing as a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydroponics', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `hydroponics.${name}`, params })

export class HydroponicsFormulas {
  /** CONDUCTIVITY: EC from total dissolved solids at a conversion scale. value ⌊ppm / scale⌋. */
  static ec(ppm: number, scale: number): CrossFormula { return c('hydroponics-ec', 'ec(ppm, scale) = ⌊ppm / scale⌋', scale > 0 ? Math.floor(ppm / scale) : 0, nat(ppm, scale) && scale > 0, 'ec', [ppm, scale]) }
  /** pH DISTANCE: points the solution sits above target. value max(0, current − target). */
  static ph(current: number, target: number): CrossFormula { return c('hydroponics-ph', 'ph(current, target) = max(0, current − target)', Math.max(0, current - target), nat(current, target) && current <= 14 && target <= 14, 'ph', [current, target]) }
  /** NUTRIENT RATIO: nitrogen against potassium, as a percentage. value ⌊nitrogen · 100 / potassium⌋. */
  static nutrientratio(nitrogen: number, potassium: number): CrossFormula { return c('hydroponics-nutrientratio', 'nutrientratio(nitrogen, potassium) = ⌊nitrogen · 100 / potassium⌋', potassium > 0 ? Math.floor((nitrogen * 100) / potassium) : 0, nat(nitrogen, potassium) && potassium > 0, 'nutrientratio', [nitrogen, potassium]) }
  /** FLOW RATE: reservoir volume over the pump's cycle minutes. value ⌊volume / minutes⌋. */
  static flowrate(volume: number, minutes: number): CrossFormula { return c('hydroponics-flowrate', 'flowrate(volume, minutes) = ⌊volume / minutes⌋', minutes > 0 ? Math.floor(volume / minutes) : 0, nat(volume, minutes) && minutes > 0, 'flowrate', [volume, minutes]) }
  /** PLANTING DENSITY: plants per unit of tray area. value ⌊plants / area⌋. */
  static density(plants: number, area: number): CrossFormula { return c('hydroponics-density', 'density(plants, area) = ⌊plants / area⌋', area > 0 ? Math.floor(plants / area) : 0, nat(plants, area) && area > 0, 'density', [plants, area]) }
  /** RESERVOIR: total litres for the crop at a per-plant need. value plants · perPlant. */
  static reservoir(plants: number, perPlant: number): CrossFormula { return c('hydroponics-reservoir', 'reservoir(plants, perPlant) = plants · perPlant', plants * perPlant, nat(plants, perPlant), 'reservoir', [plants, perPlant]) }
  /** DOSING: millilitres of concentrate for the reservoir at a per-litre dose. value volume · mlPerLitre. */
  static dosing(volume: number, mlPerLitre: number): CrossFormula { return c('hydroponics-dosing', 'dosing(volume, mlPerLitre) = volume · mlPerLitre', volume * mlPerLitre, nat(volume, mlPerLitre), 'dosing', [volume, mlPerLitre]) }
  /** DEEP WATER CULTURE: total volume across the buckets at a per-bucket fill. value buckets · perBucket. */
  static dwc(buckets: number, perBucket: number): CrossFormula { return c('hydroponics-dwc', 'dwc(buckets, perBucket) = buckets · perBucket', buckets * perBucket, nat(buckets, perBucket), 'dwc', [buckets, perBucket]) }
}

for (const name of ['density', 'dosing', 'dwc', 'ec', 'flowrate', 'nutrientratio', 'ph', 'reservoir'] as const)
  hexRegisterOf('hydroponics', name, (HydroponicsFormulas[name] as (...x: unknown[]) => unknown).bind(HydroponicsFormulas))
