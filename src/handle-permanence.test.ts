// handle-permanence — DOI-class doors are hostname equality, never a URL substring.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isUuidnaUrl, textCitesUuidna, HANDLE_HOST, UUIDNA_HOSTNAME } from './handle-permanence.js'

test('isUuidnaUrl is hostname equality — not a substring of the origin', () => {
  assert.equal(UUIDNA_HOSTNAME, 'uuidna.com')
  assert.equal(isUuidnaUrl(`${HANDLE_HOST}/ab522809`), true)
  assert.equal(isUuidnaUrl(HANDLE_HOST), true)
  assert.equal(isUuidnaUrl(`${HANDLE_HOST}/`), true)
  assert.equal(isUuidnaUrl('https://uuidna.com.evil.com/'), false)
  assert.equal(isUuidnaUrl('https://evil.com/?q=https://uuidna.com'), false)
  assert.equal(isUuidnaUrl('http://uuidna.com/x'), false)
  assert.equal(isUuidnaUrl('not a url'), false)
})

test('textCitesUuidna parses extracted https URLs, never includes()', () => {
  assert.equal(textCitesUuidna('see https://uuidna.com/ab522809 for the door'), true)
  assert.equal(textCitesUuidna('see https://uuidna.com.evil.com/phish'), false)
  assert.equal(textCitesUuidna('the string uuidna.com is not a door'), false)
})
