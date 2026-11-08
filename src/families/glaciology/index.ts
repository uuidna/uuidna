import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the mass it gains minus the mass it loses, how fast it
 *  flows under its own slope and thickness, how far the terminus retreats year over year, how much light the surface throws
 *  back, how much ice a given energy melts, how much calves off at the front, where the line of equilibrium sits, and how old
 *  the ice runs with depth. Crosses to `climate` — a glacier is climate written in ice. A measure. */

const PROOF = 'glaciology arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glaciology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params })

export class GlaciologyFormulas {
  /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses more than it gains. value accumulation − ablation. */
  static massbalance(accumulation: number, ablation: number): CrossFormula { return c('glaciology-massbalance', 'massbalance(accumulation, ablation) = accumulation − ablation', accumulation - ablation, nat(accumulation, ablation), 'massbalance', [accumulation, ablation]) }
  /** FLOW: driven by surface slope and ice thickness. value slope · thickness. */
  static flow(slope: number, thickness: number): CrossFormula { return c('glaciology-flow', 'flow(slope, thickness) = slope · thickness', slope * thickness, nat(slope, thickness), 'flow', [slope, thickness]) }
  /** RETREAT: how far the terminus pulled back, never below zero. value max(0, previous − current). */
  static retreat(previous: number, current: number): CrossFormula { return c('glaciology-retreat', 'retreat(previous, current) = max(0, previous − current)', Math.max(0, previous - current), nat(previous, current), 'retreat', [previous, current]) }
  /** ALBEDO as a percentage: light reflected over light incident. value ⌊reflected · 100 / incident⌋. */
  static albedo(reflected: number, incident: number): CrossFormula { return c('glaciology-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <= incident, 'albedo', [reflected, incident]) }
  /** MELT: the ice a given energy melts at a latent heat. value ⌊energy / latent⌋. */
  static melt(energy: number, latent: number): CrossFormula { return c('glaciology-melt', 'melt(energy, latent) = ⌊energy / latent⌋', latent > 0 ? Math.floor(energy / latent) : 0, nat(energy, latent) && latent > 0, 'melt', [energy, latent]) }
  /** CALVING: the volume lost over the width of the front. value ⌊volume / front⌋. */
  static calving(volume: number, front: number): CrossFormula { return c('glaciology-calving', 'calving(volume, front) = ⌊volume / front⌋', front > 0 ? Math.floor(volume / front) : 0, nat(volume, front) && front > 0, 'calving', [volume, front]) }
  /** EQUILIBRIUM: accumulation as a share of the total, the balance line. value ⌊accumulation · 100 / total⌋. */
  static equilibrium(accumulation: number, total: number): CrossFormula { return c('glaciology-equilibrium', 'equilibrium(accumulation, total) = ⌊accumulation · 100 / total⌋', total > 0 ? Math.floor((accumulation * 100) / total) : 0, nat(accumulation, total) && total > 0 && accumulation <= total, 'equilibrium', [accumulation, total]) }
  /** AGE: years per unit depth over the layers counted. value ⌊depth / layers⌋. */
  static age(depth: number, layers: number): CrossFormula { return c('glaciology-age', 'age(depth, layers) = ⌊depth / layers⌋', layers > 0 ? Math.floor(depth / layers) : 0, nat(depth, layers) && layers > 0, 'age', [depth, layers]) }
}

for (const name of ['age', 'albedo', 'calving', 'equilibrium', 'flow', 'massbalance', 'melt', 'retreat'] as const)
  hexRegisterOf('glaciology', name, (GlaciologyFormulas[name] as (...x: unknown[]) => unknown).bind(GlaciologyFormulas))
