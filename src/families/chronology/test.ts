import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChronologyFormulas } from './index.js'
import '../../mcp/families.js'

test('chronology: yearspan, eventorderings, periodcount, overlapwindows, datingerror, sequencechoices, epochdivisions, synchronisms — crossing to archaeology', async (t) => {
  assert.equal(ChronologyFormulas.yearspan(1500, 500).value, 1000)
  assert.equal(ChronologyFormulas.eventorderings(6).value, 720)
  assert.equal(ChronologyFormulas.periodcount(3, 4).value, 7)
  assert.equal(ChronologyFormulas.overlapwindows(10, 2).value, 45)
  assert.equal(ChronologyFormulas.datingerror(5, 100).value, 5)
  assert.equal(ChronologyFormulas.sequencechoices(8, 3).value, 336)
  assert.equal(ChronologyFormulas.epochdivisions(3000, 500).value, 6)
  assert.equal(ChronologyFormulas.synchronisms(12, 5).value, 60)
  assert.equal(ChronologyFormulas.yearspan(1500, 500).dst, 'archaeology')
  assert.equal(hexFamiliesOf().get('chronology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chronology', program: ['yearspan'], params: [1500, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `chronology.yearspan at ${uuid}`)
  uuidReceiptOf('chronology yearspan', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; yearspan 1000, eventorderings 720, periodcount 7, overlapwindows 45, datingerror 5, sequencechoices 336, epochdivisions 6, synchronisms 60; crossing to archaeology')
})
