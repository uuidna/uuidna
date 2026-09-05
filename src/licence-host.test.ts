import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mayServe, LICENSED_HOSTS, REDIRECT_TO, redirectHost } from './licence-host.js'

test('THE NO-LOOP INVARIANT: the redirect target’s own host is licensed', () => {
  assert.ok(LICENSED_HOSTS.includes(redirectHost()),
    `${redirectHost()} is where every unlicensed host is sent; if it is not itself licensed, it redirects to itself forever`)
})

test('every host needs a licence — including uuidna.com, which has one', () => {
  assert.equal(mayServe('uuidna.com'), true, 'uuidna.com serves because it is WRITTEN DOWN, not because of a pattern')
})

test('the first-party wildcard is GONE — the other TLDs and every subdomain now need an entry', () => {
  for (const h of ['uuidna.net', 'uuidna.org', 'docs.uuidna.org', 'api.uuidna.net', 'www.uuidna.com'])
    assert.equal(mayServe(h), false, `${h} was auto-licensed by the old regex and is not licensed now`)
})

test('the lookalike hosts the old regex already refused are still refused', () => {
  for (const h of ['uuidna.com.attacker.net', 'notuuidna.org', 'uuidna.co', 'uuidna.com.evil.io'])
    assert.equal(mayServe(h), false)
})

test('case and the DNS trailing dot are not different hosts', () => {
  assert.equal(mayServe('UUIDNA.COM'), true)
  assert.equal(mayServe('uuidna.com.'), true)
})

test('the empty host and junk are refused rather than throwing', () => {
  for (const h of ['', '.', 'localhost']) assert.equal(mayServe(h), false)
})
