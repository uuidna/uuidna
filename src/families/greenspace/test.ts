import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GreenspaceFormulas } from './index.js'
import '../../mcp/families.js'

test('greenspace: percapita, canopycover, parkaccess, biodiversity, coolingeffect, stormwater, recreationcapacity, connectivity — crossing to geography', async (t) => {
  assert.equal(GreenspaceFormulas.percapita(9000, 300).value, 30, 'square metres of park per resident')
  assert.equal(GreenspaceFormulas.canopycover(40, 100).value, 40)
  assert.equal(GreenspaceFormulas.parkaccess(750, 1000).value, 75, 'share within a short walk')
  assert.equal(GreenspaceFormulas.biodiversity(50, 1000).value, 50)
  assert.equal(GreenspaceFormulas.coolingeffect(20, 3).value, 60, 'degrees of cooling shade')
  assert.equal(GreenspaceFormulas.stormwater(500, 8).value, 4000)
  assert.equal(GreenspaceFormulas.recreationcapacity(10000, 50).value, 200, 'visitors the space holds')
  assert.equal(GreenspaceFormulas.connectivity(18, 20).value, 90)
  assert.equal(GreenspaceFormulas.percapita(9000, 300).dst, 'geography')
  assert.equal(hexFamiliesOf().get('greenspace')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'greenspace', program: ['percapita'], params: [9000, 300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `greenspace.percapita at ${uuid}`)
  uuidReceiptOf('greenspace percapita', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; percapita 30, canopycover 40, parkaccess 75, biodiversity 50, coolingeffect 60, stormwater 4000, recreationcapacity 200, connectivity 90; crossing to geography')
})
