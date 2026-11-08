import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DistillationFormulas } from './index.js'
import '../../mcp/families.js'

test('distillation: purity, reflux, plates, volatility, recovery, cut, temperature, azeotrope — crossing to chemistry', async (t) => {
  assert.equal(DistillationFormulas.purity(95, 100).value, 95, 'a 95% cut')
  assert.equal(DistillationFormulas.reflux(80, 20).value, 400, 'reflux ratio 4:1')
  assert.equal(DistillationFormulas.plates(300, 25).value, 12, 'twelve theoretical plates')
  assert.equal(DistillationFormulas.volatility(240, 100).value, 240, 'relative volatility 2.4')
  assert.equal(DistillationFormulas.recovery(85, 100).value, 85)
  assert.equal(DistillationFormulas.cut(5, 100).value, 5, 'heads cut')
  assert.equal(DistillationFormulas.temperature(78).value, 78, 'ethanol boiling point')
  assert.equal(DistillationFormulas.azeotrope(96, 4).value, 96, 'the ethanol-water azeotrope')
  assert.equal(DistillationFormulas.purity(95, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('distillation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'distillation', program: ['plates'], params: [300, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `distillation.plates at ${uuid}`)
  uuidReceiptOf('distillation plates', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; purity 95, reflux 400, plates 12, volatility 240, recovery 85, cut 5, temperature 78, azeotrope 96; crossing to chemistry')
})
