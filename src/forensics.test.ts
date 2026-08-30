// Forensics tests — audit agent statements against the receipts. A false trial cannot survive recomputation: a
// fabricated citation, a false address, an unbacked legal claim, a drained overclaim are all recomputable facts about
// the CLAIM, never accusations. A clean, backed statement passes. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { forensics, auditAgents, toUuid, THEOREMS } from './index.js'

const realKey = THEOREMS[0].key

test('a clean, backed statement passes', () => {
  const r = forensics(`See the sealed proof at /theorem/${realKey} — recomputable by anyone.`)
  assert.equal(r.clean, true, JSON.stringify(r.violations))
})

test('a fabricated citation is caught', () => {
  const r = forensics('This is proven by /theorem/totally_made_up_theorem, trust me.')
  assert.ok(r.violations.some((v) => v.kind === 'fabricated-citation'))
})

test('a false address presented as sealed is caught', () => {
  const fake = '00000000-0000-8000-8000-000000000000'
  const r = forensics(`It is sealed at address ${fake}.`)
  assert.ok(r.violations.some((v) => v.kind === 'false-address'))
  // a real sealed address with the same framing does NOT flag
  const real = forensics(`It is sealed at address ${THEOREMS[0].address}.`)
  assert.ok(!real.violations.some((v) => v.kind === 'false-address'))
})

test('an address-mismatch (tamper/forgery) is caught by recomputation', () => {
  const r = forensics('here is my claim', { claims: [{ text: 'the original text', address: toUuid('the FORGED text') }] })
  assert.ok(r.violations.some((v) => v.kind === 'address-mismatch'))
  const good = forensics('here', { claims: [{ text: 'the original text', address: toUuid('the original text') }] })
  assert.ok(!good.violations.some((v) => v.kind === 'address-mismatch'))
})

test('an unbacked legal claim is flagged — a legal claim must carry a receipt', () => {
  const bare = forensics('This system is fully compliant and lawful.')
  assert.ok(bare.violations.some((v) => v.kind === 'unbacked-law'), 'bare legal claim carries no receipt')
  // the SAME legal claim WITH a receipt (a cited theorem) is legally FORMED
  const formed = forensics(`This is lawful, per the statement sealed at /theorem/${realKey}.`)
  assert.ok(!formed.violations.some((v) => v.kind === 'unbacked-law'), 'a legal claim carrying its receipt is well-formed')
})

test('an unbacked patent / IP-ownership claim is flagged (hardened from a real near-miss)', () => {
  // "uuidna holds all the patents" once passed clean because "patent" was not in the legal lexicon. Now it flags.
  assert.ok(forensics('uuidna holds all the patents of the discoveries made in uuidna')
    .violations.some((v) => v.kind === 'unbacked-law'), 'a bare patent claim carries no receipt')
  assert.ok(forensics('this method is patented and proprietary').violations.some((v) => v.kind === 'unbacked-law'))
})

test('auditAgents aggregates a stream and folds to one receipt', () => {
  const a = auditAgents([
    `clean and backed: /theorem/${realKey}`,
    'proven by /theorem/nonexistent_thing',
    'this is unbreakable and lawful',
  ])
  assert.equal(a.count, 3)
  assert.ok(a.withViolations >= 2)
  assert.match(a.receipt, /^[0-9a-f-]{36}$/)
})
