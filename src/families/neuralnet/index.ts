import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NEURALNET — A FEEDFORWARD NETWORK AS ARITHMETIC (chosen by the public-API registry, not by hand). A trained net is
 *  numbers: the parameters a dense layer carries, the layers a stack has, the neurons across a depth, the weights of a
 *  connection, the rectified activation, the average fan-in, the flops of a forward pass, and the capacity in bits.
 *  Crosses to `neuroscience` — the artificial network is the model of the biological one. A measure. */

const PROOF = 'neuralnet arithmetic (parameters, layers, neurons, weights, relu, fanin, flops, capacity); the registry\'s uncovered learning domain; a measure crossed to neuroscience'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'neuralnet', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name: `neuralnet.${name}`, params })

export class NeuralnetFormulas {
  /** PARAMETERS: a dense layer's weights plus its biases. value inputs · outputs + outputs. */
  static parameters(inputs: number, outputs: number): CrossFormula { return c('neuralnet-parameters', 'parameters(inputs, outputs) = inputs · outputs + outputs', inputs * outputs + outputs, nat(inputs, outputs), 'parameters', [inputs, outputs]) }
  /** LAYERS: the hidden layers plus the input and output layers. value hidden + 2. */
  static layers(hidden: number): CrossFormula { return c('neuralnet-layers', 'layers(hidden) = hidden + 2', hidden + 2, nat(hidden), 'layers', [hidden]) }
  /** NEURONS: a uniform stack's units across its depth. value depth · perLayer. */
  static neurons(depth: number, perLayer: number): CrossFormula { return c('neuralnet-neurons', 'neurons(depth, perLayer) = depth · perLayer', depth * perLayer, nat(depth, perLayer), 'neurons', [depth, perLayer]) }
  /** WEIGHTS: a fully-connected edge count between two layers. value inDim · outDim. */
  static weights(inDim: number, outDim: number): CrossFormula { return c('neuralnet-weights', 'weights(inDim, outDim) = inDim · outDim', inDim * outDim, nat(inDim, outDim), 'weights', [inDim, outDim]) }
  /** RELU: the rectified linear unit. value max(0, x). */
  static relu(x: number): CrossFormula { return c('neuralnet-relu', 'relu(x) = max(0, x)', Math.max(0, x), nat(x), 'relu', [x]) }
  /** FANIN: the average incoming edges per node. value ⌊edges / nodes⌋. */
  static fanin(edges: number, nodes: number): CrossFormula { return c('neuralnet-fanin', 'fanin(edges, nodes) = ⌊edges / nodes⌋', nodes > 0 ? Math.floor(edges / nodes) : 0, nat(edges, nodes) && nodes > 0, 'fanin', [edges, nodes]) }
  /** FLOPS: a forward pass, two per multiply-accumulate plus one activation per node. value 2 · edges + nodes. */
  static flops(edges: number, nodes: number): CrossFormula { return c('neuralnet-flops', 'flops(edges, nodes) = 2 · edges + nodes', 2 * edges + nodes, nat(edges, nodes), 'flops', [edges, nodes]) }
  /** CAPACITY: the memory a parameter set occupies, in bits. value units · bits. */
  static capacity(units: number, bits: number): CrossFormula { return c('neuralnet-capacity', 'capacity(units, bits) = units · bits', units * bits, nat(units, bits), 'capacity', [units, bits]) }
}

for (const name of ['capacity', 'fanin', 'flops', 'layers', 'neurons', 'parameters', 'relu', 'weights'] as const)
  hexRegisterOf('neuralnet', name, (NeuralnetFormulas[name] as (...x: unknown[]) => unknown).bind(NeuralnetFormulas))
