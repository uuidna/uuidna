import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RubikFormulas } from './index.js'
import '../../mcp/families.js'

test('rubik: faces, stickers, cornerperms, edgepairs, movesubsets, godsnumber, cubies, solvedratio — crossing to combinatorics', async (t) => {
  assert.equal(RubikFormulas.faces(6, 0).value, 6)
  assert.equal(RubikFormulas.stickers(6, 9).value, 54)
  assert.equal(RubikFormulas.cornerperms(8).value, 40320)
  assert.equal(RubikFormulas.edgepairs(12, 2).value, 66)
  assert.equal(RubikFormulas.movesubsets(6).value, 64)
  assert.equal(RubikFormulas.godsnumber(20, 0).value, 20)
  assert.equal(RubikFormulas.cubies(26, 0).value, 26)
  assert.equal(RubikFormulas.solvedratio(100, 100).value, 100)
  assert.equal(RubikFormulas.faces(6, 0).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('rubik')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rubik', program: ['faces'], params: [6, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6, `rubik.faces at ${uuid}`)
  uuidReceiptOf('rubik faces', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; faces 6, stickers 54, cornerperms 40320, edgepairs 66, movesubsets 64, godsnumber 20, cubies 26, solvedratio 100; crossing to combinatorics')
})
