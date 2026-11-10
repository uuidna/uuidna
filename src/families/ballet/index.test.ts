import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BalletFormulas } from './index.js'
import '../../mcp/families.js'

test('ballet: positions, barreexercises, turnrotations, jumpheight, sequenceorderings, portpairs, tempobpm, balancemargin — crossing to kinematics', async (t) => {
  assert.equal(BalletFormulas.positions(5, 0).value, 5)
  assert.equal(BalletFormulas.barreexercises(8, 4).value, 32)
  assert.equal(BalletFormulas.turnrotations(1440, 360).value, 4)
  assert.equal(BalletFormulas.jumpheight(100, 2).value, 50)
  assert.equal(BalletFormulas.sequenceorderings(5).value, 120)
  assert.equal(BalletFormulas.portpairs(8, 2).value, 28)
  assert.equal(BalletFormulas.tempobpm(120, 1).value, 120)
  assert.equal(BalletFormulas.balancemargin(100, 20).value, 80)
  assert.equal(BalletFormulas.positions(5, 0).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('ballet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ballet', program: ['positions'], params: [5, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `ballet.positions at ${uuid}`)
  uuidReceiptOf('ballet positions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; positions 5, barreexercises 32, turnrotations 4, jumpheight 50, sequenceorderings 120, portpairs 28, tempobpm 120, balancemargin 80; crossing to kinematics')
})
