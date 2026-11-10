import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrimatologyFormulas } from './index.js'
import '../../mcp/families.js'

test('primatology: encephalization, troop, grooming, dominance, foraging, maturity, kinship, tooluse — crossing to zoology', async (t) => {
  assert.equal(PrimatologyFormulas.encephalization(1200, 60).value, 20000, 'an EQ proxy')
  assert.equal(PrimatologyFormulas.troop(100, 8).value, 12, 'members per group')
  assert.equal(PrimatologyFormulas.grooming(500, 20).value, 25)
  assert.equal(PrimatologyFormulas.dominance(7, 10).value, 70)
  assert.equal(PrimatologyFormulas.foraging(2000, 8).value, 250, 'calories per hour')
  assert.equal(PrimatologyFormulas.maturity(12).value, 12)
  assert.equal(PrimatologyFormulas.kinship(5, 20).value, 25)
  assert.equal(PrimatologyFormulas.tooluse(15, 30).value, 50)
  assert.equal(PrimatologyFormulas.troop(100, 8).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('primatology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'primatology', program: ['troop'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `primatology.troop at ${uuid}`)
  uuidReceiptOf('primatology troop', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; encephalization 20000, troop 12, grooming 25, dominance 70, foraging 250, maturity 12, kinship 25, tooluse 50; crossing to zoology')
})
