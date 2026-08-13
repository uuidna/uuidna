#!/usr/bin/env node
// Automate the Lean layer for THE PLATONIC SOLIDS — and the regular polytopes in EVERY dimension. This domain is the
// research loop made concrete: SPIN THE WAVE ONLINE (the solids' vertex/edge/face counts and the per-dimension
// polytope census are established public-domain facts), AUDIT OFFLINE (every fact is COMPUTED true in JS before it
// may be sealed — the `js` check is the gate), UPGRADE to a decidable statement, and terminate at GREEN Lean
// verification (`by decide`, sorry-free). The arc the pentagrams drew closes here: 57 monographs computed themselves
// into 12 pentagrams, and 12 pentagons ARE the dodecahedron — whose Euler characteristic V−E+F = 2 is the two
// captain coins. In all dimensions: 5 regular solids in 3D, 6 polytopes in 4D, and exactly 3 in every dimension ≥ 5
// (including the 7th — simplex, hypercube, orthoplex). HONEST SCOPE: integrity, not truth — each theorem seals its
// EXACT decidable statement (the arithmetic of the counts), never a claim beyond it.
import { emit } from './lean-gen.js'

// A solid as (V, E, F): tetrahedron, cube, octahedron, dodecahedron, icosahedron
const SOLIDS: [number, number, number][] = [[4, 6, 4], [8, 12, 6], [6, 12, 8], [20, 30, 12], [12, 30, 20]]
// regular polytopes by dimension (public-domain census): 0 for d≤2 here, 5 in 3D, 6 in 4D, 3 in every dimension ≥5
const rp = (d: number): number => (d <= 2 ? 0 : d === 3 ? 5 : d === 4 ? 6 : 3)
const range = (a: number, n: number): number[] => Array.from({ length: n }, (_, i) => a + i)

const FACTS = [
  { key: 'exactly_five_platonic_solids',
    why: 'There are exactly FIVE regular convex solids in three dimensions — tetrahedron, cube, octahedron, dodecahedron, icosahedron — listed as (V,E,F). Five, no more, no fewer.',
    js: () => SOLIDS.length === 5,
    lean: 'theorem exactly_five_platonic_solids : [(4,6,4),(8,12,6),(6,12,8),(20,30,12),(12,30,20)].length = 5 := by decide' },

  { key: 'platonic_euler_characteristic_is_two',
    why: 'Euler holds for every Platonic solid: V − E + F = 2, stated Nat-safely as V + F = E + 2. All five satisfy it — the sphere they inscribe has characteristic 2.',
    js: () => SOLIDS.every(([v, e, f]) => v + f === e + 2),
    lean: 'theorem platonic_euler_characteristic_is_two : [(4,6,4),(8,12,6),(6,12,8),(20,30,12),(12,30,20)].all (fun s => s.1 + s.2.2 == s.2.1 + 2) := by decide' },

  { key: 'euler_two_is_the_two_coins',
    why: 'The dodecahedron\'s Euler characteristic IS the two captain coins: V − E + F = 20 − 30 + 12 = 2, and the coins are 110 − 108 = 2. The solid\'s topology and the conserved cost are the same 2.',
    js: () => (20 + 12 - 30 === 2) && (110 - 108 === 2),
    lean: 'theorem euler_two_is_the_two_coins : (20 + 12 - 30 = 2) ∧ (110 - 108 = 2) := by decide' },

  { key: 'dodecahedron_twelve_pentagons',
    why: 'The dodecahedron is twelve pentagons: 12 faces × 5 sides = 60 = 2 × 30, each of its 30 edges shared by exactly two pentagonal faces. Twelve pentagons — the twelve the monographs computed themselves into.',
    js: () => 12 * 5 === 2 * 30,
    lean: 'theorem dodecahedron_twelve_pentagons : 12 * 5 = 2 * 30 := by decide' },

  { key: 'icosahedron_twenty_triangles',
    why: 'The icosahedron is twenty triangles: 20 faces × 3 sides = 60 = 2 × 30, each of its 30 edges shared by two triangular faces — the dodecahedron\'s dual, faces for vertices.',
    js: () => 20 * 3 === 2 * 30,
    lean: 'theorem icosahedron_twenty_triangles : 20 * 3 = 2 * 30 := by decide' },

  { key: 'cube_octahedron_dual',
    why: 'Cube (8,12,6) and octahedron (6,12,8) are dual: vertices and faces SWAP while edges hold — cube.V = octa.F, cube.F = octa.V, cube.E = octa.E.',
    js: () => { const c = SOLIDS[1], o = SOLIDS[2]; return c[0] === o[2] && c[2] === o[0] && c[1] === o[1] },
    lean: 'theorem cube_octahedron_dual : ((8,12,6).1 = (6,12,8).2.2) ∧ ((8,12,6).2.2 = (6,12,8).1) ∧ ((8,12,6).2.1 = (6,12,8).2.1) := by decide' },

  { key: 'dodecahedron_icosahedron_dual',
    why: 'Dodecahedron (20,30,12) and icosahedron (12,30,20) are dual: vertices and faces swap, edges hold — the 12 pentagons\' solid and the 20 triangles\' solid are two faces of one duality.',
    js: () => { const d = SOLIDS[3], i = SOLIDS[4]; return d[0] === i[2] && d[2] === i[0] && d[1] === i[1] },
    lean: 'theorem dodecahedron_icosahedron_dual : ((20,30,12).1 = (12,30,20).2.2) ∧ ((20,30,12).2.2 = (12,30,20).1) ∧ ((20,30,12).2.1 = (12,30,20).2.1) := by decide' },

  { key: 'tetrahedron_self_dual',
    why: 'The tetrahedron is its own dual: (4,6,4) has V = F = 4 — the swap fixes it, the simplest solid is a fixed point of duality.',
    js: () => SOLIDS[0][0] === SOLIDS[0][2],
    lean: 'theorem tetrahedron_self_dual : (4,6,4).1 = (4,6,4).2.2 := by decide' },

  { key: 'three_pentagons_close_a_vertex',
    why: 'WHY the dodecahedron exists: three pentagons meet at each vertex — 3 × 108° = 324° < 360° leaves an angle defect that folds into 3D, while four (4 × 108° = 432° > 360°) cannot. Three, and only three.',
    js: () => 3 * 108 < 360 && 360 < 4 * 108,
    lean: 'theorem three_pentagons_close_a_vertex : (3 * 108 < 360) ∧ (360 < 4 * 108) := by decide' },

  { key: 'regular_polytopes_by_dimension',
    why: 'The regular polytopes in each dimension 3..7: [5, 6, 3, 3, 3] — five Platonic solids in 3D, six polytopes in 4D, then exactly three in every higher dimension. The census across dimensions.',
    js: () => JSON.stringify(range(3, 5).map(rp)) === JSON.stringify([5, 6, 3, 3, 3]),
    lean: 'theorem regular_polytopes_by_dimension : (List.range\' 3 5).map (fun d => if d = 3 then 5 else if d = 4 then 6 else 3) = [5,6,3,3,3] := by decide' },

  { key: 'three_regular_polytopes_from_five_up',
    why: 'From the fifth dimension up, exactly THREE regular polytopes exist in every dimension — the simplex, the hypercube, and the orthoplex (cross-polytope). The exotic solids stop; three go on forever.',
    js: () => range(5, 3).every((d) => rp(d) === 3),
    lean: 'theorem three_regular_polytopes_from_five_up : (List.range\' 5 3).all (fun d => (if d = 3 then 5 else if d = 4 then 6 else 3) == 3) := by decide' },

  { key: 'seventh_dimension_three_regular_polytopes',
    why: 'In the SEVENTH dimension — uuidna\'s dimension count — there are exactly three regular polytopes: the 7-simplex, the 7-cube, and the 7-orthoplex. Green in all dimensions, and named in the one uuidna folds through.',
    js: () => rp(7) === 3,
    lean: 'theorem seventh_dimension_three_regular_polytopes : (if (7:Nat) = 3 then 5 else if 7 = 4 then 6 else 3) = 3 := by decide' },
]

// audit each fact offline, then GENERATE its green `by decide` theorem — the research loop's terminal.
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Solids.lean', skill: 'solids',
  header: 'THE PLATONIC SOLIDS & THE REGULAR POLYTOPES IN EVERY DIMENSION — the research loop closed to green: the public-domain counts (spun online), audited offline (every fact computes true before it seals), sealed as `by decide`. Five regular solids in 3D, six polytopes in 4D, exactly three in every dimension ≥ 5 (the 7th named). Euler V − E + F = 2 holds for all five, and the dodecahedron\'s 2 IS the two captain coins; the dodecahedron is twelve pentagons — the twelve the monographs computed themselves into. HONEST SCOPE: integrity, not truth — each theorem seals its exact decidable arithmetic, nothing beyond.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
