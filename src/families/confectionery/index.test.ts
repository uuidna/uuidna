import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConfectioneryFormulas } from './index.js'
import '../../mcp/families.js'

test('confectionery: sugarstage, crystalsize, temperaturecurve, temperingstages, cocoaratio, bloomtemp, recipecombos, yieldpct — crossing to chemistry', async (t) => {
  assert.equal(ConfectioneryFormulas.sugarstage(150, 160).value, 160)
  assert.equal(ConfectioneryFormulas.crystalsize(100, 4).value, 25)
  assert.equal(ConfectioneryFormulas.temperaturecurve(30, 5).value, 150)
  assert.equal(ConfectioneryFormulas.temperingstages(3, 0).value, 3)
  assert.equal(ConfectioneryFormulas.cocoaratio(70, 100).value, 70)
  assert.equal(ConfectioneryFormulas.bloomtemp(34, 27).value, 7)
  assert.equal(ConfectioneryFormulas.recipecombos(10, 3).value, 120)
  assert.equal(ConfectioneryFormulas.yieldpct(95, 100).value, 95)
  assert.equal(ConfectioneryFormulas.sugarstage(150, 160).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('confectionery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'confectionery', program: ['sugarstage'], params: [150, 160] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 160, `confectionery.sugarstage at ${uuid}`)
  uuidReceiptOf('confectionery sugarstage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sugarstage 160, crystalsize 25, temperaturecurve 150, temperingstages 3, cocoaratio 70, bloomtemp 7, recipecombos 120, yieldpct 95; crossing to chemistry')
})
