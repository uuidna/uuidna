// 32-bit/128-bit Shor bit-widths are the handle and uuid rows. Prefix occupancy and reverse (prefix→suffix)
// are unique store slots the leaf span omits. GPU is a specified lane against those rows — not a QPU.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  HANDLE_BITS, HANDLE_HEXBITS, UUID_BITS, UUID_HEXBITS, LEVERAGE, KEY_BITS, HEXBIT_BITS,
  COIN_HEXBITS, HANDLE_SPAN,
  periodBits, shorChunkBits, shorCapacityFit, spanAt, prefixOccupancy,
} from '../hexbit/index.js'
import { handleParts, reverseHandle } from '../handle.js'
import { callTool } from '../mcp.js'
import type { ServedOS } from '../quantum/os/index.js'

test('32-bit and 128-bit moduli exactly fit named widths — 2n is leverage and key', () => {
  const s = shorCapacityFit()
  assert.equal(s.handleModulusBits, HANDLE_BITS)
  assert.equal(s.uuidModulusBits, UUID_BITS)
  assert.equal(s.handlePeriodBits, periodBits(HANDLE_BITS))
  assert.equal(s.uuidPeriodBits, periodBits(UUID_BITS))
  assert.equal(s.handleFits, true)
  assert.equal(s.uuidFits, true)
  assert.equal(s.handlePeriodBits, LEVERAGE)
  assert.equal(s.uuidPeriodBits, KEY_BITS)
  assert.equal(s.encoderQubits, HEXBIT_BITS * HEXBIT_BITS)
  assert.equal(s.chunkBits, shorChunkBits())
  assert.equal(s.chunksOnHandle, 4)
  assert.equal(s.chunksOnUuid, 16)
  assert.equal(s.encoderFitsChunk, true)
})

test('CONTROL — period bits are not the encoder qubit count; collapsing them is a traitor', () => {
  const s = shorCapacityFit()
  assert.notEqual(s.handlePeriodBits, s.encoderQubits, '64-bit period ≠ 16-qubit register')
  assert.notEqual(periodBits(HANDLE_BITS), HEXBIT_BITS * HEXBIT_BITS)
  const four = [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]
  assert.equal(new Set(four).size, 4)
})

test('prefixes shorter than 8 hexbits occupy unique store slots the leaf span omits', () => {
  const p = prefixOccupancy()
  assert.equal(p.leaves, HANDLE_SPAN)
  assert.equal(p.leaves, spanAt(HANDLE_HEXBITS))
  assert.ok(p.shorter > 0, 'widths 1..7 are extra unique prefixes')
  assert.equal(p.stored, p.shorter + p.leaves)
  assert.equal(p.byWidth.length, HANDLE_HEXBITS)
})

test('in reverse a prefix of k path-parts becomes a suffix of k path-parts — involution', () => {
  const h = 'cc9c0011'
  const r = reverseHandle(h)
  assert.equal(r, '11009ccc')
  assert.equal(reverseHandle(r), h)
  const k = 2
  const prefix = handleParts(h).slice(0, k)
  const suffix = handleParts(r).slice(-k)
  assert.deepEqual(suffix, prefix.reverse())
})

test('uuidnaOS capacity carries Shor fit and the specified GPU lane', () => {
  const cap = (callTool('uuidna_os', {}) as ServedOS).capacity
  assert.equal(cap.shor.handleFits, true)
  assert.equal(cap.shor.uuidFits, true)
  assert.equal(cap.gpu.seat, 'specified')
  assert.equal(cap.gpu.handlePastBreakEven, true)
  assert.equal(cap.gpu.chunkPastBreakEven, false)
  assert.equal(cap.stream.idle.gpuWorkers, 0)
  assert.equal(cap.stream.atPostage.gpuWorkers, 1)
})
