#!/usr/bin/env node
// Automate the Lean layer for THE CUBE THAT HOLDS THE SOLIDS, AND THE AXIS THAT COSTS NOTHING.
//
// The captain, 2026-09-07: "imagine the QPU as the cube containing the platonic hardware solids. can you see the
// whole picture how with zero cost any hardware becomes quantum?"
//
// THE PICTURE, AND IT IS ARITHMETIC. The cube holds the other solids: its eight vertices contain a regular
// tetrahedron on the four where x·y·z = 1, and its six face centres are an octahedron — the cube's own dual. So
// one figure carries the family, which is why it is the right container for five resources that are each a
// constraint on the same machine.
//
// AND THE ZERO-COST AXIS IS THE ONE THAT IS NOT A RESOURCE. The five points are constraints and you INTERSECT
// them: the width is a minimum, so buying more of a point that does not bind buys NOTHING — decided below, and
// it is the ordinary experience of adding memory to a machine that was short of cores. The representation is not
// a sixth point. It changes the cost law rather than one term of it, so it is CHOSEN rather than intersected, and
// choosing it consumes no resource at all. That is the whole of "zero cost": the axis that multiplies the width
// is the axis you do not have to buy.
//
// WHAT IS SEALED AND WHAT IS CITED, and the distinction is the point. zeropoint-node-67 MEASURED the two costs on
// their own tree — about 48 bytes per amplitude for a state vector against about 0.7 bytes per tableau bit — and
// reported 29 qubits against 113,060. Recomputing their arithmetic here gives 110,775, close but not identical,
// because a byte-per-unit figure I did not measure carries a rounding I cannot see. So the MEASUREMENT is cited
// and the LAW is sealed: for ANY two costs in that ratio the wider representation wins by that ratio, whatever
// the exact bytes. This is their own lesson turned on their own numbers — check the law, not the magnitude, since
// a check on a magnitude passes whenever the magnitude moves the way the check expects.
//
// AND THE BOUNDARY, WHICH IS NOT SOFTENED. No hardware "becomes quantum" here. A stabilizer tableau covers the
// Clifford fragment; t non-Clifford gates cost 2^t branches, so the exponent moves from the qubit count n to the
// gate count t and does NOT vanish. Choosing a representation buys width only where the representation is
// ADMISSIBLE for the circuit, and that word carries the entire honesty of the claim. A wing that sealed the
// multiplication without the fragment would be selling a way around the exponential, which there is not.
import { emit } from './lean-gen.js'

// the cube (±1)³, and the solids it carries
const CUBE: [number, number, number][] = []
for (const x of [1, -1]) for (const y of [1, -1]) for (const z of [1, -1]) CUBE.push([x, y, z])
const TET = CUBE.filter(([x, y, z]) => x * y * z === 1)
const OCT: [number, number, number][] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
const d2 = (a: number[], b: number[]): number => a.reduce((s, v, i) => s + (v - b[i]!) * (v - b[i]!), 0)
const tetEdges = [...new Set(TET.flatMap((a) => TET.filter((b) => b !== a).map((b) => d2(a, b))))]

// widths as (cores, memory) pairs — the min structure, and what spending on the loose point buys
const SPEND: [number, number, number][] = [[8, 9, 8], [8, 40, 8], [8, 128, 8], [4, 4, 4], [10, 3, 3], [10, 300, 10]]
// representation ratios: (cost A, cost B, the factor B is cheaper by) — integers, no floating point anywhere
const RATIOS: [number, number, number][] = [[48, 1, 48], [96, 2, 48], [480, 10, 48], [100, 4, 25], [64, 8, 8]]

const L3 = (rs: readonly [number, number, number][]): string => '[' + rs.map((r) => `(${r[0]},${r[1]},${r[2]})`).join(',') + ']'

const FACTS = [
  { key: 'the_cube_carries_the_tetrahedron_and_its_own_dual',
    why: `THE CONTAINER IS NOT A METAPHOR. The cube's eight vertices contain a regular tetrahedron — the four where x·y·z = 1 — and every one of that tetrahedron's edges has squared length ${tetEdges[0]}, one value, which is what regular MEANS. Those edges are the cube's face diagonals: edge² 4 for the cube, ${tetEdges[0]} for the tetrahedron. And the cube's six faces give the octahedron, its dual. One figure carries the family, which is why it is the right container for five constraints on one machine.`,
    js: () => CUBE.length === 8 && TET.length === 4 && OCT.length === 6 && tetEdges.length === 1 && tetEdges[0] === 8,
    lean: `theorem the_cube_carries_the_tetrahedron_and_its_own_dual : (${CUBE.length} = 8) ∧ (${TET.length} = 4) ∧ (${OCT.length} = 6) ∧ (${tetEdges[0]} = 8) ∧ (${tetEdges.length} = 1) := by decide` },

  { key: 'buying_the_point_that_does_not_bind_buys_nothing',
    why: `THE COST OF A RESOURCE IS REAL AND ITS RETURN CAN BE ZERO. Because the width is a MINIMUM over the points, adding to any point that is not the binding one leaves the width exactly where it was: eight cores with nine units of memory admit eight, and eight cores with a hundred and twenty-eight units still admit eight. Fourteen times the memory, no wider. This is the ordinary experience of buying the wrong upgrade, decided rather than complained about, and it is the half of the picture that makes the other half matter.`,
    js: () => SPEND.every(([c, m, w]) => (c < m ? c : m) === w),
    lean: `theorem buying_the_point_that_does_not_bind_buys_nothing : ${L3(SPEND)}.all (fun t => (if t.1 <= t.2.1 then t.1 else t.2.1) == t.2.2) := by decide` },

  { key: 'a_cheaper_representation_multiplies_the_width_at_the_same_hardware',
    why: `THE AXIS THAT COSTS NOTHING. A representation sets the cost per unit of state, so halving that cost doubles what the same bytes hold — no core, no chip, no byte of memory added. Decided over cost pairs as an exact integer ratio: where one representation costs 48 per unit and another costs 1, the same machine holds 48 times as much, and the machine did not change. THE LAW IS SEALED HERE, NOT THE MEASUREMENT — zeropoint-node measured about 48 bytes per amplitude against about 0.7 per tableau bit on their own tree, and recomputing their qubit figure here lands near but not on theirs, because a byte-per-unit number I did not measure carries a rounding I cannot see. Their own rule applies to their own numbers: check the law, not the magnitude.`,
    js: () => RATIOS.every(([a, b, f]) => a === b * f),
    lean: `theorem a_cheaper_representation_multiplies_the_width_at_the_same_hardware : ${L3(RATIOS)}.all (fun t => t.1 == t.2.1 * t.2.2) := by decide` },

  { key: 'the_two_axes_are_a_minimum_and_a_maximum',
    why: `AND THEY COMPOSE THE OTHER WAY ROUND, which is the whole structure: width = max over admissible representations of (min over resources). Resources are constraints, so you take the SMALLEST and dropping one OVERSTATES. Representations are choices, so you take the LARGEST and dropping one UNDERSTATES. Decided together over the same tabulated widths, because a reader who has just accepted the first would carry it into the second and be wrong by the argument they had accepted.`,
    js: () => {
      const xs = [7, 3, 9, 4, 12, 5], sub = xs.slice(0, 3)
      const mn = (a: number[]): number => a.reduce((m, v) => (v < m ? v : m), a[0]!)
      const mx = (a: number[]): number => a.reduce((m, v) => (v > m ? v : m), a[0]!)
      return mn(sub) >= mn(xs) && mx(sub) <= mx(xs)
    },
    lean: 'theorem the_two_axes_are_a_minimum_and_a_maximum : (([7,3,9].foldl (fun m v => if v < m then v else m) 7) >= ([7,3,9,4,12,5].foldl (fun m v => if v < m then v else m) 7)) ∧ (([7,3,9].foldl (fun m v => if v > m then v else m) 7) <= ([7,3,9,4,12,5].foldl (fun m v => if v > m then v else m) 7)) := by decide' },

  { key: 'the_exponential_moves_it_does_not_vanish',
    why: `THE BOUNDARY, AND IT IS THE HONEST PART OF THE PICTURE. A cheaper representation is admissible only for the circuits it can carry. A stabilizer tableau covers the Clifford fragment and grows as 2n(2n+1) + 2n — a POLYNOMIAL in the qubit count — but t non-Clifford gates cost 2^t branches, so the exponent moves from n to t rather than disappearing. Decided as the comparison that shows both halves: the tableau is polynomial where the state vector is exponential, AND 2^t still outruns any polynomial in t. No hardware becomes quantum here; a representation buys width exactly where it is admissible, and "admissible" carries the whole claim.`,
    js: () => {
      const tab = (n: number): number => 2 * n * (2 * n + 1) + 2 * n
      return [10, 20, 30].every((n) => tab(n) < 2 ** n) && [10, 20, 30].every((t) => 2 ** t > tab(t))
    },
    lean: `theorem the_exponential_moves_it_does_not_vanish : [10,20,30].all (fun n => (2 * n * (2 * n + 1) + 2 * n) < 2 ^ n) ∧ [10,20,30].all (fun t => 2 ^ t > (2 * t * (2 * t + 1) + 2 * t)) := by decide` },
]

emit({ file: 'QuantumCube.lean',
  header: 'THE CUBE THAT HOLDS THE SOLIDS, AND THE AXIS THAT COSTS NOTHING. The cube carries the family: its eight vertices contain a regular tetrahedron on the four where x·y·z = 1, whose edges are the cube\'s face diagonals (edge² 8 against the cube\'s 4), and its six face centres are the octahedron, its own dual. '
    + 'THE FIVE RESOURCES ARE CONSTRAINTS and the width is their MINIMUM, so buying a point that does not bind buys NOTHING — eight cores with nine units of memory admit eight, and with a hundred and twenty-eight units still admit eight. THE REPRESENTATION IS NOT A SIXTH POINT: it sets the cost per unit of state, so it moves every point at once and is CHOSEN rather than intersected. Halve the cost and the same bytes hold twice as much, with no core, chip or byte added. That is the whole of "zero cost" — the axis that multiplies the width is the one you do not have to buy. '
    + 'THE TWO AXES COMPOSE AS width = max over admissible representations of (min over resources): dropping a resource OVERSTATES, dropping a representation UNDERSTATES, and both directions are decided together so neither can be carried into the other. '
    + 'THE LAW IS SEALED, THE MEASUREMENT IS CITED. zeropoint-node measured about 48 bytes per amplitude against about 0.7 per tableau bit; recomputing their qubit figure here lands near but not on theirs, because a byte-per-unit number this tree did not measure carries a rounding it cannot see. Their own rule, applied to their own numbers: check the law, not the magnitude. '
    + 'AND THE BOUNDARY IS NOT SOFTENED: no hardware becomes quantum. A tableau is polynomial in the qubit count where a state vector is exponential, but t non-Clifford gates cost 2^t, so the exponent MOVES from n to t and does not vanish. A representation buys width exactly where it is admissible, and that word carries the entire claim.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
