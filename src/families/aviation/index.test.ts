import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AviationFormulas } from './index.js'
import '../../mcp/families.js'

test('aviation: liability, delay, compensation, range, payload, duty, separation, noise — crossing to law', async (t) => {
  assert.equal(AviationFormulas.liability(1000, 22).value, 22000, 'cargo liability per kg')
  assert.equal(AviationFormulas.delay(600, 780).value, 180, 'three hours late')
  assert.equal(AviationFormulas.compensation(1000).value, 250, 'short haul')
  assert.equal(AviationFormulas.compensation(3000).value, 400, 'medium haul')
  assert.equal(AviationFormulas.compensation(5000).value, 600, 'long haul')
  assert.equal(AviationFormulas.range(24000, 3).value, 8000)
  assert.equal(AviationFormulas.payload(80000, 45000).value, 35000)
  assert.equal(AviationFormulas.duty(12, 13).value, 1, 'within the duty limit')
  assert.equal(AviationFormulas.duty(14, 13).value, 0)
  assert.equal(AviationFormulas.separation(1000, 500).value, 1, 'adequate separation')
  assert.equal(AviationFormulas.noise(95, 85).value, 10)
  assert.equal(AviationFormulas.liability(1000, 22).dst, 'law')
  assert.equal(hexFamiliesOf().get('aviation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aviation', program: ['compensation'], params: [5000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `aviation.compensation at ${uuid}`)
  uuidReceiptOf('aviation compensation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; liability 22000, delay 180, compensation 250/400/600, range 8000, payload 35000, duty 1, separation 1, noise 10; crossing to law')
})
