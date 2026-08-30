import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  deepColourFromAddress, WORDS_HEX_CHARS, CHANNEL_BITS, WORDS_BITS, DEEP_COLOUR_STATES,
} from './index.js'

const SAMPLE = '12345678-1234-5678-1234-123456789abc'

test('48-bit words: three 16-bit channels, 12 hex digits, 2^48 states', () => {
  assert.equal(CHANNEL_BITS, 16)
  assert.equal(WORDS_HEX_CHARS, 12)
  assert.equal(WORDS_BITS, 48)
  assert.equal(DEEP_COLOUR_STATES, 2 ** 48)
  assert.equal(DEEP_COLOUR_STATES, 281474976710656)
})

test('deepColourFromAddress spells #RRRRGGGGBBBB from trinities', () => {
  const c = deepColourFromAddress(SAMPLE)
  assert.equal(c.r.length, 4)
  assert.equal(c.g.length, 4)
  assert.equal(c.b.length, 4)
  assert.equal(c.words, c.r + c.g + c.b)
  assert.equal(c.words.length, 12)
  assert.equal(c.spell, '#' + c.words)
})
