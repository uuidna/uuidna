import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BurndownFormulas } from './index.js'
import '../../mcp/families.js'

test('burndown: remaining, idealrate, actualrate, completionforecast, scopecreep, velocity, sprintprogress, variance — crossing to statistics', async (t) => {
  assert.equal(BurndownFormulas.remaining(100, 40).value, 60, 'sixty points left')
  assert.equal(BurndownFormulas.remaining(40, 100).value, 0)
  assert.equal(BurndownFormulas.idealrate(100, 10).value, 10, 'ten per day to finish on time')
  assert.equal(BurndownFormulas.actualrate(80, 10).value, 8)
  assert.equal(BurndownFormulas.completionforecast(60, 8).value, 8, 'eight days at the current rate')
  assert.equal(BurndownFormulas.scopecreep(20, 5).value, 15)
  assert.equal(BurndownFormulas.velocity(120, 6).value, 20, 'points per sprint')
  assert.equal(BurndownFormulas.sprintprogress(40, 80).value, 50)
  assert.equal(BurndownFormulas.variance(50, 40).value, 10)
  assert.equal(BurndownFormulas.remaining(100, 40).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('burndown')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'burndown', program: ['velocity'], params: [120, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `burndown.velocity at ${uuid}`)
  uuidReceiptOf('burndown velocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; remaining 60, idealrate 10, actualrate 8, completionforecast 8, scopecreep 15, velocity 20, sprintprogress 50, variance 10; crossing to statistics')
})
