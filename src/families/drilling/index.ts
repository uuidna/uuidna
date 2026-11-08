import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DRILLING — SINKING A WELLBORE, AS ARITHMETIC. Making hole is numbers: how fast the bit cuts rock, the mud that balances
 *  the formation, the torque and weight the string carries down the hole, the hydrostatic column the mud raises, the annular
 *  space around the pipe, the footage a bit has left, and the underbalance that lets a kick in. Crosses to `geology` — drilling
 *  is how the rock the geologist reads is reached. A measure. */

const PROOF = 'drilling arithmetic (penetration rate, mud weight, torque, weight-on-bit, hydrostatic column, annular clearance, bit life, kick margin); making hole against the formation; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'drilling', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `drilling.${name}`, params })

export class DrillingFormulas {
  /** RATE OF PENETRATION: footage cut over the hours on bottom. value ⌊depth / hours⌋. */
  static ropenetration(depth: number, hours: number): CrossFormula { return c('drilling-ropenetration', 'ropenetration(depth, hours) = ⌊depth / hours⌋', hours > 0 ? Math.floor(depth / hours) : 0, nat(depth, hours) && hours > 0, 'ropenetration', [depth, hours]) }
  /** MUD WEIGHT: the pressure gradient the mud must raise. value ⌊pressure / depth⌋. */
  static mudweight(pressure: number, depth: number): CrossFormula { return c('drilling-mudweight', 'mudweight(pressure, depth) = ⌊pressure / depth⌋', depth > 0 ? Math.floor(pressure / depth) : 0, nat(pressure, depth) && depth > 0, 'mudweight', [pressure, depth]) }
  /** TORQUE at the bit: force on a radius. value force · radius. */
  static torque(force: number, radius: number): CrossFormula { return c('drilling-torque', 'torque(force, radius) = force · radius', force * radius, nat(force, radius), 'torque', [force, radius]) }
  /** WEIGHT ON BIT: the drill collars, each of a weight. value collars · weight. */
  static wob(collars: number, weight: number): CrossFormula { return c('drilling-wob', 'wob(collars, weight) = collars · weight', collars * weight, nat(collars, weight), 'wob', [collars, weight]) }
  /** HYDROSTATIC: the column pressure of mud weight down the depth (0.052 psi per ppg per foot). value ⌊mw · depth · 52 / 1000⌋. */
  static hydrostatic(mw: number, depth: number): CrossFormula { return c('drilling-hydrostatic', 'hydrostatic(mw, depth) = ⌊mw · depth · 52 / 1000⌋', Math.floor((mw * depth * 52) / 1000), nat(mw, depth), 'hydrostatic', [mw, depth]) }
  /** ANNULAR CLEARANCE: the hole cross-section less the pipe's. value max(0, hole² − pipe²). */
  static annular(hole: number, pipe: number): CrossFormula { return c('drilling-annular', 'annular(hole, pipe) = max(0, hole² − pipe²)', Math.max(0, hole * hole - pipe * pipe), nat(hole, pipe) && hole >= pipe, 'annular', [hole, pipe]) }
  /** BIT LIFE: the footage a bit's rating has left after what it drilled. value max(0, rated − drilled). */
  static bitlife(rated: number, drilled: number): CrossFormula { return c('drilling-bitlife', 'bitlife(rated, drilled) = max(0, rated − drilled)', Math.max(0, rated - drilled), nat(rated, drilled) && rated >= drilled, 'bitlife', [rated, drilled]) }
  /** KICK MARGIN: formation pressure over the hydrostatic the mud holds — the underbalance a kick enters on. value max(0, formation − hydro). */
  static kick(formation: number, hydro: number): CrossFormula { return c('drilling-kick', 'kick(formation, hydro) = max(0, formation − hydro)', Math.max(0, formation - hydro), nat(formation, hydro), 'kick', [formation, hydro]) }
}

for (const name of ['annular', 'bitlife', 'hydrostatic', 'kick', 'mudweight', 'ropenetration', 'torque', 'wob'] as const)
  hexRegisterOf('drilling', name, (DrillingFormulas[name] as (...x: unknown[]) => unknown).bind(DrillingFormulas))
