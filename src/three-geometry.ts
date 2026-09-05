// three-geometry — THE LEDGER AS three.js GEOMETRY, WITH EXACT RATIONAL VERTICES AND NO LIBRARY SHIPPED.
//
// WHY THE OBVIOUS ROUTE IS CLOSED, and it is a law rather than a preference. three.js is not vendored into this
// tree, and it is not a question of effort: the library is built on floating trigonometry — sine, cosine — and a
// pseudo-random generator, and this tree hard-rejects that whole family everywhere, generators included, with no
// exemption. An exemption for vendored files was proposed once and REFUSED, on the ground that a shrink-only
// rule with a carve-out is a hiding place. An earlier attempt to port it through the Alpine applet door failed
// for a second reason: that door is command-shaped and a library is not a command. So the answer is not to bring
// three.js in. It is to emit what three.js EATS.
//
// (And the determinism scanner caught THIS FILE the first time it was written, because the paragraph above named
// the forbidden functions with their literal prefix while explaining why they are forbidden. The scanner cannot
// tell a mention from a use, and the law it enforces has no exemption — so the prose was rewritten rather than
// the rule bent. That is the correct outcome: a scanner that learned to allow mentions would be a scanner with a
// carve-out, and the carve-out is where the next real one hides.)
//
// AND THE VERTICES COME OUT EXACT, which is the part that makes this more than a workaround. A three.js scene
// normally places points on a circle with sin and cos — irrational, rounded, and unverifiable. But a Pythagorean
// triple IS an exact rational point on the unit circle: a² + b² = c² means (a/c, b/c) lies on it with no error at
// all. And a Pythagorean QUADRUPLE is an exact rational point on the unit SPHERE: x² + y² + z² = t² means
// (x/t, y/t, z/t) does. Both are sealed in Relativity.lean — the same sparse lattice that gives a velocity an
// exactly rational Lorentz factor gives a vertex an exactly rational position. The geometry engine and the
// physics wing are one structure, and every vertex this module emits carries the integers it came from, so a
// consumer can recompute the identity instead of trusting a float.
//
// WHAT IS TRANSPORTED vs WHAT IS TRUE. `positions` are IEEE doubles because that is what a GPU buffer takes, and
// 3/5 is not exact in binary. So each vertex also carries `exact` — its integer numerator triple and denominator
// — and `verify()` re-decides the identity on the integers. The float is transport; the integers are the claim.
import { seedOf } from './handle.js'
import { THEOREMS } from './theorems/index.js'
import { publicationGraph } from './publication-graph.js'
import { toUuid, merkleFold } from './address.js'

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const gcd3 = (a: number, b: number, c: number): number => gcd(gcd(a, b), c)

/** An exact rational direction: the integer coordinates and the denominator they are over. */
export interface ExactPoint {
  x: number
  y: number
  z: number
  /** the denominator — x² + y² + z² = d² holds on the integers, exactly */
  d: number
}

/** exactCirclePoints(maxDen) → every exact rational point on the unit circle with denominator ≤ maxDen, from the
 *  Pythagorean triples. Reduced and deduped, so each is one direction rather than a scaling of another. */
export function exactCirclePoints(maxDen = 65): ExactPoint[] {
  const seen = new Set<string>()
  const out: ExactPoint[] = []
  for (let c = 1; c <= maxDen; c++) {
    for (let a = 1; a < c; a++) {
      const r = c * c - a * a
      let b = 0
      while (b * b < r) b++
      if (b * b !== r || b === 0) continue
      const g = gcd3(a, b, c)
      const key = `${a / g}|${b / g}|${c / g}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ x: a / g, y: b / g, z: 0, d: c / g })
    }
  }
  return out.sort((p, q) => (p.d - q.d) || (p.x - q.x) || (p.y - q.y))
}

/** exactSpherePoints(maxDen) → every exact rational point on the unit sphere with denominator ≤ maxDen, from the
 *  Pythagorean quadruples, reduced and deduped. The poles (0,0,1) and their scalings collapse to one direction. */
export function exactSpherePoints(maxDen = 20): ExactPoint[] {
  const seen = new Set<string>()
  const out: ExactPoint[] = []
  for (let t = 1; t <= maxDen; t++) {
    for (let x = 0; x <= t; x++) {
      for (let y = x; y <= t; y++) {
        const r = t * t - x * x - y * y
        if (r < 0) continue
        let z = y
        while (z * z < r) z++
        if (z * z !== r) continue
        const g = gcd(gcd3(x, y, z), t)
        const key = `${x / g}|${y / g}|${z / g}|${t / g}`
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ x: x / g, y: y / g, z: z / g, d: t / g })
      }
    }
  }
  return out.sort((p, q) => (p.d - q.d) || (p.x - q.x) || (p.y - q.y) || (p.z - q.z))
}

/** verifyExact(p) → does the integer identity hold? This is the whole guarantee; a float cannot carry it. */
export function verifyExact(p: ExactPoint): boolean {
  return p.x * p.x + p.y * p.y + p.z * p.z === p.d * p.d && p.d > 0
}

/** THE SIGN AND AXIS ORBIT — one exact direction in the positive octant stands for its whole orbit under sign
 *  flips, so a lattice of 48 reduced points fills the sphere without any new arithmetic. Exactness is preserved
 *  by construction: negating or swapping integer coordinates cannot change x² + y² + z². */
export function octantOrbit(p: ExactPoint): ExactPoint[] {
  const out = new Map<string, ExactPoint>()
  for (const [a, b, c] of [[p.x, p.y, p.z], [p.x, p.z, p.y], [p.y, p.x, p.z], [p.y, p.z, p.x], [p.z, p.x, p.y], [p.z, p.y, p.x]])
    for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) {
      const q = { x: a * sx, y: b * sy, z: c * sz, d: p.d }
      out.set(`${q.x}|${q.y}|${q.z}`, q)
    }
  return [...out.values()]
}

export interface ThreeVertex {
  /** IEEE transport — what a GPU buffer takes */
  position: [number, number, number]
  /** the integers the position came from; verify() re-decides the identity on these */
  exact: ExactPoint
  /** what this vertex IS — a theorem key or a monograph slug */
  label: string
  address: string
}

export interface ThreeGeometry {
  /** the three.js BufferGeometry attribute, flat — feed straight to setAttribute('position', …) */
  positions: number[]
  /** line segment index pairs — feed to LineSegments */
  indices: number[]
  vertices: ThreeVertex[]
  /** every vertex's integer identity re-decided */
  exactVerified: boolean
  lattice: 'circle' | 'sphere'
  receipt: string
}

const place = (p: ExactPoint): [number, number, number] => [p.x / p.d, p.y / p.d, p.z / p.d]

/** ledgerGeometry() → the whole theorem ledger as a three.js point cloud on the exact rational sphere. Each
 *  theorem lands on a lattice direction chosen by its own content-address, so the layout is DERIVED (the same
 *  ledger always returns the same scene) rather than arranged by hand. */
export function ledgerGeometry(maxDen = 20): ThreeGeometry {
  const lattice = exactSpherePoints(maxDen).flatMap((p) => octantOrbit(p))
  const vertices: ThreeVertex[] = THEOREMS.map((t, i) => {
    // the address picks the direction — deterministic, and spread by the address's own hex rather than by an index
    // seedOf IS this expression — parseInt(handleOf(address), 16) — and calling it rather than retyping it is
    // the one-handle-derivation law: the inline form is how several places came to agree by coincidence.
    const pick = seedOf(t.address) % lattice.length
    const p = lattice[(pick + i) % lattice.length]!
    return { position: place(p), exact: p, label: t.key, address: t.address }
  })
  return {
    positions: vertices.flatMap((v) => v.position),
    indices: [],
    vertices,
    exactVerified: vertices.every((v) => verifyExact(v.exact)),
    lattice: 'sphere',
    receipt: merkleFold([toUuid('three-ledger|' + vertices.length), ...vertices.map((v) => v.address)]),
  }
}

/** monographGeometry() → the 116 monographs as vertices and the sealed kinship graph as LINE SEGMENTS. This is
 *  the corpus as a navigable 3D object: a reader turns it and sees which wings are near which, and every edge is
 *  the one derived by the ranked kinship rule rather than a force layout's opinion. */
export function monographGeometry(maxDen = 20): ThreeGeometry {
  const nodes = publicationGraph()
  const lattice = exactSpherePoints(maxDen).flatMap((p) => octantOrbit(p))
  const index = new Map<string, number>()
  const vertices: ThreeVertex[] = nodes.map((n, i) => {
    index.set(n.slug, i)
    const p = lattice[(i * 7 + 1) % lattice.length]!   // a stride, so neighbours in the list are not neighbours in space
    return { position: place(p), exact: p, label: n.slug, address: n.receipt }
  })
  // ONE SEGMENT PER PAIR, and the first version of this loop got it wrong in a way worth recording: it skipped
  // any edge whose target index was LOWER than its source, which does dedupe a mutual pair but also DELETES a
  // one-directional edge running from a higher index to a lower one. The kin list is a shortlist cut at five, so
  // one-directional edges are the common case, not the exception. Keying a set on the SORTED pair keeps every
  // edge exactly once regardless of which end named the other.
  const pairs = new Set<string>()
  for (const n of nodes) {
    const a = index.get(n.slug)!
    for (const k of n.kin) {
      const b = index.get(k.slug)
      if (b === undefined) continue
      pairs.add(a < b ? `${a}|${b}` : `${b}|${a}`)
    }
  }
  const indices: number[] = [...pairs].sort().flatMap((p) => p.split('|').map(Number))
  return {
    positions: vertices.flatMap((v) => v.position),
    indices,
    vertices,
    exactVerified: vertices.every((v) => verifyExact(v.exact)),
    lattice: 'sphere',
    receipt: merkleFold([toUuid('three-monographs|' + vertices.length + '|' + indices.length), ...vertices.map((v) => v.address)]),
  }
}

export interface GeometryCensus {
  circlePoints: number
  spherePoints: number
  sphereDirections: number
  ledgerVertices: number
  monographVertices: number
  monographSegments: number
  allExact: boolean
  receipt: string
}

/** geometryCensus() → the lattice and both scenes as one auditable row. */
export function geometryCensus(): GeometryCensus {
  const circle = exactCirclePoints()
  const sphere = exactSpherePoints()
  const dirs = sphere.flatMap((p) => octantOrbit(p))
  const led = ledgerGeometry()
  const mon = monographGeometry()
  return {
    circlePoints: circle.length,
    spherePoints: sphere.length,
    sphereDirections: dirs.length,
    ledgerVertices: led.vertices.length,
    monographVertices: mon.vertices.length,
    monographSegments: mon.indices.length / 2,
    allExact: circle.every(verifyExact) && sphere.every(verifyExact) && dirs.every(verifyExact)
      && led.exactVerified && mon.exactVerified,
    receipt: merkleFold([led.receipt, mon.receipt]),
  }
}

/** geometryGaps() → the guard's shape. A vertex whose integer identity fails is a fabricated position. */
export function geometryGaps(): { what: string; fix: string }[] {
  const c = geometryCensus()
  if (c.allExact) return []
  return [{
    what: 'a three.js vertex does not satisfy its own integer identity — x² + y² + z² ≠ d²',
    fix: 'the lattice must come from Pythagorean triples and quadruples only. A vertex placed by trigonometry '
      + 'cannot be verified and must not be emitted: the float is transport, the integers are the claim.',
  }]
}
