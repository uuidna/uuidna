import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SocialnetworkFormulas } from './index.js'
import '../../mcp/families.js'

test('socialnetwork: density, degreecentrality, clustering, reciprocity, pathlength, betweenness, components, homophily — crossing to statistics', async (t) => {
  assert.equal(SocialnetworkFormulas.density(10, 18).value, 40, 'ties among ten nodes')
  assert.equal(SocialnetworkFormulas.degreecentrality(5, 11).value, 50)
  assert.equal(SocialnetworkFormulas.clustering(15, 60).value, 25)
  assert.equal(SocialnetworkFormulas.reciprocity(30, 50).value, 60, 'returned ties')
  assert.equal(SocialnetworkFormulas.pathlength(420, 100).value, 4)
  assert.equal(SocialnetworkFormulas.betweenness(12, 48).value, 25)
  assert.equal(SocialnetworkFormulas.components(10, 7).value, 3, 'three islands')
  assert.equal(SocialnetworkFormulas.homophily(35, 50).value, 70)
  assert.equal(SocialnetworkFormulas.density(10, 18).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('socialnetwork')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'socialnetwork', program: ['density'], params: [10, 18] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `socialnetwork.density at ${uuid}`)
  uuidReceiptOf('socialnetwork density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; density 40, degreecentrality 50, clustering 25, reciprocity 60, pathlength 4, betweenness 25, components 3, homophily 70; crossing to statistics')
})
