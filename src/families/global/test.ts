import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlobalFormulas } from './index.js'
import '../../mcp/families.js'

test('global: fields, locales, versions, size, access, cached, depth, populated — crossing to payload', async (t) => {
  assert.equal(GlobalFormulas.fields(7).value, 7, 'seven fields on the global')
  assert.equal(GlobalFormulas.locales(990, 1000).value, 99)
  assert.equal(GlobalFormulas.versions(10, 5).value, 5, 'kept capped at the max')
  assert.equal(GlobalFormulas.size(12, 3).value, 36)
  assert.equal(GlobalFormulas.access(3, 4).value, 75)
  assert.equal(GlobalFormulas.cached(90, 100).value, 90, 'cache hit rate')
  assert.equal(GlobalFormulas.depth(3).value, 3)
  assert.equal(GlobalFormulas.populated(8, 10).value, 80)
  assert.equal(GlobalFormulas.fields(7).dst, 'payload')
  assert.equal(hexFamiliesOf().get('global')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'global', program: ['size'], params: [12, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 36, `global.size at ${uuid}`)
  uuidReceiptOf('global size', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fields 7, locales 99, versions 5, size 36, access 75, cached 90, depth 3, populated 80; crossing to payload')
})
