#!/usr/bin/env node
// bench-hexbit — IS THE HEXBIT THE FASTEST THING THIS TREE COMPUTES? Measured, per primitive, re-runnable.
//
// The captain asserted it (2026-09-04: "hexbits compute faster than all else") and asked for the benchmark. The
// answer split, which is why this exists as a script rather than a one-off: the hexbit UNIT is the fastest
// operation here by a wide margin, and the hexbit DOOR — the composite every MCP response builds — was the
// SLOWEST, slower than native sha256. A claim that is true of a primitive and false of the composite built from
// it is exactly the kind that needs a re-runnable measurement attached.
//
// WHAT THE FIRST RUN FOUND. compileToHexbits read `address.replace(/-/g,'').split('').map(c => parseInt(c,16))`:
// a regex match, a fresh string, a 32-element array of one-character strings, and 32 parseInt calls on strings
// of length one — 1166 ns to read 32 nibbles. Rewritten as arithmetic over character codes it is ~140 ns, and
// hexbitDoorOf fell from 1489 to ~450 ns. Output is byte-identical, asserted over the whole ledger.
//
// AND WHAT IT FOUND SECOND, which is why the numbers stay here: preallocating the result array instead of
// pushing saves about 2 percent. Measured, not assumed — and not adopted, because 2 percent does not buy added
// complexity in a correctness-critical path. A benchmark that only records wins teaches nobody where the floor is.
//
// @non-harmonic: reads the process clock to time operations — timing IS the measurement, and the boundary is here
import { hexbitsOf, hexbitDoorOf, compileToHexbits, valueOf, UUID_HEXBITS } from '../hexbit/index.js'
import { handleOf } from '../handle.js'
import { toUuid, merkleFold } from '../address.js'
import { THEOREMS } from '../theorems/index.js'

export interface BenchRow { name: string; nsPerOp: number; opsPerSecond: number; iterations: number }

/** timed(name, fn, n) → one row. Warms first, then times n iterations of the same call. */
export function timed(name: string, fn: () => unknown, n: number): BenchRow {
  fn()
  const t0 = process.hrtime.bigint()
  for (let i = 0; i < n; i++) fn()
  const ns = Number(process.hrtime.bigint() - t0)
  // integer division by remainder — Math.* is hard-rejected tree-wide
  const per = ns / n
  return { name, nsPerOp: per, opsPerSecond: (n * 1_000_000_000) / ns, iterations: n }
}

export interface HexbitBench {
  rows: BenchRow[]
  fastest: string
  slowest: string
  /** true when the hexbit UNIT is the fastest row — the captain's claim, at the primitive */
  unitIsFastest: boolean
  /** true when no hexbit COMPOSITE is the slowest row — the claim, at the composite */
  compositeNotSlowest: boolean
}

/** benchHexbit(n) → every primitive, timed against the hexbit unit. */
export function benchHexbit(n = 200_000): HexbitBench {
  const addr = THEOREMS[0]?.address ?? toUuid('bench')
  const handle = handleOf(addr)
  const rows = [
    timed('hexbitsOf (the unit)', () => hexbitsOf(UUID_HEXBITS), n),
    timed('toUuid (FNV-1a)', () => toUuid('x'), n),
    timed('compileToHexbits', () => compileToHexbits(addr), n),
    timed('handleOf', () => handleOf(addr), n),
    timed('valueOf', () => valueOf(handle), n),
    timed('merkleFold (2 leaves)', () => merkleFold([addr, addr]), n),
    timed('hexbitDoorOf (composite)', () => hexbitDoorOf(addr), n),
  ]
  const sorted = [...rows].sort((a, b) => a.nsPerOp - b.nsPerOp)
  const fastest = sorted[0]!.name
  const slowest = sorted[sorted.length - 1]!.name
  return {
    rows,
    fastest,
    slowest,
    unitIsFastest: fastest.startsWith('hexbitsOf'),
    compositeNotSlowest: !slowest.startsWith('hexbitDoorOf'),
  }
}

const isMain = process.argv[1]?.endsWith('bench-hexbit.js') ?? false
if (isMain) {
  const b = benchHexbit()
  console.log('bench-hexbit — is the hexbit the fastest thing this tree computes?\n')
  console.log('  operation                      ns/op      Mops/s')
  for (const r of [...b.rows].sort((x, y) => x.nsPerOp - y.nsPerOp))
    console.log(`  ${r.name.padEnd(28)} ${r.nsPerOp.toFixed(1).padStart(8)} ${(r.opsPerSecond / 1_000_000).toFixed(2).padStart(11)}`)
  console.log(`\n  fastest: ${b.fastest}\n  slowest: ${b.slowest}`)
  console.log(`\n  the UNIT is fastest        : ${b.unitIsFastest ? 'YES — the claim holds at the primitive' : 'NO'}`)
  console.log(`  no COMPOSITE is slowest    : ${b.compositeNotSlowest ? 'YES' : 'NO — the door is the slowest thing here, which is where the cost hides'}`)
  console.log('\n  HONEST SCOPE: wall-clock on one machine, one process, warm. The ORDERING is the finding;')
  console.log('  the absolute figures move with the host and are not sealed as theorems.')
}
