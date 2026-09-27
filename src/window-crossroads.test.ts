import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CLAY_WING,
  windowsOf,
  crossroadCensus,
  crossroads,
  characteristicCeiling,
  windowIntegers,
  type ClayWindow,
  type CrossroadInput,
} from './window-crossroads.js'

// 9 BEFORE 16 IS THE POINT. A lexicographic sort puts "16" first, and every later comparison of two windows'
// integer lists would then be comparing strings while reporting arithmetic.
test('windowIntegers — ascends by VALUE, not by spelling', () => {
  assert.deepEqual(windowIntegers('(16 + 9) = 25'), ['9', '16', '25'])
})

// 0 AND 1 ARE STRUCTURE, refused here for the same reason padding-conjunct refuses them: a junction on 1 is a
// crossroad that joins nothing, because nearly every wing carries 1.
test('windowIntegers — drops 0 and 1 as structure', () => {
  assert.deepEqual(windowIntegers('(1 * 27) = 27 ∧ (0 + 6) = 6'), ['6', '27'])
})

test('windowsOf — keeps only the named wing, and reads a program AS a program', () => {
  const rows = [
    { key: 'levi', file: CLAY_WING, statement: '((List.range 3).filter (fun i => i)).length = 6' },
    { key: 'elsewhere', file: 'Core.lean', statement: '(2 * 3) = 6' },
  ]
  const ws = windowsOf(rows, CLAY_WING)
  assert.equal(ws.length, 1)
  assert.equal(ws[0]!.key, 'levi')
  assert.equal(ws[0]!.shape, 'program')
  assert.deepEqual(ws[0]!.integers, ['3', '6'])
})

const world = (over: Partial<CrossroadInput> = {}): CrossroadInput => ({
  windows: [{ key: 'w', shape: 'program', integers: ['4', '16'] }],
  homeWing: CLAY_WING,
  integers: [
    { value: '4', wings: ['Other.lean'] },
    { value: '16', wings: ['Other.lean'] },
    { value: '20', wings: ['Other.lean'] },
  ],
  stated: new Set<string>(),
  arithmetic: ['+'],
  ceiling: '64',
  ...over,
})

test('crossroads — a junction needs a SHARED integer, not merely two integer sets', () => {
  const none = crossroads(world({ integers: [{ value: '7', wings: ['Other.lean'] }] }))
  assert.deepEqual(none, [])
  const some = crossroads(world())
  assert.equal(some.length, 1)
  assert.deepEqual(some[0]!.shared, ['4', '16'])
})

// 4 + 16 = 20 lands on an integer the corpus carries; 16 + 16 = 32 and 4 + 4 = 8 do not.
test('crossroads — counts only crosses landing on an integer the corpus already carries', () => {
  assert.equal(crossroads(world())[0]!.applications, 2)
  const nowhere = crossroads(world({
    integers: [{ value: '4', wings: ['Other.lean'] }, { value: '16', wings: ['Other.lean'] }],
  }))
  assert.equal(nowhere[0]!.applications, 0)
})

test('crossroads — a cross the corpus already STATES is not an application', () => {
  const said = crossroads(world({ stated: new Set(['4 + 16 = 20', '16 + 4 = 20']) }))
  assert.equal(said[0]!.applications, 0)
})

test('crossroads — a window is never crossed with its own wing, whichever wing that is', () => {
  const selfOnly = crossroads(world({
    integers: [{ value: '4', wings: [CLAY_WING] }, { value: '16', wings: [CLAY_WING] }],
  }))
  assert.deepEqual(selfOnly, [])
  // the same world with a different home: Clay.lean is now just another wing, and the junction appears
  const away = crossroads(world({
    homeWing: 'Cern.lean',
    integers: [{ value: '4', wings: [CLAY_WING] }, { value: '16', wings: [CLAY_WING] }, { value: '20', wings: [CLAY_WING] }],
  }))
  assert.equal(away.length, 1)
  assert.equal(away[0]!.wing, CLAY_WING)
})

test('crossroads — a window carrying no characteristic integer stands nowhere', () => {
  const blank: ClayWindow[] = [{ key: 'blank', shape: 'formula', integers: [] }]
  assert.deepEqual(crossroads(world({ windows: blank })), [])
})

// THE BOUNDARY IS THE CORPUS'S MEDIAN, so it moves when the corpus does and cannot be tuned.
test('characteristicCeiling — is the median carrier count, over odd and even lists alike', () => {
  const mk = (...ns: number[]) => ns.map((n, i) => ({ value: String(i), wings: Array.from({ length: n }, (_, j) => `w${j}`) }))
  assert.equal(characteristicCeiling(mk(1, 2, 9)), 2)
  assert.equal(characteristicCeiling(mk(1, 2, 4, 9)), 3)
  assert.equal(characteristicCeiling([]), 0)
})

// A REALISTIC WORLD, because the boundary is a median and a median over three numbers says nothing. Most integers in
// the real corpus are carried by exactly one wing, so the filler below is not padding — it is what makes the median 1,
// which is the value the real corpus has.
test('crossroads — the characteristic column ignores crosses built from counting numbers', () => {
  const many = (n: number) => Array.from({ length: n }, (_, j) => `w${j}.lean`)
  const filler = [
    { value: '90', wings: ['Other.lean'] },
    { value: '91', wings: ['Other.lean'] },
    { value: '92', wings: ['Other.lean'] },
  ]
  const rareBuilt = crossroads(world({
    integers: [
      { value: '4', wings: ['Other.lean'] },
      { value: '16', wings: ['Other.lean'] },
      { value: '20', wings: many(9) },
      ...filler,
    ],
  }))
  assert.equal(rareBuilt[0]!.applications, 2)
  assert.equal(rareBuilt[0]!.characteristic, 2)
  assert.equal(rareBuilt[0]!.rarity, 1)

  // The same two crosses, now built from integers nine wings carry: still formulable, no longer worth ranking.
  const commonBuilt = crossroads(world({
    integers: [
      { value: '4', wings: many(9) },
      { value: '16', wings: many(9) },
      { value: '20', wings: ['Other.lean'] },
      ...filler,
    ],
  }))
  assert.equal(commonBuilt[0]!.applications, 2)
  assert.equal(commonBuilt[0]!.characteristic, 0)
})

test('crossroadCensus — names the isolated windows rather than only counting them', () => {
  const ws: ClayWindow[] = [
    { key: 'standing', shape: 'program', integers: ['4', '16'] },
    { key: 'alone', shape: 'formula', integers: ['999'] },
  ]
  const c = crossroadCensus(ws, crossroads(world({ windows: ws })))
  assert.equal(c.windows, 2)
  assert.equal(c.reachableAsFormula, 1)
  assert.equal(c.junctions, 1)
  assert.deepEqual(c.isolated, ['alone'])
})

// THE GUARD AGAINST A VACUOUS GREEN: a census over no windows must not read as health.
test('crossroadCensus — an empty world reports emptiness, not success', () => {
  const c = crossroadCensus([], [])
  assert.equal(c.windows, 0)
  assert.equal(c.applications, 0)
  assert.equal(c.characteristic, 0)
  assert.deepEqual(c.isolated, [])
})
