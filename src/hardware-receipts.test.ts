// hardware-receipts — THE MACHINE THAT COMPUTED IT, MEASURED IN THE BUILD. The quantum simulator and the MCP run on a
// classical host; the receipts they keep carry that host's readings (scripts/device-readings.ts, mcp.ts hostHardware).
// This holds the readings to an instrument that did not produce them, seals a receipt over them by the 2×7 witnesses,
// and shows a changed reading moves the receipt. It proves the classical hardware; it claims no quantum hardware.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import { spawnSync } from 'node:child_process'
import { hostHardware, callTool } from './mcp.js'
import { deviceReadings, momentReadings } from './scripts/device-readings.js'
import { receiptSealOf } from './refusal-trials.js'
import { gpuPresence } from './os/gpu/index.js'
import { UUID } from './test-api.js'

const READINGS = deviceReadings()

test('the identity readings agree with an instrument that did not produce them', () => {
  assert.match(READINGS.address, UUID)
  assert.equal(READINGS.logicalCores, os.cpus().length)
  assert.equal(READINGS.memoryBytes, os.totalmem())
  // a second instrument: the kernel's own count, asked by a separate command
  const asked = os.platform() === 'darwin' ? spawnSync('sysctl', ['-n', 'hw.logicalcpu'], { encoding: 'utf8' }) : spawnSync('nproc', [], { encoding: 'utf8' })
  if (asked.status === 0) assert.equal(Number(asked.stdout.trim()), READINGS.logicalCores)
})

test('every temperature is measured within physical bounds, or named as unmeasured with its reason — never guessed', () => {
  const m = momentReadings()
  type T = { measured: true; millikelvin: number; source: string } | { measured: false; why: string }
  const temps = [m.die, m.battery].flat().filter((t): t is T => t !== null && typeof t === 'object' && 'measured' in t)
  for (const t of temps) {
    if (t.measured) assert.ok(t.millikelvin > 200_000 && t.millikelvin < 400_000, `${t.source}: ${t.millikelvin} mK is not a machine temperature`)
    else assert.ok(t.why.length > 0, 'an unmeasured sensor names why')
  }
})

test('a receipt over the readings is sealed by the 2×7 witnesses, and a changed reading moves it', () => {
  const body = { computed: 'hardware-receipts', readings: { device: READINGS.address, cores: READINGS.logicalCores, memoryBytes: READINGS.memoryBytes } }
  const sealed = receiptSealOf(body)
  assert.equal(sealed.legal, true)
  assert.equal(sealed.signed, sealed.of)
  // CONTROL: the same receipt with one reading changed is a different receipt
  const moved = receiptSealOf({ ...body, readings: { ...body.readings, cores: body.readings.cores + 1 } })
  assert.notEqual(moved.address, sealed.address)
})

test('the evidence door serves the same machine the readings name', async () => {
  // the identity, not the reading's address: that address folds in the live temperatures, so two reads differ
  const hw = await hostHardware()
  assert.equal(hw.measured, true)
  assert.equal(hw.logicalCores, READINGS.logicalCores)
  assert.equal(hw.memoryBytes, READINGS.memoryBytes)
  const served = await callTool('uuidna_evidence', { run: 'device' }, { hardware: hostHardware }) as { device?: string; logicalCores?: number }
  assert.equal(served.device, hw.device, 'the door serves the machine the host reader identified')
  assert.equal(served.logicalCores, READINGS.logicalCores)
})

test('the accelerator is reported as found or not found, with its reason', () => {
  const g = gpuPresence()
  assert.equal(typeof g.webgpu, 'boolean')
  assert.ok(g.why.length > 0)
})
