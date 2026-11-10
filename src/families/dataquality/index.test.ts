import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DataqualityFormulas } from './index.js'
import '../../mcp/families.js'

test('dataquality: accuracy, completeness, consistency, duplicaterate, freshness, nullrate, uniqueness, validity — crossing to statistics', async (t) => {
  assert.equal(DataqualityFormulas.accuracy(20, 1000).value, 98, 'twenty bad rows in a thousand')
  assert.equal(DataqualityFormulas.completeness(950, 1000).value, 95)
  assert.equal(DataqualityFormulas.consistency(880, 1000).value, 88)
  assert.equal(DataqualityFormulas.duplicaterate(30, 1000).value, 3)
  assert.equal(DataqualityFormulas.freshness(500, 450).value, 50, 'rows fifty units stale')
  assert.equal(DataqualityFormulas.nullrate(50, 1000).value, 5)
  assert.equal(DataqualityFormulas.uniqueness(900, 1000).value, 90)
  assert.equal(DataqualityFormulas.validity(970, 1000).value, 97)
  assert.equal(DataqualityFormulas.completeness(950, 1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('dataquality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dataquality', program: ['completeness'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `dataquality.completeness at ${uuid}`)
  uuidReceiptOf('dataquality completeness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; accuracy 98, completeness 95, consistency 88, duplicaterate 3, freshness 50, nullrate 5, uniqueness 90, validity 97; crossing to statistics')
})
