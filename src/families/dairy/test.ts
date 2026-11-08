import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DairyFormulas } from './index.js'
import '../../mcp/families.js'

test('dairy: output, butterfat, somatic, lactation, protein, conception, feedefficiency, persistency — crossing to agriculture', async (t) => {
  assert.equal(DairyFormulas.output(30000, 100).value, 300, 'litres per cow')
  assert.equal(DairyFormulas.butterfat(40, 1000).value, 4)
  assert.equal(DairyFormulas.somatic(200000, 1000).value, 200, 'cells per millilitre')
  assert.equal(DairyFormulas.lactation(305).value, 305, 'days in milk')
  assert.equal(DairyFormulas.protein(33, 1000).value, 3)
  assert.equal(DairyFormulas.conception(45, 100).value, 45, 'conception rate')
  assert.equal(DairyFormulas.feedefficiency(1500, 1000).value, 150, 'milk per feed')
  assert.equal(DairyFormulas.persistency(80, 100).value, 80)
  assert.equal(DairyFormulas.output(30000, 100).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('dairy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dairy', program: ['output'], params: [30000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `dairy.output at ${uuid}`)
  uuidReceiptOf('dairy output', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; output 300, butterfat 4, somatic 200, lactation 305, protein 3, conception 45, feedefficiency 150, persistency 80; crossing to agriculture')
})
