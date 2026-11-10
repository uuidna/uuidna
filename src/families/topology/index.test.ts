import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TopologyFormulas } from './index.js'
import '../../mcp/families.js'

test('topology: euler, genus, connectivity, betti, dimension, homology, neighborhood, boundary — crossing to code', async (t) => {
  assert.equal(TopologyFormulas.euler(6, 12, 8).value, 2, 'a sphere')
  assert.equal(TopologyFormulas.euler(1, 3, 0).value, -2, 'may be negative')
  assert.equal(TopologyFormulas.genus(2).value, 0, 'a sphere has no handles')
  assert.equal(TopologyFormulas.genus(0).value, 2, 'a torus pair')
  assert.equal(TopologyFormulas.connectivity(100, 25).value, 4)
  assert.equal(TopologyFormulas.betti(5, 2).value, 3)
  assert.equal(TopologyFormulas.dimension(3).value, 3)
  assert.equal(TopologyFormulas.homology(7, 4).value, 3)
  assert.equal(TopologyFormulas.neighborhood(10, 5).value, 50)
  assert.equal(TopologyFormulas.boundary(30, 100).value, 30)
  assert.equal(TopologyFormulas.euler(6, 12, 8).dst, 'code')
  assert.equal(hexFamiliesOf().get('topology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'topology', program: ['connectivity'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `topology.connectivity at ${uuid}`)
  uuidReceiptOf('topology connectivity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; euler 2 and −2, genus 0/2, connectivity 4, betti 3, dimension 3, homology 3, neighborhood 50, boundary 30; crossing to code')
})
