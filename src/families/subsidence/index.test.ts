import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SubsidenceFormulas } from './index.js'
import '../../mcp/families.js'

test('subsidence: rate, cumulative, compaction, withdrawalvolume, consolidationtime, settlement, influencedepth, riskindex — crossing to geology', async (t) => {
  assert.equal(SubsidenceFormulas.rate(120, 12).value, 10)
  assert.equal(SubsidenceFormulas.cumulative(10, 5).value, 50)
  assert.equal(SubsidenceFormulas.compaction(15, 100).value, 15)
  assert.equal(SubsidenceFormulas.withdrawalvolume(1000, 3).value, 3000)
  assert.equal(SubsidenceFormulas.consolidationtime(3650, 365).value, 10)
  assert.equal(SubsidenceFormulas.settlement(500, 350).value, 150)
  assert.equal(SubsidenceFormulas.influencedepth(10, 5).value, 50)
  assert.equal(SubsidenceFormulas.riskindex(80, 100).value, 80)
  assert.equal(SubsidenceFormulas.rate(120, 12).dst, 'geology')
  assert.equal(hexFamiliesOf().get('subsidence')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'subsidence', program: ['rate'], params: [120, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `subsidence.rate at ${uuid}`)
  uuidReceiptOf('subsidence rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 10, cumulative 50, compaction 15, withdrawalvolume 3000, consolidationtime 10, settlement 150, influencedepth 50, riskindex 80; crossing to geology')
})
