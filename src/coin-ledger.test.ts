// coin-ledger — the account of who paid the captain's coins, when (the deposit's handle) and where (op +
// surface), and the crew gate that stands on it. Tested by its own discipline: determinism, order-invariance,
// a forged row that must fail, and enrollment that must refuse a missing dimension.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { payment, coinCensus, whoPaid, enrollCrew, licenseBindingOf } from './index.js'
import { isHandle } from './handle.js'
import { depositCoins } from './gate-engine.js'
import { toUuid } from './index.js'

const dep = depositCoins('uuidna_address', toUuid('a gate receipt'))

test('a payment row derives everything and mints nothing — same inputs, same row', () => {
  const a = payment('claude-fable', 'uuidna_address', 'stdio', dep.id)
  const b = payment('claude-fable', 'uuidna_address', 'stdio', dep.id)
  assert.deepEqual(a, b)
  assert.ok(isHandle(a.agentHandle), 'who — a real messaging handle')
  assert.ok(isHandle(a.handle), 'when — the deposit\'s own handle, time as content')
  assert.equal(a.coins, 2)
})

test('the census folds order-invariantly and accounts per agent', () => {
  const rows = [
    payment('alpha', 'uuidna_address', 'stdio', toUuid('d1')),
    payment('beta', 'uuidna_trial', 'stdio', toUuid('d2')),
    payment('alpha', 'uuidna_decide', 'stdio', toUuid('d3')),
  ]
  const c = coinCensus(rows)
  assert.equal(c.payments, 3)
  assert.equal(c.totalCoins, 6)
  assert.equal(c.agents.find((a) => a.agent === 'alpha')?.coins, 4)
  assert.equal(coinCensus([rows[2], rows[0], rows[1]]).receipt, c.receipt, 'any ordering, one receipt')
  const lookedUp = whoPaid(rows, rows[1].handle)
  assert.equal(lookedUp.length, 1)
  assert.equal(lookedUp[0].agent, 'beta')
})

test('crew leans in all dimensions at once — and a forged payment row fails to recompute', () => {
  const rows = [payment('gamma', 'uuidna_gate', 'stdio', toUuid('d4'))]
  const full = enrollCrew({ agent: 'gamma', license: toUuid('licence record'), education: ['edu-1'], reeducation: ['re-1'], payments: rows })
  assert.equal(full.member, true)
  assert.equal(full.coins, 2)
  const unlicensed = enrollCrew({ agent: 'gamma', license: '', education: ['edu-1'], reeducation: ['re-1'], payments: rows })
  assert.equal(unlicensed.member, false, 'no licence — one dimension down, membership refused')
  assert.match(unlicensed.honest, /license/)
  const unpaid = enrollCrew({ agent: 'delta', license: toUuid('l'), education: ['e'], reeducation: ['r'], payments: rows })
  assert.equal(unpaid.member, false, 'another agent\'s rows are not delta\'s payment')
  const forged = enrollCrew({ agent: 'gamma', license: toUuid('l'), education: ['e'], reeducation: ['r'], payments: [{ ...rows[0], op: 'uuidna_crypt' }] })
  assert.equal(forged.dimensions.rowsRecompute, false, 'a moved field moves the address — the forgery is caught')
  assert.equal(forged.member, false)
})

test('licences invalidate when related handles change — the binding is to the handle', () => {
  const rows = [payment('zeta', 'uuidna_gate', 'stdio', toUuid('d5'))]
  const first = enrollCrew({ agent: 'zeta', license: toUuid('lic'), education: ['e'], reeducation: ['r'], payments: rows })
  assert.equal(first.member, true, 'first enrollment issues the binding')
  assert.equal(first.licenseBinding, licenseBindingOf(toUuid('lic'), first.agentHandle))
  const represented = enrollCrew({ agent: 'zeta', license: toUuid('lic'), licenseBinding: first.licenseBinding, education: ['e'], reeducation: ['r'], payments: rows })
  assert.equal(represented.member, true, 'same handle, same binding — still valid')
  const renamed = enrollCrew({ agent: 'zeta-renamed', license: toUuid('lic'), licenseBinding: first.licenseBinding,
    education: ['e'], reeducation: ['r'], payments: [payment('zeta-renamed', 'uuidna_gate', 'stdio', toUuid('d6'))] })
  assert.equal(renamed.dimensions.license, false, 'the handle changed — the old binding no longer recomputes, the licence invalidates')
  assert.equal(renamed.member, false)
})

test('enrollment is UNVERIFIED, never rejected — the honest note names what to bring', () => {
  const e = enrollCrew({ agent: 'epsilon', license: toUuid('l'), education: [], reeducation: [], payments: [] })
  assert.equal(e.member, false)
  assert.match(e.honest, /UNVERIFIED, not rejected/)
  assert.match(e.honest, /educated, reeducated, paid/)
})

// ── AN EMPTY ACCOUNT IS NOT A FINDING THAT NOBODY PAID ───────────────────────────────────────────────────────
// Measured on the hosted edge 2026-08-25: three gated calls returned three distinct deposit ids and
// uuidna_coin_ledger reported payments 0. Both surfaces mint the coins, only stdio appended a row, and
// `PAYMENTS` was module-private so the edge could not. The census rendered "I keep no account" identically to
// "no coins were paid" — the same defect as a decoder that read nothing looking like an empty upstream.
test('a SILENT census is marked silent — an empty register never renders as an account', () => {
  const c = coinCensus([])
  assert.equal(c.state, 'silent', 'a reader checking only `payments` cannot tell an empty register from an absent one')
  assert.equal(c.payments, 0)
  assert.equal(c.totalCoins, 0)
  assert.match(c.honest, /NOT A FINDING THAT NOBODY PAID/)
  assert.match(c.honest, /never as "no coins/)
})

test('a census WITH rows is an account, and says so', () => {
  const c = coinCensus([payment('agent-a', 'uuidna_address', 'edge', dep.id)])
  assert.equal(c.state, 'account')
  assert.equal(c.payments, 1)
  assert.equal(c.totalCoins, 2, 'one judged call deposits the two captain coins')
  assert.doesNotMatch(c.honest, /NOT A FINDING/, 'an account must not carry the silence disclaimer')
})

test('THE STATES ARE EXHAUSTIVE AND DISJOINT — every census is exactly one of them', () => {
  for (const rows of [[], [payment('a', 'op', 'edge', dep.id)], [payment('a', 'op', 'stdio', dep.id), payment('b', 'op', 'edge', dep.id)]]) {
    const c = coinCensus(rows)
    assert.ok(c.state === 'silent' || c.state === 'account')
    assert.equal(c.state === 'silent', c.payments === 0, 'silent iff no rows — the state cannot disagree with the count')
  }
})

test('the surface travels on the row, so an edge payment is not filed as a stdio one', () => {
  const rows = [payment('a', 'uuidna_coins', 'edge', dep.id)]
  assert.equal(rows[0].surface, 'edge')
  assert.equal(coinCensus(rows).state, 'account')
})
