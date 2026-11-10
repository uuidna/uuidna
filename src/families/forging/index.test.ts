import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ForgingFormulas } from './index.js'
import '../../mcp/families.js'

test('forging: force, reduction, strain, dieload, flowstress, upsetratio, energy, draft — crossing to metallurgy', async (t) => {
  assert.equal(ForgingFormulas.force(500, 20).value, 10000, 'pressure over the contact area')
  assert.equal(ForgingFormulas.reduction(200, 50).value, 75, 'three-quarters worked in')
  assert.equal(ForgingFormulas.reduction(50, 80).value, 0)
  assert.equal(ForgingFormulas.strain(20, 100).value, 20)
  assert.equal(ForgingFormulas.dieload(10000, 4).value, 2500, 'load per die')
  assert.equal(ForgingFormulas.flowstress(300, 3).value, 900)
  assert.equal(ForgingFormulas.upsetratio(90, 30).value, 3, 'height over diameter')
  assert.equal(ForgingFormulas.energy(10000, 5).value, 50000)
  assert.equal(ForgingFormulas.draft(100, 60).value, 40)
  assert.equal(ForgingFormulas.force(500, 20).dst, 'metallurgy')
  assert.equal(hexFamiliesOf().get('forging')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'forging', program: ['upsetratio'], params: [90, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `forging.upsetratio at ${uuid}`)
  uuidReceiptOf('forging upsetratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 10000, reduction 75, strain 20, dieload 2500, flowstress 900, upsetratio 3, energy 50000, draft 40; crossing to metallurgy')
})
