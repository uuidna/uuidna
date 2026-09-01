import { test } from 'node:test'
import assert from 'node:assert/strict'
import { authnPresence, addressCredential, enrol } from './index.js'

const enc = (s: string): Uint8Array => new TextEncoder().encode(s)

test('the pure half runs anywhere and needs no device', () => {
  // Addressing a credential is arithmetic over bytes. Splitting it from enrolment is what lets CI verify the
  // part that can be verified, instead of mocking an authenticator and proving that the mock works.
  const a = addressCredential(enc('cred-id-1'), enc('public-key-bytes'))
  const b = addressCredential(enc('cred-id-1'), enc('public-key-bytes'))
  const c = addressCredential(enc('cred-id-1'), enc('a-different-key'))
  assert.equal(a.address, b.address, 'the same key addresses the same way on every machine that sees it')
  assert.notEqual(a.address, c.address, 'a different public key must address elsewhere')
  assert.notEqual(a.address, addressCredential(enc('cred-id-2'), enc('public-key-bytes')).address, 'so must a different id')
})

test('the private half is never an input', () => {
  const a = addressCredential(enc('id'), enc('pub'))
  assert.match(a.honest, /private key never leaves the authenticator/)
  assert.ok(!('privateKey' in a), 'nothing here can carry one even by accident')
})

test('a host without an authenticator reports ABSENT, never failure and never a fake credential', async () => {
  // Node has no navigator.credentials. That is absent — a different fact from "enrolment failed" and from
  // "there is no key" — and the distinction is the same one the catalogue, the monitor and the compilers keep.
  const p = authnPresence()
  assert.equal(p.available, false, 'this test runs on Node')
  assert.match(p.why, /absent rather than refused/)
  const r = await enrol(enc('challenge'))
  assert.equal(r.enrolled, false)
  assert.ok(!r.enrolled && /no WebAuthn on this host/.test(r.why))
})

test('presence separates the API from the secure context — two different reasons to be unable', () => {
  const p = authnPresence()
  assert.equal(typeof p.available, 'boolean')
  assert.equal(typeof p.secureContext, 'boolean')
  // a browser on http:// HAS the API and still cannot use it; collapsing those into one boolean would report
  // "no webauthn here" to a user whose key works fine one scheme away
  assert.ok(p.why.length > 0)
})
