import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IchthyologyFormulas } from './index.js'
import '../../mcp/families.js'

test('ichthyology: condition, fecundity, schooling, growth, buoyancy, gillrate, mortality, trophic — crossing to zoology', async (t) => {
  assert.equal(IchthyologyFormulas.condition(1000, 10).value, 100000, "Fulton's K proxy")
  assert.equal(IchthyologyFormulas.fecundity(50000, 1000).value, 50)
  assert.equal(IchthyologyFormulas.schooling(6000, 60).value, 100, 'fish per unit volume')
  assert.equal(IchthyologyFormulas.growth(200, 150).value, 50)
  assert.equal(IchthyologyFormulas.growth(100, 150).value, 0, 'no shrinkage')
  assert.equal(IchthyologyFormulas.buoyancy(5, 100).value, 5)
  assert.equal(IchthyologyFormulas.gillrate(900, 15).value, 60, 'beats per minute')
  assert.equal(IchthyologyFormulas.mortality(10, 100).value, 10)
  assert.equal(IchthyologyFormulas.trophic(4).value, 4)
  assert.equal(IchthyologyFormulas.condition(1000, 10).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('ichthyology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ichthyology', program: ['schooling'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `ichthyology.schooling at ${uuid}`)
  uuidReceiptOf('ichthyology schooling', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; condition 100000, fecundity 50, schooling 100, growth 50, buoyancy 5, gillrate 60, mortality 10, trophic 4; crossing to zoology')
})
