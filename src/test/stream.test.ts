// Stream tests — encrypted uuid messaging streams. Onion-seal round-trips, layer order, authentication, the
// bounded-layers guard, and the advancing-step equality-leak closure. Run against the built dist. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sealStream, openStream, sealMessages, openMessages, sealChain, openChain, MAX_LAYERS } from '../index.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

test('single-layer stream round-trips entirely through uuids', () => {
  const msg = 'the vortex speaks'
  const s = sealStream(msg, ['gold-string-60'])
  assert.ok(s.uuids.length >= 1)
  assert.equal(s.layers, 1)
  s.uuids.forEach((u) => assert.match(u, UUID))
  assert.match(s.receipt, UUID)
  assert.equal(openStream(s.uuids, ['gold-string-60']), msg)
})

test('onion layers peel outermost-first', () => {
  const msg = 'infinite layered — but finite'
  const keys = ['inner', 'middle', 'outer']
  const s = sealStream(msg, keys)
  assert.equal(s.layers, 3)
  assert.equal(openStream(s.uuids, keys), msg)
})

test('unicode survives the round-trip', () => {
  const msg = 'ℤ/9 · ∞ → dz(x)=10−x · 🜁'
  const s = sealStream(msg, ['k1', 'k2'])
  assert.equal(openStream(s.uuids, ['k1', 'k2']), msg)
})

test('wrong passphrase throws (Poly1305 authentication)', () => {
  const s = sealStream('secret', ['a', 'b'])
  assert.throws(() => openStream(s.uuids, ['a', 'WRONG']))
  assert.throws(() => openStream(s.uuids, ['WRONG', 'b']))
})

test('layer order matters — reversed keys fail', () => {
  const s = sealStream('order', ['k1', 'k2']) // inner k1, outer k2
  assert.throws(() => openStream(s.uuids, ['k2', 'k1']))
})

test('bounded: 0 layers and > MAX_LAYERS are refused', () => {
  assert.throws(() => sealStream('x', []))
  assert.throws(() => sealStream('x', new Array(MAX_LAYERS + 1).fill('k')))
  // exactly MAX_LAYERS is allowed and still round-trips
  const keys = new Array(MAX_LAYERS).fill(0).map((_, i) => `layer-${i}`)
  assert.equal(openStream(sealStream('deep', keys).uuids, keys), 'deep')
})

test('advancing stream: repeated messages seal to distinct uuids, still decrypt', () => {
  const msgs = ['dup', 'dup', 'dup']
  const streams = sealMessages(msgs, ['key'], 0)
  const receipts = new Set(streams.map((s) => s.receipt))
  assert.equal(receipts.size, 3) // equality leak closed — identical plaintext, distinct envelopes
  assert.deepEqual(openMessages(streams, ['key']), msgs)
})

test('ratchet chain: each link rotates from the prior receipt and round-trips', () => {
  const msgs = ['dup', 'dup', 'dup']
  const keys = ['inner', 'outer']
  const chain = sealChain(msgs, keys)
  // forward-linked: link i's receipt is link i+1's referer
  assert.equal(chain[1].referer, chain[0].receipt)
  assert.equal(chain[2].referer, chain[1].receipt)
  // every step rotated to a distinct fresh value even though the plaintext repeats
  assert.equal(new Set(chain.map((l) => l.step)).size, 3)
  assert.deepEqual(openChain(chain, keys), msgs)
})

test('ratchet chain: drop / reorder / edit breaks the referer', () => {
  const keys = ['k']
  const chain = sealChain(['a', 'b', 'c'], keys)
  assert.throws(() => openChain([chain[0], chain[2]], keys)) // dropped link
  assert.throws(() => openChain([chain[1], chain[0], chain[2]], keys)) // reordered
  const edited = chain.map((l) => ({ ...l }))
  edited[1].uuids = chain[0].uuids // swap in a different chain's uuids
  assert.throws(() => openChain(edited, keys)) // receipt no longer matches its uuids
})
