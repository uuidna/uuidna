import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrnithologyFormulas } from './index.js'
import '../../mcp/families.js'

test('ornithology: wingload, clutch, migration, fledging, aspect, flock, song, survival — crossing to zoology', async (t) => {
  assert.equal(OrnithologyFormulas.wingload(1200, 40).value, 30, 'body mass over wing area')
  assert.equal(OrnithologyFormulas.clutch(48, 12).value, 4, 'eggs per nest')
  assert.equal(OrnithologyFormulas.migration(8000, 40).value, 200, 'distance per day')
  assert.equal(OrnithologyFormulas.fledging(3, 4).value, 75)
  assert.equal(OrnithologyFormulas.aspect(600, 50).value, 1200, 'wing aspect ratio')
  assert.equal(OrnithologyFormulas.flock(1000, 50).value, 20, 'birds per unit area')
  assert.equal(OrnithologyFormulas.song(240, 60).value, 4, 'notes per second')
  assert.equal(OrnithologyFormulas.survival(45, 100).value, 45)
  assert.equal(OrnithologyFormulas.wingload(1200, 40).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('ornithology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ornithology', program: ['clutch'], params: [48, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `ornithology.clutch at ${uuid}`)
  uuidReceiptOf('ornithology clutch', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wingload 30, clutch 4, migration 200, fledging 75, aspect 1200, flock 20, song 4, survival 45; crossing to zoology')
})
