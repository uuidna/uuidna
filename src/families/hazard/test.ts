import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HazardFormulas } from './index.js'
import '../../mcp/families.js'

test('hazard: risk, exposure, toxicity, probability, mitigation, spread, dilution, evacuation — crossing to med', async (t) => {
  assert.equal(HazardFormulas.risk(5, 8).value, 40, 'likelihood times consequence')
  assert.equal(HazardFormulas.exposure(50, 100).value, 50)
  assert.equal(HazardFormulas.toxicity(2, 100).value, 2)
  assert.equal(HazardFormulas.probability(3, 100).value, 3)
  assert.equal(HazardFormulas.mitigation(40, 100).value, 40)
  assert.equal(HazardFormulas.spread(5, 100).value, 5)
  assert.equal(HazardFormulas.dilution(5, 1000000).value, 5, 'parts per million')
  assert.equal(HazardFormulas.evacuation(1000, 50).value, 20, 'time to clear')
  assert.equal(HazardFormulas.exposure(50, 0).value, 0, 'division guarded')
  assert.equal(HazardFormulas.risk(5, 8).dst, 'med')
  assert.equal(hexFamiliesOf().get('hazard')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hazard', program: ['risk'], params: [5, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `hazard.risk at ${uuid}`)
  uuidReceiptOf('hazard risk', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; risk 40, exposure 50, toxicity 2, probability 3, mitigation 40, spread 5, dilution 5, evacuation 20; crossing to med')
})
