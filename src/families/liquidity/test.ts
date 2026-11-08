import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LiquidityFormulas } from './index.js'
import '../../mcp/families.js'

test('liquidity: currentratio, quickratio, coverageratio, cashratio, workingcapital, lcr, netstablefunding, burnrate — crossing to banking', async (t) => {
  assert.equal(LiquidityFormulas.currentratio(300, 150).value, 200, 'current assets are twice the liabilities')
  assert.equal(LiquidityFormulas.quickratio(250, 100).value, 250)
  assert.equal(LiquidityFormulas.coverageratio(800, 100).value, 8, 'income covers interest eight times')
  assert.equal(LiquidityFormulas.cashratio(50, 200).value, 25)
  assert.equal(LiquidityFormulas.workingcapital(500, 300).value, 200)
  assert.equal(LiquidityFormulas.lcr(1200, 1000).value, 120, 'LCR above the 100% floor')
  assert.equal(LiquidityFormulas.netstablefunding(1100, 1000).value, 110)
  assert.equal(LiquidityFormulas.burnrate(1200, 12).value, 100, 'cash per month')
  assert.equal(LiquidityFormulas.workingcapital(300, 500).value, 0)
  assert.equal(LiquidityFormulas.currentratio(300, 150).dst, 'banking')
  assert.equal(hexFamiliesOf().get('liquidity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'liquidity', program: ['currentratio'], params: [300, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `liquidity.currentratio at ${uuid}`)
  uuidReceiptOf('liquidity currentratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; currentratio 200, quickratio 250, coverageratio 8, cashratio 25, workingcapital 200, lcr 120, netstablefunding 110, burnrate 100; crossing to banking')
})
