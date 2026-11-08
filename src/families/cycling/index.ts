import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CYCLING — RIDING A BICYCLE, AS ARITHMETIC. The ride is numbers: cadence in revolutions per minute, power at the pedal,
 *  the gear ratio, speed over a leg, functional threshold power per kilogram, the gradient of a climb, drivetrain
 *  efficiency, and the distance a gear carries each turn. Crosses to `fitness` — cycling is what fitness measures. A measure. */

const PROOF = 'cycling arithmetic (cadence, pedal power, gear ratio, speed, FTP per kg, gradient, drivetrain efficiency, distance per turn); a measure crossed to fitness'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cycling', dst: 'fitness', formula, value, proof: PROOF, ...extra }, holds, { name: `cycling.${name}`, params })

export class CyclingFormulas {
  /** CADENCE: pedal revolutions per minute. value ⌊revolutions / minutes⌋. */
  static cadence(revolutions: number, minutes: number): CrossFormula { return c('cycling-cadence', 'cadence(revolutions, minutes) = ⌊revolutions / minutes⌋', minutes > 0 ? Math.floor(revolutions / minutes) : 0, nat(revolutions, minutes) && minutes > 0, 'cadence', [revolutions, minutes]) }
  /** PEDAL POWER: force at the pedal times velocity. value force · velocity. */
  static power(force: number, velocity: number): CrossFormula { return c('cycling-power', 'power(force, velocity) = force · velocity', force * velocity, nat(force, velocity), 'power', [force, velocity]) }
  /** GEAR RATIO: chainring teeth over cog teeth, scaled. value ⌊chainring · 100 / cog⌋. */
  static gearratio(chainring: number, cog: number): CrossFormula { return c('cycling-gearratio', 'gearratio(chainring, cog) = ⌊chainring · 100 / cog⌋', cog > 0 ? Math.floor((chainring * 100) / cog) : 0, nat(chainring, cog) && cog > 0, 'gearratio', [chainring, cog]) }
  /** SPEED: distance over time. value ⌊distance / time⌋. */
  static speed(distance: number, time: number): CrossFormula { return c('cycling-speed', 'speed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'speed', [distance, time]) }
  /** FTP: functional threshold power per kilogram, scaled. value ⌊watts · 100 / weight⌋. */
  static ftp(watts: number, weight: number): CrossFormula { return c('cycling-ftp', 'ftp(watts, weight) = ⌊watts · 100 / weight⌋', weight > 0 ? Math.floor((watts * 100) / weight) : 0, nat(watts, weight) && weight > 0, 'ftp', [watts, weight]) }
  /** GRADIENT: rise over run as a percentage. value ⌊rise · 100 / run⌋. */
  static gradient(rise: number, run: number): CrossFormula { return c('cycling-gradient', 'gradient(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient', [rise, run]) }
  /** DRIVETRAIN EFFICIENCY: output over input as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('cycling-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** DISTANCE PER TURN: cadence times the gear carried. value cadence · gear. */
  static distance(cadence_: number, gear: number): CrossFormula { return c('cycling-distance', 'distance(cadence, gear) = cadence · gear', cadence_ * gear, nat(cadence_, gear), 'distance', [cadence_, gear]) }
}

for (const name of ['cadence', 'distance', 'efficiency', 'ftp', 'gearratio', 'gradient', 'power', 'speed'] as const)
  hexRegisterOf('cycling', name, (CyclingFormulas[name] as (...x: unknown[]) => unknown).bind(CyclingFormulas))
