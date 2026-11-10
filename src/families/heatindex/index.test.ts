import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HeatindexFormulas } from './index.js'
import '../../mcp/families.js'

test('heatindex: apparenttemp, humidityfactor, dangerlevel, discomfortindex, coolingload, exposureminutes, riskpct, feelsdelta — crossing to weather', async (t) => {
  assert.equal(HeatindexFormulas.apparenttemp(35, 5).value, 40)
  assert.equal(HeatindexFormulas.humidityfactor(60, 100).value, 60)
  assert.equal(HeatindexFormulas.dangerlevel(3, 4).value, 4)
  assert.equal(HeatindexFormulas.discomfortindex(800, 10).value, 80)
  assert.equal(HeatindexFormulas.coolingload(100, 3).value, 300)
  assert.equal(HeatindexFormulas.exposureminutes(120, 2).value, 60)
  assert.equal(HeatindexFormulas.riskpct(80, 100).value, 80)
  assert.equal(HeatindexFormulas.feelsdelta(45, 35).value, 10)
  assert.equal(HeatindexFormulas.apparenttemp(35, 5).dst, 'weather')
  assert.equal(hexFamiliesOf().get('heatindex')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'heatindex', program: ['apparenttemp'], params: [35, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `heatindex.apparenttemp at ${uuid}`)
  uuidReceiptOf('heatindex apparenttemp', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; apparenttemp 40, humidityfactor 60, dangerlevel 4, discomfortindex 80, coolingload 300, exposureminutes 60, riskpct 80, feelsdelta 10; crossing to weather')
})
