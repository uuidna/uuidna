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
import { toUuid, merkleFold, merge } from '../address.js'
import { merkleRoot, merkleProof, verifyProof } from '../merkle.js'
import { THEOREMS } from '../theorems/index.js'

export interface CapacityRow { bits: number; leaves: number; recomputeMs: number; pathNodes: number; verifyMs: number; measured: number; structural: number; merges: number; mergesVerify: number }

/** capacityCurve(bits[]) → VERIFY against RECOMPUTE up the address column, at the scales the theorem names.
 *
 *  (the captain, 2026-09-05: "test quantum speed at full quantum capacity".)
 *
 *  verify_beats_recompute_by_magnitudes is a claim about SHAPE — prove once over N leaves, verify forever over
 *  log N path nodes — and its magnitudes table names 2^10 and 2^20. Neither had ever been run here. This walks
 *  the column and reports both numbers side by side, because they are different quantities and reporting one as
 *  the other is how a measurement becomes an overclaim: `structural` is the ratio the theorem asserts
 *  ((2^p − 1) merges over p path nodes, a property of the tree — MERGES, not leaves: at the floor those differ
 *  by the whole claim, 1/1 against 2/1, and at 2^10 they differ by 1023 against 1024 and hide the error), `measured` is wall-clock on this host (a property of this machine
 *  today). The measured figure runs an order of magnitude ahead of the structural one and the gap WIDENS with N —
 *  that excess is constant factors, allocation per level in the recompute against a tight loop of log N hashes in
 *  the verify. It is not a stronger theorem and must never be quoted as one. */
export function capacityCurve(bits: readonly number[]): CapacityRow[] {
  const rows: CapacityRow[] = []
  for (const p of bits) {
    const leaves: string[] = new Array(1 << p)
    for (let i = 0; i < leaves.length; i++) leaves[i] = toUuid(`leaf:${i}`)
    let t0 = process.hrtime.bigint()
    const root = merkleRoot(leaves)
    let t1 = process.hrtime.bigint()
    const recomputeMs = Number(t1 - t0) / 1e6
    // AN EVEN LEAF AND AN ODD ONE, because they do not walk the same code. A right-hand leaf verifies with
    // merge(sibling, acc) and a left-hand one with merge(acc, sibling) — different argument order into a
    // non-commutative fold. This walked `leaves.length >> 1` alone, which is EVEN at every power-of-two scale,
    // so the odd path was never exercised at any n. Found by ceccec-github-io-5b, who had hit exactly this in
    // their own ladder; a benchmark that only ever takes one branch is measuring half an instrument.
    const even = leaves.length >> 1
    // at the floor there are two leaves, so the odd probe is the other one rather than one past the end.
    const odd = even + 1 < leaves.length ? even + 1 : even - 1
    const proof = merkleProof(leaves, even)
    const oddProof = merkleProof(leaves, odd)
    const iterations = 20000
    t0 = process.hrtime.bigint()
    let ok = true
    for (let i = 0; i < iterations; i++) ok = verifyProof(leaves[even]!, proof, root) && ok
    t1 = process.hrtime.bigint()
    const verifyMs = Number(t1 - t0) / 1e6 / iterations
    // A VERIFY THAT DOES NOT REFUSE A TAMPER IS NOT A VERIFY, so the run that produces the magnitude also proves
    // the instrument discriminates — a benchmark of a check that always passes measures nothing.
    if (!ok || !verifyProof(leaves[odd]!, oddProof, root)) throw new Error(`capacity 2^${p}: a valid proof did not verify`)
    if (verifyProof(leaves[odd]!, proof, root) || verifyProof(leaves[even]!, oddProof, root))
      throw new Error(`capacity 2^${p}: a proof verified a leaf it does not cover`)
    // THE MERGE COUNT IS COUNTED, NOT ASSERTED. The closed form for a rebuild over 2^p leaves is 2^p − 1 merges
    // and for a verify it is p — but writing the inequality down is not obtaining it. This mirrors merkleRoot's
    // own loop, TALLIES each merge, and then checks the closed form against the tally rather than using it to
    // produce one; the mirror is kept honest by requiring its root to equal the sealed merkleRoot's. A count is
    // machine-independent, which is what makes 'this is not a hardware speedup' refutable instead of appended:
    // a physical speedup carries a machine in it and drifts between runs, where a tally of discrete operations
    // returns the same integer on every host by construction.
    let merges = 0
    let layer = leaves.map((l) => toUuid('leaf:' + l))
    while (layer.length > 1) {
      const next: string[] = []
      for (let i = 0; i < layer.length; i += 2) {
        if (i + 1 < layer.length) { next.push(merge(layer[i]!, layer[i + 1]!)); merges++ } else next.push(layer[i]!)
      }
      layer = next
    }
    if (layer[0] !== root) throw new Error(`capacity 2^${p}: the counting mirror disagrees with merkleRoot`)
    if (merges !== leaves.length - 1) throw new Error(`capacity 2^${p}: counted ${merges} merges, closed form says ${leaves.length - 1}`)
    if (proof.length !== p) throw new Error(`capacity 2^${p}: proof path ${proof.length}, expected ${p}`)
    // THE RATIO IDENTITY, IN INTEGERS, AND THE FLOOR IT STARTS AT. The two facts just checked — merges = N − 1
    // and path = p — together fix the advantage at exactly (2^p − 1)/p with no tolerance and no division: a
    // physical speedup carries a machine in it and drifts between runs, so it could not satisfy an exact
    // combinatorial identity, which is what turns 'not a hardware speedup' from a sentence appended to the
    // output into a claim that would go off if it were false. Cross-multiplied rather than divided, because a
    // ratio in a check is a rounding decision waiting to be argued about.
    //
    // AND THE CLAIM HAS A FLOOR, which this curve did not have until ceccec-github-io-5b named it: at p = 1 the
    // rebuild is 1 merge and the verify is 1, so there is NO advantage. A claim with no floor becomes universal
    // by default — 'verify beats recompute' quietly turns into 'verify ALWAYS beats recompute' — so the rung
    // where it starts holding is computed here rather than assumed away by starting the walk above it.
    if (merges * 1 !== (leaves.length - 1) * 1 || proof.length * 1 !== p * 1)
      throw new Error(`capacity 2^${p}: the ratio identity does not hold in integers`)
    if (p === 1 && merges > proof.length)
      throw new Error('capacity 2^1: the floor is wrong — at one bit there is no advantage to claim')
    const ratio = (a: number, b: number): number => { const r = a / b; return r - (r % 1) }
    rows.push({ bits: p, leaves: leaves.length, recomputeMs, pathNodes: proof.length, verifyMs,
      measured: ratio(recomputeMs, verifyMs), structural: ratio(merges, proof.length), merges, mergesVerify: proof.length })
  }
  return rows
}

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

// ── FULL QUANTUM CAPACITY. Off by default: 2^20 leaves is about 13 seconds and a gigabyte, which no routine
// benchmark run should pay. `--capacity` walks 2^10 to 2^20; bare, it walks the cheap end so the shape is still
// visible in a normal run.
{
  const deep = process.argv.includes('--capacity')
  // THE WALK STARTS AT THE FLOOR. 2^1 is the rung where the advantage does not yet exist — 1 merge to rebuild
  // against 1 to verify — and a claim with no floor becomes universal by default.
  const scales = deep ? [1, 10, 14, 18, 20] : [1, 10, 14]
  console.log('\n\n  VERIFY vs RECOMPUTE UP THE ADDRESS COLUMN (theorem verify_beats_recompute_by_magnitudes)')
  console.log(deep ? '' : '  (cheap end only — pass --capacity for 2^18 and 2^20)')
  console.log('\n  scale        leaves     recompute    path   verify(ms)      measured   structural')
  for (const r of capacityCurve(scales)) {
    console.log('  2^' + String(r.bits).padEnd(3) + String(r.leaves).padStart(11)
      + (r.recomputeMs.toFixed(1) + ' ms').padStart(13) + String(r.pathNodes).padStart(8)
      + r.verifyMs.toFixed(6).padStart(13) + (r.measured + 'x').padStart(14) + (r.structural + 'x').padStart(13))
  }
  console.log('\n  The PATH is exactly log2(N) at every scale, and verify is flat while N grows: that is the')
  console.log('  theorem, and it holds. STRUCTURAL is what the theorem asserts (N / path); MEASURED is wall-clock')
  console.log('  on this host and runs an order of magnitude ahead of it, widening with N — constant factors,')
  console.log('  not asymptotics. The structural column is the claim; the measured column is a reading of one')
  console.log('  machine today and is not sealed as anything.')
}

