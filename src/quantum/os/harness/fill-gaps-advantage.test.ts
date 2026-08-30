import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fillGapsAdvantageSnapshot, mergeFillGapsReceipts } from '../../../desk/fill/gaps/advantage/index.js'
import { callTool } from '../../../mcp.js'

test('fillGapsAdvantageSnapshot — one receipt folds survey, open leads, and playbook', () => {
  const s = fillGapsAdvantageSnapshot()
  assert.ok(Array.isArray(s.plan))
  assert.ok(s.survey.buckets.length >= 0)
  assert.match(s.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(s.handle.length, 8)
  assert.match(s.door, /^https:\/\/uuidna\.com\//)
  assert.equal(fillGapsAdvantageSnapshot().receipt, s.receipt)
  const merged = mergeFillGapsReceipts('a', 'b')
  assert.notEqual(merged, s.receipt)
})

test('uuidna_fill_gaps — snapshot at scale on the MCP wire', async () => {
  const r = await Promise.resolve(callTool('uuidna_fill_gaps', { limit: 8 })) as { receipt: string; survey: { openLeads: number }; plan: unknown[] }
  assert.match(r.receipt, /^[0-9a-f-]{36}$/)
  assert.ok(Array.isArray(r.plan))
  assert.ok(typeof r.survey.openLeads === 'number')
})
