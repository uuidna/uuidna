import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AntitrustFormulas } from './index.js'
import '../../mcp/families.js'

test('antitrust: share, HHI, concentration, dominance, markup, damages, fine, merger — crossing to law', async (t) => {
  assert.equal(AntitrustFormulas.share(40, 100).value, 40, 'a 40% market share')
  assert.equal(AntitrustFormulas.hhi(40, 30).value, 2500, '40² + 30²')
  assert.equal(AntitrustFormulas.concentration(70, 100).value, 70, 'the four-firm ratio')
  assert.equal(AntitrustFormulas.dominance(45, 40).value, 1, 'above the dominance threshold')
  assert.equal(AntitrustFormulas.dominance(30, 40).value, 0)
  assert.equal(AntitrustFormulas.margin(100, 60).value, 40, 'a 40% markup')
  assert.equal(AntitrustFormulas.margin(60, 100).value, -67, 'below-cost pricing reads negative (floor)')
  assert.equal(AntitrustFormulas.damages(5, 100000).value, 500000, 'overcharge over affected units')
  assert.equal(AntitrustFormulas.fine(1000000, 10).value, 100000)
  assert.equal(AntitrustFormulas.merger(40, 30).value, 70, 'combined post-merger share')
  assert.equal(AntitrustFormulas.share(40, 100).dst, 'law')
  assert.equal(hexFamiliesOf().get('antitrust')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'antitrust', program: ['hhi'], params: [40, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2500, `antitrust.hhi at ${uuid}`)
  uuidReceiptOf('antitrust hhi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; share 40, hhi 2500, concentration 70, dominance 1, margin 40/-67, damages 500000, fine 100000, merger 70; crossing to law')
})
