import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CryptanalysisFormulas } from './index.js'
import '../../mcp/families.js'

test('cryptanalysis: keyspace, bruteforce, entropy, frequency, coincidence, avalanche, collisions, strength — crossing to code', async (t) => {
  assert.equal(CryptanalysisFormulas.keyspace(26, 8).value, 208, 'alphabet over a length')
  assert.equal(CryptanalysisFormulas.bruteforce(1000, 10).value, 100, 'the keyspace at a guess rate')
  assert.equal(CryptanalysisFormulas.entropy(100, 4).value, 25)
  assert.equal(CryptanalysisFormulas.frequency(25, 100).value, 25)
  assert.equal(CryptanalysisFormulas.coincidence(5, 100).value, 500, 'index of coincidence x10000')
  assert.equal(CryptanalysisFormulas.avalanche(50, 100).value, 50)
  assert.equal(CryptanalysisFormulas.collisions(2, 1000).value, 2000)
  assert.equal(CryptanalysisFormulas.strength(128).value, 128, '128 bits stand')
  assert.equal(CryptanalysisFormulas.keyspace(26, 8).dst, 'code')
  assert.equal(hexFamiliesOf().get('cryptanalysis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cryptanalysis', program: ['bruteforce'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `cryptanalysis.bruteforce at ${uuid}`)
  uuidReceiptOf('cryptanalysis bruteforce', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; keyspace 208, bruteforce 100, entropy 25, frequency 25, coincidence 500, avalanche 50, collisions 2000, strength 128; crossing to code')
})
