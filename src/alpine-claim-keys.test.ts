import { test } from 'node:test'
import assert from 'node:assert/strict'
import { alpineExpectedClaimKeys } from './quantum/os/domains/index.js'
import { allDomainCensuses } from './quantum/os/domains/index.js'
import { alpineDiscoveryCensus } from './quantum/os/discovery/index.js'

// THE GATE MUST EXPECT NAMES THE TREE ACTUALLY MINTS, and nothing before this test checked that it did.
//
// alpineExpectedClaimKeys builds the keys the current catalogue implies, and the fill-gaps arc runs or skips two
// phases on whether the ledger and the conveyor already hold them. It shipped with one key wrong: discovery mints
// alpine_binding_origins_overcount_<ORIGIN COUNT> (16083, because the claim is ABOUT origins) and the gate asked
// for the CATALOGUE count (28635). No depositor has ever minted that name, so it could be neither sealed nor
// queued, and the gate reported work pending on every pass forever — a phase running with a known answer, which
// is the precise failure the signal was written to end.
//
// It survived review because I checked that the number CHANGED and never that the NAME was real. So this test
// asks the only question that settles it: is every expected key one a depositor produces? It is the control the
// original had none of — and it fails on the exact bug, since 28635 appears nowhere in the minted set.
test('every expected Alpine claim key is one a depositor actually mints', () => {
  const minted = new Set<string>()
  for (const c of allDomainCensuses()) for (const cl of c.claims) minted.add(cl.key)
  for (const h of alpineDiscoveryCensus().harvest) minted.add(h.key)

  const expected = alpineExpectedClaimKeys()
  assert.ok(expected.length > 0, 'a primed catalogue implies claims; an empty expectation would make the gate blind')

  const phantom = expected.filter((k) => !minted.has(k))
  assert.deepEqual(phantom, [], 'a key no depositor mints can never be sealed or queued, so the gate that waits for it never goes quiet')
})
