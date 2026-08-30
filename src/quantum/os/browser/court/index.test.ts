import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatCourtFuseHint } from './index.js'

test('formatCourtFuseHint — daily court prints fuse export', () => {
  const line = formatCourtFuseHint({
    ok: true,
    receipt: 'abcd1234-0000-4000-8000-000000000000',
    fuseExport: 'export UUIDNA_OS_MCP=abcd1234',
    detail: '',
  })
  assert.match(line, /abcd1234/)
  assert.match(line, /export UUIDNA_OS_MCP=abcd1234/)
})

test('formatCourtFuseHint — blocked court reports detail', () => {
  assert.match(formatCourtFuseHint({ ok: false, receipt: null, fuseExport: null, detail: 'treason' }), /treason/)
})
