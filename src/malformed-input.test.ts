// malformed-input — a tool given a schema-shaped but EMPTY object must REFUSE BY NAME, never die as a TypeError.
// The process-hidden probe in quantum/os/harness/mcp-edge-coverage.test.ts found both of these as crashes on
// 2026-09-07 ("Cannot read properties of undefined (reading 'length')", "Cannot convert undefined or null to
// object"); a crash reads as the tool's fault where a refusal reads as the caller's, and only one of those is true.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'

test('uuidna_verify_envelope refuses an empty envelope and names every missing field', () => {
  assert.throws(() => callTool('uuidna_verify_envelope', { sealed: {} }), /crypt: envelope missing field\(s\): alg, salt, nonce, ct, tag, address/)
  assert.throws(() => callTool('uuidna_verify_envelope', { sealed: 'not an object' }), /envelope must be the/)
})

test('uuidna_document refuses a state with no root and says what shape it wanted', () => {
  assert.throws(() => callTool('uuidna_document', { state: {} }), /editor: state\.root missing/)
  assert.throws(() => callTool('uuidna_document', { state: { root: { type: 'root' } } }), /no children\[\]/)
})

// CONTROL: the same tools still ANSWER a well-formed call, so the refusal is on shape and not on everything
test('control — a well-formed envelope verifies and a well-formed state folds', () => {
  const sealed = callTool('uuidna_encrypt', { text: 'theorem', passphrase: 'theorem' }) as Record<string, unknown>
  assert.equal(callTool('uuidna_verify_envelope', { sealed }), true)
  const fold = callTool('uuidna_document', { state: { root: { type: 'root', children: [{ type: 'text', text: 'theorem' }] } } }) as { nodes: number }
  assert.ok(fold.nodes >= 1)
})
