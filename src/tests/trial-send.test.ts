import { test } from 'node:test'
import assert from 'node:assert/strict'
import { enrichTrialText, sendTrial } from '../trial-send.js'
import { toUuid } from '../address.js'

const PODCAST = `RFC 4122 defines a 128-bit Universally Unique Identifier with a standard printed form of 32 hex digits and 4 hyphens.
LDAP Distinguished Names are hierarchical path strings used to locate entries in a directory tree, as specified in X.500.
LDIF is the file interchange format for LDAP entries.
A UUID handle of eight hex characters can be split into four two-character path levels for directory indexing.
LDAP assigns distinguished names administratively; uuidna derives handles from content-addresses via handleOf.
The full uuid carries 128 payload bits; RFC 4122 reserves six bits for version and variant, leaving 122 free.
Route and verify need only the address; the payload store at src/handles loads when the prose body is required.
LDAP and uuidna both use tree-shaped paths for lookup, but only uuidna requires handleOfPath(handlePath(h)) to round-trip the handle.`

test('enrichTrialText attaches sealed theorem citations on uuidna topics', () => {
  const enriched = enrichTrialText(PODCAST)
  assert.match(enriched, /theorem speaking_an_address_costs_the_text/)
  assert.match(enriched, /theorem imprint_capacity_chain/)
  assert.match(enriched, /theorem handle_splits_four/)
  assert.match(enriched, /theorem payload_carries_the_strand/)
  assert.doesNotMatch(enriched, /theorem.*X\.500/)
})

test('sendTrial closes uuidna implementation gaps — sealed claims verify', () => {
  const trial = sendTrial(PODCAST, { title: 'UUID × LDAP' })
  assert.equal(trial.outcome, 'audited')
  assert.ok(trial.counts.verified >= 4, `expected ≥4 verified, got ${trial.counts.verified}`)
  assert.equal(trial.counts.refuted, 0)
  assert.equal(trial.counts.drained, 0)
  const addr = toUuid(PODCAST)
  assert.match(trial.receipt, /^[0-9a-f-]{36}$/)
  assert.notEqual(trial.address, addr)
})
