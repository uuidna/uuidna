import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnduranceFormulas } from './index.js'
import '../../mcp/families.js'

test('endurance: vo2proxy, timetoexhaustion, aerobicratio, lactatethreshold, heartratereserve, trainingload, distancecapacity, fatigueindex — crossing to physiology', async (t) => {
  assert.equal(EnduranceFormulas.vo2proxy(3500, 70).value, 50)
  assert.equal(EnduranceFormulas.timetoexhaustion(6000, 20).value, 300)
  assert.equal(EnduranceFormulas.aerobicratio(80, 100).value, 80)
  assert.equal(EnduranceFormulas.lactatethreshold(85, 100).value, 85)
  assert.equal(EnduranceFormulas.heartratereserve(190, 60).value, 130)
  assert.equal(EnduranceFormulas.trainingload(120, 5).value, 600)
  assert.equal(EnduranceFormulas.distancecapacity(10, 42).value, 420)
  assert.equal(EnduranceFormulas.fatigueindex(30, 300).value, 10)
  assert.equal(EnduranceFormulas.vo2proxy(3500, 70).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('endurance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'endurance', program: ['vo2proxy'], params: [3500, 70] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `endurance.vo2proxy at ${uuid}`)
  uuidReceiptOf('endurance vo2proxy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vo2proxy 50, timetoexhaustion 300, aerobicratio 80, lactatethreshold 85, heartratereserve 130, trainingload 600, distancecapacity 420, fatigueindex 10; crossing to physiology')
})
