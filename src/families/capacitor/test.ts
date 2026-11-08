import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CapacitorFormulas } from './index.js'
import '../../mcp/families.js'

test('capacitor: charge, energy, reactance, timeconstant, seriescombos, voltagerating, parallelsum, leakage — crossing to electronics', async (t) => {
  assert.equal(CapacitorFormulas.charge(100, 12).value, 1200)
  assert.equal(CapacitorFormulas.energy(1200, 2).value, 600)
  assert.equal(CapacitorFormulas.reactance(60000, 628).value, 95)
  assert.equal(CapacitorFormulas.timeconstant(100, 10).value, 1000)
  assert.equal(CapacitorFormulas.seriescombos(8, 2).value, 28)
  assert.equal(CapacitorFormulas.voltagerating(25, 1).value, 25)
  assert.equal(CapacitorFormulas.parallelsum(100, 200).value, 300)
  assert.equal(CapacitorFormulas.leakage(1, 100).value, 1)
  assert.equal(CapacitorFormulas.charge(100, 12).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('capacitor')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'capacitor', program: ['charge'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `capacitor.charge at ${uuid}`)
  uuidReceiptOf('capacitor charge', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; charge 1200, energy 600, reactance 95, timeconstant 1000, seriescombos 28, voltagerating 25, parallelsum 300, leakage 1; crossing to electronics')
})
