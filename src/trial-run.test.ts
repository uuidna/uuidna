// trial-run — the trial is walked once per process; these controls hold the memo to the ledger it folds.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runTrial } from './trial-run.js'
import { theorems } from './theorems/index.js'

test('runTrial is walked once per process and returns the same verdicts and receipt', () => {
  const a = runTrial()
  assert.equal(runTrial(), a, 'the trial is walked once per process')
  assert.equal(a.receipt, runTrial().receipt, 'the receipt is stable across calls')
})

// THE MEMO MUST STILL COVER THE WHOLE LEDGER — a memo that served a truncated walk would be silent and wrong.
test('the trial covers every sealed theorem, each VERIFIED', () => {
  const t = runTrial()
  assert.equal(t.count, theorems().length, 'the trial walks the whole ledger')
  assert.equal(t.verdicts.length, theorems().length, 'one verdict per theorem')
  assert.ok(t.verdicts.every((v) => v.verdict === 'VERIFIED'), 'an unverified row cannot enter the trial')
})
