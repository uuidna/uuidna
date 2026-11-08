import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MimeFormulas } from './index.js'
import '../../mcp/families.js'

test('mime: gestures, illusiontypes, isolationpoints, sequenceorderings, gesturepairs, tempobeats, spacegrid, claritypct — crossing to kinematics', async (t) => {
  assert.equal(MimeFormulas.gestures(12, 8).value, 20)
  assert.equal(MimeFormulas.illusiontypes(4, 3).value, 12)
  assert.equal(MimeFormulas.isolationpoints(6, 6).value, 12)
  assert.equal(MimeFormulas.sequenceorderings(4).value, 24)
  assert.equal(MimeFormulas.gesturepairs(12, 2).value, 66)
  assert.equal(MimeFormulas.tempobeats(60, 1).value, 60)
  assert.equal(MimeFormulas.spacegrid(8, 8).value, 64)
  assert.equal(MimeFormulas.claritypct(90, 100).value, 90)
  assert.equal(MimeFormulas.gestures(12, 8).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('mime')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mime', program: ['gestures'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `mime.gestures at ${uuid}`)
  uuidReceiptOf('mime gestures', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gestures 20, illusiontypes 12, isolationpoints 12, sequenceorderings 24, gesturepairs 66, tempobeats 60, spacegrid 64, claritypct 90; crossing to kinematics')
})
