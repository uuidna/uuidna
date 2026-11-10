import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BackgammonFormulas } from './index.js'
import '../../mcp/families.js'

test('backgammon: points, dicecombos, pipcount, doublescube, checkers, rolloutcomes, bearoffperms, winprob — crossing to probability', async (t) => {
  assert.equal(BackgammonFormulas.points(24, 0).value, 24)
  assert.equal(BackgammonFormulas.dicecombos(6, 2).value, 15)
  assert.equal(BackgammonFormulas.pipcount(167, 1).value, 167)
  assert.equal(BackgammonFormulas.doublescube(6).value, 64)
  assert.equal(BackgammonFormulas.checkers(15, 0).value, 15)
  assert.equal(BackgammonFormulas.rolloutcomes(6, 6).value, 36)
  assert.equal(BackgammonFormulas.bearoffperms(6).value, 720)
  assert.equal(BackgammonFormulas.winprob(50, 100).value, 50)
  assert.equal(BackgammonFormulas.points(24, 0).dst, 'probability')
  assert.equal(hexFamiliesOf().get('backgammon')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'backgammon', program: ['points'], params: [24, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `backgammon.points at ${uuid}`)
  uuidReceiptOf('backgammon points', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; points 24, dicecombos 15, pipcount 167, doublescube 64, checkers 15, rolloutcomes 36, bearoffperms 720, winprob 50; crossing to probability')
})
