import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RheumatologyFormulas } from './index.js'
import '../../mcp/families.js'

test('rheumatology: crp, das28, esr, flareindex, inflammation, jointcount, mobility, painscore — crossing to immunology', async (t) => {
  assert.equal(RheumatologyFormulas.crp(15, 5).value, 10, 'CRP above baseline')
  assert.equal(RheumatologyFormulas.crp(3, 5).value, 0)
  assert.equal(RheumatologyFormulas.das28(5, 3, 20).value, 10, 'composite disease activity')
  assert.equal(RheumatologyFormulas.esr(300, 12).value, 25, 'mm per hour')
  assert.equal(RheumatologyFormulas.flareindex(20, 80).value, 25)
  assert.equal(RheumatologyFormulas.inflammation(25, 10).value, 35)
  assert.equal(RheumatologyFormulas.jointcount(5, 3).value, 8, 'tender plus swollen')
  assert.equal(RheumatologyFormulas.mobility(60, 90).value, 66)
  assert.equal(RheumatologyFormulas.painscore(7, 10).value, 70)
  assert.equal(RheumatologyFormulas.das28(5, 3, 20).dst, 'immunology')
  assert.equal(hexFamiliesOf().get('rheumatology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rheumatology', program: ['das28'], params: [5, 3, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `rheumatology.das28 at ${uuid}`)
  uuidReceiptOf('rheumatology das28', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; crp 10, das28 10, esr 25, flareindex 25, inflammation 35, jointcount 8, mobility 66, painscore 70; crossing to immunology')
})
