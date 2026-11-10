import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LiftFormulas } from './index.js'
import '../../mcp/families.js'

test('lift: force, coefficient, aspectratio, angleofattack, liftdragratio, circulation, stallmargin, loading — crossing to aerodynamics', async (t) => {
  assert.equal(LiftFormulas.force(50, 20).value, 1000, 'dynamic pressure over the wing area')
  assert.equal(LiftFormulas.coefficient(600, 1000).value, 60)
  assert.equal(LiftFormulas.aspectratio(30, 90).value, 10, 'a long, thin wing')
  assert.equal(LiftFormulas.angleofattack(12, 4).value, 8)
  assert.equal(LiftFormulas.liftdragratio(1800, 100).value, 18, 'the glide number')
  assert.equal(LiftFormulas.circulation(5000, 100).value, 50)
  assert.equal(LiftFormulas.stallmargin(15, 12).value, 3, 'three degrees before stall')
  assert.equal(LiftFormulas.stallmargin(10, 15).value, 0)
  assert.equal(LiftFormulas.loading(24000, 30).value, 800)
  assert.equal(LiftFormulas.force(50, 20).dst, 'aerodynamics')
  assert.equal(hexFamiliesOf().get('lift')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lift', program: ['aspectratio'], params: [30, 90] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `lift.aspectratio at ${uuid}`)
  uuidReceiptOf('lift aspectratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 1000, coefficient 60, aspectratio 10, angleofattack 8, liftdragratio 18, circulation 50, stallmargin 3, loading 800; crossing to aerodynamics')
})
