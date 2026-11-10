import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OxygenationFormulas } from './index.js'
import '../../mcp/families.js'

test('oxygenation: saturation, oxygencontent, pao2fio2ratio, alveolararterial, deliveryrate, extractionratio, carryingcapacity, shuntfraction — crossing to pulmonology', async (t) => {
  assert.equal(OxygenationFormulas.saturation(97, 100).value, 97, 'arterial oxygen saturation')
  assert.equal(OxygenationFormulas.oxygencontent(15, 97).value, 1455)
  assert.equal(OxygenationFormulas.pao2fio2ratio(100, 50).value, 200, 'P/F ratio')
  assert.equal(OxygenationFormulas.alveolararterial(100, 90).value, 10)
  assert.equal(OxygenationFormulas.deliveryrate(5, 200).value, 1000)
  assert.equal(OxygenationFormulas.extractionratio(250, 1000).value, 25, 'oxygen extraction ratio')
  assert.equal(OxygenationFormulas.carryingcapacity(15).value, 20)
  assert.equal(OxygenationFormulas.shuntfraction(20, 19, 15).value, 20, 'shunt fraction')
  assert.equal(OxygenationFormulas.saturation(97, 100).dst, 'pulmonology')
  assert.equal(hexFamiliesOf().get('oxygenation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'oxygenation', program: ['saturation'], params: [97, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 97, `oxygenation.saturation at ${uuid}`)
  uuidReceiptOf('oxygenation saturation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; saturation 97, oxygencontent 1455, pao2fio2ratio 200, alveolararterial 10, deliveryrate 1000, extractionratio 25, carryingcapacity 20, shuntfraction 20; crossing to pulmonology')
})
