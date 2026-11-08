import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NuclearphysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('nuclearphysics: halflife, decay, bindingenergy, massdefect, criticality, activity, dose, fission — crossing to thermodynamics', async (t) => {
  assert.equal(NuclearphysicsFormulas.halflife(1000, 3).value, 125, 'an eighth left after three half-lives')
  assert.equal(NuclearphysicsFormulas.decay(1000, 3).value, 875, 'the rest has decayed')
  assert.equal(NuclearphysicsFormulas.bindingenergy(56, 8).value, 448)
  assert.equal(NuclearphysicsFormulas.massdefect(940, 931).value, 9)
  assert.equal(NuclearphysicsFormulas.criticality(100, 95).value, 1, 'critical')
  assert.equal(NuclearphysicsFormulas.criticality(90, 95).value, 0)
  assert.equal(NuclearphysicsFormulas.activity(6000, 60).value, 100, 'decays per second')
  assert.equal(NuclearphysicsFormulas.dose(1000, 50).value, 20)
  assert.equal(NuclearphysicsFormulas.fission(100, 200).value, 20000)
  assert.equal(NuclearphysicsFormulas.halflife(1000, 3).dst, 'thermodynamics')
  assert.equal(hexFamiliesOf().get('nuclearphysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nuclearphysics', program: ['halflife'], params: [1000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `nuclearphysics.halflife at ${uuid}`)
  uuidReceiptOf('nuclearphysics halflife', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; halflife 125, decay 875, bindingenergy 448, massdefect 9, criticality 1, activity 100, dose 20, fission 20000; crossing to thermodynamics')
})
