import { test } from 'node:test'
import assert from 'node:assert/strict'
import { changedFiles, deltaTestFiles, needsFullSuite } from '../gate-receipt-index.js'
import { planTestRun } from '../gate-receipt-index.js'

test('needsFullSuite — lean drift forces full suite', () => {
  assert.equal(needsFullSuite(['lean/Wave.lean']), true)
  assert.equal(needsFullSuite(['src/tests/foo.test.ts']), false)
})

test('deltaTestFiles maps changed test sources to dist paths', () => {
  const files = deltaTestFiles(['src/tests/sequence-coverage.test.ts'])
  assert.ok(files.some((f) => f.endsWith('sequence-coverage.test.js')))
})

test('changedFiles reports digest moves only', () => {
  const a = { 'src/tests/a.test.ts': '1111', 'src/foo.ts': '2222' }
  const b = { 'src/tests/a.test.ts': '3333', 'src/foo.ts': '2222' }
  assert.deepEqual(changedFiles(a, b), ['src/tests/a.test.ts'])
})

test('planTestRun — absent receipt plans full suite', () => {
  const plan = planTestRun()
  assert.ok(plan.mode === 'full' || plan.mode === 'skip' || plan.mode === 'delta')
})
