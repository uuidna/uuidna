// upgrade-wave — THE WAVE DISTRIBUTES, IT DOES NOT AUTHOR.
//
// Almost every sealed theorem owes a witness, a falsifier or both, and a bare handful stand on all five — the
// census counts them, this comment does not. That is thousands of pieces of nameable work, and the conveyor
// reported plenty available against nothing pending: the work was nameable and not TAKEABLE. Nothing let two
// agents split it without colliding on the same theorem.
//
// So the wave shards by each theorem's OWN ADDRESS, which makes the assignment a property of the ledger rather
// than of who asked first: no registry, no lock, no coordination, and the same answer forever. What it must NOT
// do is invent the legs, and the last test here is the one that holds that line.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { upgrades, laneWork, waveCensus, renderLane, AUTHORED } from '../upgrade-wave.js'
import { mirrorRows } from '../rosetta-legs.js'

test('the lanes PARTITION the work — every theorem in exactly one, none lost, none twice', () => {
  const lanes = 14
  const all = upgrades(lanes)
  const gathered = Array.from({ length: lanes }, (_, i) => laneWork(i, lanes)).flat()
  assert.equal(gathered.length, all.length, 'the lanes together hold everything and nothing extra')
  const keys = new Set(gathered.map((u) => u.key))
  assert.equal(keys.size, gathered.length, 'no theorem appears in two lanes — that is the collision this prevents')
  assert.equal(keys.size, new Set(all.map((u) => u.key)).size)
})

test('the assignment is DETERMINISTIC — two callers get the same lane without speaking', () => {
  // the property that removes the lock: the address decides, so an agent asking for lane 3 today and another
  // asking tomorrow receive the same list, and neither needs a registry to know the other is not on it.
  const a = laneWork(3, 14).map((u) => u.key)
  const b = laneWork(3, 14).map((u) => u.key)
  assert.deepEqual(a, b)
  assert.equal(waveCensus(14).receipt, waveCensus(14).receipt, 'the census folds to one receipt, recomputable')
})

test('the shard is BALANCED over the live ledger — measured, not hoped', () => {
  const c = waveCensus(14)
  assert.equal(c.perLane.length, 14)
  assert.equal(c.perLane.reduce((a, b) => a + b, 0), c.total, 'every piece assigned exactly once')
  const fair = c.total / 14
  // folded rather than taken from the host's own extremum helpers: the determinism scan hard-rejects those
  // with no exemption anywhere, and it caught this line's first draft
  const heaviest = c.perLane.reduce((a, b) => (b > a ? b : a), 0)
  const lightest = c.perLane.reduce((a, b) => (b < a ? b : a), c.perLane[0]!)
  assert.ok(heaviest <= fair * 1.5, `no lane may carry half again its share: heaviest ${heaviest}, fair ${fair.toFixed(0)}`)
  assert.ok(lightest > 0, 'and no lane may sit idle while others work')
})

test('re-laning moves the work but never loses it — the shard is a view, not a state', () => {
  for (const lanes of [1, 7, 14, 32]) {
    const c = waveCensus(lanes)
    assert.equal(c.perLane.reduce((a, b) => a + b, 0), c.total, `${lanes} lanes must still hold everything`)
    assert.equal(c.total, waveCensus(14).total, 'the amount of work does not depend on how it is divided')
  }
})

test('the census counts LEGS as well as theorems — they are different amounts of work', () => {
  const c = waveCensus()
  const rows = mirrorRows()
  assert.equal(c.total + c.anchored, rows.length, 'every row either owes an authored leg or stands on five')
  assert.ok(c.legs >= c.total, 'a theorem owing both legs is two pieces of work, not one')
  assert.ok(c.anchored >= 0)
  // the live figure this was built against — asserted as a SHAPE, since it moves as the ledger is anchored
  assert.ok(c.total > 1000, `the anchoring backlog is real: ${c.total} theorems owe a leg`)
})

// ── THE LINE. Everything above is distribution; this is the thing the wave must never do.
test('the wave OWES only authored legs — it never claims a leg the ledger mints', () => {
  const minted = ['symbol', 'proof', 'address']
  for (const u of upgrades()) {
    for (const leg of u.owes) {
      assert.ok(AUTHORED.includes(leg), `${u.key}: the wave may only hand out an authored leg, not ${leg}`)
      assert.ok(!minted.includes(leg), `${u.key}: ${leg} is minted by construction — handing it out would be busywork`)
    }
    assert.ok(u.owes.length > 0 && u.owes.length <= 2, `${u.key}: a theorem owes one leg or two, never more`)
  }
})

test('it hands out WORK, not answers — nothing here is a witness or a falsifier', () => {
  // the honest scope, asserted rather than trusted: an Upgrade names a theorem and what it lacks. If this type
  // ever grew a field carrying the witness TEXT, the wave would have started authoring, and the ledger would be
  // accepting legs no person answered for.
  const one = upgrades()[0]!
  assert.deepEqual(Object.keys(one).sort(), ['address', 'handle', 'key', 'lane', 'owes', 'wing'])
  assert.match(waveCensus().honest, /never authors it/)
  // and the render tells a reader what is owed, without suggesting what to write
  const shown = renderLane(0, 14, 3).join('\n')
  assert.match(shown, /owes/)
  assert.doesNotMatch(shown, /witness:|falsifier:/, 'it states the debt, never a draft of the payment')
})
