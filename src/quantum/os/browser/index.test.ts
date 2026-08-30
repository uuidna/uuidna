import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatBootLine, registerServiceWorker } from './index.js'

test('registerServiceWorker — no-op under node (no navigator)', () => {
  assert.doesNotThrow(() => registerServiceWorker())
})

test('formatBootLine — absent catalogue reports honestly', () => {
  const boot = {
    bootReceipt: 'abcd1234-0000-4000-8000-000000000000',
    catalogue: { present: false, count: 0, why: 'fetch failed' },
  }
  assert.match(formatBootLine(boot, 'terminal'), /catalogue absent/)
  assert.match(formatBootLine(boot, 'catalogue'), /not cached|fetch failed/)
})

test('formatBootLine — present catalogue names receipt prefix', () => {
  const boot = {
    bootReceipt: 'abcd1234-0000-4000-8000-000000000000',
    catalogue: { present: true, count: 28643, why: null },
  }
  assert.match(formatBootLine(boot, 'terminal'), /abcd1234/)
  assert.match(formatBootLine(boot, 'terminal'), /28,643/)
})
