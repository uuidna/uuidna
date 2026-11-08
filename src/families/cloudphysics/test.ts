import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CloudphysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('cloudphysics: dropletcount, condensationlevel, nucleipairs, albedo, opticalthickness, terminalvelocity, phasesubsets, precipefficiency — crossing to physics', async (t) => {
  assert.equal(CloudphysicsFormulas.dropletcount(1000, 100).value, 100000)
  assert.equal(CloudphysicsFormulas.condensationlevel(125, 1).value, 125)
  assert.equal(CloudphysicsFormulas.nucleipairs(12, 2).value, 66)
  assert.equal(CloudphysicsFormulas.albedo(70, 100).value, 70)
  assert.equal(CloudphysicsFormulas.opticalthickness(100, 4).value, 25)
  assert.equal(CloudphysicsFormulas.terminalvelocity(900, 100).value, 9)
  assert.equal(CloudphysicsFormulas.phasesubsets(3).value, 8)
  assert.equal(CloudphysicsFormulas.precipefficiency(60, 100).value, 60)
  assert.equal(CloudphysicsFormulas.dropletcount(1000, 100).dst, 'physics')
  assert.equal(hexFamiliesOf().get('cloudphysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cloudphysics', program: ['dropletcount'], params: [1000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100000, `cloudphysics.dropletcount at ${uuid}`)
  uuidReceiptOf('cloudphysics dropletcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dropletcount 100000, condensationlevel 125, nucleipairs 66, albedo 70, opticalthickness 25, terminalvelocity 9, phasesubsets 8, precipefficiency 60; crossing to physics')
})
