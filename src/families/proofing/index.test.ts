import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProofingFormulas } from './index.js'
import '../../mcp/families.js'

test('proofing: prooftime, volumegain, temperaturefactor, humiditylevel, fermentationdegree, overproofrisk, doughtemp, yeastdose — crossing to biochemistry', async (t) => {
  assert.equal(ProofingFormulas.prooftime(180, 2).value, 90)
  assert.equal(ProofingFormulas.volumegain(180, 100).value, 180)
  assert.equal(ProofingFormulas.temperaturefactor(27, 3).value, 9)
  assert.equal(ProofingFormulas.humiditylevel(75, 100).value, 75)
  assert.equal(ProofingFormulas.fermentationdegree(90, 100).value, 90)
  assert.equal(ProofingFormulas.overproofrisk(200, 180).value, 20)
  assert.equal(ProofingFormulas.doughtemp(24, 3).value, 27)
  assert.equal(ProofingFormulas.yeastdose(1000, 100).value, 10)
  assert.equal(ProofingFormulas.prooftime(180, 2).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('proofing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'proofing', program: ['prooftime'], params: [180, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `proofing.prooftime at ${uuid}`)
  uuidReceiptOf('proofing prooftime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; prooftime 90, volumegain 180, temperaturefactor 9, humiditylevel 75, fermentationdegree 90, overproofrisk 20, doughtemp 27, yeastdose 10; crossing to biochemistry')
})
