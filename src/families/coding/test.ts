import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CodingFormulas } from './index.js'
import '../../mcp/families.js'

test('coding: coderate, redundancy, hammingdistance, blocklength, errorcorrection, codingefficiency, parityanbits, overhead — crossing to signal', async (t) => {
  assert.equal(CodingFormulas.coderate(4, 7).value, 57, 'Hamming(7,4) rate')
  assert.equal(CodingFormulas.redundancy(7, 4).value, 3)
  assert.equal(CodingFormulas.hammingdistance(2).value, 5, 'distance to correct two errors')
  assert.equal(CodingFormulas.blocklength(4, 3).value, 7, 'the seven-bit block')
  assert.equal(CodingFormulas.errorcorrection(5).value, 2, 'two errors from distance five')
  assert.equal(CodingFormulas.codingefficiency(512, 1024).value, 50)
  assert.equal(CodingFormulas.parityanbits(3).value, 1, 'odd ones, parity set')
  assert.equal(CodingFormulas.parityanbits(4).value, 0)
  assert.equal(CodingFormulas.overhead(3, 4).value, 75)
  assert.equal(CodingFormulas.coderate(4, 7).dst, 'signal')
  assert.equal(hexFamiliesOf().get('coding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'coding', program: ['blocklength'], params: [4, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7, `coding.blocklength at ${uuid}`)
  uuidReceiptOf('coding blocklength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coderate 57, redundancy 3, hammingdistance 5, blocklength 7, errorcorrection 2, codingefficiency 50, parityanbits 1, overhead 75; crossing to signal')
})
