// test-shards — THE SUITE ACROSS THE IDLE CORES, WITH THE SAME RECEIPT (the captain, 2026-09-14: "why not split as
// advised?"). Measured that day: the certification ran as one node process at 100% of one core while nine sat idle
// (59% of the machine idle), about 22 minutes for 386 files. The receipt already folds per file — its root is the fold
// of the file receipts — so any partition of the files merges back to the identical root; splitting changes the
// wall-clock, never the verdict. How many shards run at once is memory's decision, not this module's (memory-pool.ts).
// Pure.

/** shardOfAddress(address, n) → which of n slices a theorem belongs to, decided by where its address seats.
 *
 *  FILE SHARDING HAS A FLOOR AND THE FLOOR IS THE SLOWEST FILE. shardsOf below balances files by their measured
 *  seconds, which is already derived rather than assigned — but no partition of FILES can finish sooner than the
 *  longest one, and the longest are the whole-ledger sweeps: rosetta-legs 213 s, mcp-edge-coverage 143 s,
 *  involution 128 s, each walking all 71017 theorems in one process (measured in the landing suite, 2026-09-18).
 *  Splitting the LEDGER removes that floor, and the split must not be a hand-drawn range.
 *
 *  THE LATTICE ALREADY DECIDES IT. Every theorem's content-address seats at a four-hex station, so the station
 *  modulo n is a partition that is total (every theorem lands in exactly one slice), stable (the address decides,
 *  so the same theorem lands in the same slice on every machine and every run), and balanced by construction
 *  rather than by tuning — addresses are content-derived, so they spread. Nothing is listed and nothing is chosen.
 */
export const shardOfAddress = (address: string, n: number): number => {
  if (!Number.isInteger(n) || n < 1) throw new Error(`test-shards: ${n} slices is not a partition`)
  const station = address.replace(/-/g, '').slice(0, 4)
  return parseInt(station, 16) % n
}

/** a file's receipt line from test-receipt: [file, receipt, tests, seconds] */
export type Leaf = [file: string, receipt: string, tests: number, seconds: number]

export interface ShardOutput { leaves: Leaf[]; peakBytes: number | null; passed: number; failed: number }

/** shardsOf(files, seconds, n) → at most n shards covering every file exactly once, balanced by each file's measured
 *  seconds (longest first, each to the lightest shard). A file with no reading weighs the mean of those that have one,
 *  or one second when none has. Empty shards are dropped. */
export function shardsOf(files: readonly string[], seconds: Readonly<Record<string, number>>, n: number): string[][] {
  const known = files.map((f) => seconds[f]).filter((s): s is number => typeof s === 'number' && s >= 0)
  const mean = known.length ? known.reduce((a, b) => a + b, 0) / known.length : 1
  const weight = (f: string): number => (typeof seconds[f] === 'number' && seconds[f]! >= 0 ? seconds[f]! : mean)
  const count = Number.isInteger(n) && n > 0 ? n : 1
  const shards = Array.from({ length: count }, () => ({ files: [] as string[], load: 0 }))
  for (const f of [...files].sort((a, b) => weight(b) - weight(a) || (a < b ? -1 : a > b ? 1 : 0))) {
    const lightest = shards.reduce((m, s) => (s.load < m.load ? s : m), shards[0]!)
    lightest.files.push(f); lightest.load += weight(f)
  }
  return shards.map((s) => s.files).filter((s) => s.length > 0)
}

/** parseShardOutput(text) → what one runner's receipt reporter printed: its file receipts, its peak and its counts */
export function parseShardOutput(text: string): ShardOutput {
  const leaves: Leaf[] = []
  let peakBytes: number | null = null, passed = 0, failed = 0
  for (const line of text.split('\n')) {
    const leaf = line.match(/^· ([0-9a-f]{8})\s+(\d+)\s+([\d.]+)s\s+(.+)$/)
    if (leaf) { leaves.push([leaf[4]!, leaf[1]!, Number(leaf[2]), Number(leaf[3])]); continue }
    const peak = line.match(/^⚖ peak (\d+) bytes/)
    if (peak) { peakBytes = Number(peak[1]); continue }
    const ok = line.match(/^✓ tests — (\d+)\/(\d+) pass/)
    if (ok) { passed = Number(ok[1]); failed = Number(ok[2]) - Number(ok[1]); continue }
    const bad = line.match(/^✗ tests — (\d+) of (\d+) FAILED, (\d+) pass/)
    if (bad) { failed = Number(bad[1]); passed = Number(bad[3]) }
  }
  return { leaves, peakBytes, passed, failed }
}

/** a reporter line this module merges rather than forwards — the leaves, the slowest five, the peak and the total */
export const isMergedLine = (line: string): boolean => /^(· [0-9a-f]{8}\s|⏱ slowest|⚖ peak|✓ tests —|✗ tests —)/.test(line)
