import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TariffFormulas } from './index.js'
import '../../mcp/families.js'

test('tariff: ratepct, revenue, deadweightloss, importprice, quotafill, protectioneffect, schedulesubsets, tradereduction — crossing to macroeconomics', async (t) => {
  assert.equal(TariffFormulas.ratepct(25, 100).value, 25)
  assert.equal(TariffFormulas.revenue(1000, 25).value, 25000)
  assert.equal(TariffFormulas.deadweightloss(500, 10).value, 50)
  assert.equal(TariffFormulas.importprice(100, 25).value, 125)
  assert.equal(TariffFormulas.quotafill(80, 100).value, 80)
  assert.equal(TariffFormulas.protectioneffect(125, 100).value, 25)
  assert.equal(TariffFormulas.schedulesubsets(5).value, 32)
  assert.equal(TariffFormulas.tradereduction(15, 100).value, 15)
  assert.equal(TariffFormulas.ratepct(25, 100).dst, 'macroeconomics')
  assert.equal(hexFamiliesOf().get('tariff')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tariff', program: ['ratepct'], params: [25, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `tariff.ratepct at ${uuid}`)
  uuidReceiptOf('tariff ratepct', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratepct 25, revenue 25000, deadweightloss 50, importprice 125, quotafill 80, protectioneffect 25, schedulesubsets 32, tradereduction 15; crossing to macroeconomics')
})
