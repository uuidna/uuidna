import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremDemoOf, theoremDemoCoverage, alpineWitnessByTheorem, catalogueNeedleOf } from './index.js'
import { LEAN_LEDGER } from './theorems/generated.js'

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
  const type = theoremDemoOf('recto_odd_verso_even', 'typesetting', 406)
  assert.equal(type.shelf.route, '/catalogue')
  assert.equal(catalogueNeedleOf('typesetting'), 'font')
})

test('alpineWitnessByTheorem indexes harmonised counts', () => {
  const m = alpineWitnessByTheorem([{ theorem: 'two_coins', apps: 42 }])
  assert.equal(m.get('two_coins'), 42)
})

test('alpineWitnessByTheorem fans a skill tally onto every theorem of that skill', () => {
  const m = alpineWitnessByTheorem(
    [{ skill: 'typesetting', theorem: 'recto_odd_verso_even', apps: 406 }],
    [{ key: 'recto_odd_verso_even', skill: 'typesetting' }, { key: 'folio_is_twice_quarto', skill: 'typesetting' }],
  )
  assert.equal(m.get('recto_odd_verso_even'), 406)
  assert.equal(m.get('folio_is_twice_quarto'), 406)
})

test('cipher occupancy powers the Alpine crypto tally', () => {
  const m = alpineWitnessByTheorem(
    [{ skill: 'security', theorem: 'birthday_halves_the_exponent', apps: 358 }],
    [
      { key: 'key_floor_is_one_uuid', skill: 'cipher' },
      { key: 'birthday_halves_the_exponent', skill: 'security' },
      { key: 'two_coins', skill: 'coins' },
    ],
  )
  assert.equal(m.get('key_floor_is_one_uuid'), 358)
  assert.equal(m.get('birthday_halves_the_exponent'), 358)
  assert.equal(m.get('two_coins'), undefined)
})

test('cipher theorems open the Alpine catalogue on ssl', () => {
  assert.equal(catalogueNeedleOf('cipher'), 'ssl')
  assert.equal(catalogueNeedleOf('security'), 'ssl')
  assert.equal(theoremDemoOf('key_floor_is_one_uuid', 'cipher', 358).shelf.route, '/catalogue')
})

test('crypto occupancy keys power Alpine even when skill is models or byte', () => {
  const m = alpineWitnessByTheorem(
    [{ skill: 'security', theorem: 'birthday_halves_the_exponent', apps: 358 }],
    [
      { key: 'crypto_widths_are_fixed_not_sampled', skill: 'models' },
      { key: 'digest_doubles_the_address', skill: 'byte' },
      { key: 'k432', skill: 'wave' },
    ],
  )
  assert.equal(m.get('crypto_widths_are_fixed_not_sampled'), 358)
  assert.equal(m.get('digest_doubles_the_address'), 358)
  assert.equal(m.get('k432'), undefined)
})

test('crypto occupancy opens ssl even from models', () => {
  assert.equal(catalogueNeedleOf('models', 'crypto_widths_are_fixed_not_sampled'), 'ssl')
  assert.equal(catalogueNeedleOf('models'), 'models')
  assert.equal(theoremDemoOf('crypto_widths_are_fixed_not_sampled', 'models', 358).catalogueSkill, 'cipher')
})
