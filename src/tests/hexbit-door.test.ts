// hexbit-door — ONE constructor, four widths as theorem functions, Sequence already walks it.
//
// Widths compare to theorem functions, never to pasted literals. The door is hexbitDoorOf; handle.ts does not
// rebuild it. Coin is the first COIN_HEXBITS tiles. Instant coordination is crew_verifies_instantly (O(1)),
// not wall-clock zero.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  hexbitDoorOf, evidenceRow, compileToHexbits,
  UUID_HEXBITS, HANDLE_HEXBITS, COIN_HEXBITS,
  HEXBIT_BITS, HEXBIT_STATES, HANDLE_SPAN, COINS,
} from '../hexbit/index.js'
import { doubling, dz } from '../separation.js'
import { BASE, toUuid } from '../address.js'
import { runSequence } from '../sequence-run.js'
import { HANDLE_ROOT } from '../handle.js'
import { messagingEnvelope, gateVerdict, depositCoins } from '../gate-engine.js'
import { theoremByKey } from '../theorems/index.js'
import { depositCandidates } from '../wave-deposit.js'
import { answered } from '../apis/index.js'

test('HANDLE_ROOT is declared four-level store — folded receipts write through handlePath', () => {
  assert.equal(HANDLE_ROOT, 'src/handles')
})

const seed = toUuid('hexbit-door-test')

test('HANDLE_HEXBITS is the uuid in hexbit tiles — derived, never stranded', () => {
  assert.equal(HANDLE_HEXBITS, UUID_HEXBITS / HEXBIT_BITS)
  assert.equal(COIN_HEXBITS, UUID_HEXBITS / COINS)
  assert.equal(HEXBIT_BITS * HEXBIT_BITS, HEXBIT_STATES)
  assert.equal(HANDLE_SPAN, HEXBIT_STATES ** HANDLE_HEXBITS)
})

test('the four widths stay four subjects — coin doubling is the vortex map, not hexbit doubling', () => {
  assert.notEqual(HEXBIT_BITS, HANDLE_HEXBITS)
  assert.notEqual(HANDLE_HEXBITS, COIN_HEXBITS)
  assert.notEqual(COIN_HEXBITS, UUID_HEXBITS)
  assert.equal(COIN_HEXBITS % BASE, doubling(HANDLE_HEXBITS))
  // hexbit doubling of the handle width lands on the ring zero, which is a DIFFERENT  subject than vortex doubling
  assert.equal((2 * HANDLE_HEXBITS) % HEXBIT_STATES, 0)
  assert.notEqual((2 * HANDLE_HEXBITS) % HEXBIT_STATES, doubling(HANDLE_HEXBITS))
})

test('hexbitDoorOf is the one door: handle, states, URL, coin slice, place', () => {
  const door = hexbitDoorOf(seed)
  const hexbits = compileToHexbits(seed)
  assert.equal(door.handle.length, HANDLE_HEXBITS)
  assert.equal(door.hexbits.length, UUID_HEXBITS)
  assert.deepEqual(door.hexbits, hexbits)
  assert.equal(door.door, `https://uuidna.com/${door.handle}`)
  assert.equal(door.coin.length, COIN_HEXBITS)
  assert.deepEqual(door.coin, hexbits.slice(0, COIN_HEXBITS))
  assert.equal(door.place.handle, door.handle)
  assert.equal(door.place.hexbits, HANDLE_HEXBITS)
  assert.equal(door.place.span, HANDLE_SPAN)
})

test('evidenceRow spreads the door — no second constructor', () => {
  const row = evidenceRow('nist.gov', seed, 'a reading')
  const door = hexbitDoorOf(seed)
  assert.equal(row.source, 'nist.gov')
  assert.equal(row.address, seed)
  assert.equal(row.note, 'a reading')
  assert.equal(row.handle, door.handle)
  assert.equal(row.door, door.door)
  assert.deepEqual(row.hexbits, door.hexbits)
  assert.deepEqual(row.coin, door.coin)
  assert.equal(row.place.value, door.place.value)
})

test('handle.ts does not rebuild the door URL', () => {
  const src = readFileSync(join(ROOT, 'src', 'handle.ts'), 'utf8')
  assert.doesNotMatch(src, /HEXBIT_DOOR_HOST/)
  assert.doesNotMatch(src, /function evidenceRow/)
})

test('runSequence already walks invert/double/reflect — 0 is origin, 3 reflects by dz', () => {
  const z = runSequence(0)
  assert.equal(z.fixed, true)
  assert.equal(z.seed, 0)
  assert.equal(z.reflection, dz(0))
  const three = runSequence(3)
  assert.equal(three.reflection, dz(3))
  assert.equal(three.fixed, false)
})

test('messagingEnvelope IS the fusion — door + compact witness + compact sequence', () => {
  const g = gateVerdict('uuidna_coins', {}, { coins: 2 })
  const dep = depositCoins('uuidna_coins', g.gate.receipt)
  const env = messagingEnvelope({ surface: 'edge', gate: g.gate, deposit: dep })
  const door = hexbitDoorOf(g.gate.receipt)
  assert.equal(env.handle, door.handle)
  assert.equal(env.door, door.door)
  assert.deepEqual(env.hexbits, door.hexbits)
  assert.equal(env.hexbits.length, UUID_HEXBITS)
  assert.equal(env.coin.length, COIN_HEXBITS)
  assert.equal(env.witness.theoremKey, 'crew_verifies_instantly')
  assert.ok(theoremByKey().has('crew_verifies_instantly'))
  assert.equal(env.witness.quantumQubits, HEXBIT_BITS * HEXBIT_BITS)
  assert.equal(env.sequence.reflection, dz(env.sequence.seed))
  assert.equal(typeof env.sequence.fixed, 'boolean')
  assert.equal(typeof env.sequence.covers, 'boolean')
  assert.ok(Array.isArray(env.sequence.orbit))
})

test('depositCandidates and answered() spread the same door', () => {
  const dep = depositCandidates([], join(ROOT, 'lean', 'wave-queue.json'))
  const d1 = hexbitDoorOf(dep.receipt)
  assert.equal(dep.door, d1.door)
  assert.equal(dep.hexbits.length, UUID_HEXBITS)
  const a = answered('example.org', 'https://example.org/x', 200, 'body')
  const d2 = hexbitDoorOf(a.address)
  assert.equal(a.door, d2.door)
  assert.equal(a.coin.length, COIN_HEXBITS)
  assert.equal(a.handle.length, HANDLE_HEXBITS)
})
