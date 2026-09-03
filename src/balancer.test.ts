// balancer — ROUTING THAT COSTS NOTHING MUST STILL BE PROVEN TO ROUTE. What must be reachable: two machines
// that never speak agree (determinism), the share is exact where the count divides the span and the tail is
// NAMED where it does not, a real census can disagree with the arithmetic (and must be believed over it), and
// a fleet of zero is refused rather than divided by.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { routeOf, shares, census, routingCost, SPAN, balanceStream, jobHandles, mapAcross } from './quantum/apps/balancer.js'
import { toUuid } from './index.js'
import { handleOf } from './index.js'
import { HANDLE_HEXBITS } from './index.js'
import { callTool } from './mcp.js'
import type { ServedOS } from './quantum/os/index.js'

const handles = (n: number, tag = 'job'): string[] =>
  Array.from({ length: n }, (_, i) => handleOf(toUuid(`${tag}-${i}`)))

test('two machines that never speak route the same job to the same worker', () => {
  const h = handleOf(toUuid('a job'))
  assert.equal(routeOf(h, 16), routeOf(h, 16), 'the decision travels with the work')
  assert.ok(routeOf(h, 16) >= 0 && routeOf(h, 16) < 16)
})

test('the share is EXACT where the fleet divides the span — 2, 16 and 256 workers', () => {
  for (const n of [2, 4, 16, 64, 256]) {
    const s = shares(n)
    assert.equal(s.even, true, `${n} workers divide 2^32 evenly`)
    assert.equal(s.each * n, SPAN)
    assert.equal(s.wastes, 0)
  }
  assert.equal(shares(2).each, 2147483648)
  assert.equal(shares(256).each, 16777216)
})

test('CONTROL — an uneven fleet NAMES its tail instead of hiding it', () => {
  const s = shares(6)
  assert.equal(s.even, false, 'six does not divide a power of two')
  assert.ok(s.wastes > 0 && s.wastes < 6, `the tail is smaller than the fleet (${s.wastes})`)
  assert.equal(s.each * s.workers + s.wastes, SPAN, 'nothing is lost in the accounting')
})

test('every worker is reachable and every job is placed — no handle falls off the fleet', () => {
  const c = census(handles(2000), 16)
  assert.equal(c.counts.reduce((a, b) => a + b, 0), 2000, 'every job landed somewhere')
  assert.ok(c.counts.every((n) => n > 0), 'no worker was left idle by 2000 jobs')
  assert.equal(c.workers, 16)
})

test('the CENSUS is a measurement and may disagree with the arithmetic — it is the one to believe', () => {
  const c = census(handles(4096), 8)
  // the arithmetic promises exactly 512 each; real handles will not oblige exactly, and that is the point
  assert.equal(c.jobs, 4096)
  assert.ok(c.spread > 0, 'real traffic is never perfectly flat — a spread of zero would be the suspicious result')
  assert.ok(c.spread < c.jobs / 8, `and it should stay well under a whole worker's share (spread ${c.spread})`)
})

test('CONTROL — a fleet of none is refused by name, never divided by', () => {
  const h = handleOf(toUuid('x'))
  assert.throws(() => routeOf(h, 0), /not a fleet/)
  assert.throws(() => routeOf(h, -3), /not a fleet/)
})

// THE FINDERS, folded (2026-08-26 review): each of these passed before the fix and names the exact defect,
// so the module grows the second voice back only in the open.
test('CONTROL — the two voices agree on what a fleet is: shares refuses every fleet routeOf refuses', () => {
  const h = handleOf(toUuid('x'))
  for (const n of [0, -3, 1.5, NaN]) {
    assert.throws(() => routeOf(h, n), /not a fleet/, `routeOf refuses ${n}`)
    assert.throws(() => shares(n), /not a fleet/, `and shares must refuse ${n} too — it once answered with a share`)
  }
  // the finder that could not fire: shares(-3) returned each = -1431655765, and -1431655765 * -3 + 1 is
  // exactly 2^32, so the accounting invariant HELD for a fleet that exists nowhere.
})

test('CONTROL — a non-handle is refused, never routed to NaN and silently dropped', () => {
  for (const bad of ['not-a-handle', '', 'deadbeefcafe1234', 'DEADBEEF', 'f0e1d2c3-a4b5-4c6d-8e9f-000000000000'])
    assert.throws(() => routeOf(bad, 16), /is not a handle/, `${JSON.stringify(bad)} is not eight hex characters`)
})

test('CONTROL — census cannot report more jobs than it placed', () => {
  const good = handles(64)
  const c = census(good, 8)
  assert.equal(c.counts.reduce((a, b) => a + b, 0), c.jobs, 'the counts ARE the jobs — no handle may vanish')
  // and a bad handle stops the census rather than shrinking it silently: census once answered jobs: 4 over
  // counts summing to 3, a Census that contradicted itself in its own two fields.
  assert.throws(() => census([...good, 'not-a-handle'], 8), /is not a handle/)
})

test('the routing cost is stated where a test can reach it: nothing shared, nothing asked', () => {
  const c = routingCost()
  assert.equal(c.lookups, 0)
  assert.equal(c.roundTrips, 0)
  assert.equal(c.sharedState, 0)
})

test('stream fleet is CPU workers plus one specified GPU worker only when jobs pay postage', () => {
  const { stream, gpu } = (callTool('uuidna_os', {}) as ServedOS).capacity
  assert.equal(stream.postage, gpu.breakEvenAddresses)
  assert.equal(stream.idle.cpuWorkers, HANDLE_HEXBITS)
  assert.equal(stream.idle.gpuWorkers, 0)
  assert.equal(stream.idle.total, HANDLE_HEXBITS)
  assert.equal(stream.atPostage.gpuWorkers, 1)
  assert.equal(stream.atPostage.total, HANDLE_HEXBITS + 1)
  assert.equal(stream.gpuSeat, 'specified', 'assignment is real; nothing is dispatched')
})

test('balanceStream opens concurrent capacity versus serial, and GPU stays off below postage', () => {
  const hs = handles(64)
  const b = balanceStream(hs)
  assert.equal(b.serial, 64)
  assert.equal(b.gpuWorkers, 0)
  assert.equal(b.gpuLane, -1)
  assert.equal(b.slots, HANDLE_HEXBITS)
  assert.equal(b.opened, b.serial - b.parallelSteps)
  assert.ok(b.parallelSteps <= b.serial, 'busiest lane cannot exceed the job count')
  assert.ok(b.opened > 0, '64 independent jobs across 8 workers open concurrent slots')
  assert.equal(b.counts.reduce((a, n) => a + n, 0), 64)
})

test('CONTROL — at postage the GPU residue class is named and the nine-worker tail is not hidden', () => {
  const postage = (callTool('uuidna_os', {}) as ServedOS).capacity.stream.postage
  const hs = handles(postage)
  const b = balanceStream(hs)
  assert.equal(b.gpuWorkers, 1)
  assert.equal(b.gpuLane, HANDLE_HEXBITS)
  assert.equal(b.slots, HANDLE_HEXBITS + 1)
  assert.equal(shares(b.slots).even, false, '8 CPU + 1 GPU does not divide 2^32 — the tail is named')
  assert.equal(b.workers, b.slots)
  assert.equal(b.counts.length, b.slots)
  assert.equal(b.counts.reduce((a, n) => a + n, 0), postage)
})

test('mapAcross restores input order and covers every index', () => {
  const hs = jobHandles('stream', ['a', 'b', 'c', 'd'])
  const out = mapAcross(hs, 8, (i) => i * 10)
  assert.deepEqual(out, [0, 10, 20, 30])
})
