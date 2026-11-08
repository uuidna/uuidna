import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PLATONIC — COMPLEX RELATIONS MANAGED SIMPLY, AND THE TRINITY PAIRS. Every convex regular solid is a TRINITY of three
 *  counts — vertices, edges, faces — and all five obey one law: Euler's V − E + F = 2. That single invariant is how a
 *  relation of any complexity is managed simply: map it onto a solid and the law holds. The solids come in PAIRS, the
 *  duals that swap vertices and faces — cube ↔ octahedron, dodecahedron ↔ icosahedron, and the tetrahedron its own pair
 *  (the self-dual trinity, the two-tetrahedra merkaba). Crosses to `merkaba`, the trinity and double-torus family.
 *
 *  index: 0 tetrahedron, 1 cube, 2 octahedron, 3 dodecahedron, 4 icosahedron. */

const SOLIDS = [
  { name: 'tetrahedron', v: 4, e: 6, f: 4, p: 3, q: 3, dual: 0 },
  { name: 'cube', v: 8, e: 12, f: 6, p: 4, q: 3, dual: 2 },
  { name: 'octahedron', v: 6, e: 12, f: 8, p: 3, q: 4, dual: 1 },
  { name: 'dodecahedron', v: 20, e: 30, f: 12, p: 5, q: 3, dual: 4 },
  { name: 'icosahedron', v: 12, e: 30, f: 20, p: 3, q: 5, dual: 3 },
] as const

const PROOF = 'the five Platonic solids, each a trinity (V, E, F) under one law — Euler V − E + F = 2 — paired by duality (cube ↔ octahedron, dodecahedron ↔ icosahedron, tetrahedron self-dual); complex relations map onto a solid and are managed by that single invariant'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const ok = (i: number) => Number.isSafeInteger(i) && i >= 0 && i < SOLIDS.length
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'platonic', dst: 'merkaba', formula, value, proof: PROOF, ...extra }, holds, { name: `platonic.${name}`, params })

export class PlatonicFormulas {
  /** THE ONE LAW. Euler's characteristic of a convex polyhedron; holds only at 2 — a valid closed solid, the simple
   *  invariant that manages a relation of any size once it is mapped to V, E, F. value V − E + F. */
  static euler(v: number, e: number, f: number): CrossFormula { return p('platonic-euler', 'euler(v, e, f) = v − e + f; a closed solid holds at 2', v - e + f, nat(v, e, f) && v - e + f === 2, 'euler', [v, e, f]) }
  /** The vertices of the i-th solid. */
  static vertices(i: number): CrossFormula { return p('platonic-vertices', 'vertices(i)', ok(i) ? SOLIDS[i]!.v : 0, ok(i), 'vertices', [i], { solid: ok(i) ? SOLIDS[i]!.name : undefined }) }
  /** The edges of the i-th solid — the same for a solid and its dual. */
  static edges(i: number): CrossFormula { return p('platonic-edges', 'edges(i)', ok(i) ? SOLIDS[i]!.e : 0, ok(i), 'edges', [i], { solid: ok(i) ? SOLIDS[i]!.name : undefined }) }
  /** The faces of the i-th solid. */
  static faces(i: number): CrossFormula { return p('platonic-faces', 'faces(i)', ok(i) ? SOLIDS[i]!.f : 0, ok(i), 'faces', [i], { solid: ok(i) ? SOLIDS[i]!.name : undefined }) }
  /** THE TRINITY PAIR: the index of the i-th solid's dual — vertices and faces exchanged. tetra→tetra, cube↔octa, dodeca↔icosa. */
  static dual(i: number): CrossFormula { return p('platonic-dual', 'dual(i) = the dual solid (V and F exchanged)', ok(i) ? SOLIDS[i]!.dual : 0, ok(i), 'dual', [i], { pair: ok(i) ? [SOLIDS[i]!.name, SOLIDS[SOLIDS[i]!.dual]!.name] : undefined }) }
  /** THE SELF-DUAL: 1 only for the tetrahedron — the trinity that is its own pair, the merkaba's single tetrahedron. */
  static self(i: number): CrossFormula { return p('platonic-self', 'self(i) = [dual(i) = i]', ok(i) && SOLIDS[i]!.dual === i ? 1 : 0, ok(i), 'self', [i]) }
  /** The Schläfli p: how many sides each face has. */
  static sides(i: number): CrossFormula { return p('platonic-sides', 'sides(i) = sides per face (Schläfli p)', ok(i) ? SOLIDS[i]!.p : 0, ok(i), 'sides', [i], { solid: ok(i) ? SOLIDS[i]!.name : undefined }) }
  /** The Schläfli q: how many faces meet at each vertex — the dual's sides. */
  static meeting(i: number): CrossFormula { return p('platonic-meeting', 'meeting(i) = faces at a vertex (Schläfli q)', ok(i) ? SOLIDS[i]!.q : 0, ok(i), 'meeting', [i], { solid: ok(i) ? SOLIDS[i]!.name : undefined }) }
}

for (const name of ['dual', 'edges', 'euler', 'faces', 'meeting', 'self', 'sides', 'vertices'] as const)
  hexRegisterOf('platonic', name, (PlatonicFormulas[name] as (...x: unknown[]) => unknown).bind(PlatonicFormulas))
