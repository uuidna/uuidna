// step-receipt — a derive step is skipped only when its receipt recomputes, driven both ways on a scratch tree: the
// skip is seen to happen when nothing moved, and to be refused when any one input or output moves.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { stepVerdict, saveStepReceipt, inputRoot, stepDependencies, type StepTrace } from './step-receipt.js'
import { envValueAddress } from './step-trace.js'

const scratch = (): string => {
  const root = mkdtempSync(join(tmpdir(), 'step-receipt-'))
  mkdirSync(join(root, 'in'), { recursive: true })
  writeFileSync(join(root, 'in', 'a.txt'), 'alpha')
  writeFileSync(join(root, 'out.txt'), 'derived from alpha')
  return root
}
const traceOf = (root: string, t: Partial<StepTrace>): string => {
  const p = join(root, 'trace.json')
  writeFileSync(p, JSON.stringify({ reads: ['in/a.txt'], lists: ['in'], probes: ['in/maybe.txt'], writes: ['out.txt'],
    env: [['STEP_RECEIPT_TEST', envValueAddress(process.env.STEP_RECEIPT_TEST)]], open: [], ...t }))
  return p
}

test('nothing moved: the step is verified by its receipt and not run', (t) => {
  const root = scratch(); t.after(() => rmSync(root, { recursive: true, force: true }))
  assert.equal(stepVerdict(root, 'gen-x.js', []).skip, false, 'no receipt yet')
  saveStepReceipt(root, 'gen-x.js', [], traceOf(root, {}))
  assert.equal(stepVerdict(root, 'gen-x.js', []).skip, true)
  assert.equal(stepVerdict(root, 'gen-x.js', ['--other']).skip, false, 'different args')
})

test('any one input or output moving refuses the skip', (t) => {
  const cases: [string, (root: string) => void][] = [
    ['a read file changed', (r) => writeFileSync(join(r, 'in', 'a.txt'), 'beta')],
    ['a listed directory gained a name', (r) => writeFileSync(join(r, 'in', 'b.txt'), '')],
    ['a probed path appeared', (r) => writeFileSync(join(r, 'in', 'maybe.txt'), '')],
    ['an output was edited after it was written', (r) => writeFileSync(join(r, 'out.txt'), 'hand-edited')],
    ['an output was deleted', (r) => rmSync(join(r, 'out.txt'))],
  ]
  for (const [why, move] of cases) {
    const root = scratch(); t.after(() => rmSync(root, { recursive: true, force: true }))
    saveStepReceipt(root, 'gen-x.js', [], traceOf(root, {}))
    move(root)
    assert.equal(stepVerdict(root, 'gen-x.js', []).skip, false, why)
  }
})

test('an environment value the step read moving refuses the skip, and the value is never stored in clear', (t) => {
  const root = scratch(); t.after(() => { rmSync(root, { recursive: true, force: true }); delete process.env.STEP_RECEIPT_TEST })
  process.env.STEP_RECEIPT_TEST = 'secret-one'
  saveStepReceipt(root, 'gen-x.js', [], traceOf(root, {}))
  assert.equal(stepVerdict(root, 'gen-x.js', []).skip, true)
  assert.equal(readFileSync(join(root, 'dist', 'step-receipts', 'gen-x.js.json'), 'utf8').includes('secret-one'), false)
  process.env.STEP_RECEIPT_TEST = 'secret-two'
  assert.equal(stepVerdict(root, 'gen-x.js', []).skip, false)
})

test('an open step (network, child process, outside the tree) is never skipped', (t) => {
  const root = scratch(); t.after(() => rmSync(root, { recursive: true, force: true }))
  saveStepReceipt(root, 'gen-x.js', [], traceOf(root, { open: ['network'] }))
  assert.equal(stepVerdict(root, 'gen-x.js', []).skip, false)
})

test('the order the steps need is read from what they touched, and what the record cannot vouch for keeps the manifest order', () => {
  const t = (p: Partial<StepTrace>): StepTrace => ({ reads: [], lists: [], probes: [], writes: [], env: [], open: [], ...p })
  const steps = [
    t({ writes: ['a.json'] }),                       // 0
    t({ writes: ['b.json'] }),                       // 1 — touches nothing 0 touches: runs alongside it
    t({ reads: ['a.json'], writes: ['c.json'] }),    // 2 — reads what 0 writes: waits for 0 only
    t({ writes: ['b.json'] }),                       // 3 — writes what 1 writes: waits for 1
    t({ lists: ['docs'] }),                          // 4 — lists docs/
    t({ writes: ['docs/new.md'] }),                  // 5 — writes under what 4 lists: waits for 4
    t({ reads: ['c.json'], open: ['network'] }),     // 6 — open: a barrier
    t({ writes: ['z.json'] }),                       // 7 — after a barrier: waits for it, and through it for all before
  ]
  const d = stepDependencies(steps)
  assert.deepEqual(d[1], [])
  assert.deepEqual(d[2], [0])
  assert.deepEqual(d[3], [1])
  assert.deepEqual(d[5], [4])
  assert.deepEqual(d[6], [0, 1, 2, 3, 4, 5])
  assert.deepEqual(d[7], [6])
  const untraced = stepDependencies([t({}), null, t({})])
  assert.deepEqual([untraced[1], untraced[2]], [[0], [1]], 'a step never traced is a barrier too: it waits for all before, all after wait for it')
  // the control: one shared path between two otherwise silent steps is enough to order them, in either direction
  assert.deepEqual(stepDependencies([t({ reads: ['x'] }), t({ writes: ['x'] })])[1], [0], 'an overwrite waits for the read before it')
})

test('the input fold does not depend on the order the step read in', (t) => {
  const root = scratch(); t.after(() => rmSync(root, { recursive: true, force: true }))
  writeFileSync(join(root, 'in', 'b.txt'), 'bravo')
  const base: StepTrace = { reads: ['in/a.txt', 'in/b.txt'], lists: [], probes: [], writes: [], env: [], open: [] }
  assert.equal(inputRoot(root, base, []), inputRoot(root, { ...base, reads: ['in/b.txt', 'in/a.txt'] }, []))
})
