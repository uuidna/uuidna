import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SalinityFormulas } from './index.js'
import '../../mcp/families.js'

test('salinity: practical, absolute, density, conductivity, chlorinity, haline, mixingratio, freezingpoint — crossing to oceanography', async (t) => {
  assert.equal(SalinityFormulas.practical(1000, 1000).value, 35, 'a conductivity ratio of one is 35 PSU')
  assert.equal(SalinityFormulas.absolute(35, 1).value, 36)
  assert.equal(SalinityFormulas.density(35, 10).value, 1025, 'seawater at 1025 kg/m³')
  assert.equal(SalinityFormulas.density(10, 2000).value, 0)
  assert.equal(SalinityFormulas.conductivity(35, 10).value, 350)
  assert.equal(SalinityFormulas.chlorinity(35, 554).value, 19, 'chloride share of salinity 35')
  assert.equal(SalinityFormulas.haline(1025, 35).value, 29)
  assert.equal(SalinityFormulas.mixingratio(50, 200).value, 25, 'one quarter fresh')
  assert.equal(SalinityFormulas.freezingpoint(35, 54).value, 1890, 'millidegrees of depression')
  assert.equal(SalinityFormulas.practical(1000, 1000).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('salinity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'salinity', program: ['practical'], params: [1000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 35, `salinity.practical at ${uuid}`)
  uuidReceiptOf('salinity practical', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; practical 35, absolute 36, density 1025, conductivity 350, chlorinity 19, haline 29, mixingratio 25, freezingpoint 1890; crossing to oceanography')
})
