import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WorkspaceFormulas } from './index.js'
import '../../mcp/families.js'

test('workspace: volume, reachradius, area, dexterityindex, singularitymargin, jointrange, coveragepct, envelopeheight — crossing to robotics', async (t) => {
  assert.equal(WorkspaceFormulas.volume(10, 10, 10).value, 1000)
  assert.equal(WorkspaceFormulas.reachradius(100, 20).value, 80)
  assert.equal(WorkspaceFormulas.area(40, 30).value, 1200)
  assert.equal(WorkspaceFormulas.dexterityindex(80, 100).value, 80)
  assert.equal(WorkspaceFormulas.singularitymargin(90, 15).value, 75)
  assert.equal(WorkspaceFormulas.jointrange(180, 30).value, 150)
  assert.equal(WorkspaceFormulas.coveragepct(850, 1000).value, 85)
  assert.equal(WorkspaceFormulas.envelopeheight(200, 2).value, 100)
  assert.equal(WorkspaceFormulas.volume(10, 10, 10).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('workspace')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'workspace', program: ['volume'], params: [10, 10, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `workspace.volume at ${uuid}`)
  uuidReceiptOf('workspace volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 1000, reachradius 80, area 1200, dexterityindex 80, singularitymargin 75, jointrange 150, coveragepct 85, envelopeheight 100; crossing to robotics')
})
