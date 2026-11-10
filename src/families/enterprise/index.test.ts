import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnterpriseFormulas } from './index.js'
import '../../mcp/families.js'

test('enterprise: po, approval, sla, procurement, leadtime, turnover, utilization, reorder — crossing to accounting', async (t) => {
  assert.equal(EnterpriseFormulas.po(1000, 50).value, 50000, 'a purchase order line total')
  assert.equal(EnterpriseFormulas.approval(500, 1000).value, 1, 'within threshold')
  assert.equal(EnterpriseFormulas.approval(1500, 1000).value, 0)
  assert.equal(EnterpriseFormulas.sla(999, 1000).value, 99)
  assert.equal(EnterpriseFormulas.procurement(100, 60).value, 60, 'procured at what cleared')
  assert.equal(EnterpriseFormulas.leadtime(10, 17).value, 7, 'seven days to receipt')
  assert.equal(EnterpriseFormulas.leadtime(17, 10).value, 0)
  assert.equal(EnterpriseFormulas.turnover(12000, 1000).value, 12)
  assert.equal(EnterpriseFormulas.utilization(75, 100).value, 75)
  assert.equal(EnterpriseFormulas.reorder(5, 10).value, 1, 'at the reorder point')
  assert.equal(EnterpriseFormulas.reorder(20, 10).value, 0)
  assert.equal(EnterpriseFormulas.po(1000, 50).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('enterprise')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'enterprise', program: ['po'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `enterprise.po at ${uuid}`)
  uuidReceiptOf('enterprise po', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; po 50000, approval 1, sla 99, procurement 60, leadtime 7, turnover 12, utilization 75, reorder 1; crossing to accounting')
})
