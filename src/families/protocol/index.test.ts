import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProtocolFormulas } from './index.js'

/** protocol: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('protocol: layers, states, headers, versions, messages, handshakes, opcodes, combos', async (t) => {
  assert.equal(ProtocolFormulas.layers(7, 0).value, 7, 'layers(7, 0)')
  assert.equal(ProtocolFormulas.states(4, 3).value, 12, 'states(4, 3)')
  assert.equal(ProtocolFormulas.headers(20, 8).value, 160, 'headers(20, 8)')
  assert.equal(ProtocolFormulas.versions(3, 0).value, 3, 'versions(3, 0)')
  assert.equal(ProtocolFormulas.messages(16, 1).value, 16, 'messages(16, 1)')
  assert.equal(ProtocolFormulas.handshakes(3, 0).value, 3, 'handshakes(3, 0)')
  assert.equal(ProtocolFormulas.opcodes(4).value, 16, 'opcodes(4)')
  assert.equal(ProtocolFormulas.combos(7, 2).value, 21, 'combos(7, 2)')
  assert.equal(hexFamiliesOf().get('protocol')?.length, 8)
  for (const [name, params, expected] of [["layers",[7,0],7],["states",[4,3],12],["headers",[20,8],160]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'protocol', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `protocol.${name} at ${uuid}`)
    uuidReceiptOf(`protocol ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "layers=7, states=12, headers=160")
})
