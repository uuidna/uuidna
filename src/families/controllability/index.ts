import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONTROLLABILITY — WHETHER A SYSTEM CAN BE STEERED, AS ARITHMETIC. A linear system is controllable when inputs can drive
 *  the state anywhere: the controllability matrix [B, AB, …, Aⁿ⁻¹B] must have full rank. Running control is numbers: the
 *  size of that matrix, its rank, the reachable states, the controllability degree (index), input coupling, state
 *  dimension, the Gramian trace, and how many modes the inputs actually reach. Crosses to `control` — controllability is
 *  the precondition control needs. A measure. */

const PROOF = 'controllability arithmetic (controllability matrix, rank, reachable states, degree/index, input coupling, state dimension, Gramian trace, modes controlled); the precondition for control; a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'controllability', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `controllability.${name}`, params })

export class ControllabilityFormulas {
  /** MATRIX RANK: the rank of a rows×cols matrix is at most the smaller dimension. value min(rows, cols). */
  static matrixrank(rows: number, cols: number): CrossFormula { return c('controllability-matrixrank', 'matrixrank(rows, cols) = min(rows, cols)', Math.min(rows, cols), nat(rows, cols), 'matrixrank', [rows, cols]) }
  /** REACHABLE STATES: the dimension of the reachable subspace is the state count minus the uncontrollable part. value max(0, states − uncontrollable). */
  static reachablestates(states: number, uncontrollable: number): CrossFormula { return c('controllability-reachablestates', 'reachablestates(states, uncontrollable) = max(0, states − uncontrollable)', Math.max(0, states - uncontrollable), nat(states, uncontrollable), 'reachablestates', [states, uncontrollable]) }
  /** CONTROLLABILITY MATRIX: [B, AB, …, Aⁿ⁻¹B] has states rows and states·inputs columns. value states · inputs. */
  static controllabilitymatrix(states: number, inputs: number): CrossFormula { return c('controllability-controllabilitymatrix', 'controllabilitymatrix(states, inputs) = states · inputs', states * inputs, nat(states, inputs), 'controllabilitymatrix', [states, inputs]) }
  /** CONTROLLABILITY DEGREE (index): the steps of inputs needed to span the state space. value ⌈states / inputs⌉. */
  static degree(states: number, inputs: number): CrossFormula { return c('controllability-degree', 'degree(states, inputs) = ⌈states / inputs⌉', inputs > 0 ? Math.ceil(states / inputs) : 0, nat(states, inputs) && inputs > 0, 'degree', [states, inputs]) }
  /** INPUT COUPLING: nonzero entries wiring inputs to the states each one touches. value inputs · statesPerInput. */
  static inputcoupling(inputs: number, statesPerInput: number): CrossFormula { return c('controllability-inputcoupling', 'inputcoupling(inputs, statesPerInput) = inputs · statesPerInput', inputs * statesPerInput, nat(inputs, statesPerInput), 'inputcoupling', [inputs, statesPerInput]) }
  /** STATE DIMENSION: the combined state dimension of two subsystems in series. value sub1 + sub2. */
  static statedimension(sub1: number, sub2: number): CrossFormula { return c('controllability-statedimension', 'statedimension(sub1, sub2) = sub1 + sub2', sub1 + sub2, nat(sub1, sub2), 'statedimension', [sub1, sub2]) }
  /** GRAMIAN TRACE: the controllability Gramian trace is the per-mode energy summed over the modes. value energy · modes. */
  static gramiantrace(energy: number, modes: number): CrossFormula { return c('controllability-gramiantrace', 'gramiantrace(energy, modes) = energy · modes', energy * modes, nat(energy, modes), 'gramiantrace', [energy, modes]) }
  /** MODES CONTROLLED: the modes the inputs reach are the total modes minus the uncontrollable ones. value max(0, modes − uncontrollable). */
  static modescontrolled(modes: number, uncontrollable: number): CrossFormula { return c('controllability-modescontrolled', 'modescontrolled(modes, uncontrollable) = max(0, modes − uncontrollable)', Math.max(0, modes - uncontrollable), nat(modes, uncontrollable), 'modescontrolled', [modes, uncontrollable]) }
}

for (const name of ['controllabilitymatrix', 'degree', 'gramiantrace', 'inputcoupling', 'matrixrank', 'modescontrolled', 'reachablestates', 'statedimension'] as const)
  hexRegisterOf('controllability', name, (ControllabilityFormulas[name] as (...x: unknown[]) => unknown).bind(ControllabilityFormulas))
