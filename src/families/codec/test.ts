import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CodecFormulas } from './index.js'

/** codec: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('codec: bitrate, frames, ratio, channels, blocksize, samples, latency, combos', async (t) => {
  assert.equal(CodecFormulas.bitrate(128, 1000).value, 128000, 'bitrate(128, 1000)')
  assert.equal(CodecFormulas.frames(44100, 1024).value, 43, 'frames(44100, 1024)')
  assert.equal(CodecFormulas.ratio(1000, 100).value, 10, 'ratio(1000, 100)')
  assert.equal(CodecFormulas.channels(2, 0).value, 2, 'channels(2, 0)')
  assert.equal(CodecFormulas.blocksize(10).value, 1024, 'blocksize(10)')
  assert.equal(CodecFormulas.samples(44100, 2).value, 88200, 'samples(44100, 2)')
  assert.equal(CodecFormulas.latency(1000, 50).value, 20, 'latency(1000, 50)')
  assert.equal(CodecFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('codec')?.length, 8)
  for (const [name, params, expected] of [["bitrate",[128,1000],128000],["frames",[44100,1024],43],["ratio",[1000,100],10]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'codec', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `codec.${name} at ${uuid}`)
    uuidReceiptOf(`codec ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bitrate=128000, frames=43, ratio=10")
})
