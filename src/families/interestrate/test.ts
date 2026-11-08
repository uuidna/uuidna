import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InterestrateFormulas } from './index.js'
import '../../mcp/families.js'

test('interestrate: simpleinterest, apr, compoundperiods, doublingyears, discountfactor, yieldcurve, spread, realrate — crossing to banking', async (t) => {
  assert.equal(InterestrateFormulas.simpleinterest(60000, 20).value, 3000)
  assert.equal(InterestrateFormulas.apr(5, 100).value, 5)
  assert.equal(InterestrateFormulas.compoundperiods(12, 1).value, 12)
  assert.equal(InterestrateFormulas.doublingyears(72, 8).value, 9)
  assert.equal(InterestrateFormulas.discountfactor(95, 100).value, 95)
  assert.equal(InterestrateFormulas.yieldcurve(2, 3, 4).value, 9)
  assert.equal(InterestrateFormulas.spread(500, 350).value, 150)
  assert.equal(InterestrateFormulas.realrate(5, 2).value, 3)
  assert.equal(InterestrateFormulas.simpleinterest(60000, 20).dst, 'banking')
  assert.equal(hexFamiliesOf().get('interestrate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'interestrate', program: ['simpleinterest'], params: [60000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3000, `interestrate.simpleinterest at ${uuid}`)
  uuidReceiptOf('interestrate simpleinterest', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; simpleinterest 3000, apr 5, compoundperiods 12, doublingyears 9, discountfactor 95, yieldcurve 9, spread 150, realrate 3; crossing to banking')
})
