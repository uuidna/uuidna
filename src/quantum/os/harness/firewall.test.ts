// firewall — the inversion, and the four populations it has to separate.
//
// The tests that matter are the REJECTIONS. A firewall that admits everything is indistinguishable from no
// firewall, and it is the exact artefact this module exists because of: the four-frame section of the README
// returns four success verdicts for a fabricated key, a false statement, an empty string and an injection
// payload, because nothing in it can refuse. So the first thing asserted here is that this one can.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { admit, citationsIn, screen, actionable, admitAddress } from '../../../firewall/index.js'
import { reveal } from '../../../gate.js'

const SEALED = 'two_coins'          // a key the ledger actually holds
const DEAD = 'corroboration_needs_two'  // a key it purged — quoted in a comment tonight, and caught

test('THE INVERSION — the gate admits silence, the firewall does not', () => {
  const silent = 'a claim citing nothing at all'
  // the gate's binary is "not drained", so an uncited claim passes it
  assert.equal(reveal(silent).binary, 1)
  assert.equal(reveal(silent).verdict, 'UNVERIFIED')
  // the firewall's question is "is this sealed", and silence is not a seal
  const a = admit(silent)
  assert.equal(a.state, 'open', 'not admitted — and NOT refuted, per silence_never_refutes')
  assert.equal(a.witness, 'none', 'and the type says who witnessed it: nobody')
  assert.equal(actionable(a), false, 'declining to ACT is the firewall to decide; refuting is not')
})

test('a sealed citation is admitted, and carries the address it resolved to', () => {
  const a = admit(`this is backed by theorem ${SEALED}`)
  assert.equal(a.state, 'admitted')
  assert.equal(a.witness, 'ledger', 'admitted is witnessed by the ledger, not by the firewall')
  if (a.state === 'admitted') {
    assert.deepEqual([...a.seals], [SEALED])
    assert.match(a.addresses[0]!, /^[0-9a-f-]{36}$/)
  }
})

test('A DEAD CITATION IS REFUSED — the case that reads exactly like a live one', () => {
  const a = admit(`this is backed by theorem ${DEAD}`)
  assert.equal(a.state, 'refuted', 'evidence was OFFERED and the ledger lacks it — the one decidably-false case')
  assert.equal(a.witness, 'ledger')
  if (a.state === 'refuted') {
    assert.deepEqual([...a.fabricated], [DEAD])
    assert.match(a.reason, /does not seal/)
  }
})

test('one live key does not carry one dead one — a claim is not three-quarters admitted', () => {
  const a = admit(`backed by theorem ${SEALED} and theorem ${DEAD}`)
  assert.equal(a.state, 'refuted')
  if (a.state === 'refuted') assert.deepEqual([...a.fabricated], [DEAD])
})

test('THE ADVERSARIAL SET THE FOUR FRAMES ADMITTED — every one refused here', () => {
  for (const hostile of ['', '   ', 'DROP TABLE theorems; --', '1 = 2', 'totally_invented_nonsense_key']) {
    assert.equal(actionable(admit(hostile)), false, `actionable: ${JSON.stringify(hostile)}`)
    assert.notEqual(admit(hostile).state, 'admitted')
  }
})

test('citations are read from the same three surfaces the deadkey finder reads', () => {
  assert.deepEqual(citationsIn(`theorem ${SEALED}`), [SEALED])
  assert.deepEqual(citationsIn(`/theorem/${SEALED}`), [SEALED])
  assert.deepEqual(citationsIn(`\`${SEALED}\``), [SEALED])
  assert.deepEqual(citationsIn('no citation here'), [])
})

test('screen reports its denominator AND the ledger it screened against', () => {
  const s = screen([`theorem ${SEALED}`, 'nothing', `theorem ${DEAD}`])
  assert.equal(s.claims, 3)
  assert.equal(s.admitted, 1)
  assert.equal(s.refuted, 1, 'the dead citation is refuted — evidence offered, absent')
  assert.equal(s.open, 1, 'the uncited claim is OPEN — nothing offered, nothing refuted')
  assert.ok(s.ledgerSize > 1000, 'the ledger screened against is named, not assumed')
})

test('THE BOUNDARY, asserted so it is a decision and not an omission: it cannot refuse the IRRELEVANT', () => {
  // a sealed key cited beside a claim it does not support is still admitted — the firewall refuses the
  // unsealed, never the unsupported. "The gate proves backed, not authentic."
  const a = admit(`the moon is made of cheese, theorem ${SEALED}`)
  assert.equal(a.state, 'admitted', 'this is the documented limit, not a bug — closing it needs support, not membership')
})

test('THE PAYLOAD-FREE PATH — a message is an address, resolved in memory, nothing parsed', async () => {
  const { theorems } = await import('../../../theorems/index.js')
  const t = theorems()[0]!
  const ok = admitAddress(t.address)
  assert.equal(ok.state, 'admitted')
  if (ok.state === 'admitted') assert.deepEqual([...ok.seals], [t.key])
  // presenting an address IS a claim, so failing to resolve is a refutation with a witness
  assert.equal(admitAddress('00000000-0000-0000-0000-000000000000').state, 'refuted')
  assert.equal(admitAddress('not-an-address').state, 'refuted')
  // presenting NOTHING claims nothing — open, witnessed by nobody
  assert.equal(admitAddress('').state, 'open')
})
