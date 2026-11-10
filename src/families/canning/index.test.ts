import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CanningFormulas } from './index.js'
import '../../mcp/families.js'

test('canning: headspace, processtime, fvalue, yield, brine, seal, batch, sterilize — crossing to cuisine', async (t) => {
  assert.equal(CanningFormulas.headspace(500, 450).value, 50, 'half a centimetre of room')
  assert.equal(CanningFormulas.processtime(10, 2, 7).value, 24)
  assert.equal(CanningFormulas.fvalue(3, 20).value, 60, 'accumulated lethality')
  assert.equal(CanningFormulas.yield(1000, 15).value, 850)
  assert.equal(CanningFormulas.brine(2000, 5).value, 100, 'a 5% salt brine')
  assert.equal(CanningFormulas.seal(24, 25).value, 96)
  assert.equal(CanningFormulas.batch(100, 12).value, 9, 'nine batches for the harvest')
  assert.equal(CanningFormulas.sterilize(121, 116).value, 1, 'reaches sterilizing heat')
  assert.equal(CanningFormulas.sterilize(100, 116).value, 0)
  assert.equal(CanningFormulas.headspace(500, 450).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('canning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'canning', program: ['batch'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `canning.batch at ${uuid}`)
  uuidReceiptOf('canning batch', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; headspace 50, processtime 24, fvalue 60, yield 850, brine 100, seal 96, batch 9, sterilize 1; crossing to cuisine')
})
