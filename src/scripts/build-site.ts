#!/usr/bin/env node
// build-site — SELF-CONTAINED, LEAN IS THE SINGLE SOURCE. The theorem ledger is exactly what Lean proves: it is
// derived from lean/*.lean (via src/theorems/generated.ts) and reached here through the package's theorems()/
// runTrial(). /theorems is the filterable collection of proven Lean theorems; each /theorem/<key> show page
// carries the detailed proof, the formal statement, the content-address, its principle and the source + public
// links; /trial folds every theorem's address to ONE receipt; /undecided holds the open propositions (three-
// valued honesty). There is no separate /lean page — /theorems is it. A theorem computes in Lean, or it is not a
// theorem. The recomputation-only capabilities (FNV address, gate, crypto) are TOOLS, not theorems.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, runTrial, PRINCIPLES, toUuid, merkleGravity, renderHero, renderTheorem } from '../index.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const SITE = join(ROOT, 'site')
const BASE = '' // uuidna.com is served at root — proof links resolve to /theorem/<key>
const GH = 'https://github.com/uuidna/uuidna/blob/main/lean/' // source link per theorem

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
  .lean { display:block; margin-top:.4rem; font-size:.82rem; color:var(--fg); background:var(--soft); border:1px solid var(--line); border-radius:8px; padding:.6rem .7rem; word-break:break-word; white-space:pre-wrap; }
  .v { font-size:.68rem; font-weight:700; border-radius:5px; padding:.06rem .4rem; letter-spacing:.02em; }
  .v-sealed { background:#1f9d5522; color:#1f9d55; border:1px solid #1f9d55; }
  .v-refuted { background:#d9803a22; color:#d9803a; border:1px solid #d9803a; }
  .v-unverified { background:#88888822; color:var(--mut); border:1px solid var(--line); }
  .filterbar { position:sticky; top:3rem; z-index:5; display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; background:var(--bg); padding:.7rem 0; border-bottom:1px solid var(--line); margin:1rem 0 .4rem; }
  .filterbar input, .filterbar select { font:inherit; font-size:.9rem; padding:.4rem .6rem; border:1px solid var(--line); border-radius:8px; background:var(--soft); color:var(--fg); }
  .filterbar input { flex:1 1 12rem; min-width:8rem; }
  .filterbar .count { color:var(--mut); font-size:.82rem; white-space:nowrap; }
  .dl { margin:1rem 0; display:grid; grid-template-columns:auto 1fr; gap:.35rem .9rem; font-size:.9rem; }
  .dl dt { color:var(--mut); font-weight:600; } .dl dd { margin:0; word-break:break-word; }
  .links { display:flex; gap:.4rem 1rem; flex-wrap:wrap; margin:1.2rem 0; font-size:.88rem; }
  footer { color:var(--mut); font-size:0.82rem; margin-top:2.5rem; border-top:1px solid var(--line); padding-top:1rem; }`

const escapeHtml = (s: string) => String(s).replace(/[&<>"']/g, (c) => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[c]))

const NAV = [['/theorems/', 'Theorems', 'theorems'], ['/trial/', 'Trial', 'trial'], ['/undecided/', 'Undecided', 'undecided'], ['/captain/message', 'Captain', 'captain'], ['https://github.com/uuidna/uuidna', 'GitHub', 'github']]
const masthead = (active = '') => `<header class="masthead">
  <a class="brand" href="/">uuidna<span class="fl"></span></a>
  <nav>${NAV.map(([href, label, id]) => `<a href="${href}"${id === active ? ' class="active"' : ''}>${label}</a>`).join('')}</nav>
</header>`

interface PageArgs { title: string; description: string; body: string; extraHead?: string; active?: string }
function page({ title, description, body, extraHead = '', active = '' }: PageArgs) {
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
      <a href="/">Home</a><a href="/theorems/">Theorems</a><a href="/trial/">Trial</a><a href="/undecided/">Undecided</a>
      <a href="https://www.npmjs.com/package/@uuidna/uuidna">npm</a><a href="https://github.com/uuidna/uuidna">GitHub</a>
    </nav>
    License CC BY-NC 4.0 — Tsvetan Rouschev. <span class="mono">npm run lean</span> re-verifies every proof. Integrity, not truth. <span class="mono"></span>.
  </footer>
</main>
</body>
</html>
`
}

function write(rel: string, html: string) {
  const abs = join(SITE, rel)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, html)
}

// ── the ONE ledger, derived from lean/*.lean — every theorem carries its proof, principle and content-address ──
type LedgerEntry = ReturnType<typeof theorems>[number]
const LEDGER = theorems()
const trial = runTrial()
const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const order = PRINCIPLES.map((p) => p[1]).filter((name) => LEDGER.some((t) => t.principle === name))
const byPrinciple = Object.fromEntries(order.map((name) => [name, LEDGER.filter((t) => t.principle === name)]))
const TOTAL = LEDGER.length

// ── one show page per theorem — the detailed proof, the formal statement, the address, the principle, the links ──
for (const t of LEDGER) {
  const hero = renderHero({ name: t.name, key: t.key, address: t.address }, { base: BASE })
  const body = `  <div class="crumb"><a href="/theorems/">Theorems</a> / ${escapeHtml(t.principle)} / <span class="mono">${escapeHtml(t.key)}</span></div>
  <h1>${escapeHtml(t.name)}</h1>
${hero}
  <p class="stmt"><span class="v v-sealed">SEALED</span> <span class="v v-sealed">TRUE — proven in Lean</span> · <b>${escapeHtml(t.principle)}</b></p>
  <dl class="dl">
    <dt>statement</dt><dd><code>${escapeHtml(t.statement)}</code></dd>
    <dt>proof</dt><dd><code class="lean">${escapeHtml(t.lean)}</code></dd>
    <dt>content-address</dt><dd><code class="rcpt">${escapeHtml(t.address)}</code></dd>
    <dt>principle</dt><dd>${escapeHtml(t.principle)} — <span class="note">${escapeHtml(blurb[t.principle] || '')}</span></dd>
    <dt>verdict</dt><dd><b>SEALED</b> — its <code>by ${escapeHtml(t.tactic)}</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</dd>
  </dl>
  <div class="links">
    <a href="${escapeHtml(GH + t.file)}">Source · lean/${escapeHtml(t.file)}</a>
    <a href="/trial/">Trial receipt</a>
    <a href="/theorems/">All theorems</a>
    <a href="https://www.npmjs.com/package/@uuidna/uuidna">npm</a>
  </div>
  <p class="note">Re-verify every proof with <code>npm run lean</code> (regenerates lean/*.lean and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem. <span class="mono"></span>.</p>`
  write(join('theorem', t.key, 'index.html'), page({
    title: t.name.split('—')[0].trim() + ' — uuidna theorem',
    description: t.name + ' — ' + t.statement + ' (proven by ' + t.tactic + ' in Lean 4).',
    active: 'theorems',
    extraHead: (hero.match(/<meta property="[^"]*"[^>]*>/g) || []).join('\n') + '\n',
    body,
  }))
}

// ── /theorems — the FILTERABLE collection of proven Lean theorems, organised by computing principle ──
const card = (t: LedgerEntry) => `<div class="fcard" data-p="${escapeHtml(t.principle)}" data-t="${escapeHtml((t.key + ' ' + t.name + ' ' + t.statement).toLowerCase())}">`
  + renderTheorem({ name: t.name, key: t.key, address: t.address }, { base: BASE }) + `</div>`
const sections = order.map((name) =>
  `  <section class="psec" data-p="${escapeHtml(name)}">
    <h2>${escapeHtml(name)} <span class="v v-sealed">${byPrinciple[name].length}</span></h2>
    <p class="note psec-blurb">${escapeHtml(blurb[name] || '')}</p>
${byPrinciple[name].map(card).join('\n')}
  </section>`).join('\n')
const filterScript = `<script>
(function(){
  var q=document.getElementById('q'), sel=document.getElementById('p'), count=document.getElementById('n');
  var cards=[].slice.call(document.querySelectorAll('.fcard')), secs=[].slice.call(document.querySelectorAll('.psec'));
  function apply(){
    var s=(q.value||'').trim().toLowerCase(), p=sel.value, vis=0;
    cards.forEach(function(c){ var ok=(!s||c.dataset.t.indexOf(s)>=0)&&(!p||c.dataset.p===p); c.style.display=ok?'':'none'; if(ok)vis++; });
    secs.forEach(function(sec){ var any=sec.querySelector('.fcard:not([style*="none"])'); sec.style.display=(!p||sec.dataset.p===p)&&any?'':'none'; });
    count.textContent=vis+' / '+${TOTAL};
  }
  q.addEventListener('input',apply); sel.addEventListener('change',apply); apply();
})();
</script>`
write(join('theorems', 'index.html'), page({
  title: 'Theorems — uuidna',
  description: 'The filterable collection of ' + TOTAL + ' proven Lean theorems, each with its by decide proof (verified sorry-free), organised by computing principle. Lean is the single source. A theorem computes in Lean, or it is not a theorem. Integrity, not truth.',
  active: 'theorems',
  body: `  <h1>Theorems <span class="v v-sealed">${TOTAL} Lean-proven</span></h1>
  <p class="note"><b>The collection of proven Lean theorems</b> — every one authored in <code>lean/*.lean</code>,
  proven <code>by decide</code> (Lean 4.33.0, no Mathlib), verified sorry-free by <code>npm run lean</code>, and
  organised by computing principle: the 8×8 core generates, then the ring ℤ/9, the rosette ℤ/7, and the derived,
  discovered and applied layers. Filter by text or principle; open any card for its detailed proof. Lean is the
  single source — the recomputation-only capabilities (FNV address, gate, crypto) are <b>tools</b>, not theorems.
  <span class="mono"></span>.</p>
  <div class="filterbar">
    <input id="q" type="search" placeholder="Filter theorems — key, statement, principle…" autocomplete="off" />
    <select id="p"><option value="">All principles</option>${order.map((n) => `<option value="${escapeHtml(n)}">${escapeHtml(n)} (${byPrinciple[n].length})</option>`).join('')}</select>
    <span class="count" id="n">${TOTAL} / ${TOTAL}</span>
  </div>
${sections}
  <p class="note" style="margin-top:1.5rem">The whole set folds to one receipt on <a href="/trial/">/trial</a>;
  open propositions are held on <a href="/undecided/">/undecided</a>.</p>
${filterScript}`,
}))

// ── /trial — every Lean theorem's content-address folded to ONE order-invariant receipt; the chain re-seals ──
const roots = LEDGER.map((t) => t.address)
const RECEIPT = trial.receipt
const orderInvariant = RECEIPT === merkleGravity([...roots].reverse())
const CHAIN_GENESIS = 'axiom'
let chainTip = CHAIN_GENESIS
for (const r of roots) chainTip = toUuid(chainTip + '→' + r)
const principleRows = order.map((name) => {
  const rs = byPrinciple[name].map((t) => t.address)
  return `  <p class="stmt"><span class="v v-sealed">${byPrinciple[name].length}</span> <b>${escapeHtml(name)}</b> <code class="rcpt">${merkleGravity(rs)}</code></p>`
}).join('\n')
write(join('trial', 'index.html'), page({
  title: 'The trial receipt — uuidna',
  description: 'The order-invariant content-address of the whole Lean layer: ' + TOTAL + ' theorems, all proven by decide, folded to one recomputable receipt. Integrity, not truth.',
  active: 'trial',
  body: `  <h1>The trial receipt</h1>
  <p class="stmt" style="font-size:1.05rem"><code class="rcpt">${RECEIPT}</code></p>
  <p class="note">${TOTAL} theorems · all <span class="v v-sealed">SEALED</span> · all Lean-proven (<code>by decide</code>,
  sorry-free) · order-invariant fold ${orderInvariant ? '✓ (reverse order yields the same root)' : '✗ BREAK'} ·
  recompute with <code>npm run site</code>, re-verify the proofs with <code>npm run lean</code>. Each theorem's
  content-address is <code>toUuid(key:statement)</code>; the trial folds them through the order-invariant gravity.</p>
  <h2>Reverse — the chain re-seals</h2>
  <p class="note">sequential chain tip <code class="rcpt">${chainTip}</code> · genesis <code>${CHAIN_GENESIS}</code> — recompute link by link and it re-seals.</p>
  <h2>By computing principle — each layer folds to its own root</h2>
${principleRows}`,
}))

// ── /undecided — the OPEN register (three-valued honesty). Held, labeled, never dropped and never false. ──
const UNDECIDED: [string, string, string | null][] = [
  ['uuidna computes your DNA and blood type', 'the ABO system reduces to the Klein four-group and DNA base-pairing to a fixed-point-free involution — those are algebra and are proven. But "your DNA / blood type" names a particular person, which has no decidable content Lean can evaluate.', 'abo_klein_four'],
  ['the vortex is your genome', 'the genome-as-double-strand reduces to the complement involution and the base-pairs summing to 10 (proven). "Your genome" is not a proposition Lean can prove or refute.', 'dna_complement_involution'],
  ['432 Hz heals', 'the sound ladder f_d = 48·d and the octave doubling are exact ratios and are proven. "Heals" is a wellness claim with no decidable or clinical content here — flagged, never asserted.', 'sound_ladder_432'],
  ['uuidna predicts a person or their future', 'content-addressing is deterministic reproduction — the same input always mints the same address — not prediction of a person. Nothing here computes anyone.', null],
]
const undecidedRows = UNDECIDED.map(([claim, why, key]) =>
  `  <div class="stmt" style="border-left:3px solid #88888855;padding-left:.8rem;margin:1.1rem 0">
    <span class="v v-unverified">UNDECIDED</span> <b>${escapeHtml(claim)}</b>
    <p class="note" style="margin:.4rem 0 0">${escapeHtml(why)}${key ? ' &nbsp;→ reduces to <a href="/theorem/' + key + '/">' + key + '</a> (<span class="v v-sealed">TRUE</span>, proven in Lean)' : ''}</p>
  </div>`).join('\n')
write(join('undecided', 'index.html'), page({
  title: 'The undecided register — uuidna',
  description: 'Three-valued honesty: TRUE (Lean proves it) · FALSE (Lean proves its negation) · UNDECIDED (Lean does neither). The open propositions, held and labeled — never dropped, never called false. Integrity, not truth.',
  active: 'undecided',
  body: `  <h1>The undecided register</h1>
  <p class="note">The binary that matters is Lean, not the lexical gate. There are <b>three</b> states, not two:
  <span class="v v-sealed">TRUE</span> Lean proves it · <span class="v v-refuted">FALSE</span> Lean proves its
  negation · <span class="v v-unverified">UNDECIDED</span> Lean does neither. "Not proven" is <b>not</b> false —
  it is open. The claims below are UNDECIDED: held here, labeled, never dropped and never faked. To develop one
  to TRUE, give it <b>decidable content</b> — reduce it to algebra Lean can compute; the reducible core becomes
  a proven theorem, and the irreducible residue stays open. <span class="mono"></span>.</p>
${undecidedRows}
  <p class="note" style="margin-top:2rem">Everything provable is on <a href="/theorems/">/theorems</a> (${TOTAL} theorems, all by decide, sorry-free). The whole set folds to one receipt on <a href="/trial/">/trial</a>. What remains open lives here — accounted for, not discarded.</p>`,
}))

console.log('build-site (Lean single source): ' + TOTAL + ' theorems → ' + TOTAL + ' show pages + filterable /theorems + /trial + /undecided → site/')
console.log('  trial: ' + trial.count + ' SEALED · ' + trial.leanBacked + ' Lean-backed · receipt ' + RECEIPT + ' · order-invariant ' + (orderInvariant ? '✓' : '✗'))
