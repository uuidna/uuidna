import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShorthandFormulas } from './index.js'
import '../../mcp/families.js'

test('shorthand: strokesperword, compression, symbolcount, speedwpm, abbreviationsubsets, strokesaved, outlinepairs, legibilityratio — crossing to signal', async (t) => {
  assert.equal(ShorthandFormulas.strokesperword(20, 4).value, 5)
  assert.equal(ShorthandFormulas.compression(800, 200).value, 400)
  assert.equal(ShorthandFormulas.symbolcount(26, 2).value, 52)
  assert.equal(ShorthandFormulas.speedwpm(120, 1).value, 120)
  assert.equal(ShorthandFormulas.abbreviationsubsets(6).value, 64)
  assert.equal(ShorthandFormulas.strokesaved(20, 5).value, 15)
  assert.equal(ShorthandFormulas.outlinepairs(12, 2).value, 66)
  assert.equal(ShorthandFormulas.legibilityratio(85, 100).value, 85)
  assert.equal(ShorthandFormulas.strokesperword(20, 4).dst, 'signal')
  assert.equal(hexFamiliesOf().get('shorthand')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'shorthand', program: ['strokesperword'], params: [20, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `shorthand.strokesperword at ${uuid}`)
  uuidReceiptOf('shorthand strokesperword', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; strokesperword 5, compression 400, symbolcount 52, speedwpm 120, abbreviationsubsets 64, strokesaved 15, outlinepairs 66, legibilityratio 85; crossing to signal')
})
