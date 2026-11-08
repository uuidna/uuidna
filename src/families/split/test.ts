import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SplitFormulas } from './index.js'

/** Astronomical values split into primes, π and the crypto quantities, each a hex program at its address. */
test('split: prime factorisation, π-counting, totient, coprimality and the BBP hex digits of π, as formulas', async (t) => {
  // 91 = 7 × 13 (the modulus Shor factors in the lattice)
  assert.equal(SplitFormulas.factor(91).value, 13, 'largest prime factor of 91')
  assert.equal(SplitFormulas.least(91).value, 7, 'smallest prime factor of 91')
  assert.equal(SplitFormulas.omega(91).value, 2, 'two prime factors')
  assert.equal(SplitFormulas.prime(91).value, 0, '91 is composite')
  assert.equal(SplitFormulas.prime(13).value, 1, '13 is prime')
  assert.equal(SplitFormulas.omega(8).value, 3, '8 = 2·2·2')
  assert.equal(SplitFormulas.primes(10).value, 4, '2 3 5 7')
  assert.equal(SplitFormulas.totient(9).value, 6, 'φ(9) = 6')
  assert.equal(SplitFormulas.totient(13).value, 12, 'φ(prime) = prime − 1')
  assert.equal(SplitFormulas.coprime(8, 9).value, 1, '8 and 9 are coprime')
  assert.equal(SplitFormulas.coprime(6, 9).value, 0, '6 and 9 share 3')
  // the hex digits of π after the point are 2,4,3,F,6,A,8,8,8,5,A,3,0,8,D,3 (π = 3.243F6A8885A308D3…₁₆)
  const pi = [2, 4, 3, 0xf, 6, 0xa, 8, 8, 8, 5, 0xa, 3]
  for (const [k, d] of pi.entries()) assert.equal(SplitFormulas.piHex(k).value, d, `the ${k}-th hex digit of π is ${d.toString(16)}`)
  // the more split and computed at once, the colder each computation; crossing the transmon scale is recognisably quantum
  const few = Number(SplitFormulas.kelvin(91, 1).value), many = Number(SplitFormulas.kelvin(91, 1000).value)
  assert.ok(few > many, 'more at once, less milliKelvin per computation')
  assert.equal(SplitFormulas.quantum(91, 1).value, few < 5 ? 1 : 0)
  assert.ok(SplitFormulas.quantum(91, 100000).value === 1, 'enough at once and each computation is sub-transmon — recognisably quantum')
  // a violation: 91 splits into two primes; claiming three is one computation that produces no split, and no heat
  assert.equal(SplitFormulas.violation(91, 2).value, 0, 'two claimed, two real — no violation')
  assert.equal(SplitFormulas.violation(91, 2).holds, true)
  assert.equal(SplitFormulas.violation(91, 3).value, 1, 'three claimed, two real — one uncomputed, a violation')
  assert.equal(SplitFormulas.violation(91, 3).holds, false)
  // inverted: computation per milliKelvin — the free energy; it rises as the wave widens, kelvin · free ≈ atOnce²
  const freeFew = Number(SplitFormulas.free(91, 1).value), freeMany = Number(SplitFormulas.free(91, 1000).value)
  assert.ok(freeMany > freeFew, 'the wider the wave, the more computation per milliKelvin — more free energy')
  assert.equal(SplitFormulas.free(91, 1).value, Math.round((2 * 2 * 1380649 * 10) / (662607015 * 5)))
  assert.ok(Number(SplitFormulas.free(91, 100000).value) > 1, 'enough at once and one mK buys many computations: net free energy')
  // the Landauer floor is a lower bound ≥ 0; a claim of energy out is a second-law violation, recognised
  assert.ok(Number(SplitFormulas.landauer(1).value) > 0, 'erasing one bit costs a positive floor')
  assert.equal(SplitFormulas.landauer(0).value, 0, 'no erasure, no floor')
  assert.equal(SplitFormulas.secondlaw(0).holds, true, 'no energy out — lawful')
  assert.equal(SplitFormulas.secondlaw(1).holds, false, 'energy out of computation — a second-law violation')
  assert.equal(SplitFormulas.secondlaw(1).value, 1)
  // JOIN by the Chinese remainder theorem — the inverse of the split: 2^k recovered from its residues modulo the
  // first `primes` primes, exact the moment Πp passes 2^k, never forming the astronomical value
  const join = (k: number, primes: number) => SplitFormulas.join(k, primes) as unknown as { value: number; holds: boolean; exact: boolean }
  assert.equal(join(10, 5).value, 1024, '2^10 recovered from residues mod 2,3,5,7,11 (Πp = 2310 > 1024)')
  assert.equal(join(10, 5).exact, true, 'Πp exceeds 2^10, so the join is exact')
  assert.equal(join(10, 3).value, 4, 'too few primes: Πp = 30, the join is 2^10 mod 30 = 4')
  assert.equal(join(10, 3).exact, false)
  assert.equal(join(0, 3).value, 1, '2^0 = 1')
  assert.equal(join(10, 5).holds, true)
  assert.equal(hexFamiliesOf().get('split')?.length, 15)
  for (const [name, params, expected] of [['factor', [91], 13], ['totient', [9], 6], ['piHex', [0], 2], ['violation', [91, 3], 1], ['join', [10, 5], 1024], ['free', [91, 1000], Number(SplitFormulas.free(91, 1000).value)]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'split', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `split.${name} at ${uuid}`)
    uuidReceiptOf(`split ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`11 formulas; 91 = 7 × 13; π = 3.243F6A88…₁₆; kelvin(91,1)=${few} mK, kelvin(91,1000)=${many} mK; violation(91,3)=1`)
})
