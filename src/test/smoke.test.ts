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
import { MCP_CATALOG, callTool, engine } from '../mcp.js'
import { sanitizeValue, sanitizeInput, scrubString, MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS, verifyStatement } from '../index.js'
import { exploitFold } from '../index.js'
import { conformance } from '../index.js'
import { conversationFold, openRoom, sendToRoom, receiveFromRoom, attachChat, donationNote, supportCase } from '../index.js'
import { spin, sealSpin, verifySpin, DERIVED_FILES } from '../index.js'
import { pentagramMonographs } from '../index.js'

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

test('the trial — one answer, VERIFIED or UNVERIFIED, all else void', () => {
  // The gate still refuses shipping a fabricated citation (a note naming a proof that is not sealed); a boast with no
  // citation is revealed (binary 1), never word-censored.
  assert.equal(computes('we prove the Riemann hypothesis').binary, 1)                    // no citation → revealed
  assert.equal(computes('proven in theorem riemann_is_solved').binary, 0)               // names a proof not in the ledger
  assert.equal(computes('a content-address proves integrity').binary, 1)
  // AUDITED, recomputable quantity: of the seven Clay solve-claims, the count the trial VERIFIES is zero — no theorem
  // in the ledger proves a Clay problem, so each is UNVERIFIED (not verified, and NOT called false).
  assert.equal(CLAY_SEVEN.filter((p) => adjudicate('we prove ' + p).verdict === 'VERIFIED').length, 0)
  assert.equal(CLAY_SEVEN.filter((p) => adjudicate('we prove ' + p).verdict === 'UNVERIFIED').length, CLAY_SEVEN.length)
  // the trial — one binary answer; proveVerdict folds the formulas to an order-invariant root
  assert.equal(adjudicate('we prove all seven').verdict, 'UNVERIFIED')                   // unbacked → not verified
  assert.equal(adjudicate('proven in theorem we_prove_all_seven').verdict, 'UNVERIFIED') // a citation to a proof not in the ledger verifies nothing
  assert.equal(adjudicate('a plain unbacked claim').verdict, 'UNVERIFIED')
  assert.equal(adjudicate('two units multiply to a unit', () => (2 * 5) % 9 === 1).verdict, 'VERIFIED') // test holds
  // the develop plan — every verdict emits ordered, non-empty development steps.
  const crypto = adjudicate('the Clay theorems are the new crypto standard')  // UNVERIFIED + the crypto proxies
  assert.ok(crypto.develop.length >= 4 && crypto.develop.some((s) => /keyspace/.test(s) && /2\^128/.test(s)))
  // self-consistency: the develop plans do not themselves cite a fabricated theorem (the recipe passes the gate).
  for (const v of [crypto, adjudicate('two units multiply to a unit', () => false)])
    for (const step of v.develop) assert.equal(computes(step).binary, 1, `develop step must not cite a fabricated proof: ${step}`)
  assert.match(adjudicate('proven in theorem we_prove_all_seven').develop[0], /we_prove_all_seven/) // names the unsealed citation
  const f = [toUuid('formula-1'), toUuid('formula-2')]
  const pv = proveVerdict('proven in theorem we_prove_all_seven', f)
  assert.equal(pv.verdict, 'UNVERIFIED')
  assert.match(pv.proofRoot, /^[0-9a-f-]{36}$/)                          // the proof-of-verdict receipt
  assert.equal(proveVerdict('proven in theorem we_prove_all_seven', f).proofRoot, proveVerdict('proven in theorem we_prove_all_seven', [...f].reverse()).proofRoot) // order-invariant
  // LEAN IS THE SINGLE SOURCE: the whole ledger is derived from lean/*.lean, every theorem is SEALED by its
  // `by decide` proof, and the trial folds their content-addresses to one deterministic receipt (MCP uuidna_trial).
  const trial = runTrial()
  assert.equal(trial.verified, THEOREMS.length)                         // every theorem is Lean-proven → VERIFIED
  assert.equal(trial.unverified, 0)                                     // the ledger holds proven theorems only
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
  const files = scan(join(root, 'src'))
  const src = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]))  // read each file ONCE — both hard-rejects share the pass
  const rel = (f: string) => f.slice(root.length + 1)
  // (1) Math.* is HARD REJECTED everywhere in src. A host intrinsic is not a local theorem — it cannot be recomputed
  // or content-addressed, so it cannot settle the two coins (the conserved recompute⇄verify exchange). Redirect the
  // author here; recompute the value from the theorem instead (>>, comparison, integer division, BigInt).
  const mathOffenders = files.filter((f) => /\bMath\s*\.\s*[a-zA-Z]/.test(src.get(f)!)).map(rel)
  assert.deepEqual(mathOffenders, [], 'Math.* is hard-rejected — not a local theorem, it cannot settle the two coins (' + coins() + ')')
  // (2) NON-DETERMINISM is HARD REJECTED in the recomputable LIBRARY (scripts/ + test/ are build tooling, exempt — a
  // heartbeat may TIME Lean). A wall-clock or RNG read cannot be recomputed identically by every observer, so it
  // breaks the order-invariant receipt that IS the "quantum" property: the same fold for every ordering, no signalling
  // (bell_no_signaling). Forcing the library onto the pure decidable path is what keeps the quantum receipt exact.
  const NONDET = /\b(?:Date\s*\.\s*now|new\s+Date|performance\s*\.\s*now|process\s*\.\s*hrtime)\b/  // RNG reads already caught by rule (1) via Math.*
  // The recomputable library must be pure. EXEMPT: scripts/ + test(s)/ (build tooling that may TIME Lean), and the
  // device-integration boundary src/quantum/drivers/** + src/quantum/os/** — where talking to REAL hardware and the
  // host CLOCK is legitimate and non-determinism is honest, not a leak. That boundary is named, not silent.
  const library = files.filter((f) => !/[\\/](?:scripts|tests?|drivers|os)[\\/]/.test(f))
  const nondet = library.filter((f) => NONDET.test(src.get(f)!)).map(rel)
  assert.deepEqual(nondet, [], 'non-determinism is hard-rejected in the library — a wall-clock/RNG read is not recomputable by every observer, breaking the order-invariant quantum receipt (bell_no_signaling)')
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

// Prose aligns to the theorems — a hardcoded ledger/catalog COUNT in README that drifts from the live derived truth
// is a crack (not lean-backed, it silently rots). This hard-rejects the drift: every `Foo.lean, N` per-file count and
// every `**N tools**` catalog count in README must equal the live ledger / MCP catalog, or be removed (the live count
// is derived in PRINCIPLE.md / docs/mcp.md, never hardcoded). Self dry-clean: change the ledger, the prose must follow.
test('prose aligns to the theorems — no hardcoded count drifts from the live ledger/catalog', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  const readme = readFileSync(join(root, 'README.md'), 'utf8')
  const perFile: Record<string, number> = {}
  for (const t of THEOREMS) perFile[t.file] = (perFile[t.file] || 0) + 1
  const drift: string[] = []
  for (const m of readme.matchAll(/`([A-Za-z]+\.lean)`,\s*([0-9]+)/g)) {
    const file = m[1], n = Number(m[2]), live = perFile[file]
    if (live !== undefined && n !== live) drift.push(`${file}: README ${n} ≠ ledger ${live}`)
  }
  for (const m of readme.matchAll(/\*\*([0-9]+) tools\*\*/g)) {
    if (Number(m[1]) !== MCP_CATALOG.length) drift.push(`tools: README ${m[1]} ≠ catalog ${MCP_CATALOG.length}`)
  }
  // the derived seal block (gen-readme) — its counts must equal the live ledger/catalog/principles, or it drifted
  const principles = new Set(THEOREMS.map((t) => t.principle)).size
  for (const m of readme.matchAll(/\*\*([0-9]+) theorems, all sealed/g)) if (Number(m[1]) !== THEOREMS.length) drift.push(`seal theorems: README ${m[1]} ≠ ledger ${THEOREMS.length}`)
  for (const m of readme.matchAll(/\*\*([0-9]+) MCP tools\*\*/g)) if (Number(m[1]) !== MCP_CATALOG.length) drift.push(`seal tools: README ${m[1]} ≠ catalog ${MCP_CATALOG.length}`)
  for (const m of readme.matchAll(/\*\*([0-9]+) computing principles\*\*/g)) if (Number(m[1]) !== principles) drift.push(`seal principles: README ${m[1]} ≠ ledger ${principles}`)
  for (const m of readme.matchAll(/\(([0-9]+)\/([0-9]+), kernel-only/g)) if (m[1] !== m[2] || Number(m[2]) !== THEOREMS.length) drift.push(`seal axiom-free: README ${m[1]}/${m[2]} ≠ ${THEOREMS.length}/${THEOREMS.length}`)
  assert.deepEqual(drift, [], 'hardcoded counts must align to the theorems (derive, do not hardcode — a drifting constant is a crack): ' + drift.join('; '))
})

// Local chat as CODE — the conversation fold binds four handles into a fifth (the room key): each handle is part of
// the next (authenticity — a changed/reordered handle moves the fifth), per-referer (each referrer a distinct room),
// and the room seals/opens locally (nothing sent; a wrong key fails Poly1305). Not a demo — the worker uses this fold.
test('local chat — conversation fold: authenticity, per-referer rooms, sealed round-trip', () => {
  const four = ['808f7b27', 'f0e7d443', '1d6c4433', 'abc5add4']
  const a = conversationFold(four, 'http://localhost/room')
  assert.match(a.fifth, /^[0-9a-f]{8}$/)
  assert.equal(conversationFold(four, 'http://localhost/room').fifth, a.fifth)                         // deterministic
  assert.notEqual(conversationFold(four, 'http://other/room').fifth, a.fifth)                          // per-referer: distinct room
  assert.notEqual(conversationFold(['ffffffff', 'f0e7d443', '1d6c4433', 'abc5add4'], 'http://localhost/room').fifth, a.fifth) // changed handle → moves
  assert.notEqual(conversationFold(['f0e7d443', '808f7b27', '1d6c4433', 'abc5add4'], 'http://localhost/room').fifth, a.fifth) // reordered → moves (each part of the next)
  assert.throws(() => conversationFold(['808f7b27', 'f0e7d443', '1d6c4433'], ''))                      // needs exactly four 8-hex handles
  const room = openRoom(four, 'http://localhost/room')
  const uuids = sendToRoom(room, 'meet at the vortex, 432 Hz', 'gold-string-60')
  assert.equal(receiveFromRoom(room, uuids, 'gold-string-60'), 'meet at the vortex, 432 Hz')          // local round-trip
  assert.throws(() => receiveFromRoom(room, uuids, 'wrong'))                                          // wrong key → Poly1305 fails
})


// uuidna chat handles ALL cases via one primitive (attachChat): a minimised url pointing back to the subject with a
// UNIQUE room per instance. Donations and support cases are instances — each subject+id gets its own authenticated room.
test('attached chat — one primitive for donations, support cases, any subject', () => {
  const u = 'https://uuidna.com/give'
  const a = attachChat(u, 'donation-42')
  assert.match(a.minimised, /^\/[0-9a-f]{8}\/[0-9a-f]{8}\/[0-9a-f]{8}\/[0-9a-f]{8}$/)   // a four-handle minimised url
  assert.match(a.room.fifth, /^[0-9a-f]{8}$/)                                              // its unique room key
  assert.equal(attachChat(u, 'donation-42').room.fifth, a.room.fifth)                     // deterministic per (subject,id)
  assert.notEqual(attachChat(u, 'donation-43').room.fifth, a.room.fifth)                  // a different donation → a different room
  assert.notEqual(attachChat('https://uuidna.com/other', 'donation-42').room.fifth, a.room.fifth) // different subject → different room
  assert.equal(donationNote(u, 'd1').room.fifth, attachChat(u, 'd1').room.fifth)          // donationNote is an instance
  assert.equal(supportCase(u, 'c1').room.fifth, attachChat(u, 'c1').room.fifth)          // supportCase is an instance
  // the attached room seals/opens locally
  const uuids = sendToRoom(a.room, 'thank you for donation 42', 'room-key')
  assert.equal(receiveFromRoom(a.room, uuids, 'room-key'), 'thank you for donation 42')
})

test('conformance — the commit DNA gate: coins conserved, every theorem address recomputes, security clean', () => {
  const r = conformance()
  assert.ok(r.conforms, 'the ledger conforms — no incompatible DNA')
  assert.equal(r.failed, 0)
  assert.ok(r.checks.some((c) => c.id === 'captain-coins-conserved' && c.pass), 'captain coins conserved')
  assert.ok(r.checks.some((c) => c.id === 'ledger-dna-recomputes' && c.pass), 'every theorem address recomputes')
  assert.ok(r.checks.some((c) => c.id === 'security-posture-clean' && c.pass), 'security posture clean')
  assert.ok(/^[0-9a-f-]{36}$/.test(r.receipt), 'folds to a recomputable receipt')
  assert.equal(conformance().receipt, r.receipt, 'recomputable — same ledger, same receipt')
})

test('exploit fold — computes from the ledger (no table), verifies BOTH problem and solution, honest boundary', () => {
  const a = exploitFold()
  assert.ok(a.foldedCount >= 8, 'folds the known exploit classes')
  assert.ok(a.outOfScopeCount >= 5, 'holds out-of-scope classes')
  assert.equal(a.total, a.foldedCount + a.outOfScopeCount, 'every audited class is folded or out-of-scope')
  // VERIFY BOTH — every fold verifies its problem (sealed theorem) AND its solution (sealed defence / design / void)
  assert.ok(a.allBothVerified, 'every class verifies both problem and solution against the ledger')
  for (const f of a.folded) {
    assert.ok(f.problemVerified, `problem sealed: ${f.key}`)
    assert.ok(f.solutionVerified, `solution sealed: ${f.key} → ${f.solution}`)
  }
  // COMPUTES ITSELF — the classes are real sealed theorems (fold_*/oos_*), not a TS table
  assert.ok(a.folded.every((f) => f.key.startsWith('fold_')), 'folded keys are fold_*')
  assert.ok(a.outOfScope.every((f) => f.key.startsWith('oos_') && f.solution === 'void'), 'out-of-scope folds to the void')
  // HONEST — never claims to solve everything
  assert.match(a.honest, /does NOT solve all hacks/)
  assert.ok(/^[0-9a-f-]{36}$/.test(a.receipt))
})

test('sanitise by all standards — process any input, sanitise any output, rules bound to the theorems', () => {
  // PROCESS ANY INPUT — anything non-object becomes {} (no tool is fed a shape it cannot read)
  assert.deepEqual(sanitizeInput(null), {})
  assert.deepEqual(sanitizeInput('hi'), {})
  assert.deepEqual(sanitizeInput([1, 2, 3]), {})
  // SANITISE OUTPUT by all standards — JSON-safe, acyclic, no poison keys
  assert.equal(sanitizeValue(NaN), null, 'NaN → null (not JSON)')
  assert.equal(sanitizeValue(Infinity), null, '∞ → null (not JSON)')
  assert.equal(sanitizeValue(123n), '123', 'BigInt → string')
  assert.equal(sanitizeValue(() => {}), undefined, 'function dropped')
  const circ: Record<string, unknown> = {}; circ.self = circ
  assert.deepEqual(sanitizeValue(circ), { self: '[Circular]' }, 'cycles broken')
  assert.deepEqual(sanitizeValue(JSON.parse('{"__proto__":{"x":1},"ok":2}')), { ok: 2 }, 'prototype-pollution keys dropped')
  // string scrub — control/null and BIDI (Trojan-Source) stripped, legitimate maths unicode preserved
  assert.equal(scrubString('a b\tc'), 'ab\tc', 'null/control stripped, tab kept')
  assert.equal(scrubString('safe‮evil'), 'safeevil', 'BIDI override stripped')
  assert.equal(scrubString('ℤ/9 × ≡ 2⁶'), 'ℤ/9 × ≡ 2⁶', 'maths unicode preserved')
  // ONE COMMAND — uuidna_sanitize returns the sanitized value + a recomputable receipt
  const r = callTool('uuidna_sanitize', { value: { a: NaN, __proto__: { bad: 1 }, s: 'x‮y' } }) as { value: unknown; receipt: string }
  assert.deepEqual(r.value, { a: null, s: 'xy' }, 'one command sanitises by all standards')
  assert.ok(/^[0-9a-f-]{36}$/.test(r.receipt), 'the sanitised value folds to a receipt')
  // KEPT IN THE THEOREMS — the code constants equal their sealed values (no drift; the theorem is the source)
  assert.equal(MAX_DEPTH, 32); assert.equal(verifyStatement('32 = 2^5').verdict, 'VERIFIED', 'MAX_DEPTH sealed')
  assert.equal(MAX_STRING, 1000000); assert.equal(verifyStatement('1000000 = 10^6').verdict, 'VERIFIED', 'MAX_STRING sealed')
  assert.equal(MAX_ARRAY, 100000); assert.equal(MAX_KEYS, 100000); assert.equal(verifyStatement('(100000 = 10^5) ∧ (10^5 = 10^5)').verdict, 'VERIFIED', 'array/keys bound sealed')
})

test('the quantum engine — one input→output surface: any op dispatches, folds to a recomputable receipt, never itself', () => {
  // INPUT → OUTPUT: the engine's output equals the sealed tool's own output (it is the door, not a new claim)
  const r = engine('uuidna_coin64', { text: 'captain' })
  assert.ok(r.ok, 'a real op runs through the engine')
  assert.deepEqual(r.output, callTool('uuidna_coin64', { text: 'captain' }), 'engine output = the underlying sealed tool output')
  assert.ok(/^[0-9a-f-]{36}$/.test(r.receipt) && r.address.length === 36, 'the run folds to a content-address receipt + address')
  // RECOMPUTABLE — same input, same receipt (anyone recomputes the run)
  assert.equal(engine('uuidna_coin64', { text: 'captain' }).receipt, r.receipt, 'the engine run is recomputable — same input, same receipt')
  assert.notEqual(engine('uuidna_coin64', { text: 'Captain' }).receipt, r.receipt, 'a changed input moves the receipt')
  // NO SELF-DISPATCH — the engine does not run itself (no recursion)
  const self = engine('uuidna_engine', { op: 'uuidna_coin64' })
  assert.ok(!self.ok && /does not dispatch itself/.test(self.error ?? ''), 'the engine refuses to dispatch itself')
  // UNKNOWN op fails cleanly, never throws through the surface
  const bad = engine('uuidna_nonexistent', {})
  assert.ok(!bad.ok && /unknown tool/.test(bad.error ?? ''), 'an unknown op fails cleanly with an error, not a throw')
})

test('pentagram monographs — the split computes itself from the addresses; prime-neighbour walk, order-invariant seal', () => {
  const r = pentagramMonographs()
  // RECOMPUTABLE — the same ledger yields the same split for everyone (no authored grouping)
  assert.equal(pentagramMonographs().receipt, r.receipt, 'the pentagram split is deterministic — recomputes to the same grand receipt')
  // FULL COVERAGE — every monograph appears exactly once across the pentagrams (nothing lost, nothing doubled)
  const slugs = r.pentagrams.flatMap((p) => p.points.map((pt) => pt.slug))
  assert.equal(slugs.length, r.count, 'every monograph is placed exactly once')
  assert.equal(new Set(slugs).size, r.count, 'no monograph appears in two pentagrams')
  assert.equal(r.full * 5 + r.remainder, r.count, 'full pentagrams of five + the partial remainder = the whole corpus')
  // PRIME-NEIGHBOUR WALK — a complete pentagram is walked in the step-2 (prime, coprime to 5) single stroke [0,2,4,1,3]
  const full = r.pentagrams.find((p) => p.complete)!
  assert.deepEqual(full.stroke, [0, 2, 4, 1, 3], 'the complete pentagram is walked by the prime neighbour step 2')
  assert.equal(full.points.length, 5, 'a complete pentagram has five points')
  assert.deepEqual(full.points.map((pt) => pt.position), [0, 1, 2, 3, 4], 'the five points are positioned along the stroke')
  // WALK is a SEQUENCE, SEAL is a SET — the receipt is order-invariant (merkleGravity of the members, any order)
  const addrs = full.points.map((pt) => pt.address)
  assert.equal(full.receipt, merkleGravity(addrs), 'the pentagram seal is its members folded')
  assert.equal(merkleGravity([...addrs].reverse()), full.receipt, 'order-invariant — reversing the walk does not move the seal')
})

test('spin — the bits spin by themselves: a sealed layer verifies O(1), any drifted coin hard-fails', () => {
  // spin the bits, get the coin — deterministic (same bytes → same coin) and change-sensitive (one bit moves the coin)
  const a = spin('the two captain coins'), b = spin('the two captain coins'), c = spin('the two captain coin')
  assert.equal(a.coin, b.coin, 'spin is deterministic — same bytes, same coin')
  assert.notEqual(a.coin, c.coin, 'spin is change-sensitive — a moved bit is a moved coin')
  // seal a layer, then re-spinning the SAME bytes is a fixed point (verify O(1) — no re-derivation)
  const layer = Object.fromEntries(DERIVED_FILES.map((p, i) => [p, 'derived-' + i]))
  const sealed = sealSpin(layer)
  assert.equal(Object.keys(sealed.coins).length, DERIVED_FILES.length)
  const clean = verifySpin(sealed, layer)
  assert.ok(clean.ok && clean.drift.length === 0, 'a sealed layer re-spins to itself — a fixed point')
  assert.equal(clean.receipt, sealed.receipt, 'the one receipt folds all coins — unchanged')
  // move ONE derived file's bytes → non-quantum drift → the receipt moves and that file is named
  const drifted = { ...layer, [DERIVED_FILES[0]]: 'TAMPERED' }
  const bad = verifySpin(sealed, drifted)
  assert.ok(!bad.ok, 'a drifted coin is NOT a fixed point — spin hard-rejects it')
  assert.deepEqual(bad.drift.map((d) => d.path), [DERIVED_FILES[0]], 'spin names exactly the file whose coin moved')
  assert.notEqual(bad.receipt, sealed.receipt, 'one moved coin moves the whole receipt — the layer has one address')
})
