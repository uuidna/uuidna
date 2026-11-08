import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PollinationFormulas } from './index.js'
import '../../mcp/families.js'

test('pollination: fruitset, visitationrate, pollenviability, hivedensity, seedset, crosspollination, foragerange, yielddependence — crossing to botany', async (t) => {
  assert.equal(PollinationFormulas.fruitset(45, 60).value, 75, 'three in four flowers set fruit')
  assert.equal(PollinationFormulas.visitationrate(600, 5).value, 120, 'visits per hour')
  assert.equal(PollinationFormulas.pollenviability(900, 1000).value, 90)
  assert.equal(PollinationFormulas.hivedensity(120, 4).value, 30, 'hives per hectare')
  assert.equal(PollinationFormulas.seedset(200, 15).value, 3000)
  assert.equal(PollinationFormulas.crosspollination(12, 8).value, 96)
  assert.equal(PollinationFormulas.foragerange(15, 40).value, 600)
  assert.equal(PollinationFormulas.yielddependence(1000, 75).value, 750, 'yield owed to pollination')
  assert.equal(PollinationFormulas.fruitset(45, 60).dst, 'botany')
  assert.equal(hexFamiliesOf().get('pollination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pollination', program: ['fruitset'], params: [45, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `pollination.fruitset at ${uuid}`)
  uuidReceiptOf('pollination fruitset', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fruitset 75, visitationrate 120, pollenviability 90, hivedensity 30, seedset 3000, crosspollination 96, foragerange 600, yielddependence 750; crossing to botany')
})
