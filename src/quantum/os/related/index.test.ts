// quantum/os/related — WHICH PACKAGES THE THEOREMS RELATE TO, adjudicated. The properties: a ported package that
// the wings name is PORTED; a package named only inside a ported package's own published description is QUOTED
// (refuted, with the quote as the reason); an ordinary-English name is UNDECIDED (claimed neither way); a name
// that is genuinely named and NOT ported would appear as undecided and keep `closed` false — the instrument
// cannot quietly report a complete port. Controls that fail included, because a relatedness test that says
// "all related packages are carried" while being unable to detect an uncarried one would prove nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { relatedPackages } from './index.js'
import { defaultInstalls } from '../index.js'
import { callTool } from '../../../mcp.js'

const PORTED = defaultInstalls().specs.map((s) => s.name)

test('a ported package the wings name is PORTED — related, and already carried', () => {
  const r = relatedPackages(['busybox', 'musl'], 'the terminal is busybox and musl is the floor')
  assert.deepEqual(r.ported, ['busybox', 'musl'])
  assert.equal(r.quoted.length, 0)
  assert.equal(r.undecided.length, 0)
  assert.equal(r.closed, true, 'nothing outside the port was left undecided')
})

test('a name occurring only inside a ported package\'s own description is QUOTED — refuted, with its reason', () => {
  // libcrypto3's published description is "Crypto library from openssl" — the ledger quoting that is NOT
  // the ledger naming the openssl package.
  const r = relatedPackages(['openssl'], 'the wing carries "Crypto library from openssl" as a meaning')
  assert.equal(r.ported.length, 0)
  assert.equal(r.quoted.length, 1, 'openssl is refuted by the quote, not counted as a new related package')
  assert.equal(r.quoted[0]!.name, 'openssl')
  assert.match(r.quoted[0]!.why, /published description/)
})

test('an ordinary-English name is UNDECIDED — claimed neither related nor unrelated', () => {
  const r = relatedPackages(['cargo'], 'the register orders the ideas: address first, cargo later')
  assert.equal(r.undecided.length, 1, 'the English sense cannot be settled lexically')
  assert.equal(r.undecided[0]!.name, 'cargo')
  assert.equal(r.closed, false, 'an undecided candidate means the port is NOT provably closed')
})

test('CONTROL — the instrument CAN report an uncarried package; it is not closed by construction', () => {
  // a package that is not ported, not quoted by any description, and named plainly: it must surface and it
  // must keep `closed` false. Without this the "everything related is carried" claim would be unfalsifiable.
  const r = relatedPackages(['zzz-not-a-real-package'], 'the wing names zzz-not-a-real-package directly')
  assert.equal(r.ported.length, 0)
  assert.equal(r.undecided.length + r.quoted.length, 1, 'the uncarried name surfaces rather than vanishing')
  assert.equal(r.closed, false, 'an uncarried named package must NOT read as a closed port')
  // and the negative control: a name the haystack never mentions is not a candidate at all
  const none = relatedPackages(['zzz-not-a-real-package'], 'the wing says nothing of the sort')
  assert.equal(none.candidates, 0)
})

test('over the REAL port: every ported package is named, and the receipt is change-sensitive', () => {
  const hay = PORTED.join(' ')                       // the wings do name every ported package (Installs.lean)
  const r = relatedPackages(PORTED, hay)
  assert.equal(r.ported.length, PORTED.filter((n) => n.length > 3).length, 'each ported name is adjudicated PORTED')
  assert.equal(r.receipt, relatedPackages(PORTED, hay).receipt, 'deterministic')
  // a candidate must be both a known package name AND mentioned — vary both, and the receipt must move
  assert.notEqual(r.receipt, relatedPackages([...PORTED, 'cargo'], hay + ' cargo').receipt,
    'a newly named package moves the receipt')
})

test('the SERVED tool adjudicates against the SHIPPED ledger — a narrower haystack than the Lean sources', () => {
  const r = callTool('uuidna_related', { names: ['busybox', 'openssl', 'cargo'] }) as ReturnType<typeof relatedPackages>
  assert.deepEqual(r.ported, ['busybox'], 'a carried package the ledger names is PORTED')
  assert.equal(r.undecided[0]?.name, 'cargo', 'an English collision is undecided, not guessed')
  assert.equal(r.closed, false, 'undecided candidates keep the port from reading as closed')
  // AND THE DISTINCTION THAT MATTERS: `openssl` is not even a CANDIDATE here. It occurs in the Lean SOURCE
  // prose (inside libcrypto3's quoted description) but not in the shipped ledger's keys/names/statements — and
  // the ledger is what every surface can recompute from, so the served verdict is measured against that. A
  // narrower haystack is the honest one to serve; the wider source verdict (where openssl is QUOTED) is a
  // host-side reading, not something the edge can reproduce.
  assert.ok(!r.quoted.some((q) => q.name === 'openssl'), 'openssl is absent from the shipped ledger, so it is not adjudicated here')
  assert.equal(r.candidates, 2, 'only busybox and cargo are mentioned in the shipped ledger')
})
