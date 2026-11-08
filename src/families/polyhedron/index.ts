import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLYHEDRON — A SOLID AS ARITHMETIC (chosen by the shape registry, not by hand). A polyhedron is counting: the Euler
 *  characteristic, the edges that faces share, the vertices and faces Euler fixes, how many faces meet at a vertex, the
 *  surface area, the volume, and the dihedral angles along the edges. Crosses to `geometry` — a polyhedron is geometry made
 *  discrete. A measure. */

const PROOF = 'polyhedron arithmetic (Euler characteristic, edges, vertices, faces, faces-at-vertex, surface area, volume, dihedral count); the shape registry\'s uncovered solid; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'polyhedron', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `polyhedron.${name}`, params })

export class PolyhedronFormulas {
  /** THE EULER CHARACTERISTIC: vertices minus edges plus faces. value max(0, v − e + f). */
  static eulercharacteristic(v: number, e: number, f: number): CrossFormula { return c('polyhedron-eulercharacteristic', 'eulercharacteristic(v, e, f) = max(0, v − e + f)', Math.max(0, v - e + f), nat(v, e, f), 'eulercharacteristic', [v, e, f]) }
  /** EDGES: f faces of s sides each, every edge shared by two faces. value ⌊f · s / 2⌋. */
  static edges(f: number, s: number): CrossFormula { return c('polyhedron-edges', 'edges(f, s) = ⌊f · s / 2⌋', Math.floor((f * s) / 2), nat(f, s), 'edges', [f, s]) }
  /** VERTICES from Euler: v = e − f + 2. value max(0, e − f + 2). */
  static vertices(e: number, f: number): CrossFormula { return c('polyhedron-vertices', 'vertices(e, f) = max(0, e − f + 2)', Math.max(0, e - f + 2), nat(e, f), 'vertices', [e, f]) }
  /** FACES from Euler: f = e − v + 2. value max(0, e − v + 2). */
  static faces(v: number, e: number): CrossFormula { return c('polyhedron-faces', 'faces(v, e) = max(0, e − v + 2)', Math.max(0, e - v + 2), nat(v, e), 'faces', [v, e]) }
  /** FACES AT A VERTEX: the degree of a vertex, 2 edges over the vertices. value ⌊2 · e / v⌋. */
  static facesatvertex(e: number, v: number): CrossFormula { return c('polyhedron-facesatvertex', 'facesatvertex(e, v) = ⌊2 · e / v⌋', v > 0 ? Math.floor((2 * e) / v) : 0, nat(e, v) && v > 0, 'facesatvertex', [e, v]) }
  /** SURFACE AREA: f faces at an area each. value faces · area. */
  static surfacearea(faces: number, area: number): CrossFormula { return c('polyhedron-surfacearea', 'surfacearea(faces, area) = faces · area', faces * area, nat(faces, area), 'surfacearea', [faces, area]) }
  /** VOLUME of a box: length · width · height. value l · w · h. */
  static volume(l: number, w: number, h: number): CrossFormula { return c('polyhedron-volume', 'volume(l, w, h) = l · w · h', l * w * h, nat(l, w, h), 'volume', [l, w, h]) }
  /** DIHEDRAL COUNT: one dihedral angle along each edge. value e. */
  static dihedralcount(e: number): CrossFormula { return c('polyhedron-dihedralcount', 'dihedralcount(e) = e', e, nat(e), 'dihedralcount', [e]) }
}

for (const name of ['dihedralcount', 'edges', 'eulercharacteristic', 'faces', 'facesatvertex', 'surfacearea', 'vertices', 'volume'] as const)
  hexRegisterOf('polyhedron', name, (PolyhedronFormulas[name] as (...x: unknown[]) => unknown).bind(PolyhedronFormulas))
