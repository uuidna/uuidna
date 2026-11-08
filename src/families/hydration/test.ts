import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydrationFormulas } from './index.js'
import '../../mcp/families.js'

test('hydration: dailyneed, sweatloss, replacementrate, deficit, electrolyteneed, urineoutput, fluidbalance, concentration — crossing to physiology', async (t) => {
  assert.equal(HydrationFormulas.dailyneed(70, 35).value, 2450)
  assert.equal(HydrationFormulas.sweatloss(2, 60).value, 120)
  assert.equal(HydrationFormulas.replacementrate(1500, 2000).value, 75)
  assert.equal(HydrationFormulas.deficit(2500, 2000).value, 500)
  assert.equal(HydrationFormulas.electrolyteneed(2000, 10).value, 200)
  assert.equal(HydrationFormulas.urineoutput(1500, 24).value, 62)
  assert.equal(HydrationFormulas.fluidbalance(2500, 2000).value, 500)
  assert.equal(HydrationFormulas.concentration(600, 2).value, 300)
  assert.equal(HydrationFormulas.dailyneed(70, 35).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('hydration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydration', program: ['dailyneed'], params: [70, 35] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2450, `hydration.dailyneed at ${uuid}`)
  uuidReceiptOf('hydration dailyneed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dailyneed 2450, sweatloss 120, replacementrate 75, deficit 500, electrolyteneed 200, urineoutput 62, fluidbalance 500, concentration 300; crossing to physiology')
})
