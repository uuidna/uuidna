import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HailFormulas } from './index.js'
import '../../mcp/families.js'

test('hail: diametermm, layers, updraftspeed, terminalvelocity, kineticenergy, damagescale, growthtime, massg — crossing to meteorology', async (t) => {
  assert.equal(HailFormulas.diametermm(20, 1).value, 20)
  assert.equal(HailFormulas.layers(10, 5).value, 15)
  assert.equal(HailFormulas.updraftspeed(30, 2).value, 60)
  assert.equal(HailFormulas.terminalvelocity(900, 10).value, 90)
  assert.equal(HailFormulas.kineticenergy(50, 20).value, 1000)
  assert.equal(HailFormulas.damagescale(3, 5).value, 5)
  assert.equal(HailFormulas.growthtime(600, 60).value, 10)
  assert.equal(HailFormulas.massg(1000, 10).value, 100)
  assert.equal(HailFormulas.diametermm(20, 1).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('hail')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hail', program: ['diametermm'], params: [20, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `hail.diametermm at ${uuid}`)
  uuidReceiptOf('hail diametermm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; diametermm 20, layers 15, updraftspeed 60, terminalvelocity 90, kineticenergy 1000, damagescale 5, growthtime 10, massg 100; crossing to meteorology')
})
