// agent/memory — MEMORY THAT REMEMBERS ITSELF, tested. The properties are the four things an agent normally
// asks its own model and gets an opinion for: is this the same fact, do I already hold it, do we agree, and is
// what you handed me really what was stored. Each is arithmetic here, so each is tested WITH the mutation that
// breaks it (scripts/api.ts's falsifiability law) — and the honest limit is tested too: exact identity is not
// semantic identity, and a memory that pretended otherwise would be lying in the direction that flatters it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addressOf, empty, forget, knows, missing, recall, receipt, remember, shelf, union, verify } from './agent/memory/index.js'
import { UUID } from './test-api.js'

const store3 = () => {
  let s = empty()
  s = remember(s, 'measurement', 'the fan-out ran 29 checks over 14 lanes').store
  s = remember(s, 'decision', 'the shell is resolved once, before any step runs').store
  s = remember(s, 'constraint', 'no host binary is ever executed by the library core').store
  return s
}

test('a fact IS its address — storing it twice grows nothing, and no comparison was asked to decide that', () => {
  const first = remember(empty(), 'decision', 'refuse rather than guess')
  assert.match(first.held.address, UUID)
  assert.equal(first.added, true)
  const again = remember(first.store, 'decision', 'refuse rather than guess')
  assert.equal(again.added, false, 'the second telling added nothing — dedupe with no threshold and no judgment')
  assert.equal(again.store.size, 1)
  assert.equal(again.held.address, first.held.address)
  // THE MUTATIONS THAT MUST MOVE IT: the text, and the shelf it sits on
  assert.notEqual(remember(empty(), 'decision', 'refuse rather than guess.').held.address, first.held.address)
  assert.notEqual(remember(empty(), 'constraint', 'refuse rather than guess').held.address, first.held.address)
})

test('recall answers, and answers NOTHING for what was never stored', () => {
  const s = store3()
  const known = addressOf('decision', 'the shell is resolved once, before any step runs')
  assert.equal(recall(s, known)?.fact, 'the shell is resolved once, before any step runs')
  assert.equal(knows(s, 'decision', 'the shell is resolved once, before any step runs'), true)
  // the failure this module exists to remove: a plausible answer for an address never held
  assert.equal(recall(s, addressOf('decision', 'something nobody ever said')), null)
  assert.equal(knows(s, 'decision', 'something nobody ever said'), false)
})

test('a recollection from elsewhere is CHECKED, not trusted — tamper with either half and it is refused', () => {
  const { held } = remember(empty(), 'measurement', '33372ms serial, 3853ms measured')
  assert.equal(verify(held).ok, true)
  // the three ways a transferred memory can arrive wrong, each caught with its reason named
  assert.equal(verify({ ...held, fact: '33372ms serial, 385ms measured' }).ok, false)
  assert.equal(verify({ ...held, kind: 'decision' }).ok, false)
  assert.equal(verify({ ...held, address: addressOf('measurement', 'something else') }).ok, false)
  assert.match(verify({ ...held, fact: 'altered' }).why, /REFUSED/)
})

test('two agents agree by comparing 128 bits, and merge order cannot change what they agree on', () => {
  const a = store3()
  const b = store3()
  assert.equal(receipt(a), receipt(b), 'the same facts fold to the same receipt — agreement without exchanging stores')

  const mine = remember(empty(), 'decision', 'mine alone').store
  const theirs = remember(empty(), 'decision', 'theirs alone').store
  assert.equal(receipt(union(mine, theirs)), receipt(union(theirs, mine)), 'merging in either order reaches ONE receipt')
  assert.notEqual(receipt(mine), receipt(theirs), 'and different knowledge is a different receipt — the control')

  // the cheap half of a sync: what am I owed, without either side sending its store
  assert.deepEqual(missing(mine, theirs).map((r) => r.fact), ['theirs alone'])
  assert.deepEqual(missing(theirs, theirs), [], 'an agent is owed nothing by itself')
})

test('the empty memory is a state like any other, and forgetting leaves the old fold answerable', () => {
  assert.match(receipt(empty()), UUID, '"I hold nothing" must be comparable, not a special case')
  const { store, held } = remember(empty(), 'decision', 'to be dropped')
  const before = receipt(store)
  const after = forget(store, held.address)
  assert.equal(after.size, 0)
  assert.equal(receipt(after), receipt(empty()))
  assert.equal(receipt(store), before, 'the store that was folded is unchanged — every verb returns a new one')
  assert.equal(forget(store, addressOf('decision', 'never held')), store, 'forgetting the unknown changes nothing')
})

test('shelves list identically for any two agents holding the same facts', () => {
  const s = store3()
  assert.deepEqual(shelf(s, 'decision').map((r) => r.fact), ['the shell is resolved once, before any step runs'])
  assert.equal(shelf(s, 'nothing-on-this-shelf').length, 0)
  // address-sorted, so two agents that stored the same facts in opposite orders still read them back the same way
  let reversed = empty()
  reversed = remember(reversed, 'constraint', 'no host binary is ever executed by the library core').store
  reversed = remember(reversed, 'decision', 'the shell is resolved once, before any step runs').store
  reversed = remember(reversed, 'measurement', 'the fan-out ran 29 checks over 14 lanes').store
  assert.deepEqual(shelf(reversed, 'decision'), shelf(s, 'decision'))
  assert.equal(receipt(reversed), receipt(s))
})

test('THE HONEST LIMIT — exact identity is not semantic identity, and this store does not pretend it is', () => {
  // Two sentences one reader would call the same fact. They are two addresses here, and the store holds both.
  // Pinned deliberately: the tempting overclaim is that content-addressing dedupes MEANING, and an agent that
  // believed that would silently drop knowledge it thinks it already has. Judging paraphrase is still the model's
  // work — this module replaces the model only where the answer is arithmetic.
  let s = empty()
  s = remember(s, 'measurement', 'the gate runs 29 checks').store
  s = remember(s, 'measurement', 'there are 29 checks in the gate').store
  assert.equal(s.size, 2, 'a paraphrase is a different address — the limit, stated as a test rather than a hope')
})
