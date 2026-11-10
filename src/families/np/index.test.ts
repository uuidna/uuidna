import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { NpFormulas } from './index.js'
import '../../mcp/families.js'

/** CERTIFICATES AND WIDTHS, EXACT. A Subset Sum certificate is checked in one pass; an adjacency bit read in logspace;
 *  the inductive-counting time is n^5 and its space the bits of n (NL = co-NL); a Shor work register is bits(N) + 2
 *  qubits; and 4 ≡ 1 mod 3 makes every even reach width divisible by 3 — the gcd step, always 0. Each crosses np into
 *  the domain its proof names (np, path, enterprise, qsec, quantum). */
test('np: the certificates and widths complexity states, exact', async (t) => {
  assert.equal(NpFormulas.subsetSum(291, 5).value, 4, '0x123, mask 101: digits 3 and 1 selected')
  assert.equal(NpFormulas.subsetSum(291, 0).value, 0, 'the empty selection sums to nothing')
  assert.equal(NpFormulas.edgeBit(5, 0).value, 1, 'A = 101₂: edge at bit 0 present')
  assert.equal(NpFormulas.edgeBit(5, 1).value, 0, 'edge at bit 1 absent')
  assert.equal(NpFormulas.isTime(2).value, 32, 'time = n^5')
  assert.equal(NpFormulas.isTime(3).value, 243)
  assert.equal(NpFormulas.isSpace(255).value, 8, 'space = bits(n)')
  assert.equal(NpFormulas.isSpace(256).value, 9)
  assert.equal(NpFormulas.isSpace(0).holds, false, 'space is read for a positive n')
  assert.equal(NpFormulas.sparseWidth(91).value, 9, 'bits(91) + 2 = the 9 qubits Shor factors 91 with')
  assert.equal(NpFormulas.sparseWidth(15).value, 6, 'bits(15) + 2')
  assert.equal(NpFormulas.sparseWidth(1).holds, false, 'a modulus is greater than 1')
  for (const k of [1, 2, 5, 9]) assert.equal(NpFormulas.reachGcd(k).value, 0, `(2^(2·${k}) − 1) ≡ 0 mod 3: 4 ≡ 1, so the gcd step always divides`)
  assert.equal(NpFormulas.subsetSum(291, 5).dst, 'np')
  assert.equal(NpFormulas.isSpace(1).dst, 'qsec', 'the space bound crosses into quantum security')
  await verifyHex('np', 6, [['subsetSum', [291, 5], 4], ['isTime', [3], 243], ['isSpace', [256], 9], ['sparseWidth', [91], 9]])
  t.diagnostic('6 formulas; subsetSum 4, isTime n^5, isSpace bits(n), sparseWidth(91) = 9 qubits, reachGcd ≡ 0 mod 3; crossing into np, qsec, quantum')
})
