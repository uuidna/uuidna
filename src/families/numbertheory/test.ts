import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NumbertheoryFormulas } from './index.js'
import '../../mcp/families.js'

test('numbertheory: gcd, lcm, totient, divisorcount, isprime, modpow, digitsum, factorialmod — crossing to algebra', async (t) => {
  assert.equal(NumbertheoryFormulas.gcd(48, 36).value, 12, 'Euclid')
  assert.equal(NumbertheoryFormulas.lcm(4, 6).value, 12)
  assert.equal(NumbertheoryFormulas.totient(9).value, 6, "Euler's totient")
  assert.equal(NumbertheoryFormulas.divisorcount(16).value, 5)
  assert.equal(NumbertheoryFormulas.isprime(17).value, 1, 'prime')
  assert.equal(NumbertheoryFormulas.isprime(18).value, 0)
  assert.equal(NumbertheoryFormulas.modpow(2, 10, 1000).value, 24, 'repeated squaring')
  assert.equal(NumbertheoryFormulas.digitsum(12345).value, 15)
  assert.equal(NumbertheoryFormulas.factorialmod(5, 1000).value, 120)
  assert.equal(NumbertheoryFormulas.gcd(48, 36).dst, 'algebra')
  assert.equal(hexFamiliesOf().get('numbertheory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'numbertheory', program: ['gcd'], params: [48, 36] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `numbertheory.gcd at ${uuid}`)
  uuidReceiptOf('numbertheory gcd', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gcd 12, lcm 12, totient 6, divisorcount 5, isprime 1, modpow 24, digitsum 15, factorialmod 120; crossing to algebra')
})
