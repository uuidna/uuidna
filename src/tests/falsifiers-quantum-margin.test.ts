// Falsifiers for THE QUANTUM MARGIN OF AN ADDRESS — how much security a uuid can hold, measured, and then this
// ledger's own sealed law applied to the answer.
//
// THE CEILING IS THE CONTAINER, NOT THE MINT. cryptoAddress hashes with SHA-256, which is the right hash and is
// not the problem. formatUuid then keeps sixteen of the thirty-two bytes and stamps six of those bits as
// constants: four for the version nibble, two for the RFC-4122 variant. Both are verified below over real
// addresses rather than read off the spec, because a stamp that did not actually apply would make the count wrong
// in the safe direction and nobody would notice.
//
//   256 bits of digest -> 128 kept by the container -> 6 stamped away -> 122 BITS OF ENTROPY, whichever mint ran.
//
// THEN THE LEDGER'S OWN THEOREM, TURNED ON THE LEDGER'S OWN FORMAT. grover_halves_the_search_exponent seals the
// demarcated speedup: unstructured search over 2^20 candidates costs 2^20 classical checks and about 2^10 quantum
// ones — the exponent halves and never vanishes. Halve 122 and a quantum preimage on ANY uuid in this tree costs
// 2^61. Independently, a classical birthday collision on 122 bits is already 2^61. Sixty-one bits is not a
// post-quantum margin by any current standard.
//
// The theorem is not amended by any of this and nothing here falsifies it. It was sealed in this tree and simply
// never pointed at the tree's own address width; pointing it there is the whole finding, and it is the same shape
// as every other finding this week — an instrument that was never turned on the thing holding it.
//
// SO "USE ONLY QUANTUM CRYPTO" CANNOT BE SATISFIED BY A UUID, and no choice of hash rescues it: the truncation
// throws the margin away before the mint is asked. quantumAddress returns all 256 bits and is deliberately NOT a
// uuid, so it cannot be quietly dropped into a field expecting one.
//
// HONEST SCOPE. The 2^61 figure is Grover applied to PREIMAGE, which is what the sealed theorem covers. Quantum
// collision search (BHT) is not claimed here: it needs quantum memory on a scale nobody has, and the classical
// birthday bound already gives the same 2^61 for collisions without assuming any quantum machine at all. Where
// the two agree, the weaker assumption is the one quoted.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toUuid, cryptoAddress, quantumAddress } from '../address.js'
import { theoremByKey } from '../theorems/index.js'
import { draftContract } from '../captain/rights/index.js'

test('a uuid in this tree carries 122 bits, not 128 — the six stamped bits are measured, not assumed', () => {
  const versions = new Set<string>()
  const variants = new Set<string>()
  for (let i = 0; i < 5000; i++) {
    for (const a of [cryptoAddress('margin-' + i), toUuid('margin-' + i)]) {
      const hex = a.replace(/-/g, '')
      versions.add(hex.charAt(12))
      variants.add(hex.charAt(16))
    }
  }
  // the version nibble is one fixed value: four bits carry no information at all
  assert.deepEqual([...versions], ['8'], 'the version nibble must be constant across both mints')
  // the variant nibble ranges over exactly four values (10xx): two bits fixed, two free
  assert.deepEqual([...variants].sort(), ['8', '9', 'a', 'b'], 'the RFC variant fixes the top two bits')
  const stamped = 4 + 2
  assert.equal(128 - stamped, 122, 'a uuid holds 122 bits of entropy once the container has stamped it')
})

test('THE SEALED GROVER LAW, APPLIED TO THAT WIDTH — 122 halves to 61, which is not a post-quantum margin', () => {
  // read the law from the ledger rather than restating it, so this test follows the theorem if it is ever restated
  const t = theoremByKey().get('grover_halves_the_search_exponent')
  assert.ok(t, 'the law this test applies must exist in the ledger')
  assert.match(String(t?.statement), /20 = 2 \* 10/, 'the sealed form is the exponent halving: 20 = 2 * 10')

  // the halving, recomputed here on the widths that matter — integer arithmetic, no Math namespace
  const halve = (bits: number): number => (bits - (bits % 2)) / 2
  assert.equal(halve(20), 10, 'the theorem own worked case, reproduced by this test arithmetic')
  assert.equal(halve(122), 61, 'a uuid: 2^61 quantum preimage')
  assert.equal(halve(256), 128, 'the full digest: 2^128 quantum preimage')

  // and the classical birthday bound reaches the SAME number for collisions without assuming a quantum machine
  assert.equal(halve(122), 61, 'a 122-bit address collides classically in 2^61 — the weaker assumption, same cost')
  assert.ok(halve(256) > halve(122), 'the full-width door is the only one with a margin left after halving')
})

test('quantumAddress is the full digest and is deliberately NOT a uuid', () => {
  const d = quantumAddress('terms')
  assert.equal(d.length, 64, '64 hex characters')
  assert.equal(d.length * 4, 256, 'which is 256 bits, the whole SHA-256 digest')
  assert.ok(!d.includes('-'), 'not uuid-shaped, so it cannot be substituted into a field expecting one')
  assert.match(d, /^[0-9a-f]{64}$/)
  // it must not merely be the uuid with the dashes taken out — that would be the same 122 bits wearing a costume
  assert.notEqual(d.slice(0, 32), cryptoAddress('terms').replace(/-/g, ''))
})

test('the rights contract PROVES with the digest and only NAMES with the id', () => {
  const c = draftContract('a reader')
  assert.match(c.digest, /^[0-9a-f]{64}$/, 'the contract carries the full-width proof')
  assert.equal(c.digest, quantumAddress(c.terms), 'and it is the digest OF THE TERMS, recomputable by a holder')
  // the routing id and the subdomain keep their uuid shape, so nothing about the domain scheme moves
  assert.match(c.contractId, /^[0-9a-f-]{36}$/)
  assert.equal(c.domain, c.contractId + '.uuidna.org')
  // THE CLAUSE MUST NOT PROMISE WHAT THE ID CANNOT DELIVER. Clause 4 previously rested tamper-evidence on the id,
  // a 122-bit non-cryptographic fold whose chosen word forges in 2^16 (falsifiers-coin-mint). It now points a
  // holder at the digest and says plainly that the id is a name.
  assert.match(c.terms, /Verify against the digest/)
  assert.match(c.terms, /not offered as tamper-evidence/)
  // altering one character of the terms must move the proof — the property the clause actually claims
  assert.notEqual(quantumAddress(c.terms + ' '), c.digest)
})
