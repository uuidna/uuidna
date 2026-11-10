import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SociologyFormulas } from './index.js'
import '../../mcp/families.js'

test('sociology: gini, mobility, network, cohesion, segregation, participation, diffusion, cohort — crossing to econ', async (t) => {
  assert.equal(SociologyFormulas.gini(20, 100).value, 20, 'the top fifth')
  assert.equal(SociologyFormulas.mobility(30, 100).value, 30)
  assert.equal(SociologyFormulas.network(5, 10).value, 100, 'a complete graph is fully dense')
  assert.equal(SociologyFormulas.cohesion(50, 10).value, 5, 'five ties a member')
  assert.equal(SociologyFormulas.segregation(40, 100).value, 40)
  assert.equal(SociologyFormulas.participation(60, 100).value, 60)
  assert.equal(SociologyFormulas.diffusion(25, 100).value, 25)
  assert.equal(SociologyFormulas.cohort(42).value, 42)
  assert.equal(SociologyFormulas.gini(20, 100).dst, 'econ')
  assert.equal(hexFamiliesOf().get('sociology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sociology', program: ['gini'], params: [20, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `sociology.gini at ${uuid}`)
  uuidReceiptOf('sociology gini', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gini 20, mobility 30, network 100, cohesion 5, segregation 40, participation 60, diffusion 25, cohort 42; crossing to econ')
})
