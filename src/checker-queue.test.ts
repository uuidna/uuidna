import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkerQueue, laneWork, queueCensus } from './checker-queue.js'

const UNPROVEN = ['alphaGaps', 'betaGaps', 'gammaGaps', 'deltaGaps', 'epsilonGaps']

test('every unproven finder becomes exactly one takeable task', () => {
  const q = checkerQueue(UNPROVEN)
  assert.equal(q.length, UNPROVEN.length)
  assert.deepEqual(q.map((t) => t.finder), [...UNPROVEN].sort(), 'sorted, so the queue is the same list for every caller')
})

test('THE SHARD IS A PROPERTY OF THE TASK, so two checkers never collide with no registry and no lock', () => {
  const lanes = 7
  const all = checkerQueue(UNPROVEN, [], lanes)
  const owned = Array.from({ length: lanes }, (_, l) => laneWork(l, UNPROVEN, [], lanes)).flat()
  assert.equal(owned.length, all.length, 'every task is owned by exactly one lane — none lost, none doubled')
  assert.deepEqual(owned.map((t) => t.finder).sort(), all.map((t) => t.finder).sort())
})

test('the same lane returns the same list, forever — no coordination is needed', () => {
  assert.deepEqual(laneWork(3, UNPROVEN), laneWork(3, UNPROVEN))
  assert.deepEqual(laneWork(3, [...UNPROVEN].reverse()), laneWork(3, UNPROVEN), 'input order cannot move a task')
})

test('a finder that takes its data as an ARGUMENT is marked direct; the rest need the rule extracted', () => {
  const q = checkerQueue(UNPROVEN, ['betaGaps'])
  assert.equal(q.find((t) => t.finder === 'betaGaps')?.approach, 'direct')
  assert.equal(q.find((t) => t.finder === 'alphaGaps')?.approach, 'extract')
})

test('DONE demands BOTH directions — a control that only proves firing passes a finder that flags everything', () => {
  for (const t of checkerQueue(UNPROVEN)) {
    assert.match(t.done, /NON-EMPTY assertion/)
    assert.match(t.done, /silent on the lawful twin/)
  }
})

test('an empty baseline yields no work — the queue reports the debt, it does not invent it', () => {
  assert.deepEqual(checkerQueue([]), [])
  assert.deepEqual(queueCensus([]).perLane.filter((n) => n > 0), [])
})

test('the census counts what a planner needs: how many checkers, and how much of the work is cheap', () => {
  const c = queueCensus(UNPROVEN, ['betaGaps'], 7)
  assert.equal(c.total, 5)
  assert.equal(c.direct + c.extract, c.total, 'every task has an approach')
  assert.equal(c.perLane.reduce((a, b) => a + b, 0), c.total, 'the lanes partition the work')
})
