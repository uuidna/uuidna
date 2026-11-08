import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ActuarialFormulas } from './index.js'
import '../../mcp/families.js'

test('actuarial: mortality, lossratio, reserve, annuity, premium, lifeexpectancy, discount, solvency — crossing to accounting', async (t) => {
  assert.equal(ActuarialFormulas.mortality(5, 1000).value, 5, 'deaths per mille')
  assert.equal(ActuarialFormulas.lossratio(70, 100).value, 70)
  assert.equal(ActuarialFormulas.reserve(1000, 2).value, 2000)
  assert.equal(ActuarialFormulas.annuity(100, 12).value, 1200, 'a year of payments')
  assert.equal(ActuarialFormulas.premium(1000, 20).value, 1200, 'risk at a 20% load')
  assert.equal(ActuarialFormulas.lifeexpectancy(80).value, 80)
  assert.equal(ActuarialFormulas.discount(1100, 10).value, 1000, 'present value at 10%')
  assert.equal(ActuarialFormulas.solvency(150, 100).value, 150)
  assert.equal(ActuarialFormulas.expectedclaims(3, 4).value, 12)
  assert.equal(ActuarialFormulas.lossratio2(60, 100).value, 60)
  assert.equal(ActuarialFormulas.reserve2(100, 30).value, 70)
  assert.equal(ActuarialFormulas.exposure(5, 3).value, 15)
  assert.equal(ActuarialFormulas.purepremium(100, 5).value, 20)
  assert.equal(ActuarialFormulas.combinedratio(60, 30, 100).value, 90)
  assert.equal(ActuarialFormulas.survival(100, 7).value, 93)
  assert.equal(ActuarialFormulas.mortality(5, 1000).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('actuarial')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'actuarial', program: ['premium'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `actuarial.premium at ${uuid}`)
  uuidReceiptOf('actuarial premium', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mortality 5, lossratio 70, reserve 2000, annuity 1200, premium 1200, lifeexpectancy 80, discount 1000, solvency 150; crossing to accounting')
})
