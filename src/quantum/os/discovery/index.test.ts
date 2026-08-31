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

// ── THE STRUCTURAL DISCOVERY, and its control ────────────────────────────────────────────────────────────────
// The walk offered 79 candidates over 28,635 packages and the conveyor refused all 79 as bare literals — digits
// read out of names like attica5-dev, proposing `5 = 5`. decide() confirmed every one of them, which is the
// lesson: truth is not the scarce thing, algebra is. These assert that what the census now offers is the kind of
// claim a door can accept, and — the part that matters — that it is not a tautology wearing a sum.
test('the census discovers STRUCTURAL claims, not digits scraped from package names', () => {
  const c = alpineDiscoveryCensus({ limit: 4000 })
  const structural = c.harvest.filter((h) => h.key.startsWith('alpine_'))
  assert.equal(structural.length, 2, 'the partition and the origin overcount')
  for (const s of structural) assert.match(s.lean, /^theorem \S+ : .+ := by decide$/)
})

test('the bindings PARTITION the packages — the sum is the catalogue, exactly', () => {
  const c = alpineDiscoveryCensus({ limit: 4000 })
  assert.equal(c.bindings.harmonised + c.bindings.crypto + c.bindings.port, c.packages,
    'every package holds exactly one binding, so the classes are exhaustive and disjoint')
})

test('CONTROL — the origins do NOT partition, and the overcount is NAMED rather than smoothed', () => {
  const c = alpineDiscoveryCensus({ limit: 4000 })
  const sum = c.bindingOrigins.harmonised + c.bindingOrigins.crypto + c.bindingOrigins.port
  assert.ok(sum >= c.origins, 'classes can only over-count origins, never under-count them')
  const row = c.harvest.find((h) => h.key.startsWith('alpine_binding_origins_overcount_'))
  assert.ok(row, 'the asymmetry is reported, not quietly dropped')
  assert.match(row!.sample, /do NOT partition/)
  // and the claim it states is the arithmetic actually measured, not a restatement of itself
  assert.match(row!.lean, new RegExp(`${sum} - ${c.origins} = ${sum - c.origins}`))
})

test('CONTROL — a structural claim is NOT a bare-literal tautology, which is why the door takes it', async () => {
  const { isBareLiteralLean, validateCandidate } = await import('../../../wave-deposit.js')
  const { theoremByKey } = await import('../../../theorems/index.js')
  const c = alpineDiscoveryCensus({ limit: 4000 })
  const sealed = theoremByKey()
  for (const h of c.harvest.filter((x) => x.key.startsWith('alpine_'))) {
    assert.equal(isBareLiteralLean(h.lean), false, `${h.key} must carry algebra, not two literals`)
    const verdict = validateCandidate(
      { key: h.key, lean: h.lean, why: 'structural census claim from the Alpine port walk, exact over the committed mirror', source: 'alpine', from: 'census' } as never,
      sealed,
    )
    assert.equal(verdict, null, `${h.key} must reach the kernel, not the refusal list: ${verdict}`)
  }
})
