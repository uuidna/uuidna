import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LanduseFormulas } from './index.js'
import '../../mcp/families.js'

test('landuse: buildableratio, developable, impervious, openspaceratio, parcelcount, residentialshare, setbackarea, zoningmix — crossing to geography', async (t) => {
  assert.equal(LanduseFormulas.buildableratio(650, 1000).value, 65)
  assert.equal(LanduseFormulas.developable(1000, 300).value, 700, 'the land left to develop')
  assert.equal(LanduseFormulas.developable(100, 300).value, 0)
  assert.equal(LanduseFormulas.impervious(350, 1000).value, 35)
  assert.equal(LanduseFormulas.openspaceratio(250, 1000).value, 25)
  assert.equal(LanduseFormulas.parcelcount(10000, 500).value, 20, 'parcels in the tract')
  assert.equal(LanduseFormulas.residentialshare(600, 1000).value, 60)
  assert.equal(LanduseFormulas.setbackarea(50, 20).value, 1000)
  assert.equal(LanduseFormulas.zoningmix(1200, 4).value, 300, 'parcels per zone')
  assert.equal(LanduseFormulas.buildableratio(650, 1000).dst, 'geography')
  assert.equal(hexFamiliesOf().get('landuse')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'landuse', program: ['parcelcount'], params: [10000, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `landuse.parcelcount at ${uuid}`)
  uuidReceiptOf('landuse parcelcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; buildableratio 65, developable 700, impervious 35, openspaceratio 25, parcelcount 20, residentialshare 60, setbackarea 1000, zoningmix 300; crossing to geography')
})
