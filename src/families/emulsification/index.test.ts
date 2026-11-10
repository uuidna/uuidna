import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmulsificationFormulas } from './index.js'
import '../../mcp/families.js'

test('emulsification: dropletsize, stabilityindex, emulsifierratio, phaseratio, viscosity, creamingrate, surfacetension, coalescencetime — crossing to chemistry', async (t) => {
  assert.equal(EmulsificationFormulas.dropletsize(1000, 50).value, 20)
  assert.equal(EmulsificationFormulas.stabilityindex(90, 100).value, 90)
  assert.equal(EmulsificationFormulas.emulsifierratio(3, 100).value, 3)
  assert.equal(EmulsificationFormulas.phaseratio(70, 30).value, 233)
  assert.equal(EmulsificationFormulas.viscosity(50, 4).value, 200)
  assert.equal(EmulsificationFormulas.creamingrate(100, 95).value, 5)
  assert.equal(EmulsificationFormulas.surfacetension(72, 2).value, 36)
  assert.equal(EmulsificationFormulas.coalescencetime(3600, 60).value, 60)
  assert.equal(EmulsificationFormulas.dropletsize(1000, 50).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('emulsification')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'emulsification', program: ['dropletsize'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `emulsification.dropletsize at ${uuid}`)
  uuidReceiptOf('emulsification dropletsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dropletsize 20, stabilityindex 90, emulsifierratio 3, phaseratio 233, viscosity 200, creamingrate 5, surfacetension 36, coalescencetime 60; crossing to chemistry')
})
