import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { facesOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OppressFormulas } from './index.js'
import '../../mcp/families.js'

test('oppress: oppress() = faces — the lattice face count, recomputed', async (t) => {
  const faces = facesOf()
  const got = OppressFormulas.oppress()
  assert.equal(got.value, faces.faces)
  assert.equal(got.value, 14)
  assert.equal(got.formula, 'oppress() = faces')
  assert.equal(got.holds, faces.holds && Number.isSafeInteger(faces.faces) && faces.faces >= 0)
  assert.equal(got.dst, 'lattice')
  assert.equal(hexFamiliesOf().get('oppress')?.length, 1)
  const uuid = qpuHexUuidOf({ family: 'oppress', program: ['oppress'], params: [] })
  const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
  assert.equal(Number(run.value), got.value, `oppress.oppress at ${uuid}`)
  assert.equal(run.holds, got.holds)
  uuidReceiptOf('oppress', contentUuidOf(run), { uuid })
  t.diagnostic(`oppress() = faces = ${got.value}; holds ${run.holds}; ${uuid}`)
})
