import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReliabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('reliability: mtbf, mttr, availability, failurerate, redundancy, survival, nines, reliability — crossing to code', async (t) => {
  assert.equal(ReliabilityFormulas.mtbf(10000, 5).value, 2000, 'hours between failures')
  assert.equal(ReliabilityFormulas.mttr(600, 4).value, 150, 'hours to repair')
  assert.equal(ReliabilityFormulas.availability(999, 1000).value, 99)
  assert.equal(ReliabilityFormulas.failurerate(3, 1000000).value, 3, 'FIT')
  assert.equal(ReliabilityFormulas.redundancy(3, 2).value, 150)
  assert.equal(ReliabilityFormulas.survival(950, 1000).value, 95)
  assert.equal(ReliabilityFormulas.nines(99999, 100000).value, 9999)
  assert.equal(ReliabilityFormulas.reliability(95, 100).value, 95)
  assert.equal(ReliabilityFormulas.mtbf(10000, 5).dst, 'code')
  assert.equal(hexFamiliesOf().get('reliability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'reliability', program: ['availability'], params: [999, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `reliability.availability at ${uuid}`)
  uuidReceiptOf('reliability availability', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mtbf 2000, mttr 150, availability 99, failurerate 3, redundancy 150, survival 95, nines 9999, reliability 95; crossing to code')
})
