import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MixingFormulas } from './index.js'
import '../../mcp/families.js'

test('mixing: gain, headroom, pan, compression, ratio, loudness, crossfade, bus — crossing to acoustics', async (t) => {
  assert.equal(MixingFormulas.gain(100, 3).value, 300, 'a level scaled threefold')
  assert.equal(MixingFormulas.headroom(24, 18).value, 6)
  assert.equal(MixingFormulas.headroom(18, 24).value, 0, 'no headroom when the peak clears the ceiling')
  assert.equal(MixingFormulas.pan(25, 75).value, 25, 'a quarter of the signal left')
  assert.equal(MixingFormulas.compression(100, 40, 4).value, 55, 'what sits over the threshold, folded 4:1')
  assert.equal(MixingFormulas.compression(30, 40, 4).value, 30, 'below the threshold, untouched')
  assert.equal(MixingFormulas.ratio(100, 25).value, 4)
  assert.equal(MixingFormulas.loudness(600, 8).value, 75)
  assert.equal(MixingFormulas.crossfade(100, 200, 25).value, 125, 'a quarter of the way to the second source')
  assert.equal(MixingFormulas.bus(8, 125).value, 1000)
  assert.equal(MixingFormulas.gain(100, 3).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('mixing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mixing', program: ['ratio'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `mixing.ratio at ${uuid}`)
  uuidReceiptOf('mixing ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gain 300, headroom 6, pan 25, compression 55, ratio 4, loudness 75, crossfade 125, bus 1000; crossing to acoustics')
})
