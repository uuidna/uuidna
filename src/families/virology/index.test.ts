import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VirologyFormulas } from './index.js'
import '../../mcp/families.js'

test('virology: titer, load, replication, infectivity, mutation, latency, clearance, neutralization — crossing to med', async (t) => {
  assert.equal(VirologyFormulas.titer(50, 100).value, 5000, 'PFU/mL proxy')
  assert.equal(VirologyFormulas.load(1000000, 5).value, 200000, 'viral load per mL')
  assert.equal(VirologyFormulas.replication(5000, 100).value, 50, 'burst size')
  assert.equal(VirologyFormulas.infectivity(80, 100).value, 80)
  assert.equal(VirologyFormulas.mutation(3, 30000).value, 100, 'per million bases')
  assert.equal(VirologyFormulas.latency(14).value, 14)
  assert.equal(VirologyFormulas.clearance(90, 100).value, 90)
  assert.equal(VirologyFormulas.neutralization(75, 100).value, 75)
  assert.equal(VirologyFormulas.titer(50, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('virology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'virology', program: ['titer'], params: [50, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `virology.titer at ${uuid}`)
  uuidReceiptOf('virology titer', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; titer 5000, load 200000, replication 50, infectivity 80, mutation 100, latency 14, clearance 90, neutralization 75; crossing to med')
})
