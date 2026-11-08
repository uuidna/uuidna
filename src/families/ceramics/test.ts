import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CeramicsFormulas } from './index.js'
import '../../mcp/families.js'

test('ceramics: shrinkage, porosity, firing, density, hardness, glaze, thermalshock, vitrification — crossing to materials', async (t) => {
  assert.equal(CeramicsFormulas.shrinkage(100, 88).value, 12, 'wet to fired')
  assert.equal(CeramicsFormulas.porosity(15, 200).value, 7)
  assert.equal(CeramicsFormulas.firing(1280).value, 1280, 'cone proxy')
  assert.equal(CeramicsFormulas.density(900, 300).value, 3)
  assert.equal(CeramicsFormulas.hardness(7).value, 7, 'scratch scale')
  assert.equal(CeramicsFormulas.glaze(2, 3).value, 6)
  assert.equal(CeramicsFormulas.thermalshock(400, 50).value, 8)
  assert.equal(CeramicsFormulas.vitrification(85, 100).value, 85)
  assert.equal(CeramicsFormulas.shrinkage(100, 88).dst, 'materials')
  assert.equal(hexFamiliesOf().get('ceramics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ceramics', program: ['glaze'], params: [2, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6, `ceramics.glaze at ${uuid}`)
  uuidReceiptOf('ceramics glaze', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shrinkage 12, porosity 7, firing 1280, density 3, hardness 7, glaze 6, thermalshock 8, vitrification 85; crossing to materials')
})
