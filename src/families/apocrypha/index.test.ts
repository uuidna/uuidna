import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ApocryphaFormulas } from './index.js'
import '../../mcp/families.js'

test('apocrypha: bookcount, readingorders, inclusionsubsets, canonpairs, disputedratio, versetotal, manuscriptcombos, orderingchoices — crossing to statistics', async (t) => {
  assert.equal(ApocryphaFormulas.bookcount(15, 7).value, 22)
  assert.equal(ApocryphaFormulas.readingorders(6).value, 720)
  assert.equal(ApocryphaFormulas.inclusionsubsets(15).value, 32768)
  assert.equal(ApocryphaFormulas.canonpairs(22, 2).value, 231)
  assert.equal(ApocryphaFormulas.disputedratio(7, 22).value, 31)
  assert.equal(ApocryphaFormulas.versetotal(183, 10).value, 1830)
  assert.equal(ApocryphaFormulas.manuscriptcombos(10, 3).value, 120)
  assert.equal(ApocryphaFormulas.orderingchoices(8, 3).value, 336)
  assert.equal(ApocryphaFormulas.bookcount(15, 7).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('apocrypha')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'apocrypha', program: ['bookcount'], params: [15, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 22, `apocrypha.bookcount at ${uuid}`)
  uuidReceiptOf('apocrypha bookcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bookcount 22, readingorders 720, inclusionsubsets 32768, canonpairs 231, disputedratio 31, versetotal 1830, manuscriptcombos 120, orderingchoices 336; crossing to statistics')
})
