import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEMICONDUCTOR — DEVICE PHYSICS AS ARITHMETIC (chosen by the fabrication registry, not by hand). A chip is numbers:
 *  dopant concentration in ppm, carrier mobility, the band gap, resistivity, the die yield, the threshold voltage, the
 *  carrier count, and the junction ratio. Crosses to `electronics` — the semiconductor is what electronics is built on.
 *  A measure. */

const PROOF = 'semiconductor arithmetic (doping ppm, mobility, band gap, resistivity, die yield, threshold, carriers, junction ratio); a device-physics domain; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'semiconductor', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `semiconductor.${name}`, params })

export class SemiconductorFormulas {
  /** BAND GAP in millielectronvolts, carried whole. value millielectronvolts. */
  static bandgap(millielectronvolts: number): CrossFormula { return c('semiconductor-bandgap', 'bandgap(millielectronvolts) = millielectronvolts', millielectronvolts, nat(millielectronvolts), 'bandgap', [millielectronvolts]) }
  /** CARRIER COUNT: electrons plus holes. value electrons + holes. */
  static carrier(electrons: number, holes: number): CrossFormula { return c('semiconductor-carrier', 'carrier(electrons, holes) = electrons + holes', electrons + holes, nat(electrons, holes), 'carrier', [electrons, holes]) }
  /** DIE YIELD as a percentage. value ⌊working · 100 / dies⌋. */
  static diesyield(working: number, dies: number): CrossFormula { return c('semiconductor-diesyield', 'diesyield(working, dies) = ⌊working · 100 / dies⌋', dies > 0 ? Math.floor((working * 100) / dies) : 0, nat(working, dies) && dies > 0 && working <= dies, 'diesyield', [working, dies]) }
  /** DOPING in parts per million. value ⌊dopant · 1000000 / host⌋. */
  static doping(dopant: number, host: number): CrossFormula { return c('semiconductor-doping', 'doping(dopant, host) = ⌊dopant · 1000000 / host⌋', host > 0 ? Math.floor((dopant * 1000000) / host) : 0, nat(dopant, host) && host > 0, 'doping', [dopant, host]) }
  /** JUNCTION RATIO: forward over reverse, as a percentage. value ⌊forward · 100 / reverse⌋. */
  static junction(forward: number, reverse: number): CrossFormula { return c('semiconductor-junction', 'junction(forward, reverse) = ⌊forward · 100 / reverse⌋', reverse > 0 ? Math.floor((forward * 100) / reverse) : 0, nat(forward, reverse) && reverse > 0, 'junction', [forward, reverse]) }
  /** CARRIER MOBILITY: drift velocity over the applied field. value ⌊velocity / field⌋. */
  static mobility(velocity: number, field: number): CrossFormula { return c('semiconductor-mobility', 'mobility(velocity, field) = ⌊velocity / field⌋', field > 0 ? Math.floor(velocity / field) : 0, nat(velocity, field) && field > 0, 'mobility', [velocity, field]) }
  /** RESISTIVITY: voltage over current. value ⌊voltage / current⌋. */
  static resistivity(voltage: number, current: number): CrossFormula { return c('semiconductor-resistivity', 'resistivity(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'resistivity', [voltage, current]) }
  /** THRESHOLD VOLTAGE in millivolts, carried whole. value millivolts. */
  static threshold(millivolts: number): CrossFormula { return c('semiconductor-threshold', 'threshold(millivolts) = millivolts', millivolts, nat(millivolts), 'threshold', [millivolts]) }
}

for (const name of ['bandgap', 'carrier', 'diesyield', 'doping', 'junction', 'mobility', 'resistivity', 'threshold'] as const)
  hexRegisterOf('semiconductor', name, (SemiconductorFormulas[name] as (...x: unknown[]) => unknown).bind(SemiconductorFormulas))
