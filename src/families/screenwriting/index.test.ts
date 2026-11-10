import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScreenwritingFormulas } from './index.js'
import '../../mcp/families.js'

test('screenwriting: acts, scenecount, pagesperminute, beatcombos, plotpaths, charactercount, dialogueratio, structuresubsets — crossing to statistics', async (t) => {
  assert.equal(ScreenwritingFormulas.acts(3, 0).value, 3)
  assert.equal(ScreenwritingFormulas.scenecount(40, 1).value, 40)
  assert.equal(ScreenwritingFormulas.pagesperminute(120, 120).value, 1)
  assert.equal(ScreenwritingFormulas.beatcombos(15, 3).value, 455)
  assert.equal(ScreenwritingFormulas.plotpaths(6, 2).value, 30)
  assert.equal(ScreenwritingFormulas.charactercount(8, 4).value, 12)
  assert.equal(ScreenwritingFormulas.dialogueratio(60, 100).value, 60)
  assert.equal(ScreenwritingFormulas.structuresubsets(5).value, 32)
  assert.equal(ScreenwritingFormulas.acts(3, 0).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('screenwriting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'screenwriting', program: ['acts'], params: [3, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `screenwriting.acts at ${uuid}`)
  uuidReceiptOf('screenwriting acts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acts 3, scenecount 40, pagesperminute 1, beatcombos 455, plotpaths 30, charactercount 12, dialogueratio 60, structuresubsets 32; crossing to statistics')
})
