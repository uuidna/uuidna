import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaleontologyFormulas } from './index.js'
import '../../mcp/families.js'

test('paleontology: age, decay, completeness, diversity, stratum, extinction, size, abundance — crossing to geology', async (t) => {
  assert.equal(PaleontologyFormulas.age(2, 5730).value, 11460, 'two half-lives of carbon')
  assert.equal(PaleontologyFormulas.decay(1000, 3).value, 125, 'an eighth of the carbon remains')
  assert.equal(PaleontologyFormulas.completeness(60, 200).value, 30)
  assert.equal(PaleontologyFormulas.diversity(120, 40).value, 3)
  assert.equal(PaleontologyFormulas.stratum(1000, 50).value, 20, 'depositional age')
  assert.equal(PaleontologyFormulas.extinction(75, 100).value, 75, 'three quarters lost')
  assert.equal(PaleontologyFormulas.size(12, 100).value, 1200)
  assert.equal(PaleontologyFormulas.abundance(600, 20).value, 30)
  assert.equal(PaleontologyFormulas.age(2, 5730).dst, 'geology')
  assert.equal(hexFamiliesOf().get('paleontology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'paleontology', program: ['decay'], params: [1000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `paleontology.decay at ${uuid}`)
  uuidReceiptOf('paleontology decay', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; age 11460, decay 125, completeness 30, diversity 3, stratum 20, extinction 75, size 1200, abundance 30; crossing to geology')
})
