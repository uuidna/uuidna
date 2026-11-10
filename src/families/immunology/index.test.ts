import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ImmunologyFormulas } from './index.js'
import '../../mcp/families.js'

test('immunology: titer, response, seroconversion, neutralization, cellcount, cytokine, affinity, boost — crossing to med', async (t) => {
  assert.equal(ImmunologyFormulas.titer(2, 3).value, 16, 'a dilution doubled three times')
  assert.equal(ImmunologyFormulas.response(1000, 200).value, 800)
  assert.equal(ImmunologyFormulas.seroconversion(90, 100).value, 90)
  assert.equal(ImmunologyFormulas.neutralization(45, 50).value, 90)
  assert.equal(ImmunologyFormulas.cellcount(5000, 10).value, 500)
  assert.equal(ImmunologyFormulas.cytokine(150, 50).value, 100)
  assert.equal(ImmunologyFormulas.affinity(300, 100).value, 300)
  assert.equal(ImmunologyFormulas.boost(400, 100).value, 400, 'a fourfold boost ·100')
  assert.equal(ImmunologyFormulas.titer(2, 3).dst, 'med')
  assert.equal(hexFamiliesOf().get('immunology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'immunology', program: ['titer'], params: [2, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `immunology.titer at ${uuid}`)
  uuidReceiptOf('immunology titer', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; titer 16, response 800, seroconversion 90, neutralization 90, cellcount 500, cytokine 100, affinity 300, boost 400; crossing to med')
})
