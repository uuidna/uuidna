// proof-cache-sign — the signed proof cache's four verdict classes on trial (queue captain-item 4, the
// mechanism half). The module captures UUIDNA_PROOF_KEY at import, so each regime imports lean-gen FRESH via
// a cache-busting query — the test controls the key the way a host does: by the environment at load.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const load = async (key: string | undefined): Promise<typeof import('../../../scripts/lean-gen.js')> => {
  if (key === undefined) delete process.env.UUIDNA_PROOF_KEY
  else process.env.UUIDNA_PROOF_KEY = key
  // THE TYPE AND THE IMPORT MUST NAME THE SAME FILE. The annotation above reaches '../../../scripts/lean-gen.js'
  // and this line reached '../scripts/...' — so tsc checked the real module while the runtime asked for
  // quantum/os/scripts/lean-gen.js, which does not exist. A type-only path is not evidence the import resolves.
  return import('../../../scripts/lean-gen.js?key=' + encodeURIComponent(String(key)))
}

test('a keyed host mints signed entries, verifies them, and DISTRUSTS the unsigned and the forged', async () => {
  const g = await load('test-secret')
  const entry = g.signProofEntry('Wing.lean', 'addr-1')
  assert.match(entry, /^addr-1\|[0-9a-f]{64}$/, 'the mint carries the hmac beside the address')
  assert.equal(g.proofEntryValid(entry, 'Wing.lean', 'addr-1'), true, 'a signed entry verifies on the host that minted it')
  assert.equal(g.proofEntryValid('addr-1', 'Wing.lean', 'addr-1'), false, 'an UNSIGNED entry is distrusted on a keyed host — this is the closed hole')
  assert.equal(g.proofEntryValid('addr-1|' + 'f'.repeat(64), 'Wing.lean', 'addr-1'), false, 'a forged signature is distrusted')
  assert.equal(g.proofEntryValid(entry, 'Other.lean', 'addr-1'), false, 'a signature is bound to ITS file — replayed under another name it fails')
  assert.equal(g.proofEntryValid(entry, 'Wing.lean', 'addr-2'), false, 'a moved address always re-proves, signature or not')
})

test('a keyless host keeps the weaker address-match floor — named, not smoothed', async () => {
  const g = await load(undefined)
  assert.equal(g.signProofEntry('Wing.lean', 'addr-1'), 'addr-1', 'a keyless mint is the bare address (the old floor)')
  assert.equal(g.proofEntryValid('addr-1', 'Wing.lean', 'addr-1'), true, 'address match suffices without a key')
  assert.equal(g.proofEntryValid('addr-1|deadbeef', 'Wing.lean', 'addr-1'), true, 'a keyless host cannot check a signature — the address still gates')
  assert.equal(g.proofEntryValid('addr-2', 'Wing.lean', 'addr-1'), false, 'a moved address re-proves everywhere')
  assert.equal(g.proofEntryValid(undefined, 'Wing.lean', 'addr-1'), false, 'no entry, no skip')
})
