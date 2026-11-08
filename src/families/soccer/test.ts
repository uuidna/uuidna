import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SoccerFormulas } from './index.js'
import '../../mcp/families.js'

test('soccer: possession, conversion, passaccuracy, xg, cleansheets, goaldiff, distance, points — crossing to sports', async (t) => {
  assert.equal(SoccerFormulas.possession(60, 90).value, 66)
  assert.equal(SoccerFormulas.conversion(3, 12).value, 25)
  assert.equal(SoccerFormulas.passaccuracy(400, 500).value, 80)
  assert.equal(SoccerFormulas.xg(10, 35).value, 3, 'expected goals from chance quality')
  assert.equal(SoccerFormulas.cleansheets(12, 38).value, 31)
  assert.equal(SoccerFormulas.goaldiff(30, 20).value, 10, 'positive difference')
  assert.equal(SoccerFormulas.goaldiff(20, 30).value, -10, 'negative difference')
  assert.equal(SoccerFormulas.distance(10500, 90).value, 116)
  assert.equal(SoccerFormulas.points(10, 5).value, 35, 'ten wins and five draws')
  assert.equal(SoccerFormulas.possession(60, 90).dst, 'sports')
  assert.equal(hexFamiliesOf().get('soccer')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'soccer', program: ['points'], params: [10, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 35, `soccer.points at ${uuid}`)
  uuidReceiptOf('soccer points', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; possession 66, conversion 25, passaccuracy 80, xg 3, cleansheets 31, goaldiff 10/-10, distance 116, points 35; crossing to sports')
})
