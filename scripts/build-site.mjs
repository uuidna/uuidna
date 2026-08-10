#!/usr/bin/env node
// build-site — one referrer-able page per theorem into ./site, SELF-CONTAINED (no VitePress, no ledger, no
// framework). The law: ONLY THEOREMS WRITE, and EVERYTHING GOES TO TRIAL. Every declarative statement that
// ships is submitted to the package's own trial (adjudicate) and rendered WITH its verdict + content-address
// receipt — nothing is reworded to dodge the gate, nothing is silently skipped. A capability statement is
// adjudicated WITH its actual decidable test (the same check npm test runs) → SEALED. An overclaim is
// submitted as-is → REFUTED, shown. Gate-clean framing with no test → UNVERIFIED, shown. The verdict IS the
// content. Integrity, not truth. 0/7.
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  renderHero, renderList, renderTheorem, computes, toUuid, adjudicate, proveVerdict,
  units, vortexOrbit, digitalRoot, strictUuidna, merkleRoot, merkleProof, verifyProof,
  imprintTextChain, readImprintTextChain, encrypt, decrypt, verifyEnvelope,
  harness, harness7, reeducate, billUuidna, coins,
  merkleGravity, doubleTorusGravity, diamond, DIAMOND_FIXED, involute, involutionFixed, verifyUuidna,
} from '../dist/index.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = join(ROOT, 'site')
const BASE = '' // uuidna.com is served at root — proof links resolve to /theorem/<key>
const m9 = (n) => ((n % 9) + 9) % 9
const STREAMS = ['d1 · reflection', 'd2 · the pair', 'd3 · the trinity', 'd4 · the square', 'd5 · the diamond', 'd6 · the rosette', 'd7 · the dimensions']
const KEY = 'gold-string-60'
const throws = (fn) => { try { fn(); return false } catch { return true } }

// The theorems — every one a decidable, recomputable fact, paired with the ACTUAL test that seals it (the same
// check test/smoke.test.mjs runs). name → the statement; test → the decidable receipt adjudicate folds to SEALED.
const THEOREMS = [
  { key: 'units_z9', name: 'the units of ℤ/9 — exactly {1,2,4,5,7,8}, the six harmonic solutions', test: () => JSON.stringify(units()) === JSON.stringify([1, 2, 4, 5, 7, 8]) },
  { key: 'vortex_orbit', name: 'the doubling circuit — 1→2→4→8→7→5, the vortex orbit', test: () => JSON.stringify(vortexOrbit()) === JSON.stringify([1, 2, 4, 8, 7, 5]) },
  { key: 'digital_root_432', name: 'the digital root of 432 — folds to nine', test: () => digitalRoot(432) === 9 },
  { key: 'three_sq_zero', name: 'three squared — 3² ≡ 0 mod 9, it vanishes', test: () => m9(3 * 3) === 0 },
  { key: 'six_sq_zero', name: 'six squared — 6² ≡ 0 mod 9, it vanishes', test: () => m9(6 * 6) === 0 },
  { key: 'two_mul_five', name: 'two and five — 2·5 ≡ 1 mod 9, inverse to each other', test: () => m9(2 * 5) === 1 },
  { key: 'four_mul_seven', name: 'four and seven — 4·7 ≡ 1 mod 9, inverse to each other', test: () => m9(4 * 7) === 1 },
  { key: 'eight_self_inv', name: 'eight — 8·8 ≡ 1 mod 9, its own inverse', test: () => m9(8 * 8) === 1 },
  { key: 'three_no_inverse', name: 'three has no inverse mod 9 — the zero divisor', test: () => ![0, 1, 2, 3, 4, 5, 6, 7, 8].some((x) => m9(3 * x) === 1) },
  { key: 'diamond_fixed', name: 'the diamond involution r(d)=10−d — its unique fixed point is 5', test: () => JSON.stringify(DIAMOND_FIXED) === JSON.stringify([5]) },
  { key: 'diamond_self_inverse', name: 'the diamond involution is self-inverse — r∘r = id', test: () => diamond(diamond(7)) === 7 },
  { key: 'involute_total', name: 'the involution on an odd set — pairs every element, none an island', test: () => involute(['aa', 'bb', 'cc', 'dd', 'ee']).length === 5 },
  { key: 'involute_closed', name: 'the involution is closed on its set — it maps the set onto itself', test: () => { const F = ['aa', 'bb', 'cc', 'dd', 'ee']; return involute(F).every(([, y]) => F.includes(y)) } },
  { key: 'involute_one_centre', name: 'the centre — exactly one when the set is odd, none when even', test: () => involutionFixed(['aa', 'bb', 'cc', 'dd', 'ee']).length === 1 && involutionFixed(['aa', 'bb', 'cc', 'dd']).length === 0 },
  { key: 'merkle_gravity_order_invariant', name: 'merkle gravity is order-invariant — every observer order falls to the same root', test: () => { const g = ['a', 'b', 'c'].map(toUuid); return merkleGravity(g) === merkleGravity([...g].reverse()) } },
  { key: 'double_torus_field', name: 'the double-torus 7D field — folds to one content-address', test: () => /^[0-9a-f-]{36}$/.test(doubleTorusGravity(['a', 'b', 'c'].map(toUuid))) },
  { key: 'content_address_deterministic', name: 'the content-address is deterministic and context-free — the same value always mints the same', test: () => toUuid('uuidna') === toUuid('uuidna') && toUuid('a') !== toUuid('b') && strictUuidna(3) === strictUuidna(' 3 ') },
  { key: 'imprint_roundtrip', name: 'the imprint codec round-trips arbitrary text — reversible, not encryption', test: () => ['', 'Hi', 'the units of Z/9', '你好 · Riemann'].every((s) => readImprintTextChain(imprintTextChain(s)) === s) },
  { key: 'merkle_proof_sound', name: 'the merkle proof is sound — the true leaf verifies, a forgery fails', test: () => { const leaves = Array.from({ length: 16 }, (_, i) => toUuid('leaf' + i)); const root = merkleRoot(leaves); return leaves.every((lf, i) => verifyProof(lf, merkleProof(leaves, i), root) === true && verifyProof(toUuid('forge' + i), merkleProof(leaves, i), root) === false) } },
  { key: 'honesty_gate_drains_overreach', name: 'the honesty gate drains overreach and signs the honest floor — 0/7', test: () => computes('we prove the Riemann hypothesis').binary === 0 && computes('a content-address proves integrity, not truth; 0/7').binary === 1 },
  { key: 'adjudicate_three_way', name: 'the trial — a recomputable three-way verdict: refuted, sealed, or unverified', test: () => adjudicate('we prove all seven').verdict === 'REFUTED' && adjudicate('a plain unbacked claim').verdict === 'UNVERIFIED' && adjudicate('two units multiply to a unit', () => (2 * 5) % 9 === 1).verdict === 'SEALED' },
  { key: 'verdict_receipt_order_invariant', name: 'the verdict receipt is order-invariant — the formulas fold to one root in any order', test: () => { const f = [toUuid('formula-1'), toUuid('formula-2')]; return proveVerdict('we prove all seven', f).proofRoot === proveVerdict('we prove all seven', [...f].reverse()).proofRoot } },
  { key: 'verify_uuidna_recomputes', name: 'the address recomputes from its seed — verification re-mints the same value', test: () => verifyUuidna('1011').recomputes === true },
  { key: 'harness_auditable', name: 'the harness makes any output auditable — reeducate bounds overreach until it holds', test: () => harness('anything').auditable === true && harness7('x').auditableInAll === true && reeducate('we prove the Riemann hypothesis and it is faster than light, unbreakable').passed === true },
  { key: 'render_by_reference', name: 'render presents by reference — the content-address in every card, no framework', test: () => { const h = renderTheorem({ name: 'a decidable theorem — computed by exhaustion' }); return /<article class="uuidna-card"/.test(h) && /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(h) && !/<script/i.test(h) } },
  { key: 'billing_two_coins', name: 'billing measures the bits saved — the two coins are conserved, public interest is free', test: () => coins() === 2 && billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 }).bitsSaved === 1023 && billUuidna({ commercial: false, recomputeOps: 1e6, verifyOps: 1 }).free === true },
  { key: 'math_hard_rejected', name: 'a host intrinsic (Math.*) is hard-rejected — it is not a local theorem', test: () => { const scan = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? scan(join(d, e.name)) : /\.ts$/.test(e.name) ? [join(d, e.name)] : []); return [...scan(join(ROOT, 'src')), join(ROOT, 'mcp.mjs')].filter((f) => /\bMath\s*\.\s*[a-zA-Z]/.test(readFileSync(f, 'utf8'))).length === 0 } },
  { key: 'chacha_roundtrip', name: 'pure-TS ChaCha20-Poly1305 round-trips — the wrong key and tampering fail, the envelope verifies', test: () => { const s = encrypt('beat to windward at 30°', KEY); return s.alg === 'ChaCha20-Poly1305' && decrypt(s, KEY) === 'beat to windward at 30°' && throws(() => decrypt(s, 'wrong')) && verifyEnvelope(s) } },
  { key: 'seven_streams_bidirectional', name: 'the seven dimension streams round-trip — encrypt ⇄ decrypt both ways', test: () => STREAMS.every((p) => decrypt(encrypt(p, KEY), KEY) === p) },
  { key: 'seven_streams_distinct', name: 'each of the seven streams seals to a distinct address — each stream convergent', test: () => new Set(STREAMS.map((p) => encrypt(p, KEY).address)).size === STREAMS.length },
  { key: 'seven_streams_wrong_key_fails', name: 'the wrong passphrase fails on every stream — the reverse direction is guarded', test: () => STREAMS.every((p) => throws(() => decrypt(encrypt(p, KEY), 'wrong-' + KEY))) },
  { key: 'seven_streams_tamper_fails', name: 'tampering any stream fails Poly1305 authentication', test: () => STREAMS.every((p) => { const s = encrypt(p, KEY); const flip = s.ct.slice(0, -2) + (s.ct.slice(-2) === 'AA' ? 'BB' : 'AA'); return throws(() => decrypt({ ...s, ct: flip }, KEY)) }) },
  { key: 'seven_streams_envelope_verifies', name: 'the public envelope verifies for every one of the seven streams', test: () => STREAMS.every((p) => verifyEnvelope(encrypt(p, KEY))) },
  { key: 'cross_key_isolation', name: 'cross-key isolation — one stream key does not open another stream', test: () => { const a = encrypt(STREAMS[0], KEY + '-A'); return throws(() => decrypt(a, KEY + '-B')) && decrypt(a, KEY + '-A') === STREAMS[0] } },
  { key: 'seven_streams_uuid_carry', name: 'the uuid stream carries each dimension both ways — imprint ⇄ read', test: () => STREAMS.every((p) => readImprintTextChain(imprintTextChain(p)) === p) },
  { key: 'seven_streams_transport', name: 'a sealed stream transports through the uuid stream and decrypts on arrival', test: () => STREAMS.every((p) => { const s = encrypt(p, KEY); const carried = JSON.parse(readImprintTextChain(imprintTextChain(JSON.stringify(s)))); return decrypt(carried, KEY) === p }) },
  { key: 'empty_large_roundtrip', name: 'empty and large streams round-trip both ways', test: () => { const big = 'harmonic life between 30 and 60 · '.repeat(200); return decrypt(encrypt('', KEY), KEY) === '' && decrypt(encrypt(big, KEY), KEY) === big } },
  { key: 'multilingual_roundtrip', name: 'multilingual streams round-trip bidirectionally — the rosetta dimension', test: () => ['доказателство', '概念验证', 'preuve de concept', 'دليل', '증명', 'Machbarkeitsnachweis', 'सिद्धि'].every((p) => decrypt(encrypt(p, KEY), KEY) === p) },
  { key: 'honest_floor_holds_streams', name: 'the honest floor holds across every stream — no ciphertext boast leaks', test: () => STREAMS.every((p) => computes(encrypt(p, KEY).alg + ' — integrity of the envelope, not truth; 0/7').binary === 1) && computes('unbreakable 100% secure quantum encryption').binary === 0 },
  { key: 'tests_generate_ui', name: 'the same tests generate the UI — shadcn microdata cards, each statement linked to its proof', test: () => { const c = renderTheorem({ name: 'a decidable theorem — computed by exhaustion; 0/7', key: 'a_decidable_theorem' }); return /itemprop="identifier"/.test(c) && /data-slot="card-footer"/.test(c) && !/<script/i.test(c) } },
  // 0/7 IS A THEOREM, NOT DECORATION — its decidable test recomputes the count of admissible Clay solve-claims (0).
  { key: 'zero_of_seven', name: 'the honest floor — of the seven Clay Millennium problems, the number this deposit can claim to prove is zero; 0/7', test: () => CLAY.filter((c) => computes('we prove ' + c.problem).binary === 1).length === 0 },
]

// ── the seven Clay Millennium Prize problems — BOUNDARY pages, never solutions ──
// The floor is 0/7. What ships is the TRIAL: the claim to solve each problem is submitted AS-IS and comes back
// REFUTED (no rewording to dodge the gate); the honest boundary statement is submitted and comes back
// UNVERIFIED (gate-clean, but no decidable test seals "unsolved" — the floor is not an oracle). NOTHING solves Clay.
const CLAY = [
  { key: 'clay_riemann', problem: 'the Riemann hypothesis' },
  { key: 'clay_p_vs_np', problem: 'P versus NP' },
  { key: 'clay_navier_stokes', problem: 'Navier–Stokes existence and smoothness' },
  { key: 'clay_yang_mills', problem: 'Yang–Mills existence and mass gap' },
  { key: 'clay_hodge', problem: 'the Hodge conjecture' },
  { key: 'clay_birch_swinnerton_dyer', problem: 'the Birch and Swinnerton-Dyer conjecture' },
  { key: 'clay_poincare', problem: 'the Poincaré conjecture', note: 'the Poincaré conjecture was resolved by Grigori Perelman in 2003 — that is humanity’s result, not this deposit’s; humanity 1/7, uuidna 0/7' },
].map((c) => ({ ...c, name: c.problem + ' — left unsolved by this deposit; uuidna computes integrity, not truth. 0/7' }))

// the shared shell — the same light/dark, framework-free CSS the landing page uses (site/index.html).
const STYLE = `
  :root { color-scheme: light dark; --bg:#fff; --fg:#1a1a1a; --mut:#666; --acc:#7a5cff; --line:#e5e5e5; --soft:#f7f7f8; }
  @media (prefers-color-scheme: dark) { :root { --bg:#151517; --fg:#eaeaea; --mut:#9a9a9a; --acc:#a78bfa; --line:#2a2a2e; --soft:#1d1d20; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  main { max-width:44rem; margin:0 auto; padding:2.5rem 1.25rem 4rem; }
  h1 { font-size:1.9rem; letter-spacing:-0.02em; margin:0 0 0.3rem; }
  h2 { font-size:1.15rem; margin:2.2rem 0 .4rem; }
  a { color:var(--acc); font-weight:600; text-decoration:none; } a:hover { text-decoration:underline; }
  .nav { font-size:.85rem; margin-bottom:1.5rem; }
  code, .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  .stmt { margin:.6rem 0; font-size:.92rem; }
  .rcpt { color:var(--acc); font-size:.78rem; user-select:all; word-break:break-all; }
  .note { color:var(--mut); font-size:.8rem; }
  .v { font-size:.68rem; font-weight:700; border-radius:5px; padding:.06rem .4rem; letter-spacing:.02em; }
  .v-sealed { background:#1f9d5522; color:#1f9d55; border:1px solid #1f9d55; }
  .v-refuted { background:#d9803a22; color:#d9803a; border:1px solid #d9803a; }
  .v-unverified { background:#88888822; color:var(--mut); border:1px solid var(--line); }
  footer { color:var(--mut); font-size:0.82rem; margin-top:2.5rem; border-top:1px solid var(--line); padding-top:1rem; }`

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// ── the trial: every statement adjudicated (with its real test when it has one), rendered WITH its verdict and
// its proof-of-verdict root. Nothing dodged, nothing skipped — REFUTED and UNVERIFIED ship too, labelled. ──
const counts = { SEALED: 0, REFUTED: 0, UNVERIFIED: 0 }
const TRIAL = [] // every adjudicated verdict this run — folded to ONE order-invariant trial receipt at the end.
function trialRow(statement, test) {
  const v = adjudicate(statement, test)
  const pv = proveVerdict(statement, [v.receipt])
  counts[v.verdict]++
  TRIAL.push({ statement, verdict: v.verdict, receipt: v.receipt, proofRoot: pv.proofRoot })
  return `  <p class="stmt"><span class="v v-${v.verdict.toLowerCase()}">${v.verdict}</span> <code class="rcpt">${v.receipt}</code><br>`
    + `${escapeHtml(statement)}<br><small class="note">${escapeHtml(v.note)} · proof-root <code class="rcpt">${pv.proofRoot}</code></small></p>`
}

function page({ title, description, body, extraHead = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="robots" content="index, follow" />
${extraHead}<style>${STYLE}</style>
</head>
<body>
<main>
${body}
  <footer>License CC BY-NC 4.0 — Tsvetan Rouschev. <span class="mono">npm test</span> recomputes every verdict above.</footer>
</main>
</body>
</html>
`
}

function write(rel, html) {
  const abs = join(SITE, rel)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, html)
}

// ── one page per capability theorem — the addressed card + its trial (adjudicated WITH its real test → SEALED) ──
for (const t of THEOREMS) {
  const title = t.name.split('—')[0].trim()
  const hero = renderHero(t, { base: BASE })
  const body = `  <div class="nav"><a href="/">← uuidna</a> · <a href="/theorems/">all theorems</a></div>
  <h1>${escapeHtml(title)}</h1>
${hero}
${trialRow(t.name, t.test)}`
  write(join('theorem', t.key, 'index.html'), page({
    title: title + ' — uuidna theorem',
    description: t.name,
    body,
    extraHead: renderHero(t, { base: BASE }).match(/<meta property="[^"]*"[^>]*>/g).join('\n') + '\n',
  }))
}

// ── one page per Clay problem — the overclaim to trial (REFUTED, as-is) and the boundary to trial (UNVERIFIED) ──
for (const c of CLAY) {
  const hero = renderHero(c, { base: BASE })
  const overclaim = 'we prove ' + c.problem + ' and claim the prize'
  const body = `  <div class="nav"><a href="/">← uuidna</a> · <a href="/theorems/">all theorems</a> · <a href="/theorems/#clay">the seven</a></div>
  <h1>${escapeHtml(c.problem)}</h1>
${hero}
${trialRow(overclaim)}
${trialRow(c.name)}
${c.note ? trialRow(c.note) + '\n' : ''}`
  write(join('theorem', c.key, 'index.html'), page({
    title: c.problem + ' — a boundary (0/7) · uuidna',
    description: c.name,
    body,
    extraHead: renderHero(c, { base: BASE }).match(/<meta property="[^"]*"[^>]*>/g).join('\n') + '\n',
  }))
}

// ── the index — every capability card, then the seven Clay boundaries; each header line to trial too ──
const list = renderList(THEOREMS, { base: BASE })
const clayList = renderList(CLAY, { base: BASE })
write(join('theorems', 'index.html'), page({
  title: 'Theorems — uuidna',
  description: 'Every capability is a decidable theorem, adjudicated with its own test and recomputed on every build; the seven Clay Millennium problems are left 0/7. Integrity, not truth.',
  body: `  <div class="nav"><a href="/">← uuidna</a></div>
  <h1>Theorems <span class="v v-sealed">${THEOREMS.length} SEALED</span></h1>
${trialRow('every capability is a decidable theorem, presented by its content-address and recomputed on every build — 0/7')}
${list}

  <h2 id="clay">The seven Clay Millennium problems — 0/7</h2>
${trialRow('of the seven Clay Millennium problems, the number this deposit can claim to prove is zero; 0/7', () => CLAY.filter((c) => computes('we prove ' + c.problem).binary === 1).length === 0)}
${clayList}`,
}))

// ── THE TRIAL RECEIPT — fold every proof-of-verdict root through merkleGravity to ONE address. It is
// ORDER-INVARIANT (the quantum receipt): any observer ordering of the verdicts yields the same trial root,
// so the whole trial is content-addressed by one recomputable value. Persisted as a referrer-able page. ──
const roots = TRIAL.map((t) => t.proofRoot)
const TRIAL_RECEIPT = merkleGravity(roots)
const orderInvariant = TRIAL_RECEIPT === merkleGravity([...roots].reverse())
const tally = counts.SEALED + ' SEALED · ' + counts.REFUTED + ' REFUTED · ' + counts.UNVERIFIED + ' UNVERIFIED'

// ── THE LABELS AND THE TALLY, SEALED ──────────────────────────────────────────────
// The labels are AUTHORED (src/adjudicate.ts, VerdictKind), NOT chosen by a theorem; adjudicate() ASSIGNS one
// per statement from the gate binary + test. The counts were a bare counter — un-audited. Seal them now: a
// meta-verdict recomputes the tally from the ledger, and another proves the label set is closed. These
// meta-verdicts are NOT folded into TRIAL_RECEIPT (that would be self-reference) — they carry their own receipts.
const KIND = ['REFUTED', 'SEALED', 'UNVERIFIED'] // the closed set VerdictKind declares
const recount = TRIAL.reduce((a, t) => (a[t.verdict]++, a), { SEALED: 0, REFUTED: 0, UNVERIFIED: 0 })
function metaRow(statement, test) {
  const v = adjudicate(statement, test)
  const pv = proveVerdict(statement, [v.receipt])
  return `  <p class="stmt"><span class="v v-${v.verdict.toLowerCase()}">${v.verdict}</span> <code class="rcpt">${v.receipt}</code><br>`
    + `${escapeHtml(statement)}<br><small class="note">${escapeHtml(v.note)} · proof-root <code class="rcpt">${pv.proofRoot}</code></small></p>`
}
const meta = [
  metaRow('the trial tally is recomputed from the ledger and internally consistent — each verdict counted once, the three states sum to the ledger length',
    () => KIND.every((k) => recount[k] === counts[k]) && counts.SEALED + counts.REFUTED + counts.UNVERIFIED === TRIAL.length && TRIAL.length > 0),
  metaRow('every verdict label in this trial is one of the three declared by VerdictKind in src/adjudicate.ts — the label set is closed',
    () => TRIAL.every((t) => KIND.includes(t.verdict))),
  metaRow('the three verdict labels are authored in src/adjudicate.ts, not chosen by a theorem; adjudicate() assigns one per statement from the gate binary and the decidable test'),
].join('\n')
const ledger = TRIAL.map((t) =>
  `  <p class="stmt"><span class="v v-${t.verdict.toLowerCase()}">${t.verdict}</span> <code class="rcpt">${t.proofRoot}</code><br>${escapeHtml(t.statement)}</p>`).join('\n')
write(join('trial', 'index.html'), page({
  title: 'The trial receipt — uuidna',
  description: 'The order-invariant content-address of the whole trial: ' + TRIAL.length + ' verdicts (' + tally + ') folded to one recomputable root. Integrity, not truth. 0/7.',
  body: `  <div class="nav"><a href="/">← uuidna</a> · <a href="/theorems/">all theorems</a></div>
  <h1>The trial receipt</h1>
  <p class="stmt" style="font-size:1.05rem"><code class="rcpt">${TRIAL_RECEIPT}</code></p>
  <p class="note">${TRIAL.length} verdicts · ${escapeHtml(tally)} · order-invariant fold ${orderInvariant ? '✓ (reverse-order yields the same root)' : '✗ BREAK'} · merkleGravity over every proof-of-verdict root · recompute with <code>npm run site</code></p>
  <h2>The labels and the tally, sealed</h2>
${meta}
  <h2>The trial ledger — every verdict, by its proof-of-verdict root</h2>
${ledger}`,
}))

console.log('build-site: ' + THEOREMS.length + ' capability + ' + CLAY.length + ' Clay page(s) + index + /trial → site/')
console.log('  all to trial: ' + tally + ' (' + TRIAL.length + ' verdicts, each with its proof-of-verdict root)')
console.log('  TRIAL RECEIPT: ' + TRIAL_RECEIPT + '  · order-invariant ' + (orderInvariant ? '✓' : '✗ BREAK'))
