import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAVITY — THE PULL, AND THE BALANCE IT GIVES TO SLOW CODE. The physics is numbers: weight (F = m·g), the inverse-square
 *  force, the potential, free-fall. And gravity is how the lattice BALANCES itself: a computation's mass is its time times
 *  its temperature — slow (high ms, from wave) and hot (high mK, from heat.temperature) code is HEAVY — and the lever law
 *  says where the pivot sits, where the barycenter is, and how far light work must move to counter a heavy one. So the
 *  slow, hot code detected by time and temperature is balanced by moving work to its equilibrium. Crosses to `heat`. */

const PROOF = 'gravity: weight (m·g), inverse-square force, potential, free-fall; and the balance of the lattice — a computation\'s mass = time (wave ms) × temperature (heat mK), the lever law places the pivot, barycenter and equilibrium so slow, hot code is balanced; crossed to heat'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const g = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gravity', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `gravity.${name}`, params })

export class GravityFormulas {
  /** WEIGHT: force under gravity, F = m · g. value mass · g. */
  static weight(mass: number, acceleration: number): CrossFormula { return g('gravity-weight', 'weight(mass, g) = mass · g', mass * acceleration, nat(mass, acceleration), 'weight', [mass, acceleration]) }
  /** THE INVERSE-SQUARE FORCE (G = 1): m1 · m2 over the distance squared. value ⌊m1 · m2 / r²⌋. */
  static force(m1: number, m2: number, r: number): CrossFormula { return g('gravity-force', 'force(m1, m2, r) = ⌊m1 · m2 / r²⌋', r > 0 ? Math.floor((m1 * m2) / (r * r)) : 0, nat(m1, m2, r) && r > 0, 'force', [m1, m2, r]) }
  /** THE POTENTIAL (magnitude): mass over radius. value ⌊mass / radius⌋. */
  static potential(mass: number, radius: number): CrossFormula { return g('gravity-potential', 'potential(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'potential', [mass, radius]) }
  /** FREE-FALL time squared: t² = 2h / g. value ⌊2 · height / g⌋. */
  static freefall(height: number, acceleration: number): CrossFormula { return g('gravity-freefall', 'freefall(height, g) = ⌊2 · height / g⌋', acceleration > 0 ? Math.floor((2 * height) / acceleration) : 0, nat(height, acceleration) && acceleration > 0, 'freefall', [height, acceleration]) }
  /** THE MASS OF A COMPUTATION: its time times its temperature — slow (ms, from wave) and hot (mK, from heat) code is
   *  heavy. This is what gravity balances. value ms · mK. */
  static load(ms: number, mK: number): CrossFormula { return g('gravity-load', 'load(ms, mK) = ms · mK (time × temperature — the mass of a slow, hot computation)', ms * mK, nat(ms, mK), 'load', [ms, mK]) }
  /** THE PIVOT as a percentage: how much a heavy side pulls the balance — the fraction of work to move off it. value
   *  ⌊heavy · 100 / (heavy + light)⌋. A slow, hot computation (heavy) past 50 is pulling the lattice out of balance. */
  static balance(heavy: number, light: number): CrossFormula { return g('gravity-balance', 'balance(heavy, light) = ⌊heavy · 100 / (heavy + light)⌋', heavy + light > 0 ? Math.floor((heavy * 100) / (heavy + light)) : 0, nat(heavy, light) && heavy + light > 0, 'balance', [heavy, light]) }
  /** THE BARYCENTER: where two loads balance along a separation d, measured from m1. value ⌊m2 · d / (m1 + m2)⌋. */
  static center(m1: number, m2: number, d: number): CrossFormula { return g('gravity-center', 'center(m1, m2, d) = ⌊m2 · d / (m1 + m2)⌋', m1 + m2 > 0 ? Math.floor((m2 * d) / (m1 + m2)) : 0, nat(m1, m2, d) && m1 + m2 > 0, 'center', [m1, m2, d]) }
  /** THE LEVER LAW: the distance at which a light load m2 balances a heavy one m1 held at d1 (m1 · d1 = m2 · d2). How far
   *  light work must move to counter the heavy, slow code. value ⌊m1 · d1 / m2⌋. */
  static equilibrium(m1: number, d1: number, m2: number): CrossFormula { return g('gravity-equilibrium', 'equilibrium(m1, d1, m2) = ⌊m1 · d1 / m2⌋', m2 > 0 ? Math.floor((m1 * d1) / m2) : 0, nat(m1, d1, m2) && m2 > 0, 'equilibrium', [m1, d1, m2]) }
}

for (const name of ['balance', 'center', 'equilibrium', 'force', 'freefall', 'load', 'potential', 'weight'] as const)
  hexRegisterOf('gravity', name, (GravityFormulas[name] as (...x: unknown[]) => unknown).bind(GravityFormulas))
