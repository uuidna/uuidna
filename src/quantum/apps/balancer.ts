// quantum/apps/balancer — THE QUANTUM BALANCER: hardware load balancing that costs no coordination at all.
// The captain's claim, now callable: a job already carries a handle, and the handle IS the routing decision.
// No table, no consensus, no lookup, no round-trip — every machine holding the job computes the same worker in
// one modulo, so two nodes that never speak agree on where the work goes. That is the whole apparatus.
//
// THE BALANCE IS EXACT WHERE THE COUNT DIVIDES THE SPAN (handles_balance_the_load_for_free): a handle spans
// 16^8 = 2^32, so 2, 4, … 256 workers each own precisely 2^32/N values — no worker is handed a larger share by
// the arithmetic. Where N does NOT divide the span the remainder is a real bias, reported rather than hidden:
// `wastes` names exactly how many values sit in the uneven tail, the same honesty moduli_waste_states keeps.
//
// HONEST SCOPE, and it is the load-bearing caveat: an equal share of the ADDRESS SPACE is not an equal share of
// the WORK. That follows only if handles arrive uniformly (a measurement about traffic, never a theorem — the
// anthem's own second voice turned out to be the RFC variant nibble, four values of sixteen) and if jobs cost
// the same (a claim about the work). The balancer therefore ships with a CENSUS: measure your real traffic,
// and believe the measurement over the arithmetic.
import { valueOf, HANDLE_SPAN, HANDLE_HEXBITS } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import { handleOf, isHandle } from '../../handle.js'
import { gpuCapacity } from '../../hardware/lanes/index.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d
// NOT re-derived as 16^8: the same number written in two files is two places to be wrong, and valueOf already
// hands it back as `.span` on every call. The span is imported and re-named, never re-typed (lead 104).
export const SPAN = HANDLE_SPAN   // 2^32 — every value a handle can take

// ONE definition of "a fleet", because the module was keeping two and they disagreed: routeOf refused 0, -3 and
// 1.5 while shares answered them — NaN for zero, and for -3 a NEGATIVE per-worker share that still satisfied
// each*workers + wastes = SPAN, so the accounting test could not catch it. Both voices ask this now, or the
// module tells one story about what a fleet is and a different one about what that fleet is owed.
const fleet = (workers: number): number => {
  if (!Number.isInteger(workers) || workers < 1) throw new Error(`balancer: ${workers} workers is not a fleet — routing needs at least one`)
  return workers
}

/** routeOf(handle, workers) → the worker index this handle belongs to. Stateless, O(1), identical on every
 *  machine that holds the handle: the routing decision travels WITH the work instead of being negotiated. */
export function routeOf(handle: string, workers: number): number {
  // the handle is checked for the SAME reason the fleet is: valueOf is parseInt, which answers NaN for a
  // non-handle and a value PAST the span for a longer one, and neither says so. A NaN route is not a route —
  // it silently vanishes a job in census (counts[NaN]++ is a no-op), so the span premise is enforced, not assumed.
  if (!isHandle(handle)) throw new Error(`balancer: "${handle}" is not a handle — routing needs exactly eight hex characters, and parseInt would answer NaN or a value past the span rather than refuse`)
  return valueOf(handle).value % fleet(workers)
}

export interface Shares { workers: number; even: boolean; each: number; wastes: number }
/** shares(workers) → what the arithmetic alone promises: the exact per-worker share, whether it divides evenly,
 *  and how many handle values fall in the uneven tail when it does not. */
export function shares(workers: number): Shares {
  const each = idiv(SPAN, fleet(workers))
  const wastes = SPAN - each * workers
  return { workers, even: wastes === 0, each, wastes }
}

export interface Census { workers: number; counts: number[]; jobs: number; busiest: number; idlest: number; spread: number }
/** census(handles, workers) → the MEASUREMENT that outranks the arithmetic: where real traffic actually landed.
 *  `spread` is busiest − idlest, the only imbalance number worth quoting, and it is counted, never modelled. */
export function census(handles: readonly string[], workers: number): Census {
  const counts = new Array<number>(workers).fill(0)
  for (const h of handles) counts[routeOf(h, workers)]!++
  let busiest = 0, idlest = handles.length
  for (const c of counts) { if (c > busiest) busiest = c; if (c < idlest) idlest = c }
  return { workers, counts, jobs: handles.length, busiest, idlest, spread: busiest - idlest }
}

/** the coins the fleet pays to route one job: none. Stated as a function so a caller can ask rather than assume,
 *  and so the claim is somewhere a test can reach it. */
export const routingCost = (): { lookups: number; roundTrips: number; sharedState: number; operations: string } =>
  ({ lookups: 0, roundTrips: 0, sharedState: 0, operations: 'one modulo over a value the job already carries' })

/** CPU workers plus one specified GPU worker when the job count pays postage. Chain/onion layers stay serial. */
export function streamFleet(jobs: number, cpuWorkers: number = HANDLE_HEXBITS): {
  cpuWorkers: number
  gpuWorkers: number
  total: number
} {
  const cpu = fleet(cpuWorkers)
  const gpuWorkers = jobs >= gpuCapacity().breakEvenAddresses ? 1 : 0
  return { cpuWorkers: cpu, gpuWorkers, total: cpu + gpuWorkers }
}

export interface StreamBalance extends Census {
  cpuWorkers: number
  gpuWorkers: number
  serial: number
  parallelSteps: number
  opened: number
  slots: number
  gpuLane: number
}

/** Independent stream jobs across the CPU/GPU residue map. `parallelSteps` is the busiest lane; `opened` is
 *  serial minus that — the extra concurrent capacity the fleet opens versus a single worker. GPU lane is
 *  specified: assignment is real, no device dispatch. */
export function balanceStream(handles: readonly string[], cpuWorkers: number = HANDLE_HEXBITS): StreamBalance {
  const f = streamFleet(handles.length, cpuWorkers)
  const c = census(handles, f.total)
  return {
    ...c,
    cpuWorkers: f.cpuWorkers,
    gpuWorkers: f.gpuWorkers,
    serial: handles.length,
    parallelSteps: c.busiest,
    opened: handles.length - c.busiest,
    slots: f.total,
    gpuLane: f.gpuWorkers === 1 ? f.total - 1 : -1,
  }
}

/** Content-addressed handles for independent stream jobs — the residue key the fleet already carries. */
export function jobHandles(kind: string, items: readonly string[], start = 0): string[] {
  return items.map((item, i) => handleOf(toUuid(kind + '|' + (start + i) + '|' + item)))
}

/** Run independent jobs by residue bucket. Order of results matches the input; chain/onion layers must not use this. */
export function mapAcross<T>(handles: readonly string[], workers: number, run: (i: number) => T): T[] {
  const out: T[] = new Array(handles.length)
  const buckets: number[][] = []
  for (let w = 0; w < workers; w++) buckets.push([])
  handles.forEach((h, i) => buckets[routeOf(h, workers)]!.push(i))
  for (const bucket of buckets) {
    for (const i of bucket) out[i] = run(i)
  }
  return out
}
