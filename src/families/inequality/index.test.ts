import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InequalityFormulas } from './index.js'
import '../../mcp/families.js'

test('inequality: giniscaled, quintileratio, palmaratio, lorenzgap, percentilepairs, topshare, deciles, theilindex — crossing to statistics', async (t) => {
  assert.equal(InequalityFormulas.giniscaled(40, 1).value, 40)
  assert.equal(InequalityFormulas.quintileratio(800, 100).value, 8)
  assert.equal(InequalityFormulas.palmaratio(200, 100).value, 2)
  assert.equal(InequalityFormulas.lorenzgap(50, 40).value, 10)
  assert.equal(InequalityFormulas.percentilepairs(10, 2).value, 45)
  assert.equal(InequalityFormulas.topshare(20, 100).value, 20)
  assert.equal(InequalityFormulas.deciles(10, 0).value, 10)
  assert.equal(InequalityFormulas.theilindex(350, 100).value, 3)
  assert.equal(InequalityFormulas.giniscaled(40, 1).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('inequality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'inequality', program: ['giniscaled'], params: [40, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `inequality.giniscaled at ${uuid}`)
  uuidReceiptOf('inequality giniscaled', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; giniscaled 40, quintileratio 8, palmaratio 2, lorenzgap 10, percentilepairs 45, topshare 20, deciles 10, theilindex 3; crossing to statistics')
})
