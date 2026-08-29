// mcp-wire — caps are occupancy × fold, never a decimal guess.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ADDRESS_BYTES, KEY_BYTES, COINS } from '../hexbit/index.js'
import { WORD_BYTES, WIRE_CAP, SCHEMA_CAP, LAW_PHRASE, clipWire, sealToolWire } from '../mcp-wire.js'

test('wire caps are 64-bit words derived from the coin', () => {
  assert.equal(WORD_BYTES, ADDRESS_BYTES / COINS)
  assert.equal(WIRE_CAP, WORD_BYTES * ADDRESS_BYTES)
  assert.equal(SCHEMA_CAP, KEY_BYTES)
  assert.equal(LAW_PHRASE, KEY_BYTES * COINS + ADDRESS_BYTES)
})

test('clipWire never exceeds WIRE_CAP and keeps Returns when they fit', () => {
  const short = 'Purpose. Returns {a}.'
  assert.equal(clipWire(short), short)
  const essay = 'Purpose of the tool in one long sentence that will be sliced because it exceeds the wire cap which is one address of 64-bit words. Returns {a,b,c}. Derivation and history billed to every request if left here. theorem drift_is_named_or_caught.'
  const clipped = clipWire(essay)
  assert.ok(clipped.length <= WIRE_CAP, `clipped ${clipped.length} > cap ${WIRE_CAP}`)
  assert.ok(clipped.startsWith('Purpose'), 'keeps the purpose head')
})

test('sealToolWire moves the essay to detail and never puts detail on the listing triple', () => {
  const t = sealToolWire({
    name: 'uuidna_x',
    description: 'A. '.repeat(80) + 'Returns {z}. extra essay that must leave the wire.',
    detail: undefined as string | undefined,
    inputSchema: { type: 'object', properties: { q: { type: 'string', description: 'a long parameter blurb that should clip because it exceeds one digest of explanation bytes on the wire' } } },
  })
  assert.ok(t.description.length <= WIRE_CAP)
  assert.ok(t.detail && t.detail.length > t.description.length)
  const prop = (t.inputSchema as { properties: { q: { description: string } } }).properties.q.description
  assert.ok(prop.length <= SCHEMA_CAP)
})
