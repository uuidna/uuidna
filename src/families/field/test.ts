import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FieldFormulas } from './index.js'
import '../../mcp/families.js'

test('field: depth, group, indexed, length, localized, options, required, unique — crossing to payload', async (t) => {
  assert.equal(FieldFormulas.depth(3).value, 3)
  assert.equal(FieldFormulas.group(100, 4).value, 25, 'fields per group')
  assert.equal(FieldFormulas.indexed(3, 12).value, 25)
  assert.equal(FieldFormulas.length(40, 100).value, 1, 'value fits its max')
  assert.equal(FieldFormulas.length(140, 100).value, 0)
  assert.equal(FieldFormulas.localized(6, 12).value, 50)
  assert.equal(FieldFormulas.options(5).value, 5)
  assert.equal(FieldFormulas.required(9, 12).value, 75)
  assert.equal(FieldFormulas.unique(0).value, 1, 'no duplicates')
  assert.equal(FieldFormulas.unique(3).value, 0)
  assert.equal(FieldFormulas.required(9, 12).dst, 'payload')
  assert.equal(hexFamiliesOf().get('field')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'field', program: ['required'], params: [9, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `field.required at ${uuid}`)
  uuidReceiptOf('field required', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 3, group 25, indexed 25, length 1, localized 50, options 5, required 75, unique 1; crossing to payload')
})
