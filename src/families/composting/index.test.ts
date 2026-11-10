import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompostingFormulas } from './index.js'
import '../../mcp/families.js'

test('composting: cnratio, moisture, temperature, maturity, volume, turnover, aeration, decomposition — crossing to ecology', async (t) => {
  assert.equal(CompostingFormulas.cnratio(300, 10).value, 30, 'the ideal carbon-to-nitrogen ratio')
  assert.equal(CompostingFormulas.moisture(60, 100).value, 60)
  assert.equal(CompostingFormulas.temperature(20, 45).value, 65, 'a thermophilic core')
  assert.equal(CompostingFormulas.maturity(90, 60).value, 1, 'cured')
  assert.equal(CompostingFormulas.maturity(30, 60).value, 0)
  assert.equal(CompostingFormulas.volume(3, 2, 1).value, 6)
  assert.equal(CompostingFormulas.turnover(100, 30).value, 4, 'four turns for the pile')
  assert.equal(CompostingFormulas.aeration(500, 100).value, 5)
  assert.equal(CompostingFormulas.decomposition(1000, 400).value, 60, 'percent broken down')
  assert.equal(CompostingFormulas.cnratio(300, 10).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('composting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'composting', program: ['turnover'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `composting.turnover at ${uuid}`)
  uuidReceiptOf('composting turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cnratio 30, moisture 60, temperature 65, maturity 1, volume 6, turnover 4, aeration 5, decomposition 60; crossing to ecology')
})
