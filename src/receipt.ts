// receipt — A DOOR THAT HAS ALREADY ANSWERED SHOULD NOT ANSWER AGAIN, and the key must include its own rule.
//
// The captain, 2026-09-28: "give the doors receipts". Measured first (lean/time-census.json): every census door built
// this session recomputes — numeral-reach 1262ms then 1262ms with nothing moved between the runs, base-invariance about
// twenty minutes over 2,844 statements, and the school-assessment sweep never finishing at all. The tree's own
// generators do not behave this way: lean-one answers "verified by receipt (unchanged at 2ca20abc)" and gen-falsifiers
// serves 5,509 of 5,564 from cache. The doors built to find cracks were each a crack.
//
// THE KEY INCLUDES THE RULE, NOT ONLY THE INPUTS, and this repository has already paid for learning that. From
// scripts/gate-paths.test.ts, measured 2026-09-03: audit-citations keyed its cache on the publication set alone, its
// SCAN was corrected, the publications had not moved, and the run reported a cache hit carrying the stale answer. A
// cache keyed on inputs but not on the function is a PROXY for the computation, and the healthy case and the
// never-re-ran case print the same line. So every receipt here folds the door's own compiled source into the digest: a
// corrected rule invalidates its own receipts by construction, with nothing to remember to bump.
//
// A RECEIPT IS NOT A CLAIM ABOUT THE ANSWER. It says only that this rule, over these inputs, already produced this
// value. It cannot notice that the value was wrong BY CONSTRUCTION — the digest folds the inputs and the rule and never
// the value, so there is nothing in a receipt for a wrong answer to disagree with — and a door whose logic is broken
// will serve the same broken answer faster. That is the honest limit of caching, and the reason the receipt carries the
// digest it was earned under — so a reader can see exactly what was held fixed.

// @non-harmonic: async/await, for servedAsync ALONE and for one measured reason. A receipted door must not import the
// ledger to decide whether it needs the ledger: dist/theorems/generated.js costs 699ms as a static import, which runs
// before any logic, so a receipt placed after it can never pay (measured 2026-09-28 on falsifier-gap — the receipt HIT
// and the door got slower). Reaching the heavy modules only on a miss means importing them INSIDE compute, and a
// dynamic import is a promise. The await is therefore a BOUNDARY, not non-determinism: nothing here reads a clock, a
// random source or a network, the digest folds the same bytes whether it is earned synchronously or not, and `served`,
// the synchronous twin, carries the identical rule for every door with no such import to defer.

import { createHash } from 'node:crypto'

/** the digest of everything an answer depends on — inputs AND rule, in the order given */
export function receiptDigest(parts: readonly string[]): string {
  const h = createHash('sha256')
  for (const p of parts) {
    // LENGTH-PREFIXED, so two different part lists cannot concatenate to the same bytes: ["ab","c"] and ["a","bc"]
    // would otherwise collide. The prefix makes the separator arbitrary rather than load-bearing.
    h.update(String(p.length))
    h.update(':')
    h.update(p)
  }
  return h.digest('hex').slice(0, 32)
}

/** the file surface a receipt needs — injected so a test can hand it a store it controls */
export interface ReceiptStore {
  read(path: string): string | null
  write(path: string, body: string): void
}

export interface Served<T> {
  value: T
  /** true when the receipt was valid and the walk was skipped */
  hit: boolean
  digest: string
}

/**
 * Serve a door's answer from its receipt, or compute it and earn one.
 *
 * `inputs` must contain BOTH what the answer is about and the rule that produced it — see the header for the measured
 * reason. `compute` runs only on a miss, so a door wrapped in this pays its walk once per change rather than once per
 * question.
 *
 * A receipt that cannot be parsed is treated as absent rather than as an error: a corrupt or half-written file should
 * cost one recomputation, never a failed run, because the answer is always reproducible from the inputs.
 */
export function served<T>(
  spec: { path: string; inputs: readonly string[]; compute: () => T },
  store: ReceiptStore,
): Served<T> {
  const digest = receiptDigest(spec.inputs)
  const raw = store.read(spec.path)
  if (raw !== null) {
    try {
      const held = JSON.parse(raw) as { digest?: unknown; value?: unknown }
      if (typeof held.digest === 'string' && held.digest === digest && held.value !== undefined) {
        return { value: held.value as T, hit: true, digest }
      }
    } catch { /* unreadable is absent: one recomputation, never a failed run */ }
  }
  const value = spec.compute()
  store.write(spec.path, JSON.stringify({ kind: 'door-receipt', digest, value }, null, 2) + '\n')
  return { value, hit: false, digest }
}

/**
 * The async twin, and the reason it exists is the whole point of a receipt.
 *
 * MEASURED 2026-09-28: falsifier-gap was receipted, the receipt HIT, and the door got slower. Importing
 * dist/theorems/generated.js costs 699ms on its own — 23 megabytes of module — and a static import runs before any
 * logic, so a cache placed after it can never pay. The door's cost was never the walk.
 *
 * So a receipted door must not import the ledger to decide whether it needs the ledger. `inputs` are file CONTENTS,
 * hashed in about fifteen milliseconds, and `compute` is async so the heavy modules can be imported INSIDE it — reached
 * only on a miss. That is the difference between a receipt that documents the cost and one that removes it.
 */
export async function servedAsync<T>(
  spec: { path: string; inputs: readonly string[]; compute: () => Promise<T> },
  store: ReceiptStore,
): Promise<Served<T>> {
  const digest = receiptDigest(spec.inputs)
  const raw = store.read(spec.path)
  if (raw !== null) {
    try {
      const held = JSON.parse(raw) as { digest?: unknown; value?: unknown }
      if (typeof held.digest === 'string' && held.digest === digest && held.value !== undefined) {
        return { value: held.value as T, hit: true, digest }
      }
    } catch { /* unreadable is absent: one recomputation, never a failed run */ }
  }
  const value = await spec.compute()
  store.write(spec.path, JSON.stringify({ kind: 'door-receipt', digest, value }, null, 2) + '\n')
  return { value, hit: false, digest }
}
