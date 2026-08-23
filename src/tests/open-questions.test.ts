// open-questions — the curriculum of doors held to its laws: pure placement is deterministic, one shared word is
// not a topic, the involution magnets really are involution-shaped, and a control that must fail (a claim in a
// topic's own words must NOT land in the frontier — and vice versa).
import { test } from 'node:test'
import assert from 'node:assert'
import { openQuestions, placeItem, isInvolutionShaped } from '../school/open/questions/index.js'
import { LEAN_LEDGER } from '../theorems/generated.js'

test('placement is deterministic and one shared word is not a topic', () => {
  const a = placeItem({ claim: 'the doubling orbit visits every unit of the vortex ring', source: 't' }, LEAN_LEDGER)
  const b = placeItem({ claim: 'the doubling orbit visits every unit of the vortex ring', source: 't' }, LEAN_LEDGER)
  assert.deepEqual(a, b, 'same claim, same placement')
  assert.notEqual(a.topic, 'open frontier', 'a claim in the ledger’s own words must find its topic')
  const lone = placeItem({ claim: 'zanzibar cormorant paperwork', source: 't' }, LEAN_LEDGER)
  assert.equal(lone.topic, 'open frontier', 'words the ledger has never sealed stay honestly unplaced')
})

test('the involution magnets are involution-shaped, every one', () => {
  const p = placeItem({ claim: 'the reflection applied twice returns and the complement pairs to nine', source: 't' }, LEAN_LEDGER)
  assert.ok(p.involutions.length > 0, 'a self-inverse claim must feel magnets')
  for (const m of p.involutions) {
    const t = LEAN_LEDGER.find((x) => x.key === m.key)!
    assert.ok(isInvolutionShaped(t), `${m.key} must be involution-shaped to be a magnet`)
  }
})

test('topics group and sort with the frontier last', () => {
  const topics = openQuestions([
    { claim: 'the vortex doubling orbit closes on the units of the ring', source: 'a' },
    { claim: 'the rosette walks seven rays by the trinity step', source: 'b' },
    { claim: 'qwxyzzle blorp untethered', source: 'c' },
  ], LEAN_LEDGER)
  assert.ok(topics.length >= 2)
  assert.equal(topics[topics.length - 1]!.topic, 'open frontier', 'the frontier sorts last')
  const total = topics.reduce((n, t) => n + t.items.length, 0)
  assert.equal(total, 3, 'every item lands exactly once')
})
