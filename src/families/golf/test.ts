import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GolfFormulas } from './index.js'
import '../../mcp/families.js'

test('golf: score, handicap, fairways, greens, putts, driving, scrambling, birdies — crossing to sports', async (t) => {
  assert.equal(GolfFormulas.score(68, 72).value, -4, 'four under par')
  assert.equal(GolfFormulas.score(75, 72).value, 3, 'three over par')
  assert.equal(GolfFormulas.handicap(108, 20).value, 5)
  assert.equal(GolfFormulas.fairways(10, 14).value, 71)
  assert.equal(GolfFormulas.greens(12, 18).value, 66, 'greens in regulation %')
  assert.equal(GolfFormulas.putts(30, 18).value, 1)
  assert.equal(GolfFormulas.driving(2700, 10).value, 270, 'yards per drive')
  assert.equal(GolfFormulas.scrambling(4, 6).value, 66)
  assert.equal(GolfFormulas.birdies(15, 5).value, 3, 'birdies per round')
  assert.equal(GolfFormulas.score(68, 72).dst, 'sports')
  assert.equal(hexFamiliesOf().get('golf')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'golf', program: ['putts'], params: [30, 18] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1, `golf.putts at ${uuid}`)
  uuidReceiptOf('golf putts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; score -4/3, handicap 5, fairways 71, greens 66, putts 1, driving 270, scrambling 66, birdies 3; crossing to sports')
})
