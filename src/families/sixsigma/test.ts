import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SixsigmaFormulas } from './index.js'
import '../../mcp/families.js'

test('sixsigma: cpk, defects, dpmo, dpu, opportunities, rolledthroughput, sigma, yield — crossing to quality', async (t) => {
  assert.equal(SixsigmaFormulas.cpk(400, 300).value, 133, 'Cpk 1.33, ×100')
  assert.equal(SixsigmaFormulas.defects(1000, 3).value, 3000)
  assert.equal(SixsigmaFormulas.dpmo(5, 1000).value, 5000, 'five defects in a thousand opportunities')
  assert.equal(SixsigmaFormulas.dpu(20, 1000).value, 20)
  assert.equal(SixsigmaFormulas.opportunities(1000, 5).value, 5000)
  assert.equal(SixsigmaFormulas.rolledthroughput(95, 90, 90).value, 76, 'three stages rolled up')
  assert.equal(SixsigmaFormulas.sigma(600, 100).value, 6, 'six sigma')
  assert.equal(SixsigmaFormulas.yield(950, 1000).value, 95, 'first-pass yield')
  assert.equal(SixsigmaFormulas.sigma(600, 100).dst, 'quality')
  assert.equal(hexFamiliesOf().get('sixsigma')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sixsigma', program: ['sigma'], params: [600, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6, `sixsigma.sigma at ${uuid}`)
  uuidReceiptOf('sixsigma sigma', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cpk 133, defects 3000, dpmo 5000, dpu 20, opportunities 5000, rolledthroughput 76, sigma 6, yield 95; crossing to quality')
})
