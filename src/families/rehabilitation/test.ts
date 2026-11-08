import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RehabilitationFormulas } from './index.js'
import '../../mcp/families.js'

test('rehabilitation: rangeofmotion, progress, strength, recovery, adherence, loadprogression, painscale, sessions — crossing to physiology', async (t) => {
  assert.equal(RehabilitationFormulas.rangeofmotion(90, 120).value, 75, 'three quarters of normal range')
  assert.equal(RehabilitationFormulas.progress(20, 50, 100).value, 37)
  assert.equal(RehabilitationFormulas.strength(10, 50).value, 500, 'volume load lifted')
  assert.equal(RehabilitationFormulas.recovery(3, 10).value, 70)
  assert.equal(RehabilitationFormulas.adherence(18, 20).value, 90, 'plan kept')
  assert.equal(RehabilitationFormulas.loadprogression(100, 10).value, 110, 'progressive overload')
  assert.equal(RehabilitationFormulas.painscale(8, 3).value, 5)
  assert.equal(RehabilitationFormulas.sessions(6, 3).value, 18, 'sessions over the course')
  assert.equal(RehabilitationFormulas.painscale(3, 8).value, 0)
  assert.equal(RehabilitationFormulas.rangeofmotion(90, 120).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('rehabilitation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rehabilitation', program: ['rangeofmotion'], params: [90, 120] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `rehabilitation.rangeofmotion at ${uuid}`)
  uuidReceiptOf('rehabilitation rangeofmotion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rangeofmotion 75, progress 37, strength 500, recovery 70, adherence 90, loadprogression 110, painscale 5, sessions 18; crossing to physiology')
})
