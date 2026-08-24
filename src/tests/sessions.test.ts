// sessions — THE ROSTER IS CLOCKLESS, SELF-OWNED, AND FOLDS TO ONE RECEIPT. What must be reachable: a session
// updates only its OWN line (a crew cannot edit another's), staleness is decided by LEDGER DISTANCE and never
// by a clock, a polite departure is different from ageing out, and two devices with the same entries fold to
// the same receipt — the property a unix socket could never have, and the reason origin is the transport.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { announce, live, stale, depart, sessionHandle, rosterReceipt, DRIFT, type SessionEntry } from '../sessions.js'

const at = (handle: string, ledger: number): SessionEntry =>
  ({ handle, host: 'device-a', purpose: 'work', head: 'abc1234', ledger })

test('a session identity is stable across its life, and distinct per host, purpose and birth', () => {
  const a = sessionHandle('mac-1', 'porting', 'c0ffee:31')
  assert.equal(a, sessionHandle('mac-1', 'porting', 'c0ffee:31'), 're-announcing is the same session')
  assert.notEqual(a, sessionHandle('mac-2', 'porting', 'c0ffee:31'), 'another device is another session')
  assert.notEqual(a, sessionHandle('mac-1', 'auditing', 'c0ffee:31'), 'another purpose is another session')
  assert.match(a, /^[0-9a-f]{8}$/)
})

test('CONTROL — announcing updates only my own line; another crew\'s entry is untouched', () => {
  const roster = [at('aaaaaaaa', 100), at('bbbbbbbb', 101)]
  const after = announce(roster, { ...at('aaaaaaaa', 140), purpose: 'moved on' })
  assert.equal(after.length, 2, 'one line per session, never two')
  assert.equal(after.find((e) => e.handle === 'aaaaaaaa')?.ledger, 140)
  assert.deepEqual(after.find((e) => e.handle === 'bbbbbbbb'), at('bbbbbbbb', 101), 'the neighbour is byte-identical')
})

test('staleness is LEDGER DISTANCE, not time — no clock is consulted anywhere', () => {
  const roster = [at('aaaaaaaa', 100), at('bbbbbbbb', 100 - DRIFT), at('cccccccc', 100 - DRIFT - 1)]
  const now = 100
  assert.deepEqual(live(roster, now).map((e) => e.handle), ['aaaaaaaa', 'bbbbbbbb'], 'exactly at the drift is still live')
  assert.deepEqual(stale(roster, now).map((e) => e.handle), ['cccccccc'], 'one past the drift is presumed departed')
  assert.equal(live(roster, now).length + stale(roster, now).length, roster.length, 'every line is one or the other')
})

test('a polite departure gives the line back; a crash lets it age out instead', () => {
  const roster = [at('aaaaaaaa', 100), at('bbbbbbbb', 100)]
  assert.deepEqual(depart(roster, 'aaaaaaaa').map((e) => e.handle), ['bbbbbbbb'])
  assert.deepEqual(depart(roster, 'nobody').map((e) => e.handle), ['aaaaaaaa', 'bbbbbbbb'], 'departing twice is quiet')
})

test('two devices with the same roster fold to the same receipt — and a single changed line moves it', () => {
  const a = [at('aaaaaaaa', 100), at('bbbbbbbb', 101)]
  const b = [at('bbbbbbbb', 101), at('aaaaaaaa', 100)]     // same entries, announced in another order
  assert.equal(rosterReceipt(announce(announce([], a[0]!), a[1]!)), rosterReceipt(announce(announce([], b[0]!), b[1]!)),
    'announce sorts, so two devices converge on one receipt regardless of who spoke first')
  assert.notEqual(rosterReceipt(a), rosterReceipt([at('aaaaaaaa', 100), at('bbbbbbbb', 102)]), 'one moved line moves the receipt')
})
