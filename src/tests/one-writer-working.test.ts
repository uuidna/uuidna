// one-writer working() — THE STUCK SIGNAL IS WORK, NOT TIME (queue lead 123). The ceiling used to call any
// long-held lane STUCK, and on 2026-08-24 it accused a holder whose children were `npm run lean` and `tsc`,
// mid-cure: an operator obeying that message would have killed a working landing. A clock cannot tell busy
// from stuck; a live child can. Tested BOTH ways, because a predicate that cannot answer no is not a test.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { working } from '../scripts/one-writer.js'

test('a holder with a live child reads WORKING, and the same holder reads not-working once it ends', async () => {
  assert.equal(working(process.pid), false, 'the control: no child, no work — the honest stuck signal')
  const child = spawn('sleep', ['30'], { stdio: 'ignore' })
  await new Promise((r) => setTimeout(r, 300))
  assert.equal(working(process.pid), true, 'a live child IS the work made observable')
  child.kill()
  await new Promise((r) => setTimeout(r, 400))
  assert.equal(working(process.pid), false, 'and the signal returns when the work ends')
})

test('a pid that cannot have children answers no rather than throwing', () => {
  assert.equal(working(999999), false, 'an absent pid has no children — a verdict, never an exception')
})
