import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QualityFormulas } from './index.js'
import '../../mcp/families.js'

test('quality: defectrate, firstpass, sigma, capability, conformance, rework, scrap, satisfaction — crossing to manufacturing', async (t) => {
  assert.equal(QualityFormulas.defectrate(3, 1000).value, 3000, 'defects per million')
  assert.equal(QualityFormulas.firstpass(950, 1000).value, 95, 'first-pass yield')
  assert.equal(QualityFormulas.sigma(60, 10).value, 6, 'six sigma')
  assert.equal(QualityFormulas.capability(20, 10).value, 200)
  assert.equal(QualityFormulas.conformance(990, 1000).value, 99)
  assert.equal(QualityFormulas.rework(50, 1000).value, 5)
  assert.equal(QualityFormulas.scrap(20, 1000).value, 2)
  assert.equal(QualityFormulas.satisfaction(850, 1000).value, 85)
  assert.equal(QualityFormulas.defectrate(3, 1000).dst, 'manufacturing')
  assert.equal(hexFamiliesOf().get('quality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'quality', program: ['firstpass'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `quality.firstpass at ${uuid}`)
  uuidReceiptOf('quality firstpass', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; defectrate 3000, firstpass 95, sigma 6, capability 200, conformance 99, rework 5, scrap 2, satisfaction 85; crossing to manufacturing')
})
