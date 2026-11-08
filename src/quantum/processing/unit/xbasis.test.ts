/**
 * The X-basis reading of the GHZ state and of the captain's coin, pinned to the statement that
 * millennium-solutions/src/proof/interference.lean proves (ghz_cancels_exactly_on_odd_parity): the GHZ amplitude is zero
 * exactly on odd-parity outcomes, and the coin's weight is positive on every outcome. This is corroboration of the served
 * numbers against an independent formula. It is not a proof, and it does not decide holds.
 */
import { test } from './receipted.js'
import assert from 'node:assert/strict'
import { quantumOf, qpuReadingOf } from './index.js'

const popcount = (s: number): number => s.toString(2).split('').filter((c) => c === '1').length
// (-1)^(x·s) for a 3-qubit basis state x: the sign that the Hadamard puts on outcome s.
const sign = (x: number, s: number): number => ((popcount(x & s) % 2) === 0 ? 1 : -1)
const outcomes = [0, 1, 2, 3, 4, 5, 6, 7]

const xbasisOf = (doc: { circuit: { xbasis?: unknown } }) => doc.circuit.xbasis as XbasisLike
type XbasisLike = {
  basis: string
  scale: string
  ghz: { kind: string; state: string; outcomes: { s: number; bits: string; parity: number; sign000: number; sign111: number; amplitude: number }[]; holds: boolean }
  coin: { kind: string; state: string; outcomes: { s: number; bits: string; parity: number; sign000: number; sign111: number; weight: number }[]; holds: boolean }
  holds: boolean
}

const checkAmplitudes = (x: XbasisLike) => {
  assert.equal(x.ghz.outcomes.length, 8, 'eight GHZ amplitudes, one per outcome')
  for (const s of outcomes) {
    const row = x.ghz.outcomes.find((r) => r.s === s)
    assert.ok(row, `GHZ amplitude for outcome ${s}`)
    assert.equal(row.amplitude, sign(0, s) + sign(7, s), `GHZ amplitude on s=${s} is the sum of the two branch signs`)
    assert.equal(row.sign000, sign(0, s), `sign of |000> on s=${s}`)
    assert.equal(row.sign111, sign(7, s), `sign of |111> on s=${s}`)
    assert.equal(row.parity, popcount(s) % 2, `parity of s=${s}`)
    assert.equal(row.bits, s.toString(2).padStart(3, '0'), `bit string of s=${s}`)
    // the statement: zero exactly when s has odd parity
    assert.equal(row.amplitude === 0, popcount(s) % 2 === 1, `GHZ amplitude zero exactly on odd parity, at s=${s}`)
  }
}

const checkWeights = (x: XbasisLike) => {
  assert.equal(x.coin.outcomes.length, 8, 'eight coin weights, one per outcome')
  for (const s of outcomes) {
    const row = x.coin.outcomes.find((r) => r.s === s)
    assert.ok(row, `coin weight for outcome ${s}`)
    // a mixture adds squared branch signs; every outcome is reached by both branches, so each weight is 1 + 1 = 2
    assert.equal(row.weight, sign(0, s) ** 2 + sign(7, s) ** 2, `coin weight on s=${s} is the sum of squared branch signs`)
    assert.equal(row.weight, 2, `coin weight on s=${s}`)
    assert.ok(row.weight > 0, `coin weight positive on s=${s}`)
  }
}

test('xbasis: the GHZ X-basis amplitude is zero exactly on odd-parity outcomes', () => {
  checkAmplitudes(xbasisOf(quantumOf()))
})

test('xbasis: the coin X-basis weight is positive on every outcome, and is labelled a weight', () => {
  const x = xbasisOf(quantumOf())
  checkWeights(x)
  assert.equal(x.ghz.kind, 'amplitude', 'the GHZ values are amplitudes')
  assert.equal(x.coin.kind, 'weight', 'the coin values are weights, never amplitudes')
  assert.equal(x.coin.outcomes.every((r) => !('amplitude' in r)), true, 'a coin row carries no amplitude field')
})

test('xbasis: the served tool reading carries the same amplitudes and weights, and its own holds', () => {
  const reading = qpuReadingOf() as unknown as { circuit: { xbasis: XbasisLike } }
  checkAmplitudes(reading.circuit.xbasis)
  checkWeights(reading.circuit.xbasis)
  assert.equal(reading.circuit.xbasis.holds, true, 'xbasis.holds is its own check and is true')
})

test('xbasis: adding it leaves the document holds as the self-consistency it was', () => {
  const doc = quantumOf()
  assert.equal(doc.circuit.holds, true, 'circuit.holds is unchanged by the X-basis block')
  assert.equal(doc.holds, true, 'the quantum document still holds')
  assert.equal(doc.circuit.xbasis.basis, 'x')
  assert.equal(doc.circuit.xbasis.scale.startsWith('unnormalised'), true, 'the dropped 2^(-3/2) is stated')
})
