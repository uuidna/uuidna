import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AdminFormulas } from './index.js'
import '../../mcp/families.js'

test('admin: columns, components, density, groups, hidden, load, nav, preview — crossing to payload', async (t) => {
  assert.equal(AdminFormulas.columns(3, 5).value, 60, 'three of five columns shown')
  assert.equal(AdminFormulas.components(2, 10).value, 20)
  assert.equal(AdminFormulas.density(20, 4).value, 5, 'five fields per row')
  assert.equal(AdminFormulas.groups(12, 4).value, 3, 'three collections per group')
  assert.equal(AdminFormulas.hidden(2, 20).value, 10)
  assert.equal(AdminFormulas.load(8, 100).value, 800)
  assert.equal(AdminFormulas.nav(10, 5).value, 2, 'two nav items per group')
  assert.equal(AdminFormulas.preview(3, 6).value, 50, 'half the collections previewed')
  assert.equal(AdminFormulas.columns(3, 5).dst, 'payload')
  assert.equal(hexFamiliesOf().get('admin')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'admin', program: ['columns'], params: [3, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `admin.columns at ${uuid}`)
  uuidReceiptOf('admin columns', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; columns 60, components 20, density 5, groups 3, hidden 10, load 800, nav 2, preview 50; crossing to payload')
})
