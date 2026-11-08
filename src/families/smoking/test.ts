import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SmokingFormulas } from './index.js'
import '../../mcp/families.js'

test('smoking: smoketime, temperaturezone, phenoldeposition, moisturereduction, penetrationdepth, preservationindex, woodratio, surfacecolor — crossing to microbiology', async (t) => {
  assert.equal(SmokingFormulas.smoketime(6, 60).value, 360)
  assert.equal(SmokingFormulas.temperaturezone(107, 110).value, 110)
  assert.equal(SmokingFormulas.phenoldeposition(70, 100).value, 70)
  assert.equal(SmokingFormulas.moisturereduction(25, 100).value, 25)
  assert.equal(SmokingFormulas.penetrationdepth(20, 4).value, 5)
  assert.equal(SmokingFormulas.preservationindex(90, 100).value, 90)
  assert.equal(SmokingFormulas.woodratio(30, 100).value, 30)
  assert.equal(SmokingFormulas.surfacecolor(8, 10).value, 80)
  assert.equal(SmokingFormulas.smoketime(6, 60).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('smoking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'smoking', program: ['smoketime'], params: [6, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 360, `smoking.smoketime at ${uuid}`)
  uuidReceiptOf('smoking smoketime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; smoketime 360, temperaturezone 110, phenoldeposition 70, moisturereduction 25, penetrationdepth 5, preservationindex 90, woodratio 30, surfacecolor 80; crossing to microbiology')
})
