// rosetta-seals.test — the door earns its own test, and the test can fail.
//
// tool-exercise refused a landing over this: uuidna_rosetta_seals (standard name get_verdict_signatures) was reachable
// only through the aggregate sweep, which calls every tool and checks that none throws. That is a liveness check, not
// a test: BY CONSTRUCTION it cannot tell a door that answers correctly from one that answers `{}`, because the only
// thing it asserts is the absence of a throw. The baseline exists for doors
// genuinely deferred, and putting this one there would have been recording a debt instead of paying it.
//
// WHAT THIS ASSERTS, and each part is a thing that has actually gone wrong in this tree:
//  · the door answers on BOTH surfaces — in-process callTool and the JSON-RPC wire — because a tool that works one
//    way and not the other is the class mcp-surface exists to catch;
//  · every row's `faces` is bounded by VE_FACES, read from the constant rather than written as 14;
//  · a row is `signed` only when its signature count REACHES that bound, so a partially-signed verdict never reads
//    as sealed — which is the whole point of the fourteen faces;
//  · the answer distinguishes UNMEASURED from zero. The seal file is repo-only, so a served run reads the ledger but
//    not the witnesses, and it must then report sealsMeasured:false with null seal columns rather than "nothing is
//    signed". An absent measurement is not a clean one.
//  · AND THE CONTROL: the row set is non-empty and at least one row owes its signatures. A door that returned an
//    empty list would satisfy every universal above by vacuity, so the last assertion refuses that reading.
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { rosettaSeals } from './rosetta-seals.js'
import { callTool } from './mcp.js'
import { handleMcpRpc } from './mcp-http.js'
import { VE_FACES } from './hexbit/index.js'

interface Row { handle: string; theorem: string; kind: string; inLedger: boolean; faces: number; seal: string | null; signed: boolean; owes: string }
interface Seals { faces: number; sealsMeasured: boolean; rows: Row[]; sealedCount: number; owingCount: number; owing: string[]; receipt: string; honest: string }

test('uuidna_rosetta_seals answers, and the fourteen faces are the ledger constant rather than a numeral', () => {
  const s = rosettaSeals() as unknown as Seals
  assert.equal(s.faces, VE_FACES, 'the face count is VE_FACES, read from hexbit/index.ts')
  assert.ok(Array.isArray(s.rows))
  assert.equal(typeof s.receipt, 'string')
  assert.ok(s.honest.length > 40, 'every answer carries its own honesty clause')

  for (const r of s.rows) {
    assert.ok(r.faces >= 0 && r.faces <= s.faces, `${r.theorem}: ${r.faces} faces is outside 0…${s.faces}`)
    // SIGNED MEANS ALL OF THEM. A verdict at thirteen faces is not sealed, and reading it as sealed is exactly the
    // failure the 2×7 rosetta exists to prevent.
    assert.equal(r.signed, r.faces === s.faces, `${r.theorem}: signed must mean faces === ${s.faces}, not ${r.faces}`)
    if (!r.signed) assert.ok(r.owes.length > 0, `${r.theorem}: an unsigned row must say what it owes`)
    assert.ok(['involution', 'proof', 'measurement'].includes(r.kind), `${r.theorem}: unknown verdict kind ${r.kind}`)
  }
})

test('the counts agree with the rows they count — a summary that drifts from its own list reports nothing', () => {
  const s = rosettaSeals() as unknown as Seals
  assert.equal(s.sealedCount, s.rows.filter((r) => r.signed).length)
  if (s.sealsMeasured) {
    assert.equal(s.owingCount, s.owing.length)
    for (const h of s.owing) assert.ok(s.rows.some((r) => r.handle === h), `owing names ${h}, which is in no row`)
  } else {
    // UNMEASURED, NOT ZERO: with no seal file every row owes, and the seal column must be null rather than a value
    assert.equal(s.owingCount, s.rows.length)
    for (const r of s.rows) assert.equal(r.seal, null, `${r.theorem}: a seal was reported while nothing was measured`)
  }
})

test('the door answers identically in-process and over the JSON-RPC wire', () => {
  const direct = callTool('uuidna_rosetta_seals', {}) as unknown as Seals
  const rpc = handleMcpRpc({
    jsonrpc: '2.0', id: 1, method: 'tools/call',
    params: { name: 'uuidna_rosetta_seals', arguments: {} },
  }) as { result?: { content?: { text: string }[] } }
  const text = rpc.result?.content?.[0]?.text
  assert.ok(text, 'the wire returned no content for a tool the catalogue carries')
  const wire = JSON.parse(String(text)) as Seals
  assert.equal(wire.receipt, direct.receipt, 'the two surfaces folded different receipts for the same question')
  assert.equal(wire.rows.length, direct.rows.length)
  assert.equal(wire.faces, direct.faces)
})

test('THE CONTROL — the row set is not empty, and at least one verdict still owes its faces', () => {
  // Every assertion above is a universal over `rows`, so an empty list would pass them all while proving nothing.
  // This is the arm that fails if the door stops reading the ledger.
  const s = rosettaSeals() as unknown as Seals
  assert.ok(s.rows.length > 0, 'the ledger seals verdict theorems; a door that finds none is not reading it')
  assert.ok(s.rows.some((r) => !r.signed), 'if every verdict were sealed, the signed/owes split could not be tested')
  // and the receipt commits to the rows: two calls on one tree fold the same, a different tree would not
  assert.equal(rosettaSeals().receipt, s.receipt, 'the receipt is not deterministic over one tree')
})
