import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CatalysisFormulas } from './index.js'
import '../../mcp/families.js'

test('catalysis: turnover, frequency, selectivity, activation, conversion, loading, rate, surface — crossing to chemistry', async (t) => {
  assert.equal(CatalysisFormulas.turnover(1000, 5).value, 200, 'turnovers per catalyst site')
  assert.equal(CatalysisFormulas.frequency(1200, 60).value, 20, 'turnovers per second')
  assert.equal(CatalysisFormulas.selectivity(80, 100).value, 80)
  assert.equal(CatalysisFormulas.activation(75, 30).value, 45, 'barrier lowered')
  assert.equal(CatalysisFormulas.activation(30, 75).value, 0, 'never negative')
  assert.equal(CatalysisFormulas.conversion(90, 100).value, 90)
  assert.equal(CatalysisFormulas.loading(5, 100).value, 5)
  assert.equal(CatalysisFormulas.rate(600, 60).value, 10)
  assert.equal(CatalysisFormulas.surface(1000, 10).value, 100)
  assert.equal(CatalysisFormulas.turnover(1000, 5).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('catalysis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'catalysis', program: ['turnover'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `catalysis.turnover at ${uuid}`)
  uuidReceiptOf('catalysis turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turnover 200, frequency 20, selectivity 80, activation 45, conversion 90, loading 5, rate 10, surface 100; crossing to chemistry')
})
