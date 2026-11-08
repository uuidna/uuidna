import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrevalenceFormulas } from './index.js'
import '../../mcp/families.js'

test('prevalence: adjustedrate, burden, caseload, confidencewidth, lifetimeprevalence, periodprevalence, pointprevalence, ratio — crossing to statistics', async (t) => {
  assert.equal(PrevalenceFormulas.adjustedrate(150, 120, 100).value, 125, 'standardised to the expected count')
  assert.equal(PrevalenceFormulas.burden(1200, 20).value, 24000)
  assert.equal(PrevalenceFormulas.caseload(500, 60000).value, 300, 'cases a rate implies')
  assert.equal(PrevalenceFormulas.confidencewidth(520, 480).value, 40)
  assert.equal(PrevalenceFormulas.confidencewidth(480, 520).value, 0)
  assert.equal(PrevalenceFormulas.lifetimeprevalence(2500, 10000).value, 25)
  assert.equal(PrevalenceFormulas.periodprevalence(300, 200, 50000).value, 1000, 'existing plus new per 100,000')
  assert.equal(PrevalenceFormulas.pointprevalence(50, 20000).value, 250, 'cases at an instant per 100,000')
  assert.equal(PrevalenceFormulas.ratio(40, 25).value, 160)
  assert.equal(PrevalenceFormulas.pointprevalence(50, 20000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('prevalence')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'prevalence', program: ['pointprevalence'], params: [50, 20000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `prevalence.pointprevalence at ${uuid}`)
  uuidReceiptOf('prevalence pointprevalence', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; adjustedrate 125, burden 24000, caseload 300, confidencewidth 40, lifetimeprevalence 25, periodprevalence 1000, pointprevalence 250, ratio 160; crossing to statistics')
})
