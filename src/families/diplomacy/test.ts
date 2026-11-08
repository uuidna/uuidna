import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DiplomacyFormulas } from './index.js'
import '../../mcp/families.js'

test('diplomacy: consensus, leverage, treaty, tension, alliance, sanction, concession, summit — crossing to sociology', async (t) => {
  assert.equal(DiplomacyFormulas.consensus(3, 4).value, 75, 'three of four parties agreed')
  assert.equal(DiplomacyFormulas.leverage(100, 20).value, 5)
  assert.equal(DiplomacyFormulas.treaty(18, 20).value, 90, 'ratified by most signatories')
  assert.equal(DiplomacyFormulas.tension(120, 12).value, 10, 'incidents per month')
  assert.equal(DiplomacyFormulas.alliance(12, 30).value, 40)
  assert.equal(DiplomacyFormulas.sanction(250, 1000).value, 25)
  assert.equal(DiplomacyFormulas.concession(30, 40).value, 75)
  assert.equal(DiplomacyFormulas.summit(24, 6).value, 4, 'resolutions per session')
  assert.equal(DiplomacyFormulas.consensus(3, 4).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('diplomacy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'diplomacy', program: ['consensus'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `diplomacy.consensus at ${uuid}`)
  uuidReceiptOf('diplomacy consensus', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; consensus 75, leverage 5, treaty 90, tension 10, alliance 40, sanction 25, concession 75, summit 4; crossing to sociology')
})
