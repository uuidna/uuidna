import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChecksumFormulas } from './index.js'
import '../../mcp/families.js'

test('checksum: modular, onescomplement, crcbits, fletcher, xorsum, detectionrate, overhead, blocksremainder — crossing to networking', async (t) => {
  assert.equal(ChecksumFormulas.modular(1000, 256).value, 232, 'byte sum folded mod 256')
  assert.equal(ChecksumFormulas.onescomplement(300, 256).value, 211)
  assert.equal(ChecksumFormulas.crcbits(1000, 32).value, 1032, 'data plus CRC-32 check bits')
  assert.equal(ChecksumFormulas.fletcher(10, 20).value, 5130)
  assert.equal(ChecksumFormulas.xorsum(12, 10).value, 6, 'longitudinal parity')
  assert.equal(ChecksumFormulas.detectionrate(99, 100).value, 99)
  assert.equal(ChecksumFormulas.overhead(32, 1000).value, 3)
  assert.equal(ChecksumFormulas.blocksremainder(1000, 64).value, 40, 'bytes in the last block')
  assert.equal(ChecksumFormulas.modular(1000, 256).dst, 'networking')
  assert.equal(hexFamiliesOf().get('checksum')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'checksum', program: ['modular'], params: [1000, 256] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 232, `checksum.modular at ${uuid}`)
  uuidReceiptOf('checksum modular', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; modular 232, onescomplement 211, crcbits 1032, fletcher 5130, xorsum 6, detectionrate 99, overhead 3, blocksremainder 40; crossing to networking')
})
