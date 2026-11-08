import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiometricsFormulas } from './index.js'
import '../../mcp/families.js'

test('biometrics: far, frr, accuracy, enrollment, matchscore, templatesize, throughput, liveness — crossing to code', async (t) => {
  assert.equal(BiometricsFormulas.far(2, 10000).value, 2, 'false accept rate in basis points')
  assert.equal(BiometricsFormulas.frr(50, 10000).value, 50)
  assert.equal(BiometricsFormulas.accuracy(990, 1000).value, 99)
  assert.equal(BiometricsFormulas.enrollment(95, 100).value, 95)
  assert.equal(BiometricsFormulas.matchscore(80, 100).value, 80)
  assert.equal(BiometricsFormulas.templatesize(2048).value, 2048)
  assert.equal(BiometricsFormulas.throughput(6000, 60).value, 100, 'verifications per second')
  assert.equal(BiometricsFormulas.liveness(99, 100).value, 99)
  assert.equal(BiometricsFormulas.far(2, 10000).dst, 'code')
  assert.equal(hexFamiliesOf().get('biometrics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biometrics', program: ['accuracy'], params: [990, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `biometrics.accuracy at ${uuid}`)
  uuidReceiptOf('biometrics accuracy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; far 2, frr 50, accuracy 99, enrollment 95, matchscore 80, templatesize 2048, throughput 100, liveness 99; crossing to code')
})
