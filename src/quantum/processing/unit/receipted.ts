// receipted — THE ONE DOOR EVERY TEST WALKS THROUGH. Standard (the captain, 2026-09-11): every test carries a
// computational receipt, and time and temperature are recorded beside it as READINGS. The receipt is the deterministic
// part: the fold of every amplitude vector the test produced and the count of every mintOf doubling; two honest runs
// fold to the same receipt. The readings are the measured part: the wall time of the test body in nanoseconds from the
// process clock, and a temperature — QPU_TEMPERATURE_MILLIKELVIN with its QPU_TEMPERATURE_SOURCE when supplied, else on
// macOS the battery gauge, named as such in its source, else unmeasured and said so. Readings never enter the fold and
// never enter src, so the served unit and the committed receipt carry no entropy; the reporter writes them to a sidecar.
import { appendFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { test as nodeTest, type TestContext, type TestOptions } from 'node:test'
import { foreignReadsOf, qpuMintReceiptOf, mintScopeOpenOf, qpuReceiptFoldOf, receiptLedgerOf, servedLedgerOf } from './index.js'

/** One receipts file PER RUN, named by the run: a test worker's parent is the `node --test` process the reporter runs in,
 * so workers append to the reporter's pid and the reporter reads its own. Two suites in one tree no longer share a file,
 * which is how a concurrent run once erased another's rows and failed honest tests as "computed nothing". */

/**
 * WAS THE HOST READ? — which is not the same question as whether it answered.
 *
 * `live` says a response came back. `holds` says the response was usable. The first version of this predicate
 * checked only `live`, and a host answering 503 sets `live: true` on every record — so a run against a host in
 * maintenance took the REACHED branch, asserted the readings, and failed on numbers the host never supplied.
 * Measured with the host forced to 503: two tests red, neither of them about anything in this repository.
 *
 * A reading is owed only when every record both answered and held. Anything else — refused, 503, a captive
 * portal's HTML, a partial answer — is the third state, and the caller's unreached branch handles it.
 */
/** One door's own verdict: it was READ when it answered and the answer held. Its negation is the third state. */
export const rowRead = (row: { live?: boolean; holds?: boolean }): boolean => row.live === true && row.holds === true

/** The negation, named, because `row.live === false` was written five times and is wrong for a 503 every time. */
export const rowUnread = (row: { live?: boolean; holds?: boolean }): boolean => !rowRead(row)

export const liveReached = (live?: { records?: { live: boolean; holds: boolean }[] }): boolean =>
  live?.records !== undefined && live.records.length > 0 && live.records.every(rowRead)

/**
 * A STORE READING, JUDGED AS A READING RATHER THAN AS THE STORE.
 *
 * storage_monitor reports how many keys carry all fourteen of their shares; storage_catalog folds it in. When a
 * key loses redundancy both report holds false, and the deploy gate asserted holds true on every read tool — so
 * ONE un-mirrored link turned every deploy red, including the deploy that would carry the repair. Three pushes
 * were blocked by it while the code that found it worked perfectly. A monitor that finds something and says so
 * is not a broken monitor, and the store's contents are not the build.
 *
 * The store fault belongs to `hostLeadsOf`, which already names it, its count and what it owes. What stays a
 * gate is whether the INSTRUMENT is sound, and that is this function: an instrument that stops noticing — a gap
 * in the shares with nothing reported missing — is a fault here, and so is one that notices and claims to hold
 * anyway. Both are properties of the code.
 *
 * It returns the faults it found rather than a boolean, because "the monitor is wrong" is not something a caller
 * can act on and "verified + missing is 248, keys is 249" is.
 */
export type QpuMonitorReading = {
  keys: number
  shares: number
  expected: number
  missing: number
  verified: number
  incomplete: { key: string; faces: number[] }[]
}

export const monitorFaultsOf = (monitor: QpuMonitorReading, holds: boolean | undefined, faces = 14): string[] => {
  const faults: string[] = []
  if (monitor.verified + monitor.missing !== monitor.keys)
    faults.push(`verified ${monitor.verified} + missing ${monitor.missing} is not keys ${monitor.keys}`)
  if (monitor.expected !== monitor.keys * faces) faults.push(`expected ${monitor.expected} is not ${monitor.keys} keys times ${faces} faces`)
  if (monitor.missing === 0 && monitor.shares !== monitor.expected)
    faults.push(`nothing reported missing, yet ${monitor.expected - monitor.shares} share(s) are absent`)
  if (monitor.missing > 0 && holds === true) faults.push(`${monitor.missing} key(s) reported missing, and the reading still claims to hold`)
  /* The named entries cap at one per face; when the whole gap fits under that cap the arithmetic must close
   * exactly, which is what catches an instrument that has stopped counting what it is still reporting. */
  if (monitor.missing > 0 && monitor.missing <= faces) {
    if (monitor.incomplete.length !== monitor.missing)
      faults.push(`${monitor.missing} key(s) missing and ${monitor.incomplete.length} named — under the cap every one is named, not just counted`)
    const absent = monitor.incomplete.reduce((sum, row) => sum + row.faces.length, 0)
    if (monitor.shares !== monitor.expected - absent)
      faults.push(`shares ${monitor.shares} does not agree with ${monitor.expected} expected less ${absent} named as absent`)
  }
  return faults
}

export const receiptsFileOf = (run: number): string => `test-receipts.${run}.jsonl`
export const RECEIPTS_FILE = receiptsFileOf(process.ppid)
/** THE INSTRUMENT IS NAMED (2026-09-12). A number without its instrument is unfalsifiable; so by construction
 *  QPU_TEMPERATURE_SOURCE names the sensor and is carried beside the millikelvin as a reading; when it is absent the source says so. */
export type Temperature = { measured: true; millikelvin: number; source: string } | { measured: false; why: string }
export type TestReceipt = {
  name: string
  computations: number
  kinds: Record<string, number>
  /** how many computations ran at each register dimension. A sparse run holds only its nonzero entries, far fewer than its
   * dimension. Keyed by the exact decimal when it is a safe integer, otherwise by `2^qubits`, exact either way. */
  dims: Record<string, number>
  /** the largest register dimension this test computed on, in the same exact text; '0' when it computed nothing */
  dim: string
  /** log2 of that largest dimension */
  qubits: number
  receipt: string
  /** exact integer amplitudes of every distinct recorded state this test produced, with how many ledger rows carried each */
  states: { name: string; dim: number; amplitudes: readonly string[]; rows: number }[]
  mint: { calls: number; chain: string }
  /** documents served from the isolate's memo during this test, with the fold of each — computed once, earlier; a third
   * state beside computed and nothing, and part of the proof */
  served: { count: number; folds: string[] }
  /** how many hosts this test asked that this tree does not own. Zero means every number in this row was computed
   *  here, so the row belongs in the proof; above zero means the row records what somebody else's host did or did
   *  not say, which is a reading. */
  foreign: number
  /** MEASURED, never folded. `pid` is the worker that ran the test: files execute in separate processes, so
   *  without it the wall cannot be divided into parallel paths and every test appears to be on one. It varies
   *  between runs, which is exactly why it is a reading and would wreck the proof if it were not. */
  readings: { temperature: Temperature; pid: number }
}

const unmeasured: Temperature = { measured: false, why: 'no QPU_TEMPERATURE_MILLIKELVIN supplied and no battery gauge read on this host' }

/** THE DEVICE'S OWN SENSOR, WHEN NO LAB READING IS GIVEN (the captain, 2026-09-13: "fuse device sensors to provide
 *  hardware evidence"). On macOS the battery gauge reports its temperature in hundredths of a degree Celsius; the raw
 *  value and that conversion ride in the source so the number can be doubted. It is the pack's temperature, not the
 *  chip die's, and the source says so. No serial or other device identifier is recorded: receipts are published. */
export const sensorTemperatureOf = (read: () => string): Temperature => {
  try {
    const raw = /"Temperature" = (\d+)/.exec(read())?.[1]
    if (raw === undefined) return { measured: false, why: 'the battery gauge reported no Temperature on this host' }
    return { measured: true, millikelvin: Number(raw) * 10 + 273150, source: `battery gauge, ioreg AppleSmartBattery Temperature ${raw} (hundredths of °C), not the chip die` }
  } catch {
    return unmeasured
  }
}

const batteryGauge = (): string => execFileSync('ioreg', ['-r', '-n', 'AppleSmartBattery'], { encoding: 'utf8', timeout: 2000 })

export const temperatureOf = (env = process.env): Temperature => {
  const raw = env.QPU_TEMPERATURE_MILLIKELVIN
  const millikelvin = raw === undefined ? NaN : Number(raw)
  if (millikelvin === millikelvin && raw !== undefined && raw !== '')
    return { measured: true, millikelvin, source: env.QPU_TEMPERATURE_SOURCE?.trim() || 'QPU_TEMPERATURE_MILLIKELVIN (instrument unnamed)' }
  return process.platform === 'darwin' ? sensorTemperatureOf(batteryGauge) : unmeasured
}

type Fn = (t: TestContext) => void | Promise<void>

/** Distinct states, each counted: the same Bell state recorded a thousand times is one state carried by a thousand rows. */
const statesOf = (slice: ReturnType<typeof receiptLedgerOf>): TestReceipt['states'] => {
  const seen = new Map<string, TestReceipt['states'][number]>()
  for (const r of slice) {
    if (r.amplitudes === undefined) continue
    const key = `${r.name}:${r.dim}:${r.amplitudes.join(',')}`
    const prior = seen.get(key)
    if (prior) prior.rows += 1
    else seen.set(key, { name: r.name, dim: r.dim, amplitudes: r.amplitudes, rows: 1 })
  }
  return [...seen.values()]
}

const receipted = (name: string, fn: Fn) => async (t: TestContext): Promise<void> => {
  const from = receiptLedgerOf().length
  const servedFrom = servedLedgerOf().length
  const mintFrom = qpuMintReceiptOf()
  const foreignFrom = foreignReadsOf()
  // open a fresh mint scope, so this row's chain folds THIS test's doublings and not the whole process's history
  mintScopeOpenOf()
  try {
    await fn(t)
  } finally {
    const slice = receiptLedgerOf().slice(from)
    const mintTo = qpuMintReceiptOf()
    const kinds: Record<string, number> = {}
    for (const r of slice) kinds[r.name] = (kinds[r.name] ?? 0) + 1
    const dims: Record<string, number> = {}
    let qubits = 0
    let dim = '0'
    for (const r of slice) {
      const q = r.qubits ?? Math.log2(r.dim)
      const key = Number.isSafeInteger(r.dim) ? String(r.dim) : `2^${q}`
      dims[key] = (dims[key] ?? 0) + 1
      if (q > qubits) {
        qubits = q
        dim = key
      }
    }
    const row: TestReceipt = {
      name,
      computations: slice.length,
      kinds,
      dims,
      dim,
      qubits,
      receipt: qpuReceiptFoldOf(slice),
      states: statesOf(slice),
      mint: { calls: mintTo.calls - mintFrom.calls, chain: mintScopeOpenOf() },
      served: { count: servedLedgerOf().length - servedFrom, folds: [...new Set(servedLedgerOf().slice(servedFrom).map((r) => r.fold))] },
      foreign: foreignReadsOf() - foreignFrom,
      readings: { temperature: temperatureOf(), pid: process.pid },
    }
    appendFileSync(join(process.cwd(), RECEIPTS_FILE), `${JSON.stringify(row)}\n`)
  }
}

export function test(name: string, fn: Fn): Promise<void>
export function test(name: string, options: TestOptions, fn: Fn): Promise<void>
export function test(name: string, a: TestOptions | Fn, b?: Fn): Promise<void> {
  if (typeof a === 'function') return nodeTest(name, receipted(name, a))
  return nodeTest(name, a, receipted(name, b as Fn))
}
