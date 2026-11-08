import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ApiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('apiology: hivepopulation, combcells, foragerange, pollenloads, dancepaths, honeyyield, broodcycle, swarmthreshold — crossing to ecology', async (t) => {
  assert.equal(ApiologyFormulas.hivepopulation(50000, 1).value, 50000)
  assert.equal(ApiologyFormulas.combcells(6000, 8).value, 48000)
  assert.equal(ApiologyFormulas.foragerange(5, 1000).value, 5000)
  assert.equal(ApiologyFormulas.pollenloads(60000, 100).value, 600)
  assert.equal(ApiologyFormulas.dancepaths(8, 2).value, 56)
  assert.equal(ApiologyFormulas.honeyyield(30, 1).value, 30)
  assert.equal(ApiologyFormulas.broodcycle(16, 5).value, 21)
  assert.equal(ApiologyFormulas.swarmthreshold(60, 100).value, 60)
  assert.equal(ApiologyFormulas.hivepopulation(50000, 1).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('apiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'apiology', program: ['hivepopulation'], params: [50000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `apiology.hivepopulation at ${uuid}`)
  uuidReceiptOf('apiology hivepopulation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hivepopulation 50000, combcells 48000, foragerange 5000, pollenloads 600, dancepaths 56, honeyyield 30, broodcycle 21, swarmthreshold 60; crossing to ecology')
})
