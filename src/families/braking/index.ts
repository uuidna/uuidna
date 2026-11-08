import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BRAKING — STOPPING A VEHICLE, AS ARITHMETIC. The brake is numbers: how far it takes to stop, the force a pedal makes,
 *  the torque at the rotor, the fade as the discs heat, the hydraulic pressure, the front/rear bias, the deceleration, and
 *  the pad left after a run. Crosses to `automotive` — braking is what the car does. A measure. */

const PROOF = 'braking arithmetic (stopping distance, braking force, rotor torque, heat fade, hydraulic pressure, front/rear bias, deceleration, pad life); hex-addressable at ≤65535 per param; a measure crossed to automotive'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'braking', dst: 'automotive', formula, value, proof: PROOF, ...extra }, holds, { name: `braking.${name}`, params })

export class BrakingFormulas {
  /** STOPPING DISTANCE: kinetic energy shed under constant deceleration. value ⌊speed² / (2 · decel)⌋. */
  static distance(speed: number, decel: number): CrossFormula { return c('braking-distance', 'distance(speed, decel) = ⌊speed² / (2 · decel)⌋', decel > 0 ? Math.floor((speed * speed) / (2 * decel)) : 0, nat(speed, decel) && decel > 0, 'distance', [speed, decel]) }
  /** BRAKING FORCE: mass under deceleration (F = m · a). value mass · decel. */
  static force(mass: number, decel: number): CrossFormula { return c('braking-force', 'force(mass, decel) = mass · decel', mass * decel, nat(mass, decel), 'force', [mass, decel]) }
  /** ROTOR TORQUE: braking force at the effective radius. value force · radius. */
  static torque(force: number, radius: number): CrossFormula { return c('braking-torque', 'torque(force, radius) = force · radius', force * radius, nat(force, radius), 'torque', [force, radius]) }
  /** HEAT FADE: effectiveness lost as a percentage of the thermal threshold. value ⌊temp · 100 / max⌋. */
  static fade(temp: number, max: number): CrossFormula { return c('braking-fade', 'fade(temp, max) = ⌊temp · 100 / max⌋', max > 0 ? Math.floor((temp * 100) / max) : 0, nat(temp, max) && max > 0 && temp <= max, 'fade', [temp, max]) }
  /** HYDRAULIC PRESSURE: force spread over the piston area. value ⌊force / area⌋. */
  static pressure(force: number, area: number): CrossFormula { return c('braking-pressure', 'pressure(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'pressure', [force, area]) }
  /** FRONT BIAS: the front share of total braking force, as a percentage. value ⌊front · 100 / (front + rear)⌋. */
  static bias(front: number, rear: number): CrossFormula { return c('braking-bias', 'bias(front, rear) = ⌊front · 100 / (front + rear)⌋', (front + rear) > 0 ? Math.floor((front * 100) / (front + rear)) : 0, nat(front, rear) && (front + rear) > 0, 'bias', [front, rear]) }
  /** DECELERATION: speed shed over the stopping time. value ⌊speed / time⌋. */
  static deceleration(speed: number, time: number): CrossFormula { return c('braking-deceleration', 'deceleration(speed, time) = ⌊speed / time⌋', time > 0 ? Math.floor(speed / time) : 0, nat(speed, time) && time > 0, 'deceleration', [speed, time]) }
  /** PAD LIFE: thickness left after a run of stops. value max(0, thickness − wear · stops). */
  static pad(thickness: number, wear: number, stops: number): CrossFormula { return c('braking-pad', 'pad(thickness, wear, stops) = max(0, thickness − wear · stops)', Math.max(0, thickness - wear * stops), nat(thickness, wear, stops), 'pad', [thickness, wear, stops]) }
}

for (const name of ['bias', 'deceleration', 'distance', 'fade', 'force', 'pad', 'pressure', 'torque'] as const)
  hexRegisterOf('braking', name, (BrakingFormulas[name] as (...x: unknown[]) => unknown).bind(BrakingFormulas))
