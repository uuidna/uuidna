import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BlackholeFormulas } from './index.js'
import '../../mcp/families.js'

test('blackhole: schwarzschildradius, hawkingtemp, entropy, photonsphere, isco, tidalforce, evaporationtime, accretionrate — crossing to astrophysics', async (t) => {
  assert.equal(BlackholeFormulas.schwarzschildradius(10).value, 30, 'three km per solar mass')
  assert.equal(BlackholeFormulas.hawkingtemp(620).value, 1000)
  assert.equal(BlackholeFormulas.entropy(100).value, 10000, 'area is the square of the mass')
  assert.equal(BlackholeFormulas.photonsphere(10).value, 45)
  assert.equal(BlackholeFormulas.isco(10).value, 90, 'three Schwarzschild radii')
  assert.equal(BlackholeFormulas.tidalforce(1000, 2).value, 250)
  assert.equal(BlackholeFormulas.evaporationtime(10).value, 1000)
  assert.equal(BlackholeFormulas.accretionrate(1000, 4).value, 250)
  assert.equal(BlackholeFormulas.accretionrate(1000, 0).value, 0)
  assert.equal(BlackholeFormulas.schwarzschildradius(10).dst, 'astrophysics')
  assert.equal(hexFamiliesOf().get('blackhole')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'blackhole', program: ['isco'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `blackhole.isco at ${uuid}`)
  uuidReceiptOf('blackhole isco', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; schwarzschildradius 30, hawkingtemp 1000, entropy 10000, photonsphere 45, isco 90, tidalforce 250, evaporationtime 1000, accretionrate 250; crossing to astrophysics')
})
