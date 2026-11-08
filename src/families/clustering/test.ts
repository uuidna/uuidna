import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClusteringFormulas } from './index.js'
import '../../mcp/families.js'

test('clustering: centroiddist, inertia, silhouette, purity, kselection, within, between, density — crossing to statistics', async (t) => {
  assert.equal(ClusteringFormulas.centroiddist(3, 4).value, 25, 'squared distance to centroid')
  assert.equal(ClusteringFormulas.inertia(100, 20).value, 2000)
  assert.equal(ClusteringFormulas.silhouette(20, 60).value, 66, 'near-to-far separation')
  assert.equal(ClusteringFormulas.purity(80, 100).value, 80)
  assert.equal(ClusteringFormulas.kselection(100, 5).value, 20, 'twenty clusters for the dataset')
  assert.equal(ClusteringFormulas.within(50, 4).value, 200)
  assert.equal(ClusteringFormulas.between(1000, 300).value, 700)
  assert.equal(ClusteringFormulas.between(300, 1000).value, 0)
  assert.equal(ClusteringFormulas.density(1000, 10).value, 10, 'points per squared radius')
  assert.equal(ClusteringFormulas.centroiddist(3, 4).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('clustering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'clustering', program: ['centroiddist'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `clustering.centroiddist at ${uuid}`)
  uuidReceiptOf('clustering centroiddist', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; centroiddist 25, inertia 2000, silhouette 66, purity 80, kselection 20, within 200, between 700, density 10; crossing to statistics')
})
