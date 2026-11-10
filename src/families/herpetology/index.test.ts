import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HerpetologyFormulas } from './index.js'
import '../../mcp/families.js'

test('herpetology: thermoregulation, venom, clutch, incubation, metabolism, growth, survival, scalation — crossing to zoology', async (t) => {
  assert.equal(HerpetologyFormulas.thermoregulation(30, 20).value, 10, 'ten degrees over ambient')
  assert.equal(HerpetologyFormulas.thermoregulation(15, 20).value, 0, 'never below zero')
  assert.equal(HerpetologyFormulas.venom(5, 1000).value, 5)
  assert.equal(HerpetologyFormulas.clutch(100, 4).value, 25, 'eggs per female')
  assert.equal(HerpetologyFormulas.incubation(60).value, 60)
  assert.equal(HerpetologyFormulas.metabolism(100, 25).value, 4)
  assert.equal(HerpetologyFormulas.growth(50, 20).value, 30)
  assert.equal(HerpetologyFormulas.growth(20, 50).value, 0, 'never below zero')
  assert.equal(HerpetologyFormulas.survival(80, 100).value, 80, 'percent of the clutch')
  assert.equal(HerpetologyFormulas.scalation(170, 10).value, 17)
  assert.equal(HerpetologyFormulas.thermoregulation(30, 20).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('herpetology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'herpetology', program: ['clutch'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `herpetology.clutch at ${uuid}`)
  uuidReceiptOf('herpetology clutch', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thermoregulation 10, venom 5, clutch 25, incubation 60, metabolism 4, growth 30, survival 80, scalation 17; crossing to zoology')
})
