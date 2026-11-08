import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NEUROSCIENCE — THE BRAIN AS ARITHMETIC. The nervous system is numbers: spikes per second, the membrane potential across the
 *  cell, synapses per neuron, conduction speed along an axon, the share of synapses strengthened, the refractory window, the
 *  connectivity of a network, and the firing threshold. Crosses to `neurology` — neuroscience is what neurology reasons about.
 *  A measure. */

const PROOF = 'neuroscience arithmetic (firing rate, membrane potential, synapses per neuron, conduction speed, plasticity, refractory window, connectivity, threshold); the brain as a measure crossed to neurology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'neuroscience', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, { name: `neuroscience.${name}`, params })

export class NeuroscienceFormulas {
  /** FIRING RATE: spikes over the seconds observed. value ⌊spikes / seconds⌋. */
  static firing(spikes: number, seconds: number): CrossFormula { return c('neuroscience-firing', 'firing(spikes, seconds) = ⌊spikes / seconds⌋', seconds > 0 ? Math.floor(spikes / seconds) : 0, nat(spikes, seconds) && seconds > 0, 'firing', [spikes, seconds]) }
  /** MEMBRANE POTENTIAL: the difference across the cell (may be negative). value sodium − potassium. */
  static potential(sodium: number, potassium: number): CrossFormula { return c('neuroscience-potential', 'potential(sodium, potassium) = sodium − potassium', sodium - potassium, nat(sodium, potassium), 'potential', [sodium, potassium]) }
  /** SYNAPSES PER NEURON: connections over neurons. value ⌊connections / neurons⌋. */
  static synapse(connections: number, neurons: number): CrossFormula { return c('neuroscience-synapse', 'synapse(connections, neurons) = ⌊connections / neurons⌋', neurons > 0 ? Math.floor(connections / neurons) : 0, nat(connections, neurons) && neurons > 0, 'synapse', [connections, neurons]) }
  /** CONDUCTION SPEED: distance over time. value ⌊distance / time⌋. */
  static conduction(distance: number, time: number): CrossFormula { return c('neuroscience-conduction', 'conduction(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'conduction', [distance, time]) }
  /** PLASTICITY: the share of synapses strengthened. value ⌊strengthened · 100 / synapses⌋. */
  static plasticity(strengthened: number, synapses: number): CrossFormula { return c('neuroscience-plasticity', 'plasticity(strengthened, synapses) = ⌊strengthened · 100 / synapses⌋', synapses > 0 ? Math.floor((strengthened * 100) / synapses) : 0, nat(strengthened, synapses) && synapses > 0 && strengthened <= synapses, 'plasticity', [strengthened, synapses]) }
  /** REFRACTORY WINDOW: the milliseconds a neuron cannot fire — the membrane has not recovered. value milliseconds. */
  static refractory(milliseconds: number): CrossFormula { return c('neuroscience-refractory', 'refractory(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'refractory', [milliseconds]) }
  /** CONNECTIVITY: edges over nodes. value ⌊edges / nodes⌋. */
  static connectivity(edges: number, nodes: number): CrossFormula { return c('neuroscience-connectivity', 'connectivity(edges, nodes) = ⌊edges / nodes⌋', nodes > 0 ? Math.floor(edges / nodes) : 0, nat(edges, nodes) && nodes > 0, 'connectivity', [edges, nodes]) }
  /** FIRING THRESHOLD: the millivolts needed to fire. value millivolts. */
  static threshold(millivolts: number): CrossFormula { return c('neuroscience-threshold', 'threshold(millivolts) = millivolts', millivolts, nat(millivolts), 'threshold', [millivolts]) }
}

for (const name of ['conduction', 'connectivity', 'firing', 'plasticity', 'potential', 'refractory', 'synapse', 'threshold'] as const)
  hexRegisterOf('neuroscience', name, (NeuroscienceFormulas[name] as (...x: unknown[]) => unknown).bind(NeuroscienceFormulas))
