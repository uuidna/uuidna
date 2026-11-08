import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CoverageFormulas } from './index.js'
import '../../mcp/families.js'

test('coverage: lines, branches, functionpairs, pathsubsets, uncovered, testcount, mutationscore, combinatorialt — crossing to statistics', async (t) => {
  assert.equal(CoverageFormulas.lines(850, 1000).value, 85)
  assert.equal(CoverageFormulas.branches(70, 100).value, 70)
  assert.equal(CoverageFormulas.functionpairs(12, 2).value, 66)
  assert.equal(CoverageFormulas.pathsubsets(5).value, 32)
  assert.equal(CoverageFormulas.uncovered(1000, 850).value, 150)
  assert.equal(CoverageFormulas.testcount(200, 1).value, 200)
  assert.equal(CoverageFormulas.mutationscore(75, 100).value, 75)
  assert.equal(CoverageFormulas.combinatorialt(10, 3).value, 120)
  assert.equal(CoverageFormulas.lines(850, 1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('coverage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'coverage', program: ['lines'], params: [850, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `coverage.lines at ${uuid}`)
  uuidReceiptOf('coverage lines', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lines 85, branches 70, functionpairs 66, pathsubsets 32, uncovered 150, testcount 200, mutationscore 75, combinatorialt 120; crossing to statistics')
})
