import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SolvencyFormulas } from './index.js'
import '../../mcp/families.js'

test('solvency: ratio, capital, margin, coverage, scr, mcr, buffer, leverage — crossing to statistics', async (t) => {
  assert.equal(SolvencyFormulas.ratio(1500, 1000).value, 150, 'assets half again over liabilities')
  assert.equal(SolvencyFormulas.capital(1500, 1000).value, 500)
  assert.equal(SolvencyFormulas.margin(1500, 1000).value, 33, 'net worth a third of assets')
  assert.equal(SolvencyFormulas.coverage(1200, 800).value, 150)
  assert.equal(SolvencyFormulas.scr(1000, 45).value, 450, 'SCR at 45% of liabilities')
  assert.equal(SolvencyFormulas.mcr(450, 25).value, 112, 'MCR at a quarter of the SCR')
  assert.equal(SolvencyFormulas.buffer(1200, 800).value, 400)
  assert.equal(SolvencyFormulas.buffer(500, 800).value, 0, 'no buffer below the requirement')
  assert.equal(SolvencyFormulas.leverage(2000, 1000).value, 200, 'twice the equity in debt')
  assert.equal(SolvencyFormulas.ratio(1500, 1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('solvency')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'solvency', program: ['ratio'], params: [1500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `solvency.ratio at ${uuid}`)
  uuidReceiptOf('solvency ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 150, capital 500, margin 33, coverage 150, scr 450, mcr 112, buffer 400, leverage 200; crossing to statistics')
})
