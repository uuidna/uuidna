// affect-trinity — the feeling–thought–emotion lens as a finite group action, computed by enumeration. The corners
// are indices into CORNERS and the valences indices into VALENCES; every count, order and angle below is read off the
// maps by walking their carriers, never typed, so lean/AffectTrinity.lean, the design matrix and the tests all read
// one source. Every checker takes the map it judges as an argument: a broken turn or a flip that moves the corner is
// refused by the same function that passes the real one, which is what lets a test hold a failing control.
//
// Scope, which no theorem here closes: the algebra is exact for this model. Whether experience divides into three
// corners, and whether a mixed state (bittersweet) breaks the loop, is an open empirical question.

export const CORNERS = ['feeling', 'thought', 'emotion'] as const
export const VALENCES = ['pleasant', 'unpleasant'] as const

/** a state of the lens: one corner carrying one valence, both as indices */
export interface Affect { corner: number; valence: number }
export type Map1 = (x: number) => number
export type MapA = (a: Affect) => Affect

const C = CORNERS.length
const V = VALENCES.length
const range = (n: number): number[] => [...Array(n).keys()]

/** ρ — the turn: feeling → thought → emotion → feeling */
export const turn: Map1 = (c) => (c + 1) % C
/** ρ⁻¹ — the loop run backward */
export const back: Map1 = (c) => (c + C - 1) % C
/** σ — the valence flip, pleasant ↔ unpleasant */
export const flip: Map1 = (v) => (v + 1) % V

export const cornerSet = (): number[] => range(C)
export const valenceSet = (): number[] => range(V)
/** the six states: every corner with every valence */
export const states = (): Affect[] => range(C).flatMap((corner) => range(V).map((valence) => ({ corner, valence })))

/** a corner map lifted to the states (valence untouched), and a valence map lifted (corner untouched) */
export const onCorner = (f: Map1): MapA => (a) => ({ corner: f(a.corner), valence: a.valence })
export const onValence = (f: Map1): MapA => (a) => ({ corner: a.corner, valence: f(a.valence) })

const key = (a: Affect): string => a.corner + ':' + a.valence
const tableOf = (f: MapA): string => states().map((a) => key(f(a))).join(' ')

/** f applied n times */
export const pow = <T>(f: (x: T) => T, n: number): ((x: T) => T) => (x) => range(n).reduce((y) => f(y), x)

/** the order of f on a carrier: the least k > 0 with f^k the identity there, or 0 if none within the carrier's
 *  factorial bound (a map that is not a permutation never returns) */
export function orderOn<T>(f: (x: T) => T, carrier: readonly T[], eq: (a: T, b: T) => boolean): number {
  let bound = 1
  for (let k = 2; k <= carrier.length; k++) bound *= k
  for (let k = 1; k <= bound; k++) if (carrier.every((x) => eq(pow(f, k)(x), x))) return k
  return 0
}

/** the points of the carrier f leaves where they were */
export const fixedOn = <T>(f: (x: T) => T, carrier: readonly T[], eq: (a: T, b: T) => boolean): T[] => carrier.filter((x) => eq(f(x), x))

const eqN = (a: number, b: number): boolean => a === b
const eqA = (a: Affect, b: Affect): boolean => a.corner === b.corner && a.valence === b.valence

/** do f and g commute on every state */
export const commutes = (f: MapA, g: MapA): boolean => states().every((a) => eqA(f(g(a)), g(f(a))))

/** the group the maps generate, as their action tables on the six states: the closure of the identity under
 *  left-multiplication by each generator, walked breadth-first until a round adds nothing. `rounds` is how many
 *  rounds added something — the depth Lean's closure needs to reach the same fixed point. */
export function generated(gens: readonly MapA[]): { tables: string[]; rounds: number; closed: boolean } {
  const id = states()
  const tables = [id.map(key).join(' ')]
  const maps: MapA[] = [(a) => a]
  let frontier = [0]
  let rounds = 0
  while (frontier.length) {
    const next: number[] = []
    for (const i of frontier) for (const g of gens) {
      const f = maps[i]!
      const h: MapA = (a) => g(f(a))
      const t = tableOf(h)
      if (!tables.includes(t)) { tables.push(t); maps.push(h); next.push(tables.length - 1) }
    }
    if (next.length) rounds += 1
    frontier = next
  }
  const closed = maps.every((f) => gens.every((g) => tables.includes(tableOf((a) => g(f(a))))))
  return { tables, rounds, closed }
}

// THE PLANE THE CORNERS ARE DRAWN IN, in Eisenstein coordinates: (a, b) is a + bω with ω a primitive cube root of
// unity, so the turn is multiplication by ω, exact on integers: ω(a + bω) = −b + (a − b)ω, since ω² = −1 − ω. The
// corners are 1, ω and ω², and the observer is the point the rotation leaves where it is.
export type Pt = readonly [number, number]
/** ρ on the plane: multiplication by ω */
export const rotate = (p: Pt): Pt => [-p[1], p[0] - p[1]]
/** corner k drawn at ω^k */
export const coordOf = (c: number): Pt => pow(rotate, c)([1, 0])
/** every lattice point with both coordinates within r of the centre */
export const lattice = (r: number): Pt[] => range(2 * r + 1).flatMap((a) => range(2 * r + 1).map((b): Pt => [a - r, b - r]))
export const eqP = (p: Pt, q: Pt): boolean => p[0] === q[0] && p[1] === q[1]

/** what the rotation fixes on a box a corner-count wide: the centre and nothing else, and no corner */
export function observer(r: number = C) {
  const box = lattice(r)
  const fixed = fixedOn(rotate, box, eqP)
  const corners = range(C).map(coordOf)
  return {
    radius: r,
    points: box.length,
    fixed,
    centreOnly: fixed.length === 1 && eqP(fixed[0]!, [0, 0]),
    cornersFollowTurn: range(C).every((c) => eqP(rotate(coordOf(c)), coordOf(turn(c)))),
    closes: box.every((p) => eqP(pow(rotate, C)(p), p)),
    /** the corners sum to the centre: 1 + ω + ω² = 0, so the observer is their centroid */
    centroid: corners.reduce<Pt>((s, p) => [s[0] + p[0], s[1] + p[1]], [0, 0]),
  }
}

/** the lens as the model states it, every figure read off the maps */
export function trinity() {
  const turnA = onCorner(turn)
  const flipA = onValence(flip)
  const twist: MapA = (a) => flipA(turnA(a))
  const turnOrder = orderOn(turn, cornerSet(), eqN)
  const flipOrder = orderOn(flip, valenceSet(), eqN)
  const group = generated([turnA, flipA])
  return {
    corners: C,
    valences: V,
    states: states().length,
    turnOrder,
    flipOrder,
    turnFixed: fixedOn(turn, cornerSet(), eqN).length + fixedOn(pow(turn, 2), cornerSet(), eqN).length,
    flipFixed: fixedOn(flip, valenceSet(), eqN).length,
    backIsInverse: cornerSet().every((c) => back(turn(c)) === c && turn(back(c)) === c && back(c) === pow(turn, turnOrder - 1)(c)),
    commutes: commutes(turnA, flipA),
    flipKeepsCorner: states().every((a) => flipA(a).corner === a.corner),
    groupOrder: group.tables.length,
    groupRounds: group.rounds,
    groupClosed: group.closed,
    twistOrder: orderOn(twist, states(), eqA),
    /** a full turn split by the turn's order: the angle between neighbouring corners */
    step: 360 / turnOrder,
    /** a full turn split by the flip's order: the hue the valence flip moves through */
    valenceTurn: 360 / flipOrder,
  }
}
