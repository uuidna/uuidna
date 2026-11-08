import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StellarFormulas } from './index.js'
import '../../mcp/families.js'

test('stellar: mainsequencelifetime, masslunminosity, schwarzschildradius, surfacegravity, effectivetemp, corefusionrate, massloss, spectralclass — crossing to astrophysics', async (t) => {
  assert.equal(StellarFormulas.mainsequencelifetime(10, 1000).value, 100, 'a massive star burns fast')
  assert.equal(StellarFormulas.masslunminosity(4).value, 64)
  assert.equal(StellarFormulas.schwarzschildradius(10).value, 30, 'about 3 km per solar mass')
  assert.equal(StellarFormulas.surfacegravity(100, 10).value, 1000)
  assert.equal(StellarFormulas.effectivetemp(500).value, 5796, 'the Sun peaks near 500 nm')
  assert.equal(StellarFormulas.corefusionrate(10, 15).value, 150)
  assert.equal(StellarFormulas.massloss(1000, 2, 100).value, 800)
  assert.equal(StellarFormulas.massloss(100, 2, 100).value, 0, 'mass loss never goes negative')
  assert.equal(StellarFormulas.spectralclass(5800).value, 5)
  assert.equal(StellarFormulas.mainsequencelifetime(10, 1000).dst, 'astrophysics')
  assert.equal(hexFamiliesOf().get('stellar')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stellar', program: ['schwarzschildradius'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `stellar.schwarzschildradius at ${uuid}`)
  uuidReceiptOf('stellar schwarzschildradius', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mainsequencelifetime 100, masslunminosity 64, schwarzschildradius 30, surfacegravity 1000, effectivetemp 5796, corefusionrate 150, massloss 800, spectralclass 5; crossing to astrophysics')
})
