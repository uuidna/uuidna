import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ParallaxFormulas } from './index.js'
import '../../mcp/families.js'

test('parallax: angle, arcseconds, baseline, distance, errorbudget, parsecs, propermotion, tangentialvelocity — crossing to astronomy', async (t) => {
  assert.equal(ParallaxFormulas.angle(1000, 10).value, 100, 'the apparent shift')
  assert.equal(ParallaxFormulas.arcseconds(2).value, 7200)
  assert.equal(ParallaxFormulas.baseline(500).value, 1000, 'the orbit diameter')
  assert.equal(ParallaxFormulas.distance(10).value, 100000, 'parsecs from a 10 mas parallax')
  assert.equal(ParallaxFormulas.errorbudget(1000, 4).value, 250)
  assert.equal(ParallaxFormulas.errorbudget(100, 0).value, 0)
  assert.equal(ParallaxFormulas.parsecs(326).value, 100, '326 ly is 100 pc')
  assert.equal(ParallaxFormulas.propermotion(1000, 10).value, 100)
  assert.equal(ParallaxFormulas.tangentialvelocity(10, 100).value, 4740, 'km/s')
  assert.equal(ParallaxFormulas.distance(10).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('parallax')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'parallax', program: ['distance'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100000, `parallax.distance at ${uuid}`)
  uuidReceiptOf('parallax distance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; angle 100, arcseconds 7200, baseline 1000, distance 100000, errorbudget 250, parsecs 100, propermotion 100, tangentialvelocity 4740; crossing to astronomy')
})
