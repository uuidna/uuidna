import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PharmacokineticsFormulas } from './index.js'
import '../../mcp/families.js'

test('pharmacokinetics: volume, clearancerate, auc, cmax, steadystate, loadingdose, accumulation, extraction — crossing to pharmacology', async (t) => {
  assert.equal(PharmacokineticsFormulas.volume(1000, 10).value, 100, 'the dose fills 100 units of volume')
  assert.equal(PharmacokineticsFormulas.clearancerate(50, 2).value, 100, 'clearance from volume and rate')
  assert.equal(PharmacokineticsFormulas.auc(1000, 20).value, 50)
  assert.equal(PharmacokineticsFormulas.cmax(500, 10).value, 50)
  assert.equal(PharmacokineticsFormulas.steadystate(600, 6).value, 100, 'the level a rate holds')
  assert.equal(PharmacokineticsFormulas.loadingdose(10, 50).value, 500)
  assert.equal(PharmacokineticsFormulas.accumulation(24, 12).value, 10, 'intervals to steady state')
  assert.equal(PharmacokineticsFormulas.extraction(90, 100).value, 90, 'extraction ratio')
  assert.equal(PharmacokineticsFormulas.extraction(45, 90).value, 50)
  assert.equal(PharmacokineticsFormulas.volume(1000, 10).dst, 'pharmacology')
  assert.equal(hexFamiliesOf().get('pharmacokinetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pharmacokinetics', program: ['volume'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `pharmacokinetics.volume at ${uuid}`)
  uuidReceiptOf('pharmacokinetics volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 100, clearancerate 100, auc 50, cmax 50, steadystate 100, loadingdose 500, accumulation 10, extraction 90; crossing to pharmacology')
})
