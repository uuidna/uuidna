import { test } from 'node:test'
import assert from 'node:assert/strict'
import { receiptDigest, served, type ReceiptStore } from './receipt.js'

const memory = (): ReceiptStore & { files: Map<string, string> } => {
  const files = new Map<string, string>()
  return { files, read: (p) => files.get(p) ?? null, write: (p, b) => { files.set(p, b) } }
}

test('receiptDigest — same parts give the same digest, different order differs', () => {
  assert.equal(receiptDigest(['a', 'b']), receiptDigest(['a', 'b']))
  assert.notEqual(receiptDigest(['a', 'b']), receiptDigest(['b', 'a']))
})

// LENGTH-PREFIXED, or ["ab","c"] and ["a","bc"] concatenate to the same bytes and collide.
test('receiptDigest — a different split of the same bytes does NOT collide', () => {
  assert.notEqual(receiptDigest(['ab', 'c']), receiptDigest(['a', 'bc']))
})

test('served — computes on a miss and serves on a hit', () => {
  const store = memory()
  let runs = 0
  const spec = { path: 'r.json', inputs: ['ledger', 'rule'], compute: () => { runs += 1; return { n: 42 } } }
  const first = served(spec, store)
  assert.equal(first.hit, false)
  assert.deepEqual(first.value, { n: 42 })
  const second = served(spec, store)
  assert.equal(second.hit, true)
  assert.deepEqual(second.value, { n: 42 })
  assert.equal(runs, 1, 'the walk was paid once')
})

// THE MEASURED LESSON: a corrected RULE must invalidate its own receipts, or the healthy case and the never-re-ran
// case print the same line. audit-citations paid for this on 2026-09-03.
test('served — a changed RULE invalidates the receipt even when the inputs are identical', () => {
  const store = memory()
  let runs = 0
  const withRule = (rule: string) => served(
    { path: 'r.json', inputs: ['same-ledger', rule], compute: () => { runs += 1; return { rule } } },
    store,
  )
  withRule('v1')
  assert.equal(withRule('v1').hit, true)
  const corrected = withRule('v2')
  assert.equal(corrected.hit, false, 'the rule moved, so the receipt is void')
  assert.deepEqual(corrected.value, { rule: 'v2' })
  assert.equal(runs, 2)
})

test('served — a changed INPUT invalidates it too', () => {
  const store = memory()
  const run = (ledger: string) => served(
    { path: 'r.json', inputs: [ledger, 'rule'], compute: () => ({ ledger }) }, store)
  run('a')
  assert.equal(run('a').hit, true)
  assert.equal(run('b').hit, false)
})

// AN UNREADABLE RECEIPT COSTS ONE RECOMPUTATION, NEVER A FAILED RUN — the answer is always reproducible.
test('served — a corrupt receipt is treated as absent', () => {
  const store = memory()
  store.files.set('r.json', '{ not json')
  const r = served({ path: 'r.json', inputs: ['x'], compute: () => ({ ok: true }) }, store)
  assert.equal(r.hit, false)
  assert.deepEqual(r.value, { ok: true })
})

test('served — a receipt with the right digest but no value is not served', () => {
  const store = memory()
  store.files.set('r.json', JSON.stringify({ digest: receiptDigest(['x']) }))
  const r = served({ path: 'r.json', inputs: ['x'], compute: () => ({ ok: true }) }, store)
  assert.equal(r.hit, false, 'a digest without a value is not an answer')
})

test('served — the receipt it writes carries the digest it was earned under', () => {
  const store = memory()
  const r = served({ path: 'r.json', inputs: ['x', 'y'], compute: () => 7 }, store)
  const held = JSON.parse(store.files.get('r.json')!) as { digest: string; value: number; kind: string }
  assert.equal(held.digest, r.digest)
  assert.equal(held.value, 7)
  assert.equal(held.kind, 'door-receipt')
})
