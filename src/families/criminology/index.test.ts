import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CriminologyFormulas } from './index.js'
import '../../mcp/families.js'

test('criminology: rate, clearance, recidivism, conviction, deterrence, victimization, severity, arrest — crossing to law', async (t) => {
  assert.equal(CriminologyFormulas.rate(500, 100000).value, 500, 'crimes per 100k')
  assert.equal(CriminologyFormulas.clearance(60, 100).value, 60)
  assert.equal(CriminologyFormulas.recidivism(40, 100).value, 40)
  assert.equal(CriminologyFormulas.conviction(80, 100).value, 80)
  assert.equal(CriminologyFormulas.deterrence(30, 100).value, 30)
  assert.equal(CriminologyFormulas.victimization(250, 100000).value, 250, 'victims per 100k')
  assert.equal(CriminologyFormulas.severity(1000, 50).value, 20, 'harm per incident')
  assert.equal(CriminologyFormulas.arrest(75, 100).value, 75)
  assert.equal(CriminologyFormulas.rate(500, 100000).dst, 'law')
  assert.equal(hexFamiliesOf().get('criminology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'criminology', program: ['clearance'], params: [60, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `criminology.clearance at ${uuid}`)
  uuidReceiptOf('criminology clearance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 500, clearance 60, recidivism 40, conviction 80, deterrence 30, victimization 250, severity 20, arrest 75; crossing to law')
})
