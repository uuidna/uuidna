import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compileToHexbits, hexbitDoorOf, UUID_HEXBITS } from './hexbit/index.js'
import { handleOf } from './handle.js'
import { THEOREMS } from './theorems/index.js'
import { benchHexbit, benchLattice, timed } from './scripts/bench-hexbit.js'
import { occupancyCitesOf, occupancyOf, hexagramsOf, hexFaceOf, OCCUPANCY_KEYS } from './hexagram.js'

// TWO HOT-PATH FUNCTIONS WERE REWRITTEN FOR SPEED, AND A SPEED REWRITE IS ONLY SAFE IF THE OUTPUT IS IDENTICAL.
// Both previously did their work by allocating throwaway strings and arrays — compileToHexbits ran
// `replace(/-/g,'').split('').map(c => parseInt(c,16))` and handleOf ran `replace(/-/g,'').toLowerCase()` — and
// both are now single scans over character codes. These tests hold the OLD implementations as oracles and check
// the new ones against them over the entire ledger plus the edge and error cases, because "it looked right on a
// uuid" is exactly how a nibble reader ships broken for uppercase input.

/** the old compileToHexbits, kept verbatim as the oracle */
const oldCompile = (a: string): number[] => a.replace(/-/g, '').split('').map((c) => parseInt(c, 16))

/** the old handleOf, kept verbatim as the oracle — including its refusal */
const HANDLE = /^[0-9a-f]{8}$/
const oldHandle = (address: string): string => {
  const hex = String(address).replace(/-/g, '').toLowerCase()
  const handle = hex.slice(0, 8)
  if (!HANDLE.test(handle)) throw new Error(`handle: "${address}" does not begin with eight hex characters`)
  return handle
}

const EDGE = [
  'AABBCCDD-1122-3344-5566-778899AABBCC',   // uppercase, dashed
  'aabbccdd11223344556677889900aabb',       // lowercase, undashed
  'ffffffff-ffff-ffff-ffff-ffffffffffff',   // all f
  '00000000-0000-0000-0000-000000000000',   // all zero
  '0-0-0-0-0-0-0-0',                        // dashes between single digits
  '--------aabbccdd',                        // leading dashes
]

test('compileToHexbits is byte-identical to the form it replaced, across the whole ledger', () => {
  for (const t of THEOREMS)
    assert.deepEqual(compileToHexbits(t.address), oldCompile(t.address), `${t.key}: nibbles differ`)
})

test('compileToHexbits matches on uppercase, undashed and degenerate input', () => {
  for (const a of [...EDGE, ''])
    assert.deepEqual(compileToHexbits(a), oldCompile(a), `differs on ${JSON.stringify(a)}`)
})

test('every compiled nibble is a hexbit state, and a uuid yields exactly UUID_HEXBITS of them', () => {
  const n = compileToHexbits(THEOREMS[0]!.address)
  assert.equal(n.length, UUID_HEXBITS, 'a uuid is 32 nibbles once the dashes are gone')
  for (const t of THEOREMS.slice(0, 300))
    for (const v of compileToHexbits(t.address))
      assert.ok(Number.isInteger(v) && v >= 0 && v <= 15, `state ${v} is not a nibble`)
})

test('handleOf is identical to the form it replaced — including WHICH inputs it refuses', () => {
  const both = (a: string): string => {
    let o: string, n: string
    try { o = 'ok:' + oldHandle(a) } catch (e) { o = 'throw:' + (e as Error).message }
    try { n = 'ok:' + handleOf(a) } catch (e) { n = 'throw:' + (e as Error).message }
    return o === n ? 'same' : `OLD ${o} / NEW ${n}`
  }
  for (const t of THEOREMS) assert.equal(both(t.address), 'same', `${t.key}`)
  for (const a of EDGE) assert.equal(both(a), 'same', JSON.stringify(a))
})

// THE REFUSAL IS THE CONTRACT. handleOf refuses rather than coerces, and a scan that stopped early could
// silently return a SHORT handle instead of throwing — which would be a coercion wearing a refusal's clothes.
test('handleOf still REFUSES what it always refused, and never returns a short handle', () => {
  for (const bad of ['', 'abc', 'zzzzzzzz', 'aabbccd', 'g1234567', '12345678xxxx'.slice(0, 7), '-', '---']) {
    let threw = false
    try { handleOf(bad) } catch { threw = true }
    let oldThrew = false
    try { oldHandle(bad) } catch { oldThrew = true }
    assert.equal(threw, oldThrew, `${JSON.stringify(bad)}: refusal disagrees with the old form`)
    if (!threw) assert.match(handleOf(bad), HANDLE, 'a returned handle must be eight hex characters')
  }
})

test('the door composes from the parts, so a faster part cannot change the answer', () => {
  for (const t of THEOREMS.slice(0, 200)) {
    const d = hexbitDoorOf(t.address)
    assert.equal(d.handle, handleOf(t.address))
    assert.deepEqual(d.hexbits, compileToHexbits(t.address))
    assert.deepEqual(d.coin, d.hexbits.slice(0, d.coin.length))
  }
})

// THE BENCHMARK IS AN INSTRUMENT, AND NO TIMING ORDERING IS ASSERTED HERE — deliberately, after this test
// failed for the wrong reason. The first version asserted `unitIsFastest`, which is true on a warm run of
// 200,000 iterations and NOT reliably true at the 2,000 a test suite can afford: at that count the JIT is cold
// and the timer resolution is comparable to the operation. It failed, and it would have failed again whenever
// the machine was busy — a check failing for machine load while claiming something about hexbits, which is the
// exact fault two other tests in this tree were repaired for today.
//
// So the ORDERING is reported by `bench-hexbit` where a person reads it with the honest-scope note attached,
// and what is asserted here is only what cannot be a matter of weather: that every operation was measured, that
// the instrument discriminates between them at all, and that it ran the iterations it claims.
test('the benchmark measures every primitive and discriminates between them', () => {
  const b = benchHexbit(2000)
  assert.ok(b.rows.length >= 6, 'a benchmark of one thing cannot rank anything')
  for (const r of b.rows) {
    assert.ok(r.nsPerOp > 0, `${r.name}: a zero timing means the call was optimised away, not that it is free`)
    assert.ok(r.opsPerSecond > 0)
    assert.equal(r.iterations, 2000)
  }
  assert.notEqual(b.fastest, b.slowest, 'if fastest equals slowest the instrument is not discriminating')
  assert.equal(typeof b.unitIsFastest, 'boolean', 'the verdict is reported; it is not asserted at this iteration count')
})

test('timed() reports the iterations it actually ran', () => {
  const r = timed('noop', () => 1 + 1, 500)
  assert.equal(r.iterations, 500)
  assert.ok(r.nsPerOp > 0)
})

// ── THE 64-HEXAGRAM LATTICE, and the compute-vs-ship ratio that justifies computing the face instead of
// shipping it. occupancyCitesOf rebuilt an address-independent index on every call; cached, the whole face is
// about seven times faster. As with the benchmark above, no ABSOLUTE timing is asserted — only the structural
// facts and the arithmetic of the ratio, because a timing assertion fails for machine load.
test('the lattice benchmark measures every operation and reports the ratio', () => {
  const L = benchLattice(500)
  assert.equal(L.states, 64, 'the hexagram lattice is 2^6')
  assert.equal(L.bits, 6)
  assert.ok(L.rows.length >= 6)
  for (const r of L.rows) assert.ok(r.nsPerOp > 0, `${r.name}: a zero timing is not a measurement`)
  assert.ok(L.faceNs > 0, 'the face must have been timed for the ratio to mean anything')
  // the ratio arithmetic must follow from its own inputs, not be a remembered figure
  assert.equal(L.shippedMegabytes, (L.faceShippedBytes * L.pages) / 1_048_576)
  assert.equal(L.computeAllMilliseconds, (L.faceNs * L.pages) / 1_000_000)
  assert.ok(L.shippedMegabytes > 300, 'the shipped payload is the thing worth removing')
})

test('the occupancy index is cached, so repeated cites cost no more than the first', () => {
  const a = THEOREMS[0]!.address
  const first = occupancyCitesOf(a)
  const second = occupancyCitesOf(a)
  assert.deepEqual(second, first, 'a cached index must not change the answer')
  // and every cited key must be one of the declared occupancy keys: the index is BUILT from that list, so a key
  // outside it could only come from somewhere else, which is what this check exists to notice
  for (const c of first) {
    assert.ok(Number.isInteger(c.n))
    for (const k of c.keys) assert.ok(OCCUPANCY_KEYS.includes(k), `${k} is not a declared occupancy key`)
  }
})

test('the face composes from the lattice parts, so a cached index cannot change it', () => {
  for (const t of THEOREMS.slice(0, 120)) {
    const f = hexFaceOf(t.address)
    assert.deepEqual(f.occupancy, occupancyOf(t.address))
    assert.deepEqual(f.hexagrams, hexagramsOf(t.address))
    for (const h of f.hexagrams) assert.ok(h >= 0 && h < 64, `hexagram ${h} is outside the 64-lattice`)
  }
})
