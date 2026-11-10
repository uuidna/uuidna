import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IrrigationFormulas } from './index.js'
import '../../mcp/families.js'

test('irrigation: requirement, efficiency, runtime, application, evapotranspiration, uniformity, flowrate, schedule — crossing to agriculture', async (t) => {
  assert.equal(IrrigationFormulas.requirement(500, 25).value, 12500, 'area · depth of water')
  assert.equal(IrrigationFormulas.efficiency(850, 1000).value, 85)
  assert.equal(IrrigationFormulas.runtime(6000, 50).value, 120, 'minutes of valve time')
  assert.equal(IrrigationFormulas.application(10000, 500).value, 20)
  assert.equal(IrrigationFormulas.evapotranspiration(60, 90).value, 54, 'crop demand')
  assert.equal(IrrigationFormulas.uniformity(80, 100).value, 80)
  assert.equal(IrrigationFormulas.flowrate(200, 4).value, 800)
  assert.equal(IrrigationFormulas.schedule(100, 30).value, 70, 'net need after rain')
  assert.equal(IrrigationFormulas.schedule(20, 30).value, 0)
  assert.equal(IrrigationFormulas.requirement(500, 25).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('irrigation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'irrigation', program: ['runtime'], params: [6000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `irrigation.runtime at ${uuid}`)
  uuidReceiptOf('irrigation runtime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; requirement 12500, efficiency 85, runtime 120, application 20, evapotranspiration 54, uniformity 80, flowrate 800, schedule 70; crossing to agriculture')
})
