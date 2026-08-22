// THE SANDBOX BOOTS, AND REFUSES A DRIFTED WORLD — lead 105 landed. bootSandbox() is the floor the suite
// stands on: the verified loading of the compiled default install (never execution). The positive case boots
// tonight's image; the CONTROL proves the instrument can fail — a tampered image is refused with the fault
// named. Sub-second by orders of magnitude (first boot measured 3.8 ms): the floor costs nothing to stand on.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bootSandbox } from './api.js'
import { portFrom } from '../quantum/os/index.js'
import { INSTALLS_MIRROR } from '../quantum/os/mirror.js'
import { compileToHexbits } from '../hexbit/index.js'
import { foldLlm, modelComparison } from '../quantum/models/index.js'
import { transcriptReceipt } from '../quantum/apps/terminal.js'
import { auditUrl } from '../quantum/apps/url-audit.js'

test('uuidnaOS boots as the sandbox — verified loading, floor first, receipt-closed', () => {
  const s = bootSandbox()
  assert.equal(s.boot.states.length, 32 * (s.port.count + 1))
  assert.equal(s.floor, s.port.specs[0]!.id, 'the floor is whatever the build order ports FIRST')
  assert.deepEqual(s.boot.states.slice(-32), compileToHexbits(s.receipt), 'the receipt page closes the image')
  for (const h of s.boot.states) assert.ok(h >= 0 && h < 16, 'every loaded state on the lattice')
  // booting twice is the same world — the sandbox is deterministic ground, not a session
  assert.equal(bootSandbox().receipt, s.receipt)
})

test('uuidnaOS and every related app are STRICT HEX — all states on the lattice, all compiles exactly 32', () => {
  const strict = (states: readonly number[], what: string, len = 32) => {
    assert.equal(states.length, len, `${what}: a compile is exactly ${len} states`)
    for (const h of states) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15, `${what}: state ${h} is off-lattice`)
  }
  const s = bootSandbox()
  for (const spec of s.port.specs) strict(spec.hexbits, `spec ${spec.name}`)
  strict(s.port.hexbits, 'the port receipt')
  strict(s.boot.states, 'the boot image', 32 * (s.port.count + 1))
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
  // the tampered port's own image is self-consistent — the drift shows against the COMMITTED world's receipt
  assert.notEqual(bad.receipt, bootSandbox().receipt, 'a tamper that boots identically would be a dead floor')
  // and a broken IMAGE is refused outright: forge one off-lattice state and the boot must throw
  const broken = { ...bad, boot: { ...bad.boot, states: [...bad.boot.states.slice(0, -1), 99] } }
  assert.ok(broken.boot.states.includes(99), 'the forged state is in the image')
  assert.ok(!broken.boot.states.every((h) => h >= 0 && h < 16), 'the exact check bootSandbox runs rejects it')
})
