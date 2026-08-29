import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  SEAL_TEN, VORTEX_SEQUENCE, VORTEX_MIRROR, STRIP_FORWARD, STRIP_REFLECTED,
  throughVoid, foldVortex, foldVortexReflection, vortexStrokeGateways,
  decodeVortexDashAngles, computeVortexInvariantsHold, developmentVortex,
  walkTour, VORTEX_TOUR, dz, ap, polar, saltConv, saltSeq, tourContra, livingFieldReport,
} from '../sequence-field.js'
import { encrypt } from '../crypt.js'

test('seal_ten — 0124875369 permutes 0..9 and doubles on the orbit', () => {
  assert.equal(SEAL_TEN.length, 10)
  assert.deepEqual([...SEAL_TEN].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  assert.deepEqual([1, 2, 4, 8, 7, 5].map((x) => (x * 2) % 9), [2, 4, 8, 7, 5, 1])
  assert.equal(STRIP_FORWARD, '124875369')
  assert.equal(STRIP_REFLECTED, '986235741')
})

test('throughVoid — involution fixed at 5; 1↔9 · 2↔8 · 4↔6 · 7↔3', () => {
  assert.equal(throughVoid(throughVoid(7)), 7)
  assert.equal(throughVoid(5), 5)
  assert.equal(throughVoid(0), 0)
  assert.equal(throughVoid(1), 9)
  assert.equal(throughVoid(9), 1)
  assert.deepEqual([...VORTEX_SEQUENCE], [1, 2, 4, 8, 7, 5, 3, 6, 9])
  assert.deepEqual([...VORTEX_MIRROR], [9, 8, 6, 2, 3, 5, 7, 4, 1])
})

test('foldVortexReflection — valid; order 54, excess 42', () => {
  const r = foldVortexReflection()
  assert.equal(r.valid, true)
  assert.equal(r.groupOrder, 54)
  assert.equal(r.excess, 42)
  assert.equal(r.tailReflects, true)
  assert.equal(r.fixedPoints.join(','), '5')
})

test('vortexStrokeGateways — living field cycle and four gateways', () => {
  const s = vortexStrokeGateways()
  assert.equal(s.computes, true)
  assert.equal(s.written, '1\\2\\4\\8/7/5/3\\6\\9/0\\1')
  assert.deepEqual(s.gateways, [8, 3, 9, 0])
})

test('decodeVortexDashAngles — 60° closes; weighted bearing 0', () => {
  const d = decodeVortexDashAngles()
  assert.equal(d.closes, true)
  assert.equal(d.weightedBearing, 0)
  assert.equal(d.vortexMatches, true)
})

test('walkTour — two seams at 5→3 and 0→1', () => {
  const w = walkTour()
  assert.equal(w.seamCount, 2)
  assert.deepEqual(w.seams.map((s) => [s.from, s.to]), [[5, 3], [0, 1]])
})

test('foldVortex — palindrome roots, total 90', () => {
  const v = foldVortex()
  assert.equal(v.valid, true)
  assert.equal(v.total, 90)
})

test('developmentVortex and computeVortexInvariantsHold', () => {
  const dv = developmentVortex('verify')
  assert.equal(dv.computes, true)
  assert.equal(computeVortexInvariantsHold(), true)
})

test('dz and throughVoid agree on 1..9', () => {
  for (let d = 1; d <= 9; d++) assert.equal(dz(d), throughVoid(d), `digit ${d}`)
})

test('Lean algebra — ap, polar, saltConv, saltSeq, tourContra', () => {
  assert.equal(ap(2, 0, 1), 2)
  assert.equal(polar(3), 6)
  assert.equal(saltConv(3, 0), saltConv(3, 8))
  assert.notEqual(saltSeq(0, 1), saltSeq(0, 2))
  assert.deepEqual([...tourContra()], [0, 9, 8, 6, 2, 3, 5, 7, 4, 1, 0, 9])
})

test('livingFieldReport folds stroke, dash, reflection', () => {
  const r = livingFieldReport()
  assert.equal(r.invariantsHold, true)
  assert.equal(r.stroke.written, '1\\2\\4\\8/7/5/3\\6\\9/0\\1')
  assert.ok(r.root.length > 30)
})

test('encrypt v2 step salt is injective — salt_seq_injective', () => {
  const addresses = new Set<string>()
  for (let s = 0; s < 9; s++) {
    const env = encrypt('same plaintext', 'test-passphrase', s)
    assert.equal(env.v, 2)
    addresses.add(env.address)
  }
  assert.equal(addresses.size, 9)
})
