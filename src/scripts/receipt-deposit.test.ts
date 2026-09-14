import { test } from 'node:test'
import assert from 'node:assert/strict'
import { gateDepositOf } from './receipt-deposit.js'
import { coversMatch, verifyOnQpu } from './receipt-verify-qpu.js'
import { treeCovers } from '../gate-receipt-index.js'
import { toUuid, canonicalJson } from '../address.js'
import { receiptSealOf, SEALED_BY } from '../refusal-trials.js'

// THE RECEIPT REGISTRY IS QPU, REACHED THROUGH THE MCP DOOR: a landing deposits only what a verifier can recompute, and
// the verifier proves a commit by fetching the content address it derives itself — no token on any host.
test('the gate deposit carries only the recomputable proof, and refuses a commit that is not a sha', () => {
  const covers = { src: 'a'.repeat(32), lean: 'b'.repeat(32) }
  const body = gateDepositOf(covers, 'abcdef1234567890')
  assert.deepEqual(body, { kind: 'gate-receipt', repo: 'uuidna/uuidna', commit: 'abcdef1234567890', covers })
  assert.ok(!JSON.stringify(body).includes('Bearer'), 'no credential rides the body')
  assert.throws(() => gateDepositOf(covers, 'not a sha'), /hex sha/)
  // the address depends only on content: key order does not move it, one changed cover does
  assert.equal(toUuid(canonicalJson(gateDepositOf({ lean: covers.lean, src: covers.src }, 'abcdef1234567890'))), toUuid(canonicalJson(body)))
  assert.notEqual(toUuid(canonicalJson(gateDepositOf({ ...covers, src: 'c'.repeat(32) }, 'abcdef1234567890'))), toUuid(canonicalJson(body)))
})

test('the verifier fetches the content address it derives from this tree and the commit', async () => {
  let asked = ''
  const capture = (async (url: string) => { asked = url; return new Response('{}', { status: 404 }) }) as unknown as typeof fetch
  await verifyOnQpu('abc1234', capture)
  assert.equal(asked, `https://qpu.uuidna.com/storage/receipts/uuidna/gate/${toUuid(canonicalJson(gateDepositOf(treeCovers(), 'abc1234')))}`)
})

test('verification proves only an equal, same-commit deposit; every other answer falls back', async () => {
  const local = treeCovers()
  assert.equal(coversMatch(local, local), true)
  assert.equal(coversMatch({ src: 'x', lean: local.lean! }, local), false)
  assert.equal(coversMatch(undefined, local), false)
  const answer = (status: number, body: unknown): typeof fetch => async () => new Response(JSON.stringify(body), { status })
  assert.equal((await verifyOnQpu('abc1234', answer(404, {}))).proven, false)
  // what the door stores: the gate deposit signed by its 2×7 theorems
  const body = gateDepositOf(local, 'abc1234')
  const stored = { ...body, [SEALED_BY]: receiptSealOf(body) }
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: stored }))).proven, true)
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: body }))).proven, false, 'CONTROL: an unsigned receipt falls back')
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: { commit: 'other12', covers: local } }))).proven, false)
  assert.equal((await verifyOnQpu('abc1234', answer(200, { holds: true, value: { commit: 'abc1234', covers: { src: 'x', lean: 'y' } } }))).proven, false)
})
