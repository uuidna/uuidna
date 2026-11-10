import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SikhismFormulas } from './index.js'
import '../../mcp/families.js'

test('sikhism: gurus, scripturepages, pillars, prayerorderings, articlesoffaith, hymncombos, communitymeals, devotionratio — crossing to anthropology', async (t) => {
  assert.equal(SikhismFormulas.gurus(10, 0).value, 10)
  assert.equal(SikhismFormulas.scripturepages(1430, 1).value, 1430)
  assert.equal(SikhismFormulas.pillars(3, 0).value, 3)
  assert.equal(SikhismFormulas.prayerorderings(5).value, 120)
  assert.equal(SikhismFormulas.articlesoffaith(5, 0).value, 5)
  assert.equal(SikhismFormulas.hymncombos(12, 3).value, 220)
  assert.equal(SikhismFormulas.communitymeals(100, 7).value, 700)
  assert.equal(SikhismFormulas.devotionratio(90, 100).value, 90)
  assert.equal(SikhismFormulas.gurus(10, 0).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('sikhism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sikhism', program: ['gurus'], params: [10, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `sikhism.gurus at ${uuid}`)
  uuidReceiptOf('sikhism gurus', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gurus 10, scripturepages 1430, pillars 3, prayerorderings 120, articlesoffaith 5, hymncombos 220, communitymeals 700, devotionratio 90; crossing to anthropology')
})
