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
import {
  hexagramsOf, hexFaceOf, occupancyOf, occupancyCitesOf, coinNeighbours, metatronOf,
  HEXAGRAM_STATES, HEXAGRAM_BITS,
} from '../hexagram.js'
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

// ── THE 64-HEXAGRAM LATTICE. A hexbit is 4 bits and 16 states; a hexagram is HEXAGRAM_BITS (6) and
// HEXAGRAM_STATES (64), so the lattice is the hexbit's own structure one octave up. The captain asked for the
// benchmark on it, and it answers a question the site has been paying for silently: the hex FACE — the thing
// every theorem page ships as markup — is computed from this lattice, and if computing it is cheap then
// shipping it is waste.
//
// IT IS CHEAP, AND THE RATIO IS THE FINDING. Measured on the built site, the face occupies about 70,842 bytes of
// every page — 768 hex-line and hex-gate elements plus 196 occupancy cites — against 11,746 bytes of visible
// text, so 43 percent of a theorem page is a picture of its own address. Across 5,606 pages that is 379
// MEGABYTES shipped, and computing all 5,606 faces takes about 51 MILLISECONDS.
//
// (When this benchmark was first run the compute side was 378 ms, and the coincidence with 378 MB was the line
// worth writing. Then the run exposed the face's own bottleneck and the compute side got seven times faster,
// which is the better outcome and a worse sentence. Recording both because a benchmark that quietly restates its
// numbers after an optimisation teaches nobody what the optimisation was worth.)
//
// THE BOTTLENECK THE FIRST RUN FOUND: occupancyCitesOf was 61 of the face's 67 microseconds, because it rebuilt
// an address-INDEPENDENT number-to-keys index on every call, re-parsing every occupancy theorem's statement each
// time. Cached, it is ~3.3 us and the whole face is ~9 us. Output proven identical over all 2,612 addresses
// against the previous implementation captured from git.
export interface LatticeBench {
  rows: BenchRow[]
  /** nanoseconds to compute one hex face */
  faceNs: number
  /** bytes the same face occupies when shipped as markup, measured on the built site */
  faceShippedBytes: number
  pages: number
  shippedMegabytes: number
  computeAllMilliseconds: number
  states: number
  bits: number
}

/** THE MEASURED PAGE PAYLOAD, from the built dist on 2026-09-04. Named constants rather than magic numbers, and
 *  they are MEASUREMENTS of one build — re-measure after a layout change rather than trusting them. */
export const FACE_SHIPPED_BYTES = 70_842      // 46,080 hex-line/hex-gate + 24,762 occupancy-cite elements
export const BUILT_PAGES = 5_606

export function benchLattice(n = 20_000): LatticeBench {
  const addr = THEOREMS[0]?.address ?? toUuid('bench')
  const rows = [
    timed('coinNeighbours (one gate)', () => coinNeighbours(7), n),
    timed('metatronOf', () => metatronOf(addr), n),
    timed('hexagramsOf', () => hexagramsOf(addr), n),
    timed('occupancyOf', () => occupancyOf(addr), n),
    timed('occupancyCitesOf', () => occupancyCitesOf(addr), n),
    timed('full 64-gate walk', () => { for (let g = 0; g < HEXAGRAM_STATES; g++) coinNeighbours(g) }, n),
    timed('hexFaceOf (the whole face)', () => hexFaceOf(addr), n),
  ]
  const faceNs = rows.find((r) => r.name.startsWith('hexFaceOf'))!.nsPerOp
  return {
    rows,
    faceNs,
    faceShippedBytes: FACE_SHIPPED_BYTES,
    pages: BUILT_PAGES,
    shippedMegabytes: (FACE_SHIPPED_BYTES * BUILT_PAGES) / 1_048_576,
    computeAllMilliseconds: (faceNs * BUILT_PAGES) / 1_000_000,
    states: HEXAGRAM_STATES,
    bits: HEXAGRAM_BITS,
  }
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
  const L = benchLattice()
  console.log(`\n\n  THE ${L.states}-HEXAGRAM LATTICE (${L.bits} bits — the hexbit one octave up)\n`)
  console.log('  operation                      ns/op      Mops/s')
  for (const r of [...L.rows].sort((x, y) => x.nsPerOp - y.nsPerOp))
    console.log(`  ${r.name.padEnd(28)} ${r.nsPerOp.toFixed(1).padStart(8)} ${(r.opsPerSecond / 1_000_000).toFixed(3).padStart(11)}`)
  console.log('\n  COMPUTE vs SHIP — the face is what every theorem page ships as markup')
  console.log(`    one face, computed  : ${(L.faceNs / 1000).toFixed(1)} us`)
  console.log(`    one face, shipped   : ${L.faceShippedBytes} bytes of HTML`)
  console.log(`    across ${L.pages} pages : ${L.shippedMegabytes.toFixed(0)} MB shipped`)
  console.log(`    all ${L.pages} computed : ${L.computeAllMilliseconds.toFixed(0)} ms`)
  console.log('\n  So the entire site\'s faces compute in under a second, and shipping them instead costs')
  console.log('  a third of a gigabyte. The face is DERIVED from a 36-character address; the address is what')
  console.log('  needs to travel. This is the arithmetic behind the slow build, stated as a ratio.')
  console.log('\n  HONEST SCOPE: wall-clock on one machine, one process, warm. The ORDERING and the RATIO are the')
  console.log('  findings; the absolute figures move with the host and are not sealed as theorems. The shipped')
  console.log('  byte counts are measurements of one build — re-measure after a layout change.')
}
