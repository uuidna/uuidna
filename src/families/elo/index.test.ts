import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EloFormulas } from './index.js'
import '../../mcp/families.js'

test('elo: expectedscore, update, ratingdiff, kfactor, performance, winprobability, provisional, decay — crossing to statistics', async (t) => {
  assert.equal(EloFormulas.expectedscore(1600, 1400).value, 60, 'a 200-point edge is ~60%')
  assert.equal(EloFormulas.update(32, 100, 60).value, 12, 'a win over a 60% favourite at K=32')
  assert.equal(EloFormulas.ratingdiff(1600, 1400).value, 200)
  assert.equal(EloFormulas.kfactor(10, 1500).value, 40, 'provisional player, high K')
  assert.equal(EloFormulas.kfactor(50, 1500).value, 20)
  assert.equal(EloFormulas.performance(1500, 8, 2).value, 1740, 'performance over a strong tournament')
  assert.equal(EloFormulas.winprobability(200, 10).value, 70)
  assert.equal(EloFormulas.provisional(10, 30).value, 20, 'twenty games to establish')
  assert.equal(EloFormulas.decay(1500, 6, 10).value, 1440)
  assert.equal(EloFormulas.expectedscore(1600, 1400).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('elo')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'elo', program: ['expectedscore'], params: [1600, 1400] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `elo.expectedscore at ${uuid}`)
  uuidReceiptOf('elo expectedscore', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; expectedscore 60, update 12, ratingdiff 200, kfactor 40, performance 1740, winprobability 70, provisional 20, decay 1440; crossing to statistics')
})
