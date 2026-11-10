import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TheatreFormulas } from './index.js'
import '../../mcp/families.js'

test('theatre: acts, scenecombos, castsize, cueorderings, runtime, blockingpaths, setsubsets, attendanceratio — crossing to statistics', async (t) => {
  assert.equal(TheatreFormulas.acts(3, 2).value, 5)
  assert.equal(TheatreFormulas.scenecombos(12, 2).value, 66)
  assert.equal(TheatreFormulas.castsize(12, 2).value, 24)
  assert.equal(TheatreFormulas.cueorderings(5).value, 120)
  assert.equal(TheatreFormulas.runtime(120, 1).value, 120)
  assert.equal(TheatreFormulas.blockingpaths(6, 2).value, 30)
  assert.equal(TheatreFormulas.setsubsets(5).value, 32)
  assert.equal(TheatreFormulas.attendanceratio(85, 100).value, 85)
  assert.equal(TheatreFormulas.acts(3, 2).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('theatre')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'theatre', program: ['acts'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `theatre.acts at ${uuid}`)
  uuidReceiptOf('theatre acts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acts 5, scenecombos 66, castsize 24, cueorderings 120, runtime 120, blockingpaths 30, setsubsets 32, attendanceratio 85; crossing to statistics')
})
