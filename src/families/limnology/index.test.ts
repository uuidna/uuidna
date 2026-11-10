import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LimnologyFormulas } from './index.js'
import '../../mcp/families.js'

test('limnology: oxygen, clarity, trophic, residence, stratification, productivity, ph, turbidity — crossing to hydrology', async (t) => {
  assert.equal(LimnologyFormulas.oxygen(8, 10).value, 80, 'eighty percent of saturation')
  assert.equal(LimnologyFormulas.clarity(4).value, 4, 'Secchi depth')
  assert.equal(LimnologyFormulas.trophic(1000, 50).value, 20)
  assert.equal(LimnologyFormulas.residence(10000, 100).value, 100, 'residence time')
  assert.equal(LimnologyFormulas.stratification(22, 7).value, 15)
  assert.equal(LimnologyFormulas.stratification(7, 22).value, 0, 'floored at zero')
  assert.equal(LimnologyFormulas.productivity(6000, 60).value, 100)
  assert.equal(LimnologyFormulas.ph(50, 100).value, 50)
  assert.equal(LimnologyFormulas.turbidity(3, 10).value, 30)
  assert.equal(LimnologyFormulas.oxygen(8, 10).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('limnology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'limnology', program: ['trophic'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `limnology.trophic at ${uuid}`)
  uuidReceiptOf('limnology trophic', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; oxygen 80, clarity 4, trophic 20, residence 100, stratification 15, productivity 100, ph 50, turbidity 30; crossing to hydrology')
})
