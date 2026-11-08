import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MetallurgyFormulas } from './index.js'
import '../../mcp/families.js'

test('metallurgy: hardness, alloy, tensile, ductility, grain, modulus, fatigue, corrosion — crossing to materials', async (t) => {
  assert.equal(MetallurgyFormulas.hardness(600, 3).value, 200, 'load over the indentation area')
  assert.equal(MetallurgyFormulas.alloy(18, 100).value, 18, 'composition percent')
  assert.equal(MetallurgyFormulas.tensile(5000, 25).value, 200)
  assert.equal(MetallurgyFormulas.ductility(120, 100).value, 20, 'elongation percent')
  assert.equal(MetallurgyFormulas.grain(1000, 25).value, 40)
  assert.equal(MetallurgyFormulas.modulus(400, 2).value, 200)
  assert.equal(MetallurgyFormulas.fatigue(1000000, 500).value, 2000)
  assert.equal(MetallurgyFormulas.corrosion(15, 100).value, 15)
  assert.equal(MetallurgyFormulas.hardness(600, 3).dst, 'materials')
  assert.equal(hexFamiliesOf().get('metallurgy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'metallurgy', program: ['tensile'], params: [5000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `metallurgy.tensile at ${uuid}`)
  uuidReceiptOf('metallurgy tensile', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hardness 200, alloy 18, tensile 200, ductility 20, grain 40, modulus 200, fatigue 2000, corrosion 15; crossing to materials')
})
