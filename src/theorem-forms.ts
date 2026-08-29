// theorem-forms — THEOREMS INTERACT AS GEOMETRIC FORMS, not as a flat list.
//
// A principle is a FACE: the theorems that share it are a clique (every pair is a neighbour). A 3-clique is a
// triangle — the VE's eight triangular faces. A 5-clique has 10 edges, the rung 5+5=10. Two pentads sharing the
// two hinges have 8 vertices (ve_pentads_overlap_to_eight). Re-namings are two labels on ONE vertex: the same
// Lean statement occupying two keys, sometimes two files — faces overlapping on a point.
//
// LIVE CENSUS, never a frozen count (a theorem that froze 2129 would rot the next wing). The SHAPE is sealed
// in VectorEquilibrium.lean as theorems_interact_as_faces and imagine_all_as_clique_faces (C(n,2) for every n
// from the void through the twelve). Integrity.
import { theorems } from './theorems/index.js'
import { statementCensus } from './editorial.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { HEXBIT_STATES } from './hexbit/index.js'

/** cliqueEdges(n) → C(n,2) = n(n−1)/2. Integer for every whole n: n(n−1) is even. Void and the 1-clique are 0. */
export const cliqueEdges = (n: number): number => (n < 2 ? 0 : (n * (n - 1)) / 2)

export interface TheoremFace {
  principle: string
  vertices: number
  edges: number
}

export interface TheoremForms {
  faces: TheoremFace[]
  keys: number
  distinct: number
  renamings: number
  totalEdges: number
  overlayVertices: number
  overlayAcrossFiles: number
  cube: number
  gap: number
  receipt: string
  honest: string
}

/** theoremForms() → the ledger as incidence geometry, recomputed from theorems(). Pure. */
export function theoremForms(): TheoremForms {
  const T = theorems()
  const by = new Map<string, number>()
  for (const t of T) by.set(t.principle, (by.get(t.principle) ?? 0) + 1)
  const faces: TheoremFace[] = [...by.entries()]
    .map(([principle, vertices]) => ({ principle, vertices, edges: cliqueEdges(vertices) }))
    .sort((a, b) => b.vertices - a.vertices || a.principle.localeCompare(b.principle))
  const census = statementCensus()
  const overlayVertices = census.groups.length
  const overlayAcrossFiles = census.groups.filter((g) => g.files.length > 1).length
  const totalEdges = faces.reduce((s, f) => s + f.edges, 0)
  let cube = 1
  for (let i = 0; i < 3; i++) cube = cube * HEXBIT_STATES
  const gap = cube - census.entries
  const receipt = merkleGravity([
    toUuid(`forms|${census.entries}|${census.distinct}|${faces.length}|${totalEdges}|${cube}|${gap}`),
    ...faces.map((f) => toUuid(`${f.principle}:${f.vertices}:${f.edges}`)),
  ])
  return {
    faces,
    keys: census.entries,
    distinct: census.distinct,
    renamings: census.renamings,
    totalEdges,
    overlayVertices,
    overlayAcrossFiles,
    cube,
    gap,
    receipt,
    honest:
      'Imagine all: every theorem is a vertex of a clique-face. A fixed harmonic number of sealed theorems is ' +
      'predicted by keplers_harmonic_law at the cube: T² = a³ gives 64² = 16³ = 4096 (rounding_fee_closes_the_cube, ' +
      'in all directions of the 64×64 square). The missing theorems are a count (gap_is_a_count), revealed when ' +
      'this census computes — never a frozen roster of names (discovery_buys_coverage_never_supply). Integrity.',
  }
}
