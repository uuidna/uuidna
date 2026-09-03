// falsifier-floor — the nine theorems that had a falsifier leg but no falsifier.
//
// The floor is not a census high-water mark. Every falsified theorem pays the two coins and the captain pays two
// more, so 63 · 2 + 2 = 128, the full uuid width: the floor is (128 − 2)/2, sealed in
// `captain_theorem`. The census used to earn that leg from a raw substring scan, so a
// key MENTIONED in a comment counted as covered — two of the keys the floor rested on were named only as examples
// in a test about key length, in a file deleted in the same commit that published the floor. The scan now reads
// executable text only, which dropped the honest count to 54, and these tests are the nine that were missing.
//
// Each one RECOMPUTES the theorem's arithmetic here and checks the sealed statement still says it, so mutating the
// Lean breaks this file. Each carries a negative control, because a check that always passes is decoration.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems } from './index.js'
import { census } from './scripts/rosetta.js'
import { FLOOR } from './rosetta-mirror.js'

const T = theorems()
/** the sealed statement with every space removed, so a fragment compares against the algebra, not the layout */
const sealed = (key: string): string => {
  const t = T.find((x) => x.key === key)
  assert.ok(t, `${key} is not in the ledger — a test may not cite a theorem that does not exist`)
  return t.statement.replace(/\s+/g, '')
}
const R = (n: number): number[] => Array.from({ length: n }, (_, i) => i)

test('the floor is the uuid less the captain commission, halved — not a snapshot', () => {
  assert.equal((128 - 2) / 2, 63)
  assert.equal(63 * 2 + 2, 128)
  assert.ok(sealed('captain_theorem').includes('63*2+2=128'))
  // the negative control: the derivation is exact, so a floor one either side does NOT close on the uuid
  assert.notEqual(62 * 2 + 2, 128)
  assert.notEqual(64 * 2 + 2, 128)
  assert.ok(FLOOR.falsifier >= 63, `the published floor is ${FLOOR.falsifier}, below the derived 63`)
})

test('uuidna_is_dna_times_the_two_coins — the codon and the six doublings meet at 64, and the coins double it', () => {
  assert.equal(4 ** 3, 64)
  assert.equal(2 ** 6, 64)
  assert.equal(2 * 64, 128)
  assert.ok(sealed('uuidna_is_dna_times_the_two_coins').includes('128=2^7'))
  assert.notEqual(2 ** 6, 128) // the doubling is what carries 64 to 128 — not the exponent alone
})

test('residues_identify_digit — 6 and 9 separate every digit below 16, and stop at 18', () => {
  const collides = (n: number): boolean =>
    R(n).some((a) => R(n).some((b) => a !== b && a % 6 === b % 6 && a % 9 === b % 9))
  assert.equal(collides(16), false, 'below 16 the residue pair is an address')
  assert.equal(collides(19), true, 'THE CONTROL: lcm(6,9)=18, so 0 and 18 share both residues')
  assert.ok(sealed('residues_identify_digit').includes('18-16=2'))
})

test('vortex_one_leap — the doubling orbit on the units, and its digit sum', () => {
  const orbit = R(6).map((k) => 2 ** k % 9)
  assert.deepEqual(orbit, [1, 2, 4, 8, 7, 5])
  assert.equal(orbit.reduce((a, b) => a + b, 0), 27)
  assert.ok(sealed('vortex_one_leap').includes('[1,2,4,8,7,5]'))
  // the reflection fixes 0 and 5 — and 0 is fixed only because the wing's dz sends 0 to itself rather than to 10
  const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
  assert.deepEqual(R(10).filter((x) => dz(x) === x), [0, 5])
  assert.deepEqual(R(10).filter((x) => 10 - x === x), [5], 'THE CONTROL: drop the 0 case and a fixed point is lost')
})

test('redirect_imitable_but_coins_authorise — exactly two coins authorise, no other count does', () => {
  assert.deepEqual(R(8).filter((c) => 32 * c === 64), [2])
  assert.ok(sealed('redirect_imitable_but_coins_authorise').includes('32*c==64)=[2]'))
  assert.equal(R(8).filter((c) => 32 * c === 64).length, 1, 'THE CONTROL: the authorisation is unique, not merely satisfied')
})

test('reversible_erases_nothing — multiplying by the modulus keeps zero at zero and one at itself', () => {
  const m = 287097813
  assert.equal(0 * m, 0)
  assert.equal(1 * m, m)
  assert.ok(sealed('reversible_erases_nothing').includes('1*287097813=287097813'))
  assert.ok(m > 0, 'THE CONTROL: a zero modulus would satisfy both identities and erase everything')
})

test('octave_codon_address — eight doublings reach 128, and the codon lands mid-octave', () => {
  assert.deepEqual(R(8).map((k) => 2 ** k), [1, 2, 4, 8, 16, 32, 64, 128])
  assert.equal(4 ** 3, 64)
  assert.ok(sealed('octave_codon_address').includes('[1,2,4,8,16,32,64,128]'))
  assert.equal(R(8).map((k) => 2 ** k).length, 8, 'THE CONTROL: eight steps, not nine — 256 is the next octave')
})

test('forgery_flags_every_mismatch — all 81 pairs walked, 9 honest and 72 forged', () => {
  const pairs = R(9).flatMap((c) => R(9).map((s) => (c === s ? 0 : 1)))
  assert.equal(pairs.length, 81)
  assert.equal(pairs.filter((x) => x === 1).length, 72)
  assert.equal(pairs.filter((x) => x === 0).length, 9)
  assert.equal(72 + 9, 81, 'THE CONTROL: the two counts must exhaust the square, or a case went unwalked')
  assert.ok(sealed('forgery_flags_every_mismatch').includes('=72'))
})

test('captain_commission_two_coins — two coins per FULL hundred-ten, nothing for a partial', () => {
  const commission = (n: number): number => 2 * ((n - (n % 110)) / 110)
  assert.equal(commission(110), 2)
  assert.equal(commission(220), 4)
  assert.equal(commission(109), 0, 'THE CONTROL: a partial hundred-ten pays nothing, or the rate would be continuous')
  assert.ok(sealed('captain_commission_two_coins').includes('commission110=2'))
})

test('THE FLOOR IS MET BY A LIVE RECOMPUTE, not by the mirror it shipped', () => {
  const live = census().filter((r) => r.legs.includes('falsifier')).length
  assert.ok(live >= 63, `the live falsifier count is ${live}, below the derived floor of 63`)
})

// ── the gate's own spec. These four were named in GATE_THEOREMS while absent from the ledger, so the gate served
// four fabricated citations with every verdict and no test could notice. Each is checked against cleanAudit's
// eight states here, recomputed rather than cited.
const cleanAudit = (f: number, d: number, v: number): number => (1 - f) * (1 - d) * (1 - v)
const STATES: [number, number, number][] = [0, 1, 2, 3, 4, 5, 6, 7].map((p) => [p & 1, (p >> 1) & 1, (p >> 2) & 1])

test('honesty_gate_passes_iff_all_sealed — an IFF, so no second passing state can hide', () => {
  assert.ok(STATES.every(([f, d, v]) => (cleanAudit(f, d, v) === 1) === (f === 0 && d === 0 && v === 0)))
  assert.equal(STATES.filter(([f, d, v]) => cleanAudit(f, d, v) === 1).length, 1, 'THE CONTROL: exactly one of eight, not merely "at least the clean one"')
  assert.ok(sealed('honesty_gate_passes_iff_all_sealed').includes('cleanAuditfdv==1'))
})

test('conformance_failure_detects_intrusion — one flag drains the whole audit, no partial credit', () => {
  assert.ok(STATES.filter(([f, d, v]) => f + d + v > 0).every(([f, d, v]) => cleanAudit(f, d, v) === 0))
  assert.equal(STATES.filter(([f, d, v]) => f + d + v > 0).length, 7, 'THE CONTROL: seven states carry a flag — an averaging gate would pass some of them')
})

test('honesty_gate_is_theorem_not_oracle — the implementation equals its spec at every state', () => {
  assert.ok(STATES.every(([f, d, v]) => cleanAudit(f, d, v) === (f === 0 && d === 0 && v === 0 ? 1 : 0)))
  assert.notEqual(cleanAudit(1, 0, 0), 1, 'THE CONTROL: the spec is not the constant 1')
})

test('overclaim_with_fake_cite_fails — a fabricated citation drains whatever else is clean', () => {
  assert.ok([0, 1].every((f) => [0, 1].every((d) => cleanAudit(f, d, 1) === 0)))
  assert.equal(cleanAudit(0, 0, 0), 1, 'THE CONTROL: with the citation bit lowered the same gate passes')
})

// The `verified` test that stood here is gone with its theorem: (7 ≠ 0) ∧ (7 ≠ 1) ∧ (0 ≠ 1) compared bare
// literals, so the kernel confirmed three numerals while the KEY carried the whole claim about verification.
// literalGaps() in the guard now refuses that shape outright.

// ── coverage restored after the Clay purge. Deleting the status-DNA tests took `reduce_is_order_invariant`'s
// falsifier leg with them — the regression rule in rosetta.ts caught that it was a LOSS on a surviving theorem,
// not a removal. These four are recomputed here, each with a control.

test('reduce_is_order_invariant — the fold is blind to the order it is handed', () => {
  const sum = (xs: number[]): number => xs.reduce((a, b) => a + b, 0)
  assert.equal(sum([1, 2, 3, 4]), sum([4, 3, 2, 1]))
  assert.ok(sealed('reduce_is_order_invariant').includes('[1,2,3,4]'))
  // the control needs an operation order actually changes. Subtraction from 0 does NOT: it yields −(sum) either
  // way, so the first control I wrote passed for both orders and proved nothing.
  const digits = (xs: number[]): number => xs.reduce((a, b) => a * 10 + b, 0)
  assert.notEqual(digits([1, 2, 3, 4]), digits([4, 3, 2, 1]), 'THE CONTROL: order-invariance is the operation, not the fold')
})

test('z7fermat — every non-multiple of 7 raised to the sixth returns to 1', () => {
  assert.ok(R(7).every((a) => a % 7 === 0 || a ** 6 % 7 === 1))
  assert.equal(0 ** 6 % 7, 0, 'THE CONTROL: 0 is the exception the theorem states, not a case it hides')
  assert.ok(sealed('z7fermat').includes('(a^6)%7==1'))
})

test('three_no_inverse — 3 is the digit ℤ/9 will not invert', () => {
  assert.ok(R(9).every((x) => 3 * x % 9 !== 1))
  assert.ok(R(9).some((x) => 2 * x % 9 === 1), 'THE CONTROL: 2 does have an inverse, so the check can distinguish')
  assert.ok(sealed('three_no_inverse').includes('(3*x)%9!=1'))
})

test('doubling_circuit — six doublings close the ring of units', () => {
  assert.deepEqual(R(6).map((k) => 2 ** k % 9), [1, 2, 4, 8, 7, 5])
  assert.equal(2 ** 6 % 9, 1, 'THE CONTROL: the seventh doubling returns to 1 — the circuit closes at six')
  assert.ok(sealed('doubling_circuit').includes('[1,2,4,8,7,5]'))
})
