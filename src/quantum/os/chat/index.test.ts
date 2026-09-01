import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chatApi, chatSend, chatOpen, openMessage, chatProtocols, chatCensus, gateMessage } from './index.js'

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

// ── SANITISE ON RECEIVE ───────────────────────────────────────────────────────────────────────────────────────
//
// NO LITERAL CONTROL OR BIDI BYTES IN THIS FILE, built from escapes instead — the same rule sanitize.ts keeps.
// The reason arrived as a demonstration: writing these tests with the real characters inline was refused by the
// tooling for "control characters that would be hidden in the approval dialog", which is precisely the attack
// under test. A file about invisible characters must not contain invisible characters.
const RLO = String.fromCharCode(0x202E)   // right-to-left override — the Trojan-Source lever
const NUL = String.fromCharCode(0x00)     // C0 control — log and terminal injection

test('a Trojan-Source message is scrubbed for display and the scrub is DISCLOSED', () => {
  // The override makes displayed text differ from actual text (CVE-2021-42574): a reviewer sees one thing and
  // the machine reads another. Returning cleaned text with no signal would be the defence behaving like the
  // attack — the reader still could not tell that what arrived is not what is shown.
  const sent = chatSend('transfer to alice' + RLO + 'rehcuov a si siht', 'p', 'r', 0)
  const o = openMessage(sent.chain, 'p', 'r')
  assert.equal(o.altered, true, 'the scrub must be disclosed, never silent')
  assert.ok(!o.text.includes(RLO), 'the displayed text carries no bidi override')
  assert.ok(o.raw.includes(RLO), 'and the RAW bytes are preserved — the address is over those')
})

test('control characters are scrubbed too', () => {
  const o = openMessage(chatSend('clean' + NUL + 'text', 'p', 'r', 1).chain, 'p', 'r')
  assert.equal(o.altered, true)
  assert.ok(!o.text.includes(NUL))
})

test('an ordinary message is NOT reported as altered', () => {
  // The control that makes `altered` mean something: if everything were flagged, nothing would be.
  const o = openMessage(chatSend('the wave lands', 'p', 'r', 2).chain, 'p', 'r')
  assert.equal(o.altered, false)
  assert.equal(o.text, o.raw)
})

test('scrubbing does not rewrite what was sealed', () => {
  // The address folds the sealed bytes. If scrubbing changed them, two readers of one message would compute
  // different addresses and the channel would lose the property that makes it citable.
  const trojan = 'a' + RLO + 'b'
  const sent = chatSend(trojan, 'p', 'r', 3)
  assert.equal(openMessage(sent.chain, 'p', 'r').raw, trojan, 'the raw bytes round-trip exactly')
})

test('chatOpen still returns a plain string, and it is the SAFE one', () => {
  const s = chatOpen(chatSend('plain' + RLO + 'text', 'p', 'r', 4).chain, 'p', 'r')
  assert.equal(typeof s, 'string')
  assert.ok(!s.includes(RLO), 'the simple door hands back the scrubbed text, not the raw')
})
