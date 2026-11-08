import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotovoltaicFormulas } from './index.js'
import '../../mcp/families.js'

test('photovoltaic: power, efficiency, irradiance, yield, array, fillfactor, derate, payback — crossing to energy', async (t) => {
  assert.equal(PhotovoltaicFormulas.power(12, 8).value, 96, 'DC watts from V · I')
  assert.equal(PhotovoltaicFormulas.efficiency(220, 1000).value, 22)
  assert.equal(PhotovoltaicFormulas.irradiance(1000, 2).value, 500, 'W/m² over the area')
  assert.equal(PhotovoltaicFormulas.yield(300, 5).value, 1500)
  assert.equal(PhotovoltaicFormulas.array(10, 400).value, 4000, 'array watt rating')
  assert.equal(PhotovoltaicFormulas.fillfactor(80, 100).value, 80)
  assert.equal(PhotovoltaicFormulas.derate(1000, 20).value, 800, 'output after a 20% loss')
  assert.equal(PhotovoltaicFormulas.derate(100, 150).value, 0)
  assert.equal(PhotovoltaicFormulas.payback(2000, 500).value, 4, 'years to recover the cost')
  assert.equal(PhotovoltaicFormulas.power(12, 8).dst, 'energy')
  assert.equal(hexFamiliesOf().get('photovoltaic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photovoltaic', program: ['power'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 96, `photovoltaic.power at ${uuid}`)
  uuidReceiptOf('photovoltaic power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 96, efficiency 22, irradiance 500, yield 1500, array 4000, fillfactor 80, derate 800, payback 4; crossing to energy')
})
