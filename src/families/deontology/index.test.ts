import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DeontologyFormulas } from './index.js'
import '../../mcp/families.js'

test('deontology: duties, maximorderings, dutypairs, universalizability, imperativesubsets, obligationchains, rightsduties, conflictcount — crossing to philosophy', async (t) => {
  assert.equal(DeontologyFormulas.duties(7, 3).value, 10)
  assert.equal(DeontologyFormulas.maximorderings(4).value, 24)
  assert.equal(DeontologyFormulas.dutypairs(10, 2).value, 45)
  assert.equal(DeontologyFormulas.universalizability(80, 100).value, 80)
  assert.equal(DeontologyFormulas.imperativesubsets(4).value, 16)
  assert.equal(DeontologyFormulas.obligationchains(5, 2).value, 20)
  assert.equal(DeontologyFormulas.rightsduties(5, 2).value, 10)
  assert.equal(DeontologyFormulas.conflictcount(12, 8).value, 4)
  assert.equal(DeontologyFormulas.duties(7, 3).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('deontology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'deontology', program: ['duties'], params: [7, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `deontology.duties at ${uuid}`)
  uuidReceiptOf('deontology duties', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; duties 10, maximorderings 24, dutypairs 45, universalizability 80, imperativesubsets 16, obligationchains 20, rightsduties 10, conflictcount 4; crossing to philosophy')
})
