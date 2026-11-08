import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GamingFormulas } from './index.js'
import '../../mcp/families.js'

test('gaming: framerate, score, winrate, kd, xp, damage, latency, accuracy — crossing to code', async (t) => {
  assert.equal(GamingFormulas.framerate(3600, 60).value, 60, 'frames per second')
  assert.equal(GamingFormulas.score(1500, 3).value, 4500)
  assert.equal(GamingFormulas.winrate(45, 60).value, 75)
  assert.equal(GamingFormulas.kd(30, 12).value, 250, 'K/D ×100')
  assert.equal(GamingFormulas.xp(10, 100).value, 10000, 'the experience curve')
  assert.equal(GamingFormulas.damage(50, 20).value, 30)
  assert.equal(GamingFormulas.damage(20, 50).value, 0, 'never below zero')
  assert.equal(GamingFormulas.latency(45).value, 45)
  assert.equal(GamingFormulas.accuracy(80, 100).value, 80)
  assert.equal(GamingFormulas.score(1500, 3).dst, 'code')
  assert.equal(hexFamiliesOf().get('gaming')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gaming', program: ['framerate'], params: [3600, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `gaming.framerate at ${uuid}`)
  uuidReceiptOf('gaming framerate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; framerate 60, score 4500, winrate 75, kd 250, xp 10000, damage 30, latency 45, accuracy 80; crossing to code')
})
