import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InterleavingFormulas } from './index.js'
import '../../mcp/families.js'

test('interleaving: depth, span, blocksize, delay, burstprotection, matrixcells, spreadfactor, latency — crossing to signal', async (t) => {
  assert.equal(InterleavingFormulas.depth(4, 8).value, 32, 'four streams at stride eight')
  assert.equal(InterleavingFormulas.span(32, 10).value, 320)
  assert.equal(InterleavingFormulas.blocksize(1000, 8).value, 125, 'symbols per block')
  assert.equal(InterleavingFormulas.delay(100, 4).value, 25)
  assert.equal(InterleavingFormulas.burstprotection(50, 10).value, 40, 'burst length survived')
  assert.equal(InterleavingFormulas.matrixcells(16, 16).value, 256)
  assert.equal(InterleavingFormulas.spreadfactor(240, 8).value, 30)
  assert.equal(InterleavingFormulas.latency(32, 5).value, 160)
  assert.equal(InterleavingFormulas.depth(4, 8).dst, 'signal')
  assert.equal(hexFamiliesOf().get('interleaving')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'interleaving', program: ['depth'], params: [4, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `interleaving.depth at ${uuid}`)
  uuidReceiptOf('interleaving depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 32, span 320, blocksize 125, delay 25, burstprotection 40, matrixcells 256, spreadfactor 30, latency 160; crossing to signal')
})
