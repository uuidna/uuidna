import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ParityFormulas } from './index.js'
import '../../mcp/families.js'

test('parity: evenbit, checkbits, syndrome, hammingbits, coveragebits, detectrate, overhead, correctable — crossing to signal', async (t) => {
  assert.equal(ParityFormulas.evenbit(7).value, 1, 'odd ones -> parity 1')
  assert.equal(ParityFormulas.evenbit(6).value, 0)
  assert.equal(ParityFormulas.checkbits(64, 8).value, 8, 'one parity bit per block')
  assert.equal(ParityFormulas.syndrome(13, 8).value, 5)
  assert.equal(ParityFormulas.hammingbits(4).value, 3, 'parity bits for a nibble')
  assert.equal(ParityFormulas.coveragebits(4, 3).value, 7)
  assert.equal(ParityFormulas.detectrate(990, 1000).value, 99)
  assert.equal(ParityFormulas.overhead(3, 4).value, 75)
  assert.equal(ParityFormulas.correctable(3).value, 1, 'distance 3 corrects one error')
  assert.equal(ParityFormulas.evenbit(7).dst, 'signal')
  assert.equal(hexFamiliesOf().get('parity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'parity', program: ['checkbits'], params: [64, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `parity.checkbits at ${uuid}`)
  uuidReceiptOf('parity checkbits', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; evenbit 1, checkbits 8, syndrome 5, hammingbits 3, coveragebits 7, detectrate 99, overhead 75, correctable 1; crossing to signal')
})
