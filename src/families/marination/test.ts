import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MarinationFormulas } from './index.js'
import '../../mcp/families.js'

test('marination: penetrationdepth, aciduptake, tenderization, marinatetime, saltdiffusion, flavorload, phshift, weightgain — crossing to biochemistry', async (t) => {
  assert.equal(MarinationFormulas.penetrationdepth(20, 4).value, 5)
  assert.equal(MarinationFormulas.aciduptake(15, 100).value, 15)
  assert.equal(MarinationFormulas.tenderization(40, 100).value, 40)
  assert.equal(MarinationFormulas.marinatetime(4, 60).value, 240)
  assert.equal(MarinationFormulas.saltdiffusion(100, 10).value, 10)
  assert.equal(MarinationFormulas.flavorload(12, 5).value, 60)
  assert.equal(MarinationFormulas.phshift(60, 45).value, 15)
  assert.equal(MarinationFormulas.weightgain(8, 100).value, 8)
  assert.equal(MarinationFormulas.penetrationdepth(20, 4).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('marination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'marination', program: ['penetrationdepth'], params: [20, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `marination.penetrationdepth at ${uuid}`)
  uuidReceiptOf('marination penetrationdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; penetrationdepth 5, aciduptake 15, tenderization 40, marinatetime 240, saltdiffusion 10, flavorload 60, phshift 15, weightgain 8; crossing to biochemistry')
})
