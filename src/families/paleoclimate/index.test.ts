import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaleoclimateFormulas } from './index.js'
import '../../mcp/families.js'

test('paleoclimate: proxyrecords, temperatureanomaly, co2ppm, cyclelength, isotoperatio, interglacials, resolutionyears, correlationpairs — crossing to climate', async (t) => {
  assert.equal(PaleoclimateFormulas.proxyrecords(40, 20).value, 60)
  assert.equal(PaleoclimateFormulas.temperatureanomaly(150, 120).value, 30)
  assert.equal(PaleoclimateFormulas.co2ppm(280, 1).value, 280)
  assert.equal(PaleoclimateFormulas.cyclelength(41, 1000).value, 41000)
  assert.equal(PaleoclimateFormulas.isotoperatio(18, 20).value, 90)
  assert.equal(PaleoclimateFormulas.interglacials(5, 0).value, 5)
  assert.equal(PaleoclimateFormulas.resolutionyears(10000, 100).value, 100)
  assert.equal(PaleoclimateFormulas.correlationpairs(12, 2).value, 66)
  assert.equal(PaleoclimateFormulas.proxyrecords(40, 20).dst, 'climate')
  assert.equal(hexFamiliesOf().get('paleoclimate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'paleoclimate', program: ['proxyrecords'], params: [40, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `paleoclimate.proxyrecords at ${uuid}`)
  uuidReceiptOf('paleoclimate proxyrecords', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; proxyrecords 60, temperatureanomaly 30, co2ppm 280, cyclelength 41000, isotoperatio 90, interglacials 5, resolutionyears 100, correlationpairs 66; crossing to climate')
})
