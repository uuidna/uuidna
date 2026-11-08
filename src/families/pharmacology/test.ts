import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PharmacologyFormulas } from './index.js'
import '../../mcp/families.js'

test('pharmacology: halflife, clearance, bioavailability, loading, therapeutic, dose, bound, elimination — crossing to pharma', async (t) => {
  assert.equal(PharmacologyFormulas.halflife(5000, 100).value, 34, 't½ proxy')
  assert.equal(PharmacologyFormulas.clearance(1000, 40).value, 25)
  assert.equal(PharmacologyFormulas.bioavailability(80, 100).value, 80)
  assert.equal(PharmacologyFormulas.loading(10, 50).value, 500)
  assert.equal(PharmacologyFormulas.therapeutic(100, 10).value, 10, 'therapeutic index')
  assert.equal(PharmacologyFormulas.dose(70, 5).value, 350)
  assert.equal(PharmacologyFormulas.bound(90, 100).value, 90, 'protein binding %')
  assert.equal(PharmacologyFormulas.elimination(100, 25).value, 75)
  assert.equal(PharmacologyFormulas.clearance(1000, 40).dst, 'pharma')
  assert.equal(hexFamiliesOf().get('pharmacology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pharmacology', program: ['clearance'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `pharmacology.clearance at ${uuid}`)
  uuidReceiptOf('pharmacology clearance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; halflife 34, clearance 25, bioavailability 80, loading 500, therapeutic 10, dose 350, bound 90, elimination 75; crossing to pharma')
})
