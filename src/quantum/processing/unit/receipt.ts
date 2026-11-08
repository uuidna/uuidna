// receipt — THE SUITE'S RESULT AS COMPUTATIONAL RECEIPTS, PROOF APART FROM READINGS. Standard (the captain,
// 2026-09-11): every test carries a computational receipt; time and temperature are recorded beside it as
// readings; the receipt itself carries no entropy. Every test file imports `test` from ./receipted.js — the door that
// appends each test's ledger slice and readings to test-receipts.jsonl from inside the test process. This reporter
// folds that file into two artifacts:
//   test-receipt.json  — the PROOF: names, pass/fail, amplitude folds, mint chains, kinds. Deterministic; committed.
//   test-readings.json — the READINGS: wall time per test, temperature (measured or unmeasured, said which), every
//                        row that asked a host this tree does not own, and the
//                        cracks those readings name — an unresolved clock, an unmeasured thermometer. Gitignored.
// A top-level test with no computation, no mintOf call and no memo-served document is dry, and a dry test FAILS the
// run. Recomputable: re-run and the proof returns byte for byte.
//
//   node --test --test-reporter=./dist/quantum/processing/unit/receipt.js dist/quantum/processing/unit/*.test.js
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { foldOf } from './index.js'
import { receiptsFileOf, type TestReceipt } from './receipted.js'

interface TestEvent { type: string; data: { name?: string; file?: string; nesting?: number; details?: { error?: { message?: string } } } }
interface Row { name: string; file: string; nesting: number; pass: boolean; computations: number; kinds: Record<string, number>; dims: Record<string, number>; dim: string; qubits: number; receipt: string; states: TestReceipt['states']; mint: { calls: number; chain: string }; served: { count: number; folds: string[] }; foreign: number }

/** This run's receipts: the file workers wrote under this process's pid, or, when tests ran in this very process
 * (--test-isolation=none), the one written under its parent. Never another run's. */
const receiptsOf = (): Map<string, TestReceipt> => {
  const own = join(process.cwd(), receiptsFileOf(process.pid))
  const path = existsSync(own) ? own : join(process.cwd(), receiptsFileOf(process.ppid))
  const map = new Map<string, TestReceipt>()
  if (!existsSync(path)) return map
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    if (!line.trim()) continue
    const row = JSON.parse(line) as TestReceipt
    map.set(row.name, row)
  }
  unlinkSync(path)
  return map
}

export default async function* receipt(source: AsyncIterable<TestEvent>): AsyncGenerator<string> {
  const events: { name: string; file: string; nesting: number; pass: boolean; message: string }[] = []
  for await (const event of source) {
    if (event.type !== 'test:pass' && event.type !== 'test:fail') continue
    const err = event.data?.details?.error
    events.push({
      name: event.data?.name ?? '',
      // relative to the repo, never absolute: an absolute path carries the machine's home directory into the proof,
      // and the proof must fold the same on a laptop, a runner, and the host
      file: relative(process.cwd(), event.data?.file ?? '') || '',
      nesting: event.data?.nesting ?? 0,
      pass: event.type === 'test:pass',
      message: event.type === 'test:fail' ? (err?.message ?? String(err ?? 'no error reported')) : '',
    })
  }
  const receipts = receiptsOf()
  const none: TestReceipt = { name: '', computations: 0, kinds: {}, dims: {}, dim: '0', qubits: 0, receipt: foldOf(''), states: [], mint: { calls: 0, chain: '' }, served: { count: 0, folds: [] }, foreign: 0, readings: { temperature: { measured: false, why: 'no record' }, pid: 0 } }
  const rows: Row[] = events.map((e) => {
    const got = receipts.get(e.name) ?? none
    return { name: e.name, file: e.file, nesting: e.nesting, pass: e.pass, computations: got.computations, kinds: got.kinds, dims: got.dims, dim: got.dim, qubits: got.qubits, receipt: got.receipt, states: got.states, mint: got.mint, served: got.served ?? { count: 0, folds: [] }, foreign: got.foreign ?? 0 }
  })
  const failed = events.filter((e) => !e.pass)
  for (const f of failed) {
    yield `✗ ${f.name}\n`
    if (f.file) yield `    ${f.file}\n`
    for (const line of f.message.split('\n').slice(0, 6)) yield `    ${line}\n`
  }
  // subtests ride their parent's receipt; the standard judges the top-level tests
  // three states: computed, served from the isolate's memo (its fold recorded), or nothing — only nothing is dry
  const dry = rows.filter((r) => r.nesting === 0 && r.computations === 0 && r.mint.calls === 0 && r.served.count === 0)
  const servedOnly = rows.filter((r) => r.nesting === 0 && r.computations === 0 && r.mint.calls === 0 && r.served.count > 0).length
  for (const r of dry) yield `✗ no computational receipt — ${r.name} (${r.file}) computed nothing\n`
  const pass = rows.filter((r) => r.pass).length
  const circuit = rows.filter((r) => r.nesting === 0 && r.computations > 0).length
  const mintOnly = rows.filter((r) => r.nesting === 0 && r.computations === 0 && r.mint.calls > 0).length
  const largest = rows.reduce((top, r) => (r.qubits > top.qubits ? r : top), { dim: '0', qubits: 0, name: '' } as Pick<Row, 'dim' | 'qubits' | 'name'>)
  const sorted = [...rows].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  /**
   * THE PROOF FOLDS WHAT THIS TREE COMPUTED. WHAT A THIRD PARTY SAID IS A READING.
   *
   * The standard here is that two honest runs fold to the same receipt, and `npm run proof` enforces it by asking
   * git whether the file moved. That held for time and temperature, which were moved to readings on day one, and
   * it did not hold for the network.
   *
   * MEASURED, not argued. The suite was run with opendata.cern.ch forced into each of the four shapes a third
   * party actually fails in — connection refused, 503, a 200 carrying a captive portal's HTML, and a socket that
   * hangs to the deadline — and then three times in one fixed condition. Within a condition the fold is stable to
   * the byte. Across conditions exactly five of a hundred and sixty-two rows moved, and every one of them had
   * called a foreign door: when CERN answers, the readers build documents and mint doublings that a refused run
   * never builds. The receipt was not wrong; it was faithfully recording that less computation happened.
   *
   * So it is not both a fold of the computation performed and invariant under someone else's weather — by construction one excludes the other — and
   * `npm run proof` was asking for the second while the file delivered the first. It rejected two pushes that way,
   * naming this repository for something that had not happened here.
   *
   * The split is the three-state law applied to the receipt itself. A row that asked nobody is computed, and it is
   * the proof. A row that asked somebody records what that host did or did not say, which is not decidable here,
   * and it folds separately into `reading` — reported in full, gated by nothing. Both folds are written, so a run
   * that quietly stops reaching CERN is still visible; it simply is not a build failure.
   *
   * Served folds are on the reading side for the same reason, and dryness is judged before the split so a test
   * cannot escape the dry-clean by talking to a host instead of computing.
   */
  const computed = sorted.filter((r) => r.foreign === 0)
  const read = sorted.filter((r) => r.foreign > 0)
  const fold = foldOf(computed.map((r) => `${r.name}:${r.pass}:${r.receipt}:${r.mint.chain}`).join('\u0000'))
  const reading = foldOf(read.map((r) => `${r.name}:${r.pass}:${r.receipt}:${r.mint.chain}:${r.served.folds.join(',')}`).join('\u0000'))
  const foreignReads = rows.reduce((acc, r) => acc + r.foreign, 0)
  const proof = {
    kind: 'test-receipt',
    standard:
      'every top-level test carries a computational receipt: amplitude folds, a mint chain, or served folds. The proof folds only the rows that asked no foreign host, because a row that asked one records what that host said and not what this tree computed; time, temperature, served folds and every foreign-reading row are readings',
    tests: rows.length,
    pass,
    fail: rows.length - pass,
    dry: dry.length,
    circuit,
    mintOnly,
    servedOnly,
    dim: largest.dim,
    qubits: largest.qubits,
    receipt: fold,
    /* HOW MANY ROWS THE PROOF COVERS AND HOW MANY IT SET ASIDE. Both counts are properties of the suite — which
     * tests call a foreign door — and not of the network, so they belong here. How MANY TIMES those doors were
     * asked is not: a refused reading retries where a read one does not, and the count moved 87 to 205 between a
     * reached run and a blocked one. It lives in the readings with everything else that the weather decides. */
    computed: computed.length,
    readRows: read.length,
    readingsOf: 'test-readings.json',
    /* AND ONLY THE COMPUTED ROWS. The fold was split and the FILE was not, so `npm run proof` — which diffs the
     * whole artifact, not the fold — still went red under an outage: three foreign rows carried the computations
     * and mint chains a reached run performed, right there in the committed file beside a fold that no longer
     * depended on them. A gate reads the file. The split has to reach the file. */
    rows: rows.filter((r) => r.foreign === 0),
  }
  writeFileSync(join(process.cwd(), 'test-receipt.json'), `${JSON.stringify(proof, null, 2)}\n`)
  // readings: measured, per test, never folded, never committed
  const timed = events.filter((e) => e.nesting === 0).map((e) => ({ name: e.name, ...(receipts.get(e.name) ?? none).readings }))
  const cracks = [
    ...(timed.some((r) => r.temperature.measured) ? [] : [{ kind: 'temperature', name: 'host', why: timed[0]?.temperature.measured === false ? timed[0].temperature.why : 'no reading' }]),
  ]
  const readings = {
    kind: 'test-readings',
    receipt: fold,
    temperature: timed[0]?.temperature ?? none.readings.temperature,
    cracks,
    /** what the hosts this tree does not own said this run, folded apart and reported in full, gated by nothing */
    foreign: { fold: reading, reads: foreignReads, rows: rows.filter((r) => r.foreign > 0) },
    /**
     * THE CLOCK AROUND THE TESTS, WHICH NOTHING RECORDED.
     *
     * Per-test time has been written since day one and the sum of it is not the run: test files execute in
     * parallel worker processes, so the wall time is the critical path plus whatever the harness costs to
     * start, load and report. That remainder is the only part of a run that is neither computation nor
     * somebody else's host, and it was invisible because nobody wrote the wall down beside the parts.
     *
     * process.uptime() in the reporter is the parent's lifetime: module load, every worker, and the fold
     * itself. Measured, so it is a reading and never enters the proof.
     */
    process: { uptimeNs: Math.round(process.uptime() * 1e9), pid: process.pid },
    rows: timed,
  }
  writeFileSync(join(process.cwd(), 'test-readings.json'), `${JSON.stringify(readings, null, 2)}\n`)
  if (dry.length > 0 || failed.length > 0) process.exitCode = 1
  yield failed.length === 0 && dry.length === 0
    ? `✓ tests — ${pass}/${rows.length} pass; ${circuit} ran the circuit, ${mintOnly} mint-only, ${servedOnly} served-only, largest dim 2^${largest.qubits} (${largest.name.split(':')[0]}); receipt ${fold}; temperature ${readings.temperature.measured ? `${(readings.temperature as { millikelvin: number }).millikelvin} mK` : 'unmeasured'}, cracks ${cracks.length}\n`
    : `✗ tests — ${failed.length} failed, ${dry.length} without computational receipt, ${pass}/${rows.length} pass, receipt ${fold}\n`
}
