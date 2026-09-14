// tree-writers — THE ONE LIST OF WRITERS A QUIESCENCE PROBE MUST WAIT FOR.
//
// FOUND BY DISAGREEMENT, 2026-09-07. Two probes in this tree ask the same question and answer it differently:
// seal() in scripts/one-receipt waits for `[r]econcile.js` alone, develop's waitForQuiet waits for
// `[r]econcile.js|[l]ean-all.js`. Both are carefully hardened — three-valued, host-shell-named, a probe that
// cannot RUN refuses rather than reporting quiet — and both are hardened around a list that is simply short.
// The hazard they exist for is the mixed-dist one: editing or draining a tree another writer is mid-run on.
//
// THE MEASUREMENT THAT NAMED IT. On this tree, at one moment, four writers ran at once: `land.js --drain-only`,
// `reconcile.js --derive-only`, a chain ending in `lean-heartbeats.js --sync`, and `lean-all.js`. seal() would
// have called that tree QUIET, because land is not reconcile. Three sessions share this checkout, so this is the
// ordinary case and not a corner: the same hour, one session's land failed on three denials another session had
// already committed cures for, and a 108-minute heartbeats measurement was queued over a file that was current.
//
// WHY A SHARED CONSTANT RATHER THAN A LONGER REGEX IN EACH PLACE. A list copied twice drifts, and it already had:
// the drift is the finding. no_instrument_narrower_than_its_question is the tree's own name for this shape — an
// instrument whose domain is narrower than the question it is asked collapses answers it was built to separate.
// A probe that names two of four writers does not report "busy" less often; it reports QUIET when it should not,
// which is the one answer that costs something.
//
// SCOPE, HONESTLY. This is a NAME list, not a derivation: it says which scripts hold the tree, and a script added
// tomorrow is not in it. tree-writers.test.ts is what keeps that from rotting — it fails if any probe in src/
// carries its own writer list instead of this one, so a new writer is added in a single place or not at all.

/** the scripts that write the shared working tree — every quiescence probe waits for all of them */
export const TREE_WRITERS = [
  'reconcile.js',       // regenerates the derived layer in place
  'lean-all.js',        // regenerates every wing's .lean source
  'lean-heartbeats.js', // writes lean/heartbeats.json; a --sync over a fresh wave runs for hours
  'land.js',            // the landing loop: heals, re-derives, seals, stages and pushes
  'one-receipt.js',     // seal() drains and re-seals the tree
] as const

/** grepProbe() → the `ps aux` pattern naming every writer, bracket-escaped so the probe never counts itself.
 *
 *  The bracket trick is load-bearing: `grep "reconcile.js"` matches its own argv and a quiet tree reads as busy
 *  forever. `[r]econcile.js` matches the process but not the grep that looks for it. */
export function grepProbe(): string {
  const alts = TREE_WRITERS.map((w) => `[${w[0]}]${w.slice(1)}`.replace(/\./g, '\\.')).join('|')
  return `ps aux | grep -E "${alts}" | wc -l`
}

/** writerPidsProbe() → the pids of every running tree writer, one per line, from the same list and the same
 *  bracket escape — so a caller can leave out the writers that are ITS OWN ancestry (the landing that started it)
 *  and wait only for a different gate. */
export function writerPidsProbe(): string {
  const alts = TREE_WRITERS.map((w) => `[${w[0]}]${w.slice(1)}`.replace(/\./g, '\\.')).join('|')
  return `ps -eo pid=,args= | grep -E "${alts}" | awk '{print $1}'`
}
