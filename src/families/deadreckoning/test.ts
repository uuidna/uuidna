import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DeadreckoningFormulas } from './index.js'
import '../../mcp/families.js'

test('deadreckoning: distance, driftangle, positionerror, elapsedtime, speedmadegood, setandrift, estimatedposition, coursecorrection — crossing to navigation', async (t) => {
  assert.equal(DeadreckoningFormulas.distance(12, 3).value, 36, 'speed · time')
  assert.equal(DeadreckoningFormulas.driftangle(10, 60).value, 10, 'arcminutes of drift')
  assert.equal(DeadreckoningFormulas.positionerror(500, 480).value, 20)
  assert.equal(DeadreckoningFormulas.elapsedtime(360, 12).value, 30, 'time to run the distance')
  assert.equal(DeadreckoningFormulas.elapsedtime(360, 0).value, 0)
  assert.equal(DeadreckoningFormulas.speedmadegood(360, 30).value, 12, 'knots made good')
  assert.equal(DeadreckoningFormulas.setandrift(3, 4).value, 12)
  assert.equal(DeadreckoningFormulas.estimatedposition(100, 36).value, 136)
  assert.equal(DeadreckoningFormulas.coursecorrection(90, 75).value, 15)
  assert.equal(DeadreckoningFormulas.distance(12, 3).dst, 'navigation')
  assert.equal(hexFamiliesOf().get('deadreckoning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'deadreckoning', program: ['distance'], params: [12, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 36, `deadreckoning.distance at ${uuid}`)
  uuidReceiptOf('deadreckoning distance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; distance 36, driftangle 10, positionerror 20, elapsedtime 30, speedmadegood 12, setandrift 12, estimatedposition 136, coursecorrection 15; crossing to navigation')
})
