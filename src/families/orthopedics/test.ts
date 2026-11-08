import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrthopedicsFormulas } from './index.js'
import '../../mcp/families.js'

test('orthopedics: rangeofmotion, bonedensity, fractureload, legdiscrepancy, cobbangle, gait, alignment, implantsize — crossing to anatomy', async (t) => {
  assert.equal(OrthopedicsFormulas.rangeofmotion(120, 150).value, 80, 'active flexion as a percent of passive')
  assert.equal(OrthopedicsFormulas.bonedensity(80, 100).value, 80)
  assert.equal(OrthopedicsFormulas.fractureload(50, 80).value, 4000, 'area at a strength')
  assert.equal(OrthopedicsFormulas.legdiscrepancy(920, 905).value, 15, 'millimetres longer on the left')
  assert.equal(OrthopedicsFormulas.cobbangle(22, 18).value, 40)
  assert.equal(OrthopedicsFormulas.gait(100, 60).value, 100, 'steps per minute')
  assert.equal(OrthopedicsFormulas.alignment(185, 180).value, 5)
  assert.equal(OrthopedicsFormulas.implantsize(96, 5).value, 20, 'stem increments for the canal')
  assert.equal(OrthopedicsFormulas.rangeofmotion(120, 150).dst, 'anatomy')
  assert.equal(hexFamiliesOf().get('orthopedics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'orthopedics', program: ['implantsize'], params: [96, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `orthopedics.implantsize at ${uuid}`)
  uuidReceiptOf('orthopedics implantsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rangeofmotion 80, bonedensity 80, fractureload 4000, legdiscrepancy 15, cobbangle 40, gait 100, alignment 5, implantsize 20; crossing to anatomy')
})
