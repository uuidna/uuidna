import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GravimetryFormulas } from './index.js'
import '../../mcp/families.js'

test('gravimetry: anomaly, freeaircorrection, bouguercorrection, densitycontrast, gradient, stationspacing, terraincorrection, surveypoints — crossing to geology', async (t) => {
  assert.equal(GravimetryFormulas.anomaly(9810, 9805).value, 5)
  assert.equal(GravimetryFormulas.freeaircorrection(3, 100).value, 300)
  assert.equal(GravimetryFormulas.bouguercorrection(1, 110).value, 110)
  assert.equal(GravimetryFormulas.densitycontrast(2700, 2300).value, 400)
  assert.equal(GravimetryFormulas.gradient(500, 10).value, 50)
  assert.equal(GravimetryFormulas.stationspacing(10000, 100).value, 100)
  assert.equal(GravimetryFormulas.terraincorrection(200, 4).value, 50)
  assert.equal(GravimetryFormulas.surveypoints(50, 20).value, 1000)
  assert.equal(GravimetryFormulas.anomaly(9810, 9805).dst, 'geology')
  assert.equal(hexFamiliesOf().get('gravimetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gravimetry', program: ['anomaly'], params: [9810, 9805] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `gravimetry.anomaly at ${uuid}`)
  uuidReceiptOf('gravimetry anomaly', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; anomaly 5, freeaircorrection 300, bouguercorrection 110, densitycontrast 400, gradient 50, stationspacing 100, terraincorrection 50, surveypoints 1000; crossing to geology')
})
