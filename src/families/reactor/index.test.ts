import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { HeatFormulas, heatThresholdOf } from '../heat/index.js'
import { ReactorFormulas, heatIdentifiableOf } from './index.js'
import '../../mcp/families.js'

test('reactor: heat identifiable at kind; refactor cools; coldfusion is plasma.fusion of signal gain', async (t) => {
  const id = HeatFormulas.identity(100)
  assert.equal((id as { kind?: unknown }).kind, 'heat', 'deepest heat mark is kind: heat')
  assert.equal((id as { identity?: unknown }).identity, 'heat')
  assert.equal(heatIdentifiableOf(id as { kind?: unknown }), true)
  assert.ok(id.hex, 'heat.identity carries a hex')

  const ways = ReactorFormulas.ways(100)
  assert.equal(ways.value, HeatFormulas.ways(100, heatThresholdOf()).value)
  assert.equal(ways.holds, true)

  const cooled = ReactorFormulas.refactor(100, ways.value)
  assert.equal(cooled.value, HeatFormulas.cooling(100, ways.value).value)
  assert.equal(cooled.holds, true, '100 mK cools below hot')

  const stillHot = ReactorFormulas.coldfusion(4000, 1)
  assert.equal(HeatFormulas.signal(4000).value, 0, '4000 mK is hot by theorem temperature')
  assert.equal(stillHot.value, 0, 'hot input yields no cold fusion')
  assert.equal(stillHot.holds, false)

  const cf = ReactorFormulas.coldfusion(100, ways.value)
  assert.ok(cf.value >= 0)
  assert.equal(cf.holds, true)
  assert.equal((cf as { kind?: unknown }).kind, 'reactor')

  await verifyHex('reactor', 3, [['ways', [100], ways.value], ['refactor', [100, ways.value], cooled.value], ['coldfusion', [100, ways.value], cf.value]])
  t.diagnostic(`reactor: identity kind heat hex ${id.hex}; ways ${ways.value}; coldfusion ${cf.value}; threshold ${heatThresholdOf()}`)
})
