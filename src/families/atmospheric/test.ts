import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AtmosphericFormulas } from './index.js'
import '../../mcp/families.js'

test('atmospheric: pressure, lapserate, humidity, ozone, windshear, stability, coriolis, aerosol — crossing to climate', async (t) => {
  assert.equal(AtmosphericFormulas.pressure(1013, 300).value, 713, 'pressure drops with altitude')
  assert.equal(AtmosphericFormulas.lapserate(60, 10).value, 6)
  assert.equal(AtmosphericFormulas.humidity(15, 20).value, 75, 'relative humidity')
  assert.equal(AtmosphericFormulas.ozone(300).value, 300)
  assert.equal(AtmosphericFormulas.windshear(80, 20).value, 60, 'shear between layers')
  assert.equal(AtmosphericFormulas.stability(15, 25).value, 10)
  assert.equal(AtmosphericFormulas.coriolis(100, 45).value, 50, 'Coriolis turn at mid-latitude')
  assert.equal(AtmosphericFormulas.aerosol(1000, 4).value, 250)
  assert.equal(AtmosphericFormulas.pressure(1013, 300).dst, 'climate')
  assert.equal(hexFamiliesOf().get('atmospheric')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'atmospheric', program: ['windshear'], params: [80, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `atmospheric.windshear at ${uuid}`)
  uuidReceiptOf('atmospheric windshear', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pressure 713, lapserate 6, humidity 75, ozone 300, windshear 60, stability 10, coriolis 50, aerosol 250; crossing to climate')
})
