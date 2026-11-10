import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ZoroastrianismFormulas } from './index.js'
import '../../mcp/families.js'

test('zoroastrianism: principles, amesha, dualitypairs, hymncount, fireranks, prayerorderings, gathasubsets, cosmiccycles — crossing to philosophy', async (t) => {
  assert.equal(ZoroastrianismFormulas.principles(3, 0).value, 3)
  assert.equal(ZoroastrianismFormulas.amesha(7, 0).value, 7)
  assert.equal(ZoroastrianismFormulas.dualitypairs(2, 2).value, 1)
  assert.equal(ZoroastrianismFormulas.hymncount(17, 1).value, 17)
  assert.equal(ZoroastrianismFormulas.fireranks(3, 0).value, 3)
  assert.equal(ZoroastrianismFormulas.prayerorderings(5).value, 120)
  assert.equal(ZoroastrianismFormulas.gathasubsets(5).value, 32)
  assert.equal(ZoroastrianismFormulas.cosmiccycles(3, 1000).value, 3000)
  assert.equal(ZoroastrianismFormulas.principles(3, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('zoroastrianism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'zoroastrianism', program: ['principles'], params: [3, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `zoroastrianism.principles at ${uuid}`)
  uuidReceiptOf('zoroastrianism principles', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; principles 3, amesha 7, dualitypairs 1, hymncount 17, fireranks 3, prayerorderings 120, gathasubsets 32, cosmiccycles 3000; crossing to philosophy')
})
