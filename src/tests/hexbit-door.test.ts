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
  hexbitDoorOf, evidenceRow, compileToHexbits, hexbitReceipt, hexbitReceiptLanes,
  UUID_HEXBITS, HANDLE_HEXBITS, COIN_HEXBITS,
  HEXBIT_BITS, HEXBIT_STATES, HANDLE_SPAN, COINS, VE_FACES,
  glagoliticOf, glagoliticUnitOf, glagoliticNibbleOf, GLAGOLITIC_BASE,
} from '../hexbit/index.js'
import { doubling, dz } from '../separation.js'
import { BASE, toUuid } from '../address.js'
import { runSequence } from '../sequence-run.js'
import { HANDLE_ROOT, handleOf } from '../handle.js'
import { messagingEnvelope, gateVerdict, depositCoins } from '../gate-engine.js'
import { theoremByKey } from '../theorems/index.js'
import { depositCandidates } from '../wave-deposit.js'
import { answered } from '../apis/index.js'
import { animateStates } from '../quantum/apps/hexbit-animator.js'
import {
  UUID_LAYOUT_GROUPS, HEX_TRINITY_COUNT, MESSAGE_CAP_HEXBITS, TAIL_HEXBITS,
  EXECUTABLE_HEXBITS, PAYLOAD_HEXBITS, layoutGroups, hexTrinityStates,
  executableStates, tailStates, torusStep, uuidChannel, layoutMatchesHandle,
  layoutWidths, layoutCoversUuid, MESSAGE_CAP_AMPLITUDES, channelSeal, channelOpen,
} from '../hexagram.js'
import {
  coinYarrowWave, growLife, hardwareLayer, lifeWave, osLayer, softwareLayer,
  theorems, skillGroups, DATAPATH, LANES, KEY_BITS, UUID_BITS, WAVE_PRODUCT,
} from '../index.js'

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

test('hexbitReceipt and hexbitReceiptLanes — fold + door, lane shard is order-invariant', () => {
  const a = hexbitReceipt([toUuid('a'), toUuid('b')])
  assert.equal(a.receipt, hexbitReceipt([toUuid('a'), toUuid('b')]).receipt)
  assert.equal(a.handle.length, HANDLE_HEXBITS)
  const sharded = hexbitReceiptLanes([toUuid('x'), toUuid('y'), toUuid('z')])
  assert.equal(sharded.lanes, VE_FACES)
  assert.equal(sharded.receipt, hexbitReceiptLanes([toUuid('z'), toUuid('y'), toUuid('x')]).receipt)
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
  assert.equal(env.channel.handle, door.handle)
  assert.equal(env.channel.torusHome, true)
  assert.equal(env.channel.trinities.length, 3)
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

const LADDR = toUuid('two_coins')

test('glagoliticOf — page states map to the Unicode block', () => {
  assert.equal(glagoliticOf(0), String.fromCodePoint(GLAGOLITIC_BASE))
  assert.equal(glagoliticOf(15), String.fromCodePoint(GLAGOLITIC_BASE + 15))
  assert.equal(glagoliticNibbleOf(10), glagoliticOf(10))
})

test('glagoliticUnitOf — Az..Zemlja is the unit row', () => {
  assert.equal(glagoliticUnitOf(1), glagoliticOf(0))
  assert.equal(glagoliticUnitOf(BASE), glagoliticOf(BASE - 1))
})

test('glagolitic refuses off-page states', () => {
  assert.throws(() => glagoliticOf(-1), /outside 0/)
  assert.throws(() => glagoliticOf(HEXBIT_STATES), /outside 0/)
  assert.throws(() => glagoliticUnitOf(0), /Az\.\.Zemlja/)
  assert.throws(() => glagoliticUnitOf(BASE + 1), /Az\.\.Zemlja/)
})

test('hexbit-animator shares the same glyph projection', () => {
  const { keyframes } = animateStates([0, 1, 15])
  assert.equal(keyframes[0]!.glyph, glagoliticOf(0))
  assert.equal(keyframes[1]!.glyph, glagoliticOf(1))
  assert.equal(keyframes[2]!.glyph, glagoliticOf(15))
})

test('layout widths match sealed hexbit theorems', () => {
  const w = layoutWidths()
  assert.deepEqual([...w.groups], [8, 4, 4, 4, 12])
  assert.deepEqual([...w.bits], [32, 16, 16, 16, 48])
  assert.equal(w.hexChars, 32)
  assert.equal(w.payloadHexbits, 24)
  assert.equal(UUID_LAYOUT_GROUPS.reduce((a, b) => a + b, 0), 32)
})

test('message cap is one 4-hex trinity tile', () => {
  assert.equal(MESSAGE_CAP_HEXBITS, 4)
  assert.equal(MESSAGE_CAP_AMPLITUDES, 65536)
  assert.equal(HEX_TRINITY_COUNT, 3)
  assert.equal(EXECUTABLE_HEXBITS, HEX_TRINITY_COUNT * MESSAGE_CAP_HEXBITS)
  assert.equal(TAIL_HEXBITS, 12)
  assert.equal(HANDLE_HEXBITS + PAYLOAD_HEXBITS, 32)
})

test('layoutGroups slices handle, trinities, tail, and merged middle', () => {
  const g = layoutGroups(LADDR)
  assert.equal(g.handle, handleOf(LADDR))
  assert.equal(g.trinities.length, 3)
  assert.equal(g.tail.length, 12)
  assert.equal(g.words, g.trinities.join(''))
  assert.equal(g.middle, g.words + g.tail)
  assert.equal(g.handle.length + g.middle.length, 32)
  assert.equal(g.handle.length + g.trinities.join('').length + g.tail.length, 32)
  assert.ok(layoutMatchesHandle(LADDR))
  assert.ok(layoutCoversUuid(LADDR))
})

test('executable and tail partition the payload compile vector', () => {
  const full = compileToHexbits(LADDR)
  const exe = executableStates(LADDR)
  const tail = tailStates(LADDR)
  assert.equal(exe.length, EXECUTABLE_HEXBITS)
  assert.equal(tail.length, TAIL_HEXBITS)
  assert.deepEqual(full.slice(HANDLE_HEXBITS), [...exe, ...tail])
  const tris = hexTrinityStates(LADDR)
  assert.deepEqual(tris.flat(), exe)
})

test('torusStep flips home — double torus memory is involutive', () => {
  assert.equal(torusStep(LADDR).home, true)
})

test('uuidChannel carries door, merged words, middle payload, and marks payload store optional', () => {
  const ch = uuidChannel(LADDR)
  assert.equal(ch.handle, handleOf(LADDR))
  assert.equal(ch.door, `https://uuidna.com/${ch.handle}`)
  assert.equal(ch.words, ch.trinities.join(''))
  assert.equal(ch.middle, ch.words + ch.tail)
  assert.equal(ch.payloadStoreOptional, true)
  assert.equal(ch.executable.length, 12)
  assert.equal(ch.tailStates.length, 12)
})

test('channelSeal ↔ channelOpen — seal, slice handles, peel back', () => {
  const sealed = channelSeal('automation', ['pass'], 0)
  const opened = channelOpen(sealed.uuids, ['pass'])
  assert.equal(opened.message, 'automation')
  assert.equal(opened.channels.length, sealed.channels.length)
  assert.deepEqual(opened.channels.map((c) => c.handle), sealed.channels.map((c) => c.handle))
  assert.throws(() => channelOpen(sealed.uuids, ['wrong']))
})

test('channelSeal attaches channel slices to every uuid in the stream', () => {
  const s = channelSeal('automation', ['pass'], 0)
  assert.ok(s.uuids.length >= 1)
  assert.equal(s.channels.length, s.uuids.length)
  assert.equal(s.channels[0]!.trinities.length, 3)
})

test('lifeWave — one conserved product over the living ledger', () => {
  const T = theorems()
  const L = lifeWave()
  const life = growLife()
  assert.equal(L.wave.seals, T.length)
  assert.equal(L.living, life.life.living)
  assert.equal(L.covers, true)
  assert.equal(L.product, WAVE_PRODUCT)
  assert.equal(L.hardware.digestBits, KEY_BITS)
  assert.equal(L.hardware.verifyBits, UUID_BITS)
  assert.equal(L.skills, skillGroups().length)
  const omitted = coinYarrowWave(T.length - 1)
  assert.notEqual(omitted.seals, L.wave.seals)
  assert.equal(omitted.product, WAVE_PRODUCT)
})
