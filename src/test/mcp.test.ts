// mcp — CI drives the SERVED surface. Every assertion goes through callTool (the server's own dispatch, exported
// from ./mcp.js), so CI exercises the exact tools an agent calls and proves the MCP can't drift from the sealed
// package it wraps: the catalog lists only tools the handlers answer, and each tool returns what the underlying
// function computes. "CI uses MCP, and vice versa" — one path, verified both ways.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, TOOL_NAMES, MCP_CATALOG } from '../mcp.js'
import { toUuid, adjudicate, theorems, runTrial } from '../index.js'

test('catalog ↔ handlers: the catalog lists exactly the dispatchable tools, unknown tools throw', () => {
  assert.deepEqual([...TOOL_NAMES].sort(), [...MCP_CATALOG.map((t) => t.name)].sort())
  assert.throws(() => callTool('uuidna_not_a_tool'), /unknown tool/)
})

test('CI through the MCP: the served tools return what the sealed package computes', () => {
  // identity — the served address IS the package's content-address
  assert.equal(callTool('uuidna_address', { text: 'hello' }), toUuid('hello'))
  // the trial — the served verdict IS the package's verdict
  assert.equal((callTool('uuidna_adjudicate', { statement: 'FNV-1a is cryptographic' }) as { verdict: string }).verdict,
    adjudicate('FNV-1a is cryptographic').verdict)
  // the ledger — the served theorem list (and a skill filter) match the package
  assert.equal((callTool('uuidna_theorems', {}) as unknown[]).length, theorems().length)
  assert.equal((callTool('uuidna_theorems', { skill: 'navigation' }) as unknown[]).length, theorems({ skill: 'navigation' }).length)
  // the fold — the served trial receipt IS the package's receipt
  assert.equal((callTool('uuidna_trial', {}) as { receipt: string }).receipt, runTrial().receipt)
})
