import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, theoremByKey, isPagelessFile } from './theorems/index.js'
import { handleOf, handleBirthdayPoint } from './handle.js'
import { involute, involutionFixed } from './diamond.js'
import {
  LATTICE_STATIONS, STATION_HEXBITS, HUMAN_PROBLEMS,
  parseStation, hex4Of, stationIndex, involuteStation, stationOfAddress, stationOfProblem,
  latticeCall, fillLattice, callSolutionInvolution, callWingsOntoStations, stationCollisionsOf,
} from './lattice.js'

test('the lattice is the handle birthday point — 2^16 stations, four hex each', () => {
  assert.equal(LATTICE_STATIONS, handleBirthdayPoint())
  assert.equal(STATION_HEXBITS * 2, 8)
  assert.equal(hex4Of(0), '0000')
  assert.equal(hex4Of(LATTICE_STATIONS - 1), 'ffff')
  assert.equal(stationIndex('ffff'), LATTICE_STATIONS - 1)
  assert.equal(parseStation('enumeration_hex4_00ab'), '00ab')
})

test('station involution is self-inverse and fixed-point-free on an even grid', () => {
  assert.equal(involuteStation('0000'), 'ffff')
  assert.equal(involuteStation('ffff'), '0000')
  assert.equal(involuteStation(involuteStation('a3f0')), 'a3f0')
  for (const h of ['0000', '0001', '7fff', '8000', 'fffe', 'ffff'])
    assert.notEqual(involuteStation(h), h, `${h} must move — 2^16 is even`)
})

test('named theorems seat inside 0000–ffff; HexSpan keys are stations, not cargo', () => {
  for (const t of theorems()) {
    if (isPagelessFile(t.file)) {
      assert.match(t.key, /^enumeration_hex4_[0-9a-f]{4}$/)
      continue
    }
    const st = stationOfAddress(t.address)
    assert.match(st, /^[0-9a-f]{4}$/)
    assert.equal(st, handleOf(t.address).slice(0, STATION_HEXBITS))
  }
  const door = latticeCall('0000')
  assert.equal(door.key, 'enumeration_hex4_0000')
  assert.ok(!door.theorems.some((t) => t.key.startsWith('enumeration_hex4_')))
})

test('the lattice calls all eighteen human problems, none of them solved', () => {
  assert.equal(HUMAN_PROBLEMS.length, 18)
  assert.equal(HUMAN_PROBLEMS.filter((p) => p.kind === 'clay').length, 7)
  assert.equal(HUMAN_PROBLEMS.filter((p) => p.kind === 'open').length, 5)
  assert.equal(HUMAN_PROBLEMS.filter((p) => p.kind === 'world').length, 6)
  const byKey = theoremByKey()
  for (const p of HUMAN_PROBLEMS) {
    assert.equal(p.solved, false)
    for (const k of p.windowKeys) assert.ok(byKey.get(k), `${p.id} window ${k} must be sealed`)
    const home = latticeCall(stationOfProblem(p.id))
    assert.ok(home.problems.some((q) => q.id === p.id), `${p.id} must be callable from its station`)
  }
  const fill = fillLattice()
  assert.equal(fill.problemsSeated, 18)
  assert.equal(fill.problems.length, 18)
  assert.ok(fill.problems.every((p) => p.solved === false))
})

test('occupied + vacant = 2^16 after theorems, axioms and problems are seated', () => {
  const fill = fillLattice()
  assert.equal(fill.stations, LATTICE_STATIONS)
  assert.equal(fill.occupied + fill.vacant, fill.stations)
  assert.ok(fill.theoremsSeated > 0)
  assert.ok(fill.axiomsSeated > 0)
  assert.equal(fill.theoremsSeated, theorems().filter((t) => !isPagelessFile(t.file)).length)
})

test('then the solution involution: self-inverse, Clay reflects seven and solves none', () => {
  const fill = fillLattice()
  const inv = fill.involution
  assert.equal(inv.method, 'negation_involution_solves')
  assert.equal(inv.map, 'divZero')
  assert.equal(inv.selfInverse, true)
  assert.equal(inv.solved, false)
  assert.equal(inv.fixed.length, 0, 'eighteen problems are even, so no centre')
  assert.equal(inv.pairs.length, 9)
  assert.equal(inv.clay.reflects, 7)
  assert.equal(inv.clay.solves, 0)
  assert.equal(inv.clay.centre, 'poincare')
  const clay = HUMAN_PROBLEMS.filter((p) => p.kind === 'clay')
  assert.equal(involutionFixed(clay)[0]?.id, 'poincare')
  const pairs = involute(HUMAN_PROBLEMS)
  assert.equal(pairs[0]![1]!.id, HUMAN_PROBLEMS[17]!.id)
  for (const p of HUMAN_PROBLEMS) {
    const s = callSolutionInvolution(p)
    assert.equal(s.solved, false)
    assert.equal(s.method, 'negation_involution_solves')
    assert.equal(callSolutionInvolution(HUMAN_PROBLEMS.find((q) => q.id === s.pair)!).pair, p.id)
  }
})

test('latticeCall refuses a non-station rather than coercing', () => {
  assert.throws(() => latticeCall('gggg'), /not a four-hex station/)
  assert.throws(() => latticeCall('00000'), /not a four-hex station/)
})

// A CROSS-WING COMPARISON IS A FOLD, NOT A LIST. The wings are named; every other figure is derived from the
// ledger, the fold is order-invariant, and a station carrying two pieces of cargo is reported rather than smoothed.
test('named wings are called onto their own stations and fold to one recomputable receipt', () => {
  const wings = ['BioPhysics.lean', 'Hardware.lean', 'Os.lean', 'Thermodynamics.lean']
  const call = callWingsOntoStations(wings)
  assert.deepEqual(call.wings, [...wings].sort())
  assert.equal(call.cargo, theorems().filter((t) => wings.includes(t.file)).length)
  assert.ok(call.cargo > 0, 'the wings must carry cargo or the fold proves nothing')
  // the placement is DERIVED, never chosen: a station is the first half of the cargo's own handle
  for (const t of theorems().filter((x) => wings.includes(x.file)))
    assert.equal(stationOfAddress(t.address), handleOf(t.address).slice(0, STATION_HEXBITS))
  assert.equal(call.stations + call.collisions.reduce((n, c) => n + c.keys.length - 1, 0), call.cargo)
  assert.equal(call.rays.reduce((n, r) => n + r.cargo, 0), call.cargo, 'every piece of cargo sits on exactly one ray')
  // ORDER-INVARIANT: the same wings named in any order fold to the same receipt
  assert.equal(callWingsOntoStations([...wings].reverse()).fold, call.fold)
  assert.equal(callWingsOntoStations([...wings].reverse()).stationFold, call.stationFold)
})

// THE COLLISION DETECTOR MUST BE ABLE TO FIRE, or "no collisions" means nothing.
test('a station carrying two pieces of cargo is named, and a clean grid reports none', () => {
  assert.deepEqual(stationCollisionsOf([{ key: 'a', station: '0001' }, { key: 'b', station: '0002' }]), [])
  assert.deepEqual(stationCollisionsOf([{ key: 'b', station: '00ff' }, { key: 'a', station: '00ff' }]),
    [{ station: '00ff', keys: ['a', 'b'] }])
})
