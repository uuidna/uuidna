import { test } from 'node:test'
import assert from 'node:assert/strict'
import { planChange, renderPlan, commitChange, interactiveInstall, simpleInstall, parseInstallLine, installCombinationsOf } from './index.js'

const A = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]

test('a plan says exactly what a change would do, and changes nothing', () => {
  const after = [{ key: 'a' }, { key: 'c', extra: 1 }, { key: 'd' }]
  const p = planChange(A, after)
  assert.deepEqual(p.added.map((r) => r.key), ['d'])
  assert.deepEqual(p.removed.map((r) => r.key), ['b'])
  assert.deepEqual(p.changed.map((c) => c.key), ['c'])
  assert.equal(p.kept, 1)
  assert.equal(A.length, 3, 'planning must not mutate the input — simulate touches nothing')
})

test('a lossy commit is REFUSED by default', () => {
  // The incident: a revert discarded 30 accepted claims and the ledger fell 2532 → 2502 with nothing reporting
  // it. A destructive change must be chosen, never defaulted into.
  const r = commitChange(A, [{ key: 'a' }])
  assert.equal(r.ok, false)
  assert.match(r.why, /REMOVES 2 record/)
  assert.match(r.why, /b, c/, 'and the removals are NAMED — a count is a thing a reader skims past')
})

test('and allowed when the removal is the point, with a reason', () => {
  const r = commitChange(A, [{ key: 'a' }], { allowRemovals: true, reason: 'duplicate propositions withdrawn' })
  assert.equal(r.ok, true)
  assert.match(r.why, /duplicate propositions withdrawn/, 'the reason is recorded in the result, not left implicit')
})

test('removals are rendered individually, never folded into a total', () => {
  const lines = renderPlan(planChange(A, [{ key: 'a' }]), 'claim')
  assert.ok(lines.some((l) => l.includes('REMOVING b')))
  assert.ok(lines.some((l) => l.includes('REMOVING c')))
  assert.ok(lines.some((l) => l.includes('DESTROYS 2 claim')))
})

test('a lossless change is lossless, and an empty one says so', () => {
  assert.equal(commitChange(A, [...A, { key: 'd' }]).ok, true, 'pure addition destroys nothing')
  assert.equal(planChange(A, A).lossless, true)
  assert.match(renderPlan(planChange(A, A), 'claim')[0]!, /nothing to do/)
})

test('the plan carries a receipt that moves with the plan', () => {
  const one = planChange(A, [{ key: 'a' }, { key: 'd' }])
  const same = planChange(A, [{ key: 'a' }, { key: 'd' }])
  const other = planChange(A, [{ key: 'a' }, { key: 'e' }])
  assert.equal(one.receipt, same.receipt, 'the same plan recomputes to the same receipt')
  assert.notEqual(one.receipt, other.receipt, 'a different plan must not share it')
})

test('interactive installer asks, simulates, commits, and audits the fused payload stack', () => {
  const reset = interactiveInstall({ reset: true })
  assert.equal(reset.kind, 'install')
  assert.equal(reset.interactive, true)
  assert.equal(reset.total, 3)
  assert.match(reset.prompt, /qpu\.uuidna\.com\/mcp/)
  interactiveInstall({ yes: true, step: 0 })
  interactiveInstall({ yes: true, step: 1 })
  interactiveInstall({ yes: true, step: 2 })
  const simulated = interactiveInstall({ verb: 'simulate' })
  assert.equal(simulated.plan.lossless, true)
  assert.deepEqual(simulated.pending, ['qpu-mcp', 'payload-mcp', 'vitepress-payload'])
  const committed = interactiveInstall({ verb: 'commit' })
  assert.equal(committed.committed, true)
  const audited = interactiveInstall({ verb: 'audit' })
  assert.equal(audited.audit, true)
  assert.equal(audited.client.qpu.html, false)
  assert.equal(audited.client.vitepress.qpu, false)
  assert.equal(audited.client.vitepress.concurrency, 2)
  assert.equal(audited.client.payload.write, false)
})

test('console combinations parse in one line; empty seats all', () => {
  assert.deepEqual(parseInstallLine('').keys, ['qpu-mcp', 'payload-mcp', 'vitepress-payload'])
  assert.equal(parseInstallLine('').occupancy, 'personal')
  assert.equal(parseInstallLine('').cloudflare, true)
  const mix = parseInstallLine('1 3 saas cf')
  assert.deepEqual(mix.keys, ['qpu-mcp', 'vitepress-payload'])
  assert.equal(mix.occupancy, 'saas')
  assert.equal(mix.cloudflare, true)
  assert.equal(parseInstallLine('payload paas').keys[0], 'payload-mcp')
  assert.equal(installCombinationsOf().length, 3)
})

test('simpleInstall is one shot: Enter / --yes seats all and commits', () => {
  const seated = simpleInstall({ yes: true })
  assert.equal(seated.committed, true)
  assert.deepEqual(seated.seated, ['qpu-mcp', 'payload-mcp', 'vitepress-payload'])
  assert.equal(seated.occupancy, 'personal')
  assert.equal(seated.cloudflare.payload.endsWith('github.com/uuidna/payload'), true)
  interactiveInstall({ reset: true })
  const saas = simpleInstall({ line: '2 saas', yes: true })
  assert.deepEqual(saas.seated, ['payload-mcp'])
  assert.equal(saas.occupancy, 'saas')
})
