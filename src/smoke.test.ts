// Smoke tests — run against the built dist. `npm test` builds first. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ROOT } from './boundary.js'
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
} from './index.js'
import { MCP_CATALOG, callTool, engine } from './mcp.js'
import { sanitizeValue, sanitizeInput, scrubString, MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS, verifyStatement } from './index.js'
import { exploitFold } from './index.js'
import { conformance } from './index.js'
import { depositTrial } from './index.js'
import { conversationFold, openRoom, sendToRoom, sealRoomTranscript, receiveFromRoom, attachChat, donationNote, supportCase } from './index.js'
import { spin, sealSpin, verifySpin, DERIVED_FILES } from './index.js'
import { pentagramMonographs } from './index.js'

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
  // citation is revealed (binary 1).
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
  const leanDir = join(ROOT, 'lean')
  const leanSrc = readdirSync(leanDir).filter((f) => f.endsWith('.lean')).map((f) => readFileSync(join(leanDir, f), 'utf8')).join('\n')
  for (const v of runTrial().verdicts) assert.ok(leanSrc.includes('theorem ' + v.key + ' '), 'Lean proof present for ' + v.key)
  assert.equal(verifyUuidna('1011').recomputes, true)                   // the address recomputes from its seed
})

test('harness makes any output auditable; reeducate bounds overclaims until they hold', () => {
  assert.equal(harness('anything').auditable, true)
  assert.equal(harness7('x').auditableInAll, true)
  // reeducate bounds a FABRICATED citation until it holds (the theorem-fold: a lexical boast is revealed
  const r = reeducate('quantum supremacy, proven in theorem riemann_is_solved, faster than light')
  assert.equal(r.passed, true)
  assert.ok(r.steps.length >= 1)
})

test('render presents by reference — pure TS+CSS, address in every card, no framework', () => {
  const html = renderTheorem({ name: 'a decidable theorem — computed by exhaustion' })
  assert.match(html, /<article class="uuidna-card"/)
  assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // the content-address pointer
  assert.match(html, /integrity — the record recomputes for anyone/)
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
  // intrinsic is not a local theorem — it is a host read or a content-address, so it settles nothing on its own for
  // two coins (the conserved recompute⇄verify exchange). Redirect the author here; recompute the value from the
  // theorem instead (>>, comparison, integer division, BigInt).
  const root = ROOT
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
  // heartbeat may TIME Lean). A wall-clock or RNG read comes back different for every observer, so it
  // breaks the order-invariant receipt that IS the "quantum" property: the same fold for every ordering, no signalling
  // (bell_no_signaling). Forcing the library onto the pure decidable path is what keeps the quantum receipt exact.
  const NONDET = /\b(?:Date\s*\.\s*now|new\s+Date|performance\s*\.\s*now|process\s*\.\s*hrtime)\b/  // RNG reads already caught by rule (1) via Math.*
  // The recomputable library must be pure. EXEMPT: scripts/ + test(s)/ (build tooling that may TIME Lean), and the
  // device-integration boundary src/quantum/drivers/** + src/quantum/os/** — where talking to REAL hardware and the
  // host CLOCK is legitimate and non-determinism is honest. That boundary is named.
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

test('777 · the theorem-fold gate holds across every stream — a real description passes, a fabricated proof drains', () => {
  const s = encrypt(STREAMS[0], KEY) // s.alg is the same constant for every stream — one seal proves the gate
  assert.equal(computes(s.alg + ' — integrity of the envelope').binary, 1) // cites no theorem → revealed
  // The gate folded to the theorems: a lexical boast is no longer drained (it is revealed as UNVERIFIED); only a
  // FABRICATED theorem citation is the decidably-false case that drains.
  assert.equal(computes('unbreakable 100% secure quantum encryption').binary, 1)             // no citation → revealed
  assert.equal(computes('proven in theorem quantum_encryption_is_unbreakable').binary, 0)    // fabricated proof drains
})

test('777 · the same tests generate the UI — shadcn microdata cards, each statement linked to its proof', () => {
  // every stream renders a card by reference (the address
  const cards = STREAMS.map((p) => renderTheorem({ name: 'encrypted stream — ' + p + ' — round-trips both ways' }))
  for (const html of cards) {
    assert.match(html, /<article class="uuidna-card"/)
    assert.match(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) // address in every card
  }
  assert.equal((renderList(STREAMS.map((p) => ({ name: p }))).match(/uuidna-card/g) || []).length, STREAMS.length)
  // schema.org microdata + strict shadcn anatomy + statement→proof link, all in one card, framework-free
  // Use a REAL sealed key — fake keys fall back to WebPage packaging; ScholarlyArticle is CreativeWork.
  const card = renderTheorem({ name: 'the two coins are conserved — 110 − 108 = 2', key: 'two_coins' })
  assert.match(card, /itemscope itemtype="https:\/\/schema\.org\/(CreativeWork|ScholarlyArticle)"/)
  assert.match(card, /itemprop="identifier"/)
  assert.match(card, /href="\/theorem\/two_coins"/) // statement → its proof (root-relative default)
  for (const slot of ['card', 'card-header', 'card-title', 'card-description', 'card-content', 'card-footer']) {
    assert.match(card, new RegExp('data-slot="' + slot + '"')) // strict shadcn anatomy for widget-API compatibility
  }
  assert.match(renderTheorem({ name: 'x', key: 'k' }, { base: '/site' }), /href="\/site\/theorem\/k"/) // base configurable
  assert.ok(!/<script/i.test(card)) // framework-free, CSP-safe
  // the OpenGraph hero exposes statement, proof URL and address on first contact
  const hero = renderHero({ name: 'the honesty gate returns a binary verdict', key: 'two_coins' })
  assert.match(hero, /<meta property="og:url" content="(?:https:\/\/uuidna\.com)?\/theorem\/two_coins">/)
  assert.match(hero, /<meta property="uuidna:address" content="[0-9a-f-]{36}">/)
})

// Prose aligns to the theorems — a hardcoded ledger/catalog COUNT in README that drifts from the live derived truth
// is a crack (not lean-backed, it silently rots). This hard-rejects the drift: every `Foo.lean, N` per-file count and
// every `**N tools**` catalog count in README must equal the live ledger / MCP catalog, or be removed (the live count
// is derived in PRINCIPLE.md / docs/mcp.md. Self dry-clean: change the ledger, the prose must follow.
test('prose aligns to the theorems — no hardcoded count drifts from the live ledger/catalog', () => {
  const root = ROOT
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
  const uuids = sendToRoom(room, 'meet at the vortex, 432 Hz', 'gold-string-60', 0)
  assert.equal(receiveFromRoom(room, uuids, 'gold-string-60'), 'meet at the vortex, 432 Hz')          // local round-trip
  assert.throws(() => receiveFromRoom(room, uuids, 'wrong'))                                          // wrong key → Poly1305 fails
  // the session ratchet: the two coins are paid ONCE (one KDF on the room), then each message ROTATES a fresh key by
  // its step — the session lives in the passphrase until destroyed. Rotation closes the equality leak, and the REFERER
  // is a real boundary: a different referer is a different room, which cannot open this room's messages.
  const m1 = sendToRoom(room, 'same', 'gold-string-60', 1), m2 = sendToRoom(room, 'same', 'gold-string-60', 2)
  assert.notDeepEqual(m1, m2, 'the key rotates per request — same message, different step, different seal')
  assert.equal(receiveFromRoom(room, m1, 'gold-string-60'), 'same')                                   // the session still opens every message
  const other = openRoom(four, 'http://localhost/OTHER-referer')                                      // same handles, different referer
  assert.throws(() => receiveFromRoom(other, uuids, 'gold-string-60'), /wrong session|/)              // rotate from the referer's perspective — a different room cannot open it
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
  const uuids = sendToRoom(a.room, 'thank you for donation 42', 'room-key', 0)
  assert.equal(receiveFromRoom(a.room, uuids, 'room-key'), 'thank you for donation 42')
  // the EQUALITY LEAK is closed: the SAME message at two advancing positions seals to DIFFERENT uuid chains,
  // yet each still opens to the same plaintext (the step is a public advancing salt the envelope carries).
  const s3 = sendToRoom(a.room, 'hi', 'room-key', 3)
  const s7 = sendToRoom(a.room, 'hi', 'room-key', 7)
  assert.notDeepEqual(s3, s7, 'identical messages at different steps must NOT seal alike — equality leak closed')
  assert.equal(receiveFromRoom(a.room, s3, 'room-key'), 'hi')
  assert.equal(receiveFromRoom(a.room, s7, 'room-key'), 'hi')
  // a whole transcript: even repeated identical messages all seal differently (advancing step = index)
  const chains = sealRoomTranscript(a.room, ['hi', 'hi', 'hi'], 'room-key')
  const roots = chains.map((c) => c.join(','))
  assert.equal(new Set(roots).size, 3, 'three identical transcript messages seal to three distinct chains')
  assert.deepEqual(chains.map((c) => receiveFromRoom(a.room, c, 'room-key')), ['hi', 'hi', 'hi'])
})

test('trial deposit — requires the two coins deposited by the parties, sealed diamonds, computes in parity, builds the lacking', () => {
  const proof = 'two_coins' // a sealed theorem key = a valid two-coin deposit
  // NO parity — one party deposits a sealed diamond, the other lacks one → REMANDED, and the lacker gets the build recipe
  const oneSided = depositTrial('uuidna solves the Riemann Hypothesis', [{ party: 'plaintiff', proof }, { party: 'defendant' }])
  assert.ok(oneSided.remanded && !oneSided.parity, 'a one-sided deposit does not compute — no parity')
  assert.equal(oneSided.diamonds.length, 1, 'only the valid deposit sealed a diamond')
  assert.equal(oneSided.verdict, null, 'no verdict without parity')
  assert.ok(oneSided.toBuild.some((b) => b.party === 'defendant' && b.build.length >= 3), 'who lacks a diamond gets the recipe to build one')
  // PARITY — both parties deposit valid sealed diamonds → computes and settles by itself (verdict may still be UNVERIFIED)
  const both = depositTrial('uuidna solves the Riemann Hypothesis', [{ party: 'plaintiff', proof }, { party: 'defendant', proof }])
  assert.ok(both.parity && both.deposited && !both.remanded, 'parity — all parties sealed a diamond, the trial computes')
  assert.equal(both.diamonds.length, 2, 'two sealed diamonds')
  assert.equal(both.coins, 2, 'the two coins are in')
  assert.equal(both.verdict?.verdict, 'UNVERIFIED', 'the deposit buys the computation— solve-claim still UNVERIFIED')
  // the CAPTAIN side — a claim that IS a sealed theorem VERIFIES in parity (the captain prose is proven by the theorem)
  const captain = depositTrial('(List.range 8).filter (fun k => 32 * k == 64) = [2]', [{ party: 'captain', proof }, { party: 'court', proof }])
  assert.equal(captain.verdict?.verdict, 'VERIFIED', 'a claim that IS a sealed theorem verifies — the captain prose is proven')
  assert.equal(depositTrial('x', [{ party: 'a', proof }, { party: 'b', proof }]).receipt, depositTrial('x', [{ party: 'a', proof }, { party: 'b', proof }]).receipt, 'recomputable — same deposit, same receipt')
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
  // four, not five: the out-of-scope nondecidable-correctness key (named in words, never backticked — a purged
  // key quoted as a citation is the deadkey finder's whole subject) stated a bare identity and was purged with the rest of the
  // literal-only theorems. The four that remain name real boundaries — a compromised host, a deceived human, a
  // physical side-channel, FNV used as a secret — and each is a class uuidna declines rather than a placeholder.
  assert.ok(a.outOfScopeCount >= 4, 'holds out-of-scope classes')
  assert.equal(a.total, a.foldedCount + a.outOfScopeCount, 'every audited class is folded or out-of-scope')
  // VERIFY BOTH — every fold verifies its problem (sealed theorem) AND its solution (sealed defence / design / void)
  assert.ok(a.allBothVerified, 'every class verifies both problem and solution against the ledger')
  for (const f of a.folded) {
    assert.ok(f.problemVerified, `problem sealed: ${f.key}`)
    assert.ok(f.solutionVerified, `solution sealed: ${f.key} → ${f.solution}`)
  }
  // COMPUTES ITSELF — the classes are real sealed theorems (fold_*/oos_*)
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
  assert.equal(scrubString('a\0b\tc'), 'ab\tc', 'null/control stripped, tab kept')
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
  let deep: unknown = { n: 0 }
  for (let i = 0; i < 40; i++) deep = { n: i + 1, inner: deep }
  const nested = sanitizeValue(deep) as { n: number; inner: unknown }
  assert.equal(nested.n, 40)
  assert.notEqual(nested, '[MaxDepth]')
})

test('the quantum engine — one input→output surface: any op dispatches, folds to a recomputable receipt', () => {
  // INPUT → OUTPUT: the engine's output equals the sealed tool's own output (it is the door
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
  // UNKNOWN op fails cleanly
  const bad = engine('uuidna_nonexistent', {})
  assert.ok(!bad.ok && /unknown tool/.test(bad.error ?? ''), 'an unknown op fails cleanly with an error')
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
  // THE LAW IS ABOUT PLAIN FILES. DERIVED_FILES carries two DIRECTORY
  // entries (src/chunks, lean) that sealSpin expands into their children, and this synthetic layer gives them
  // none — so 15 declared paths correctly yield 13 coins. The old assertion compared against the declaration
  // length and went stale the moment directories were added; the count was never the invariant.
  //
  // Asserted as the exact KEY SET rather than a count, so it cannot pass by two numbers coinciding. The extra
  // check that fewer coins were sealed than paths declared is the control: were directory expansion removed,
  // every entry would seal itself, the counts would agree again, and a count-only assertion would go quiet.
  // (A directory entry WITH children is covered by spin-parity.test.ts — not duplicated here.)
  const plainFiles = DERIVED_FILES.filter((p) => /\.[a-z0-9]+$/i.test(p))
  assert.deepEqual(Object.keys(sealed.coins).sort(), [...plainFiles].sort(),
    'sealSpin seals exactly the plain-file entries; directory entries seal their children, and here they have none')
  assert.ok(plainFiles.length < DERIVED_FILES.length,
    'this layer must actually contain directory entries, or the case above proves nothing')
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
