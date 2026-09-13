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

// RECEIPT PER SUPERPOSITION (the captain, 2026-09-12). Each test file is one circuit and its tests one superposition:
// one receipt per file (402 lines, not the 2518-line roll-call this reporter removed) and the TOTAL is the fold of
// those file receipts — a two-level merkle, so the whole verifies from the parts without re-reading a name. The
// definition of the total moved once, here, and receiptFlatOf keeps the old flat fold re-derivable. What this
// proves is exact: which tests passed, per file and in total. The tests prove computation; this folds their names.
export function receiptFlatOf(names: readonly string[]): string { return receiptOf(names) }

export function fileReceiptsOf(byFile: ReadonlyMap<string, readonly string[]>): [string, string, number][] {
  return [...byFile.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, names]) => [file, receiptOf(names), names.length])
}

/** totalOf(fileReceipts) -> the root: a fold over the per-file receipts, so it verifies from the parts. */
export function totalOf(fileReceipts: readonly [string, string, number][]): string {
  return receiptOf(fileReceipts.map(([file, r]) => `${file}${r}`))
}

export default async function* testReceipt(source: AsyncIterable<TestEvent>): AsyncGenerator<string> {
  const byFile = new Map<string, string[]>()
  // THE READING BESIDE THE RECEIPT (2026-09-12). A certification ran 2h30m and the slow superposition was guessed from a
  // file's size — wrongly: the guessed file re-decides in two minutes. The runner reports duration_ms on every event;
  // summed per file it names the slow superposition by measurement. It is a reading, so it never enters the fold.
  const msByFile = new Map<string, number>()
  const failed: { name: string; file: string; message: string }[] = []
  let passedCount = 0
  for await (const event of source) {
    const name = event.data?.name ?? ''
    const file = (event.data?.file ?? '').replace(/^.*\/dist\//, '')
    const ms = Number((event.data as { details?: { duration_ms?: unknown } })?.details?.duration_ms ?? 0)
    if (event.type === 'test:pass' || event.type === 'test:fail') msByFile.set(file, (msByFile.get(file) ?? 0) + (ms === ms ? ms : 0))
    if (event.type === 'test:pass') {
      passedCount += 1
      const bucket = byFile.get(file)
      if (bucket) bucket.push(name); else byFile.set(file, [name])
    } else if (event.type === 'test:fail') {
      // A FAILURE IS EVIDENCE THE MOMENT IT HAPPENS. Held to the end of a two-hour run, it was invisible to every
      // terminal watching; yielded here, it reaches the reader, and the deposit beside it, while the run continues.
      const err = event.data?.details?.error
      const f = { name, file, message: err?.message ?? String(err ?? 'no error reported') }
      failed.push(f)
      yield `✗ ${f.name}\n`
      if (f.file) yield `    ${f.file}\n`
      // THE VALUES RIDE WITH THE VERDICT (2026-09-13): the first line of an assertion is often only "Expected values to
      // be strictly equal:", and the numbers that say why ("28616 !== 28610") are on the lines after it.
      for (const line of f.message.split('\n').filter((l) => l.trim()).slice(0, 6)) yield `    ${line}\n`
    }
  }
  const leaves = fileReceiptsOf(byFile)
  const secs = (file: string): string => `${((msByFile.get(file) ?? 0) / 1000).toFixed(1)}s`
  for (const [file, r, n] of leaves) yield `· ${r}  ${String(n).padStart(4)}  ${secs(file).padStart(8)}  ${file}\n`
  // THE SLOWEST FIVE, NAMED — the reading that turns "the suite is slow" into a file to open.
  const slowest = [...msByFile.entries()].sort(([fa, a], [fb, b]) => b - a || (fa < fb ? -1 : fa > fb ? 1 : 0)).slice(0, 5)   // ties by name: order-invariant
  if (slowest.length) yield `⏱ slowest superpositions: ${slowest.map(([f, ms]) => `${f} ${(ms / 1000).toFixed(1)}s`).join(' · ')}\n`
  const total = passedCount + failed.length
  const root = totalOf(leaves)
  yield failed.length === 0
    ? `✓ tests — ${passedCount}/${total} pass in ${leaves.length} superpositions, receipt ${root} (root = fold of the ${leaves.length} file receipts above)\n`
    : `✗ tests — ${failed.length} of ${total} FAILED, ${passedCount} pass, receipt ${root}\n`
}
