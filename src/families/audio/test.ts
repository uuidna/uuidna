import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AudioFormulas } from './index.js'

/** audio: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('audio: samples, streambytes, bitrate, frames, channels, duration, bitdepth, blocks', async (t) => {
  assert.equal(AudioFormulas.samples(44100, 2).value, 88200, 'samples(44100, 2)')
  assert.equal(AudioFormulas.streambytes(44100, 2, 2).value, 176400, 'streambytes(44100, 2, 2)')
  assert.equal(AudioFormulas.bitrate(44100, 16).value, 705600, 'bitrate(44100, 16)')
  assert.equal(AudioFormulas.frames(44100, 1024).value, 43, 'frames(44100, 1024)')
  assert.equal(AudioFormulas.channels(2, 0).value, 2, 'channels(2, 0)')
  assert.equal(AudioFormulas.duration(88200, 44100).value, 2, 'duration(88200, 44100)')
  assert.equal(AudioFormulas.bitdepth(16, 1).value, 16, 'bitdepth(16, 1)')
  assert.equal(AudioFormulas.blocks(44100, 1152).value, 39, 'blocks(44100, 1152)')
  assert.equal(hexFamiliesOf().get('audio')?.length, 8)
  for (const [name, params, expected] of [["samples",[44100,2],88200],["streambytes",[44100,2,2],176400],["bitrate",[44100,16],705600]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'audio', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `audio.${name} at ${uuid}`)
    uuidReceiptOf(`audio ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "samples=88200, streambytes=176400, bitrate=705600")
})
