import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SwineFormulas } from './index.js'
import '../../mcp/families.js'

test('swine: litter, feedconversion, averagedailygain, weaning, leanness, farrowing, mortality, market — crossing to agriculture', async (t) => {
  assert.equal(SwineFormulas.litter(110, 10).value, 11, 'eleven piglets per sow')
  assert.equal(SwineFormulas.feedconversion(300, 100).value, 300)
  assert.equal(SwineFormulas.averagedailygain(900, 90).value, 10, 'ten per day')
  assert.equal(SwineFormulas.weaning(90, 100).value, 90)
  assert.equal(SwineFormulas.leanness(58, 100).value, 58)
  assert.equal(SwineFormulas.farrowing(220, 100).value, 220, 'litters per sow')
  assert.equal(SwineFormulas.mortality(5, 1000).value, 0)
  assert.equal(SwineFormulas.market(120).value, 120, 'market weight holds')
  assert.equal(SwineFormulas.litter(110, 10).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('swine')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'swine', program: ['litter'], params: [110, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 11, `swine.litter at ${uuid}`)
  uuidReceiptOf('swine litter', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; litter 11, feedconversion 300, averagedailygain 10, weaning 90, leanness 58, farrowing 220, mortality 0, market 120; crossing to agriculture')
})
