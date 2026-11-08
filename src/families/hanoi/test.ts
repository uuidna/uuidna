import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HanoiFormulas } from './index.js'
import '../../mcp/families.js'

test('hanoi: disks, movesupperbound, pegs, recursiondepth, subtowers, moveorderings, statesubsets, transfertime — crossing to combinatorics', async (t) => {
  assert.equal(HanoiFormulas.disks(10, 0).value, 10)
  assert.equal(HanoiFormulas.movesupperbound(10).value, 1024)
  assert.equal(HanoiFormulas.pegs(3, 0).value, 3)
  assert.equal(HanoiFormulas.recursiondepth(10, 0).value, 10)
  assert.equal(HanoiFormulas.subtowers(10, 2).value, 45)
  assert.equal(HanoiFormulas.moveorderings(5).value, 120)
  assert.equal(HanoiFormulas.statesubsets(8).value, 256)
  assert.equal(HanoiFormulas.transfertime(1024, 1).value, 1024)
  assert.equal(HanoiFormulas.disks(10, 0).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('hanoi')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hanoi', program: ['disks'], params: [10, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `hanoi.disks at ${uuid}`)
  uuidReceiptOf('hanoi disks', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; disks 10, movesupperbound 1024, pegs 3, recursiondepth 10, subtowers 45, moveorderings 120, statesubsets 256, transfertime 1024; crossing to combinatorics')
})
