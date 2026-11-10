import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GrouptheoryFormulas } from './index.js'
import '../../mcp/families.js'

test('grouptheory: order, cosets, cyclicorder, subgroupindex, cosetcount, symmetricorder, generatorpower, elementorder — crossing to algebra', async (t) => {
  assert.equal(GrouptheoryFormulas.order(6, 4).value, 24, 'the order of Z6 × Z4')
  assert.equal(GrouptheoryFormulas.cosets(24, 6).value, 4, 'four cosets by Lagrange')
  assert.equal(GrouptheoryFormulas.cyclicorder(12).value, 12)
  assert.equal(GrouptheoryFormulas.subgroupindex(60, 12).value, 5)
  assert.equal(GrouptheoryFormulas.cosetcount(100, 25).value, 4)
  assert.equal(GrouptheoryFormulas.symmetricorder(5).value, 120, '5! = order of S5')
  assert.equal(GrouptheoryFormulas.generatorpower(2, 10, 1000).value, 24)
  assert.equal(GrouptheoryFormulas.elementorder(4, 6).value, 3, 'the order of 4 in Z6')
  assert.equal(GrouptheoryFormulas.elementorder(5, 6).value, 6)
  assert.equal(GrouptheoryFormulas.order(6, 4).dst, 'algebra')
  assert.equal(hexFamiliesOf().get('grouptheory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'grouptheory', program: ['cosets'], params: [24, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `grouptheory.cosets at ${uuid}`)
  uuidReceiptOf('grouptheory cosets', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; order 24, cosets 4, cyclicorder 12, subgroupindex 5, cosetcount 4, symmetricorder 120, generatorpower 24, elementorder 3; crossing to algebra')
})
