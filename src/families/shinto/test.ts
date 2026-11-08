import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShintoFormulas } from './index.js'
import '../../mcp/families.js'

test('shinto: kamicount, shrinecombos, ritualstages, purificationtypes, festivaldays, offeringsubsets, prayerpairs, harmonyratio — crossing to anthropology', async (t) => {
  assert.equal(ShintoFormulas.kamicount(8, 1000).value, 8000)
  assert.equal(ShintoFormulas.shrinecombos(12, 2).value, 66)
  assert.equal(ShintoFormulas.ritualstages(5).value, 120)
  assert.equal(ShintoFormulas.purificationtypes(3, 2).value, 5)
  assert.equal(ShintoFormulas.festivaldays(20, 1).value, 20)
  assert.equal(ShintoFormulas.offeringsubsets(5).value, 32)
  assert.equal(ShintoFormulas.prayerpairs(10, 2).value, 45)
  assert.equal(ShintoFormulas.harmonyratio(80, 100).value, 80)
  assert.equal(ShintoFormulas.kamicount(8, 1000).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('shinto')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'shinto', program: ['kamicount'], params: [8, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8000, `shinto.kamicount at ${uuid}`)
  uuidReceiptOf('shinto kamicount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; kamicount 8000, shrinecombos 66, ritualstages 120, purificationtypes 5, festivaldays 20, offeringsubsets 32, prayerpairs 45, harmonyratio 80; crossing to anthropology')
})
