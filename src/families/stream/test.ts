import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StreamFormulas } from './index.js'

/** stream: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('stream: chunks, buffers, throughput, windows, backpressure, segments, pipes, combos', async (t) => {
  assert.equal(StreamFormulas.chunks(100000, 4096).value, 25, 'chunks(100000, 4096)')
  assert.equal(StreamFormulas.buffers(8, 4096).value, 32768, 'buffers(8, 4096)')
  assert.equal(StreamFormulas.throughput(1000000, 1000).value, 1000, 'throughput(1000000, 1000)')
  assert.equal(StreamFormulas.windows(64, 1024).value, 65536, 'windows(64, 1024)')
  assert.equal(StreamFormulas.backpressure(80, 100).value, 80, 'backpressure(80, 100)')
  assert.equal(StreamFormulas.segments(10000, 188).value, 53, 'segments(10000, 188)')
  assert.equal(StreamFormulas.pipes(3, 0).value, 3, 'pipes(3, 0)')
  assert.equal(StreamFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('stream')?.length, 8)
  for (const [name, params, expected] of [["buffers",[8,4096],32768],["windows",[64,1024],65536],["backpressure",[80,100],80]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'stream', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `stream.${name} at ${uuid}`)
    uuidReceiptOf(`stream ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "buffers=32768, windows=65536, backpressure=80")
})
