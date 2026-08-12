// Smoke tests — run against the built dist. `npm test` builds first. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  toUuid, strictUuidna, merkleFold, digitalRoot, units, vortexOrbit,
  encrypt, decrypt, verifyEnvelope, sealSequence,
  imprintTextChain, readImprintTextChain,
  merkleRoot, merkleProof, verifyProof,
  computes, harness, reeducate, harness7, billUuidna, coins,
  renderTheorem, renderList, renderHero,
  merkleGravity, doubleTorusGravity, diamond, DIAMOND_FIXED, involute, involutionFixed,
  adjudicate, proveVerdict, verifyUuidna,
  THEOREMS, runTrial,
} from '../index.js'

// The seven dimension streams (0..7 above the floor) — one plaintext per dimension, used to cover the 7d ("777")
// encryption BIDIRECTIONALLY (encrypt ⇄ decrypt) PER STREAM. 21 tests total: the 9 above plus these 12.
const STREAMS = ['d1 · reflection', 'd2 · the pair', 'd3 · the trinity', 'd4 · the square', 'd5 · the diamond', 'd6 · the rosette', 'd7 · the dimensions']
const KEY = 'gold-string-60'

test('content-address is deterministic and context-free', () => {
  assert.equal(toUuid('uuidna'), toUuid('uuidna'))
  assert.notEqual(toUuid('a'), toUuid('b'))
  assert.match(toUuid('x'), /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  assert.equal(strictUuidna(3), strictUuidna(' 3 '))
})

test('the Lean 4 formal layer — its asserted ℤ/9 facts recompute true (toolchain-independent)', () => {
  // The .lean proofs (import Mathlib, sorry-free) cannot be `lake build`-verified without the toolchain, so this
  // REQUIRED test independently recomputes the exact arithmetic each Lean theorem asserts — the honest bridge:
  // compile-verification needs `lake build`; this confirms the claims are true regardless.
  const m9 = (n: number): number => ((n % 9) + 9) % 9
  assert.deepEqual(units(), [1, 2, 4, 5, 7, 8])                 // (ℤ/9)* — the six units (six harmonic solutions)
  assert.deepEqual(vortexOrbit(), [1, 2, 4, 8, 7, 5])           // the doubling circuit
  assert.equal(digitalRoot(432), 9)                            // a432 → digital root 9
  assert.equal(m9(3 * 3), 0)                                   // 3²≡0 mod 9 (three_sq_zero)
  assert.equal(m9(6 * 6), 0)                                   // 6²≡0 mod 9 (six_sq_zero)
  assert.equal(m9(2 * 5), 1)                                   // 2·5≡1 (two_mul_five)
  assert.equal(m9(4 * 7), 1)                                   // 4·7≡1 (four_mul_seven)
  assert.equal(m9(8 * 8), 1)                                   // 8·8≡1 (eight_self_inv)
  assert.ok(![0, 1, 2, 3, 4, 5, 6, 7, 8].some((x) => m9(3 * x) === 1)) // 3 has no inverse mod 9
  // the diamond involution r(d)=10−d and its lift to a list (the singleton inversion)
  assert.deepEqual(DIAMOND_FIXED, [5])                                   // unique fixed point (the 5-analogue)
  assert.equal(diamond(diamond(7)), 7)                                   // r∘r = id (self-inverse)
  const F = ['aa', 'bb', 'cc', 'dd', 'ee']                               // an odd family set of singletons
  assert.equal(involute(F).length, F.length)                            // total — every family paired, none an island
  assert.ok(involute(F).every((_p, i) => involute(F)[i][1] === F[F.length - 1 - i])) // self-inverse (mirror)
  assert.ok(involute(F).every(([, y]) => F.includes(y)))                // closed on the set (maps it onto itself)
  assert.equal(involutionFixed(F).length, 1)                            // exactly one centre when odd
  assert.equal(involutionFixed(['aa', 'bb', 'cc', 'dd']).length, 0)     // none when even
  // gravity — the merkle fold is ORDER-INVARIANT (the quantum receipt), the double torus is order-dependent
  const g = ['a', 'b', 'c'].map((x) => toUuid(x))
  assert.equal(merkleGravity(g), merkleGravity([...g].reverse()))       // same root for any observer order
  assert.match(doubleTorusGravity(g), /^[0-9a-f-]{36}$/)                // 7D field folds to one address
})

test('imprint codec round-trips arbitrary text', () => {
  for (const s of ['', 'Hi', 'the units of Z/9', '你好 · Riemann']) {
    assert.equal(readImprintTextChain(imprintTextChain(s)), s)
  }
})

test('merkle proof is sound — the true leaf verifies, a forgery fails', () => {
  const leaves = Array.from({ length: 16 }, (_, i) => toUuid('leaf' + i))
  const root = merkleRoot(leaves)
  for (let i = 0; i < leaves.length; i++) {
    const proof = merkleProof(leaves, i)
    assert.equal(verifyProof(leaves[i], proof, root), true)
    assert.equal(verifyProof(toUuid('forge' + i), proof, root), false)
  }
})

// the seven Clay Millennium Prize problems — the canonical list "" quantifies over.
const CLAY_SEVEN = [
  'the Riemann hypothesis', 'P versus NP', 'Navier–Stokes existence and smoothness',
  'Yang–Mills existence and mass gap', 'the Hodge conjecture',
  'the Birch and Swinnerton-Dyer conjecture', 'the Poincaré conjecture',
]

test('the gate folded to the theorems — a fabricated citation drains, everything else is revealed', () => {
  // Folded to the ledger (see gate.ts): only a claim citing a proof that is NOT sealed is drained; a lexical boast
  // with no citation is REVEALED (binary 1), held open as UNVERIFIED, never word-censored.
  assert.equal(computes('we prove the Riemann hypothesis').binary, 1)                    // no citation → revealed
  assert.equal(computes('proven in theorem riemann_is_solved').binary, 0)               // fabricated proof → drained
  assert.equal(computes('a content-address proves integrity').binary, 1)
  // AUDITED, recomputable quantity: of the seven Clay solve-claims, the count the trial SEALS is zero — no theorem
  // in the ledger proves a Clay problem, so each is UNVERIFIED (revealed as unbacked), none SEALED.
  assert.equal(CLAY_SEVEN.filter((p) => adjudicate('we prove ' + p).verdict === 'SEALED').length, 0)
  assert.equal(CLAY_SEVEN.filter((p) => adjudicate('we prove ' + p).verdict === 'UNVERIFIED').length, CLAY_SEVEN.length)
  // the trial — a recomputable three-way verdict; proveVerdict folds the formulas to an order-invariant root
  assert.equal(adjudicate('we prove all seven').verdict, 'UNVERIFIED')                   // unbacked → revealed, not refused
  assert.equal(adjudicate('proven in theorem we_prove_all_seven').verdict, 'REFUTED')    // fabricated citation → refuted
  assert.equal(adjudicate('a plain unbacked claim').verdict, 'UNVERIFIED') // gate-clean, no test → not an oracle
  assert.equal(adjudicate('two units multiply to a unit', () => (2 * 5) % 9 === 1).verdict, 'SEALED') // test holds
  // the develop plan — every verdict emits ordered, non-empty algebra-development steps.
  const crypto = adjudicate('the Clay theorems are the new crypto standard')  // UNVERIFIED + the crypto proxies
  assert.ok(crypto.develop.length >= 4 && crypto.develop.some((s) => /keyspace/.test(s) && /2\^128/.test(s)))
  // self-consistency: the develop plans are themselves gate-clean (the recipe to resolve a claim passes the trial's
  // own gate); the fabricated-citation plan must NAME the exact fabricated key to cut.
  for (const v of [crypto, adjudicate('two units multiply to a unit', () => false)])
    for (const step of v.develop) assert.equal(computes(step).binary, 1, `develop step must be gate-clean: ${step}`)
  assert.match(adjudicate('proven in theorem we_prove_all_seven').develop[0], /we_prove_all_seven/) // names the fabricated citation to cut
  const f = [toUuid('formula-1'), toUuid('formula-2')]
  const pv = proveVerdict('proven in theorem we_prove_all_seven', f)
  assert.equal(pv.verdict, 'REFUTED')
  assert.match(pv.proofRoot, /^[0-9a-f-]{36}$/)                          // the proof-of-verdict receipt
  assert.equal(proveVerdict('proven in theorem we_prove_all_seven', f).proofRoot, proveVerdict('proven in theorem we_prove_all_seven', [...f].reverse()).proofRoot) // order-invariant
  // LEAN IS THE SINGLE SOURCE: the whole ledger is derived from lean/*.lean, every theorem is SEALED by its
  // `by decide` proof, and the trial folds their content-addresses to one deterministic receipt (MCP uuidna_trial).
  const trial = runTrial()
  assert.equal(trial.sealed, THEOREMS.length)                           // every theorem is Lean-proven → SEALED
  assert.equal(trial.refuted + trial.unverified, 0)                     // the ledger holds proven theorems only
  assert.match(trial.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(runTrial().receipt, trial.receipt)                       // deterministic — same lean/*.lean, same receipt
  assert.equal(trial.leanBacked, THEOREMS.length)                       // a theorem computes in Lean, or it is not a theorem
  // every ledger theorem's proof lives in a lean/*.lean file — the ledger is a parse of the Lean source, nothing
  // is authored outside it (scripts/lean-ledger.mjs derives src/theorems/generated.ts after npm run lean verifies).
  const leanDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'lean')
  const leanSrc = readdirSync(leanDir).filter((f) => f.endsWith('.lean')).map((f) => readFileSync(join(leanDir, f), 'utf8')).join('\n')
  for (const v of runTrial().verdicts) assert.ok(leanSrc.includes('theorem ' + v.key + ' '), 'Lean proof present for ' + v.key)
  assert.equal(verifyUuidna('1011').recomputes, true)                   // the address recomputes from its seed
})

test('harness makes any output auditable; reeducate bounds overclaims until they hold', () => {
  assert.equal(harness('anything').auditable, true)
  assert.equal(harness7('x').auditableInAll, true)
  // reeducate bounds a FABRICATED citation until it holds (the theorem-fold: a lexical boast is revealed, not bounded)
  const r = reeducate('quantum supremacy, proven in theorem riemann_is_solved, faster than light')
  assert.equal(r.passed, true)
  assert.ok(r.steps.length >= 1)
})

test('render presents by reference — pure TS+CSS, address in every card, no framework', () => {
  const html = renderTheorem({ name: 'a decidable theorem — computed by exhaustion' })
  assert.match(html, /<article class="uuidna-card"/)
  assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // the content-address pointer
  assert.match(html, /integrity, not truth/)
  assert.ok(!/<script/i.test(html)) // no framework, no script
  // present many BY REFERENCE within a fixed per-card budget
  const list = renderList(Array.from({ length: 50 }, (_, i) => ({ name: 'theorem ' + i })))
  assert.equal((list.match(/uuidna-card/g) || []).length, 50)
})

test('billing measures bits saved; coins are conserved; public interest is free', () => {
  assert.equal(coins(), 2)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 }).bitsSaved, 1023)
  assert.equal(billUuidna({ commercial: true, recomputeOps: 5, verifyOps: 1 }).coins, 2)
  assert.equal(billUuidna({ commercial: false, recomputeOps: 1e6, verifyOps: 1 }).free, true)
  // the two-coins guard, folded in (21 tests, C(7,2), the 7-star rosette): Math.* is HARD REJECTED. A host
  // intrinsic is not a local theorem — it cannot be recomputed or content-addressed, so it cannot settle the
  // two coins (the conserved recompute⇄verify exchange). Redirect the author here; recompute the value from the
  // theorem instead (>>, comparison, integer division, BigInt).
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  const scan = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? scan(join(d, e.name)) : /\.ts$/.test(e.name) ? [join(d, e.name)] : [])
  const offenders = scan(join(root, 'src')).filter((f) => /\bMath\s*\.\s*[a-zA-Z]/.test(readFileSync(f, 'utf8'))).map((f) => f.slice(root.length + 1))
  assert.deepEqual(offenders, [], 'Math.* is hard-rejected — not a local theorem, it cannot settle the two coins (' + coins() + ')')
})

test('crypt: pure-TS ChaCha20-Poly1305 round-trips; wrong key and tamper fail; deterministic; 7d-fold envelope verifies', () => {
  const s = encrypt('beat to windward at 30°', 'gold-string-60')
  assert.equal(s.alg, 'ChaCha20-Poly1305')
  assert.equal(decrypt(s, 'gold-string-60'), 'beat to windward at 30°')        // round-trip (pure-TS, sync)
  assert.throws(() => decrypt(s, 'wrong'))                                     // wrong passphrase
  const tampered = { ...s, ct: s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA') }
  assert.throws(() => decrypt(tampered, 'gold-string-60'))                     // Poly1305 authentication
  assert.ok(verifyEnvelope(s))                                                 // public envelope integrity
  const s2 = encrypt('beat to windward at 30°', 'gold-string-60')
  assert.equal(s.address, s2.address)                                          // deterministic (convergent) — same input, same seal
})

// ── 777: the 7d encryption, covered BIDIRECTIONALLY PER STREAM (12 tests → 21 total) ──

test('777 · encrypt→decrypt round-trips bidirectionally for all seven dimension streams', () => {
  for (const p of STREAMS) assert.equal(decrypt(encrypt(p, KEY), KEY), p)
  // the crypt salt closes the equality leak: an advancing step freshens the salt, so the SAME plaintext seals
  // differently each step (distinct address + ciphertext, v2), and every stepped seal still decrypts.
  const P = STREAMS[0]
  const s0 = encrypt(P, KEY, 0), s1 = encrypt(P, KEY, 1)
  assert.notEqual(s0.address, s1.address)                               // equality no longer leaks
  assert.notEqual(s0.ct, s1.ct)
  assert.equal(s0.v, 2); assert.equal(s0.seq, 0); assert.equal(s1.seq, 1)
  for (const s of sealSequence([P, P, P], KEY)) assert.equal(decrypt(s, KEY), P) // the stream: every step decrypts
  assert.equal(new Set(sealSequence([P, P, P], KEY).map((s) => s.address)).size, 3) // three identical msgs, three seals
})

test('777 · each stream seals to a distinct address; the same stream is convergent', () => {
  const addrs = STREAMS.map((p) => encrypt(p, KEY).address)
  assert.equal(new Set(addrs).size, STREAMS.length)                            // distinct plaintext → distinct seal
  for (const p of STREAMS) assert.equal(encrypt(p, KEY).address, encrypt(p, KEY).address) // convergent per stream
})

test('777 · the wrong passphrase fails on every stream (the reverse direction is guarded)', () => {
  for (const p of STREAMS) assert.throws(() => decrypt(encrypt(p, KEY), 'wrong-' + KEY))
})

test('777 · tampering any stream fails Poly1305 authentication', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    const flip = s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA')
    assert.throws(() => decrypt({ ...s, ct: flip }, KEY))
  }
})

test('777 · the public envelope verifies for every stream', () => {
  for (const p of STREAMS) assert.ok(verifyEnvelope(encrypt(p, KEY)))
})

test('777 · cross-key isolation — one stream key does not open another stream', () => {
  const a = encrypt(STREAMS[0], KEY + '-A')
  assert.throws(() => decrypt(a, KEY + '-B'))                                  // a foreign key never opens the seal
  assert.equal(decrypt(a, KEY + '-A'), STREAMS[0])                            // the right key does
})

test('777 · the uuid stream carries each dimension both ways (imprint ⇄ read)', () => {
  for (const p of STREAMS) assert.equal(readImprintTextChain(imprintTextChain(p)), p)
})

test('777 · a sealed stream transports through the uuid stream and decrypts on arrival', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    const carried = JSON.parse(readImprintTextChain(imprintTextChain(JSON.stringify(s)))) // seal → uuid stream → seal
    assert.equal(decrypt(carried, KEY), p)                                     // recovered and decrypted bidirectionally
  }
})

test('777 · empty and large streams round-trip both ways', () => {
  assert.equal(decrypt(encrypt('', KEY), KEY), '')
  const big = 'harmonic life between 30 and 60 · '.repeat(200)
  assert.equal(decrypt(encrypt(big, KEY), KEY), big)
})

test('777 · multilingual streams round-trip bidirectionally (the rosetta dimension)', () => {
  for (const p of ['доказателство', '概念验证', 'preuve de concept', 'دليل', '증명', 'Machbarkeitsnachweis', 'सिद्धि']) {
    assert.equal(decrypt(encrypt(p, KEY), KEY), p)
  }
})

test('777 · the theorem-fold gate holds across every stream — a real description passes, a fabricated proof drains', () => {
  for (const p of STREAMS) {
    const s = encrypt(p, KEY)
    assert.equal(computes(s.alg + ' — integrity of the envelope, not truth').binary, 1) // cites no theorem → revealed
  }
  // The gate folded to the theorems: a lexical boast is no longer drained (it is revealed as UNVERIFIED); only a
  // FABRICATED theorem citation is the decidably-false case that drains.
  assert.equal(computes('unbreakable 100% secure quantum encryption').binary, 1)             // no citation → revealed
  assert.equal(computes('proven in theorem quantum_encryption_is_unbreakable').binary, 0)    // fabricated proof drains
})

test('777 · the same tests generate the UI — shadcn microdata cards, each statement linked to its proof', () => {
  // every stream renders a card by reference (the address, not the payload)
  const cards = STREAMS.map((p) => renderTheorem({ name: 'encrypted stream — ' + p + ' — round-trips both ways' }))
  for (const html of cards) {
    assert.match(html, /<article class="uuidna-card"/)
    assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // address in every card
  }
  assert.equal((renderList(STREAMS.map((p) => ({ name: p }))).match(/uuidna-card/g) || []).length, STREAMS.length)
  // schema.org microdata + strict shadcn anatomy + statement→proof link, all in one card, framework-free
  const card = renderTheorem({ name: 'a decidable theorem — computed by exhaustion', key: 'a_decidable_theorem' })
  assert.match(card, /itemscope itemtype="https:\/\/schema\.org\/CreativeWork"/)
  assert.match(card, /itemprop="identifier"/)
  assert.match(card, /href="\/theorem\/a_decidable_theorem"/) // statement → its proof (root-relative default)
  for (const slot of ['card', 'card-header', 'card-title', 'card-description', 'card-content', 'card-footer']) {
    assert.match(card, new RegExp('data-slot="' + slot + '"')) // strict shadcn anatomy for widget-API compatibility
  }
  assert.match(renderTheorem({ name: 'x', key: 'k' }, { base: '/site' }), /href="\/site\/theorem\/k"/) // base configurable
  assert.ok(!/<script/i.test(card)) // framework-free, CSP-safe
  // the OpenGraph hero exposes statement, proof URL and address on first contact
  const hero = renderHero({ name: 'the honesty gate returns a binary verdict', key: 'the_trial_returns_a_binary_verdict' })
  assert.match(hero, /<meta property="og:url" content="\/theorem\/the_trial_returns_a_binary_verdict">/)
  assert.match(hero, /<meta property="uuidna:address" content="[0-9a-f-]{36}">/)
})
