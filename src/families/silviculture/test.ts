import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SilvicultureFormulas } from './index.js'
import '../../mcp/families.js'

test('silviculture: basalarea, density, growth, rotation, stocking, thinning, volume, yield — crossing to botany', async (t) => {
  assert.equal(SilvicultureFormulas.basalarea(10, 4).value, 100, 'basal area the stand carries')
  assert.equal(SilvicultureFormulas.density(5000, 50).value, 100, 'trees per hectare')
  assert.equal(SilvicultureFormulas.growth(50, 80).value, 30)
  assert.equal(SilvicultureFormulas.growth(80, 50).value, 0)
  assert.equal(SilvicultureFormulas.rotation(100, 10).value, 10, 'years to the target')
  assert.equal(SilvicultureFormulas.stocking(900, 1000).value, 90)
  assert.equal(SilvicultureFormulas.thinning(1000, 300).value, 700, 'trees left standing')
  assert.equal(SilvicultureFormulas.volume(100, 20).value, 2000)
  assert.equal(SilvicultureFormulas.yield(8, 25).value, 200)
  assert.equal(SilvicultureFormulas.basalarea(10, 4).dst, 'botany')
  assert.equal(hexFamiliesOf().get('silviculture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'silviculture', program: ['density'], params: [5000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `silviculture.density at ${uuid}`)
  uuidReceiptOf('silviculture density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; basalarea 100, density 100, growth 30, rotation 10, stocking 90, thinning 700, volume 2000, yield 200; crossing to botany')
})
