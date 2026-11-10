import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VersionFormulas } from './index.js'
import '../../mcp/families.js'

test('version: keep, prune, autosave, drafts, published, scheduled, restore, churn — crossing to payload', async (t) => {
  assert.equal(VersionFormulas.keep(50, 20).value, 20, 'capped at maxPerDoc')
  assert.equal(VersionFormulas.prune(50, 20).value, 30, 'trimmed past the cap')
  assert.equal(VersionFormulas.autosave(60, 5).value, 12, 'autosaves in the session')
  assert.equal(VersionFormulas.drafts(3, 10).value, 30)
  assert.equal(VersionFormulas.published(7, 10).value, 70)
  assert.equal(VersionFormulas.scheduled(100, 160).value, 60, 'the wait until publish')
  assert.equal(VersionFormulas.scheduled(200, 160).value, 0)
  assert.equal(VersionFormulas.restore(12, 20).value, 8, 'versions walked back')
  assert.equal(VersionFormulas.churn(100, 20).value, 5, 'edits per day')
  assert.equal(VersionFormulas.keep(50, 20).dst, 'payload')
  assert.equal(hexFamiliesOf().get('version')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'version', program: ['prune'], params: [50, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `version.prune at ${uuid}`)
  uuidReceiptOf('version prune', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; keep 20, prune 30, autosave 12, drafts 30, published 70, scheduled 60, restore 8, churn 5; crossing to payload')
})
