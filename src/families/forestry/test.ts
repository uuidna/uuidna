import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ForestryFormulas } from './index.js'
import '../../mcp/families.js'

test('forestry: volume, density, carbon, growth, canopy, harvest, rotation, regeneration — crossing to environment', async (t) => {
  assert.equal(ForestryFormulas.volume(30, 20).value, 18, 'a log volume approximation')
  assert.equal(ForestryFormulas.density(1200, 4).value, 300, 'trees per hectare')
  assert.equal(ForestryFormulas.carbon(5000, 47).value, 2350)
  assert.equal(ForestryFormulas.growth(120, 100).value, 20)
  assert.equal(ForestryFormulas.growth(100, 120).value, 0, 'never negative')
  assert.equal(ForestryFormulas.canopy(700, 1000).value, 70)
  assert.equal(ForestryFormulas.harvest(1000, 30).value, 300)
  assert.equal(ForestryFormulas.rotation(80, 60).value, 1, 'ready to rotate')
  assert.equal(ForestryFormulas.rotation(40, 60).value, 0)
  assert.equal(ForestryFormulas.regeneration(1500, 4).value, 6000)
  assert.equal(ForestryFormulas.volume(30, 20).dst, 'environment')
  assert.equal(hexFamiliesOf().get('forestry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'forestry', program: ['density'], params: [1200, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `forestry.density at ${uuid}`)
  uuidReceiptOf('forestry density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 18, density 300, carbon 2350, growth 20, canopy 70, harvest 300, rotation 1, regeneration 6000; crossing to environment')
})
