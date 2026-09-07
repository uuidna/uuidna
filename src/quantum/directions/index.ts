// directions — ALL FOURTEEN AT ONCE. The captain's order, 2026-09-07: "if all fused, next would compute all 14
// directions of each superposition at once".
//
// WHAT THE FOURTEEN ARE, and why they are derived here rather than written down. VE is the cuboctahedron, the
// twelve permutations of (±1,±1,0) — `ve_twelve_vertices` seals the count and `ve_four_neighbours` seals that
// each vertex meets four others. Its faces are `ve_fourteen_faces`: 8 + 6 = 14 = VE_FACES = HANDLE_HEXBITS +
// HEXBIT_BITS + COINS, which `ve_faces_are_handle_hexbit_coins` seals as an identity rather than a coincidence.
// The DIRECTIONS are those faces' normals: six along the axes (the square faces) and eight through the octants
// (the triangles). Both families are generated below from the coordinates, so no vector is typed by hand and the
// fourteen is a consequence rather than a constant.
//
// THE SEPARATION THIS MODULE EXISTS TO HOLD. Two numbers were doing one job in this tree — VE_FACES (14) and
// `capacity().lanes` (8 on this host) — and `src/hardware/lanes` describes the proof sweep as measured "across
// VE_FACES lanes" while also saying the lane count is read from the host. They are different quantities:
//
//   DIRECTIONS PER SUPERPOSITION   14, geometry, sealed, the same on every machine
//   SUPERPOSITIONS IN FLIGHT       capacity().lanes, hardware, measured, different on every machine
//
// So "all fourteen at once" does NOT mean fourteen lanes. It means the unit of work is a whole superposition
// with its fourteen directions computed together, and the host decides how many such units run concurrently.
// Conflating them would either under-use a wide machine or oversubscribe a narrow one, and on a shared tree it
// would do both at different moments.
//
// THIS FILE IS THE GEOMETRY ONLY, and it is synchronous on purpose. The dispatcher that runs the directions
// concurrently lives in ./dispatch.ts, which declares itself a named boundary — async, await and Promise are
// non-harmonic in the core, and the harmonic scan is right to say so: the shape of the solid must not depend on
// how many things are in flight. Splitting keeps the sealed half guarded rather than exempting it along with the
// half that genuinely schedules.
/** a face normal of the vector equilibrium */
export type Direction = readonly [number, number, number]

/** the twelve vertices: every permutation of (±1,±1,0), generated rather than listed */
export const VE_VERTICES: readonly Direction[] = (() => {
  const out: Direction[] = []
  for (let zero = 0; zero < 3; zero++)
    for (const a of [1, -1]) for (const b of [1, -1]) {
      const v = [0, 0, 0]
      const rest = [0, 1, 2].filter((i) => i !== zero)
      v[rest[0]!] = a; v[rest[1]!] = b
      out.push([v[0]!, v[1]!, v[2]!] as Direction)
    }
  return out
})()

/** the six square faces — one per axis, both signs */
export const SQUARE_NORMALS: readonly Direction[] = [0, 1, 2].flatMap((i) =>
  [1, -1].map((s) => { const v = [0, 0, 0]; v[i] = s; return [v[0]!, v[1]!, v[2]!] as Direction }))

/** the eight triangular faces — one per octant */
export const TRIANGLE_NORMALS: readonly Direction[] = [1, -1].flatMap((x) =>
  [1, -1].flatMap((y) => [1, -1].map((z) => [x, y, z] as Direction)))

/** THE FOURTEEN. Squares first, then triangles — a stable order, so a fold over them is reproducible. */
export const DIRECTIONS: readonly Direction[] = [...SQUARE_NORMALS, ...TRIANGLE_NORMALS]

const dot = (a: Direction, b: Direction): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

/** the VE vertices lying on the face with this normal — 4 for a square, 3 for a triangle */
export function faceVertices(n: Direction): readonly Direction[] {
  // NO HOST BUILT-IN HERE, and the reason is the determinism law rather than taste: this tree hard-rejects the
  // global numeric namespace in every library module, because a fold that reaches for a host routine is a fold
  // whose answer depends on the host. A maximum over twelve integers is a walk, so it is written as one. (The
  // scan reads comments too, and rightly — naming the banned token even to explain the ban trips it, which it
  // did on the first version of this very paragraph.)
  let best = dot(VE_VERTICES[0]!, n)
  for (const v of VE_VERTICES) { const d = dot(v, n); if (d > best) best = d }
  return VE_VERTICES.filter((v) => dot(v, n) === best)
}

