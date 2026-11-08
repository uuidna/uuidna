import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RectifiersFormulas } from './index.js'
import '../../mcp/families.js'

test('rectifiers: average, ripple, efficiency, pivrating, formfactor, ripplefactor, regulation, conductionangle — crossing to electrical', async (t) => {
  assert.equal(RectifiersFormulas.average(1000, 8).value, 125, 'DC level averaged over the samples')
  assert.equal(RectifiersFormulas.ripple(12, 9).value, 3)
  assert.equal(RectifiersFormulas.efficiency(81, 100).value, 81, 'full-wave maximum efficiency')
  assert.equal(RectifiersFormulas.pivrating(100, 2).value, 200, 'centre-tap PIV = 2·Vm')
  assert.equal(RectifiersFormulas.formfactor(111, 100).value, 111)
  assert.equal(RectifiersFormulas.ripplefactor(148, 100).value, 48)
  assert.equal(RectifiersFormulas.regulation(120, 100).value, 20)
  assert.equal(RectifiersFormulas.conductionangle(1, 2).value, 180, 'full-wave conducts 180° a cycle')
  assert.equal(RectifiersFormulas.average(1000, 8).dst, 'electrical')
  assert.equal(hexFamiliesOf().get('rectifiers')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rectifiers', program: ['average'], params: [1000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `rectifiers.average at ${uuid}`)
  uuidReceiptOf('rectifiers average', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; average 125, ripple 3, efficiency 81, pivrating 200, formfactor 111, ripplefactor 48, regulation 20, conductionangle 180; crossing to electrical')
})
