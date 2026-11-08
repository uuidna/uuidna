import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RationalismFormulas } from './index.js'
import '../../mcp/families.js'

test('rationalism: axioms, deductionchains, innateideas, proofpaths, premisesubsets, inferencepairs, aprioriratio, necessitylevels — crossing to logic', async (t) => {
  assert.equal(RationalismFormulas.axioms(5, 0).value, 5)
  assert.equal(RationalismFormulas.deductionchains(5).value, 120)
  assert.equal(RationalismFormulas.innateideas(3, 2).value, 6)
  assert.equal(RationalismFormulas.proofpaths(6, 3).value, 120)
  assert.equal(RationalismFormulas.premisesubsets(5).value, 32)
  assert.equal(RationalismFormulas.inferencepairs(8, 2).value, 28)
  assert.equal(RationalismFormulas.aprioriratio(80, 100).value, 80)
  assert.equal(RationalismFormulas.necessitylevels(3, 1).value, 4)
  assert.equal(RationalismFormulas.axioms(5, 0).dst, 'logic')
  assert.equal(hexFamiliesOf().get('rationalism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rationalism', program: ['axioms'], params: [5, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `rationalism.axioms at ${uuid}`)
  uuidReceiptOf('rationalism axioms', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; axioms 5, deductionchains 120, innateideas 6, proofpaths 120, premisesubsets 32, inferencepairs 28, aprioriratio 80, necessitylevels 4; crossing to logic')
})
