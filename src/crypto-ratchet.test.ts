// crypto-ratchet — the advancing chain, ISOLATED AS ITS OWN PROCESS (see crypto-onion for why: ~20s of independent
// PBKDF2 that must not queue behind another file's derivations). The property: identical plaintext must never seal
// identically, and a chain must break the moment a link is dropped, reordered or edited.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sealMessagesAcross, openMessages, sealChain, openChain } from './index.js'

test('the ratchet chain rotates, links forward, and breaks on drop, reorder or edit', () => {
  const msgs = ['dup', 'dup', 'dup'], keys = ['inner', 'outer']
  const across = sealMessagesAcross(msgs, ['key'], 8, 0)
  const streams = across.streams
  assert.equal(across.balance.gpuWorkers, 0, 'three jobs do not pay GPU postage')
  assert.ok(across.balance.parallelSteps <= msgs.length)
  assert.equal(across.balance.opened, msgs.length - across.balance.parallelSteps)
  assert.equal(new Set(streams.map((s) => s.receipt)).size, 3)            // identical plaintext, distinct envelopes
  assert.deepEqual(openMessages(streams, ['key']), msgs)
  const chain = sealChain(msgs, keys)
  assert.equal(chain.length, msgs.length, 'sealChain stays serial — one link per message, no fleet fan-out')
  assert.equal(chain[1].referer, chain[0].receipt)                        // forward-linked
  assert.equal(chain[2].referer, chain[1].receipt)
  assert.equal(new Set(chain.map((l) => l.step)).size, 3)                 // every step rotated to a fresh value
  assert.deepEqual(openChain(chain, keys), msgs)
  const c = sealChain(['a', 'b', 'c'], ['k'])
  assert.throws(() => openChain([c[0], c[2]], ['k']))                     // a dropped link
  assert.throws(() => openChain([c[1], c[0], c[2]], ['k']))               // a reordered chain
  const edited = c.map((l) => ({ ...l }))
  edited[1].uuids = c[0].uuids
  assert.throws(() => openChain(edited, ['k']))                           // an edited link: receipt ≠ its uuids
})
