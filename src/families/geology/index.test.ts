import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeologyFormulas } from './index.js'
import '../../mcp/families.js'

test('geology: magnitude, depth, porosity, age, density, strata, erosion, grade — crossing to cern', async (t) => {
  assert.equal(GeologyFormulas.magnitude(7).value, 7, 'a Richter proxy')
  assert.equal(GeologyFormulas.depth(10, 25).value, 250)
  assert.equal(GeologyFormulas.porosity(30, 120).value, 25)
  assert.equal(GeologyFormulas.age(5730, 3).value, 17190, 'radiometric')
  assert.equal(GeologyFormulas.density(2700, 1).value, 2700)
  assert.equal(GeologyFormulas.strata(14).value, 14)
  assert.equal(GeologyFormulas.erosion(500, 100).value, 5)
  assert.equal(GeologyFormulas.grade(15, 200).value, 7)
  assert.equal(GeologyFormulas.magnitude(7).dst, 'cern')
  assert.equal(hexFamiliesOf().get('geology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geology', program: ['depth'], params: [10, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `geology.depth at ${uuid}`)
  uuidReceiptOf('geology depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; magnitude 7, depth 250, porosity 25, age 17190, density 2700, strata 14, erosion 5, grade 7; crossing to cern')
})
