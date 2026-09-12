// lattice — THE FOUR-HEX STATIONS CALL CARGO, THEN THE SOLUTION INVOLUTION.
//
// HexSpan seals one property over 2^16 addresses. Those addresses ARE the lattice: the birthday point of an
// eight-hex handle (√(16^8) = 2^16). Named theorems, wing axioms and human problems FIT inside that count —
// they are cargo the stations CALL, not a second grid. HexSpan keys are the station identity, never cargo.
//
// FILL ORDER, as directed: stations first; the lattice calls theorems and axioms onto them; then it calls
// every human problem this ledger already names; then it calls the SOLUTION INVOLUTION. Calling is not
// solving. Denial is the map (negation_involution_solves); a solution is the denial's failure. Clay's
// σ-involution reflects seven and solves none. Verified ≠ solved.
import { theorems, axiomIndex, isPagelessFile } from './theorems/index.js'
import { handleOf, handleBirthdayPoint, HANDLE_HEXBITS } from './handle.js'
import { toUuid } from './address.js'
import { involute, involutionFixed } from './diamond.js'
import { familyOf, type AxiomFamily } from './axiom-families.js'
import { CLAY_INVOLUTION_DOI, CLAY_INVOLUTION_DOI_URL } from './clay-involution.js'
import { trialRayOf } from './theorems/index.js'
import { merkleGravity } from './gravity/index.js'

const HEX = '0123456789abcdef'

/** Station width: the first half of an eight-hex handle. Birthday of the handle space is 16^this. */
export const STATION_HEXBITS = HANDLE_HEXBITS / 2

/** 2^16 — handleBirthdayPoint(), never a typed 65536. Occupied + vacant = this. */
export const LATTICE_STATIONS = handleBirthdayPoint()

const HEX4 = /^[0-9a-f]{4}$/
const SPAN_KEY = /^enumeration_hex4_([0-9a-f]{4})$/

const SOLUTION_HONEST =
  'The lattice calls the solution involution (negation_involution_solves): denial is the map, a solution is ' +
  'the denial\'s failure. That is the METHOD. Verified ≠ solved for the named problem. Clay σ-involution ' +
  `reflects seven and solves none (DOI ${CLAY_INVOLUTION_DOI}).`

export type ProblemKind = 'clay' | 'open' | 'world'

export interface HumanProblem {
  id: string
  name: string
  kind: ProblemKind
  windowKeys: readonly string[]
  door: string
  solved: false
}

/** Every human problem this ledger already names — Clay 7, OpenProblems 5, doctrine world types 6. */
export const HUMAN_PROBLEMS: readonly HumanProblem[] = [
  { id: 'p-vs-np', name: 'P versus NP', kind: 'clay',
    windowKeys: ['two_bit_conjunctions_are_four_of_sixteen'], door: '/articles/clay', solved: false },
  { id: 'riemann', name: 'Riemann hypothesis', kind: 'clay',
    windowKeys: ['mertens_squared_under_n_on_the_first_twenty'], door: '/articles/clay', solved: false },
  { id: 'birch-swinnerton-dyer', name: 'Birch and Swinnerton-Dyer', kind: 'clay',
    windowKeys: ['hasse_bound_holds_at_four_primes'], door: '/articles/clay', solved: false },
  { id: 'poincare', name: 'Poincaré conjecture', kind: 'clay',
    windowKeys: ['four_simplex_boundary_euler_is_zero'], door: '/articles/clay', solved: false },
  { id: 'yang-mills', name: 'Yang–Mills existence and mass gap', kind: 'clay',
    windowKeys: ['levi_civita_nonzero_on_six_of_twentyseven'], door: '/articles/clay', solved: false },
  { id: 'navier-stokes', name: 'Navier–Stokes existence and smoothness', kind: 'clay',
    windowKeys: ['closed_grid_differences_sum_to_zero'], door: '/articles/clay', solved: false },
  { id: 'hodge', name: 'Hodge conjecture', kind: 'clay',
    windowKeys: ['torus_betti_alternates_to_zero'], door: '/articles/clay', solved: false },
  { id: 'k-server', name: 'k-server conjecture', kind: 'open',
    windowKeys: [], door: '/open-questions', solved: false },
  { id: 'polynomial-hirsch', name: 'Polynomial Hirsch conjecture', kind: 'open',
    windowKeys: [], door: '/open-questions', solved: false },
  { id: 'smale-ninth', name: 'Smale\'s ninth problem', kind: 'open',
    windowKeys: [], door: '/open-questions', solved: false },
  { id: 'conway-99-graph', name: 'Conway\'s 99-graph', kind: 'open',
    windowKeys: [
      'conway_ninetynine_counting_identity_holds',
      'conway_ninetynine_eigenvalues_are_integers',
      'conway_ninetynine_multiplicities_are_integers_and_close',
      'no_arithmetic_obstruction_is_not_existence',
    ], door: '/open-questions', solved: false },
  { id: 'mub-dimension-six', name: 'Mutually unbiased bases in dimension six', kind: 'open',
    windowKeys: ['six_is_not_a_prime_power'], door: '/open-questions', solved: false },
  { id: 'climate-policy', name: 'Climate policy', kind: 'world',
    windowKeys: ['window_not_universal', 'bounded_silence_is_not_evidence'], door: '/doctrine', solved: false },
  { id: 'pandemics', name: 'Pandemics', kind: 'world',
    windowKeys: ['biology_pairs_and_codons', 'window_not_universal'], door: '/doctrine', solved: false },
  { id: 'poverty-conflict', name: 'Poverty or conflict', kind: 'world',
    windowKeys: ['two_coins', 'honesty_gate_passes_iff_all_sealed', 'exactly_one_flag'], door: '/doctrine', solved: false },
  { id: 'open-mathematical-problems', name: 'Open mathematical problems', kind: 'world',
    windowKeys: ['window_not_universal', 'reflection_confuses_seven_three'], door: '/doctrine', solved: false },
  { id: 'scientific-discovery', name: 'Scientific discovery', kind: 'world',
    windowKeys: ['provenance_integrity_not_content_truth'], door: '/doctrine', solved: false },
  { id: 'justice-governance', name: 'Justice and governance', kind: 'world',
    windowKeys: ['provenance_integrity_not_content_truth', 'drift_is_named_or_caught'], door: '/doctrine', solved: false },
]

export interface NamedCall {
  key: string
  name: string
  family: AxiomFamily
  file: string
  route: string
}

export interface AxiomCall {
  file: string
  def: string
  unused: boolean
}

export interface ProblemCall {
  id: string
  name: string
  kind: ProblemKind
  door: string
  station: string
  solved: false
}

export interface SolutionCall {
  of: string
  pair: string
  pairStation: string
  stationMirror: string
  method: 'negation_involution_solves'
  map: 'divZero'
  windowKeys: readonly string[]
  solved: false
  honest: string
}

export interface LatticeCall {
  station: string
  key: string
  route: string
  theorems: NamedCall[]
  axioms: AxiomCall[]
  problems: ProblemCall[]
  solutions: SolutionCall[]
  honest: string
}

export interface LatticeInvolution {
  method: 'negation_involution_solves'
  map: 'divZero'
  selfInverse: boolean
  pairs: { a: string; b: string }[]
  fixed: string[]
  clay: { reflects: number; solves: number; centre: string | null; doi: string; doiUrl: string }
  solved: false
  honest: string
}

export interface LatticeFill {
  stations: number
  occupied: number
  vacant: number
  theoremsSeated: number
  axiomsSeated: number
  problemsSeated: number
  collisions: { station: string; keys: string[] }[]
  problems: ProblemCall[]
  involution: LatticeInvolution
  honest: string
}

const CALL_HONEST =
  'This station is a HexSpan identity. Named theorems, wing axioms and human problems are cargo it CALLS. ' +
  SOLUTION_HONEST

const FILL_HONEST =
  'The lattice is 2^16 HexSpan stations. Named cargo seats inside that count. Occupied + vacant = stations. ' +
  SOLUTION_HONEST

export function hex4Of(n: number): string {
  if (n < 0 || n >= LATTICE_STATIONS) throw new Error(`hex4Of: ${n} is not a station index`)
  let s = ''
  let x = n
  for (let i = 0; i < STATION_HEXBITS; i++) {
    s = HEX[x % 16] + s
    x = (x - (x % 16)) / 16
  }
  return s
}

export function stationIndex(hex4: string): number {
  const h = parseStation(hex4)
  let n = 0
  for (let i = 0; i < h.length; i++) {
    const c = h.charCodeAt(i)
    n = n * 16 + (c >= 97 ? c - 87 : c - 48)
  }
  return n
}

/** Accept four hex, or the HexSpan key `enumeration_hex4_<hex>`. Refuses rather than coerces. */
export function parseStation(s: string): string {
  const t = String(s).toLowerCase()
  if (HEX4.test(t)) return t
  const m = SPAN_KEY.exec(t)
  if (m) return m[1]!
  throw new Error(`lattice: "${s}" is not a four-hex station`)
}

/** First four hex of a content-address handle — where named cargo seats. */
export function stationOfAddress(address: string): string {
  return handleOf(address).slice(0, STATION_HEXBITS)
}

export function stationOfProblem(id: string): string {
  return stationOfAddress(toUuid('problem:' + id))
}

/** i ↔ (n−1−i) on the station grid. Self-inverse, and fixed-point-free because 2^16 is even. */
export function involuteStation(hex4: string): string {
  return hex4Of(LATTICE_STATIONS - 1 - stationIndex(hex4))
}

type Index = {
  theoremsByStation: Map<string, NamedCall[]>
  axiomsByStation: Map<string, AxiomCall[]>
  problemsByStation: Map<string, HumanProblem[]>
  problemsByWindow: Map<string, HumanProblem[]>
}

let _index: Index | null = null

function pushMap<T>(m: Map<string, T[]>, k: string, v: T): void {
  const list = m.get(k)
  if (list) list.push(v)
  else m.set(k, [v])
}

function index(): Index {
  if (_index) return _index
  const theoremsByStation = new Map<string, NamedCall[]>()
  const axiomsByStation = new Map<string, AxiomCall[]>()
  const problemsByStation = new Map<string, HumanProblem[]>()
  const problemsByWindow = new Map<string, HumanProblem[]>()
  for (const t of theorems()) {
    if (isPagelessFile(t.file)) continue
    pushMap(theoremsByStation, stationOfAddress(t.address), {
      key: t.key, name: t.name, family: familyOf(t.statement), file: t.file, route: `/theorem/${t.key}`,
    })
  }
  for (const [, list] of theoremsByStation) list.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  for (const e of axiomIndex().entries) {
    if (isPagelessFile(e.file)) continue
    pushMap(axiomsByStation, stationOfAddress(toUuid(`axiom:${e.file}:${e.def}`)), {
      file: e.file, def: e.def, unused: e.unused,
    })
  }
  for (const [, list] of axiomsByStation) list.sort((a, b) => a.file.localeCompare(b.file) || a.def.localeCompare(b.def))
  for (const p of HUMAN_PROBLEMS) {
    pushMap(problemsByStation, stationOfProblem(p.id), p)
    for (const k of p.windowKeys) pushMap(problemsByWindow, k, p)
  }
  _index = { theoremsByStation, axiomsByStation, problemsByStation, problemsByWindow }
  return _index
}

function problemCall(p: HumanProblem): ProblemCall {
  return { id: p.id, name: p.name, kind: p.kind, door: p.door, station: stationOfProblem(p.id), solved: false }
}

function pairOf(p: HumanProblem): HumanProblem {
  const n = HUMAN_PROBLEMS.length
  const i = HUMAN_PROBLEMS.findIndex((q) => q.id === p.id)
  return HUMAN_PROBLEMS[n - 1 - i]!
}

/** Call the solution involution on one seated problem — the method, never a settlement. */
export function callSolutionInvolution(p: HumanProblem): SolutionCall {
  const pair = pairOf(p)
  return {
    of: p.id,
    pair: pair.id,
    pairStation: stationOfProblem(pair.id),
    stationMirror: involuteStation(stationOfProblem(p.id)),
    method: 'negation_involution_solves',
    map: 'divZero',
    windowKeys: p.windowKeys,
    solved: false,
    honest: SOLUTION_HONEST,
  }
}

function problemsAt(st: string, named: NamedCall[]): HumanProblem[] {
  const ix = index()
  const seen = new Set<string>()
  const out: HumanProblem[] = []
  const add = (p: HumanProblem): void => {
    if (seen.has(p.id)) return
    seen.add(p.id)
    out.push(p)
  }
  for (const p of ix.problemsByStation.get(st) ?? []) add(p)
  for (const t of named) for (const p of ix.problemsByWindow.get(t.key) ?? []) add(p)
  out.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  return out
}

/** latticeCall(station) → identity, named cargo, axioms, human problems, then the solution involution. */
export function latticeCall(station: string): LatticeCall {
  const st = parseStation(station)
  const ix = index()
  const named = ix.theoremsByStation.get(st) ?? []
  const axioms = ix.axiomsByStation.get(st) ?? []
  const problems = problemsAt(st, named)
  return {
    station: st,
    key: `enumeration_hex4_${st}`,
    route: `/theorem/enumeration_hex4_${st}`,
    theorems: named,
    axioms,
    problems: problems.map(problemCall),
    solutions: problems.map(callSolutionInvolution),
    honest: CALL_HONEST,
  }
}

function clayInvolution(): LatticeInvolution['clay'] {
  const clay = HUMAN_PROBLEMS.filter((p) => p.kind === 'clay')
  const centre = involutionFixed(clay)
  return {
    reflects: clay.length,
    solves: 0,
    centre: centre[0]?.id ?? null,
    doi: CLAY_INVOLUTION_DOI,
    doiUrl: CLAY_INVOLUTION_DOI_URL,
  }
}

function solutionInvolution(): LatticeInvolution {
  const n = HUMAN_PROBLEMS.length
  const pairs = involute(HUMAN_PROBLEMS)
    .filter((_, i) => i < n - 1 - i)
    .map(([a, b]) => ({ a: a.id, b: b.id }))
  const selfInverse = HUMAN_PROBLEMS.every((p) => pairOf(pairOf(p)).id === p.id)
  return {
    method: 'negation_involution_solves',
    map: 'divZero',
    selfInverse,
    pairs,
    fixed: involutionFixed(HUMAN_PROBLEMS).map((p) => p.id),
    clay: clayInvolution(),
    solved: false,
    honest: SOLUTION_HONEST,
  }
}

let _fill: LatticeFill | null = null

/** fillLattice() → occupancy of the 2^16 stations after theorems, axioms, problems, then the involution. */
export function fillLattice(): LatticeFill {
  if (_fill) return _fill
  const ix = index()
  const occupied = new Set<string>()
  const collisions: { station: string; keys: string[] }[] = []
  let theoremsSeated = 0
  for (const [st, list] of ix.theoremsByStation) {
    occupied.add(st)
    theoremsSeated += list.length
    if (list.length > 1) collisions.push({ station: st, keys: list.map((t) => t.key) })
  }
  let axiomsSeated = 0
  for (const [st, list] of ix.axiomsByStation) {
    occupied.add(st)
    axiomsSeated += list.length
  }
  const problems = HUMAN_PROBLEMS.map(problemCall)
  for (const p of problems) occupied.add(p.station)
  collisions.sort((a, b) => (a.station < b.station ? -1 : a.station > b.station ? 1 : 0))
  _fill = {
    stations: LATTICE_STATIONS,
    occupied: occupied.size,
    vacant: LATTICE_STATIONS - occupied.size,
    theoremsSeated,
    axiomsSeated,
    problemsSeated: problems.length,
    collisions,
    problems,
    involution: solutionInvolution(),
    honest: FILL_HONEST,
  }
  return _fill
}

// ── WINGS CALLED ONTO THE GRID, FOLDED ONCE ────────────────────────────────────────────────────────────────────
// A comparison across wings is worth what its receipt is worth. Naming wings in prose pays the claim; calling their
// sealed theorems onto their own stations and folding the result pays the receipt, and anyone recomputes it. The
// placement is DERIVED — a theorem's station is the first half of its own handle — so nothing here is chosen.
// A collision is REPORTED, never smoothed: two cargo on one station is a reading about the grid, not a defect to hide.
export interface WingCall {
  wings: readonly string[]
  cargo: number
  stations: number
  collisions: { station: string; keys: string[] }[]
  rays: { ray: number; cargo: number }[]
  fold: string
  stationFold: string
}

/** stationCollisionsOf(rows) → the stations carrying more than one piece of cargo, named. Pure; its own control. */
export function stationCollisionsOf(rows: readonly { key: string; station: string }[]): { station: string; keys: string[] }[] {
  const by = new Map<string, string[]>()
  for (const r of rows) by.set(r.station, [...(by.get(r.station) ?? []), r.key])
  return [...by].filter(([, keys]) => keys.length > 1).map(([station, keys]) => ({ station, keys: [...keys].sort() }))
    .sort((a, b) => (a.station < b.station ? -1 : 1))
}

/** callWingsOntoStations(files) → those wings' sealed theorems on their own stations, with one recomputable fold. */
export function callWingsOntoStations(files: readonly string[]): WingCall {
  const wings = [...files].sort()
  const cargo = theorems().filter((t) => wings.includes(t.file))
  const rows = cargo.map((t) => ({ key: t.key, station: stationOfAddress(t.address), ray: trialRayOf(t.address) }))
  const rays = [...new Map(rows.map((r) => [r.ray, rows.filter((x) => x.ray === r.ray).length])).entries()]
    .map(([ray, n]) => ({ ray, cargo: n })).sort((a, b) => a.ray - b.ray)
  return {
    wings,
    cargo: cargo.length,
    stations: new Set(rows.map((r) => r.station)).size,
    collisions: stationCollisionsOf(rows),
    rays,
    fold: merkleGravity(cargo.map((t) => t.address)),
    stationFold: merkleGravity(rows.map((r) => r.station)),
  }
}
