import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ContractFormulas } from './index.js'
import '../../mcp/families.js'

test('contract: the measures of a bargain and its breach — expectation, mitigation, liquidated, cure', async (t) => {
  assert.equal(ContractFormulas.expectation(10000, 4000).value, 6000, 'the benefit of the bargain')
  assert.equal(ContractFormulas.expectation(4000, 10000).value, 0, 'no loss, no expectation damages')
  assert.equal(ContractFormulas.mitigation(8000, 3000).value, 5000, 'loss net of what was avoided')
  assert.equal(ContractFormulas.reliance(2500).value, 2500)
  assert.equal(ContractFormulas.liquidated(500, 10).value, 5000, 'agreed rate per day of delay')
  assert.equal(ContractFormulas.deposit(100000, 10).value, 10000, 'a 10% deposit')
  assert.equal(ContractFormulas.penalty(20000, 5).value, 1000)
  assert.equal(ContractFormulas.restitution(7000, 2000).value, 5000, 'benefit net of value returned')
  assert.equal(ContractFormulas.cure(7, 14).value, 1, 'cured within the period')
  assert.equal(ContractFormulas.cure(21, 14).value, 0, 'the cure period passed')
  assert.equal(hexFamiliesOf().get('contract')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'contract', program: ['expectation'], params: [10000, 4000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `contract.expectation at ${uuid}`)
  uuidReceiptOf('contract expectation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; expectation 6000, mitigation 5000, liquidated 5000, deposit 10000, restitution 5000, cure 7≤14; crossing to law')
})
