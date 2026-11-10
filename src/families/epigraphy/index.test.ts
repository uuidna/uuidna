import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EpigraphyFormulas } from './index.js'
import '../../mcp/families.js'

test('epigraphy: characters, lineorderings, restorationpairs, damageratio, scriptsubsets, datingrange, wordcount, lacunae — crossing to archaeology', async (t) => {
  assert.equal(EpigraphyFormulas.characters(20, 30).value, 600)
  assert.equal(EpigraphyFormulas.lineorderings(5).value, 120)
  assert.equal(EpigraphyFormulas.restorationpairs(10, 2).value, 45)
  assert.equal(EpigraphyFormulas.damageratio(15, 100).value, 15)
  assert.equal(EpigraphyFormulas.scriptsubsets(5).value, 32)
  assert.equal(EpigraphyFormulas.datingrange(500, 200).value, 300)
  assert.equal(EpigraphyFormulas.wordcount(600, 5).value, 120)
  assert.equal(EpigraphyFormulas.lacunae(12, 8).value, 20)
  assert.equal(EpigraphyFormulas.characters(20, 30).dst, 'archaeology')
  assert.equal(hexFamiliesOf().get('epigraphy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'epigraphy', program: ['characters'], params: [20, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `epigraphy.characters at ${uuid}`)
  uuidReceiptOf('epigraphy characters', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; characters 600, lineorderings 120, restorationpairs 45, damageratio 15, scriptsubsets 32, datingrange 300, wordcount 120, lacunae 20; crossing to archaeology')
})
