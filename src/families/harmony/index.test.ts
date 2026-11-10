import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HarmonyFormulas } from './index.js'
import '../../mcp/families.js'

test('harmony: interval, chordquality, consonance, keysignature, voiceleading, tension, inversion, cadence — crossing to music', async (t) => {
  assert.equal(HarmonyFormulas.interval(60, 67).value, 7, 'a perfect fifth')
  assert.equal(HarmonyFormulas.chordquality(4, 7).value, 3, 'a minor third over the major third: a major triad')
  assert.equal(HarmonyFormulas.consonance(7).value, 1, 'the fifth is a perfect consonance')
  assert.equal(HarmonyFormulas.consonance(6).value, 0, 'the tritone is not')
  assert.equal(HarmonyFormulas.keysignature(7).value, 1, 'G major: one sharp')
  assert.equal(HarmonyFormulas.voiceleading(60, 67).value, 5, 'a fifth down is five semitones')
  assert.equal(HarmonyFormulas.tension(3, 4).value, 75)
  assert.equal(HarmonyFormulas.inversion(4, 0).value, 8)
  assert.equal(HarmonyFormulas.cadence(7, 0).value, 1, 'V → I rises a fourth')
  assert.equal(HarmonyFormulas.cadence(0, 7).value, 0)
  assert.equal(HarmonyFormulas.interval(60, 67).dst, 'music')
  assert.equal(hexFamiliesOf().get('harmony')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'harmony', program: ['interval'], params: [60, 67] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7, `harmony.interval at ${uuid}`)
  uuidReceiptOf('harmony interval', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; interval 7, chordquality 3, consonance 1, keysignature 1, voiceleading 5, tension 75, inversion 8, cadence 1; crossing to music')
})
