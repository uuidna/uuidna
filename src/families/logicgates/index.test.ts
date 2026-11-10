import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LogicgatesFormulas } from './index.js'
import '../../mcp/families.js'

test('logicgates: and, or, xor, nand, nor, mux, fanout, propagation — crossing to electronics', async (t) => {
  assert.equal(LogicgatesFormulas.and(1, 1).value, 1, 'both bits set')
  assert.equal(LogicgatesFormulas.or(1, 0).value, 1)
  assert.equal(LogicgatesFormulas.xor(1, 1).value, 0, 'equal bits cancel')
  assert.equal(LogicgatesFormulas.nand(1, 1).value, 0)
  assert.equal(LogicgatesFormulas.nor(0, 0).value, 1, 'neither bit set')
  assert.equal(LogicgatesFormulas.mux(1, 0, 1).value, 1, 'selector picks b')
  assert.equal(LogicgatesFormulas.mux(0, 0, 1).value, 0)
  assert.equal(LogicgatesFormulas.fanout(4, 8).value, 32)
  assert.equal(LogicgatesFormulas.propagation(10, 2).value, 20, 'delay down the chain')
  assert.equal(LogicgatesFormulas.and(1, 1).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('logicgates')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'logicgates', program: ['fanout'], params: [4, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `logicgates.fanout at ${uuid}`)
  uuidReceiptOf('logicgates fanout', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; and 1, or 1, xor 0, nand 0, nor 1, mux 1, fanout 32, propagation 20; crossing to electronics')
})
