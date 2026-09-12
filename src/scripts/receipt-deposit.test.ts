import { test } from 'node:test'
import assert from 'node:assert/strict'
import { depositRequestOf, QPU_RECEIPTS } from './receipt-deposit.js'
import { coversMatch, verifyOnQpu } from './receipt-verify-qpu.js'
import { treeCovers } from '../gate-receipt-index.js'

// THE RECEIPT REGISTRY IS QPU: a landing deposits its covers by bearer; a verifier proves a commit by one fetch.
test('the deposit is a bearer PUT of the covers to the commit key, and refuses without a token', () => {
  const receipt = { covers: { src: 'a'.repeat(32), lean: 'b'.repeat(32) }, verified: ['guard', 'tests'] }
  const r = depositRequestOf(receipt, 'abcdef1234567890', 'secret')
  assert.equal(r.url, `${QPU_RECEIPTS}/abcdef1234567890`)
  assert.equal(r.init.method, 'PUT')
  assert.equal(r.init.headers.authorization, 'Bearer secret')
  assert.ok(r.init.body.length < 1000000)
  assert.deepEqual(JSON.parse(r.init.body).covers, receipt.covers)
  assert.throws(() => depositRequestOf(receipt, 'abcdef1234567890', undefined), /QPU_WRITE_TOKEN/)
  assert.throws(() => depositRequestOf(receipt, 'not a sha', 'secret'), /hex sha/)
})

test('verification proves only an equal, same-commit deposit; every other answer falls back', async () => {
  const local = treeCovers()
  assert.equal(coversMatch(local, local), true)
  assert.equal(coversMatch({ src: 'x', lean: local.lean! }, local), false)
  assert.equal(coversMatch(undefined, local), false)
  const answer = (status: number, body: unknown): typeof fetch => async () => new Response(JSON.stringify(body), { status })
  assert.equal((await verifyOnQpu('abc1234', answer(404, {}))).proven, false)
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: { commit: 'abc1234', covers: local } }))).proven, true)
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: { commit: 'other12', covers: local } }))).proven, false)
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: { commit: 'abc1234', covers: { src: 'x', lean: 'y' } } }))).proven, false)
})
