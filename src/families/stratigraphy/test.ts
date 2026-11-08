import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StratigraphyFormulas } from './index.js'
import '../../mcp/families.js'

test('stratigraphy: depositionrate, age, thickness, compaction, unconformity, correlation, sequence, subsidence — crossing to geology', async (t) => {
  assert.equal(StratigraphyFormulas.depositionrate(600, 300).value, 2, 'mm of sediment per year')
  assert.equal(StratigraphyFormulas.age(1500, 3).value, 500, 'years a bed records')
  assert.equal(StratigraphyFormulas.thickness(900, 300).value, 600)
  assert.equal(StratigraphyFormulas.thickness(300, 900).value, 0, 'no thickness when top is below bottom')
  assert.equal(StratigraphyFormulas.compaction(800, 600).value, 75)
  assert.equal(StratigraphyFormulas.unconformity(500, 200).value, 300, 'the time gap hidden')
  assert.equal(StratigraphyFormulas.correlation(45, 50).value, 90)
  assert.equal(StratigraphyFormulas.sequence(100, 30).value, 4, 'four depositional cycles')
  assert.equal(StratigraphyFormulas.subsidence(1000, 5).value, 5000)
  assert.equal(StratigraphyFormulas.depositionrate(600, 300).dst, 'geology')
  assert.equal(hexFamiliesOf().get('stratigraphy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stratigraphy', program: ['sequence'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `stratigraphy.sequence at ${uuid}`)
  uuidReceiptOf('stratigraphy sequence', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depositionrate 2, age 500, thickness 600, compaction 75, unconformity 300, correlation 90, sequence 4, subsidence 5000; crossing to geology')
})
