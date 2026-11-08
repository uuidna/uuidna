import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GearingFormulas } from './index.js'
import '../../mcp/families.js'

test('gearing: ratio, torqueout, speedout, efficiency, mechanicaladvantage, backlashangle, toothcount, reductionstages — crossing to robotics', async (t) => {
  assert.equal(GearingFormulas.ratio(60, 20).value, 3)
  assert.equal(GearingFormulas.torqueout(10, 3).value, 30)
  assert.equal(GearingFormulas.speedout(3000, 3).value, 1000)
  assert.equal(GearingFormulas.efficiency(95, 100).value, 95)
  assert.equal(GearingFormulas.mechanicaladvantage(40, 10).value, 4)
  assert.equal(GearingFormulas.backlashangle(100, 98).value, 2)
  assert.equal(GearingFormulas.toothcount(20, 3).value, 60)
  assert.equal(GearingFormulas.reductionstages(3, 3).value, 9)
  assert.equal(GearingFormulas.ratio(60, 20).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('gearing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gearing', program: ['ratio'], params: [60, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `gearing.ratio at ${uuid}`)
  uuidReceiptOf('gearing ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 3, torqueout 30, speedout 1000, efficiency 95, mechanicaladvantage 4, backlashangle 2, toothcount 60, reductionstages 9; crossing to robotics')
})
