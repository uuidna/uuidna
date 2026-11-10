import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PacketFormulas } from './index.js'

/** packet: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('packet: mtu, payload, fragments, headerbits, throughput, checksum, flags, pairs', async (t) => {
  assert.equal(PacketFormulas.mtu(1500, 0).value, 1500, 'mtu(1500, 0)')
  assert.equal(PacketFormulas.payload(1500, 40).value, 1460, 'payload(1500, 40)')
  assert.equal(PacketFormulas.fragments(5000, 1480).value, 4, 'fragments(5000, 1480)')
  assert.equal(PacketFormulas.headerbits(20, 8).value, 160, 'headerbits(20, 8)')
  assert.equal(PacketFormulas.throughput(1000000, 1000).value, 1000, 'throughput(1000000, 1000)')
  assert.equal(PacketFormulas.checksum(65535, 256).value, 255, 'checksum(65535, 256)')
  assert.equal(PacketFormulas.flags(6).value, 64, 'flags(6)')
  assert.equal(PacketFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('packet')?.length, 8)
  for (const [name, params, expected] of [["mtu",[1500,0],1500],["payload",[1500,40],1460],["fragments",[5000,1480],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'packet', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `packet.${name} at ${uuid}`)
    uuidReceiptOf(`packet ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "mtu=1500, payload=1460, fragments=4")
})
