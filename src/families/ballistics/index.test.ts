import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BallisticsFormulas } from './index.js'
import '../../mcp/families.js'

test('ballistics: energy, momentum, velocity, drop, penetration, recoil, spread, time — into evidence', async (t) => {
  assert.equal(BallisticsFormulas.energy(10, 400).value, 800, '½·10g·400² → 800 J')
  assert.equal(BallisticsFormulas.momentum(10, 400).value, 4000)
  assert.equal(BallisticsFormulas.velocity(800, 2).value, 400)
  assert.equal(BallisticsFormulas.drop(100, 700).value, 10, 'gravity drop over 100 m at 700 m/s')
  assert.equal(BallisticsFormulas.penetration(800, 4).value, 200)
  assert.equal(BallisticsFormulas.recoil(10, 400, 4000).value, 1, 'recoil velocity by conservation')
  assert.equal(BallisticsFormulas.spread(2, 300).value, 6, 'two MOA at 300 yards')
  assert.equal(BallisticsFormulas.time(800, 400).value, 2)
  assert.equal(BallisticsFormulas.energy(10, 400).dst, 'evidence', 'a forensic measure read into evidence')
  assert.equal(hexFamiliesOf().get('ballistics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ballistics', program: ['momentum'], params: [10, 400] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4000, `ballistics.momentum at ${uuid}`)
  uuidReceiptOf('ballistics momentum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energy 800J, momentum 4000, velocity 400, drop 10, penetration 200, recoil 1, spread 6, time 2; crossing to evidence')
})
