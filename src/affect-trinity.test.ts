// affect-trinity — the falsifiers for lean/AffectTrinity.lean. Each sealed fact is re-decided from outside its
// generator by walking src/affect-trinity.ts, its figures are read back out of the sealed statement rather than the
// generator's copy, and each rule has a control: a broken map the same checker must refuse.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremFor } from './theorems/index.js'
import { CORNERS, VALENCES, trinity, turn, back, flip, onCorner, onValence, states, pow, orderOn, fixedOn, commutes, generated, type Affect, type MapA } from './affect-trinity.js'
import { matrixCss, trinityVars } from './css.js'

const eqN = (a: number, b: number): boolean => a === b
const eqA = (a: Affect, b: Affect): boolean => a.corner === b.corner && a.valence === b.valence
const corners = CORNERS.map((_, i) => i)
const valences = VALENCES.map((_, i) => i)
const sealed = (key: string): string => {
  const t = theoremFor(key)
  assert.ok(t, `${key} is sealed`)
  return t.statement
}
const count = (s: string, needle: string): number => s.split(needle).length - 1
/** the turn's order as the sealed statement states it: the number of turns nested in affect_turn_closes */
const sealedTurnOrder = (): number => count(sealed('affect_turn_closes'), 'Corner.turn')

test('every affect trinity fact is sealed in AffectTrinity.lean', () => {
  for (const key of ['affect_loop_order', 'affect_turn_closes', 'affect_turn_fixes_no_corner', 'affect_turn_back',
    'affect_flip_involution', 'affect_flip_commutes_turn', 'affect_group_order_six', 'affect_group_cyclic']) {
    assert.equal(theoremFor(key)?.file, 'AffectTrinity.lean', key)
  }
})

test('affect_loop_order — feeling is read by thought, completed as emotion, and felt again', () => {
  assert.deepEqual(corners.map((c) => CORNERS[turn(c)]), [CORNERS[1], CORNERS[2], CORNERS[0]])
  for (const c of corners) assert.match(sealed('affect_loop_order'), new RegExp(`Corner\\.turn \\.${CORNERS[c]} = \\.${CORNERS[turn(c)]}`))
})

test('affect_turn_closes — the turn has the order the seal nests, equal to the number of corners', () => {
  const order = sealedTurnOrder()
  assert.equal(order, CORNERS.length)
  assert.equal(orderOn(turn, corners, eqN), order)
  assert.ok(corners.every((c) => pow(turn, order)(c) === c))
})

test('affect_turn_fixes_no_corner — every turn short of the full loop moves every corner', () => {
  const order = sealedTurnOrder()
  assert.equal(count(sealed('affect_turn_fixes_no_corner'), '≠ c'), order - 1)
  for (let k = 1; k < order; k++) assert.deepEqual(fixedOn(pow(turn, k), corners, eqN), [], `ρ^${k}`)
})

test('affect_turn_back — back undoes the turn on both sides and equals the turn applied order − 1 times', () => {
  assert.equal(count(sealed('affect_turn_back').split('Corner.back c =')[1] ?? '', 'Corner.turn'), sealedTurnOrder() - 1)
  for (const c of corners) {
    assert.equal(back(turn(c)), c)
    assert.equal(turn(back(c)), c)
    assert.equal(back(c), pow(turn, sealedTurnOrder() - 1)(c))
  }
})

test('affect_flip_involution — the flip undoes itself and fixes neither valence', () => {
  assert.match(sealed('affect_flip_involution'), /Valence\.flip \(Valence\.flip v\) = v ∧ Valence\.flip v ≠ v/)
  assert.equal(orderOn(flip, valences, eqN), VALENCES.length)
  assert.deepEqual(fixedOn(flip, valences, eqN), [])
})

test('affect_flip_commutes_turn — the flip keeps every corner and commutes with the turn on every state', () => {
  assert.match(sealed('affect_flip_commutes_turn'), /\(Affect\.turn a\)\.flip = \(Affect\.flip a\)\.turn/)
  assert.ok(commutes(onCorner(turn), onValence(flip)))
  assert.ok(states().every((a) => onValence(flip)(a).corner === a.corner))
})

test('affect_group_order_six — the closure of the identity under turn and flip has the sealed size, the product of the orders', () => {
  const size = Number(/generated\.length = (\d+)/.exec(sealed('affect_group_order_six'))?.[1])
  const g = generated([onCorner(turn), onValence(flip)])
  assert.equal(g.tables.length, size)
  assert.ok(g.closed)
  assert.equal(size, orderOn(turn, corners, eqN) * orderOn(flip, valences, eqN))
})

test('affect_group_cyclic — turning and flipping together has the sealed order, the size of the group', () => {
  const order = Number(/fun b => \(Affect\.turn b\)\.flip\) (\d+) a = a/.exec(sealed('affect_group_cyclic'))?.[1])
  const twist: MapA = (a) => onValence(flip)(onCorner(turn)(a))
  assert.equal(orderOn(twist, states(), eqA), order)
  assert.equal(order, trinity().groupOrder)
})

test('CONTROL: a turn that swaps two corners neither closes in the corner count nor fixes no corner', () => {
  const swap = (c: number): number => [1, 0, 2][c]!
  assert.notEqual(orderOn(swap, corners, eqN), CORNERS.length)
  assert.equal(fixedOn(swap, corners, eqN).length, 1)
})

test('CONTROL: a valence drawn as a mirror of the triangle does not commute, and its group is not cyclic', () => {
  // the dihedral reading: the flip reflects the corners as it flips the valence
  const mirror: MapA = (a) => ({ corner: (CORNERS.length - a.corner) % CORNERS.length, valence: flip(a.valence) })
  assert.equal(commutes(onCorner(turn), mirror), false)
  const g = generated([onCorner(turn), mirror])
  // the size alone cannot tell the two apart; the cyclic theorem can
  assert.equal(g.tables.length, trinity().groupOrder)
  assert.notEqual(orderOn((a: Affect) => mirror(onCorner(turn)(a)), states(), eqA), g.tables.length)
})

test('CONTROL: a flip that also turns the corner breaks the leaves-the-corner half of affect_flip_commutes_turn', () => {
  const drag: MapA = (a) => ({ corner: turn(a.corner), valence: flip(a.valence) })
  assert.equal(states().every((a) => drag(a).corner === a.corner), false)
})

test('CONTROL: a flip that is not an involution has order other than the valence count', () => {
  const stuck = (_v: number): number => 0
  assert.equal(orderOn(stuck, valences, eqN), 0)
})

test('the design matrix draws the trinity from the sealed orders, in both themes', () => {
  const order = sealedTurnOrder()
  const vars = trinityVars()
  assert.equal(vars['--trinity-step'], 360 / order + 'deg')
  assert.equal(vars['--trinity-valence-turn'], 360 / orderOn(flip, valences, eqN) + 'deg')
  const { css } = matrixCss()
  assert.ok(css.includes(`steps(${order}, end)`), 'the turn animates in as many steps as the turn has')
  assert.ok(css.includes(`rotate(${360}deg)`), 'and lands a full turn on, where it began')
  for (const c of CORNERS) for (const v of VALENCES) assert.ok(css.includes(`--trinity-${c}-${v}:`), `${c} ${v}`)
  assert.match(css, /\.dark \{ --trinity-light: \d+%; \}/)
  for (const key of ['affect_turn_closes', 'affect_turn_fixes_no_corner', 'affect_flip_commutes_turn']) assert.ok(css.includes(key), `the CSS cites ${key}`)
})
