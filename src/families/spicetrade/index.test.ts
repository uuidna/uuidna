import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpicetradeFormulas } from './index.js'
import '../../mcp/families.js'

test('spicetrade: spicecount, routepairs, priceindex, originsubsets, traderoutes, volumetons, blendcombos, marginpct — crossing to statistics', async (t) => {
  assert.equal(SpicetradeFormulas.spicecount(40, 20).value, 60)
  assert.equal(SpicetradeFormulas.routepairs(12, 2).value, 66)
  assert.equal(SpicetradeFormulas.priceindex(100, 3).value, 300)
  assert.equal(SpicetradeFormulas.originsubsets(6).value, 64)
  assert.equal(SpicetradeFormulas.traderoutes(8, 3).value, 24)
  assert.equal(SpicetradeFormulas.volumetons(1000, 5).value, 5000)
  assert.equal(SpicetradeFormulas.blendcombos(15, 3).value, 455)
  assert.equal(SpicetradeFormulas.marginpct(40, 100).value, 40)
  assert.equal(SpicetradeFormulas.spicecount(40, 20).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('spicetrade')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'spicetrade', program: ['spicecount'], params: [40, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `spicetrade.spicecount at ${uuid}`)
  uuidReceiptOf('spicetrade spicecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spicecount 60, routepairs 66, priceindex 300, originsubsets 64, traderoutes 24, volumetons 5000, blendcombos 455, marginpct 40; crossing to statistics')
})
