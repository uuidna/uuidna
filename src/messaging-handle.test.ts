// messaging-handle — the message of record held to its form: the glyphs really are the address (not decoration),
// the round-trip returns the exact text, a wrong passphrase refuses rather than guesses, a tampered envelope
// refuses, and the door is derived — with a control proving the reader can fail.
import { test } from 'node:test'
import assert from 'node:assert'
import { envelopeOf, readEnvelope } from './quantum/apps/categories/coding/index.js'
import { toUuid } from './index.js'

const PASS = 'two-coins-to-the-bar'
const KEY = 'two_coins'

test('the glyphs ARE the address — 32 of them, derived, never decorative', () => {
  const e = envelopeOf('the wave landed; hold your writes for eight minutes', KEY, PASS, 'please hold')
  assert.equal([...e.glyphs].length, 32, 'one glyph per hexbit state of the address')
  assert.equal(e.address, toUuid('the wave landed; hold your writes for eight minutes'))
  assert.equal(e.handle.length, 8)
  assert.ok(e.door >= 0 && e.door < 6, 'the door is the first state mod six — a rotation, always in range')
})

test('the round-trip returns the exact text, and says so honestly', () => {
  const text = 'convoy at 0c469d64, ledger 1469, tests 587/587'
  const r = readEnvelope(envelopeOf(text, KEY, PASS), PASS)
  assert.equal(r.opened, true)
  assert.equal(r.text, text)
  assert.ok(r.why.includes('recomputes'), 'the reason names the check that was actually performed')
})

test('a wrong passphrase refuses — it never guesses and never half-opens', () => {
  const r = readEnvelope(envelopeOf('hold the tree', KEY, PASS), 'not-the-passphrase')
  assert.equal(r.opened, false)
  assert.equal(r.text, null)
  assert.ok(r.why.length > 0, 'a refusal must say why')
})

test('CONTROL — a tampered envelope refuses: the reader can fail, so its acceptances mean something', () => {
  const e = envelopeOf('the gate is green', KEY, PASS)
  const tampered = { ...e, address: toUuid('the gate is red') }
  const r = readEnvelope(tampered, PASS)
  assert.equal(r.opened, false, 'identity and cargo disagreeing must refuse')
  assert.ok(r.why.includes('disagree') || r.why.includes('not this one'))
})

test('the form is stated, so a receiver never has to guess the reading order', () => {
  const e = envelopeOf('anything', KEY, PASS, 'the ask lives here')
  assert.ok(e.form.includes('glyphs first'))
  assert.equal(e.tldr, 'the ask lives here', 'what cannot recompute is carried, not dropped')
})
