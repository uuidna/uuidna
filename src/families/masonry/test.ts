import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MasonryFormulas } from './index.js'
import '../../mcp/families.js'

test('masonry: bricks, mortar, courses, bond, wall, joint, coverage, waste — crossing to construction', async (t) => {
  assert.equal(MasonryFormulas.bricks(10, 60).value, 600, 'bricks for ten square metres')
  assert.equal(MasonryFormulas.mortar(600, 2).value, 1200)
  assert.equal(MasonryFormulas.courses(1000, 75).value, 13, 'courses up a metre')
  assert.equal(MasonryFormulas.bond(1000, 250).value, 4, 'bricks along a course')
  assert.equal(MasonryFormulas.wall(5, 3).value, 15)
  assert.equal(MasonryFormulas.joint(13, 10).value, 130)
  assert.equal(MasonryFormulas.coverage(600, 60).value, 10)
  assert.equal(MasonryFormulas.waste(600, 5).value, 30, 'five percent over')
  assert.equal(MasonryFormulas.bricks(10, 60).dst, 'construction')
  assert.equal(hexFamiliesOf().get('masonry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'masonry', program: ['courses'], params: [1000, 75] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `masonry.courses at ${uuid}`)
  uuidReceiptOf('masonry courses', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bricks 600, mortar 1200, courses 13, bond 4, wall 15, joint 130, coverage 10, waste 30; crossing to construction')
})
