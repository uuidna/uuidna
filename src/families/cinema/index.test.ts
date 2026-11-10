import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CinemaFormulas } from './index.js'
import '../../mcp/families.js'

test('cinema: boxoffice, roi, runtime, aspect, shots, rating, occupancy, frames — crossing to content', async (t) => {
  assert.equal(CinemaFormulas.boxoffice(1000, 12).value, 12000, 'a sold-out house at the door')
  assert.equal(CinemaFormulas.roi(300, 100).value, 300, 'triple the budget back')
  assert.equal(CinemaFormulas.runtime(40, 3).value, 120, 'a two-hour feature')
  assert.equal(CinemaFormulas.aspect(239, 100).value, 239)
  assert.equal(CinemaFormulas.shots(600, 120).value, 5, 'cuts per minute')
  assert.equal(CinemaFormulas.rating(900, 100).value, 9)
  assert.equal(CinemaFormulas.occupancy(180, 200).value, 90, 'the house is nine-tenths full')
  assert.equal(CinemaFormulas.frames(60, 24).value, 1440, 'a minute at film rate')
  assert.equal(CinemaFormulas.boxoffice(1000, 12).dst, 'content')
  assert.equal(hexFamiliesOf().get('cinema')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cinema', program: ['shots'], params: [600, 120] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `cinema.shots at ${uuid}`)
  uuidReceiptOf('cinema shots', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; boxoffice 12000, roi 300, runtime 120, aspect 239, shots 5, rating 9, occupancy 90, frames 1440; crossing to content')
})
