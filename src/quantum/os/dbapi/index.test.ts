import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dbQuery, dbApi, dbCensus } from './index.js'

test('the port is provenance and the census counts it', () => {
  assert.equal(dbCensus().domain, 'database')
  assert.ok(dbApi().records > 1000, 'the query surface spans the whole committed mirror, not just its own domain')
})

test('by key — the address is computed from the row, so no index can go stale', () => {
  const r = dbQuery({ by: 'key', key: 'sqlite' })
  assert.equal(r.rows.length, 1)
  assert.equal(r.total, 1)
  assert.ok(r.rows[0]!.address.length > 0)
  assert.equal(dbQuery({ by: 'key', key: 'sqlite' }).rows[0]!.address, r.rows[0]!.address, 'same row, same address')
})

test('NO MATCH is not ABSENT — the two are different facts and stay distinct', () => {
  // A missing mirror answering "0 rows" is indistinguishable from a query that genuinely matched nothing: the
  // green-over-absent shape in query clothing. The flag separates them before a caller can conflate them.
  const none = dbQuery({ by: 'key', key: 'no-such-package-xyz' })
  assert.equal(none.rows.length, 0)
  assert.equal(none.absent, false, 'the catalogue is present; this key simply is not in it')
})

test('a truncated answer says so, so it cannot read as a whole one', () => {
  const r = dbQuery({ by: 'text', text: 'postgres', limit: 5 })
  assert.equal(r.rows.length, 5)
  assert.ok(r.total > 5)
  assert.equal(r.truncated, true, 'rows.length < total MUST be stated, never implied by the caller counting')
  const whole = dbQuery({ by: 'text', text: 'postgres', limit: 10000 })
  assert.equal(whole.truncated, false)
})

test('dependents answer through the same door and the same shape', () => {
  const r = dbQuery({ by: 'dependents', key: 'sqlite-libs', limit: 5 })
  assert.equal(r.truncated, r.rows.length < r.total)
  assert.equal(r.absent, false)
})
