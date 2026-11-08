import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NeuronFormulas — 8 exact-integer formulas of the neuron domain, each at a hex address crossing to cross; develops the neuron leads. */

const PROOF = "neuron counts: synapses(x, y) = x · y; dendrites(x, y) = x + y; threshold(x, y) = max(0, x − y); spikes(x, y) = x · y; axonlength(x, y) = x · y; refractory(x, y) = max(0, x − y); layers(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'neuron', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `neuron.${name}`, params })

export class NeuronFormulas {
  /** synapses(x, y) = x · y. */
  static synapses(x: number, y: number): CrossFormula { return f('neuron-synapses', 'synapses(x, y) = x · y', x * y, nat(x, y), 'synapses', [x, y]) }
  /** dendrites(x, y) = x + y. */
  static dendrites(x: number, y: number): CrossFormula { return f('neuron-dendrites', 'dendrites(x, y) = x + y', x + y, nat(x, y), 'dendrites', [x, y]) }
  /** threshold(x, y) = max(0, x − y). */
  static threshold(x: number, y: number): CrossFormula { return f('neuron-threshold', 'threshold(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'threshold', [x, y]) }
  /** spikes(x, y) = x · y. */
  static spikes(x: number, y: number): CrossFormula { return f('neuron-spikes', 'spikes(x, y) = x · y', x * y, nat(x, y), 'spikes', [x, y]) }
  /** axonlength(x, y) = x · y. */
  static axonlength(x: number, y: number): CrossFormula { return f('neuron-axonlength', 'axonlength(x, y) = x · y', x * y, nat(x, y), 'axonlength', [x, y]) }
  /** refractory(x, y) = max(0, x − y). */
  static refractory(x: number, y: number): CrossFormula { return f('neuron-refractory', 'refractory(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'refractory', [x, y]) }
  /** layers(x, y) = x + y. */
  static layers(x: number, y: number): CrossFormula { return f('neuron-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('neuron-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['axonlength', 'combos', 'dendrites', 'layers', 'refractory', 'spikes', 'synapses', 'threshold'] as const)
  hexRegisterOf('neuron', name, (NeuronFormulas[name] as (...x: unknown[]) => unknown).bind(NeuronFormulas))
