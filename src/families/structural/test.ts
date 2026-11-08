import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StructuralFormulas } from './index.js'
import '../../mcp/families.js'

test('structural: moment, shear, buckling, safetyfactor, deflection, reinforcement, slenderness, seismic — crossing to construction', async (t) => {
  assert.equal(StructuralFormulas.moment(1000, 5).value, 5000, 'force at a lever distance')
  assert.equal(StructuralFormulas.shear(1000, 4).value, 250)
  assert.equal(StructuralFormulas.buckling(10000, 10).value, 100, 'stiffness over length squared')
  assert.equal(StructuralFormulas.safetyfactor(300, 100).value, 300, 'three times the demand')
  assert.equal(StructuralFormulas.deflection(5000, 50).value, 100)
  assert.equal(StructuralFormulas.reinforcement(2, 100).value, 2, 'two percent steel')
  assert.equal(StructuralFormulas.slenderness(3000, 50).value, 60)
  assert.equal(StructuralFormulas.seismic(2000, 3).value, 6000, 'mass under acceleration')
  assert.equal(StructuralFormulas.shear(1000, 0).value, 0, 'guarded division')
  assert.equal(StructuralFormulas.moment(1000, 5).dst, 'construction')
  assert.equal(hexFamiliesOf().get('structural')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'structural', program: ['moment'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `structural.moment at ${uuid}`)
  uuidReceiptOf('structural moment', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; moment 5000, shear 250, buckling 100, safetyfactor 300, deflection 100, reinforcement 2, slenderness 60, seismic 6000; crossing to construction')
})
