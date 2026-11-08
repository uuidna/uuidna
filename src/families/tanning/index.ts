import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TANNING — TURNING HIDE INTO LEATHER, AS ARITHMETIC. The tannery is numbers: the agent offered on hide weight, how much
 *  of it the collagen takes up, the float the bath floats the hide in, the basicity of the chrome complex, how far the
 *  hide shrinks, the thickness a split leaves, the area of a hide, and how deep the tan penetrated. Crosses to `chemistry`
 *  — tanning is collagen chemistry made to hold. A measure. */

const PROOF = 'tanning arithmetic (agent offer, uptake, float, chrome basicity, shrinkage, split thickness, hide area, penetration); hide becomes leather by collagen chemistry; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tanning', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `tanning.${name}`, params })

export class TanningFormulas {
  /** OFFER: tanning agent as a percentage of hide weight. value ⌊agent · 100 / weight⌋. */
  static offer(agent: number, weight: number): CrossFormula { return c('tanning-offer', 'offer(agent, weight) = ⌊agent · 100 / weight⌋', weight > 0 ? Math.floor((agent * 100) / weight) : 0, nat(agent, weight) && weight > 0, 'offer', [agent, weight]) }
  /** UPTAKE: agent the collagen takes up, offered less what stays in the float. value max(0, offered − residual). */
  static uptake(offered: number, residual: number): CrossFormula { return c('tanning-uptake', 'uptake(offered, residual) = max(0, offered − residual)', Math.max(0, offered - residual), nat(offered, residual), 'uptake', [offered, residual]) }
  /** FLOAT: the bath water as a percentage of hide weight. value ⌊water · 100 / weight⌋. */
  static float(water: number, weight: number): CrossFormula { return c('tanning-float', 'float(water, weight) = ⌊water · 100 / weight⌋', weight > 0 ? Math.floor((water * 100) / weight) : 0, nat(water, weight) && weight > 0, 'float', [water, weight]) }
  /** BASICITY: hydroxide bound of the three Cr(III) valences, as a percentage. value ⌊oh · 100 / (cr · 3)⌋. */
  static basicity(oh: number, cr: number): CrossFormula { return c('tanning-basicity', 'basicity(oh, cr) = ⌊oh · 100 / (cr · 3)⌋', cr > 0 ? Math.floor((oh * 100) / (cr * 3)) : 0, nat(oh, cr) && cr > 0, 'basicity', [oh, cr]) }
  /** SHRINKAGE: how far the hide shrank from its raw size. value max(0, before − after). */
  static shrinkage(before: number, after: number): CrossFormula { return c('tanning-shrinkage', 'shrinkage(before, after) = max(0, before − after)', Math.max(0, before - after), nat(before, after), 'shrinkage', [before, after]) }
  /** THICKNESS: even thickness a split leaves over the layers. value ⌊total / layers⌋. */
  static thickness(total: number, layers: number): CrossFormula { return c('tanning-thickness', 'thickness(total, layers) = ⌊total / layers⌋', layers > 0 ? Math.floor(total / layers) : 0, nat(total, layers) && layers > 0, 'thickness', [total, layers]) }
  /** AREA: the hide area, length by width. value length · width. */
  static area(length: number, width: number): CrossFormula { return c('tanning-area', 'area(length, width) = length · width', length * width, nat(length, width), 'area', [length, width]) }
  /** PENETRATION: how far the tan reached into the cross-section, as a percentage. value ⌊depth · 100 / total⌋. */
  static penetration(depth: number, total: number): CrossFormula { return c('tanning-penetration', 'penetration(depth, total) = ⌊depth · 100 / total⌋', total > 0 ? Math.floor((depth * 100) / total) : 0, nat(depth, total) && total > 0, 'penetration', [depth, total]) }
}

for (const name of ['area', 'basicity', 'float', 'offer', 'penetration', 'shrinkage', 'thickness', 'uptake'] as const)
  hexRegisterOf('tanning', name, (TanningFormulas[name] as (...x: unknown[]) => unknown).bind(TanningFormulas))
