import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NumismaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('numismatics: coincount, mintcombos, denominationorderings, hoardsize, weightgrains, purity, dierotations, varietysubsets — crossing to archaeology', async (t) => {
  assert.equal(NumismaticsFormulas.coincount(500, 10).value, 5000)
  assert.equal(NumismaticsFormulas.mintcombos(12, 3).value, 220)
  assert.equal(NumismaticsFormulas.denominationorderings(5).value, 120)
  assert.equal(NumismaticsFormulas.hoardsize(400, 100).value, 500)
  assert.equal(NumismaticsFormulas.weightgrains(60, 4).value, 240)
  assert.equal(NumismaticsFormulas.purity(900, 1000).value, 90)
  assert.equal(NumismaticsFormulas.dierotations(360, 12).value, 30)
  assert.equal(NumismaticsFormulas.varietysubsets(6).value, 64)
  assert.equal(NumismaticsFormulas.coincount(500, 10).dst, 'archaeology')
  assert.equal(hexFamiliesOf().get('numismatics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'numismatics', program: ['coincount'], params: [500, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `numismatics.coincount at ${uuid}`)
  uuidReceiptOf('numismatics coincount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coincount 5000, mintcombos 220, denominationorderings 120, hoardsize 500, weightgrains 240, purity 90, dierotations 30, varietysubsets 64; crossing to archaeology')
})
