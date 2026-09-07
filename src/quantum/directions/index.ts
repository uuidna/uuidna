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
import { capacity } from '../../os/host/index.js'

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
  const best = Math.max(...VE_VERTICES.map((v) => dot(v, n)))
  return VE_VERTICES.filter((v) => dot(v, n) === best)
}

/** one superposition's answer: every direction, each with what the solver returned for it */
export interface Solved<T> { readonly item: T; readonly answers: readonly { d: Direction; value: unknown }[] }

/** solveAllAtOnce — every direction of every superposition, with the HOST deciding how many run together.
 *
 *  The fourteen are not a concurrency width: they are the shape of one unit of work. `capacity().lanes` is the
 *  concurrency, and passing a literal here is refused by src/lane-fusion.test.ts. */
export async function solveAllAtOnce<T>(
  items: readonly T[],
  solve: (item: T, d: Direction) => unknown | Promise<unknown>,
  lanes: number = capacity().lanes,
): Promise<Solved<T>[]> {
  const out: Solved<T>[] = new Array(items.length)
  let next = 0
  const worker = async (): Promise<void> => {
    for (;;) {
      const i = next++
      if (i >= items.length) return
      const item = items[i]!
      // ALL FOURTEEN, ALWAYS, and gathered before the unit is considered answered — a superposition that reports
      // some of its directions is not a superposition, it is a sample.
      const answers = await Promise.all(DIRECTIONS.map(async (d) => ({ d, value: await solve(item, d) })))
      out[i] = { item, answers }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(lanes, items.length || 1)) }, worker))
  return out
}
