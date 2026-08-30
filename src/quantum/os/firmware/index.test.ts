// miner-firmware — a SHA-256 board loads the uuidnaOS image; more boards do not move the image.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { minerFirmware, upgradeFirmware } from './index.js'
import { bootOS } from '../index.js'
import { coinSupply } from '../../../coin-supply.js'
import { COINS, HANDLE_HEXBITS, HANDLE_SPAN, KEY_BITS, UUID_BITS, GROVER_FLOOR_BITS } from '../../../hexbit/index.js'
import { coins } from '../../../captain/billing/index.js'
import { LANES } from '../../../hardware/lanes/index.js'
import { callTool } from '../../../mcp.js'

test('firmware is the verified uuidnaOS image, floor first, digest already KEY_BITS', () => {
  const os = bootOS()
  const F = minerFirmware()
  const S = coinSupply()
  assert.equal(F.image, os.receipt)
  assert.equal(F.floor, os.floor)
  assert.equal(F.pages, os.port.count + 1)
  assert.equal(F.states, os.boot.count)
  assert.equal(F.digestBits, KEY_BITS)
  assert.equal(F.verifyBits, UUID_BITS)
  assert.equal(F.digestBits / F.verifyBits, coins())
  assert.equal(F.boards, HANDLE_HEXBITS)
  assert.equal(F.minted, S.minted)
  assert.equal(F.remaining, S.remaining)
  assert.equal(F.max, S.max)
  assert.equal(F.search, S.search)
  assert.equal(F.unsealed, S.unsealed)
})

test('CONTROL: more boards do not move the image; the span splits', () => {
  const one = minerFirmware(HANDLE_HEXBITS)
  const two = minerFirmware(HANDLE_HEXBITS * coins())
  assert.equal(two.image, one.image)
  assert.equal(two.floor, one.floor)
  assert.equal(two.states, one.states)
  assert.notEqual(two.receipt, one.receipt)
  assert.equal(two.boards, one.boards * coins())
  assert.equal(two.spanPerBoard * coins(), one.spanPerBoard)
  assert.equal(one.wastes, 0)
  assert.equal(two.wastes, 0)
  assert.equal(one.spanPerBoard * one.boards, HANDLE_SPAN)
})

test('the firmware receipt recomputes; a different board count is a different receipt', () => {
  const F = minerFirmware()
  assert.equal(minerFirmware().receipt, F.receipt)
  assert.notEqual(minerFirmware(F.boards + 1).receipt, F.receipt)
})

test('upgradeFirmware loads the live image onto every affected seat immediately', () => {
  const os = bootOS()
  const F = minerFirmware()
  const U = upgradeFirmware()
  assert.equal(U.image, os.receipt)
  assert.equal(U.image, F.image)
  assert.equal(U.boards, HANDLE_HEXBITS)
  assert.equal(U.boardsUpgraded, U.boards)
  assert.equal(U.search, 0)
  assert.equal(U.groverFloorBits, GROVER_FLOOR_BITS)
  assert.equal(U.groverFloorBits, UUID_BITS)
  assert.equal(U.digestBits / U.verifyBits, coins())
  assert.equal(U.shor.handleFits, true)
  assert.equal(U.shor.uuidFits, true)
  assert.equal(U.immediate, true)
  assert.equal(U.upgraded, U.affected)
  assert.equal(U.seats.length, LANES.length)
  const qpu = U.seats.find((s) => s.name === 'QPU')
  const vm = U.seats.find((s) => s.name === 'VM')
  const cpu = U.seats.find((s) => s.name === 'CPU')
  const gpu = U.seats.find((s) => s.name === 'GPU')
  assert.equal(cpu?.upgraded, true)
  assert.equal(gpu?.upgraded, true)
  assert.equal(qpu?.upgraded, true)
  assert.equal(vm?.upgraded, true)
  assert.equal(U.skipped, 0)
  assert.equal(upgradeFirmware().receipt, U.receipt)
})

test('uuidna_os hooks the firmware upgrade — same image as the boot receipt', () => {
  const os = callTool('uuidna_os', {}) as { receipt: string; firmware: ReturnType<typeof upgradeFirmware>; capacity: { shor: { encoderQubits: number } } }
  const U = upgradeFirmware()
  assert.equal(os.firmware.image, os.receipt)
  assert.equal(os.firmware.receipt, U.receipt)
  assert.equal(os.firmware.immediate, true)
  assert.equal(os.firmware.shor.encoderQubits, os.capacity.shor.encoderQubits)
})
