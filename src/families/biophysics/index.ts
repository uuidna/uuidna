import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOPHYSICS — LIVING MATTER AS ARITHMETIC (chosen by the registry, not by hand). The physics of cells is numbers:
 *  how far a molecule diffuses, the voltage across a membrane, the stiffness of tissue, osmotic pull, how tightly a
 *  ligand binds, ion-channel conductance, how far a protein has folded, and the tension in a filament. Crosses to
 *  `materials` — the body is matter under the same laws. A measure. */

const PROOF = 'biophysics arithmetic (diffusion, membrane voltage, elasticity, osmosis, binding, conductance, folding, tension); living matter as numbers; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biophysics', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `biophysics.${name}`, params })

export class BiophysicsFormulas {
  /** DIFFUSION: mean-square reach over time. value ⌊distance² / time⌋. */
  static diffusion(distance: number, time: number): CrossFormula { return c('biophysics-diffusion', 'diffusion(distance, time) = ⌊distance² / time⌋', time > 0 ? Math.floor((distance * distance) / time) : 0, nat(distance, time) && time > 0, 'diffusion', [distance, time]) }
  /** MEMBRANE VOLTAGE: charge over capacitance. value ⌊charge / capacitance⌋. */
  static membrane(charge: number, capacitance: number): CrossFormula { return c('biophysics-membrane', 'membrane(charge, capacitance) = ⌊charge / capacitance⌋', capacitance > 0 ? Math.floor(charge / capacitance) : 0, nat(charge, capacitance) && capacitance > 0, 'membrane', [charge, capacitance]) }
  /** ELASTICITY: Young's modulus, stress over strain. value ⌊stress / strain⌋. */
  static elasticity(stress: number, strain: number): CrossFormula { return c('biophysics-elasticity', 'elasticity(stress, strain) = ⌊stress / strain⌋', strain > 0 ? Math.floor(stress / strain) : 0, nat(stress, strain) && strain > 0, 'elasticity', [stress, strain]) }
  /** OSMOSIS: solute concentration over solvent, per thousand. value ⌊solute · 1000 / solvent⌋. */
  static osmosis(solute: number, solvent: number): CrossFormula { return c('biophysics-osmosis', 'osmosis(solute, solvent) = ⌊solute · 1000 / solvent⌋', solvent > 0 ? Math.floor((solute * 1000) / solvent) : 0, nat(solute, solvent) && solvent > 0, 'osmosis', [solute, solvent]) }
  /** BINDING: bound over free ligand. value ⌊bound / free⌋. */
  static binding(bound: number, free: number): CrossFormula { return c('biophysics-binding', 'binding(bound, free) = ⌊bound / free⌋', free > 0 ? Math.floor(bound / free) : 0, nat(bound, free) && free > 0, 'binding', [bound, free]) }
  /** CONDUCTANCE: current over voltage. value ⌊current / voltage⌋. */
  static conductance(current: number, voltage: number): CrossFormula { return c('biophysics-conductance', 'conductance(current, voltage) = ⌊current / voltage⌋', voltage > 0 ? Math.floor(current / voltage) : 0, nat(current, voltage) && voltage > 0, 'conductance', [current, voltage]) }
  /** FOLDING: folded fraction as a percentage. value ⌊folded · 100 / total⌋. */
  static folding(folded: number, total: number): CrossFormula { return c('biophysics-folding', 'folding(folded, total) = ⌊folded · 100 / total⌋', total > 0 ? Math.floor((folded * 100) / total) : 0, nat(folded, total) && total > 0 && folded <= total, 'folding', [folded, total]) }
  /** TENSION: force over length. value ⌊force / length⌋. */
  static tension(force: number, length: number): CrossFormula { return c('biophysics-tension', 'tension(force, length) = ⌊force / length⌋', length > 0 ? Math.floor(force / length) : 0, nat(force, length) && length > 0, 'tension', [force, length]) }
}

for (const name of ['binding', 'conductance', 'diffusion', 'elasticity', 'folding', 'membrane', 'osmosis', 'tension'] as const)
  hexRegisterOf('biophysics', name, (BiophysicsFormulas[name] as (...x: unknown[]) => unknown).bind(BiophysicsFormulas))
