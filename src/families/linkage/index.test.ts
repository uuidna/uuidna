import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LinkageFormulas } from './index.js'
import '../../mcp/families.js'

test('linkage: degreesoffreedom, linkcount, jointcount, reach, transmissionangle, mechanicaladvantage, couplercurve, grashofcondition — crossing to robotics', async (t) => {
  assert.equal(LinkageFormulas.degreesoffreedom(6, 2).value, 4)
  assert.equal(LinkageFormulas.linkcount(4, 1).value, 5)
  assert.equal(LinkageFormulas.jointcount(5, 1).value, 4)
  assert.equal(LinkageFormulas.reach(30, 4).value, 120)
  assert.equal(LinkageFormulas.transmissionangle(90, 30).value, 60)
  assert.equal(LinkageFormulas.mechanicaladvantage(100, 25).value, 4)
  assert.equal(LinkageFormulas.couplercurve(12, 3).value, 36)
  assert.equal(LinkageFormulas.grashofcondition(10, 8).value, 1)
  assert.equal(LinkageFormulas.degreesoffreedom(6, 2).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('linkage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'linkage', program: ['degreesoffreedom'], params: [6, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `linkage.degreesoffreedom at ${uuid}`)
  uuidReceiptOf('linkage degreesoffreedom', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; degreesoffreedom 4, linkcount 5, jointcount 4, reach 120, transmissionangle 60, mechanicaladvantage 4, couplercurve 36, grashofcondition 1; crossing to robotics')
})
