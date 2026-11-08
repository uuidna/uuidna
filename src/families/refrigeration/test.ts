import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RefrigerationFormulas } from './index.js'
import '../../mcp/families.js'

test('refrigeration: capacity, cooling, cop, defrost, load, pulldown, subcool, superheat — crossing to cuisine', async (t) => {
  assert.equal(RefrigerationFormulas.capacity(5, 12000).value, 60000, 'five tons at 12000 BTU/h each')
  assert.equal(RefrigerationFormulas.cooling(10, 400, 150).value, 2500, 'mass across the enthalpy drop')
  assert.equal(RefrigerationFormulas.cop(1200, 400).value, 3, 'three units cooled per unit of work')
  assert.equal(RefrigerationFormulas.cop(1200, 0).value, 0, 'no work, no coefficient')
  assert.equal(RefrigerationFormulas.defrost(1440, 360).value, 4, 'four defrosts in the day')
  assert.equal(RefrigerationFormulas.load(10, 4, 20).value, 800)
  assert.equal(RefrigerationFormulas.pulldown(1000, 250).value, 4, 'four cycles to pull down')
  assert.equal(RefrigerationFormulas.subcool(40, 33).value, 7)
  assert.equal(RefrigerationFormulas.superheat(50, 42).value, 8)
  assert.equal(RefrigerationFormulas.capacity(5, 12000).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('refrigeration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'refrigeration', program: ['cop'], params: [1200, 400] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `refrigeration.cop at ${uuid}`)
  uuidReceiptOf('refrigeration cop', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 60000, cooling 2500, cop 3, defrost 4, load 800, pulldown 4, subcool 7, superheat 8; crossing to cuisine')
})
