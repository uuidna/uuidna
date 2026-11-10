import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GovernanceFormulas } from './index.js'
import '../../mcp/families.js'

test('governance: quorum, majority, transparency, accountability, representation, term, compliance, turnout — crossing to law', async (t) => {
  assert.equal(GovernanceFormulas.quorum(6, 10).value, 60, 'six of ten present')
  assert.equal(GovernanceFormulas.majority(60, 100).value, 60)
  assert.equal(GovernanceFormulas.transparency(9, 10).value, 90)
  assert.equal(GovernanceFormulas.accountability(45, 50).value, 90)
  assert.equal(GovernanceFormulas.representation(5, 1000000).value, 5, 'five seats per million')
  assert.equal(GovernanceFormulas.term(100, 4).value, 400, 'office-years')
  assert.equal(GovernanceFormulas.compliance(19, 20).value, 95)
  assert.equal(GovernanceFormulas.turnout(660, 1000).value, 66)
  assert.equal(GovernanceFormulas.quorum(6, 10).dst, 'law')
  assert.equal(hexFamiliesOf().get('governance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'governance', program: ['quorum'], params: [6, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `governance.quorum at ${uuid}`)
  uuidReceiptOf('governance quorum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; quorum 60, majority 60, transparency 90, accountability 90, representation 5, term 400, compliance 95, turnout 66; crossing to law')
})
