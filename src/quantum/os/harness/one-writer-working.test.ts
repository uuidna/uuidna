// one-writer working() — THE STUCK SIGNAL IS WORK, NOT TIME (queue lead 123). The ceiling used to call any
// long-held lane STUCK, and on 2026-08-24 it accused a holder whose children were `npm run lean` and `tsc`,
// mid-cure: an operator obeying that message would have killed a working landing. A clock cannot tell busy
// from stuck; a live child can. Tested BOTH ways, because a predicate that cannot answer no is not a test.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { working } from '../../../scripts/one-writer.js'

// A HOLDER OF ITS OWN (2026-09-13). The control used to ask this test's own process, and the suite runs every file in
// ONE process, so a child another file left running made "no child" read true and failed a correct predicate. Each
// question now goes to a dedicated holder whose children are known: one with none, and one whose single child ends on
// its own while the holder stays alive.
test('a holder with a live child reads WORKING, and the same holder reads not-working once it ends', async () => {
  // the children are spawned through the runtime we are already standing in, not through a POSIX name: `sleep` is not
  // a program on every host, and a spawn that fails leaves the predicate reading false for want of a CHILD rather
  // than for want of work — the control would then pass and prove nothing.
  const idle = spawn(process.execPath, ['-e', 'setTimeout(() => {}, 30000)'], { stdio: 'ignore' })
  const busy = spawn(process.execPath, ['-e',
    `require('node:child_process').spawn(process.execPath, ['-e', 'setTimeout(() => {}, 700)'], { stdio: 'ignore' }); setTimeout(() => {}, 30000)`],
    { stdio: 'ignore' })
  try {
    await new Promise((r) => setTimeout(r, 300))
    assert.equal(working(idle.pid!), false, 'the control: no child, no work — the honest stuck signal')
    assert.equal(working(busy.pid!), true, 'a live child IS the work made observable')
    await new Promise((r) => setTimeout(r, 1200))
    assert.equal(working(busy.pid!), false, 'and the signal returns when the work ends, the holder still alive')
  } finally {
    idle.kill()
    busy.kill()
  }
})

test('a pid that cannot have children answers no rather than throwing', () => {
  assert.equal(working(999999), false, 'an absent pid has no children — a verdict, never an exception')
})
