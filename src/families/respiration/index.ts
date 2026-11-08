import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RESPIRATION — CELLULAR AND PULMONARY GAS ACCOUNTING, AS ARITHMETIC. Breathing and burning fuel are numbers: the ATP a
 *  glucose yields aerobically, oxygen taken up, the respiratory quotient, minute ventilation, tidal volume, net gas
 *  exchanged, metabolic rate, and the oxygen a full glucose oxidation consumes. Crosses to `physiology` — respiration is
 *  what physiology accounts for. A measure. */

const PROOF = 'respiration arithmetic (ATP yield, oxygen uptake, respiratory quotient, minute ventilation, tidal volume, gas exchange, metabolic rate, glucose oxidation); a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'respiration', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `respiration.${name}`, params })

export class RespirationFormulas {
  /** ATP YIELD: molecules of glucose at an aerobic yield each (36–38 ATP per glucose). value glucose · perGlucose. */
  static atpyield(glucose: number, perGlucose: number): CrossFormula { return c('respiration-atpyield', 'atpyield(glucose, perGlucose) = glucose · perGlucose', glucose * perGlucose, nat(glucose, perGlucose), 'atpyield', [glucose, perGlucose]) }
  /** OXYGEN UPTAKE (Fick): cardiac output times the arterio-venous oxygen difference. value output · diff. */
  static oxygenuptake(output: number, diff: number): CrossFormula { return c('respiration-oxygenuptake', 'oxygenuptake(output, diff) = output · diff', output * diff, nat(output, diff), 'oxygenuptake', [output, diff]) }
  /** RESPIRATORY QUOTIENT: CO₂ produced over O₂ consumed, scaled by 100. value ⌊co2 · 100 / o2⌋. */
  static respiratoryquotient(co2: number, o2: number): CrossFormula { return c('respiration-respiratoryquotient', 'respiratoryquotient(co2, o2) = ⌊co2 · 100 / o2⌋', o2 > 0 ? Math.floor((co2 * 100) / o2) : 0, nat(co2, o2) && o2 > 0, 'respiratoryquotient', [co2, o2]) }
  /** MINUTE VENTILATION: tidal volume times the breathing rate. value tidal · rate. */
  static minuteventilation(tidal: number, rate: number): CrossFormula { return c('respiration-minuteventilation', 'minuteventilation(tidal, rate) = tidal · rate', tidal * rate, nat(tidal, rate), 'minuteventilation', [tidal, rate]) }
  /** TIDAL VOLUME: minute ventilation back over the breathing rate. value ⌊minute / rate⌋. */
  static tidalvolume(minute: number, rate: number): CrossFormula { return c('respiration-tidalvolume', 'tidalvolume(minute, rate) = ⌊minute / rate⌋', rate > 0 ? Math.floor(minute / rate) : 0, nat(minute, rate) && rate > 0, 'tidalvolume', [minute, rate]) }
  /** GAS EXCHANGE: net gas across the membrane, inspired less expired. value max(0, inspired − expired). */
  static gasexchange(inspired: number, expired: number): CrossFormula { return c('respiration-gasexchange', 'gasexchange(inspired, expired) = max(0, inspired − expired)', Math.max(0, inspired - expired), nat(inspired, expired), 'gasexchange', [inspired, expired]) }
  /** METABOLIC RATE: energy from oxygen uptake at a caloric equivalent per unit. value vo2 · factor. */
  static metabolicrate(vo2: number, factor: number): CrossFormula { return c('respiration-metabolicrate', 'metabolicrate(vo2, factor) = vo2 · factor', vo2 * factor, nat(vo2, factor), 'metabolicrate', [vo2, factor]) }
  /** GLUCOSE OXIDATION: oxygen consumed to fully oxidise glucose (6 O₂ per glucose). value glucose · o2PerGlucose. */
  static glucoseoxidation(glucose: number, o2PerGlucose: number): CrossFormula { return c('respiration-glucoseoxidation', 'glucoseoxidation(glucose, o2PerGlucose) = glucose · o2PerGlucose', glucose * o2PerGlucose, nat(glucose, o2PerGlucose), 'glucoseoxidation', [glucose, o2PerGlucose]) }
}

for (const name of ['atpyield', 'gasexchange', 'glucoseoxidation', 'metabolicrate', 'minuteventilation', 'oxygenuptake', 'respiratoryquotient', 'tidalvolume'] as const)
  hexRegisterOf('respiration', name, (RespirationFormulas[name] as (...x: unknown[]) => unknown).bind(RespirationFormulas))
