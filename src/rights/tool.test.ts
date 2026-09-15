import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from '../mcp.js'
import { receiptSealed } from '../refusal-trials.js'

// uuidna_land_rights, called by name through the served catalogue — the door a client actually reaches.
test('uuidna_land_rights: a citation that exists as cited answers VERIFIED with a sealed receipt', async () => {
  const a = await callTool('uuidna_land_rights', { claim: 'UNDROP Art. 17 recognises a right to land' }) as { verdict: string; found: { instrument: string }[] }
  assert.equal(a.verdict, 'VERIFIED')
  assert.ok(a.found.some((p) => p.instrument === 'undrop'))
  assert.ok(receiptSealed(a as unknown as Record<string, unknown>))
})

test('uuidna_land_rights: an article the instrument does not carry answers UNVERIFIED, and says which', async () => {
  const a = await callTool('uuidna_land_rights', { claim: 'The UDHR Art. 40 guarantees free beaches' }) as { verdict: string; why: string }
  assert.equal(a.verdict, 'UNVERIFIED')
  assert.match(a.why, /40/)
})
