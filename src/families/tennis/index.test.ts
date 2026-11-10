import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TennisFormulas } from './index.js'
import '../../mcp/families.js'

test('tennis: firstserve, acerate, breakpoints, winners, rally, dominance, servespeed, returnpct — crossing to sports', async (t) => {
  assert.equal(TennisFormulas.firstserve(60, 100).value, 60, 'first serves landed')
  assert.equal(TennisFormulas.acerate(10, 80).value, 12)
  assert.equal(TennisFormulas.breakpoints(3, 8).value, 37, 'break points converted')
  assert.equal(TennisFormulas.winners(40, 20).value, 200)
  assert.equal(TennisFormulas.rally(400, 100).value, 4, 'shots per point')
  assert.equal(TennisFormulas.dominance(6, 10).value, 60)
  assert.equal(TennisFormulas.servespeed(200).value, 200)
  assert.equal(TennisFormulas.returnpct(30, 50).value, 60)
  assert.equal(TennisFormulas.firstserve(60, 100).dst, 'sports')
  assert.equal(hexFamiliesOf().get('tennis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tennis', program: ['dominance'], params: [6, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `tennis.dominance at ${uuid}`)
  uuidReceiptOf('tennis dominance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; firstserve 60, acerate 12, breakpoints 37, winners 200, rally 4, dominance 60, servespeed 200, returnpct 60; crossing to sports')
})
