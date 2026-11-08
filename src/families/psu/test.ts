import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PsuFormulas } from './index.js'
import '../../mcp/families.js'

test('psu: watts, efficiency, headroom, rails and the load picture — crossing to hardware', async (t) => {
  assert.equal(PsuFormulas.watts(12, 50).value, 600, 'volts × amps')
  assert.equal(PsuFormulas.efficiency(540, 600).value, 90, 'output of the input')
  assert.equal(PsuFormulas.headroom(850, 600).value, 250, 'rated minus load')
  assert.equal(PsuFormulas.rails(4, 20).value, 80, 'rails × per-rail amps')
  assert.equal(PsuFormulas.loadpercent(600, 850).value, 70, 'load of the rating')
  assert.equal(PsuFormulas.dissipation(600, 540).value, 60, 'heat lost in conversion')
  assert.equal(PsuFormulas.current(600, 12).value, 50, 'amps at the voltage')
  assert.equal(PsuFormulas.redundancy(3, 2).value, 1, 'spare supplies')
  assert.equal(PsuFormulas.ripple(50).value, 50, 'ripple in mV')
  assert.equal(PsuFormulas.peak(600, 2).value, 1200, 'continuous × factor')
  assert.equal(PsuFormulas.watts(12, 50).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('psu')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'psu', program: ['watts'], params: [12, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `psu.watts at ${uuid}`)
  uuidReceiptOf('psu watts', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; watts 600, efficiency 90%, headroom 250, rails 80, loadpercent 70%, dissipation 60, current 50, redundancy 1, ripple 50, peak 1200; crossing to hardware')
})
