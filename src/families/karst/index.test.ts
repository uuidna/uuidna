import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KarstFormulas } from './index.js'
import '../../mcp/families.js'

test('karst: cavelength, dissolutionrate, sinkholedensity, conduitpairs, porosity, rechargerate, passageorderings, aquiferdepth — crossing to geology', async (t) => {
  assert.equal(KarstFormulas.cavelength(2000, 3).value, 6000)
  assert.equal(KarstFormulas.dissolutionrate(100, 10).value, 10)
  assert.equal(KarstFormulas.sinkholedensity(500, 50).value, 10)
  assert.equal(KarstFormulas.conduitpairs(10, 2).value, 45)
  assert.equal(KarstFormulas.porosity(30, 100).value, 30)
  assert.equal(KarstFormulas.rechargerate(6000, 60).value, 100)
  assert.equal(KarstFormulas.passageorderings(5).value, 120)
  assert.equal(KarstFormulas.aquiferdepth(300, 50).value, 250)
  assert.equal(KarstFormulas.cavelength(2000, 3).dst, 'geology')
  assert.equal(hexFamiliesOf().get('karst')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'karst', program: ['cavelength'], params: [2000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `karst.cavelength at ${uuid}`)
  uuidReceiptOf('karst cavelength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cavelength 6000, dissolutionrate 10, sinkholedensity 10, conduitpairs 45, porosity 30, rechargerate 100, passageorderings 120, aquiferdepth 250; crossing to geology')
})
