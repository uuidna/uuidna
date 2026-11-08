import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PacingFormulas } from './index.js'
import '../../mcp/families.js'

test('pacing: pace, speed, spliteven, negativesplit, targettime, lapaverage, effortzone, fade — crossing to sports', async (t) => {
  assert.equal(PacingFormulas.pace(3600, 12).value, 300)
  assert.equal(PacingFormulas.speed(12000, 120).value, 100)
  assert.equal(PacingFormulas.spliteven(2400, 8).value, 300)
  assert.equal(PacingFormulas.negativesplit(310, 300).value, 10)
  assert.equal(PacingFormulas.targettime(300, 8).value, 2400)
  assert.equal(PacingFormulas.lapaverage(2400, 8).value, 300)
  assert.equal(PacingFormulas.effortzone(150, 200).value, 75)
  assert.equal(PacingFormulas.fade(320, 300).value, 20)
  assert.equal(PacingFormulas.pace(3600, 12).dst, 'sports')
  assert.equal(hexFamiliesOf().get('pacing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pacing', program: ['pace'], params: [3600, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `pacing.pace at ${uuid}`)
  uuidReceiptOf('pacing pace', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pace 300, speed 100, spliteven 300, negativesplit 10, targettime 2400, lapaverage 300, effortzone 75, fade 20; crossing to sports')
})
