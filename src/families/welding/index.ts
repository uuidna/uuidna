import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WELDING — JOINING METAL, AS ARITHMETIC (chosen by the materials registry, not by hand). A weld is numbers: heat input
 *  from the arc, how fast the torch travels, metal deposited per hour, how deep the fusion runs, how much base dilutes the
 *  filler, porosity defects per length, the duty cycle of the machine, and the joint's strength against the base. Crosses
 *  to `materials` — welding is what joins the materials. A measure. */

const PROOF = 'welding arithmetic (heat input, travel speed, deposition, penetration, dilution, porosity, duty cycle, joint strength); a materials-registry domain; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'welding', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `welding.${name}`, params })

export class WeldingFormulas {
  /** HEAT INPUT: arc voltage times current. value voltage · current. */
  static heatinput(voltage: number, current: number): CrossFormula { return c('welding-heatinput', 'heatinput(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'heatinput', [voltage, current]) }
  /** TRAVEL SPEED: bead length over time. value ⌊length / time⌋. */
  static travelspeed(length: number, time: number): CrossFormula { return c('welding-travelspeed', 'travelspeed(length, time) = ⌊length / time⌋', time > 0 ? Math.floor(length / time) : 0, nat(length, time) && time > 0, 'travelspeed', [length, time]) }
  /** DEPOSITION: metal mass deposited per hour. value ⌊mass / hours⌋. */
  static deposition(mass: number, hours: number): CrossFormula { return c('welding-deposition', 'deposition(mass, hours) = ⌊mass / hours⌋', hours > 0 ? Math.floor(mass / hours) : 0, nat(mass, hours) && hours > 0, 'deposition', [mass, hours]) }
  /** PENETRATION: fusion depth as a percentage of thickness. value ⌊depth · 100 / thickness⌋. */
  static penetration(depth: number, thickness: number): CrossFormula { return c('welding-penetration', 'penetration(depth, thickness) = ⌊depth · 100 / thickness⌋', thickness > 0 ? Math.floor((depth * 100) / thickness) : 0, nat(depth, thickness) && thickness > 0 && depth <= thickness, 'penetration', [depth, thickness]) }
  /** DILUTION: base metal as a percentage of the total weld. value ⌊base · 100 / total⌋. */
  static dilution(base: number, total: number): CrossFormula { return c('welding-dilution', 'dilution(base, total) = ⌊base · 100 / total⌋', total > 0 ? Math.floor((base * 100) / total) : 0, nat(base, total) && total > 0 && base <= total, 'dilution', [base, total]) }
  /** POROSITY: defects as a percentage over the bead length. value ⌊defects · 100 / length⌋. */
  static porosity(defects: number, length: number): CrossFormula { return c('welding-porosity', 'porosity(defects, length) = ⌊defects · 100 / length⌋', length > 0 ? Math.floor((defects * 100) / length) : 0, nat(defects, length) && length > 0, 'porosity', [defects, length]) }
  /** DUTY CYCLE: arc time as a percentage of the total. value ⌊arctime · 100 / total⌋. */
  static duty(arctime: number, total: number): CrossFormula { return c('welding-duty', 'duty(arctime, total) = ⌊arctime · 100 / total⌋', total > 0 ? Math.floor((arctime * 100) / total) : 0, nat(arctime, total) && total > 0 && arctime <= total, 'duty', [arctime, total]) }
  /** JOINT STRENGTH: weld strength as a percentage of the base (joint efficiency). value ⌊weld · 100 / base⌋. */
  static strength(weld: number, base: number): CrossFormula { return c('welding-strength', 'strength(weld, base) = ⌊weld · 100 / base⌋', base > 0 ? Math.floor((weld * 100) / base) : 0, nat(weld, base) && base > 0, 'strength', [weld, base]) }
}

for (const name of ['deposition', 'dilution', 'duty', 'heatinput', 'penetration', 'porosity', 'strength', 'travelspeed'] as const)
  hexRegisterOf('welding', name, (WeldingFormulas[name] as (...x: unknown[]) => unknown).bind(WeldingFormulas))
