import { test } from 'node:test'
import assert from 'node:assert/strict'
import { refusalCensus, involuteRefusals } from './index.js'

test('withdrawn refusals are kept BESIDE the ones that held', () => {
  // A registry showing only successful refusals teaches nothing. The one that failed is the informative row.
  const c = refusalCensus()
  assert.ok(c.refused > 0)
  assert.ok(c.withdrawn > 0, 'at least one refusal in this tree did not survive scrutiny, and it must be visible')
  assert.equal(c.rows.length, c.refused + c.withdrawn, 'held and withdrawn must partition the registry')
})

test('every boundary is classified, and the classes partition', () => {
  const c = refusalCensus()
  const total = Object.values(c.byKind).reduce((s, n) => s + n, 0)
  assert.equal(total, c.rows.length, 'a refusal with no classified boundary would be invisible to the finding')
})

test('the INCAPACITY class is the one that failed — stated as a count, not a law', () => {
  // In this record, every withdrawn refusal named an incapacity and every surviving one named a law or a scope.
  // That is one instance out of one, which is a pattern worth watching and NOT a proof: the sample is a single
  // case, and saying so is the difference between a finding and an overclaim. The corroborating evidence sits
  // elsewhere and is larger — six impossibility claims written and refuted in one session, sealed as
  // impossibility_claims_debt_622.
  const c = refusalCensus()
  const withdrawn = c.rows.filter((r) => !r.survived)
  for (const w of withdrawn) {
    assert.equal(w.kind, 'incapacity', 'a withdrawn refusal that named a LAW would break the observed pattern — and would be worth knowing')
    assert.ok(w.overturnedBy.length > 0, 'a withdrawal must record what overturned it')
  }
  const survivors = c.rows.filter((r) => r.survived)
  assert.ok(survivors.some((r) => r.kind === 'law'), 'law-shaped boundaries are the ones that hold')
})

test('the census says which act it is about — refusing work, never refusing the court', () => {
  assert.match(refusalCensus().honest, /opposite acts|second has no legitimate instance/)
})

test('involuting a refusal yields the condition that would unlock it', () => {
  // σ² = id: the involution turns "we will not do X because B" into "X proceeds when C", and turning C back
  // returns the refusal. Nothing is lost in the turn; what is gained is that C can be acted on.
  const i = involuteRefusals()
  assert.equal(i.rows.length, refusalCensus().rows.length, 'every refusal must have an involution — the turn is total')
  for (const r of i.rows) assert.ok(r.condition.length > 20, `${r.kind} must yield a real condition, not a label`)
})

test('the turn sorts the kinds by what could settle them', () => {
  const i = involuteRefusals()
  const law = i.rows.filter((r) => r.kind === 'law')
  const inc = i.rows.filter((r) => r.kind === 'incapacity')
  assert.ok(law.every((r) => !r.checkable), 'a law-shaped condition is not reachable by measurement — that is what makes it a boundary')
  assert.ok(inc.every((r) => r.checkable), 'an incapacity-shaped condition is settled by a measurement anyone can take')
})

test('the withdrawn refusal was the checkable one, and was checked', () => {
  // This is the whole argument for involuting: the class whose condition can be tested in minutes is the class
  // that keeps failing, because it is the one nobody tests before writing it down.
  const w = involuteRefusals().rows.filter((r) => !r.survived)
  assert.ok(w.length > 0)
  assert.ok(w.every((r) => r.checkable), 'the refusal that fell was the one whose condition a measurement could settle')
})
