import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GastroenterologyFormulas } from './index.js'
import '../../mcp/families.js'

test('gastroenterology: transit, absorption, ph, motility, bmi, bleeding, enzyme, clearance — crossing to med', async (t) => {
  assert.equal(GastroenterologyFormulas.transit(240, 24).value, 10, 'ten per hour through the tract')
  assert.equal(GastroenterologyFormulas.absorption(80, 100).value, 80)
  assert.equal(GastroenterologyFormulas.ph(140, 100).value, 140)
  assert.equal(GastroenterologyFormulas.motility(120, 60).value, 2, 'two contractions per minute')
  assert.equal(GastroenterologyFormulas.bmi(70, 175).value, 22)
  assert.equal(GastroenterologyFormulas.bleeding(500, 5000).value, 10)
  assert.equal(GastroenterologyFormulas.enzyme(1000, 50).value, 20)
  assert.equal(GastroenterologyFormulas.clearance(90, 100).value, 90, 'clearance fraction')
  assert.equal(GastroenterologyFormulas.transit(240, 24).dst, 'med')
  assert.equal(hexFamiliesOf().get('gastroenterology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gastroenterology', program: ['motility'], params: [120, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `gastroenterology.motility at ${uuid}`)
  uuidReceiptOf('gastroenterology motility', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transit 10, absorption 80, ph 140, motility 2, bmi 22, bleeding 10, enzyme 20, clearance 90; crossing to med')
})
