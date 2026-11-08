import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CloudflareFormulas } from './index.js'
import '../../mcp/families.js'

test('cloudflare: the Worker binding surface and its combinatorial usage — crossing to cloud', async (t) => {
  assert.equal(CloudflareFormulas.bindings().value, 22, 'the binding types')
  assert.equal(CloudflareFormulas.subsets(22).value, 4194304, '2^22 subsets of the binding surface')
  assert.equal(CloudflareFormulas.usage(22).value, 4194303, '2^22 − 1 non-empty compositions')
  assert.equal(CloudflareFormulas.pairs(22).value, 231, 'C(22,2) binding pairs')
  assert.equal(CloudflareFormulas.triples(22).value, 1540, 'C(22,3) binding triples')
  assert.equal(CloudflareFormulas.choose(22, 3).value, 1540, 'C(22,3)')
  assert.equal(CloudflareFormulas.choose(5, 2).value, 10, 'C(5,2)')
  assert.equal(CloudflareFormulas.ordered(5, 2).value, 20, 'P(5,2) ordered pipelines')
  assert.equal(CloudflareFormulas.apis(22, 8).value, 176, 'API method surface')
  assert.equal(CloudflareFormulas.storage().value, 3, 'kv, r2, d1')
  assert.equal(CloudflareFormulas.stateful().value, 6, 'the stateful bindings')
  assert.equal(CloudflareFormulas.compute().value, 6, 'the compute bindings')
  assert.equal(CloudflareFormulas.pipeline(4, 3).value, 12, 'stages × bindings')
  assert.equal(CloudflareFormulas.fanout(3, 5).value, 15, 'producers × consumers')
  assert.equal(CloudflareFormulas.subrequests().value, 1000, 'the paid subrequest ceiling')
  assert.equal(CloudflareFormulas.reach(22, 300).value, 6600, 'bindings across colos')
  assert.equal(CloudflareFormulas.subsets(22).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('cloudflare')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'cloudflare', program: ['choose'], params: [5, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `cloudflare.choose at ${uuid}`)
  uuidReceiptOf('cloudflare choose', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; 22 bindings, 2^22 subsets, usage 4194303, pairs 231, triples 1540, choose/ordered, apis 176, storage 3, stateful 6, compute 6, subrequests 1000, reach 6600; crossing to cloud')
})
