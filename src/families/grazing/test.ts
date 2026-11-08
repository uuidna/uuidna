import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GrazingFormulas } from './index.js'
import '../../mcp/families.js'

test('grazing: stockingrate, carryingcapacity, forageutilization, restperiod, animalunits, pasturedays, dmintake, rotationcycle — crossing to ecology', async (t) => {
  assert.equal(GrazingFormulas.stockingrate(100, 20).value, 5, 'five animals per hectare')
  assert.equal(GrazingFormulas.carryingcapacity(5000, 25).value, 200, 'the forage feeds two hundred')
  assert.equal(GrazingFormulas.forageutilization(600, 1000).value, 60)
  assert.equal(GrazingFormulas.restperiod(40, 5).value, 35, 'days of rest after grazing')
  assert.equal(GrazingFormulas.animalunits(50, 1200).value, 60)
  assert.equal(GrazingFormulas.pasturedays(3000, 30).value, 100, 'days the pasture lasts')
  assert.equal(GrazingFormulas.dmintake(1200, 3).value, 36)
  assert.equal(GrazingFormulas.rotationcycle(10, 4).value, 40, 'the rotation cycle in days')
  assert.equal(GrazingFormulas.stockingrate(100, 20).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('grazing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'grazing', program: ['carryingcapacity'], params: [5000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `grazing.carryingcapacity at ${uuid}`)
  uuidReceiptOf('grazing carryingcapacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stockingrate 5, carryingcapacity 200, forageutilization 60, restperiod 35, animalunits 60, pasturedays 100, dmintake 36, rotationcycle 40; crossing to ecology')
})
