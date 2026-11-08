import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SyllogismFormulas } from './index.js'
import '../../mcp/families.js'

test('syllogism: moodcount, figurecount, validforms, premisepairs, termorderings, distributionchecks, conclusionpaths, soundnessratio — crossing to logic', async (t) => {
  assert.equal(SyllogismFormulas.moodcount(4, 4).value, 16)
  assert.equal(SyllogismFormulas.figurecount(4, 0).value, 4)
  assert.equal(SyllogismFormulas.validforms(256, 232).value, 24)
  assert.equal(SyllogismFormulas.premisepairs(16, 2).value, 120)
  assert.equal(SyllogismFormulas.termorderings(3).value, 6)
  assert.equal(SyllogismFormulas.distributionchecks(4).value, 16)
  assert.equal(SyllogismFormulas.conclusionpaths(4, 2).value, 12)
  assert.equal(SyllogismFormulas.soundnessratio(15, 256).value, 5)
  assert.equal(SyllogismFormulas.moodcount(4, 4).dst, 'logic')
  assert.equal(hexFamiliesOf().get('syllogism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'syllogism', program: ['moodcount'], params: [4, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `syllogism.moodcount at ${uuid}`)
  uuidReceiptOf('syllogism moodcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; moodcount 16, figurecount 4, validforms 24, premisepairs 120, termorderings 6, distributionchecks 16, conclusionpaths 12, soundnessratio 5; crossing to logic')
})
