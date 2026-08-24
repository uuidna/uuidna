// hardware/lanes + handle.laneOf — THE EXECUTOR TRINITY AND THE KEY THAT SHARDS IT.
//
// Two claims are made, and both are checked here rather than asserted in prose: that a handle is a BALANCED shard
// key — the kind of claim that reads true and would never be noticed if it were false — and that the third seat
// claims NOTHING, which is the statement this tree would be most tempted to overstate. The balance test measures
// the spread over the LIVE ledger rather than over examples, and it can fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { laneOf, handleOf } from '../handle.js'
import { LANES, trinity, HANDLE_BITS, gpuEligiblePpm, kernelPercent } from '../hardware/lanes/index.js'
import { laneCensus, poolByHandle } from '../scripts/api.js'
import { theorems, toUuid } from '../index.js'

test('a lane is decided by the address, so the same work lands in the same place every run', () => {
  const a = toUuid('a wing of the ledger')
  assert.equal(laneOf(a, 14), laneOf(a, 14), 'the assignment cannot depend on when it was asked')
  assert.equal(laneOf(a, 14), Number.parseInt(handleOf(a), 16) % 14, 'and it is the handle read as an integer, nothing else')
  // it must actually SPREAD — a key that sent everything to one lane would pass a determinism test perfectly
  const spread = new Set([...Array(50)].map((_, i) => laneOf(toUuid(`wing-${i}`), 14)))
  assert.ok(spread.size > 8, `fifty addresses must reach many lanes, reached ${spread.size}`)
  // one lane is the degenerate case and must not divide by it
  assert.equal(laneOf(a, 1), 0)
  assert.equal(laneOf(a, 0), 0)
})

test('THE BALANCE IS MEASURED ON THE LIVE LEDGER, not hoped for', () => {
  // 1689 real theorem addresses across 14 lanes. Perfect balance is not the claim — uniformity is — so the test
  // is that no lane carries wildly more than its share. A key that clumped would show here and nowhere else.
  const addresses = theorems().map((t) => t.address)
  const lanes = 14
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
  // "runs faster on a GPU" is a claim about a workload, and the workload is the thing that answers it. All pure
  // uuidna compute over the whole ledger is 0.59 ms; the gate is 100,087 ms; the critical path is 111 Lean
  // PROCESSES. So the device-eligible share is a few parts per million and the kernel holds roughly a third —
  // which is why the lane is specified rather than built, and why the note has to say so out loud.
  assert.ok(gpuEligiblePpm() < 100, `the device-eligible share must be tiny and stated: got ${gpuEligiblePpm()} ppm`)
  assert.ok(kernelPercent() >= 25, `the Lean kernel dominates and no lane assignment touches it: got ${kernelPercent()}%`)
  const gpu = LANES.find((l) => l.name === 'GPU')!
  assert.match(gpu.note, /MEASURED NOT TO PAY/, 'the reason is a measurement, and the note names it as one')
  assert.match(gpu.note, /0\.59 ms/, 'with the figure it rests on, so a reader can re-run it')
})

test('the trinity seats exactly one empty chair, and it claims nothing', () => {
  const t = trinity()
  assert.equal(t.seats, 3)
  assert.equal(t.measured, 1, 'only the CPU lane has figures behind it')
  assert.equal(t.specified, 1, 'the GPU lane states its conditions and is not built')
  assert.equal(t.empty, 1)
  assert.equal(t.handleBits, HANDLE_BITS)
  assert.equal(HANDLE_BITS, 32, 'eight tiles of four bits — the handle, and the shard key')

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
