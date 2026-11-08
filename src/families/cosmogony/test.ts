import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CosmogonyFormulas } from './index.js'
import '../../mcp/families.js'

test('cosmogony: stageorderings, elementcombos, creationdays, emanationlevels, dualitypairs, cyclelength, principlesubsets, orderfromchaos — crossing to philosophy', async (t) => {
  assert.equal(CosmogonyFormulas.stageorderings(5).value, 120)
  assert.equal(CosmogonyFormulas.elementcombos(5, 2).value, 10)
  assert.equal(CosmogonyFormulas.creationdays(6, 1).value, 7)
  assert.equal(CosmogonyFormulas.emanationlevels(7).value, 128)
  assert.equal(CosmogonyFormulas.dualitypairs(2, 4).value, 8)
  assert.equal(CosmogonyFormulas.cyclelength(4, 1000).value, 4000)
  assert.equal(CosmogonyFormulas.principlesubsets(4).value, 16)
  assert.equal(CosmogonyFormulas.orderfromchaos(100, 30).value, 70)
  assert.equal(CosmogonyFormulas.stageorderings(5).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('cosmogony')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cosmogony', program: ['stageorderings'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `cosmogony.stageorderings at ${uuid}`)
  uuidReceiptOf('cosmogony stageorderings', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stageorderings 120, elementcombos 10, creationdays 7, emanationlevels 128, dualitypairs 8, cyclelength 4000, principlesubsets 16, orderfromchaos 70; crossing to philosophy')
})
