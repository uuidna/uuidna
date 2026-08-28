// theorem-forms — THEOREMS INTERACT AS GEOMETRIC FORMS, not as a flat list.
//
// A principle is a FACE: the theorems that share it are a clique (every pair is a neighbour). A 3-clique is a
// triangle — the VE's eight triangular faces. A 5-clique has 10 edges, the rung 5+5=10. Two pentads sharing the
// two hinges have 8 vertices (ve_pentads_overlap_to_eight). Re-namings are two labels on ONE vertex: the same
// Lean statement occupying two keys, sometimes two files — faces overlapping on a point.
//
// LIVE CENSUS, never a frozen count (a theorem that froze 2129 would rot the next wing). The SHAPE is sealed
// in VectorEquilibrium.lean as theorems_interact_as_faces. Integrity.
import { theorems } from './theorems/index.js'
import { statementCensus } from './editorial.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

/** cliqueEdges(n) → C(n,2) = n(n−1)/2. Integer for every whole n: n(n−1) is even. */
export const cliqueEdges = (n: number): number => (n * (n - 1)) / 2

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
  overlayVertices: number
  overlayAcrossFiles: number
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
  const receipt = merkleGravity([
    toUuid(`forms|${census.entries}|${census.distinct}|${faces.length}`),
    ...faces.slice(0, 8).map((f) => toUuid(`${f.principle}:${f.vertices}:${f.edges}`)),
  ])
  return {
    faces,
    keys: census.entries,
    distinct: census.distinct,
    renamings: census.renamings,
    overlayVertices,
    overlayAcrossFiles,
    receipt,
    honest:
      'Theorems interact as geometric forms: each principle is a clique-face (C(n,2) edges), distinct Lean ' +
      'statements are vertices, re-namings are extra labels on a vertex (sometimes across files). Live census; ' +
      'the incidence arithmetic is sealed as theorems_interact_as_faces. Integrity.',
  }
}
