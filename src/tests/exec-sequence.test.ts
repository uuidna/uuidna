import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaExec, SEQUENCE_VERBS } from '../quantum/os/exec.js'

test('sequence applet — field, run, dash, invariants', () => {
  assert.deepEqual([...SEQUENCE_VERBS], ['field', 'run', 'dash', 'invariants'])

  const field = uuidnaExec('sequence field')
  assert.ok(field.ok, field.output.join('\n'))
  assert.match(field.output.join('\n'), /1\\2\\4\\8/)
  assert.equal(field.applet, 'sequence')

  const run = uuidnaExec('sequence run 9')
  assert.ok(run.ok, run.output.join('\n'))
  assert.match(run.output.join('\n'), /polarity:\s+plus/)

  const dash = uuidnaExec('sequence dash')
  assert.ok(dash.ok)
  assert.match(dash.output.join('\n'), /closes:\s+true/)

  const inv = uuidnaExec('sequence invariants')
  assert.ok(inv.ok)
  assert.match(inv.output.join('\n'), /vortexInvariantsHold: true/)
})
