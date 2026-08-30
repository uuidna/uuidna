// support-wiring — package subpath doors and inverted surfaces reachable from a test root.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanSource } from '../../../harmony.js'
import { studyOf } from '../../../study.js'
import { hostedMcpUrl, advantageCurriculum } from '../../advantage/mcp/index.js'
import { uuidnaExec } from '../exec/index.js'
import { runUuidnaOsCli } from './index.js'

test('harmony scanSource — clean source passes the two rules', () => {
  const r = scanSource('export const x = 1\n')
  assert.equal(r.clean, true)
  assert.equal(r.declared, false)
})

test('studyOf — accelerates caller notes without claiming meaning', () => {
  const s = studyOf('2+2=4')
  assert.equal(s.meaning, null)
  assert.ok(s.receipt)
  assert.ok(s.occupancy.chars >= 1)
})

test('@uuidna/uuidna/os npm door — uuidnaExec help', () => {
  const r = uuidnaExec('help')
  assert.ok(r.ok)
  assert.match(r.output.join('\n'), /sequence/)
})

test('advantage MCP barrel — wire + curriculum re-export', () => {
  assert.match(hostedMcpUrl(), /\/mcp$/)
  assert.ok(advantageCurriculum().examples.length > 0)
})

test('uuidnaOS cli door — reachable from a test root', () => {
  assert.equal(typeof runUuidnaOsCli, 'function')
})
