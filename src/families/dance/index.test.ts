import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DanceFormulas } from './index.js'
import '../../mcp/families.js'

test('dance: tempo, counts, synchrony, steps, phrase, elevation, rotation, stamina — crossing to music', async (t) => {
  assert.equal(DanceFormulas.tempo(480, 4).value, 120, 'beats per minute')
  assert.equal(DanceFormulas.counts(8, 8).value, 64)
  assert.equal(DanceFormulas.synchrony(9, 10).value, 90)
  assert.equal(DanceFormulas.steps(5, 4).value, 20)
  assert.equal(DanceFormulas.phrase(64, 8).value, 8)
  assert.equal(DanceFormulas.elevation(120, 4).value, 30)
  assert.equal(DanceFormulas.rotation(450).value, 90)
  assert.equal(DanceFormulas.rotation(-90).value, 270)
  assert.equal(DanceFormulas.stamina(300, 60).value, 500)
  assert.equal(DanceFormulas.tempo(480, 4).dst, 'music')
  assert.equal(hexFamiliesOf().get('dance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dance', program: ['counts'], params: [8, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `dance.counts at ${uuid}`)
  uuidReceiptOf('dance counts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tempo 120, counts 64, synchrony 90, steps 20, phrase 8, elevation 30, rotation 90, stamina 500; crossing to music')
})
