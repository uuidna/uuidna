import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CastingFormulas } from './index.js'
import '../../mcp/families.js'

test('casting: shrinkage, pouringtime, solidification, yield, risering, gatingratio, fluidity, coolingrate — crossing to manufacturing', async (t) => {
  assert.equal(CastingFormulas.shrinkage(1010, 1000).value, 10, 'the dimension lost from hot to cold')
  assert.equal(CastingFormulas.shrinkage(1000, 1010).value, 0)
  assert.equal(CastingFormulas.pouringtime(1000, 50).value, 20, 'seconds to fill the mould')
  assert.equal(CastingFormulas.solidification(100, 10).value, 100, "Chvorinov's modulus squared")
  assert.equal(CastingFormulas.yield(80, 100).value, 80)
  assert.equal(CastingFormulas.risering(1000, 30).value, 300, 'the riser volume')
  assert.equal(CastingFormulas.gatingratio(40, 10).value, 4)
  assert.equal(CastingFormulas.fluidity(50, 3).value, 150, 'flow length from superheat')
  assert.equal(CastingFormulas.coolingrate(600, 60).value, 10, 'degrees per second')
  assert.equal(CastingFormulas.shrinkage(1010, 1000).dst, 'manufacturing')
  assert.equal(hexFamiliesOf().get('casting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'casting', program: ['pouringtime'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `casting.pouringtime at ${uuid}`)
  uuidReceiptOf('casting pouringtime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shrinkage 10, pouringtime 20, solidification 100, yield 80, risering 300, gatingratio 4, fluidity 150, coolingrate 10; crossing to manufacturing')
})
