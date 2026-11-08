import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CustomerFormulas } from './index.js'
import '../../mcp/families.js'

test('customer: csat, nps, churn, retention, tickets, resolution, response, upsell — crossing to analytics', async (t) => {
  assert.equal(CustomerFormulas.csat(900, 1000).value, 90)
  assert.equal(CustomerFormulas.nps(70, 20).value, 50, 'net promoter score')
  assert.equal(CustomerFormulas.nps(20, 70).value, -50, 'negative net promoter score')
  assert.equal(CustomerFormulas.churn(50, 1000).value, 5)
  assert.equal(CustomerFormulas.retention(950, 1000).value, 95)
  assert.equal(CustomerFormulas.tickets(100, 8).value, 12, 'tickets per agent')
  assert.equal(CustomerFormulas.resolution(800, 1000).value, 80)
  assert.equal(CustomerFormulas.response(600, 50).value, 12, 'minutes per ticket')
  assert.equal(CustomerFormulas.upsell(120, 1000).value, 12)
  assert.equal(CustomerFormulas.csat(900, 1000).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('customer')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'customer', program: ['retention'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `customer.retention at ${uuid}`)
  uuidReceiptOf('customer retention', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; csat 90, nps 50/-50, churn 5, retention 95, tickets 12, resolution 80, response 12, upsell 12; crossing to analytics')
})
