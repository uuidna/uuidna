// court-procedure — the trial procedure in the EXACT order a court follows, tested: ten stages strictly ordered,
// every stage backed by a sealed theorem, all six due-process guarantees appearing among the stages, the receipt
// deterministic, and a submitted claim walked through the same order (sealed citation admits, garbage remands,
// nothing is ever discarded). Pure and offline. Integrity— the authority stays the court's.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { courtProcedure, fileSealed, verifyFiling } from './due-process.js'
import { openMessage, serializeMessage } from './quantum/message/index.js'

test('the procedure is the court order: ten stages, strictly ordered, every stage sealed', () => {
  const p = courtProcedure()
  assert.equal(p.stages.length, 10)
  assert.deepEqual(p.stages.map((s) => s.order), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'filing → fee → service → pleadings → discovery → standing → burden → verdict → appeal → mandate')
  assert.equal(p.allStagesSealed, true, 'every stage cites a theorem sealed in the ledger')
  assert.equal(p.guaranteesCovered, true, 'all six Legal.lean due-process guarantees appear among the stages')
})

test('the receipt is deterministic — every clerk recomputes the same procedure', () => {
  assert.equal(courtProcedure().receipt, courtProcedure().receipt)
})

test('each trial BEGINS only on deposit: coins (a decidable test) or supporting theorems — no deposit, no trial', () => {
  const p = courtProcedure(['the two coins are conserved: theorem two_coins', 'the moon is made of cheese'])
  assert.equal(p.docket.length, 2, 'every filed claim appears on the docket — remand is total')
  const [cited, garbage] = p.docket
  assert.equal(cited.began, true, 'the deposit (a sealed supporting theorem) starts the trial')
  assert.equal(cited.verdict, 'VERIFIED', 'a real sealed citation is admitted')
  assert.equal(garbage.began, false, 'no coins, no supporting theorems — the trial never begins; the case waits at stage 2')
  assert.equal(garbage.verdict, 'UNVERIFIED', 'never refuted without a failed test — remanded')
  assert.match(garbage.note, /NOT begun|no deposit/i, 'the docket says why the clock has not started')
})

test('trials as quantum private secure messaging: a filing proves the constitution WITHOUT revealing the payload', () => {
  const filing = fileSealed('motion: admit the exhibit sealed by theorem two_coins', 'the clerk never needs this', 'legal_verdict_is_exactly_one')
  const clerk = verifyFiling(filing)
  assert.equal(clerk.valid, true, 'the clerk verifies without the key and without the payload')
  assert.equal(clerk.guarantee, 'legal_verdict_is_exactly_one', 'the witness cites the constitution')
  const travels = JSON.stringify({ sealed: filing.sealed, witness: serializeMessage(filing.witness), fold: filing.fold })
  assert.equal(travels.includes('motion: admit'), false, 'the payload appears nowhere in what travels')
  const opened = openMessage(filing, 'the clerk never needs this')
  assert.match(opened.plaintext, /^motion: admit/, 'only the key holder opens, at trial')
  assert.throws(() => fileSealed('x', 'p', 'two_coins'), /constitution/, 'a witness outside the six guarantees is refused — even a real sealed theorem')
})
