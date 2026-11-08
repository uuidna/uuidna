import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompositesFormulas } from './index.js'
import '../../mcp/families.js'

test('composites: rule, fiberfraction, stiffness, strength, density, layup, anisotropy, porosity — crossing to materials', async (t) => {
  assert.equal(CompositesFormulas.rule(60, 40).value, 100, 'the rule of mixtures proxy')
  assert.equal(CompositesFormulas.fiberfraction(60, 100).value, 60)
  assert.equal(CompositesFormulas.stiffness(230, 60).value, 138, 'the fiber modulus scaled by the fraction')
  assert.equal(CompositesFormulas.strength(5000, 100).value, 50)
  assert.equal(CompositesFormulas.density(1600, 1000).value, 1)
  assert.equal(CompositesFormulas.layup(16, 2).value, 32, 'the laminate thickness')
  assert.equal(CompositesFormulas.anisotropy(230, 10).value, 2300)
  assert.equal(CompositesFormulas.porosity(2, 100).value, 2)
  assert.equal(CompositesFormulas.rule(60, 40).dst, 'materials')
  assert.equal(hexFamiliesOf().get('composites')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'composites', program: ['strength'], params: [5000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `composites.strength at ${uuid}`)
  uuidReceiptOf('composites strength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rule 100, fiberfraction 60, stiffness 138, strength 50, density 1, layup 32, anisotropy 2300, porosity 2; crossing to materials')
})
