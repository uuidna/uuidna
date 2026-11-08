import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SportsFormulas } from './index.js'
import '../../mcp/families.js'

test('sports: win, average, differential, possession, rating, standings, pace, streak — crossing to analytics', async (t) => {
  assert.equal(SportsFormulas.win(60, 100).value, 60, 'win percentage')
  assert.equal(SportsFormulas.average(2500, 100).value, 25, 'points per game')
  assert.equal(SportsFormulas.differential(110, 95).value, 15, 'positive differential')
  assert.equal(SportsFormulas.differential(95, 110).value, -15, 'negative differential')
  assert.equal(SportsFormulas.possession(55, 90).value, 61)
  assert.equal(SportsFormulas.rating(450, 1000).value, 45, 'shooting rating')
  assert.equal(SportsFormulas.standings(50, 32).value, 18, 'games above .500')
  assert.equal(SportsFormulas.standings(32, 50).value, -18, 'games below .500')
  assert.equal(SportsFormulas.pace(10, 2400).value, 240, 'seconds per unit')
  assert.equal(SportsFormulas.streak(7).value, 7, 'a seven-game run')
  assert.equal(SportsFormulas.win(60, 100).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('sports')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sports', program: ['win'], params: [60, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `sports.win at ${uuid}`)
  uuidReceiptOf('sports win', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; win 60, average 25, differential 15/-15, possession 61, rating 45, standings 18/-18, pace 240, streak 7; crossing to analytics')
})
