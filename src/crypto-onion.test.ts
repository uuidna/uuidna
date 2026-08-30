// crypto-onion — the layered seal and every shape of text, ISOLATED AS ITS OWN PROCESS. It shares no corpus with the
// other crypto files, so putting it beside them only serialised ~19s of PBKDF2 behind them; node's test runner
// parallelises FILES, so an independent heavy unit belongs in its own file. Split by MEASUREMENT, not by taste.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encrypt, decrypt, sealStream, openStream } from './index.js'
import { UUID } from './test-api.js'

const KEY = 'gold-string-60'

test('the onion: layers peel outermost-first, order is load-bearing, and every shape of text survives', () => {
  const keys = ['inner', 'middle', 'outer']
  const s = sealStream('infinite layered — but finite', keys)
  assert.equal(s.layers, 3)
  s.uuids.forEach((u) => assert.match(u, UUID))
  assert.match(s.receipt, UUID)
  assert.equal(openStream(s.uuids, keys), 'infinite layered — but finite')
  const two = sealStream('order', ['k1', 'k2'])                           // inner k1, outer k2
  assert.equal(openStream(two.uuids, ['k1', 'k2']), 'order')
  assert.throws(() => openStream(two.uuids, ['k2', 'k1']))                // reversed keys fail
  assert.throws(() => openStream(two.uuids, ['k1', 'WRONG']))             // a wrong layer key fails
  assert.equal(decrypt(encrypt('', KEY), KEY), '')                        // empty
  const big = 'harmonic life between 30 and 60 · '.repeat(200)
  assert.equal(decrypt(encrypt(big, KEY), KEY), big)                      // large
  assert.equal(decrypt(encrypt('ℤ/9 · ∞ → dz(x)=10−x · 🜁', KEY), KEY), 'ℤ/9 · ∞ → dz(x)=10−x · 🜁')
  // multilingual: the property under test is the CODEC, not the key derivation, so the scripts travel as one
  // payload — one derivation, and each string is still asserted individually on arrival (the rosetta dimension).
  const tongues = ['доказателство', '概念验证', 'preuve de concept', 'دليل', '증명', 'Machbarkeitsnachweis', 'सिद्धि']
  const opened = JSON.parse(decrypt(encrypt(JSON.stringify(tongues), KEY), KEY)) as string[]
  tongues.forEach((t, i) => assert.equal(opened[i], t))
})
