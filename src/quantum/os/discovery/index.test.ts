// alpine-discovery — the port census discovers bindings and harvest at scale.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { alpineDiscoveryCensus } from './index.js'
import { catalogue } from '../catalogue/index.js'

test('alpineDiscoveryCensus — full catalogue binds every row and harvests without refuted axioms', () => {
  const c = alpineDiscoveryCensus()
  const n = catalogue().length
  assert.equal(c.definition, 'alpine-port·theorem·axiom·discovery')
  assert.equal(c.packages, n)
  assert.ok(c.origins > 0 && c.origins <= n)
  assert.equal(
    c.bindings.harmonised + c.bindings.crypto + c.bindings.port,
    n,
    'every package has exactly one binding class',
  )
  assert.ok(c.bindings.port > c.bindings.harmonised, 'most packages are port-only — the honest majority')
  assert.equal(c.axiomHunt.refuted, 0, 'refuted runtime assumptions block the census')
  assert.ok(c.harvestTotal >= c.harvest.length)
  assert.ok(c.receipt.length > 10)
  assert.ok(c.theorems.some((t) => t.key === 'the_os_is_bootable_quantum'))
})

test('alpineDiscoveryCensus — limit scopes the walk', () => {
  const c = alpineDiscoveryCensus({ limit: 50, harvestCap: 10 })
  assert.equal(c.packages, 50)
  assert.ok(c.harvest.length <= 10)
})
