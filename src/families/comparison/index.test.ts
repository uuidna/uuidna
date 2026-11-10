import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ComparisonFormulas } from './index.js'
import '../../mcp/families.js'

test('comparison: cells, rows, columns, coverage, highlight, diff, winner, spread — crossing to frontend', async (t) => {
  assert.equal(ComparisonFormulas.cells(5, 3).value, 15, 'a five-feature, three-plan grid')
  assert.equal(ComparisonFormulas.rows(5).value, 5)
  assert.equal(ComparisonFormulas.columns(3).value, 3)
  assert.equal(ComparisonFormulas.coverage(9, 15).value, 60, 'nine of fifteen cells checked')
  assert.equal(ComparisonFormulas.highlight(2, 3).value, 66)
  assert.equal(ComparisonFormulas.diff(80, 30).value, 50)
  assert.equal(ComparisonFormulas.diff(30, 80).value, 0, 'never below zero')
  assert.equal(ComparisonFormulas.winner(95, 95).value, 1, 'score meets the max')
  assert.equal(ComparisonFormulas.winner(90, 95).value, 0)
  assert.equal(ComparisonFormulas.spread(100, 20).value, 80)
  assert.equal(ComparisonFormulas.cells(5, 3).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('comparison')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'comparison', program: ['cells'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `comparison.cells at ${uuid}`)
  uuidReceiptOf('comparison cells', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cells 15, rows 5, columns 3, coverage 60, highlight 66, diff 50, winner 1, spread 80; crossing to frontend')
})
