import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DermatologyFormulas } from './index.js'
import '../../mcp/families.js'

test('dermatology: tbsa, melanoma, uv, healing, lesions, pigmentation, severity, hydration — crossing to med', async (t) => {
  assert.equal(DermatologyFormulas.tbsa(9, 2).value, 18, 'nine regions at two each')
  assert.equal(DermatologyFormulas.melanoma(3, 7).value, 10)
  assert.equal(DermatologyFormulas.uv(8, 30).value, 240, 'UV dose over half an hour')
  assert.equal(DermatologyFormulas.healing(75, 100).value, 75)
  assert.equal(DermatologyFormulas.lesions(100, 5).value, 20, 'lesions per unit area')
  assert.equal(DermatologyFormulas.pigmentation(90, 50).value, 40)
  assert.equal(DermatologyFormulas.pigmentation(40, 50).value, 0, 'never below zero')
  assert.equal(DermatologyFormulas.severity(30, 120).value, 25)
  assert.equal(DermatologyFormulas.hydration(60, 100).value, 60)
  assert.equal(DermatologyFormulas.tbsa(9, 2).dst, 'med')
  assert.equal(hexFamiliesOf().get('dermatology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dermatology', program: ['uv'], params: [8, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 240, `dermatology.uv at ${uuid}`)
  uuidReceiptOf('dermatology uv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tbsa 18, melanoma 10, uv 240, healing 75, lesions 20, pigmentation 40, severity 25, hydration 60; crossing to med')
})
