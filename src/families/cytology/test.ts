import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CytologyFormulas } from './index.js'
import '../../mcp/families.js'

test('cytology: mitosis, ratio, viability, confluence, apoptosis, doubling, diameter, passage — crossing to med', async (t) => {
  assert.equal(CytologyFormulas.mitosis(5, 200).value, 2, 'mitotic index per hundred')
  assert.equal(CytologyFormulas.ratio(30, 20).value, 150)
  assert.equal(CytologyFormulas.viability(950, 1000).value, 95)
  assert.equal(CytologyFormulas.confluence(80, 100).value, 80, 'percent covered')
  assert.equal(CytologyFormulas.apoptosis(15, 300).value, 5)
  assert.equal(CytologyFormulas.doubling(8000, 1000).value, 8, 'eightfold')
  assert.equal(CytologyFormulas.diameter(12).value, 12)
  assert.equal(CytologyFormulas.passage(7).value, 7)
  assert.equal(CytologyFormulas.mitosis(5, 200).dst, 'med')
  assert.equal(hexFamiliesOf().get('cytology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cytology', program: ['viability'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `cytology.viability at ${uuid}`)
  uuidReceiptOf('cytology viability', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mitosis 2, ratio 150, viability 95, confluence 80, apoptosis 5, doubling 8, diameter 12, passage 7; crossing to med')
})
