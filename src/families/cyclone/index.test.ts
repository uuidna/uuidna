import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CycloneFormulas } from './index.js'
import '../../mcp/families.js'

test('cyclone: category, windspeed, pressuredrop, radius, stormsurge, rainfall, eyediameter, intensityindex — crossing to meteorology', async (t) => {
  assert.equal(CycloneFormulas.category(4, 5).value, 5)
  assert.equal(CycloneFormulas.windspeed(150, 1).value, 150)
  assert.equal(CycloneFormulas.pressuredrop(1013, 950).value, 63)
  assert.equal(CycloneFormulas.radius(50, 2).value, 100)
  assert.equal(CycloneFormulas.stormsurge(600, 100).value, 6)
  assert.equal(CycloneFormulas.rainfall(300, 1).value, 300)
  assert.equal(CycloneFormulas.eyediameter(60, 2).value, 30)
  assert.equal(CycloneFormulas.intensityindex(90, 100).value, 90)
  assert.equal(CycloneFormulas.category(4, 5).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('cyclone')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cyclone', program: ['category'], params: [4, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `cyclone.category at ${uuid}`)
  uuidReceiptOf('cyclone category', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; category 5, windspeed 150, pressuredrop 63, radius 100, stormsurge 6, rainfall 300, eyediameter 30, intensityindex 90; crossing to meteorology')
})
