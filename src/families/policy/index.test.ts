import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolicyFormulas } from './index.js'
import '../../mcp/families.js'

test('policy: costbenefit, impact, adoption, compliance, efficiency, reach, lag, equity — crossing to law', async (t) => {
  assert.equal(PolicyFormulas.costbenefit(300, 100).value, 300, 'three to one')
  assert.equal(PolicyFormulas.impact(250, 1000).value, 25)
  assert.equal(PolicyFormulas.adoption(30, 40).value, 75)
  assert.equal(PolicyFormulas.compliance(80, 100).value, 80)
  assert.equal(PolicyFormulas.efficiency(1000, 25).value, 40)
  assert.equal(PolicyFormulas.reach(450, 600).value, 75)
  assert.equal(PolicyFormulas.lag(10, 90).value, 80, 'eighty days to effect')
  assert.equal(PolicyFormulas.lag(90, 10).value, 0, 'never before enactment')
  assert.equal(PolicyFormulas.equity(1000, 4).value, 250)
  assert.equal(PolicyFormulas.costbenefit(300, 100).dst, 'law')
  assert.equal(hexFamiliesOf().get('policy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'policy', program: ['adoption'], params: [30, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `policy.adoption at ${uuid}`)
  uuidReceiptOf('policy adoption', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; costbenefit 300, impact 25, adoption 75, compliance 80, efficiency 40, reach 75, lag 80, equity 250; crossing to law')
})
