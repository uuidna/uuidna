import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HookFormulas } from './index.js'
import '../../mcp/families.js'

test('hook: chain, latency, order, mutations, failures, depth, coverage, fired — crossing to payload', async (t) => {
  assert.equal(HookFormulas.chain(6, 100).value, 600, 'six hooks per document across a hundred docs')
  assert.equal(HookFormulas.latency(5000, 100).value, 50)
  assert.equal(HookFormulas.order(3, 6).value, 1, 'in order')
  assert.equal(HookFormulas.order(7, 6).value, 0)
  assert.equal(HookFormulas.mutations(3, 12).value, 25)
  assert.equal(HookFormulas.failures(5, 100).value, 5)
  assert.equal(HookFormulas.depth(3).value, 3)
  assert.equal(HookFormulas.coverage(8, 10).value, 80)
  assert.equal(HookFormulas.fired(10, 6).value, 60)
  assert.equal(HookFormulas.chain(6, 100).dst, 'payload')
  assert.equal(hexFamiliesOf().get('hook')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hook', program: ['chain'], params: [6, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `hook.chain at ${uuid}`)
  uuidReceiptOf('hook chain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chain 600, latency 50, order 1, mutations 25, failures 5, depth 3, coverage 80, fired 60; crossing to payload')
})
