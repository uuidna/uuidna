import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MiningFormulas } from './index.js'
import '../../mcp/families.js'

test('mining: grade, recovery, reserves, stripping, cutoff, throughput, yield, cost — crossing to econ', async (t) => {
  assert.equal(MiningFormulas.grade(5, 1000).value, 5000, 'ppm of metal in the ore')
  assert.equal(MiningFormulas.recovery(90, 100).value, 90)
  assert.equal(MiningFormulas.reserves(1000000, 5000).value, 5000, 'metal held by the tonnage')
  assert.equal(MiningFormulas.stripping(300, 100).value, 300, 'three tonnes of waste per tonne of ore')
  assert.equal(MiningFormulas.cutoff(5000, 3000).value, 1, 'block clears the cut-off')
  assert.equal(MiningFormulas.cutoff(2000, 3000).value, 0)
  assert.equal(MiningFormulas.throughput(12000, 24).value, 500, 'tonnes milled per hour')
  assert.equal(MiningFormulas.yield(80, 100).value, 80)
  assert.equal(MiningFormulas.cost(500, 7).value, 3500)
  assert.equal(MiningFormulas.grade(5, 1000).dst, 'econ')
  assert.equal(hexFamiliesOf().get('mining')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mining', program: ['throughput'], params: [12000, 24] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `mining.throughput at ${uuid}`)
  uuidReceiptOf('mining throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; grade 5000, recovery 90, reserves 5000, stripping 300, cutoff 1, throughput 500, yield 80, cost 3500; crossing to econ')
})
