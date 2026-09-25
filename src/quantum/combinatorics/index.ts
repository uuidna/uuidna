/**
 * LATTICE COMBINATORICS — which points a closed exponent lattice reaches, and by how many routes.
 *
 * TWO WINGS ALREADY MAKE THIS ARGUMENT and neither could share it. PlanckLattice works over four constants
 * (hbar, G, c, k); SiCross works over the seven SI base quantities. Both represent a quantity as an integer
 * vector of exponents, both close under product (ADD the vectors) and ratio (SUBTRACT them), and both draw the
 * same conclusion: a point reachable by two independent routes is not a coincidence, because the closure forces
 * the routes to agree. That is what this tree calls a CROSS FORMULA — "the closure is what makes the formulas
 * prove each other rather than merely sit beside each other".
 *
 * The argument is identical and the rank is not, so it is written once, generic over vector length. A wing that
 * enumerates its own routes inline is a second implementation of this, and a second implementation is a place
 * for the two to disagree about what a route is.
 *
 * ROUTE LENGTH CHANGES THE ANSWER, which is why it is a parameter rather than a constant. Over the SI table the
 * joule is reached four ways by PAIRS; force is reached only once by pairs and twice more by TRIPLES. A census
 * taken at one length and reported as "the crossings" would call force uncrossed, which is a statement about
 * the census and not about the lattice.
 *
 * WHAT THIS DECIDES AND WHAT IT DOES NOT. It decides which vectors coincide — pure integer arithmetic, no
 * physics. Two quantities sharing a vector need NOT be the same quantity: torque and energy are both
 * kg·m²·s⁻² and are not interchangeable. What the lattice settles is INEQUALITY, and that is the decidable half
 * by construction: two different exponent vectors are different integers, which the kernel decides, while
 * sameness of QUANTITY is a physical question no arithmetic reaches.
 */

export interface LatticePoint {
  name: string
  /** integer exponents over the basis — every point in one lattice must share a length */
  vector: readonly number[]
}

export type RouteKind = 'product' | 'ratio'

export interface Route {
  kind: RouteKind
  /** the point names combined, in the order the operation takes them */
  parts: readonly string[]
}

export interface Crossing {
  name: string
  vector: readonly number[]
  routes: readonly Route[]
}

const sameLength = (points: readonly LatticePoint[]): number => {
  const n = points[0]?.vector.length ?? 0
  for (const p of points) {
    if (p.vector.length !== n) {
      throw new Error(
        `combinatorics: REFUSED — ${p.name} has ${String(p.vector.length)} exponents where the lattice has ${String(n)}. `
        + 'A lattice whose points disagree about the basis has no closure, and every route it reports would be an artefact of the mismatch.',
      )
    }
    for (const e of p.vector) {
      if (!Number.isInteger(e)) {
        throw new Error(`combinatorics: REFUSED — ${p.name} carries a non-integer exponent. The closure argument is integer arithmetic; a fractional exponent is a different structure.`)
      }
    }
  }
  return n
}

export const add = (a: readonly number[], b: readonly number[]): number[] => a.map((e, i) => e + (b[i] ?? 0))
export const sub = (a: readonly number[], b: readonly number[]): number[] => a.map((e, i) => e - (b[i] ?? 0))
export const eq = (a: readonly number[], b: readonly number[]): boolean =>
  a.length === b.length && a.every((e, i) => e === b[i])

/**
 * Every route of at most `maxParts` factors that lands on `target`.
 *
 * Products are taken in name order so a·b and b·a are one route, not two — otherwise every crossing would
 * report double and the count would measure the enumeration rather than the lattice. Ratios are ordered, since
 * a/b and b/a are genuinely different points.
 */
export function routesTo(
  target: string,
  points: readonly LatticePoint[],
  maxParts = 2,
): Route[] {
  sameLength(points)
  if (maxParts < 2) throw new Error('combinatorics: REFUSED — a route of fewer than two parts is the point itself, not a route to it')
  const t = points.find((p) => p.name === target)
  if (t === undefined) throw new Error(`combinatorics: REFUSED — ${target} is not in this lattice, so nothing can be said about routes to it`)
  const others = points.filter((p) => p.name !== target)
  const out: Route[] = []

  for (const a of others) for (const b of others) {
    if (a.name <= b.name && eq(add(a.vector, b.vector), t.vector)) out.push({ kind: 'product', parts: [a.name, b.name] })
    if (eq(sub(a.vector, b.vector), t.vector)) out.push({ kind: 'ratio', parts: [a.name, b.name] })
  }
  if (maxParts >= 3) {
    for (const a of others) for (const b of others) for (const c of others) {
      if (a.name <= b.name && b.name <= c.name && eq(add(add(a.vector, b.vector), c.vector), t.vector)) {
        out.push({ kind: 'product', parts: [a.name, b.name, c.name] })
      }
    }
  }
  return out
}

/** Every point reached by at least `least` routes — the crossings, sorted by how heavily crossed they are. */
export function crossings(points: readonly LatticePoint[], maxParts = 2, least = 2): Crossing[] {
  return points
    .map((p) => ({ name: p.name, vector: p.vector, routes: routesTo(p.name, points, maxParts) }))
    .filter((c) => c.routes.length >= least)
    .sort((x, y) => y.routes.length - x.routes.length || (x.name < y.name ? -1 : 1))
}

/**
 * The closure the crossings stand on: add a vector then subtract it and the point returns.
 *
 * Stated rather than assumed, because it is the reason two routes meeting must agree — without it a coincidence
 * of vectors would be just that.
 */
export function isClosed(points: readonly LatticePoint[]): boolean {
  sameLength(points)
  return points.every((a) => points.every((b) => eq(sub(add(a.vector, b.vector), b.vector), a.vector)))
}

/** A route as a reader writes it: `N·m` or `J/s`. */
export const routeText = (r: Route): string => (r.kind === 'product' ? r.parts.join('·') : r.parts.join('/'))
