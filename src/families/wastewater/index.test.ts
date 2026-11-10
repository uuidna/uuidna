import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WastewaterFormulas } from './index.js'
import '../../mcp/families.js'

test('wastewater: aeration, bod, clarifier, cod, loading, removal, retention, sludge — crossing to hydrology', async (t) => {
  assert.equal(WastewaterFormulas.aeration(1000, 30).value, 34, 'blowers for the demand')
  assert.equal(WastewaterFormulas.bod(300, 200).value, 60000, 'BOD mass a flow carries')
  assert.equal(WastewaterFormulas.clarifier(1200, 40).value, 30)
  assert.equal(WastewaterFormulas.cod(200, 2).value, 400)
  assert.equal(WastewaterFormulas.loading(6000, 50).value, 120)
  assert.equal(WastewaterFormulas.removal(200, 20).value, 90, 'percent removed')
  assert.equal(WastewaterFormulas.retention(4800, 200).value, 24)
  assert.equal(WastewaterFormulas.sludge(150, 7).value, 1050)
  assert.equal(WastewaterFormulas.removal(100, 100).value, 0, 'nothing removed')
  assert.equal(WastewaterFormulas.removal(200, 20).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('wastewater')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'wastewater', program: ['removal'], params: [200, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `wastewater.removal at ${uuid}`)
  uuidReceiptOf('wastewater removal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; aeration 34, bod 60000, clarifier 30, cod 400, loading 120, removal 90, retention 24, sludge 1050; crossing to hydrology')
})
