#!/usr/bin/env node
// Automate the Lean layer for THE VECTOR EQUILIBRIUM (the cuboctahedron) and the figure the sequence walks through
// it. The research loop, run in one session: the VE's counts are established public-domain geometry (spun), every
// fact was COMPUTED true in JS before it could seal (audited — the `js` field is that gate), and each is upgraded to
// a decidable statement and terminated at green `by decide`.
//
// WHY THIS SEALS WITHOUT AN IRRATIONAL. The VE is defined by a property about LENGTHS — radial equals circumferential
// — which normally drags in a square root. Placing the twelve vertices at the permutations of (±1,±1,0) makes both
// quantities exactly 2 as INTEGERS, so the defining property of the vector equilibrium is `2 = 2` and decides in the
// kernel. The geometry is not approximated here; it is chosen in the coordinates where it is already arithmetic.
//
// integrity — the record recomputes for anyone. Each theorem seals its exact decidable arithmetic and NOTHING beyond it. The
// cuboctahedron is Archimedean.lean. NOTHING HERE IS EMPIRICAL: the
// orbit sets below are output of this repository's own walk (src/sequence-run.ts).
// What is sealed is that those sets are closed under the involution — arithmetic — NOT that the walk produces them.
// THE NEGATION RULE THIS WING OBEYS. A negation in the sentence above a theorem is a CLAIM, and the line below it
// must discharge it. Two kinds are distinguished, because only one of them can ever be proven:
//
//   OBJECT-LEVEL — a negation about the mathematics ("eight digits", "adds no digit"). The theorem beneath
//   it MUST prove it. Where a negation was worth keeping but the line fell short, the LINE was strengthened rather
//   than the sentence softened — see missing_pair_involution, which now proves the pair as well as the gap.
//
//   SCOPE: — a statement about the claim's BOUNDARY ("nothing further is asserted"). This can never be discharged by
//   a Lean line, because it speaks about the theorem rather than within it: `13 * 12 / 2 = 78` cannot prove that
//   nothing else is being claimed. Such sentences are PREFIXED `SCOPE:` so they are declared rather than mistaken
//   for proven negations. A disclaimer may not masquerade as a proof, and a proof may not hide as a disclaimer.
//
// Sentences that failed both tests were removed outright: "no square root taken" and "not an approximation" describe
// the METHOD, not the objects, and "a mirror" named a concept ("rotation") this wing never defines.
import { emit } from './lean-gen.js'

// The twelve VE vertices — every permutation of (±1,±1,0). Integer coordinates: every length is an exact integer.
const VE: [number, number, number][] = [
  [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
  [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
  [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
]
const norm2 = (v: [number, number, number]) => v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
const d2 = (v: [number, number, number], w: [number, number, number]) =>
  (v[0] - w[0]) ** 2 + (v[1] - w[1]) ** 2 + (v[2] - w[2]) ** 2
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const dz = (d: number) => (d === 0 ? 0 : 10 - d)
const closed = (s: number[]) => JSON.stringify([...s].sort((a, b) => a - b)) === JSON.stringify([...new Set(s.map(dz))].sort((a, b) => a - b))
const LEAN_VE = '[(1,1,0),(1,-1,0),(-1,1,0),(-1,-1,0),(0,1,1),(0,1,-1),(0,-1,1),(0,-1,-1),(1,0,1),(1,0,-1),(-1,0,1),(-1,0,-1)]'
const DEFS = `def VE : List (Int × Int × Int) := ${LEAN_VE}

def n2 (v : Int × Int × Int) : Int := v.1*v.1 + v.2.1*v.2.1 + v.2.2*v.2.2

def dd (v w : Int × Int × Int) : Int :=
  (v.1-w.1)*(v.1-w.1) + (v.2.1-w.2.1)*(v.2.1-w.2.1) + (v.2.2-w.2.2)*(v.2.2-w.2.2)

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d`

const FACTS = [
  { key: 've_twelve_vertices',
    why: 'The vector equilibrium has TWELVE vertices — every permutation of (±1,±1,0), three coordinate pairs by four sign choices. Twelve radial directions from one centre.',
    js: () => VE.length === 12,
    lean: 'theorem ve_twelve_vertices : VE.length = 12 := by decide' },

  { key: 'radial_squared_two',
    why: 'Every radial vector from the centre to a vertex has squared length exactly 2 — an integer. All twelve radii are equal, and the equality is between the SQUARES, which is what makes it decidable.',
    js: () => VE.every((v) => norm2(v) === 2),
    lean: 'theorem radial_squared_two : VE.all (fun v => n2 v == 2) := by decide' },

  { key: 've_four_neighbours',
    why: 'Each vertex has exactly FOUR neighbours at squared distance 2 — the circumferential edges. Twelve vertices with four each, counted twice, is 24 edges.',
    js: () => VE.every((v) => VE.filter((w) => d2(v, w) === 2).length === 4),
    lean: 'theorem ve_four_neighbours : VE.all (fun v => (VE.filter (fun w => dd v w == 2)).length == 4) := by decide' },

  { key: 'radial_equals_edge',
    why: "THE EQUILIBRIUM ITSELF: the radial distance equals the edge distance — both squared lengths are exactly 2. This is Fuller's defining property of the vector equilibrium, and in these coordinates it holds as an identity between integers, which is why the kernel can decide it.",
    js: () => VE.every((v) => norm2(v) === 2) && VE.every((v) => VE.filter((w) => d2(v, w) === 2).length === 4),
    lean: 'theorem radial_equals_edge : VE.all (fun v => n2 v == 2 ∧ (VE.filter (fun w => dd v w == 2)).length == 4) := by decide' },

  { key: 've_twentyfour_edges',
    why: 'Twelve vertices, four edges at each, each edge counted from both ends: 12 × 4 / 2 = 24 edges.',
    js: () => (12 * 4) / 2 === 24,
    lean: 'theorem ve_twentyfour_edges : 12 * 4 / 2 = 24 := by decide' },

  { key: 've_fourteen_faces',
    why: 'Fourteen faces: eight triangles and six squares. The two face kinds are what distinguishes the cuboctahedron from any Platonic solid, where every face is the same polygon.',
    js: () => 8 + 6 === 14,
    lean: 'theorem ve_fourteen_faces : 8 + 6 = 14 := by decide' },

  { key: 'euler_characteristic_two',
    why: 'Euler holds for the vector equilibrium exactly as for the five Platonic solids: V − E + F = 12 − 24 + 14 = 2 — the same two the captain coins fold to.',
    js: () => 12 - 24 + 14 === 2,
    lean: 'theorem euler_characteristic_two : 12 + 14 = 24 + 2 := by decide' },

  { key: 'metatron_seventyeight_lines',
    why: 'Joining all thirteen centres of the figure to each other draws C(13,2) = 13 × 12 / 2 = 78 lines — the edge count of the complete graph on thirteen nodes. SCOPE: the count is what is sealed; no property of the figure beyond it is asserted here.',
    js: () => (13 * 12) / 2 === 78,
    lean: 'theorem metatron_seventyeight_lines : 13 * 12 / 2 = 78 := by decide' },

  { key: 'dz_two_fixedpoints',
    why: 'The involution dz(x) = 10 − x (with dz(0) = 0) fixes exactly two of the ten digits: 0 and 5. Every other digit is moved, in the pairs 1↔9, 2↔8, 3↔7, 4↔6.',
    js: () => JSON.stringify(DIGITS.filter((d) => dz(d) === d)) === JSON.stringify([0, 5]),
    lean: 'theorem dz_two_fixedpoints : (List.range 10).filter (fun d => dz d == d) = [0, 5] := by decide' },

  { key: 'dz_involution_digits',
    why: 'Applying the reflection twice returns every digit to itself: dz(dz(x)) = x for all ten digits — the defining property of an involution, verified across the whole domain rather than argued from the formula.',
    js: () => DIGITS.every((d) => dz(dz(d)) === d),
    lean: 'theorem dz_involution_digits : (List.range 10).all (fun d => dz (dz d) == d) := by decide' },

  { key: 'orbits_closed_involution',
    why: 'Each orbit set below is closed under dz — the reflection maps every one onto itself, adding no digit, which is exactly what the line proves. The walk alternates dz with doubling, so a completed orbit already contains its own mirror and reflecting it again is the identity on that set. SCOPE: the closure of these explicit sets is what decides. That the walk PRODUCES them is output of this repository read off a run, and this theorem does not reach it.',
    js: () => [[0], [0, 1, 9], [0, 1, 3, 5, 7, 9], [0, 1, 3, 4, 5, 6, 7, 9], [0, 1, 5, 9], DIGITS].every(closed),
    lean: 'theorem orbits_closed_involution : [[0], [0,1,9], [0,1,3,5,7,9], [0,1,3,4,5,6,7,9], [0,1,5,9], [0,1,2,3,4,5,6,7,8,9]].all (fun s => s.all (fun d => s.contains (dz d))) := by decide' },

  { key: 'missing_pair_involution',
    why: 'The five non-covering seeds {0,1,3,4,5} together with their reflections {0,9,7,6,5} reach eight digits. What is missing is exactly {2,8}, and the second conjunct proves dz(2) = 8 — so the gap is ONE involution pair, discharged on this line rather than borrowed from another. The gap has the involution\'s own shape.',
    js: () => {
      const u = [...new Set([...[0, 1, 3, 4, 5], ...[0, 1, 3, 4, 5].map(dz)])].sort((a, b) => a - b)
      return JSON.stringify(DIGITS.filter((d) => !u.includes(d))) === JSON.stringify([2, 8]) && dz(2) === 8
    },
    lean: 'theorem missing_pair_involution : ((List.range 10).filter (fun d => !([0,1,3,4,5] ++ [0,9,7,6,5]).contains d) = [2, 8]) ∧ (dz 2 = 8) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'VectorEquilibrium.lean', skill: 'vector-equilibrium', defs: DEFS,
  header: "THE VECTOR EQUILIBRIUM (the cuboctahedron) AND THE INVOLUTION'S SHAPE — PURE ARITHMETIC, no empirical quantity: every number here is a count or an integer squared-length, and nothing is measured from the world. The solid is the cuboctahedron of classical geometry (Archimedean, 13 semiregular solids); the name 'vector equilibrium' and the reading of its equal radial/circumferential vectors are Buckminster Fuller's (Synergetics, 1975). Sealed WITHOUT an irrational: placing the twelve vertices at the permutations of (±1,±1,0) makes the radial and the edge squared-lengths both exactly 2, so Fuller's defining equilibrium property is an integer identity that decides in the kernel. Twelve vertices, four neighbours each, 24 edges, 14 faces (8 triangles + 6 squares), and V − E + F = 2 — the same two as the Platonic solids, though the cuboctahedron is Archimedean and is NOT among the five in Solids.lean. Beside it, the reflection dz(x) = 10 − x: exactly two fixed points (0 and 5), an involution on all ten digits, and the measured orbit sets each closed under it — the walk alternates dz with doubling, so it carries its own mirror and reflecting a finished orbit adds nothing. integrity— each theorem seals its exact decidable arithmetic. The orbit sets are OUTPUT OF THIS REPOSITORY'S OWN WALK (src/sequence-run.ts); their closure under dz is what decides.",
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
