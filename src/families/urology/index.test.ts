import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UrologyFormulas } from './index.js'
import '../../mcp/families.js'

test('urology: flowrate, residual, psa, output, stone, frequency, concentration, continence — crossing to med', async (t) => {
  assert.equal(UrologyFormulas.flowrate(500, 25).value, 20, 'millilitres per second')
  assert.equal(UrologyFormulas.residual(50, 400).value, 12)
  assert.equal(UrologyFormulas.psa(12, 3).value, 4)
  assert.equal(UrologyFormulas.output(1800, 24).value, 75, 'hourly output')
  assert.equal(UrologyFormulas.stone(7).value, 7)
  assert.equal(UrologyFormulas.frequency(8, 24).value, 33)
  assert.equal(UrologyFormulas.concentration(600, 2).value, 300)
  assert.equal(UrologyFormulas.continence(27, 30).value, 90, 'continence met')
  assert.equal(UrologyFormulas.flowrate(500, 25).dst, 'med')
  assert.equal(hexFamiliesOf().get('urology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'urology', program: ['flowrate'], params: [500, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `urology.flowrate at ${uuid}`)
  uuidReceiptOf('urology flowrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flowrate 20, residual 12, psa 4, output 75, stone 7, frequency 33, concentration 300, continence 90; crossing to med')
})
