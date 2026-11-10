import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MycologyFormulas } from './index.js'
import '../../mcp/families.js'

test('mycology: colonization, decomposition, efficiency, fruiting, germination, growth, mycelium, spore — crossing to agriculture', async (t) => {
  assert.equal(MycologyFormulas.colonization(750, 1000).value, 75)
  assert.equal(MycologyFormulas.decomposition(300, 1000).value, 30)
  assert.equal(MycologyFormulas.efficiency(500, 1000).value, 50, 'biological efficiency %')
  assert.equal(MycologyFormulas.fruiting(100, 10).value, 10, 'bodies per day')
  assert.equal(MycologyFormulas.germination(450, 1000).value, 45)
  assert.equal(MycologyFormulas.growth(100, 3).value, 800, 'three doublings of biomass')
  assert.equal(MycologyFormulas.mycelium(50, 4).value, 200)
  assert.equal(MycologyFormulas.spore(10000, 100).value, 100, 'spores per unit area')
  assert.equal(MycologyFormulas.growth(100, 3).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('mycology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mycology', program: ['colonization'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `mycology.colonization at ${uuid}`)
  uuidReceiptOf('mycology colonization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; colonization 75, decomposition 30, efficiency 50, fruiting 10, germination 45, growth 800, mycelium 200, spore 100; crossing to agriculture')
})
