import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TanningFormulas } from './index.js'
import '../../mcp/families.js'

test('tanning: offer, uptake, float, basicity, shrinkage, thickness, area, penetration — crossing to chemistry', async (t) => {
  assert.equal(TanningFormulas.offer(15, 100).value, 15, 'a 15% agent offer on hide weight')
  assert.equal(TanningFormulas.uptake(15, 3).value, 12, 'collagen takes up what the float lets go')
  assert.equal(TanningFormulas.uptake(3, 15).value, 0)
  assert.equal(TanningFormulas.float(200, 100).value, 200, 'a 200% float')
  assert.equal(TanningFormulas.basicity(99, 100).value, 33, '33% basic chrome')
  assert.equal(TanningFormulas.shrinkage(100, 70).value, 30)
  assert.equal(TanningFormulas.thickness(30, 3).value, 10)
  assert.equal(TanningFormulas.area(200, 150).value, 30000)
  assert.equal(TanningFormulas.penetration(80, 100).value, 80, 'the tan reached 80% of the cross-section')
  assert.equal(TanningFormulas.offer(15, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('tanning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tanning', program: ['area'], params: [200, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30000, `tanning.area at ${uuid}`)
  uuidReceiptOf('tanning area', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; offer 15, uptake 12, float 200, basicity 33, shrinkage 30, thickness 10, area 30000, penetration 80; crossing to chemistry')
})
