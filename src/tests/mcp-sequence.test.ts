import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, MCP_CATALOG } from '../mcp.js'
import { computeVortexInvariantsHold } from '../sequence-field.js'

const names = [
  'uuidna_through_void',
  'uuidna_run_sequence',
  'uuidna_living_field',
  'uuidna_vortex_reflection',
  'uuidna_vortex_dash',
  'uuidna_vortex_tour',
  'uuidna_vortex_invariants',
  'uuidna_development_vortex',
]

test('sequence MCP tools are catalogued under Living field', () => {
  for (const name of names) {
    const entry = MCP_CATALOG.find((t) => t.name === name)
    assert.ok(entry, `${name} in catalog`)
    assert.equal(entry!.category, 'Living field')
    assert.equal(entry!.skill, 'sequence')
  }
})

test('sequence MCP tools dispatch and match computeVortexInvariantsHold', () => {
  assert.equal((callTool('uuidna_through_void', { d: 1 }) as number), 9)
  assert.equal((callTool('uuidna_vortex_invariants', {}) as { hold: boolean }).hold, computeVortexInvariantsHold())

  const field = callTool('uuidna_living_field', {}) as { invariantsHold: boolean; stroke: { written: string } }
  assert.equal(field.invariantsHold, true)
  assert.equal(field.stroke.written, '1\\2\\4\\8/7/5/3\\6\\9/0\\1')

  const walked = callTool('uuidna_run_sequence', { input: 9 }) as { seed: number; polarity: string }
  assert.equal(walked.seed, 9)
  assert.equal(walked.polarity, 'plus')

  const reflection = callTool('uuidna_vortex_reflection', {}) as { valid: boolean; groupOrder: number }
  assert.equal(reflection.valid, true)
  assert.equal(reflection.groupOrder, 54)

  const dash = callTool('uuidna_vortex_dash', {}) as { closes: boolean }
  assert.equal(dash.closes, true)

  const tour = callTool('uuidna_vortex_tour', {}) as { seamCount: number }
  assert.equal(tour.seamCount, 2)

  const dv = callTool('uuidna_development_vortex', { wave: 'verify' }) as { computes: boolean }
  assert.equal(dv.computes, true)
})
