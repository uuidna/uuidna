import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CuringFormulas } from './index.js'
import '../../mcp/families.js'

test('curing: saltconcentration, wateractivity, curetime, nitritelevel, phlevel, weightloss, microbialreduction, brinestrength — crossing to microbiology', async (t) => {
  assert.equal(CuringFormulas.saltconcentration(3, 100).value, 3)
  assert.equal(CuringFormulas.wateractivity(85, 100).value, 85)
  assert.equal(CuringFormulas.curetime(7, 24).value, 168)
  assert.equal(CuringFormulas.nitritelevel(150, 1).value, 150)
  assert.equal(CuringFormulas.phlevel(52, 10).value, 5)
  assert.equal(CuringFormulas.weightloss(30, 100).value, 30)
  assert.equal(CuringFormulas.microbialreduction(99, 100).value, 99)
  assert.equal(CuringFormulas.brinestrength(20, 100).value, 20)
  assert.equal(CuringFormulas.saltconcentration(3, 100).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('curing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'curing', program: ['saltconcentration'], params: [3, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `curing.saltconcentration at ${uuid}`)
  uuidReceiptOf('curing saltconcentration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; saltconcentration 3, wateractivity 85, curetime 168, nitritelevel 150, phlevel 5, weightloss 30, microbialreduction 99, brinestrength 20; crossing to microbiology')
})
