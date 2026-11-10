import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ValuationFormulas } from './index.js'
import '../../mcp/families.js'

test('valuation: pe, pb, ebitda, marketcap, enterprise, bookvalue, multiple, fairvalue — crossing to econ', async (t) => {
  assert.equal(ValuationFormulas.pe(150, 10).value, 15, 'a P/E of fifteen')
  assert.equal(ValuationFormulas.pb(150, 50).value, 300, 'three times book')
  assert.equal(ValuationFormulas.ebitda(800, 200).value, 1000)
  assert.equal(ValuationFormulas.marketcap(1000, 150).value, 150000)
  assert.equal(ValuationFormulas.enterprise(10000, 3000, 1000).value, 12000, 'cap plus debt less cash')
  assert.equal(ValuationFormulas.bookvalue(5000, 2000).value, 3000)
  assert.equal(ValuationFormulas.bookvalue(2000, 5000).value, 0)
  assert.equal(ValuationFormulas.multiple(12000, 1000).value, 12, 'EV/EBITDA of twelve')
  assert.equal(ValuationFormulas.fairvalue(10, 15).value, 150)
  assert.equal(ValuationFormulas.pe(150, 10).dst, 'econ')
  assert.equal(hexFamiliesOf().get('valuation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'valuation', program: ['pe'], params: [150, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `valuation.pe at ${uuid}`)
  uuidReceiptOf('valuation pe', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pe 15, pb 300, ebitda 1000, marketcap 150000, enterprise 12000, bookvalue 3000, multiple 12, fairvalue 150; crossing to econ')
})
