import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VirtualizationFormulas } from './index.js'
import '../../mcp/families.js'

test('virtualization: overcommit, density, consolidation, ballooning, vcpu, allocation, overhead, migration — crossing to concurrency', async (t) => {
  assert.equal(VirtualizationFormulas.overcommit(32, 8).value, 400, '4x overcommit as a percentage')
  assert.equal(VirtualizationFormulas.density(65536, 2048).value, 32, 'guests per host')
  assert.equal(VirtualizationFormulas.consolidation(100, 8).value, 13, 'hosts for the fleet')
  assert.equal(VirtualizationFormulas.ballooning(4096, 1024).value, 3072)
  assert.equal(VirtualizationFormulas.vcpu(2, 8, 2).value, 32, 'total vCPUs on the board')
  assert.equal(VirtualizationFormulas.allocation(16, 2048).value, 32768)
  assert.equal(VirtualizationFormulas.overhead(512, 2048).value, 25)
  assert.equal(VirtualizationFormulas.migration(16384, 1024).value, 16, 'seconds to move the guest')
  assert.equal(VirtualizationFormulas.ballooning(512, 1024).value, 0, 'never negative')
  assert.equal(VirtualizationFormulas.overcommit(32, 8).dst, 'concurrency')
  assert.equal(hexFamiliesOf().get('virtualization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'virtualization', program: ['overcommit'], params: [32, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `virtualization.overcommit at ${uuid}`)
  uuidReceiptOf('virtualization overcommit', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; overcommit 400, density 32, consolidation 13, ballooning 3072, vcpu 32, allocation 32768, overhead 25, migration 16; crossing to concurrency')
})
