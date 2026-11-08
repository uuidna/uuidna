import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BankruptcyFormulas } from './index.js'
import '../../mcp/families.js'

test('bankruptcy: dividend, shortfall, priority, unsecured, preference, estate, discharge, ratio — crossing to law', async (t) => {
  assert.equal(BankruptcyFormulas.dividend(30000, 100000).value, 30, 'thirty cents on the dollar')
  assert.equal(BankruptcyFormulas.dividend(150000, 100000).value, 100, 'a solvent estate pays in full, no more')
  assert.equal(BankruptcyFormulas.shortfall(100000, 30000).value, 70000)
  assert.equal(BankruptcyFormulas.priority(40000, 30000).value, 30000, 'secured paid up to the estate')
  assert.equal(BankruptcyFormulas.unsecured(50000, 30000).value, 20000)
  assert.equal(BankruptcyFormulas.preference(60, 90).value, 1, 'within the look-back')
  assert.equal(BankruptcyFormulas.preference(120, 90).value, 0)
  assert.equal(BankruptcyFormulas.estate(80000, 20000).value, 60000)
  assert.equal(BankruptcyFormulas.discharge(50000, 15000).value, 35000)
  assert.equal(BankruptcyFormulas.ratio(60000, 100000).value, 60, 'a 60% solvency ratio')
  assert.equal(BankruptcyFormulas.dividend(30000, 100000).dst, 'law')
  assert.equal(hexFamiliesOf().get('bankruptcy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bankruptcy', program: ['shortfall'], params: [100000, 30000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 70000, `bankruptcy.shortfall at ${uuid}`)
  uuidReceiptOf('bankruptcy shortfall', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dividend 30, shortfall 70000, priority 30000, unsecured 20000, preference 1, estate 60000, discharge 35000, ratio 60; crossing to law')
})
