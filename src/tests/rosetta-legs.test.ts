// rosetta-legs — the leg census, and the mirror the hosted edge answers from.
//
// The interesting failure this file is built to catch is not "the census is wrong". It is "the two surfaces stopped
// agreeing and nothing noticed" — the same shape as the hosted server advertising 0.1.1 while the package shipped
// 0.2.5. So the mirror is compared to a LIVE recompute key by key, and every other check carries a negative control,
// because a census that reports a number nothing can contradict is decoration.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  LEGS, LEG_BIT, legsOfMask, maskOfLegs, mirrorRows, legCensus, legsFor, canLocateFault, floorGaps,
  mirrorAgreement, type Rosetta,
} from '../rosetta-legs.js'
import { FLOOR } from '../rosetta-mirror.js'
import { census } from '../scripts/rosetta.js'
import { callTool, MCP_CATALOG } from '../mcp.js'
import { handleMcpRpc } from '../mcp-http.js'

const live = census()

// rows the tests own — three legs, two legs, five legs — so no assertion depends on the ledger's current shape
const THREE: Rosetta = { key: 'a', wing: 'W.lean', legs: ['symbol', 'proof', 'address'], missing: ['witness', 'falsifier'], claimedBy: 'captain' }
const TWO: Rosetta = { key: 'b', wing: 'W.lean', legs: ['symbol', 'proof'], missing: ['witness', 'falsifier', 'address'], claimedBy: 'captain' }
const FIVE: Rosetta = { key: 'c', wing: 'W.lean', legs: [...LEGS], missing: [], claimedBy: 'NIST' }

test('the leg mask round-trips for every subset of the five legs', () => {
  for (let m = 0; m < 32; m++) assert.equal(maskOfLegs(legsOfMask(m)), m, `mask ${m} must survive the round trip`)
  // NEGATIVE CONTROL: distinct leg sets must not collide onto one mask, or the mirror would be lossy
  const masks = new Set([...Array(32)].map((_, m) => maskOfLegs(legsOfMask(m))))
  assert.equal(masks.size, 32)
  assert.notEqual(LEG_BIT.witness, LEG_BIT.falsifier, 'the two scarce legs must occupy different bits')
})

test('THE MIRROR THE HOSTED EDGE ANSWERS FROM MATCHES A LIVE RECOMPUTE, KEY FOR KEY', () => {
  const agreement = mirrorAgreement(live)
  assert.deepEqual(agreement.disagreeing, [],
    'the hosted edge would answer from a stale census — run `node dist/scripts/rosetta.js`, then `npm run build`')
  assert.equal(agreement.agrees, true)
  assert.equal(agreement.mirrored, live.length)
  // NEGATIVE CONTROL: the comparison must SEE a difference. Drop one leg from one live row and it must be named.
  const tampered = live.map((r, i) => (i === 0 ? { ...r, legs: r.legs.filter((l) => l !== 'proof') } : r))
  const caught = mirrorAgreement(tampered)
  assert.equal(caught.agrees, false, 'if this passes, the mirror check cannot detect drift and is worth nothing')
  assert.deepEqual(caught.disagreeing, [live[0].key])
})

test('the two surfaces give the SAME answer for the same theorem', () => {
  const key = live.find((r) => r.legs.length === LEGS.length)?.key ?? live[0].key
  const stdio = callTool('uuidna_rosetta_legs', { key }) as { legs: string[]; wing: string; claimedBy: string }
  const rpc = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_rosetta_legs', arguments: { key } } }) as { result: { content: { text: string }[] } }
  const edge = JSON.parse(rpc.result.content[0].text) as { legs: string[]; wing: string; claimedBy: string }
  assert.deepEqual(edge.legs, stdio.legs, 'the same theorem must carry the same legs in the same order on both surfaces')
  assert.equal(edge.wing, stdio.wing)
  assert.equal(edge.claimedBy, stdio.claimedBy)
  // the whole-ledger receipt is order-invariant, so the two surfaces fold to ONE identity or they disagree
  const localCensus = callTool('uuidna_rosetta_legs', {}) as { receipt: string; total: number }
  const edgeCensus = JSON.parse((handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'uuidna_rosetta_legs', arguments: {} } }) as { result: { content: { text: string }[] } }).result.content[0].text) as { receipt: string; total: number }
  assert.equal(edgeCensus.receipt, localCensus.receipt)
  assert.equal(edgeCensus.total, localCensus.total)
})

test('three legs LOCATE a fault, two only DETECT one — the bound', () => {
  assert.equal(canLocateFault(THREE.legs), true)
  assert.equal(canLocateFault(TWO.legs), false, 'two correlated legs must never be reported as able to locate a fault')
  assert.match(legsFor([TWO], 'b').verdict, /DETECT/)
  assert.match(legsFor([THREE], 'a').verdict, /LOCATE/)
})

test('an unknown key is REFUSED — the census does not invent a theorem to describe', () => {
  assert.throws(() => legsFor(live, 'totally_made_up'), /no sealed theorem named "totally_made_up"/)
  assert.throws(() => callTool('uuidna_rosetta_legs', { key: 'totally_made_up' }), /no sealed theorem/)
  // NEGATIVE CONTROL: a key that DOES exist must be answered, or the refusal is just a broken lookup
  assert.equal(legsFor(live, live[0].key).key, live[0].key)
})

test('the census counts exactly, on rows whose answer is known in advance', () => {
  const c = legCensus([THREE, TWO, FIVE], { witness: 0, falsifier: 0 })
  assert.equal(c.total, 3)
  assert.equal(c.detectOnly, 1)
  assert.deepEqual(c.fullyAnchored, ['c'])
  assert.equal(c.perLeg.find((p) => p.leg === 'witness')?.theorems, 1)
  assert.equal(c.perLeg.find((p) => p.leg === 'symbol')?.theorems, 3)
  assert.deepEqual(c.byLegCount, [
    { legs: 5, theorems: 1, verdict: 'can locate a fault' },
    { legs: 3, theorems: 1, verdict: 'can locate a fault' },
    { legs: 2, theorems: 1, verdict: 'can only DETECT — the correlated pair' },
  ])
  assert.deepEqual(c.claimedBy, [{ who: 'captain', theorems: 2 }, { who: 'NIST', theorems: 1 }])
  // the receipt is order-invariant: the same rows in any order fold to one identity
  assert.equal(legCensus([FIVE, THREE, TWO], { witness: 0, falsifier: 0 }).receipt, c.receipt)
})

test('THE FLOOR MAY ONLY RISE, and the check FIRES when anchoring is lost', () => {
  // the shipped floor must be a real bound: a floor of zero is a check that cannot fail
  assert.ok(FLOOR.witness > 0 && FLOOR.falsifier > 0, 'a zero floor would pass for any ledger, however unanchored')
  assert.deepEqual(floorGaps(live, FLOOR), [], 'the live census must stand at or above the floor it published')
  // THE NEGATIVE OUTCOME, which is the whole point: strip the witnesses and the floor must object, by name
  const stripped = live.map((r) => ({ ...r, legs: r.legs.filter((l) => l !== 'witness'), missing: [...r.missing, 'witness' as const] }))
  const gaps = floorGaps(stripped, FLOOR)
  assert.equal(gaps.length, 1, 'losing every external witness must be caught')
  assert.match(gaps[0], /lost its external anchor/)
  // and losing a falsifier is its own, separately named failure
  const noTests = live.map((r) => ({ ...r, legs: r.legs.filter((l) => l !== 'falsifier') }))
  assert.match(floorGaps(noTests, FLOOR)[0], /stopped proving it can fail/)
})

test('the scarce legs are reported as they stand', () => {
  const c = legCensus(live)
  const witness = c.perLeg.find((p) => p.leg === 'witness')?.theorems ?? 0
  const falsifier = c.perLeg.find((p) => p.leg === 'falsifier')?.theorems ?? 0
  const proof = c.perLeg.find((p) => p.leg === 'proof')?.theorems ?? 0
  assert.equal(proof, c.total, 'every sealed theorem carries the kernel verdict by construction')
  assert.ok(witness < c.total / 10, 'the external witness is scarce, and a census claiming otherwise has stopped measuring')
  assert.ok(falsifier < c.total / 2)
  assert.equal(c.scarcest, 'witness')
  assert.ok(c.detectOnly > 0, 'theorems standing on the correlated pair alone exist and must be counted')
  assert.ok(MCP_CATALOG.some((t) => t.name === 'uuidna_rosetta_legs'))
})
