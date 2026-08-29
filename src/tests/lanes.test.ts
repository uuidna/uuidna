// hardware/lanes + handle.laneOf — THE EXECUTOR TRINITY AND THE KEY THAT SHARDS IT.
//
// Two claims are made, and both are checked here rather than asserted in prose: that a handle is a BALANCED shard
// key — the kind of claim that reads true and would never be noticed if it were false — and that the third seat
// claims NOTHING, which is the statement this tree would be most tempted to overstate. The balance test measures
// the spread over the LIVE ledger rather than over examples, and it can fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { laneOf, handleOf } from '../handle.js'
import { LANES, trinity, HANDLE_BITS, HANDLE_SPAN, gpuEligiblePpm, kernelPercent, gpuCapacity, GPU_POSTAGE_ADDRESSES, CPU_NS_PER_ADDRESS, cpuFoldNs } from '../hardware/lanes/index.js'
import { laneCensus, poolByHandle, ROOT } from '../scripts/api.js'
import { theorems, toUuid, VE_FACES, UUID_HEXBITS } from '../index.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

test('a lane is decided by the address, so the same work lands in the same place every run', () => {
  const a = toUuid('a wing of the ledger')
  assert.equal(laneOf(a, VE_FACES), laneOf(a, VE_FACES), 'the assignment cannot depend on when it was asked')
  assert.equal(laneOf(a, VE_FACES), Number.parseInt(handleOf(a), 16) % VE_FACES, 'and it is the handle read as an integer, nothing else')
  // it must actually SPREAD — a key that sent everything to one lane would pass a determinism test perfectly
  const spread = new Set([...Array(50)].map((_, i) => laneOf(toUuid(`wing-${i}`), VE_FACES)))
  assert.ok(spread.size > 8, `fifty addresses must reach many lanes, reached ${spread.size}`)
  // one lane is the degenerate case and must not divide by it
  assert.equal(laneOf(a, 1), 0)
  assert.equal(laneOf(a, 0), 0)
})

test('THE BALANCE IS MEASURED ON THE LIVE LEDGER, not hoped for', () => {
  // every real theorem address the ledger holds, across VE_FACES lanes. Perfect balance is not the claim — uniformity
  // is — so the test is that no lane carries wildly more than its share, computed from the census rather than
  // from a number written here. A key that clumped would show up here and nowhere else.
  const addresses = theorems().map((t) => t.address)
  const lanes = VE_FACES
  const counts = laneCensus(addresses, lanes)
  assert.equal(counts.length, lanes)
  assert.equal(counts.reduce((a, b) => a + b, 0), addresses.length, 'every piece of work is assigned exactly once')
  const fair = (addresses.length - (addresses.length % lanes)) / lanes
  const heaviest = counts.reduce((a, b) => (b > a ? b : a), 0)
  const lightest = counts.reduce((a, b) => (b < a ? b : a), counts[0]!)
  assert.ok(heaviest <= fair * 2, `no lane may carry double its share: heaviest ${heaviest}, fair ${fair}`)
  assert.ok(lightest > 0, 'and no lane may sit empty while others work')
})

test('poolByHandle returns results in the ORIGINAL order, whatever lane ran them', async () => {
  const items = [...Array(40)].map((_, i) => ({ address: toUuid(`piece-${i}`), run: async () => i }))
  assert.deepEqual(await poolByHandle(items, 7), [...Array(40)].map((_, i) => i))
  // and the same input distributes identically twice — the property `pool` cannot offer
  const first = laneCensus(items.map((x) => x.address), 7)
  const second = laneCensus(items.map((x) => x.address), 7)
  assert.deepEqual(first, second)
})

test('the GPU lane carries the MEASUREMENT that decided it, not an opinion about chips', () => {
  // "runs faster on a GPU" is a claim about a workload, and the workload is the thing that answers it. The
  // recorded run in hardware/lanes holds the three figures; what this asserts is the SHAPE they imply — that the
  // device-eligible share is a few parts per million while the Lean kernel holds roughly a third — which is why
  // the lane is specified rather than built, and why the note has to say so out loud.
  assert.ok(gpuEligiblePpm() < 100, `the device-eligible share must be tiny and stated: got ${gpuEligiblePpm()} ppm`)
  assert.ok(kernelPercent() >= 25, `the Lean kernel dominates and no lane assignment touches it: got ${kernelPercent()}%`)
  const gpu = LANES.find((l) => l.name === 'GPU')!
  assert.match(gpu.note, /MEASURED NOT TO PAY/, 'the reason is a measurement, and the note names it as one')
  assert.match(gpu.note, /0\.59 ms/, 'with the figure it rests on, so a reader can re-run it')
})

test('GPU capacity: four Shor chunks miss postage; the full handle span passes the first break-even', () => {
  const g = gpuCapacity()
  assert.equal(g.seat, 'specified', 'nothing is dispatched — the seat stays specified')
  assert.equal(g.postageAddresses, GPU_POSTAGE_ADDRESSES)
  assert.equal(g.breakEvenAddresses, GPU_POSTAGE_ADDRESSES, 'infinitely fast device break-even is the postage itself')
  assert.equal(g.chunkAddresses, 4, 'handle is four independent 8-bit chunks')
  assert.equal(g.chunkCpuNs, cpuFoldNs(4))
  assert.equal(g.chunkPastBreakEven, false, 'four folds do not pay a 2000-address transfer')
  assert.equal(g.handleSpan, HANDLE_SPAN)
  assert.equal(g.handleCpuNs, CPU_NS_PER_ADDRESS * HANDLE_SPAN)
  assert.equal(g.handlePastBreakEven, true, '2^32 addresses sit past the first threshold')
  assert.equal(g.uuidChunks, 16)
  assert.ok(g.eligiblePpm < 100, 'gate-share ppm is a different column from handle-span break-even')
})

test('the trinity seats exactly one empty chair, and it claims nothing', () => {
  const t = trinity()
  assert.equal(t.seats, t.measured + t.specified + t.empty)
  assert.equal(t.measured, 1, 'only the CPU lane has figures behind it')
  assert.equal(t.specified, 1, 'the GPU lane states its conditions and is not built')
  assert.equal(t.empty, 1)
  assert.equal(t.handleBits, HANDLE_BITS)
  assert.equal(HANDLE_BITS, UUID_HEXBITS)

  const gpu = LANES.find((l) => l.name === 'GPU')!
  assert.match(gpu.note, /NOT BUILT/, 'a specified lane must say it is not built, in the note a reader sees first')

  // THE ONE THAT MATTERS: the empty seat must not acquire a capability by wording.
  const qpu = LANES.find((l) => l.name === 'QPU')!
  assert.equal(qpu.seat, 'empty')
  assert.match(qpu.admits, /nothing/, 'no work is routed to a device that does not exist')
  assert.match(qpu.note, /does not claim an advantage/, 'the readiness trial checks this on every run; so does this test')
  assert.ok(!LANES.some((l) => l.seat === 'measured' && l.name !== 'CPU'),
    'a seat may only read MEASURED once something has actually been measured on it')
})

// ── THE HANDLE UNITS ARE HEXBIT'S (2026-08-24). lanes computed `HANDLE_BITS = (UUID_HEXBITS / 4) * HEXBIT_BITS`
// and `HANDLE_SPAN = 2 ** HANDLE_BITS` itself, which gave the tree TWO public exports named HANDLE_SPAN — src/index
// re-exports hexbit's `16 ** HANDLE_HEXBITS`, src/hardware re-exported this one — reaching 4,294,967,296 by two
// routes. Value equality is exactly what such a pair has, so a test that only compares the numbers cannot fail on
// the duplication: it IS the duplication's alibi. The source is read instead.
test('the handle units are hexbit\'s ONE definition, re-exported — never a second arithmetic', async () => {
  const hexbit = await import('../hexbit/index.js')
  assert.equal(HANDLE_BITS, hexbit.HANDLE_BITS, 'the width lanes uses must BE the unit\'s width')
  assert.equal(HANDLE_SPAN, hexbit.HANDLE_SPAN, 'and the span likewise')
  assert.equal(HANDLE_SPAN, 4294967296, '16^8 — the handle universe, counted once')

  const src = readFileSync(join(ROOT, 'src', 'hardware', 'lanes', 'index.ts'), 'utf8')
  assert.ok(!/HANDLE_(BITS|SPAN)\s*=/.test(src),
    'lanes must RE-EXPORT the handle units, never assign them — `universe_of_handles` seals that they are ' +
    'imported from hexbit/ and never re-derived, and this file was the counterexample to that theorem')
  assert.match(src, /export \{ HANDLE_BITS, HANDLE_SPAN \}/, 'and it still names what it uses, rather than hiding the dependency')
})
