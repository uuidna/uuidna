import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VetFormulas } from './index.js'
import '../../mcp/families.js'

test('vet: dose, age, bodyscore, herd, gestation, feed, vaccination, fluids — crossing to med', async (t) => {
  assert.equal(VetFormulas.dose(20, 5).value, 100, 'milligrams for a 20 kg patient')
  assert.equal(VetFormulas.age(3, 7).value, 21, 'dog years')
  assert.equal(VetFormulas.bodyscore(5).value, 5, 'ideal body condition')
  assert.equal(VetFormulas.herd(3, 12).value, 25)
  assert.equal(VetFormulas.gestation(100, 63).value, 163, 'a canine due date')
  assert.equal(VetFormulas.feed(40, 3).value, 1, 'a daily ration')
  assert.equal(VetFormulas.vaccination(80, 100).value, 80)
  assert.equal(VetFormulas.fluids(10, 60).value, 600)
  assert.equal(VetFormulas.dose(20, 5).dst, 'med')
  assert.equal(hexFamiliesOf().get('vet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'vet', program: ['dose'], params: [20, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `vet.dose at ${uuid}`)
  uuidReceiptOf('vet dose', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 100, age 21, bodyscore 5, herd 25, gestation 163, feed 1, vaccination 80, fluids 600; crossing to med')
})
