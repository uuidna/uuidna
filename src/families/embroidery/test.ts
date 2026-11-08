import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmbroideryFormulas } from './index.js'
import '../../mcp/families.js'

test('embroidery: stitchcount, threadcolors, stitchtypes, patternpairs, densitypersqcm, motifsubsets, stitchorderings, coverage — crossing to geometry', async (t) => {
  assert.equal(EmbroideryFormulas.stitchcount(1000, 5).value, 5000)
  assert.equal(EmbroideryFormulas.threadcolors(12, 6).value, 18)
  assert.equal(EmbroideryFormulas.stitchtypes(8, 0).value, 8)
  assert.equal(EmbroideryFormulas.patternpairs(10, 2).value, 45)
  assert.equal(EmbroideryFormulas.densitypersqcm(5000, 100).value, 50)
  assert.equal(EmbroideryFormulas.motifsubsets(5).value, 32)
  assert.equal(EmbroideryFormulas.stitchorderings(4).value, 24)
  assert.equal(EmbroideryFormulas.coverage(85, 100).value, 85)
  assert.equal(EmbroideryFormulas.stitchcount(1000, 5).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('embroidery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'embroidery', program: ['stitchcount'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `embroidery.stitchcount at ${uuid}`)
  uuidReceiptOf('embroidery stitchcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stitchcount 5000, threadcolors 18, stitchtypes 8, patternpairs 45, densitypersqcm 50, motifsubsets 32, stitchorderings 24, coverage 85; crossing to geometry')
})
