import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('statics: centroid, equilibrium, friction, moment, normalforce, reaction, shear, truss — crossing to kinematics', async (t) => {
  assert.equal(StaticsFormulas.centroid(10, 30, 8).value, 6, 'combined centroid from the first mass')
  assert.equal(StaticsFormulas.equilibrium(500, 500).value, 1, 'balanced')
  assert.equal(StaticsFormulas.equilibrium(500, 400).value, 0)
  assert.equal(StaticsFormulas.friction(500, 40).value, 200)
  assert.equal(StaticsFormulas.moment(50, 4).value, 200, 'force-distance moment')
  assert.equal(StaticsFormulas.normalforce(50, 10).value, 500)
  assert.equal(StaticsFormulas.reaction(100, 3, 10).value, 30, 'support reaction')
  assert.equal(StaticsFormulas.shear(800, 300).value, 500)
  assert.equal(StaticsFormulas.truss(7).value, 11, 'members for seven joints')
  assert.equal(StaticsFormulas.moment(50, 4).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('statics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'statics', program: ['moment'], params: [50, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `statics.moment at ${uuid}`)
  uuidReceiptOf('statics moment', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; centroid 6, equilibrium 1, friction 200, moment 200, normalforce 500, reaction 30, shear 500, truss 11; crossing to kinematics')
})
