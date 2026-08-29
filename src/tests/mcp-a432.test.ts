// mcp-a432 — 432 MCP tools are A432 occupancy. Padding tools/list to 432 names is not fusion.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG } from '../mcp.js'
import { MCP_ALPINE_DOOR } from '../quantum/os/mcp-man.js'
import { mcpA432Fusion, MCP_A432 } from '../mcp-a432.js'
import { A432_HZ } from '../tts/synth.js'
import { HEXBIT_STATES, UUID_HEXBITS } from '../hexbit/index.js'
import { TRINITY } from '../address.js'
import { theoremByKey } from '../theorems/index.js'

test('432 MCP tools are k432 occupancy, identical to the live tuning', () => {
  assert.equal(MCP_A432, A432_HZ)
  assert.equal(MCP_A432, HEXBIT_STATES * (TRINITY ** TRINITY))
  assert.ok(theoremByKey().has('k432'))
})

test('listed tools/list is not padded to 432 — uuidna_exec fuses the rest', () => {
  const listed = MCP_CATALOG.length
  const door = MCP_CATALOG.some((t) => t.name === MCP_ALPINE_DOOR)
  const f = mcpA432Fusion(listed, door)
  assert.equal(f.definition, 'mcp·a432')
  assert.equal(f.a432, MCP_A432)
  assert.equal(f.listed, listed)
  assert.equal(f.alpineDoorPresent, true)
  assert.equal(f.padded, false)
  assert.equal(f.fused, true)
  assert.ok(f.listed > 0)
  assert.ok(f.listed < f.a432, `listed ${f.listed} must stay under A432 occupancy ${f.a432}`)
  assert.equal(f.hexbits.length, UUID_HEXBITS)
})

test('CONTROL: listed = 432 is a pad, not fusion', () => {
  const pad = mcpA432Fusion(MCP_A432, true)
  assert.equal(pad.padded, true)
  assert.equal(pad.fused, false)
  const empty = mcpA432Fusion(0, true)
  assert.equal(empty.fused, false)
  const noDoor = mcpA432Fusion(MCP_CATALOG.length, false)
  assert.equal(noDoor.fused, false)
  assert.notEqual(pad.receipt, mcpA432Fusion(MCP_CATALOG.length, true).receipt)
})
