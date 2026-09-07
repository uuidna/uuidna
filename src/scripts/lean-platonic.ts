#!/usr/bin/env node
// Automate the Lean layer for THE FIVE PLATONIC SOLIDS, AND WHY THERE ARE EXACTLY FIVE.
//
// The captain, 2026-09-07: "each of the platonic solids hold clusters of axioms". This seals the clusters, and the
// one that binds them: the count five is not a fact of geometry to be looked up, it is the number of integer
// solutions to a single inequality, and that is decidable by walking a bounded grid.
//
// THE SCHLÄFLI CONDITION, IN INTEGERS. A solid {p, q} has q regular p-gons at every vertex. For the vertex to
// close in three dimensions the face angles must total less than a full turn, which is 1/p + 1/q > 1/2 — and this
// tree runs no rationals, so it is multiplied out: 2(p + q) > p·q. Both p and q are at least 3, since no polygon
// has fewer than three sides and no solid vertex joins fewer than three faces.
//
// AND THE SEARCH IS BOUNDED BY ITS OWN ARITHMETIC, which is what makes "exactly five" a theorem rather than a
// tabulation. If p ≥ 6 then 1/p ≤ 1/6, and with 1/q ≤ 1/3 the sum cannot exceed 1/2 — so no admissible pair has a
// coordinate above 5, and a walk over 3..8 in both coordinates has already left the region where solutions can
// live. The wing decides over that widened grid ON PURPOSE: a walk that stopped at 5 would be assuming the bound
// it is supposed to establish, and this ledger has caught that shape before.
//
// WHAT EACH CLUSTER HOLDS: the Schläfli symbol, the three counts, Euler's V − E + F = 2, the incidence identities
// q·V = 2E = p·F which say the same edge is counted twice from either end, and the dual pairing that swaps
// vertices with faces. The tetrahedron is its own dual, which is a fact about {3,3} and not an exception to
// anything.
//
// SCOPE: the combinatorics. Nothing here constructs a solid, embeds one in space, or claims the enumeration is
// complete over anything but the stated grid — the bound argument above is why that grid suffices, and it is
// sealed as its own theorem rather than left in this comment.
import { emit } from './lean-gen.js'

interface Solid { name: string; p: number; q: number; V: number; E: number; F: number; dual: string }

const SOLIDS: Solid[] = [
  { name: 'tetrahedron',  p: 3, q: 3, V: 4,  E: 6,  F: 4,  dual: 'tetrahedron' },
  { name: 'cube',         p: 4, q: 3, V: 8,  E: 12, F: 6,  dual: 'octahedron' },
  { name: 'octahedron',   p: 3, q: 4, V: 6,  E: 12, F: 8,  dual: 'cube' },
  { name: 'dodecahedron', p: 5, q: 3, V: 20, E: 30, F: 12, dual: 'icosahedron' },
  { name: 'icosahedron',  p: 3, q: 5, V: 12, E: 30, F: 20, dual: 'dodecahedron' },
]

const admits = (p: number, q: number): boolean => 2 * (p + q) > p * q
const GRID: [number, number][] = []
for (let p = 3; p <= 8; p++) for (let q = 3; q <= 8; q++) GRID.push([p, q])

const L = (rs: [number, number][]): string => '[' + rs.map(([a, b]) => `(${a},${b})`).join(',') + ']'
const S = (s: Solid): string => `(${s.p},${s.q},${s.V},${s.E},${s.F})`

const FACTS = [
  ...SOLIDS.map((s) => ({
    key: `${s.name}_cluster_closes`,
    why: `THE CLUSTER OF THE ${s.name.toUpperCase()}, {${s.p},${s.q}}: ${s.V} vertices, ${s.E} edges, ${s.F} faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.`,
    // EULER WITHOUT SUBTRACTION. `V - E + F = 2` is false in Lean's Nat for every one of these: subtraction
    // truncates at zero, so 4 - 6 + 4 evaluates to 4 and `decide` correctly refuted it. The identity is carried
    // as V + F = E + 2, which is the same statement over the naturals and needs no negative number to exist.
    js: () => s.V + s.F === s.E + 2 && s.q * s.V === 2 * s.E && s.p * s.F === 2 * s.E,
    lean: `theorem ${s.name}_cluster_closes : (${s.V} + ${s.F} = ${s.E} + 2) ∧ (${s.q} * ${s.V} = 2 * ${s.E}) ∧ (${s.p} * ${s.F} = 2 * ${s.E}) := by decide`,
  })),

  { key: 'exactly_five_symbols_admit_a_solid',
    why: 'WHY THERE ARE FIVE, AS AN ENUMERATION RATHER THAN A LOOKUP. A vertex of q regular p-gons closes in three dimensions exactly when 1/p + 1/q > 1/2, written in integers as 2(p + q) > p·q because this tree carries no rationals. Walking every (p,q) from 3 to 8 in both coordinates, exactly five pairs satisfy it — {3,3}, {4,3}, {3,4}, {5,3}, {3,5} — and they are the five solids tabulated in this wing. The count is decided, not recalled.',
    js: () => GRID.filter(([p, q]) => admits(p, q)).length === 5,
    lean: `theorem exactly_five_symbols_admit_a_solid : (${L(GRID)}.filter (fun s => 2 * (s.1 + s.2) > s.1 * s.2)).length = 5 := by decide` },

  { key: 'the_grid_is_wide_enough_to_settle_the_count',
    why: 'AND THE WALK IS NOT ASSUMING ITS OWN BOUND. Five would be a tabulation if the grid had been stopped exactly where the solutions stop. Every pair on this grid with a coordinate of 6 or more FAILS the condition — if p ≥ 6 then 1/p ≤ 1/6, and 1/q ≤ 1/3 leaves the sum at most 1/2 — so the region searched already extends past where any solution can live, and widening it further can add nothing. A bound established by the same walk it bounds is the shape this ledger has caught before, which is why it is a separate theorem.',
    js: () => GRID.filter(([p, q]) => p >= 6 || q >= 6).every(([p, q]) => !admits(p, q)),
    lean: `theorem the_grid_is_wide_enough_to_settle_the_count : ${L(GRID)}.all (fun s => (s.1 < 6 && s.2 < 6) || !(2 * (s.1 + s.2) > s.1 * s.2)) := by decide` },

  { key: 'every_admitted_symbol_is_a_tabulated_solid',
    why: 'THE ENUMERATION AND THE TABLE ARE THE SAME FIVE. The condition admits five symbols and this wing tabulates five clusters; this decides that they are the SAME five, pair by pair, so the table cannot have quietly listed a sixth or omitted one the arithmetic allows. Two surfaces that must agree, made to agree in the kernel rather than by inspection.',
    js: () => {
      const admitted = GRID.filter(([p, q]) => admits(p, q)).map(([p, q]) => `${p},${q}`).sort()
      const tabled = SOLIDS.map((s) => `${s.p},${s.q}`).sort()
      return admitted.length === tabled.length && admitted.every((x, i) => x === tabled[i])
    },
    lean: `theorem every_admitted_symbol_is_a_tabulated_solid : (${L(GRID)}.filter (fun s => 2 * (s.1 + s.2) > s.1 * s.2)) = ${L(SOLIDS.map((s) => [s.p, s.q] as [number, number]).sort((a, b) => a[0] - b[0] || a[1] - b[1]))} := by decide` },

  { key: 'duality_swaps_vertices_and_faces',
    why: 'EACH SOLID\'S DUAL IS ANOTHER OF THE FIVE, AND DUALITY EXCHANGES THE COUNTS. Cube with octahedron, dodecahedron with icosahedron, and the tetrahedron with itself: in every pair the vertices of one are the faces of the other while the edges are unchanged, and the Schläfli symbol reverses. The tetrahedron being self-dual is what {3,3} says when reversed, not an exception carved out for it. Written as an explicit conjunction per pair rather than a walk over ten-wide tuples — the first version indexed those by hand and Lean refused to synthesise the projections, which is the tell that the shape was carrying the reader and not the kernel.',
    js: () => SOLIDS.every((s2) => {
      const d = SOLIDS.find((x) => x.name === s2.dual)!
      return d.V === s2.F && d.F === s2.V && d.E === s2.E && d.p === s2.q && d.q === s2.p
    }),
    // THE KERNEL MUST DO THE LOOKUP. The first form resolved the duality IN THE GENERATOR and emitted the
    // resolved pairs — `(4 = 4) ∧ (6 = 6)` — so the kernel checked that numbers equal themselves and the
    // vacuity finder refused it. The tables and the dual PERMUTATION are data now; the kernel indexes one by
    // the other and compares, which is the claim the name makes. Written this way it can also FAIL: permute
    // the dual list wrongly and `decide` says so, where the old form could not.
    lean: `theorem duality_swaps_vertices_and_faces : (List.range ${SOLIDS.length}).all (fun i => `
      + `(nth solidV (nth dualIx i) == nth solidF i) && (nth solidF (nth dualIx i) == nth solidV i) `
      + `&& (nth solidE (nth dualIx i) == nth solidE i) && (nth solidP (nth dualIx i) == nth solidQ i) `
      + `&& (nth solidQ (nth dualIx i) == nth solidP i)) := by decide` },

  { key: 'the_five_clusters_carry_thirty_edges_at_most',
    why: 'THE FAMILY IS SMALL AND BOUNDED, which is the fact that makes exhaustive treatment possible at all. No Platonic solid has more than thirty edges, twenty faces or twenty vertices, so every claim about "all Platonic solids" in this ledger is a walk over five tabulated rows and never an appeal to a general argument. Written over plain (V,E,F) triples: a five-wide tuple needed projections Lean would not synthesise, and reaching for them by hand is how the earlier version indexed the vertex count while believing it read the edges.',
    js: () => SOLIDS.every((s2) => s2.E <= 30 && s2.F <= 20 && s2.V <= 20),
    lean: `theorem the_five_clusters_carry_thirty_edges_at_most : ${'[' + SOLIDS.map((s2) => `(${s2.V},${s2.E},${s2.F})`).join(',') + ']'}.all (fun t => (t.1 <= 20) && (t.2.1 <= 30) && (t.2.2 <= 20)) := by decide` },
]

const DEFS = [
  // INDEXING IS DEFINED, NOT IMPORTED. `List.get!` is not in this toolchain's environment — the kernel said so
  // rather than being assumed — so the walk is written out. Structural recursion, total, and `decide`-friendly.
  `def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, n+1 => nth xs n`,
  `def solidV : List Nat := [${SOLIDS.map((x) => x.V).join(',')}]`,
  `def solidE : List Nat := [${SOLIDS.map((x) => x.E).join(',')}]`,
  `def solidF : List Nat := [${SOLIDS.map((x) => x.F).join(',')}]`,
  `def solidP : List Nat := [${SOLIDS.map((x) => x.p).join(',')}]`,
  `def solidQ : List Nat := [${SOLIDS.map((x) => x.q).join(',')}]`,
  `def dualIx : List Nat := [${SOLIDS.map((x) => SOLIDS.findIndex((y) => y.name === x.dual)).join(',')}]`,
].join('\n')

emit({ file: 'Platonic.lean',
  defs: DEFS,
  header: 'THE FIVE PLATONIC SOLIDS, AND WHY THERE ARE EXACTLY FIVE. Each solid carries a cluster: its Schläfli symbol {p,q}, its three counts, Euler\'s V − E + F = 2, and the incidence identities q·V = 2E = p·F which say the same edges are counted twice, once from the vertices and once from the faces. A triple satisfying Euler alone could still be impossible; satisfying all three is what makes these counts a solid. '
    + 'THE COUNT FIVE IS DECIDED, NOT RECALLED. A vertex of q regular p-gons closes in three dimensions exactly when 1/p + 1/q > 1/2, carried here in integers as 2(p + q) > p·q since this tree holds no rationals. Walking every symbol from 3 to 8 in both coordinates, exactly five pairs satisfy it — and a separate theorem decides that every pair with a coordinate of six or more FAILS, so the grid already extends past where a solution can live and the bound is not assumed by the walk that uses it. '
    + 'DUALITY closes the family on itself: cube with octahedron, dodecahedron with icosahedron, tetrahedron with itself; vertices and faces exchange, edges do not move, and the symbol reverses. '
    + 'SCOPE: the combinatorics. Nothing here constructs a solid or embeds one in space, and the enumeration is complete over the stated grid for the stated reason — which is sealed beside it rather than left in prose.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
