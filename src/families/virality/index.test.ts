import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ViralityFormulas } from './index.js'
import '../../mcp/families.js'

test('virality: coefficient, cycletime, shares, amplification, reach, engagement, saturation, halflife — crossing to content', async (t) => {
  assert.equal(ViralityFormulas.coefficient(200, 15).value, 30, 'K-factor from invites at 15%')
  assert.equal(ViralityFormulas.cycletime(7).value, 7)
  assert.equal(ViralityFormulas.shares(250, 1000).value, 25)
  assert.equal(ViralityFormulas.amplification(600, 50).value, 12, 'reshares per post')
  assert.equal(ViralityFormulas.reach(10000, 100).value, 100, 'reached per seed')
  assert.equal(ViralityFormulas.engagement(300, 1000).value, 30)
  assert.equal(ViralityFormulas.saturation(2500, 10000).value, 25)
  assert.equal(ViralityFormulas.halflife(48).value, 48)
  assert.equal(ViralityFormulas.coefficient(200, 15).dst, 'content')
  assert.equal(hexFamiliesOf().get('virality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'virality', program: ['amplification'], params: [600, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `virality.amplification at ${uuid}`)
  uuidReceiptOf('virality amplification', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coefficient 30, cycletime 7, shares 25, amplification 12, reach 100, engagement 30, saturation 25, halflife 48; crossing to content')
})
