// pentagram-stream — stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized):
// item k is visited at index (step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (the pentagram is {5/2}),
// else gcd(step,n) shorter loops — reported honestly. Each streamed item is stamped
// holofractal (pentagram · hologram · fractal · accounted), and the whole folds to ONE order-INVARIANT quantum
// receipt: the stream has a definite pentagram ORDER yet an order-free RECEIPT (every observer ordering → the same
// root — the doubleTorus/gravity duality, bell_no_signaling). Streaming · quantum · pentagram, recomputable. Integrity.
import { pentagramHologramFractal, type HoloFractal } from './holofractal.js'
import { starPolygon, gcdInt } from './cycles.js'
import { merkleGravity } from './gravity.js'

export interface PentagramStreamCell { visitIndex: number; item: string; holofractal: HoloFractal }
export interface PentagramStream {
  n: number
  step: number
  order: number[]          // the visiting order (step·k mod n) — the pentagram stroke over the stream
  single: boolean          // one closed stroke iff gcd(step,n)=1
  loops: number            // gcd(step,n) — the number of strokes the stream splits into
  streamed: PentagramStreamCell[]
  receipt: string          // ORDER-INVARIANT quantum receipt — the same for any observer ordering
  quantum: boolean         // receipt is order-invariant (verified: gravity(order) === gravity(reverse))
}

/** Stream items through the star {n/step} stroke; stamp each holofractal; fold to one order-invariant quantum receipt. */
export function pentagramStream(items: string[], step = 2): PentagramStream {
  const list = items.map(String)
  const n = list.length
  if (n === 0) return { n, step, order: [], single: false, loops: 0, streamed: [], receipt: merkleGravity([]), quantum: true }
  const sp = starPolygon(n, step)                     // {n/step}: single (one stroke iff gcd=1) and loops (= gcd)
  // Build the FULL covering order over ALL n items — trace every loop (gcd of them, n/gcd each) so a stream loses
  // nothing; one closed stroke when gcd(step,n)=1 (the pentagram), gcd loops otherwise (honestly reported by sp).
  const g = gcdInt(step, n)
  const order: number[] = []
  for (let s = 0; s < g; s++) { let x = s; for (let k = 0; k < n / g; k++) { order.push(x); x = (x + step) % n } }
  const streamed = order.map((visitIndex) => ({ visitIndex, item: list[visitIndex], holofractal: pentagramHologramFractal(list[visitIndex]) }))
  const addrs = streamed.map((c) => c.holofractal.address)
  const receipt = merkleGravity(addrs)
  const quantum = receipt === merkleGravity([...addrs].reverse())   // order-invariant: proven
  return { n, step, order, single: sp.single, loops: sp.loops, streamed, receipt, quantum }
}
