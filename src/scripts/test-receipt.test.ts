// DRAFT src/scripts/test-receipt.test.ts - the reporter's receipt with the controls a measurement needs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import testReceipt, { receiptOf, fileReceiptsOf, totalOf } from './test-receipt.js'

type Ev = { type: string; data: { name?: string; file?: string; details?: { error?: { message?: string }; duration_ms?: number } } }
const pass = (file: string, name: string, ms = 0): Ev => ({ type: 'test:pass', data: { name, file: `/x/dist/${file}`, details: { duration_ms: ms } } })
async function* stream(evs: Ev[]) { for (const e of evs) yield e }
const collect = async (evs: Ev[]): Promise<string[]> => {
  const out: string[] = []
  for await (const l of testReceipt(stream(evs))) out.push(l)
  return out
}

const A = [pass('a.test.js', 'a1'), pass('a.test.js', 'a2'), pass('b.test.js', 'b1')]

test('deterministic across two runs of the same outcomes', async () => {
  assert.deepEqual(await collect(A), await collect(A))
})

test('order-invariant: interleaving files by completion does not move a receipt', async () => {
  const shuffled = [A[2]!, A[1]!, A[0]!]
  assert.deepEqual(await collect(A), await collect(shuffled))
})

// THE CONTROL - a receipt that never moves is a constant wearing an address.
test('MOVES when one outcome moves, in its file and at the root', async () => {
  const B = [pass('a.test.js', 'a1'), pass('a.test.js', 'a3'), pass('b.test.js', 'b1')]
  const ra = await collect(A)
  const rb = await collect(B)
  assert.notEqual(ra.find((l) => l.includes('a.test.js')), rb.find((l) => l.includes('a.test.js')), 'file a must move')
  assert.equal(ra.find((l) => l.includes('b.test.js')), rb.find((l) => l.includes('b.test.js')), 'file b must NOT move')
  assert.notEqual(ra[ra.length - 1], rb[rb.length - 1], 'the root must move')
})

test('the root IS the fold of the file receipts - the whole verifies from the parts', async () => {
  const out = await collect(A)
  const leaves = fileReceiptsOf(new Map([['a.test.js', ['a1', 'a2']], ['b.test.js', ['b1']]]))
  assert.ok(out[out.length - 1]!.includes(`receipt ${totalOf(leaves)}`))
  assert.equal(leaves[0]![1], receiptOf(['a1', 'a2']))
})

test('one receipt line per superposition, and the count is the denominator', async () => {
  const out = await collect(A)
  assert.equal(out.filter((l) => l.startsWith('· ')).length, 2)
  assert.match(out[out.length - 1]!, /3\/3 pass in 2 superpositions/)
})

test('a failure prints first and in full, never folded', async () => {
  const fail: Ev = { type: 'test:fail', data: { name: 'c1', file: '/x/dist/c.test.js', details: { error: { message: 'boom' } } } }
  const out = await collect([...A, fail])
  assert.ok(out[0]!.startsWith('✗ c1'))
  assert.match(out[out.length - 1]!, /1 of 4 FAILED/)
})

// THE READING NEVER MOVES THE RECEIPT — durations print beside the fold and are not in it.
test('a duration is a reading beside the receipt, never inside it, and the slowest superposition is named', async () => {
  const slow = [pass('a.test.js', 'a1', 100), pass('a.test.js', 'a2', 50000), pass('b.test.js', 'b1', 5)]
  const fast = [pass('a.test.js', 'a1', 1), pass('a.test.js', 'a2', 1), pass('b.test.js', 'b1', 1)]
  const rs = await collect(slow)
  const rf = await collect(fast)
  assert.equal(rs[rs.length - 1], rf[rf.length - 1], 'the root fold is identical whatever the clock said')
  assert.match(rs.find((l) => l.includes('a.test.js')) ?? '', /50\.1s/)
  assert.match(rs.find((l) => l.startsWith('⏱')) ?? '', /^⏱ slowest superpositions: a\.test\.js 50\.1s · b\.test\.js 0\.0s/)
})
