// books-run — novel Nat facts from extractDecidable share one placeholder key; the depositor must mint a unique lawful key.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { novelToCandidate } from '../scripts/books-run.js'

const PLACEHOLDER = 'book' + '_' + 'fact' // the extractor's shared key — not a sealed ledger citation

test('novelToCandidate: remints the shared extract placeholder into a unique book_<handle> key', () => {
  const lean = `theorem ${PLACEHOLDER} : 2 + 2 = 4 := by decide`
  const c = novelToCandidate(lean, 'two and two make four', 45493, 'On Yacht Sailing')
  assert.ok(c)
  assert.match(c!.key, /^book_[0-9a-f]{8}$/)
  assert.equal(c!.lean, `theorem ${c!.key} : 2 + 2 = 4 := by decide`)
  assert.ok(c!.why.includes('45493'))
})

test('novelToCandidate: refuses a lean line that is not the extract placeholder', () => {
  assert.equal(novelToCandidate('theorem other : 1 + 1 = 2 := by decide', 'x', 1, 't'), null)
})
