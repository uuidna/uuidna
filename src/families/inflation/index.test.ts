import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InflationFormulas } from './index.js'
import '../../mcp/families.js'

test('inflation: cpi, ratepct, realvalue, pricelevel, purchasingpower, indexorderings, basketitems, erosion — crossing to macroeconomics', async (t) => {
  assert.equal(InflationFormulas.cpi(100, 3).value, 300)
  assert.equal(InflationFormulas.ratepct(4, 100).value, 4)
  assert.equal(InflationFormulas.realvalue(1000, 40).value, 960)
  assert.equal(InflationFormulas.pricelevel(100, 8).value, 108)
  assert.equal(InflationFormulas.purchasingpower(96, 100).value, 96)
  assert.equal(InflationFormulas.indexorderings(4).value, 24)
  assert.equal(InflationFormulas.basketitems(80, 1).value, 80)
  assert.equal(InflationFormulas.erosion(100, 96).value, 4)
  assert.equal(InflationFormulas.cpi(100, 3).dst, 'macroeconomics')
  assert.equal(hexFamiliesOf().get('inflation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'inflation', program: ['cpi'], params: [100, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `inflation.cpi at ${uuid}`)
  uuidReceiptOf('inflation cpi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cpi 300, ratepct 4, realvalue 960, pricelevel 108, purchasingpower 96, indexorderings 24, basketitems 80, erosion 4; crossing to macroeconomics')
})
