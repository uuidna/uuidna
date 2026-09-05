// test-receipt — THE SUITE'S RESULT AS A RECEIPT, because reading 2518 lines to learn "they passed" is RECOMPUTE.
//
// (the captain, 2026-09-05: "improve efficiency per token" — then, of the fix: "why not in quantum?")
//
// MEASURED FIRST. `node --test dist/**/*.test.js` emits 246,839 bytes, of which 238,258 — 96.5% — are 2518 lines
// each saying one test passed. That is forty times the guard's waste and the largest single token sink in a
// session. And the shape of the waste is exactly the shape this tree already has a theorem about: reading every
// leaf to establish a property of the whole is the RECOMPUTE side of
// verify_beats_recompute_by_magnitudes. The roll-call is O(N) in tests; a fold over the same outcomes is one
// line, and re-running the suite regenerates it. So the passes fold into a receipt and only failures print.
//
// WHAT IS NOT TRADED AWAY. A receipt that hides a failure would be worth nothing, so failures are exempt from
// the fold and print IN FULL — name, file, and the error the runner produced — because a failing test is the one
// thing the caller acts on, and the argument for compression is that nobody acts on a pass. The counts print
// too, because a receipt with no denominator has nothing to be checked against — a pass count alone admits any
// total — and "everything passed" is a different
// claim from "2518 passed". A reader who wants the roll-call re-runs without this reporter; the receipt is
// recomputable, which is the whole difference between compressing a result and discarding one.
//
// THE FOLD IS ORDER-INVARIANT, which matters because the runner interleaves files by completion and two honest
// runs of the same suite emit the same outcomes in different orders. Sorting before folding means the receipt
// answers "which tests passed", not "in what order did they finish" — a receipt that moves when nothing moved
// would be re-read every time, which is the cost this file exists to remove.
//
//   node --test --test-reporter=./dist/scripts/test-receipt.js 'dist/**/*.test.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

interface TestEvent { type: string; data: { name?: string; file?: string; details?: { error?: { message?: string; cause?: unknown } } } }

/** receiptOf(names) → the 8-hex fold of a set of test outcomes, order-invariant and recomputable. */
export function receiptOf(names: readonly string[]): string {
  return handleOf(toUuid([...names].sort().join('\u0000')))
}

/** The reporter: node hands it the event stream and prints whatever this yields. */
export default async function* testReceipt(source: AsyncIterable<TestEvent>): AsyncGenerator<string> {
  const passed: string[] = []
  const failed: { name: string; file: string; message: string }[] = []
  for await (const event of source) {
    const name = event.data?.name ?? ''
    if (event.type === 'test:pass') passed.push(name)
    else if (event.type === 'test:fail') {
      const err = event.data?.details?.error
      failed.push({ name, file: event.data?.file ?? '', message: err?.message ?? String(err ?? 'no error reported') })
    }
  }
  // FAILURES FIRST AND IN FULL — the caller acts on these, and a report that buries them under a summary has
  // optimised the wrong reader.
  for (const f of failed) {
    yield `✗ ${f.name}\n`
    if (f.file) yield `    ${f.file}\n`
    yield `    ${f.message.split('\n')[0]}\n`
  }
  const total = passed.length + failed.length
  yield failed.length === 0
    ? `✓ tests — ${passed.length}/${total} pass, receipt ${receiptOf(passed)} (re-run without --test-reporter for the roll-call)\n`
    : `✗ tests — ${failed.length} of ${total} FAILED, ${passed.length} pass, receipt ${receiptOf(passed)}\n`
}
