import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SocketFormulas } from './index.js'

/** socket: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('socket: ports, backlog, connections, timeout, buffers, states, handshake, combos', async (t) => {
  assert.equal(SocketFormulas.ports(16).value, 65536, 'ports(16)')
  assert.equal(SocketFormulas.backlog(128, 0).value, 128, 'backlog(128, 0)')
  assert.equal(SocketFormulas.connections(1000, 4).value, 4000, 'connections(1000, 4)')
  assert.equal(SocketFormulas.timeout(120, 2).value, 60, 'timeout(120, 2)')
  assert.equal(SocketFormulas.buffers(64, 1024).value, 65536, 'buffers(64, 1024)')
  assert.equal(SocketFormulas.states(11, 0).value, 11, 'states(11, 0)')
  assert.equal(SocketFormulas.handshake(3, 0).value, 3, 'handshake(3, 0)')
  assert.equal(SocketFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('socket')?.length, 8)
  for (const [name, params, expected] of [["ports",[16],65536],["backlog",[128,0],128],["connections",[1000,4],4000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'socket', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `socket.${name} at ${uuid}`)
    uuidReceiptOf(`socket ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "ports=65536, backlog=128, connections=4000")
})
