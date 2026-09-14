// @non-harmonic: schedules jobs as they finish — the completion order is the host's, but every result lands at its own item's index, so what it returns does not depend on that order.
//
// memory-pool — ONE SCHEDULER FOR EVERY PARALLEL HEAVY JOB (the captain, 2026-09-14: "why not split as advised?").
// Lean wings and test shards are the same problem: each job's memory is a measured reading, the host is shared, and a
// lane count sized blind to the neighbours drove the host into 15.5 GB of swap once. So the lane count is never a typed
// share of the cores — it is whatever the memory measured free at each start admits. Pure: the caller supplies the
// measurement and the worker.

/** memoryPool(items, estimate, known, freeNow, cores, worker) → every item run, in INVOLUTION order (heaviest,
 *  lightest, next heaviest, next lightest…), each admitted by LIVE MEASUREMENT: while nothing has been measured yet
 *  only one runs, so the first sets the scale; after that the next starts only if the memory measured free AT THAT
 *  MOMENT holds its estimate (its own measured peak, or the heaviest measured so far), and a core is free. When memory
 *  is short nothing new starts until a running item finishes. No typed constant and no guessed share: the lane count
 *  is whatever the measurements admit — many light items at once, one or two giants. One item always runs. */
export async function memoryPool<X, R>(
  items: readonly X[], estimate: (x: X) => number, known: () => boolean, freeNow: () => number | null, cores: number,
  worker: (x: X) => Promise<R>, measured?: (x: X, r: R) => void,
): Promise<R[]> {
  const byWeight = items.map((x, i) => ({ x, i })).sort((a, b) => estimate(b.x) - estimate(a.x))
  const order: { x: X; i: number }[] = []
  for (let lo = 0, hi = byWeight.length - 1; lo <= hi; lo++, hi--) { order.push(byWeight[lo]!); if (lo !== hi) order.push(byWeight[hi]!) }
  const out: R[] = new Array(items.length)
  // a job just started has not yet grown to its peak, so what is free now is reduced by every estimate in flight — the
  // memory the running jobs are about to take is never handed out twice
  let inFlight = 0, next = 0, reserved = 0
  await new Promise<void>((done, fail) => {
    const pump = (): void => {
      if (next >= order.length && inFlight === 0) return done()
      while (next < order.length && inFlight < cores) {
        const e = estimate(order[next]!.x)
        if (inFlight > 0) {
          if (!known()) break
          const free = freeNow()
          if (free === null || free - reserved < e) break
        }
        const { x, i } = order[next++]!
        inFlight++; reserved += e
        worker(x).then((r) => { out[i] = r; measured?.(x, r); inFlight--; reserved -= e; pump() }, fail)
      }
    }
    pump()
  })
  return out
}
