import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EQUINE — THE HORSE, AS ARITHMETIC (chosen by the registry, not by hand). A horse is numbers: speed over ground, the
 *  length of a stride, heart rate, body condition, gestation, the forage share of a ration, height in hands, and how far
 *  a heart rate has yet to recover. Crosses to `vet` — equine is what veterinary care measures. A measure. */

const PROOF = 'equine arithmetic (speed, stride, heart rate, body condition, gestation, feed ratio, height, recovery); a horse as integers; a measure crossed to vet'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'equine', dst: 'vet', formula, value, proof: PROOF, ...extra }, holds, { name: `equine.${name}`, params })

export class EquineFormulas {
  /** SPEED: distance over seconds. value ⌊distance / seconds⌋. */
  static speed(distance: number, seconds: number): CrossFormula { return c('equine-speed', 'speed(distance, seconds) = ⌊distance / seconds⌋', seconds > 0 ? Math.floor(distance / seconds) : 0, nat(distance, seconds) && seconds > 0, 'speed', [distance, seconds]) }
  /** STRIDE: distance over the strides taken. value ⌊distance / strides⌋. */
  static stride(distance: number, strides: number): CrossFormula { return c('equine-stride', 'stride(distance, strides) = ⌊distance / strides⌋', strides > 0 ? Math.floor(distance / strides) : 0, nat(distance, strides) && strides > 0, 'stride', [distance, strides]) }
  /** HEART RATE: beats over minutes. value ⌊beats / minutes⌋. */
  static heartrate(beats: number, minutes: number): CrossFormula { return c('equine-heartrate', 'heartrate(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'heartrate', [beats, minutes]) }
  /** BODY CONDITION: the score as given. value score. */
  static bodycondition(score: number): CrossFormula { return c('equine-bodycondition', 'bodycondition(score) = score', score, nat(score), 'bodycondition', [score]) }
  /** GESTATION: days carried. value days. */
  static gestation(days: number): CrossFormula { return c('equine-gestation', 'gestation(days) = days', days, nat(days), 'gestation', [days]) }
  /** FEED RATIO: the forage share of the ration. value ⌊forage · 100 / total⌋. */
  static feedratio(forage: number, total: number): CrossFormula { return c('equine-feedratio', 'feedratio(forage, total) = ⌊forage · 100 / total⌋', total > 0 ? Math.floor((forage * 100) / total) : 0, nat(forage, total) && total > 0 && forage <= total, 'feedratio', [forage, total]) }
  /** HEIGHT: the measure in hands. value hands. */
  static height(hands: number): CrossFormula { return c('equine-height', 'height(hands) = hands', hands, nat(hands), 'height', [hands]) }
  /** RECOVERY: how far an elevated heart rate stands above baseline. value max(0, elevated − baseline). */
  static recovery(baseline: number, elevated: number): CrossFormula { return c('equine-recovery', 'recovery(baseline, elevated) = max(0, elevated − baseline)', Math.max(0, elevated - baseline), nat(baseline, elevated), 'recovery', [baseline, elevated]) }
}

for (const name of ['bodycondition', 'feedratio', 'gestation', 'heartrate', 'height', 'recovery', 'speed', 'stride'] as const)
  hexRegisterOf('equine', name, (EquineFormulas[name] as (...x: unknown[]) => unknown).bind(EquineFormulas))
