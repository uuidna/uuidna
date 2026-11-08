import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ToxicologyFormulas } from './index.js'
import '../../mcp/families.js'

test('toxicology: ld50, dose, therapeuticindex, clearance, halflife, exposure, bioaccumulation, margin — crossing to physiology', async (t) => {
  assert.equal(ToxicologyFormulas.ld50(5, 70).value, 350, 'LD50 scaled to body mass')
  assert.equal(ToxicologyFormulas.dose(10, 50).value, 500)
  assert.equal(ToxicologyFormulas.therapeuticindex(1000, 10).value, 100, 'a wide therapeutic window')
  assert.equal(ToxicologyFormulas.therapeuticindex(50, 0).value, 0)
  assert.equal(ToxicologyFormulas.clearance(600, 15).value, 40)
  assert.equal(ToxicologyFormulas.halflife(10000, 14).value, 495, '0.693 · V / Cl')
  assert.equal(ToxicologyFormulas.exposure(25, 8).value, 200)
  assert.equal(ToxicologyFormulas.bioaccumulation(5000, 25).value, 200, 'bioconcentration factor')
  assert.equal(ToxicologyFormulas.margin(1000, 4).value, 250)
  assert.equal(ToxicologyFormulas.ld50(5, 70).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('toxicology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'toxicology', program: ['dose'], params: [10, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `toxicology.dose at ${uuid}`)
  uuidReceiptOf('toxicology dose', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ld50 350, dose 500, therapeuticindex 100, clearance 40, halflife 495, exposure 200, bioaccumulation 200, margin 250; crossing to physiology')
})
