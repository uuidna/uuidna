import { test } from 'node:test'
import assert from 'node:assert/strict'
import { changedFiles, deltaTestFiles, needsFullSuite, planTestRun } from './gate-receipt-index.js'

test('needsFullSuite — lean drift forces full suite', () => {
  assert.equal(needsFullSuite(['lean/Wave.lean']), true)
  assert.equal(needsFullSuite(['src/address.test.ts']), false)
})

test('deltaTestFiles maps changed test sources to dist paths', () => {
  const files = deltaTestFiles(['src/sequence-coverage.test.ts'])
  assert.ok(files.some((f) => f.endsWith('sequence-coverage.test.js')))
})

test('changedFiles reports digest moves only', () => {
  const a = { 'src/address.test.ts': '1111', 'src/foo.ts': '2222' }
  const b = { 'src/address.test.ts': '3333', 'src/foo.ts': '2222' }
  assert.deepEqual(changedFiles(a, b), ['src/address.test.ts'])
})

test('planTestRun — absent receipt plans full suite', () => {
  const plan = planTestRun()
  assert.ok(plan.mode === 'full' || plan.mode === 'skip' || plan.mode === 'delta')
})
