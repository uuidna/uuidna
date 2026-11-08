import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CricketFormulas } from './index.js'
import '../../mcp/families.js'

test('cricket: battingaverage, strikerate, bowlingaverage, economy, runrate, partnership, required, boundary — crossing to sports', async (t) => {
  assert.equal(CricketFormulas.battingaverage(500, 10).value, 50, 'fifty runs per dismissal')
  assert.equal(CricketFormulas.strikerate(75, 50).value, 150, 'a strike rate of 150')
  assert.equal(CricketFormulas.bowlingaverage(240, 10).value, 24)
  assert.equal(CricketFormulas.economy(300, 50).value, 6, 'six an over')
  assert.equal(CricketFormulas.runrate(300, 50).value, 600)
  assert.equal(CricketFormulas.partnership(120, 2).value, 60)
  assert.equal(CricketFormulas.required(180, 20).value, 900)
  assert.equal(CricketFormulas.boundary(30, 120).value, 25, 'a quarter to the rope')
  assert.equal(CricketFormulas.battingaverage(500, 0).value, 0, 'guard the empty dismissal')
  assert.equal(CricketFormulas.battingaverage(500, 10).dst, 'sports')
  assert.equal(hexFamiliesOf().get('cricket')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cricket', program: ['strikerate'], params: [75, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `cricket.strikerate at ${uuid}`)
  uuidReceiptOf('cricket strikerate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; battingaverage 50, strikerate 150, bowlingaverage 24, economy 6, runrate 600, partnership 60, required 900, boundary 25; crossing to sports')
})
