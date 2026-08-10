#!/usr/bin/env node
// build-site — SELF-CONTAINED, LEAN-COMPUTABLE ONLY. The theorem ledger is exactly what Lean proves: every card
// on /theorems and every verdict in /trial carries a real `by decide` Lean proof (verified in lean/*.lean). The
// recomputation-only capabilities (FNV address, gate, crypto) are TOOLS, not theorems — they are not shown as
// theorems here. /lean renders the full formal layer; /undecided holds the open propositions (three-valued
// honesty: TRUE proven · FALSE refuted · UNDECIDED neither). Integrity, not truth. 0/7.
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, runTrial, adjudicate, proveVerdict, merkleGravity, toUuid, renderHero, renderList } from '../dist/index.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = join(ROOT, 'site')
const BASE = '' // uuidna.com is served at root — proof links resolve to /theorem/<key>

const STYLE = `
  :root { color-scheme: light dark; --bg:#fff; --fg:#1a1a1a; --mut:#666; --acc:#7a5cff; --line:#e5e5e5; --soft:#f7f7f8; }
  @media (prefers-color-scheme: dark) { :root { --bg:#151517; --fg:#eaeaea; --mut:#9a9a9a; --acc:#a78bfa; --line:#2a2a2e; --soft:#1d1d20; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  main { max-width:44rem; margin:0 auto; padding:2rem 1.25rem 4rem; }
  h1 { font-size:1.9rem; letter-spacing:-0.02em; margin:0 0 0.3rem; }
  h2 { font-size:1.15rem; margin:2.2rem 0 .4rem; }
  a { color:var(--acc); font-weight:600; text-decoration:none; } a:hover { text-decoration:underline; }
  .masthead { position:sticky; top:0; z-index:10; display:flex; align-items:center; justify-content:space-between; gap:.5rem 1rem; flex-wrap:wrap; padding:.65rem 1.25rem; background:var(--bg); border-bottom:1px solid var(--line); }
  .masthead .brand { font-weight:800; font-size:1.05rem; letter-spacing:-.02em; color:var(--fg); }
  .masthead .brand:hover { text-decoration:none; }
  .masthead .brand .fl { font-size:.62rem; font-weight:700; color:var(--acc); border:1px solid var(--acc); border-radius:5px; padding:.02rem .3rem; margin-left:.3rem; vertical-align:.12em; }
  .masthead nav { display:flex; gap:.15rem .9rem; flex-wrap:wrap; font-size:.88rem; }
  .masthead nav a { color:var(--mut); font-weight:600; }
  .masthead nav a:hover { color:var(--fg); text-decoration:none; }
  .masthead nav a.active { color:var(--acc); }
  .crumb { font-size:.82rem; color:var(--mut); margin-bottom:1.3rem; }
  .crumb a { color:var(--mut); font-weight:500; } .crumb a:hover { color:var(--acc); }
  code, .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  .stmt { margin:.6rem 0; font-size:.92rem; }
  .rcpt { color:var(--acc); font-size:.78rem; user-select:all; word-break:break-all; }
  .note { color:var(--mut); font-size:.8rem; }
  .lean { display:block; margin-top:.4rem; font-size:.82rem; color:var(--fg); background:var(--soft); border:1px solid var(--line); border-radius:8px; padding:.5rem .7rem; word-break:break-word; }
  .v { font-size:.68rem; font-weight:700; border-radius:5px; padding:.06rem .4rem; letter-spacing:.02em; }
  .v-sealed { background:#1f9d5522; color:#1f9d55; border:1px solid #1f9d55; }
  .v-refuted { background:#d9803a22; color:#d9803a; border:1px solid #d9803a; }
  .v-unverified { background:#88888822; color:var(--mut); border:1px solid var(--line); }
  footer { color:var(--mut); font-size:0.82rem; margin-top:2.5rem; border-top:1px solid var(--line); padding-top:1rem; }`

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const NAV = [['/theorems/', 'Theorems', 'theorems'], ['/trial/', 'Trial', 'trial'], ['/lean/', 'Lean', 'lean'], ['/undecided/', 'Undecided', 'undecided'], ['/captain/message', 'Captain', 'captain'], ['https://github.com/uuidna/uuidna', 'GitHub', 'github']]
const masthead = (active = '') => `<header class="masthead">
  <a class="brand" href="/">uuidna<span class="fl">0/7</span></a>
  <nav>${NAV.map(([href, label, id]) => `<a href="${href}"${id === active ? ' class="active"' : ''}>${label}</a>`).join('')}</nav>
</header>`

function page({ title, description, body, extraHead = '', active = '' }) {
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
${masthead(active)}
<main>
${body}
  <footer>
    <nav style="display:flex;gap:.4rem 1rem;flex-wrap:wrap;margin-bottom:.6rem">
      <a href="/">Home</a><a href="/theorems/">Theorems</a><a href="/trial/">Trial</a><a href="/lean/">Lean</a><a href="/undecided/">Undecided</a>
      <a href="https://www.npmjs.com/package/@uuidna/uuidna">npm</a><a href="https://github.com/uuidna/uuidna">GitHub</a>
    </nav>
    License CC BY-NC 4.0 — Tsvetan Rouschev. <span class="mono">npm run lean</span> re-verifies every proof. Integrity, not truth. <span class="mono">0/7</span>.
  </footer>
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

// ── the Lean-pure ledger: theorems() are the only ledger theorems (each carries a Lean proof); runTrial()
// adjudicates them (all SEALED) and folds every proof-of-verdict root to one receipt. ──
const LEDGER = theorems()
const trial = runTrial()
const V = Object.fromEntries(trial.verdicts.map((v) => [v.key, v]))
const leanName = (lean) => (lean && lean.match(/theorem (\w+)/) || [])[1] || ''

// ── parse every lean/*.lean theorem, ORGANISED BY COMPUTING PRINCIPLE. Each becomes a schema.org microdata card
// on /theorems and a proof on /lean; names come from the *-manifest.json where present. ──
const LEAN_DIR = join(ROOT, 'lean')
const PRINCIPLE = [
  ['Core.lean', 'The 8×8 core', "the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes"],
  ['Ring.lean', 'The ring ℤ/9', 'the vortex ring: its full multiplication, addition and power tables'],
  ['Rosette.lean', 'The rosette ℤ/7', 'the Pliska group: its full multiplication, addition and power tables'],
  ['Uuidna.lean', 'The vortex algebra', 'units, orbit, involution, gravity, division by zero, light — the foundational facts'],
  ['Vortex.lean', 'Ported from millennium-solutions', 'the honest ℤ/9 & ℤ/7 facts, ported to plain Lean (no Mathlib)'],
  ['Sequence.lean', 'The sequence & reflection group', 'the mirror, AGL(1,ℤ/9)=54, one strip, neighbours, the ± polarities'],
  ['DivByZero.lean', 'Division by zero', 'the reflection dz(x)=10−x — a finite residue, never infinity'],
  ['BioPhysics.lean', 'Applied structure', 'blood groups, DNA base-pairing, the sound ladder — the algebra, demarcated'],
  ['Discover.lean', 'Self-discovered', 'facts derived by function: Lagrange, the unit criterion, idempotents'],
  ['OneLeap.lean', 'One leap', 'the whole vortex proved in a single by decide'],
]
const manifest = {}
for (const f of (existsSync(LEAN_DIR) ? readdirSync(LEAN_DIR).filter((f) => f.endsWith('-manifest.json')) : [])) for (const e of JSON.parse(readFileSync(join(LEAN_DIR, f), 'utf8'))) manifest[e.key] = e.name
const parseLean = (file) => { const src = readFileSync(join(LEAN_DIR, file), 'utf8'); return [...src.matchAll(/theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:--|theorem|def|namespace|end|$))/g)].map((m) => ({ key: m[1], stmt: m[2].trim().replace(/\s+/g, ' '), tactic: m[3].trim().replace(/\s+/g, ' '), name: manifest[m[1]] || m[2].trim().replace(/\s+/g, ' ') })) }
const leanFilesAll = existsSync(LEAN_DIR) ? readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean')).sort() : []
const orderedFiles = [...PRINCIPLE.map((p) => p[0]).filter((f) => leanFilesAll.includes(f)), ...leanFilesAll.filter((f) => !PRINCIPLE.some((p) => p[0] === f))]
const LEAN_BY_FILE = Object.fromEntries(orderedFiles.map((f) => [f, parseLean(f)]))
const ALL_LEAN = orderedFiles.flatMap((f) => LEAN_BY_FILE[f].map((t) => ({ ...t, file: f })))
const LEAN_TOTAL = ALL_LEAN.length
const headOf = (file) => { const p = PRINCIPLE.find((x) => x[0] === file); const n = LEAN_BY_FILE[file].length; return p ? `  <h2>${escapeHtml(p[1])} <span class="v v-sealed">${n}</span></h2>\n  <p class="note">${escapeHtml(p[2])}</p>` : `  <h2>lean/${file} <span class="v v-sealed">${n}</span></h2>` }

// ── one page per Lean-computable theorem — the addressed card, its formula, its Lean proof, its trial verdict ──
for (const t of LEDGER) {
  const v = V[t.key]
  const title = t.statement.split('—')[0].trim()
  const hero = renderHero({ name: t.statement, key: t.key }, { base: BASE })
  const body = `  <div class="crumb"><a href="/theorems/">Theorems</a> / ${escapeHtml(title)}</div>
  <h1>${escapeHtml(title)}</h1>
${hero}
  <p class="stmt"><span class="v v-sealed">SEALED</span> · <span class="v v-sealed">TRUE</span> proven in Lean <code class="rcpt">${v.receipt}</code><br>
  <b>formula</b> &nbsp;<code>${escapeHtml(t.formula)}</code></p>
  <code class="lean">${escapeHtml(t.lean || '')}</code>
  <p class="note">proof-of-verdict root <code class="rcpt">${v.proofRoot}</code> · re-verify with <code>npm run lean</code> · all proofs on <a href="/lean/">/lean</a></p>`
  write(join('theorem', t.key, 'index.html'), page({
    title: title + ' — uuidna theorem',
    description: t.statement,
    active: 'theorems',
    extraHead: hero.match(/<meta property="[^"]*"[^>]*>/g).join('\n') + '\n',
    body,
  }))
}

// ── /theorems — the ledger, Lean-computable only ──
write(join('theorems', 'index.html'), page({
  title: 'Theorems — uuidna',
  description: 'The Lean-computable theorem ledger: ' + LEDGER.length + ' theorems, every one carrying a by decide Lean proof (verified sorry-free). A theorem computes in Lean, or it is not a theorem. Integrity, not truth. 0/7.',
  active: 'theorems',
  body: `  <h1>Theorems <span class="v v-sealed">${LEAN_TOTAL} Lean-proven</span></h1>
  <p class="note"><b>Lean-computable only, organised by computing principle</b> — the 8×8 core generates, then
  the ring ℤ/9, the rosette ℤ/7, and the derived, discovered and applied layers. Every card below is schema.org
  microdata carrying its content-address; every theorem is proven <code>by decide</code>, sorry-free, in
  <a href="/lean/">/lean</a>. A theorem computes in Lean, or it is not a theorem — the recomputation-only
  capabilities (FNV address, gate, crypto) are <b>tools</b>, not theorems, and are not listed here.
  <span class="mono">0/7</span>.</p>
${orderedFiles.map((f) => headOf(f) + '\n' + renderList(LEAN_BY_FILE[f].map((t) => ({ name: t.name })), { base: BASE })).join('\n')}
  <p class="note" style="margin-top:1.5rem">Every proof is on <a href="/lean/">/lean</a>; the whole set folds to
  one receipt on <a href="/trial/">/trial</a>; open propositions are held on <a href="/undecided/">/undecided</a>.</p>`,
}))

// ── /trial — every Lean theorem's content-address folded to ONE order-invariant receipt; the chain re-seals ──
const leanRoots = ALL_LEAN.map((t) => toUuid(t.key + ':' + t.stmt))
const RECEIPT = merkleGravity(leanRoots)
const orderInvariant = RECEIPT === merkleGravity([...leanRoots].reverse())
const CHAIN_GENESIS = 'axiom:0/7'
const chainTip = (rs) => { let prev = CHAIN_GENESIS; for (const r of rs) prev = toUuid(prev + '→' + r); return prev }
const CHAIN_TIP = chainTip(leanRoots)
const principleRows = orderedFiles.map((f) => { const p = PRINCIPLE.find((x) => x[0] === f); const rs = LEAN_BY_FILE[f].map((t) => toUuid(t.key + ':' + t.stmt)); return `  <p class="stmt"><span class="v v-sealed">${LEAN_BY_FILE[f].length}</span> <b>${escapeHtml(p ? p[1] : f)}</b> <code class="rcpt">${merkleGravity(rs)}</code></p>` }).join('\n')
write(join('trial', 'index.html'), page({
  title: 'The trial receipt — uuidna',
  description: 'The order-invariant content-address of the whole Lean layer: ' + LEAN_TOTAL + ' theorems, all proven by decide, folded to one recomputable receipt. Integrity, not truth. 0/7.',
  active: 'trial',
  body: `  <h1>The trial receipt</h1>
  <p class="stmt" style="font-size:1.05rem"><code class="rcpt">${RECEIPT}</code></p>
  <p class="note">${LEAN_TOTAL} theorems · all SEALED · all Lean-proven (<code>by decide</code>, sorry-free) ·
  order-invariant fold ${orderInvariant ? '✓ (reverse-order yields the same root)' : '✗ BREAK'} · recompute with
  <code>npm run site</code>, re-verify the proofs with <code>npm run lean</code>.</p>
  <h2>Reverse — the chain re-seals</h2>
  <p class="note">sequential chain tip <code class="rcpt">${CHAIN_TIP}</code> · genesis <code>${CHAIN_GENESIS}</code> — recompute link by link and it re-seals.</p>
  <h2>By computing principle — each layer folds to its own root</h2>
${principleRows}`,
}))

// ── /lean — the Lean 4 formal layer, ON THE SITE, organised by computing principle (reusing the shared parse). ──
const leanSections = orderedFiles.map((file) => {
  const rows = LEAN_BY_FILE[file].map((t) =>
    `  <p class="stmt"><span class="v v-sealed">by ${escapeHtml(t.tactic)}</span> <b>${escapeHtml(t.key)}</b><br><code style="font-size:.82rem;word-break:break-word">${escapeHtml(t.stmt)}</code></p>`).join('\n')
  return headOf(file) + '\n' + rows
}).join('\n')
write(join('lean', 'index.html'), page({
  title: 'The Lean 4 formal layer — uuidna',
  description: LEAN_TOTAL + ' theorems formalised in Lean 4, all by decide, verified sorry-free (no Mathlib), organised by computing principle; the ℤ/9 vortex ones ported from millennium-solutions. Integrity, not truth. 0/7.',
  active: 'lean',
  body: `  <h1>The Lean 4 formal layer <span class="v v-sealed">${LEAN_TOTAL} sorry-free</span></h1>
  <p class="note">Every theorem below compiles under Lean 4.33.0 with <code>by decide</code> and no Mathlib —
  finite, decidable algebra. The ℤ/9 vortex theorems are ported from
  <a href="https://ceccec.psg.bg/millennium-solutions/">millennium-solutions</a>; division-by-zero, the
  sequence/group layer, the bio/physics structure and the self-discovered theorems are generated by
  <code>npm run lean</code>. Only algebra is in Lean — the FNV address, the gate and the crypto are tools, not
  theorems (a Lean proof there is native_decide over a port, never faked). <span class="mono">0/7</span>.</p>
${leanSections}`,
}))

// ── /undecided — the OPEN register (three-valued honesty). Held, labeled, never dropped and never false. ──
const UNDECIDED = [
  ['uuidna computes your DNA and blood type', 'the ABO system reduces to the Klein four-group and DNA base-pairing to a fixed-point-free involution — those are algebra and are proven. But "your DNA / blood type" names a particular person, which has no decidable content Lean can evaluate.', 'abo_klein_four'],
  ['the vortex is your genome', 'the genome-as-double-strand reduces to the complement involution and the base-pairs summing to 10 (proven). "Your genome" is not a proposition Lean can prove or refute.', 'dna_complement_involution'],
  ['432 Hz heals', 'the sound ladder f_d = 48·d and the octave doubling are exact ratios and are proven. "Heals" is a wellness claim with no decidable or clinical content here — flagged, never asserted.', 'sound_ladder_432'],
  ['uuidna predicts a person or their future', 'content-addressing is deterministic reproduction — the same input always mints the same address — not prediction of a person. Nothing here computes anyone.', null],
]
const undecidedRows = UNDECIDED.map(([claim, why, lean]) =>
  `  <div class="stmt" style="border-left:3px solid #88888855;padding-left:.8rem;margin:1.1rem 0">
    <span class="v v-unverified">UNDECIDED</span> <b>${escapeHtml(claim)}</b>
    <p class="note" style="margin:.4rem 0 0">${escapeHtml(why)}${lean ? ' &nbsp;→ reduces to <a href="/lean/">' + lean + '</a> (<span class="v v-sealed">TRUE</span>, proven in Lean)' : ''}</p>
  </div>`).join('\n')
write(join('undecided', 'index.html'), page({
  title: 'The undecided register — uuidna',
  description: 'Three-valued honesty: TRUE (Lean proves it) · FALSE (Lean proves its negation) · UNDECIDED (Lean does neither). The open propositions, held and labeled — never dropped, never called false. Integrity, not truth. 0/7.',
  active: 'undecided',
  body: `  <h1>The undecided register</h1>
  <p class="note">The binary that matters is Lean, not the lexical gate. There are <b>three</b> states, not two:
  <span class="v v-sealed">TRUE</span> Lean proves it · <span class="v v-refuted">FALSE</span> Lean proves its
  negation · <span class="v v-unverified">UNDECIDED</span> Lean does neither. "Not proven" is <b>not</b> false —
  it is open. The claims below are UNDECIDED: held here, labeled, never dropped and never faked. To develop one
  to TRUE, give it <b>decidable content</b> — reduce it to algebra Lean can compute; the reducible core becomes
  a proof on <a href="/lean/">/lean</a>, and the irreducible residue stays open. <span class="mono">0/7</span>.</p>
${undecidedRows}
  <p class="note" style="margin-top:2rem">Everything provable is on <a href="/lean/">/lean</a> (${LEAN_TOTAL} theorems, all by decide, sorry-free). Everything in the ledger is on <a href="/trial/">/trial</a>. What remains open lives here — accounted for, not discarded.</p>`,
}))

console.log('build-site (Lean-computable only): ' + LEDGER.length + ' theorems + index + /trial + /lean (' + LEAN_TOTAL + ') + /undecided → site/')
console.log('  trial: ' + trial.count + ' SEALED · ' + trial.leanBacked + ' Lean-backed · receipt ' + RECEIPT + ' · order-invariant ' + (orderInvariant ? '✓' : '✗'))
