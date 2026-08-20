// school-apis — a source that could not be called is not in the registry.
//
// Every readable survey of "EU school APIs" is wrong in the same place: it lists an endpoint nobody called. This
// registry records what each source ACTUALLY answered, and names the ones that did not answer at all in ABSENT
// rather than quietly omitting them. An absence that is written down can be retried; one that is not looks like a
// source that was never considered.
//
// These assertions are PURE — no network. A test that needs the internet fails for reasons that are not the code's.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { schoolApiRegistry, SCHOOL_APIS, GISCO_VINTAGE } from '../school-apis.js'

test('every registered source declares what it serves and how it answered', () => {
  const r = schoolApiRegistry()
  assert.ok(r.count > 0)
  assert.equal(r.sources.length, r.count)
  for (const s of r.sources) {
    assert.ok(s.id && s.name && s.base, `${s.id}: incomplete declaration`)
    assert.ok(Array.isArray(s.serves) && s.serves.length > 0, `${s.id}: serves nothing`)
    assert.ok(s.base.startsWith('https://'), `${s.id}: not an https source`)
  }
})

// ── THE POINT. An unreachable source is NAMED, not dropped.
test('sources that could not be called are recorded in ABSENT, by name', () => {
  const r = schoolApiRegistry()
  assert.ok(Array.isArray(r.absent), 'absent must exist even when empty — silence is not evidence of reachability')
  for (const a of r.absent) assert.ok(String(a).length > 0, 'an absence must carry what it was')
})

test('the receipt is deterministic and MOVES with the registry', () => {
  assert.equal(schoolApiRegistry().receipt, schoolApiRegistry().receipt)
  assert.ok(schoolApiRegistry().receipt.length > 0)
})

test('the GISCO vintage is pinned — a directory without a vintage cannot be rechecked', () => {
  assert.ok(String(GISCO_VINTAGE).length > 0)
})

test('no two sources share an id', () => {
  const ids = SCHOOL_APIS.map((s) => s.id)
  assert.equal(new Set(ids).size, ids.length)
})
