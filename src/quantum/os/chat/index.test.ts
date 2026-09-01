import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chatApi, chatSend, chatOpen, chatProtocols, chatCensus, gateMessage } from './index.js'

test('the port is provenance and the census counts it', () => {
  const c = chatCensus()
  assert.equal(c.domain, 'chat')
  assert.ok(c.packages > 0 && c.origins > 0, 'a chat domain with no members would make the API a claim about nothing')
  assert.ok(c.origins < c.packages, 'origins collapse -dev/-doc/-openrc siblings, so they must be strictly fewer')
})

test('protocol families OVERLAP by design — a bridge names both sides', () => {
  const fams = chatProtocols()
  const sum = fams.reduce((s, f) => s + f.packages, 0)
  // The interesting assertion is the INEQUALITY. bitlbee is IRC and XMPP at once; bucketing it once would erase
  // exactly the fact that makes a bridge a bridge, so the families are allowed to double-count and the sum is
  // expected to EXCEED the census. A sum that matched would mean the overlap had been silently thrown away.
  assert.ok(sum > chatCensus().packages, 'families that never overlapped would mean every package speaks one protocol, which bridges disprove')
  assert.ok(fams.some((f) => f.protocol === 'irc' && f.packages > 0), 'irc is the largest family Alpine publishes')
})

test('the one API round-trips, and the room is a real boundary', () => {
  const sent = chatSend('the wave lands', 'captain-pass', 'ops', 0)
  assert.ok(sent.chain.length > 0, 'the envelope travels as uuids — the channel IS the address space')
  assert.equal(chatOpen(sent.chain, 'captain-pass', 'ops'), 'the wave lands')
  // THE CONTROL, and the whole reason `room` exists: a receiver naming a different room must NOT open it.
  assert.throws(() => chatOpen(sent.chain, 'captain-pass', 'other-room'), 'a different room opening the envelope would mean the session is decoration')
  assert.throws(() => chatOpen(sent.chain, 'wrong-pass', 'ops'), 'a wrong passphrase must not open it either')
})

test('the ratchet refuses a step it cannot rotate on', () => {
  assert.throws(() => chatSend('x', 'p', 'r', -1), /non-negative integer/)
  assert.throws(() => chatSend('x', 'p', 'r', 1.5), /non-negative integer/)
})

test('chatApi states the limit rather than implying a bridge', () => {
  const a = chatApi()
  assert.match(a.honest, /speaks no IRC, XMPP or Matrix/, 'the API must say what it cannot do; a port that implied federation would be the overreach')
  assert.match(a.honest, /nothing installed, linked or run/)
  assert.equal(a.receipt, chatApi().receipt, 'the receipt recomputes — same mirror, same answer')
})

// ── TREASON IN MESSAGING ──────────────────────────────────────────────────────────────────────────────────────

test('a FABRICATED citation is refused — treason does not ride the wire', () => {
  // A commit citing an unsealed theorem is refused at the commit-msg hook and always was. The identical forgery
  // in a message was sealed and sent with nobody looking: same tree, same ledger, one door checked. It is worse
  // here than in a commit, because a sealed message arrives somewhere its recipient cannot audit.
  assert.throws(
    () => chatSend('proven by theorem totally_made_up_key_9999', 'p', 'r', 0),
    /REFUSED.*does not seal/s,
    'sealing a false citation would put uuidna\'s own integrity behind a claim nobody can check',
  )
})

test('a REAL citation seals and signs', () => {
  const m = chatSend('proven by theorem two_coins', 'p', 'r', 1)
  assert.ok(m.chain.length > 0)
  assert.equal(m.gate.signed, true, 'a message naming a sealed theorem is signed, exactly as a commit is')
  assert.deepEqual(m.gate.fabricated, [])
})

test('a message with no citation is not thereby suspect', () => {
  const m = chatSend('the wave lands', 'p', 'r', 2)
  assert.deepEqual(m.gate.fabricated, [])
  assert.equal(m.gate.signed, false, 'unsigned is not refused — most messages cite nothing and that is fine')
})

test('the verdict travels WITH the message, so the recipient sees it too', () => {
  const m = chatSend('the wave lands', 'p', 'r', 3)
  assert.ok(m.gate, 'a gate verdict the sender keeps to itself protects nobody downstream')
  assert.equal(typeof m.gate.signed, 'boolean')
})

test('gateMessage is the same gate, callable without sending', () => {
  assert.deepEqual(gateMessage('nothing cited here').fabricated, [])
  assert.ok(gateMessage('theorem totally_made_up_key_9999').fabricated.length > 0)
})
