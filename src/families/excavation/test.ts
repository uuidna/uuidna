import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExcavationFormulas } from './index.js'
import '../../mcp/families.js'

test('excavation: volume, cut, fill, swell, compaction, haul, slope, bench — crossing to civil', async (t) => {
  assert.equal(ExcavationFormulas.volume(10, 5, 2).value, 100, 'a pit ten by five by two')
  assert.equal(ExcavationFormulas.cut(40, 3).value, 120)
  assert.equal(ExcavationFormulas.fill(800, 300).value, 500, 'fill still needed')
  assert.equal(ExcavationFormulas.swell(100, 25).value, 125, 'bank soil loosened')
  assert.equal(ExcavationFormulas.compaction(125, 20).value, 100, 'loose soil compacted back')
  assert.equal(ExcavationFormulas.haul(100, 12).value, 9, 'truckloads to haul')
  assert.equal(ExcavationFormulas.slope(8, 2).value, 16)
  assert.equal(ExcavationFormulas.bench(20, 6).value, 4, 'benches down the face')
  assert.equal(ExcavationFormulas.volume(10, 5, 2).dst, 'civil')
  assert.equal(hexFamiliesOf().get('excavation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'excavation', program: ['haul'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `excavation.haul at ${uuid}`)
  uuidReceiptOf('excavation haul', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 100, cut 120, fill 500, swell 125, compaction 100, haul 9, slope 16, bench 4; crossing to civil')
})
