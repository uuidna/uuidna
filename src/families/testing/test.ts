import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TestingFormulas } from './index.js'
import '../../mcp/families.js'

test('testing: coverage, passrate, flakiness, defects, regression, assertions, mutation, duration — crossing to code', async (t) => {
  assert.equal(TestingFormulas.coverage(850, 1000).value, 85, 'lines covered')
  assert.equal(TestingFormulas.passrate(495, 500).value, 99)
  assert.equal(TestingFormulas.flakiness(3, 100).value, 3, 'flaky runs')
  assert.equal(TestingFormulas.defects(12, 8000).value, 1, 'defects per KLOC')
  assert.equal(TestingFormulas.regression(2, 40).value, 5)
  assert.equal(TestingFormulas.assertions(900, 300).value, 3, 'assertions per test')
  assert.equal(TestingFormulas.mutation(76, 100).value, 76, 'mutants killed')
  assert.equal(TestingFormulas.duration(4200).value, 4200)
  assert.equal(TestingFormulas.coverage(850, 1000).dst, 'code')
  assert.equal(hexFamiliesOf().get('testing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'testing', program: ['coverage'], params: [850, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `testing.coverage at ${uuid}`)
  uuidReceiptOf('testing coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 85, passrate 99, flakiness 3, defects 1, regression 5, assertions 3, mutation 76, duration 4200; crossing to code')
})
