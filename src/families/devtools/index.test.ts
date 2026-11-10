import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DevtoolsFormulas } from './index.js'
import '../../mcp/families.js'

test('devtools: coverage, build, complexity, debt, churn, ratio, bugs, velocity — crossing to obs', async (t) => {
  assert.equal(DevtoolsFormulas.coverage(850, 1000).value, 85)
  assert.equal(DevtoolsFormulas.build(200, 3).value, 600)
  assert.equal(DevtoolsFormulas.complexity(12, 10).value, 4, 'edges − nodes + 2')
  assert.equal(DevtoolsFormulas.debt(40, 2).value, 80)
  assert.equal(DevtoolsFormulas.churn(300, 120).value, 420)
  assert.equal(DevtoolsFormulas.ratio(600, 1200).value, 50)
  assert.equal(DevtoolsFormulas.bugs(50, 8).value, 0, 'under one defect per kloc rounds down')
  assert.equal(DevtoolsFormulas.bugs(5000, 8).value, 40)
  assert.equal(DevtoolsFormulas.velocity(120, 6).value, 20)
  assert.equal(DevtoolsFormulas.coverage(850, 1000).dst, 'obs')
  assert.equal(hexFamiliesOf().get('devtools')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'devtools', program: ['complexity'], params: [12, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `devtools.complexity at ${uuid}`)
  uuidReceiptOf('devtools complexity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 85, build 600, complexity 4, debt 80, churn 420, ratio 50, bugs 40, velocity 20; crossing to obs')
})
