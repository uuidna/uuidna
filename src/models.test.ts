// quantum/models — ALL PUBLIC LIVE DATA, TESTED FOR EXACTNESS. The comparison computes from the committed
// mirror alone: every row's arithmetic recomputes independently, the census statistics agree with the rows,
// prices stay verbatim strings (no float ever parsed), the fold lands on 16 on-lattice pairs for any input,
// and the receipt is change-sensitive — a tampered mirror is CAUGHT. Nothing here benchmarks a vendor.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { UUID_HEXBITS, COINS, HEXBIT_BITS, UUID_BITS } from './hexbit/index.js'
import { modelComparison, foldLlm, HEXBITS_PER_TOKEN, TOKEN_BYTES, UUID_TEXT_CHARS, UUID_PAYLOAD_BITS } from './quantum/models/index.js'
import { MODELS_MIRROR } from './quantum/models/mirror.js'

test('EXACT over the whole census — every row recomputes from its mirror model, none invented, none dropped', () => {
  const c = modelComparison()
  assert.equal(c.count, MODELS_MIRROR.count)
  assert.equal(c.rows.length, MODELS_MIRROR.models.length)
  const byId = new Map(MODELS_MIRROR.models.map((m) => [m.id, m]))
  for (const r of c.rows) {
    const m = byId.get(r.id)
    assert.ok(m, `${r.id} is not in the mirror — a row from nowhere is not a census`)
    assert.equal(r.hexbitCapacity, m!.contextTokens * HEXBITS_PER_TOKEN)
    const chars = m!.contextTokens * TOKEN_BYTES
    assert.equal(r.uuidsPerContext, (chars - (chars % UUID_TEXT_CHARS)) / UUID_TEXT_CHARS)
    assert.equal(typeof r.promptPrice, 'string', 'a price is a published label, never a float')
  }
  assert.equal(c.largestContext, c.rows[0]!.contextTokens, 'widest window leads the census')
  assert.equal(c.totalTransientHexbits, c.rows.reduce((s, r) => s + r.hexbitCapacity, 0))
})

test('the fold lands on UUID_HEXBITS/COINS on-lattice pairs for ANY input — and pairs flatten back to the states', () => {
  const pairs = UUID_HEXBITS / COINS
  for (const text of ['', 'x', 'a model output', 'y'.repeat(50_000)]) {
    const f = foldLlm(text)
    assert.equal(f.pairs.length, pairs)
    assert.equal(f.hexbits.length, UUID_HEXBITS)
    assert.equal(f.foldedHexbits, UUID_HEXBITS)
    assert.equal(f.foldedPairs, pairs)
    assert.deepEqual(f.pairs.flat(), f.hexbits)
    for (const [a, b] of f.pairs) { assert.ok(a >= 0 && a < 16); assert.ok(b >= 0 && b < 16) }
  }
  assert.equal(foldLlm('same').address, foldLlm('same').address)
  assert.notEqual(foldLlm('same').address, foldLlm('Same').address, 'a case-blind fold would be a dead instrument')
})

test('the receipt is change-sensitive — a tampered mirror is CAUGHT (the instrument can fail)', () => {
  const c = modelComparison()
  const tampered = structuredClone(MODELS_MIRROR)
  tampered.models[0]!.contextTokens = tampered.models[0]!.contextTokens + 1
  const bad = modelComparison(tampered)
  assert.notEqual(bad.receipt, c.receipt)
  assert.equal(modelComparison(structuredClone(MODELS_MIRROR)).receipt, c.receipt, 'an untampered copy folds identically')
})

test('model widths are hexbit constructors — not a second set of literals', () => {
  assert.equal(TOKEN_BYTES, HEXBIT_BITS)
  assert.equal(HEXBITS_PER_TOKEN, HEXBIT_BITS * COINS)
  assert.equal(UUID_TEXT_CHARS, UUID_HEXBITS + HEXBIT_BITS)
  assert.equal(UUID_PAYLOAD_BITS, UUID_BITS)
})
