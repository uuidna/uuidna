import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PartnerFormulas } from './index.js'
import '../../mcp/families.js'

test('partner: directory, filter, tier, commission, leads, rating, regions, listing — crossing to frontend', async (t) => {
  assert.equal(PartnerFormulas.directory(250).value, 250, 'the partners listed')
  assert.equal(PartnerFormulas.filter(45, 100).value, 45)
  assert.equal(PartnerFormulas.tier(100, 4).value, 25, 'partners per tier')
  assert.equal(PartnerFormulas.commission(10000, 15).value, 1500)
  assert.equal(PartnerFormulas.leads(30, 120).value, 25)
  assert.equal(PartnerFormulas.rating(94, 20).value, 47, 'four point seven, to a tenth')
  assert.equal(PartnerFormulas.regions(240, 6).value, 40)
  assert.equal(PartnerFormulas.listing(80, 200).value, 40)
  assert.equal(PartnerFormulas.directory(250).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('partner')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'partner', program: ['filter'], params: [45, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `partner.filter at ${uuid}`)
  uuidReceiptOf('partner filter', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; directory 250, filter 45, tier 25, commission 1500, leads 25, rating 47, regions 40, listing 40; crossing to frontend')
})
