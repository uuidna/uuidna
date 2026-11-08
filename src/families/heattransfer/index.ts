import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEATTRANSFER — HOW HEAT MOVES, AS ARITHMETIC. The three modes and the numbers engineers size exchangers by: conduction
 *  flux through a wall, convective heat off a surface, net radiation between bodies, the log-mean temperature difference, the
 *  Nusselt and Biot numbers, the Fourier number, and exchanger effectiveness. Crosses to `thermodynamics` — heat transfer is
 *  the first law in motion. A measure. */

const PROOF = 'heattransfer arithmetic (conduction flux, convection, radiation, LMTD, Nusselt, Biot, Fourier, effectiveness); the three modes and the exchanger-sizing numbers; a measure crossed to thermodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'heattransfer', dst: 'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `heattransfer.${name}`, params })

export class HeattransferFormulas {
  /** CONDUCTION: Fourier's law, flux through a wall. value ⌊k · dT / length⌋. */
  static conduction(k: number, dT: number, length: number): CrossFormula { return c('heattransfer-conduction', 'conduction(k, dT, length) = ⌊k · dT / length⌋', length > 0 ? Math.floor((k * dT) / length) : 0, nat(k, dT, length) && length > 0, 'conduction', [k, dT, length]) }
  /** CONVECTION: Newton's law of cooling off a surface. value h · area · dT. */
  static convection(h: number, area: number, dT: number): CrossFormula { return c('heattransfer-convection', 'convection(h, area, dT) = h · area · dT', h * area * dT, nat(h, area, dT), 'convection', [h, area, dT]) }
  /** RADIATION: Stefan–Boltzmann net exchange between two bodies. value max(0, th⁴ − tc⁴). */
  static radiation(th: number, tc: number): CrossFormula { return c('heattransfer-radiation', 'radiation(th, tc) = max(0, th⁴ − tc⁴)', Math.max(0, th ** 4 - tc ** 4), nat(th, tc), 'radiation', [th, tc]) }
  /** LMTD: the log-mean temperature difference, by its arithmetic mean. value ⌊(dt1 + dt2) / 2⌋. */
  static lmtd(dt1: number, dt2: number): CrossFormula { return c('heattransfer-lmtd', 'lmtd(dt1, dt2) = ⌊(dt1 + dt2) / 2⌋', Math.floor((dt1 + dt2) / 2), nat(dt1, dt2), 'lmtd', [dt1, dt2]) }
  /** NUSSELT: convective over conductive transport. value ⌊h · length / k⌋. */
  static nusselt(h: number, length: number, k: number): CrossFormula { return c('heattransfer-nusselt', 'nusselt(h, length, k) = ⌊h · length / k⌋', k > 0 ? Math.floor((h * length) / k) : 0, nat(h, length, k) && k > 0, 'nusselt', [h, length, k]) }
  /** BIOT: internal over surface resistance of a solid. value ⌊h · lc / k⌋. */
  static biot(h: number, lc: number, k: number): CrossFormula { return c('heattransfer-biot', 'biot(h, lc, k) = ⌊h · lc / k⌋', k > 0 ? Math.floor((h * lc) / k) : 0, nat(h, lc, k) && k > 0, 'biot', [h, lc, k]) }
  /** FOURIER: dimensionless diffusion time. value ⌊alpha · time / length²⌋. */
  static fourier(alpha: number, time: number, length: number): CrossFormula { return c('heattransfer-fourier', 'fourier(alpha, time, length) = ⌊alpha · time / length²⌋', length > 0 ? Math.floor((alpha * time) / (length * length)) : 0, nat(alpha, time, length) && length > 0, 'fourier', [alpha, time, length]) }
  /** EFFECTIVENESS: actual over maximum possible transfer, as a percentage. value ⌊actual · 100 / max⌋. */
  static effectiveness(actual: number, max: number): CrossFormula { return c('heattransfer-effectiveness', 'effectiveness(actual, max) = ⌊actual · 100 / max⌋', max > 0 ? Math.floor((actual * 100) / max) : 0, nat(actual, max) && max > 0 && actual <= max, 'effectiveness', [actual, max]) }
}

for (const name of ['biot', 'conduction', 'convection', 'effectiveness', 'fourier', 'lmtd', 'nusselt', 'radiation'] as const)
  hexRegisterOf('heattransfer', name, (HeattransferFormulas[name] as (...x: unknown[]) => unknown).bind(HeattransferFormulas))
