// directions/dispatch — ALL FOURTEEN AT ONCE, WITH THE HOST DECIDING HOW MANY UNITS RUN TOGETHER.
//
// @non-harmonic: schedules concurrent work — async/await/Promise and a host-measured lane count. A NAMED
// boundary, like os/host and the drivers: nothing here decides a proposition, it only decides ORDER OF
// EXECUTION, and the geometry it dispatches over is sealed and synchronous in ./index.ts. The split is
// deliberate — declaring the whole module exempt would have taken the guarantee off the solid as well as off
// the scheduler, and the solid is the part that must not depend on anything.
//
// The fourteen are not a concurrency width: they are the shape of one unit of work. capacity().lanes is the
// concurrency. Passing a numeric literal as the width is refused by src/lane-fusion.test.ts.
import { capacity } from '../../os/host/index.js'
import { DIRECTIONS, type Direction } from './index.js'

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
  // the same rule for the lane clamp: never wider than the work, never narrower than one, by comparison
  const want = items.length === 0 ? 1 : items.length
  const capped = lanes < want ? lanes : want
  await Promise.all(Array.from({ length: capped < 1 ? 1 : capped }, worker))
  return out
}
