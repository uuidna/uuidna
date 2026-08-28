import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremDemoOf, theoremDemoCoverage, alpineWitnessByTheorem } from '../quantum/apps/theorem-demos.js'
import { LEAN_LEDGER } from '../theorems/generated.js'

test('theoremDemoCoverage — every sealed theorem drills', () => {
  const c = theoremDemoCoverage(LEAN_LEDGER)
  assert.equal(c.total, LEAN_LEDGER.length)
  assert.equal(c.ok, true, c.gaps.slice(0, 5).join(', '))
})

test('theoremDemoOf routes skills to shelves', () => {
  const chess = theoremDemoOf('torus_chessboard_chi_zero', 'chess')
  assert.equal(chess.shelf.route, '/chess')
  const coins = theoremDemoOf('two_coins', 'coins')
  assert.equal(coins.shelf.route, '/trading')
})

test('alpineWitnessByTheorem indexes harmonised counts', () => {
  const m = alpineWitnessByTheorem([{ theorem: 'two_coins', apps: 42 }])
  assert.equal(m.get('two_coins'), 42)
})
