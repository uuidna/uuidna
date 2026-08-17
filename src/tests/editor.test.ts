// editor — the SERIALIZER CONTRACT, tested against the SAME laws lean/Editor.lean proves by decide. The Lean theorems
// prove the abstract positional fold dfold is order-sensitive, change-sensitive and bounded-injective; these tests
// prove the real fold (serialize → merkleRoot over uuids) obeys the same laws on real Lexical-shaped node trees. The
// proof is the contract; the test is the witness that the code meets it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { serialize, documentAddress, documentHandle, reAddress, payloadFoldHook, type EditorState } from '../index.js'

const doc = (...paras: string[]): EditorState => ({
  root: { type: 'root', children: paras.map((t) => ({ type: 'paragraph', children: [{ type: 'text', text: t }] })) },
})

test('deterministic — the same document folds to the same address (editor_empty / same tree, same fold)', () => {
  const a = doc('alpha', 'beta', 'gamma')
  assert.equal(documentAddress(a), documentAddress(doc('alpha', 'beta', 'gamma')))
  assert.equal(documentHandle(a).length, 8)                       // cite the handle, recompute the fold
  assert.equal(documentAddress(a), reAddress(a).address)          // reAddress is the same fold
})

test('ORDER-SENSITIVE — reordering paragraphs MOVES the address (editor_fold_order_sensitive: a document is a sequence, not a set)', () => {
  assert.notEqual(documentAddress(doc('alpha', 'beta')), documentAddress(doc('beta', 'alpha')))
  // ...and this is the OPPOSITE of the memory store's order-invariant fold — the whole point of the honest distinction.
})

test('CHANGE-SENSITIVE — editing any node MOVES the address, an untouched doc does not (editor_fold_change_sensitive)', () => {
  const before = doc('alpha', 'beta', 'gamma')
  assert.notEqual(documentAddress(before), documentAddress(doc('alpha', 'BETA', 'gamma'))) // one node edited → moves
  assert.equal(documentAddress(before), documentAddress(doc('alpha', 'beta', 'gamma')))    // nothing edited → same
  // a formatting change (an extra key on a node) also moves it — serialize folds every field
  const fmt: EditorState = { root: { type: 'root', children: [{ type: 'paragraph', format: 'bold', children: [{ type: 'text', text: 'alpha' }] }] } }
  assert.notEqual(documentAddress(fmt), documentAddress(doc('alpha')))
})

test('NESTING-SENSITIVE — depth is part of identity; a flat doc ≠ the same text nested', () => {
  const flat: EditorState = { root: { type: 'root', children: [{ type: 'text', text: 'x' }] } }
  const nested: EditorState = { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'x' }] }] } }
  assert.notEqual(documentAddress(flat), documentAddress(nested))
})

test('payloadFoldHook — the Payload save hook stamps _handle + _address, and passes through a record with no editorState', () => {
  const hook = payloadFoldHook('content')
  const state = doc('alpha', 'beta')
  const out = hook({ data: { title: 'note', content: state } })
  assert.equal(out._address, documentAddress(state))             // the stored record carries its own receipt
  assert.equal(out._handle, documentHandle(state))
  assert.equal(out.title, 'note')                                // other fields untouched
  assert.deepEqual(hook({ data: { title: 'no-body' } }), { title: 'no-body' }) // nothing to fold → pass through
})
