import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpinningFormulas } from './index.js'
import '../../mcp/families.js'

test('spinning: count, twist, denier, tenacity, draft, yield, evenness, tex — crossing to materials', async (t) => {
  assert.equal(SpinningFormulas.count(1000, 20).value, 50, 'fifty hanks to the pound')
  assert.equal(SpinningFormulas.twist(600, 30).value, 20, 'twenty turns per inch')
  assert.equal(SpinningFormulas.denier(5, 450).value, 100)
  assert.equal(SpinningFormulas.tenacity(900, 100).value, 9)
  assert.equal(SpinningFormulas.draft(800, 100).value, 8, 'an eightfold draft')
  assert.equal(SpinningFormulas.yield(950, 1000).value, 95)
  assert.equal(SpinningFormulas.evenness(12, 100).value, 88, 'even yarn')
  assert.equal(SpinningFormulas.evenness(200, 100).value, 0)
  assert.equal(SpinningFormulas.tex(40, 1000).value, 40)
  assert.equal(SpinningFormulas.count(1000, 20).dst, 'materials')
  assert.equal(hexFamiliesOf().get('spinning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'spinning', program: ['draft'], params: [800, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `spinning.draft at ${uuid}`)
  uuidReceiptOf('spinning draft', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; count 50, twist 20, denier 100, tenacity 9, draft 8, yield 95, evenness 88, tex 40; crossing to materials')
})
