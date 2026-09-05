// checker-queue — THE UNPROVEN FINDERS, HANDED OUT AS TAKEABLE WORK.
//
// lean/finder-controls-baseline.json counts the finders no test has ever shown to FIRE. Counting them was the
// easy half; 2026-09-06 measured why it matters. NINE defects were found that day and NONE by a more capable
// model reasoning harder — eight by an independent instrument pointed at the same claim, one by data from
// outside. Every one was a rule that PASSED: `err.stderr ?? err.message` over an empty Buffer, `\btest\(`
// splitting on `.test(`, `failing.length === 0` over a verdict-empty set, a conjunction of tautologies, one
// exemption word answering two questions.
//
// SO THE SCARCE RESOURCE IS INDEPENDENT LOOKS, NOT DEPTH — and looks are bought by the cheapest instrument that
// can take an instruction, which is what makes a queue worth building instead of a rota. The condition is
// strict: independence must be in the MECHANISM, not the count. The same day showed the other half — two
// sessions both read `gh run list`, neither saw the failing check on their own commits, and it took a build log
// from outside. Many checkers on one surface share one blind spot and find nothing many times.
//
// SHARDED BY THE TASK'S OWN ADDRESS, so two checkers never collide with no registry, no lock and no
// coordination: laneOf(toUuid(finder), lanes) is the same shard the executor trinity and upgrade-wave use. Two
// checkers asking for lane 3 get the same list, forever, on any host.
//
// PURE. No filesystem, no clock, no network — the baseline is passed in, so the queue can be handed a crafted
// baseline in a test rather than read off a tree that must first be made to fail.
import { laneOf } from './handle.js'
import { toUuid } from './address.js'

/** How a violation reaches this finder. The 39 split 2/37, measured. */
export type Approach = 'direct' | 'extract'

export interface CheckerTask {
  finder: string
  /** 'direct' — it takes its input as an argument, so a crafted violation goes straight in.
   *  'extract' — it reads the tree, so its RULE must come out as a pure function first. */
  approach: Approach
  lane: number
  /** what finishing looks like, in one line a checker can be held to */
  done: string
}

/** DONE IS BOTH DIRECTIONS. A control that only proves firing would equally pass a finder that flags
 *  everything — which is the finder that gets switched off in a week, and then the real fault walks through. */
const DONE = 'a test names the finder beside a NON-EMPTY assertion on a crafted violation, AND asserts it is silent on the lawful twin'

/** checkerQueue(unproven, direct, lanes) → one takeable task per finder that has never been shown to fire. */
export function checkerQueue(
  unproven: readonly string[],
  direct: readonly string[] = [],
  lanes = 14,
): CheckerTask[] {
  const takesArg = new Set(direct)
  return [...unproven].sort().map((finder) => ({
    finder,
    approach: takesArg.has(finder) ? 'direct' as const : 'extract' as const,
    lane: laneOf(toUuid('checker:' + finder), lanes),
    done: DONE,
  }))
}

/** laneWork(lane, …) → the share this checker owns. Same answer for every caller, forever. */
export const laneWork = (lane: number, unproven: readonly string[], direct: readonly string[] = [], lanes = 14): CheckerTask[] =>
  checkerQueue(unproven, direct, lanes).filter((t) => t.lane === lane)

/** the shape of the work, for deciding how many checkers to point at it */
export function queueCensus(unproven: readonly string[], direct: readonly string[] = [], lanes = 14): {
  total: number; direct: number; extract: number; lanes: number; perLane: number[]
} {
  const q = checkerQueue(unproven, direct, lanes)
  return {
    total: q.length,
    direct: q.filter((t) => t.approach === 'direct').length,
    extract: q.filter((t) => t.approach === 'extract').length,
    lanes,
    perLane: Array.from({ length: lanes }, (_, l) => q.filter((t) => t.lane === l).length),
  }
}
