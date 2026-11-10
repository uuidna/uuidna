import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HumidityFormulas } from './index.js'
import '../../mcp/families.js'

test('humidity: relative, absolute, specific, ratio, saturation, deficit, comfortindex, mixingratio — crossing to meteorology', async (t) => {
  assert.equal(HumidityFormulas.relative(15, 20).value, 75, 'three quarters of saturation')
  assert.equal(HumidityFormulas.absolute(600, 30).value, 20)
  assert.equal(HumidityFormulas.specific(20, 1000).value, 20, 'grams of vapour per kilogram of moist air')
  assert.equal(HumidityFormulas.ratio(20, 1020).value, 12)
  assert.equal(HumidityFormulas.saturation(15, 75).value, 20, 'the saturation pressure the reading implies')
  assert.equal(HumidityFormulas.deficit(20, 15).value, 5)
  assert.equal(HumidityFormulas.deficit(10, 20).value, 0, 'never below zero')
  assert.equal(HumidityFormulas.comfortindex(30, 50).value, 40)
  assert.equal(HumidityFormulas.mixingratio(16, 1000).value, 16)
  assert.equal(HumidityFormulas.relative(15, 20).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('humidity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'humidity', program: ['relative'], params: [15, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `humidity.relative at ${uuid}`)
  uuidReceiptOf('humidity relative', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; relative 75, absolute 20, specific 20, ratio 12, saturation 20, deficit 5, comfortindex 40, mixingratio 16; crossing to meteorology')
})
