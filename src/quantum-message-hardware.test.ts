// quantum-message-hardware — the computing machine's measured hardware state is bound into every message for forensics,
// and a message without one is never minted (measured always true); each rule has a control that must fire.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encodeMessage, serializeMessage, bindHardware } from './quantum/message/index.js'
import { handleMcpRpc } from './mcp-http.js'
import { theorems } from './index.js'

const key = theorems()[0]!.key
const base = serializeMessage(encodeMessage('court observation', key))
const machine = { measured: true, surface: 'stdio host', model: 'MacBookPro18,2', die: [{ measured: true, millikelvin: 325827, source: 'die sensor PMU tdev7' }], battery: { measured: true, millikelvin: 303610 } }

test('the measured state is bound verbatim and folded into the message identity', () => {
  const m = bindHardware(base, machine)
  assert.deepEqual(m.hardware.computedOn, machine)
  assert.equal(m.hardware.computedOn.measured, true)
  assert.equal(m.witnessFold, base.fold)
  assert.notEqual(m.fold, base.fold, 'binding the hardware must change the fold')
  assert.equal(bindHardware(base, machine).fold, m.fold, 'the same state binds to the same fold — recomputable by anyone')
  assert.doesNotThrow(() => JSON.stringify(m), 'the bound message must travel as JSON')
})

test('caller-supplied readings are bound alongside the measured state', () => {
  const extra = { lab: 'ambient 21.0 C' }
  const m = bindHardware(base, machine, extra)
  assert.deepEqual(m.hardware.supplied, extra)
  assert.notEqual(m.fold, bindHardware(base, machine).fold)
})

test('CONTROL: one altered reading changes the hardware address and the fold', () => {
  const forged = bindHardware(base, { ...machine, battery: { measured: true, millikelvin: 303611 } })
  assert.notEqual(forged.hardwareAddress, bindHardware(base, machine).hardwareAddress)
  assert.notEqual(forged.fold, bindHardware(base, machine).fold)
})

test('CONTROL: no measurement, or a state not marked measured, mints nothing', () => {
  for (const none of [undefined, null, {}, { measured: false }, { measured: 'true' }]) {
    assert.throws(() => bindHardware(base, none as never), /measured always true/)
  }
})

test('the door measures through its surface, and refuses when no surface measures', async () => {
  const call = (ctx?: Parameters<typeof handleMcpRpc>[1]) =>
    Promise.resolve(handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_quantum_message', arguments: { plaintext: 'court observation', theoremKey: key } } }, ctx)) as
      Promise<{ result: { content: { text: string }[]; isError?: boolean } }>
  const measured = await call({ hardware: () => machine })
  const m = JSON.parse(measured.result.content[0]!.text) as { hardware: { computedOn: { measured: boolean; surface: string } } }
  assert.equal(m.hardware.computedOn.measured, true)
  assert.equal(m.hardware.computedOn.surface, 'stdio host')
  const refused = await call()
  assert.equal(refused.result.isError, true)
  assert.match(refused.result.content[0]!.text, /measured always true/)
})
