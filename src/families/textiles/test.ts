import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TextilesFormulas } from './index.js'
import '../../mcp/families.js'

test('textiles: threadcount, gsm, tensile, elongation, yarn, shrinkage, coverage, drape — crossing to materials', async (t) => {
  assert.equal(TextilesFormulas.threadcount(80, 60).value, 140, 'warp plus weft per inch')
  assert.equal(TextilesFormulas.gsm(500, 2).value, 250)
  assert.equal(TextilesFormulas.tensile(1000, 50).value, 20)
  assert.equal(TextilesFormulas.elongation(120, 100).value, 20, 'stretched a fifth past original')
  assert.equal(TextilesFormulas.yarn(1000, 10).value, 100, 'yarn count proxy')
  assert.equal(TextilesFormulas.shrinkage(100, 95).value, 5)
  assert.equal(TextilesFormulas.coverage(90, 10).value, 90)
  assert.equal(TextilesFormulas.drape(50, 100).value, 50)
  assert.equal(TextilesFormulas.threadcount(80, 60).dst, 'materials')
  assert.equal(hexFamiliesOf().get('textiles')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'textiles', program: ['threadcount'], params: [80, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 140, `textiles.threadcount at ${uuid}`)
  uuidReceiptOf('textiles threadcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; threadcount 140, gsm 250, tensile 20, elongation 20, yarn 100, shrinkage 5, coverage 90, drape 50; crossing to materials')
})
