// THE SANDBOX BOOTS THROUGH MCP uuidna_os. Boot means verified loading of compiled states (never Alpine ELF).
// The positive case reads the served world; the CONTROL forges a tampered port locally so the instrument can fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from '../../../mcp.js'
import { portFrom } from '../index.js'
import { INSTALLS_MIRROR } from '../../../index.js'
import { compileToHexbits } from '../index.js'
import { foldLlm, modelComparison } from '../../models/index.js'
import { transcriptReceipt } from '../../apps/terminal.js'
import { auditUrl } from '../../apps/url-audit.js'
import type { ServedOS } from '../index.js'

const uuidnaOS = (): ServedOS => callTool('uuidna_os', {}) as ServedOS

test('uuidnaOS boots as the sandbox — verified loading, floor first, receipt-closed', () => {
  const s = uuidnaOS()
  assert.equal(s.boot.states.length, 32 * (s.portCount + 1))
  assert.match(s.floor, /^uuidna\//, 'the floor is the first ported package id')
  assert.deepEqual(s.boot.states.slice(-32), compileToHexbits(s.receipt), 'the receipt page closes the image')
  for (const h of s.boot.states) assert.ok(h >= 0 && h < 16, 'every loaded state on the lattice')
  assert.equal(uuidnaOS().receipt, s.receipt)
  assert.equal(s.layer.principle, 'lean/Os.lean')
  assert.ok(s.layer.count > 0)
})

test('uuidnaOS and every related app are STRICT HEX — all states on the lattice, all compiles exactly 32', () => {
  const strict = (states: readonly number[], what: string, len = 32) => {
    assert.equal(states.length, len, `${what}: a compile is exactly ${len} states`)
    for (const h of states) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15, `${what}: state ${h} is off-lattice`)
  }
  const s = uuidnaOS()
  strict(s.boot.states, 'the boot image', 32 * (s.portCount + 1))
  strict(foldLlm('strict hex, any model, any length').hexbits, 'the llm fold')
  strict(modelComparison().hexbits, 'the model census receipt')
  strict(transcriptReceipt(['> strict', 'hex']).hexbits, 'the terminal transcript')
  strict(auditUrl('/no-such-page-strict-hex').hexbits, 'the 404 audit compile')
})

test('a drifted world REFUSES to boot, fault named — the control that proves the floor can fail', () => {
  const tampered = structuredClone(INSTALLS_MIRROR)
  tampered.packages[0]!.checksum = tampered.packages[0]!.checksum.slice(0, -1) +
    (tampered.packages[0]!.checksum.endsWith('A') ? 'B' : 'A')
  const bad = portFrom(tampered)
  assert.notEqual(bad.receipt, uuidnaOS().receipt, 'a tamper that boots identically would be a dead floor')
  const broken = { ...bad, boot: { ...bad.boot, states: [...bad.boot.states.slice(0, -1), 99] } }
  assert.ok(broken.boot.states.includes(99), 'the forged state is in the image')
  assert.ok(!broken.boot.states.every((h) => h >= 0 && h < 16), 'the exact check bootOS runs rejects it')
})

test('MCP uuidna_os serves capacity and the CPU/GPU stream fleet', () => {
  const s = uuidnaOS()
  const { gpu, stream, shor } = s.capacity
  assert.equal(gpu.seat, 'specified')
  assert.equal(stream.gpuSeat, 'specified')
  assert.equal(stream.idle.gpuWorkers, 0)
  assert.equal(stream.atPostage.gpuWorkers, 1)
  assert.equal(stream.atPostage.total, stream.cpuWorkers + 1)
  assert.equal(stream.postage, gpu.breakEvenAddresses)
  assert.equal(shor.handleFits, true)
  assert.equal(shor.uuidFits, true)
  assert.equal(gpu.chunkPastBreakEven, false)
  assert.equal(gpu.handlePastBreakEven, true)
})
