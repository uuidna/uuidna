import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StraingaugeFormulas } from './index.js'
import '../../mcp/families.js'

test('straingauge: gaugefactor, strain, resistancechange, bridgeoutput, stress, microstrain, sensitivity, temperatureerror — crossing to mechanical', async (t) => {
  assert.equal(StraingaugeFormulas.gaugefactor(2000, 1000).value, 2, 'metal foil gauge factor')
  assert.equal(StraingaugeFormulas.strain(2, 2000).value, 1000, 'microstrain from displacement')
  assert.equal(StraingaugeFormulas.resistancechange(2, 1000).value, 2000)
  assert.equal(StraingaugeFormulas.bridgeoutput(5000, 2000).value, 2500, 'quarter-bridge output')
  assert.equal(StraingaugeFormulas.stress(1000, 200).value, 200000, 'Hooke\'s law')
  assert.equal(StraingaugeFormulas.microstrain(2000, 2).value, 1000)
  assert.equal(StraingaugeFormulas.sensitivity(10, 5000).value, 2, 'mV per V')
  assert.equal(StraingaugeFormulas.temperatureerror(50, 20).value, 1000)
  assert.equal(StraingaugeFormulas.gaugefactor(2000, 0).value, 0)
  assert.equal(StraingaugeFormulas.gaugefactor(2000, 1000).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('straingauge')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'straingauge', program: ['resistancechange'], params: [2, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `straingauge.resistancechange at ${uuid}`)
  uuidReceiptOf('straingauge resistancechange', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gaugefactor 2, strain 1000, resistancechange 2000, bridgeoutput 2500, stress 200000, microstrain 1000, sensitivity 2, temperatureerror 1000; crossing to mechanical')
})
