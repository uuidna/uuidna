import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FormsFormulas } from './index.js'
import '../../mcp/families.js'

test('forms: completion, abandonment, fields, conversion, validation, time, response, dropoff — crossing to cross', async (t) => {
  assert.equal(FormsFormulas.completion(750, 1000).value, 75)
  assert.equal(FormsFormulas.abandonment(250, 1000).value, 25)
  assert.equal(FormsFormulas.fields(3, 12).value, 25)
  assert.equal(FormsFormulas.conversion(120, 1000).value, 12)
  assert.equal(FormsFormulas.validation(45, 300).value, 15)
  assert.equal(FormsFormulas.time(6000, 100).value, 60, 'seconds per submission')
  assert.equal(FormsFormulas.response(880, 1000).value, 88)
  assert.equal(FormsFormulas.dropoff(40, 500).value, 8)
  assert.equal(FormsFormulas.completion(750, 1000).dst, 'cross')
  assert.equal(hexFamiliesOf().get('forms')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'forms', program: ['completion'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `forms.completion at ${uuid}`)
  uuidReceiptOf('forms completion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; completion 75, abandonment 25, fields 25, conversion 12, validation 15, time 60, response 88, dropoff 8; crossing to cross')
})
