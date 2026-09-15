// counts — a grouped number is read whole, and the dated lessons record keeps the numbers of its moments while every
// other surface is still held to the live census.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ledgerCountsIn, isCountSurface } from './one-receipt.js'
import { LESSONS } from '../memory-home.js'

test('a grouped theorem count is read whole, never by its last digits', () => {
  assert.deepEqual(ledgerCountsIn('the ledger held 70,926 theorems then'), ['70926'])
  assert.deepEqual(ledgerCountsIn('theorems: 1,456'), ['1456'])
  assert.deepEqual(ledgerCountsIn('926 theorems'), ['926'])
  // CONTROLS: a hex literal and a decimal beside the word are not counts
  assert.deepEqual(ledgerCountsIn('Theorem A: x = 0xabcd1234'), [])
  assert.deepEqual(ledgerCountsIn('3.1456 theorems'), [])
})

test('the dated lessons record is history; every other surface is held to the census', () => {
  assert.equal(isCountSurface(LESSONS), false)
  for (const f of ['docs/index.md', 'README.md', '.zenodo.json', '.claude/other.md']) assert.equal(isCountSurface(f), true, f)
})
