import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PATHPLANNING — MOVING A BODY THROUGH SPACE, AS ARITHMETIC (chosen by the registry, not by hand). A plan is numbers:
 *  the grid distances between two cells (Manhattan, Chebyshev, squared Euclid), the A* heuristic f = g + h, the nodes a
 *  search expands, the cost of walking a path, the clearance from an obstacle, and how smooth the route turns. Crosses to
 *  `robotics` — a path is what a robot drives. A measure. */

const PROOF = 'pathplanning arithmetic (Manhattan, Chebyshev, squared Euclid distance, A* f-score, nodes expanded, path cost, obstacle clearance, turn smoothness); a grid measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pathplanning', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `pathplanning.${name}`, params })

export class PathplanningFormulas {
  /** CHEBYSHEV DISTANCE: the king's-move grid distance from the axis deltas. value max(dx, dy). */
  static chebyshev(dx: number, dy: number): CrossFormula { return c('pathplanning-chebyshev', 'chebyshev(dx, dy) = max(dx, dy)', Math.max(dx, dy), nat(dx, dy), 'chebyshev', [dx, dy]) }
  /** CLEARANCE: how far an obstacle at a distance stays outside the body's radius. value max(0, dist − radius). */
  static clearance(dist: number, radius: number): CrossFormula { return c('pathplanning-clearance', 'clearance(dist, radius) = max(0, dist − radius)', Math.max(0, dist - radius), nat(dist, radius), 'clearance', [dist, radius]) }
  /** SQUARED EUCLID DISTANCE: the no-sqrt distance from the axis deltas. value dx² + dy². */
  static euclidsq(dx: number, dy: number): CrossFormula { return c('pathplanning-euclidsq', 'euclidsq(dx, dy) = dx² + dy²', dx * dx + dy * dy, nat(dx, dy), 'euclidsq', [dx, dy]) }
  /** A* HEURISTIC: the f-score, cost so far plus the estimate ahead. value g + h. */
  static heuristic(g: number, h: number): CrossFormula { return c('pathplanning-heuristic', 'heuristic(g, h) = g + h', g + h, nat(g, h), 'heuristic', [g, h]) }
  /** MANHATTAN DISTANCE: the grid-walk distance from the axis deltas. value dx + dy. */
  static manhattan(dx: number, dy: number): CrossFormula { return c('pathplanning-manhattan', 'manhattan(dx, dy) = dx + dy', dx + dy, nat(dx, dy), 'manhattan', [dx, dy]) }
  /** NODES EXPANDED: a linear estimate of the frontier, branching factor over the search depth. value branch · depth. */
  static nodesexpanded(branch: number, depth: number): CrossFormula { return c('pathplanning-nodesexpanded', 'nodesexpanded(branch, depth) = branch · depth', branch * depth, nat(branch, depth), 'nodesexpanded', [branch, depth]) }
  /** PATH COST: the steps of a route at a cost each. value steps · stepcost. */
  static pathcost(steps: number, stepcost: number): CrossFormula { return c('pathplanning-pathcost', 'pathcost(steps, stepcost) = steps · stepcost', steps * stepcost, nat(steps, stepcost), 'pathcost', [steps, stepcost]) }
  /** SMOOTHNESS: the share of a route that turns, as a percentage. value ⌊turns · 100 / total⌋. */
  static smoothness(turns: number, total: number): CrossFormula { return c('pathplanning-smoothness', 'smoothness(turns, total) = ⌊turns · 100 / total⌋', total > 0 ? Math.floor((turns * 100) / total) : 0, nat(turns, total) && total > 0 && turns <= total, 'smoothness', [turns, total]) }
}

for (const name of ['chebyshev', 'clearance', 'euclidsq', 'heuristic', 'manhattan', 'nodesexpanded', 'pathcost', 'smoothness'] as const)
  hexRegisterOf('pathplanning', name, (PathplanningFormulas[name] as (...x: unknown[]) => unknown).bind(PathplanningFormulas))
