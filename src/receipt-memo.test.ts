// receipt-memo — a receipt is served only for the ledger it was minted against; each rule has its control.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ledgerDigest, mintReceipt, readReceipt, receiptPath } from './receipt-memo.js'

const world = (): string => { const r = mkdtempSync(join(tmpdir(), 'receipt-')); mkdirSync(join(r, 'lean')); return r }

test('absent → null; minted under this digest → the value; the file is where the drain law says', () => {
  const root = world()
  assert.equal(readReceipt('x', root, 'd1'), null)
  const p = mintReceipt('x', { a: 1 }, root, 'd1')
  assert.equal(p, receiptPath('x', root))
  assert.ok(existsSync(p))
  assert.deepEqual(readReceipt('x', root, 'd1'), { a: 1 })
})

// THE CONTROL — a receipt for a moved ledger is never served as current.
test('a different ledger digest MISSES: stale is never current', () => {
  const root = world()
  mintReceipt('x', { a: 1 }, root, 'd1')
  assert.equal(readReceipt('x', root, 'd2'), null)
})

test('the ledger digest is deterministic within a process and shaped like an address', () => {
  assert.equal(ledgerDigest(), ledgerDigest())
  assert.match(ledgerDigest(), /^[0-9a-f-]{36}$/)
})

test('a corrupt receipt file reads as absent, not as a crash', () => {
  const root = world()
  writeFileSync(receiptPath('x', root), '{not json')
  assert.equal(readReceipt('x', root, 'd1'), null)
})

// THE EDGE — no filesystem: a read falls through to the baked receipts, and a mint refuses by name.
test('with no filesystem a read misses to the baked receipts and a mint refuses by name; on the host both work', () => {
  const root = world()
  mintReceipt('x', { a: 1 }, root, 'd1')
  assert.deepEqual(readReceipt('x', root, 'd1'), { a: 1 }, 'the host reads the file it minted')
  assert.equal(readReceipt('x', root, 'd1', null), null, 'the edge has no file to read and nothing baked under x')
  assert.throws(() => mintReceipt('y', 1, root, 'd1', null), /no filesystem/)
})
