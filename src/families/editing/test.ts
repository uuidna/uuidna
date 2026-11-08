import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EditingFormulas } from './index.js'
import '../../mcp/families.js'

test('editing: cuts, pacing, timeline, ripple, transition, runtime, coverage, assembly — crossing to media', async (t) => {
  assert.equal(EditingFormulas.cuts(50).value, 49, 'cuts join a run of clips')
  assert.equal(EditingFormulas.pacing(120, 4).value, 30, 'cuts per minute')
  assert.equal(EditingFormulas.timeline(40, 150).value, 6000)
  assert.equal(EditingFormulas.ripple(10, 60).value, 50, 'clips shifted by the ripple delete')
  assert.equal(EditingFormulas.transition(10, 24).value, 216)
  assert.equal(EditingFormulas.runtime(6000, 24).value, 250, 'seconds at the frame rate')
  assert.equal(EditingFormulas.coverage(8, 5).value, 40)
  assert.equal(EditingFormulas.assembly(24, 90).value, 2160)
  assert.equal(EditingFormulas.cuts(1).value, 0, 'a single clip needs no cut')
  assert.equal(EditingFormulas.cuts(50).dst, 'media')
  assert.equal(hexFamiliesOf().get('editing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'editing', program: ['timeline'], params: [40, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `editing.timeline at ${uuid}`)
  uuidReceiptOf('editing timeline', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cuts 49, pacing 30, timeline 6000, ripple 50, transition 216, runtime 250, coverage 40, assembly 2160; crossing to media')
})
