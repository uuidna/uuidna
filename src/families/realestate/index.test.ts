import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RealestateFormulas } from './index.js'
import '../../mcp/families.js'

test('realestate: appreciation, caprate, equity, ltv, mortgage, occupancy, pricesqft, rentyield — crossing to accounting', async (t) => {
  assert.equal(RealestateFormulas.appreciation(150, 100).value, 50, 'half again over purchase')
  assert.equal(RealestateFormulas.caprate(8, 100).value, 8)
  assert.equal(RealestateFormulas.equity(500, 300).value, 200, 'value left after debt')
  assert.equal(RealestateFormulas.equity(300, 500).value, 0, 'never negative')
  assert.equal(RealestateFormulas.ltv(80, 100).value, 80)
  assert.equal(RealestateFormulas.mortgage(12000, 6).value, 60, 'monthly interest proxy')
  assert.equal(RealestateFormulas.occupancy(95, 100).value, 95)
  assert.equal(RealestateFormulas.pricesqft(200000, 1000).value, 200)
  assert.equal(RealestateFormulas.rentyield(1000, 120000).value, 10, 'annual rent yield %')
  assert.equal(RealestateFormulas.caprate(8, 100).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('realestate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'realestate', program: ['ltv'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `realestate.ltv at ${uuid}`)
  uuidReceiptOf('realestate ltv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; appreciation 50, caprate 8, equity 200, ltv 80, mortgage 60, occupancy 95, pricesqft 200, rentyield 10; crossing to accounting')
})
