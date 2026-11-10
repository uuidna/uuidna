import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AbsorptionFormulas } from './index.js'
import '../../mcp/families.js'

test('absorption: coefficient, nrc, sabins, transmissionloss, porosity, reductionindex, panelresonance, impedance — crossing to acoustics', async (t) => {
  assert.equal(AbsorptionFormulas.coefficient(80, 100).value, 80, 'four-fifths absorbed')
  assert.equal(AbsorptionFormulas.nrc(60, 80).value, 70)
  assert.equal(AbsorptionFormulas.sabins(200, 75).value, 15000, 'total absorption of the surface')
  assert.equal(AbsorptionFormulas.transmissionloss(1000, 100).value, 90, 'ninety percent not transmitted')
  assert.equal(AbsorptionFormulas.porosity(30, 120).value, 25)
  assert.equal(AbsorptionFormulas.reductionindex(95, 50).value, 45, 'level dropped across the partition')
  assert.equal(AbsorptionFormulas.reductionindex(50, 95).value, 0)
  assert.equal(AbsorptionFormulas.panelresonance(6000, 40).value, 150)
  assert.equal(AbsorptionFormulas.impedance(1, 340).value, 340, 'characteristic impedance of air')
  assert.equal(AbsorptionFormulas.coefficient(80, 100).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('absorption')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'absorption', program: ['coefficient'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `absorption.coefficient at ${uuid}`)
  uuidReceiptOf('absorption coefficient', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coefficient 80, nrc 70, sabins 15000, transmissionloss 90, porosity 25, reductionindex 45, panelresonance 150, impedance 340; crossing to acoustics')
})
