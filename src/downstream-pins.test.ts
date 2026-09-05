import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { addressingContract, addressingProbes, pinDrift, CONTRACT_CONSTANTS, PROBE_INPUTS } from './downstream-pins.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'

test('every probe recomputes, and the contract folds to a stable receipt', () => {
  const a = addressingContract()
  assert.equal(a.probes.length, PROBE_INPUTS.length)
  assert.deepEqual(addressingContract().receipt, a.receipt, 'the contract must be a function of nothing but itself')
  for (const p of a.probes) {
    assert.match(p.uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    // CHECKED AGAINST THE FUNCTION, not against a slice retyped here. This asserted p.uuid.slice(0, 8) and the
    // one-handle-derivation law flagged it: re-deriving a handle inline is how seven places came to agree by
    // coincidence rather than by construction. The contract's job is that its row equals what handleOf returns.
    assert.equal(p.handle, handleOf(p.uuid), 'the contract row must equal what handleOf computes')
    assert.equal(p.handle.length, 8, 'and a handle is eight hex — the width the law fixes')
    assert.equal(p.hexagrams.split(',').length, 16)
  }
})

// THE VALUES A LIVE DOWNSTREAM PINNED, written out. This is the point of the whole file: these exact strings
// were taken from a working index built on top of this addressing, and if any of them changes here, that index
// no longer resolves. Recomputing them in uuidna's own suite is what moves the check from "someone downstream
// may notice" to "this tree refuses to ship it", which is the difference between a courtesy and a contract.
test('the values a live downstream index was built on still compute here', () => {
  const p = addressingProbes().find((x) => x.input === 'hitsol:domains/atlantis-scubadiving.com')!
  assert.equal(p.uuid, 'cacd7b18-01a1-8be2-899f-06a48190f7fb')
  assert.equal(p.handle, 'cacd7b18')
  assert.equal(p.hexagrams, '0,26,6,11,56,40,38,31,1,42,18,1,36,15,31,59')
  assert.equal(CONTRACT_CONSTANTS.HANDLE_SPAN, 4294967296)
  assert.equal(CONTRACT_CONSTANTS.UUID_HEXBITS, 32)
  assert.equal(CONTRACT_CONSTANTS.PAYLOAD_HEXAGRAMS, 16)
})

test('a pinned CARDINALITY is checked as a number, and its drift is named', () => {
  const r = pinDrift({ probes: { 'coinNeighbours(0).length': '63' } })
  assert.deepEqual(r.drift, [])
  assert.deepEqual(r.uncheckable, [], 'a counted invariant the contract names is checkable, not a mystery')
  assert.equal(r.checked, 1)
  const moved = pinDrift({ probes: { 'coinNeighbours(0).length': '62' } })
  assert.equal(moved.drift.length, 1)
  assert.match(moved.drift[0]!.what, /coinNeighbours/)
  assert.equal(moved.drift[0]!.live, '63')
})

test('pinDrift reports a moved constant and a moved probe, and says WHICH', () => {
  const clean = pinDrift({ constants: { ...CONTRACT_CONSTANTS }, probes: {}, inputs: {} })
  assert.deepEqual(clean.drift, [], 'the live constants cannot drift from themselves')
  const moved = pinDrift({ constants: { ...CONTRACT_CONSTANTS, HANDLE_HEXBITS: 9 } })
  assert.equal(moved.drift.length, 1)
  assert.match(moved.drift[0]!.what, /HANDLE_HEXBITS/)
  assert.equal(moved.drift[0]!.pinned, '9')
  assert.equal(moved.drift[0]!.live, '8')
  const badProbe = pinDrift({ probes: { 'toUuid(x)': toUuid('uuidna') }, inputs: { 'toUuid(x)': 'something-else' } })
  assert.equal(badProbe.drift.length, 1, 'a pinned value that no longer comes from its input is drift')
})

// AN UNREAD PROBE IS NOT A PASSING PROBE. The pin format this was learned from records `toUuid(sample)` without
// recording what `sample` is, so a checker that cannot find the input must say so — collapsing "I could not
// check this" into "this holds" is how a contract lapses while every report stays green.
test('a probe whose input is unknown is UNCHECKABLE, never silently passing', () => {
  const r = pinDrift({ probes: { 'toUuid(mystery)': 'ffffffff-0000-4000-8000-000000000000' } })
  assert.deepEqual(r.drift, [], 'it cannot be called drift either — nothing was compared')
  assert.deepEqual(r.uncheckable, ['toUuid(mystery)'])
  assert.equal(r.checked, 0, 'and it must not be counted as checked')
})

test('a probe labelled without its input is RECOGNISED when its value is one this contract computes', () => {
  const p = addressingProbes()[0]!
  const r = pinDrift({ probes: { 'toUuid(sample)': p.uuid } })
  assert.deepEqual(r.uncheckable, [], 'a value this contract produces identifies the input that produced it')
  assert.deepEqual(r.drift, [])
  assert.equal(r.checked, 1)
})

// AND THE LIVE PIN, when a downstream checkout happens to be present. Absent is UNREAD, not a failure: uuidna
// must never require a sibling repository to exist — nothing in CI or in the deployed worker has one, so a hard
// dependency would fail everywhere but one laptop. And a test that passes when it read nothing is the same lapse
// this file exists to close, so the assertion runs only over a file that was actually read.
test('a downstream pin file named by UUIDNA_DOWNSTREAM_PINS agrees with the contract', () => {
  const paths = (process.env.UUIDNA_DOWNSTREAM_PINS ?? '').split(':').filter(Boolean)
  if (paths.length === 0) return                                  // nothing declared: nothing to read
  let read = 0
  for (const path of paths) {
    if (!existsSync(path)) continue
    read++
    const pin = JSON.parse(readFileSync(path, 'utf8')) as Parameters<typeof pinDrift>[0]
    const r = pinDrift(pin)
    assert.deepEqual(r.drift, [], `${path}: this tree would break a downstream index — ${JSON.stringify(r.drift)}`)
    assert.ok(r.checked > 0, `${path}: a pin where nothing could be checked is not agreement`)
  }
  assert.ok(read > 0, 'every declared pin path was missing — declare a path that exists, or declare none')
})
