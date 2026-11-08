import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SIMULATION — RUNNING A MODEL, AS ARITHMETIC (chosen by the public-API registry, not by hand). A simulation is numbers:
 *  the timestep a run advances, whether error converges under tolerance, a Monte Carlo estimate, output stability against
 *  input, grid resolution per cell, the speedup over serial, accuracy against ground truth, and the iteration count.
 *  Crosses to `code` — a simulation is code run as numbers. A measure. */

const PROOF = 'simulation arithmetic (timestep, convergence, monte carlo, stability, resolution, speedup, accuracy, iterations); running a model as numbers; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'simulation', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `simulation.${name}`, params })

export class SimulationFormulas {
  /** TIMESTEP: the duration a single step advances. value ⌊duration / steps⌋. */
  static timestep(duration: number, steps: number): CrossFormula { return c('simulation-timestep', 'timestep(duration, steps) = ⌊duration / steps⌋', steps > 0 ? Math.floor(duration / steps) : 0, nat(duration, steps) && steps > 0, 'timestep', [duration, steps]) }
  /** CONVERGENCE: error measured in units of tolerance. value ⌊error / tolerance⌋. */
  static convergence(error: number, tolerance: number): CrossFormula { return c('simulation-convergence', 'convergence(error, tolerance) = ⌊error / tolerance⌋', tolerance > 0 ? Math.floor(error / tolerance) : 0, nat(error, tolerance) && tolerance > 0, 'convergence', [error, tolerance]) }
  /** MONTE CARLO: hits over samples as a percentage. value ⌊hits · 100 / samples⌋. */
  static montecarlo(hits: number, samples: number): CrossFormula { return c('simulation-montecarlo', 'montecarlo(hits, samples) = ⌊hits · 100 / samples⌋', samples > 0 ? Math.floor((hits * 100) / samples) : 0, nat(hits, samples) && samples > 0 && hits <= samples, 'montecarlo', [hits, samples]) }
  /** STABILITY: output as a percentage of input. value ⌊output · 100 / input⌋. */
  static stability(output: number, input: number): CrossFormula { return c('simulation-stability', 'stability(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'stability', [output, input]) }
  /** RESOLUTION: the domain spread over its cells. value ⌊domain / cells⌋. */
  static resolution(domain: number, cells: number): CrossFormula { return c('simulation-resolution', 'resolution(domain, cells) = ⌊domain / cells⌋', cells > 0 ? Math.floor(domain / cells) : 0, nat(domain, cells) && cells > 0, 'resolution', [domain, cells]) }
  /** SPEEDUP: serial over parallel as a percentage. value ⌊serial · 100 / parallel⌋. */
  static speedup(serial: number, parallel: number): CrossFormula { return c('simulation-speedup', 'speedup(serial, parallel) = ⌊serial · 100 / parallel⌋', parallel > 0 ? Math.floor((serial * 100) / parallel) : 0, nat(serial, parallel) && parallel > 0, 'speedup', [serial, parallel]) }
  /** ACCURACY: correct over total as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('simulation-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** ITERATIONS: the step count a run took. value count. */
  static iterations(count: number): CrossFormula { return c('simulation-iterations', 'iterations(count) = count', count, nat(count), 'iterations', [count]) }
}

for (const name of ['accuracy', 'convergence', 'iterations', 'montecarlo', 'resolution', 'speedup', 'stability', 'timestep'] as const)
  hexRegisterOf('simulation', name, (SimulationFormulas[name] as (...x: unknown[]) => unknown).bind(SimulationFormulas))
