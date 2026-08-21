// laws — the standing invariants live IN uuidna and every one is DEMONSTRATED by its gate. This test
// is generated from the same gates, so it is green unless a law actually breaks (then holds:false and this goes red).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { laws } from '../index.js'

test('uuidna states its laws IN uuidna, and every law holds by recomputation (not by prose)', () => {
  const r = laws()
  assert.ok(r.laws.length >= 5, 'the standing laws are stated')
  for (const l of r.laws) {
    assert.ok(l.law.length > 0 && l.enforcedBy.length > 0, 'each law names what enforces it')
    assert.equal(typeof l.holds, 'boolean', 'each law reports a COMPUTED holds')
    assert.ok(l.holds, `law holds by its gate: ${l.enforcedBy}`)
  }
  assert.ok(r.allHold, 'all standing laws hold — demonstrated, recomputable')
  assert.match(r.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(laws().receipt, r.receipt, 'recomputable — same gates, same receipt')
})
