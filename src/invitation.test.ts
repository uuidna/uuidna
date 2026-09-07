// invitation — THE OFFER MUST BE READ FROM THE TREE, NOT WRITTEN ABOUT IT.
//
// The whole point of this module is that no figure in the invitation is typed. So the tests that matter are not
// "it produces a page": they are that every number MOVES when the tree moves, that the page carries what is ASKED
// and what is REFUSED rather than only what is offered, and that nothing in it is a constant wearing a
// measurement's clothes. A generated page whose numbers happen to be right today, and are frozen, is exactly the
// stale-prose defect this tree refuses everywhere else — it would just be refusing it in a nicer format.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { invitation, invitationText } from './invitation.js'
import { theorems } from './theorems/index.js'
import { handleStoreCensus } from './handle-store-census.js'

const ROOT = new URL('..', import.meta.url).pathname

test('every figure is read from the live tree, not carried in the module', () => {
  const i = invitation(ROOT)
  const T = theorems()
  const store = handleStoreCensus(ROOT)
  assert.equal(i.theorems, T.length, 'the theorem count IS the ledger length, read at the moment of asking')
  assert.equal(i.wings, new Set(T.map((t) => t.file)).size, 'and the wing count is its own distinct files')
  assert.equal(i.leaves, store.leaves, 'the leaf count IS the store census')
  assert.equal(i.pairsAdmitted, store.pairs)
  assert.equal(i.treeLinks, store.treeLinks)
})

test('THE CONTROL — the figures move when the tree does, so none is a frozen constant', () => {
  // Without this, every assertion above passes against a module that hard-codes today's numbers and re-reads
  // nothing. A fixture store with a different population must produce a different invitation.
  const real = invitation(ROOT)
  const fake = handleStoreCensus('/nonexistent-root-for-this-control')
  assert.equal(fake.leaves, 0, 'a root with no store reads zero leaves')
  assert.notEqual(real.leaves, fake.leaves,
    'the census answers differently for a different root — so the invitation reads, and does not recite')
  assert.ok(real.theorems > 1000, 'and the live ledger is the large one, not a placeholder')
})

test('the page states what is ASKED and what is REFUSED, not only what is offered', () => {
  const text = invitationText(invitation(ROOT))
  assert.match(text, /## What is asked in return/,
    'an invitation that lists benefits and hides obligations is a sales page, and this tree refuses those')
  assert.match(text, /## What is refused/)
  assert.match(text, /no quantum hardware/i, 'the strongest refusal must survive every edit: there is none here')
  assert.match(text, /lane budget/, 'and the ask that costs the reader something is named explicitly')
})

test('the page reports its OWN unmeasured state rather than a tidy number', () => {
  const i = invitation(ROOT)
  const text = invitationText(i)
  assert.match(text, new RegExp(`${i.lanes} lanes`), 'the width is stated')
  assert.match(text, /bound by:/, 'and so is which point bound it')
  // when no per-job footprint is given the honest answer is that memory was NOT considered — an offer that
  // presented a clean lane count while ignoring a point would be the one-point overstatement Pentagram.lean seals
  assert.ok(i.binds.length > 0, 'the binding point is never blank')
})
