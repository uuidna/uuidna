import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PayloadFormulas } from './index.js'
import '../../mcp/families.js'

/** The lattice imagines Payload collections: a family becomes a collection whose formulas are number fields. */
test('payload: imagine a Payload collection from a family — formulas as fields, court hooks, standing access', async (t) => {
  const im = (PayloadFormulas.imagine(0)) as unknown as { value: number; holds: boolean; family: string; collection: { slug: string; fields: { name: string; type: string }[]; hooks: { beforeChange: string[] }; access: Record<string, string> } }
  assert.equal(im.holds, true, 'a collection is imagined')
  assert.equal(im.collection.slug, im.family, 'the collection slug is the family')
  assert.equal(im.value + 1, im.collection.fields.length, 'one number field per formula, plus the uuid field')
  assert.ok(im.collection.fields.every((f) => f.type === 'number' || f.name === 'uuid'), 'formulas map to number fields')
  assert.deepEqual(im.collection.hooks.beforeChange, ['courtReceipt()'], 'the court receipt hook is wired')
  assert.equal(im.collection.access.read, 'standing', 'access is the author standing')

  const fieldsOf0 = Number(PayloadFormulas.fields(0).value)
  assert.equal(fieldsOf0, im.value, 'fields(i) agrees with the imagined field count')

  const cols = (PayloadFormulas.collections()) as unknown as { value: number; collections: string[] }
  assert.ok(cols.value > 50 && cols.collections.length === cols.value, 'one collection per family')

  assert.equal(PayloadFormulas.coverage(8, 11).value, 72, 'Payload API surface coverage as a percentage')
  assert.equal(PayloadFormulas.coverage(11, 11).holds, true, 'full coverage holds')

  assert.equal(PayloadFormulas.collections().dst, 'cross')
  assert.equal(hexFamiliesOf().get('payload')?.length, 4)
  const uuid = qpuHexUuidOf({ family: 'payload', program: ['fields'], params: [0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), fieldsOf0, `payload.fields at ${uuid}`)
  uuidReceiptOf('payload fields', contentUuidOf(run), { uuid })
  t.diagnostic(`4 formulas; imagine(0) = collection '${im.family}' with ${im.value} number fields + uuid, courtReceipt hook, standing access; ${cols.value} collections the lattice defines`)
})
