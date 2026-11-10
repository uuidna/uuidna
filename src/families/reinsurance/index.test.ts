import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReinsuranceFormulas } from './index.js'
import '../../mcp/families.js'

test('reinsurance: cession, retention, treaty, quota, surplus, recovery, layer, attachment — crossing to insurance', async (t) => {
  assert.equal(ReinsuranceFormulas.cession(1000, 30).value, 300, 'thirty percent ceded')
  assert.equal(ReinsuranceFormulas.retention(1000, 300).value, 700, 'the carrier keeps the rest')
  assert.equal(ReinsuranceFormulas.retention(300, 1000).value, 0)
  assert.equal(ReinsuranceFormulas.treaty(500, 4).value, 2000, 'treaty capacity')
  assert.equal(ReinsuranceFormulas.quota(40, 5000).value, 2000)
  assert.equal(ReinsuranceFormulas.surplus(9, 1000).value, 9000, 'nine lines of cover')
  assert.equal(ReinsuranceFormulas.recovery(5000, 1000).value, 4000)
  assert.equal(ReinsuranceFormulas.layer(10000, 2000).value, 8000, 'the layer width')
  assert.equal(ReinsuranceFormulas.attachment(8000, 4).value, 2000, 'four equal bands')
  assert.equal(ReinsuranceFormulas.cession(1000, 30).dst, 'insurance')
  assert.equal(hexFamiliesOf().get('reinsurance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'reinsurance', program: ['cession'], params: [1000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `reinsurance.cession at ${uuid}`)
  uuidReceiptOf('reinsurance cession', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cession 300, retention 700, treaty 2000, quota 2000, surplus 9000, recovery 4000, layer 8000, attachment 2000; crossing to insurance')
})
