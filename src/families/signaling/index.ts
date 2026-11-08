import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SIGNALING — CELL SIGNAL TRANSDUCTION, AS ARITHMETIC. A signal passing through a cell is numbers: how many receptors a
 *  ligand occupies, how far the signal is amplified, the half-maximal response, the gain of a cascade, the second
 *  messenger made, how much response is lost to desensitization, what dissociates, and how long the response takes.
 *  Crosses to `physiology` — signaling is the chemistry physiology runs on. A measure. */

const PROOF = 'signaling arithmetic (receptor occupancy, amplification, EC50, cascade gain, second messenger, desensitization, dissociation, response time); cell signal transduction as integers; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'signaling', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `signaling.${name}`, params })

export class SignalingFormulas {
  /** RECEPTOR OCCUPANCY: fraction of receptors a ligand binds, as a percentage. value ⌊ligand · 100 / (ligand + kd)⌋. */
  static receptoroccupancy(ligand: number, kd: number): CrossFormula { return c('signaling-receptoroccupancy', 'receptoroccupancy(ligand, kd) = ⌊ligand · 100 / (ligand + kd)⌋', (ligand + kd) > 0 ? Math.floor((ligand * 100) / (ligand + kd)) : 0, nat(ligand, kd) && (ligand + kd) > 0, 'receptoroccupancy', [ligand, kd]) }
  /** AMPLIFICATION: how far an input signal is amplified at the output. value ⌊output / input⌋. */
  static amplification(output: number, input: number): CrossFormula { return c('signaling-amplification', 'amplification(output, input) = ⌊output / input⌋', input > 0 ? Math.floor(output / input) : 0, nat(output, input) && input > 0, 'amplification', [output, input]) }
  /** EC50: the half-maximal response between a bottom and a top. value ⌊(top + bottom) / 2⌋. */
  static ec50(top: number, bottom: number): CrossFormula { return c('signaling-ec50', 'ec50(top, bottom) = ⌊(top + bottom) / 2⌋', Math.floor((top + bottom) / 2), nat(top, bottom) && top >= bottom, 'ec50', [top, bottom]) }
  /** CASCADE GAIN: two stage gains multiply along the cascade. value stage1 · stage2. */
  static cascadegain(stage1: number, stage2: number): CrossFormula { return c('signaling-cascadegain', 'cascadegain(stage1, stage2) = stage1 · stage2', stage1 * stage2, nat(stage1, stage2), 'cascadegain', [stage1, stage2]) }
  /** SECOND MESSENGER: molecules made by active enzymes at a rate each. value enzymes · rate. */
  static secondmessenger(enzymes: number, rate: number): CrossFormula { return c('signaling-secondmessenger', 'secondmessenger(enzymes, rate) = enzymes · rate', enzymes * rate, nat(enzymes, rate), 'secondmessenger', [enzymes, rate]) }
  /** DESENSITIZATION: response remaining after a loss. value max(0, initial − lost). */
  static desensitization(initial: number, lost: number): CrossFormula { return c('signaling-desensitization', 'desensitization(initial, lost) = max(0, initial − lost)', Math.max(0, initial - lost), nat(initial, lost), 'desensitization', [initial, lost]) }
  /** DISSOCIATION: bound complex released at an off-rate per thousand. value ⌊bound · koff / 1000⌋. */
  static dissociation(bound: number, koff: number): CrossFormula { return c('signaling-dissociation', 'dissociation(bound, koff) = ⌊bound · koff / 1000⌋', Math.floor((bound * koff) / 1000), nat(bound, koff), 'dissociation', [bound, koff]) }
  /** RESPONSE TIME: distance a signal travels at a speed. value ⌊distance / speed⌋. */
  static responsetime(distance: number, speed: number): CrossFormula { return c('signaling-responsetime', 'responsetime(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'responsetime', [distance, speed]) }
}

for (const name of ['amplification', 'cascadegain', 'desensitization', 'dissociation', 'ec50', 'receptoroccupancy', 'responsetime', 'secondmessenger'] as const)
  hexRegisterOf('signaling', name, (SignalingFormulas[name] as (...x: unknown[]) => unknown).bind(SignalingFormulas))
