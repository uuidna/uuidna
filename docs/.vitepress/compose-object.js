// compose-object — THE ONE CATCH-ALL CONTENT COMPOSER for every object type (captain, 2026-08-26).
//
// Theorems, publications, handle targets, and link-objects all feed THIS composer → ObjectPage (theme Layout).
// No per-type page templates. Locale/i18n is data-driven on ObjectPage (seven DIMENSIONS rays + hexbit readings).
// URLs stay frozen: /theorem/<key>, /publications/<slug>. Handle doors 301 via worker HANDLES.
import { theorems, PRINCIPLES, merkleGravity, runTrial, publications } from '../../dist/index.js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HB = (() => {
  try { return JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../lean/heartbeats.json'), 'utf8')).costs || {} } catch { return {} }
})()

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const GH = 'https://github.com/uuidna/uuidna/blob/main/lean/'

const ALL = theorems()
// Position each theorem within an ordered axis (skill-filtered, principle-filtered, or the full sequence), so a page
// can point at its immediate neighbours. Returns [prev, next] theorem records (or null at the ends).
const axis = (list, key) => {
  const pos = new Map(list.map((t, i) => [t.key, i]))
  return (t) => {
    const i = pos.get(t.key)
    return [i > 0 ? list[i - 1] : null, i < list.length - 1 ? list[i + 1] : null]
  }
}
const bySkill = Object.fromEntries([...new Set(ALL.map((t) => t.skill))].map((s) => [s, axis(ALL.filter((t) => t.skill === s))]))
const byPrin = Object.fromEntries([...new Set(ALL.map((t) => t.principle))].map((p) => [p, axis(ALL.filter((t) => t.principle === p))]))
const bySeq = axis(ALL)

// --- The rotation: CYCLIC axes over the ledger index, wrapping — modular, hence TOTAL (no gap, no orphan across the
// sealed theorems). N = 721 = 7 × 103, so the strides land exactly: stride 1 (discovery) and stride 9 (ℤ/9 vortex)
// are each coprime to N → ONE cycle of all N (stepping forward covers everything, exactly as the sequence discovered
// all); stride 7 (ℤ/7 rosette) shares the factor 7 → SEVEN strands of 103. Reflection is the dz(x)=10−x involution:
// mirror through the centre, self-inverse. Each rotation is backed by the sealed theorem that proves its group closes.
// These fill the frontier gaps the linear skill/principle axes leave; the frontiers themselves are the invisible next.
const N = ALL.length
const pos = new Map(ALL.map((t, i) => [t.key, i]))
const at = (i) => ALL[((i % N) + N) % N]
const rot = (stride) => (t) => at(pos.get(t.key) + stride)
const reflectOf = (t) => at(N - 1 - pos.get(t.key))
// The cycle structure is DERIVED from N, never hardcoded — so it cannot go stale when theorems are added (adding
// the pentagram set moved N from 721=7×103 to 729=3⁶, which flips which strides cover and which split). A stride s
// over the N-cycle makes gcd(s,N) strands of N/gcd(s,N); coprime (gcd 1) is one full turn covering all N.
const gcd2 = (a, b) => (b ? gcd2(b, a % b) : a)
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const prettyFactor = (n) => { const f = {}; let m = n; for (let d = 2; d * d <= m; d++) while (m % d === 0) { f[d] = (f[d] || 0) + 1; m /= d } if (m > 1) f[m] = (f[m] || 0) + 1; return Object.entries(f).map(([p, e]) => e > 1 ? p + [...String(e)].map((c) => SUP[+c]).join('') : p).join(' × ') }
const strand = (s) => { const g = gcd2(s, N); return g === 1 ? `one full turn of all ${N}` : `${g} strands of ${N / g}` }
const NFAC = prettyFactor(N)

// The NEIGHBOUR FOLD — a theorem is PROVEN alone (its `by decide` proof) but WITNESSED by its neighbours. Its
// content-address is one leaf of the ledger's ORDER-INVARIANT fold: the same receipt from any starting point and any
// of the seven rotations, so no theorem can be altered without every neighbour's fold reporting it. This section
// makes that concrete and recomputable per page — a LOCAL witness (this theorem folded with its four cyclic
// neighbours) and the WHOLE ledger receipt it contributes to. Integrity, not truth — the neighbours make each
// theorem tamper-evident, they do not prove it (Lean does).
const LEDGER_RECEIPT = runTrial().receipt
const neighbourFold = (t) => {
  const nb = [rot(1)(t), rot(7)(t), rot(9)(t), reflectOf(t)] // the four cyclic neighbours the rotation links
  const witness = merkleGravity([t.address, ...nb.map((n) => n.address)])
  return `## The neighbour fold — proven alone, witnessed by all its neighbours

This theorem is **proven alone** — its \`by decide\` proof above is its whole authority. But it is **witnessed by its
neighbours**: its content-address is one leaf of the ledger's **order-invariant** fold — the same receipt from any of
the ${N} starting points and any of the seven rotations — so no theorem can be altered without every neighbour's fold
reporting it.

- **Local witness** — this theorem folded with its four cyclic neighbours (${link(rot(9)(t))} · ${link(rot(7)(t))} · ${link(rot(1)(t))} · ${link(reflectOf(t))}): \`${witness.slice(0, 8)}\` — the handle; the full folds on the spot. Change any one of the five and this witness moves.
- **Ledger receipt** — all ${N} addresses folded to one: [\`${LEDGER_RECEIPT.slice(0, 8)}\`](/trials). Change **this** theorem and the whole receipt moves.

Recompute either by folding the content-addresses with \`merkleGravity\` (\`uuidna_run_ledger\` folds the whole ledger). The neighbours make it **tamper-evident**, they do not prove it — proof is Lean's, integrity is the fold's.`
}

// PROSE → MARKDOWN-SAFE inline text. Theorem names are full prose sentences computed from Lean — they carry
// markdown specials (| * _ [ ] < > `) that break links and tables, and braces Vue would try to interpolate. Escape
// at the COMPOSITION seam only: params/frontmatter keep the raw values (transformPageData escapes its own meta).
const mdSafe = (v) => String(v).replace(/[\\`*_[\]|]/g, (c) => '\\' + c).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')
// the SHORT title — the pre-em-dash head (the same head the card renderer shows); links carry the TITLE, never the
// whole sentence: the prose lives once on the theorem's own page, not in every neighbour's compass.
const titleOf = (t) => {
  const head = (t.name.split('—')[0]).trim() || t.key
  const short = head.length <= 80 ? head : (head.slice(0, 80).includes(' ') ? head.slice(0, 80).slice(0, head.slice(0, 80).lastIndexOf(' ')) : head.slice(0, 80)) + '…'
  return mdSafe(short)
}
/** Plain short title for ObjectPage hero / YAML frontmatter (no markdown escapes). */
const heroTitleOf = (t) => {
  const head = (t.name.split('—')[0]).trim() || t.key
  return head.length <= 120 ? head : head.slice(0, 117) + '…'
}
const link = (t) => (t ? `[${titleOf(t)}](/theorem/${t.key})` : '—')
const compass = (label, target, [prev, next]) =>
  `- **${label} · ${target}:** ${prev ? '← ' + link(prev) : '—'} · ${next ? link(next) + ' →' : '—'}`

// Each domain's generator — where the NEXT theorem is delivered (compute → generate → verify). Hand-authored files
// (Uuidna, Vortex, OneLeap) have no generator; there the next theorem is added to the .lean directly.
const SCRIPTS = 'https://github.com/uuidna/uuidna/blob/main/src/scripts/'
const GEN = {
  'Core.lean': 'lean-core.ts', 'Ring.lean': 'lean-tables.ts', 'Rosette.lean': 'lean-tables.ts',
  'Sequence.lean': 'lean-sequence.ts', 'DivByZero.lean': 'lean-divzero.ts', 'BioPhysics.lean': 'lean-biophysics.ts',
  'Discover.lean': 'lean-discover.ts', 'Quantum.lean': 'lean-quantum.ts', 'Clay.lean': 'lean-clay.ts',
  'Infinity.lean': 'lean-infinity.ts', 'Cipher.lean': 'lean-cipher.ts', 'Audit.lean': 'lean-audit.ts',
  'Coins.lean': 'lean-coins.ts', 'Neuro.lean': 'lean-neuro.ts', 'Propulsion.lean': 'lean-propulsion.ts',
  'Navigation.lean': 'lean-navigation.ts', 'Pentagram.lean': 'lean-pentagram.ts', 'Chess.lean': 'lean-chess.ts', 'Codes.lean': 'lean-codes.ts', 'Tides.lean': 'lean-tides.ts', 'Identifiers.lean': 'lean-identifiers.ts', 'Calendar.lean': 'lean-calendar.ts', 'Typesetting.lean': 'lean-typesetting.ts', 'Editing.lean': 'lean-editing.ts', 'Production.lean': 'lean-production.ts', 'Security.lean': 'lean-security.ts', 'Reasoning.lean': 'lean-reasoning.ts', 'Photography.lean': 'lean-photography.ts', 'Matching.lean': 'lean-matching.ts', 'Harmony.lean': 'lean-harmony.ts', 'Spectrum.lean': 'lean-spectrum.ts', 'Colour.lean': 'lean-colour.ts', 'Psychology.lean': 'lean-psychology.ts', 'Report.lean': 'lean-report.ts',
}

// The ROTATION — seven axes weave every theorem to its neighbours; three are cyclic rotations over the ledger,
// modular and total, so they fill the gaps the linear axes leave. Each is backed by a sealed theorem it links.
const rotation = (t) => `## The rotation — fills the gaps at scale

Every theorem is woven on **seven axes**: three navigational (skill · principle · sequence), three **cyclic
rotations** over the ledger, and the runtime referer above. The rotations are modular, so they are *total* — no
gap, no orphan across the ${N} sealed theorems (${N} = ${NFAC}; the strand structure below is DERIVED from that
count, never hardcoded, so it cannot go stale as theorems are added; [\`vortex_one_leap\`](/theorem/vortex_one_leap)
is the one leap that generates the turn):

- **Discovery · sequence, step 1 → ${link(rot(1)(t))}** — ${strand(1)}: clicking **next** covers all ${N} in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.
- **Vortex · ℤ/9, step 9 → ${link(rot(9)(t))}** — ${strand(9)} ([\`z9add_0_0\`](/theorem/z9add_0_0)).
- **Rosette · ℤ/7, step 7 → ${link(rot(7)(t))}** — ${strand(7)} ([\`z7add_0_0\`](/theorem/z7add_0_0)).
- **Reflection · dz(x)=10−x → ${link(reflectOf(t))}** — the mirror through the centre, self-inverse ([\`tens_complement_involutive\`](/theorem/tens_complement_involutive)).`

// "Next possible solutions" for a SEALED theorem are the frontier it opens. Where the forward link is INVISIBLE —
// a frontier with none sealed beyond — is exactly where the next, missing theorem hides, until it is delivered in
// code (compute → generate → verify), not coin. No fabricated promises: an absent link marks an absent theorem.
const developNext = (t) => {
  const [, nextSkill] = bySkill[t.skill](t)
  const [, nextPrin] = byPrin[t.principle](t)
  const [, nextSeq] = bySeq(t)
  const where = GEN[t.file]
    ? `a fact in [scripts/${GEN[t.file]}](${SCRIPTS}${GEN[t.file]}) — compute → generate → verify`
    : `a theorem in [lean/${t.file}](${GH}${t.file}) (hand-authored, verified by \`lean\`)`
  const invisible = (what) => `**invisible next** — the missing ${what} theorem hides here`
  return `## Deliver the next — the missing theorem hides in the invisible next

A sealed theorem is settled. Where its forward link is **invisible** — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:

- **Skill · ${t.skill}:** ${nextSkill ? link(nextSkill) + ' →' : invisible(t.skill)}
- **Principle · ${t.principle}:** ${nextPrin ? link(nextPrin) + ' →' : invisible(t.principle)}
- **Discovery:** ${nextSeq ? link(nextSeq) + ' →' : invisible('newest — the ledger tip, where the next to be discovered')}

To make the invisible next visible, add ${where}; then \`npm run lean\` seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.`
}

/** composeTheorem(t) → one catch-all ObjectPage payload (params + body).
 * Hero H1+abstract live in params (merged into frontmatter by transformPageData).
 * Do NOT emit YAML frontmatter in content — VitePress injects @content after the
 * route template preamble, so gray-matter never sees it and the bag leaks into the body. */
export function composeTheorem(t) {
  const handle = t.address.replace(/-/g, '').slice(0, 8)
  const heroTitle = heroTitleOf(t)
  const handleDoor = 'https://uuidna.com/' + handle
  const heartbeats = HB[t.address]
  return {
    params: {
      kind: 'theorem',
      id: t.key,
      key: t.key,
      name: t.name,
      principle: t.principle,
      skill: t.skill,
      statement: t.statement,
      tactic: t.tactic,
      address: t.address,
      objectKind: 'theorem',
      title: heroTitle,
      heroTitle,
      abstract: t.statement,
      handle,
      handleUrl: handleDoor,
      depositReferrer: handleDoor,
      heartbeats: heartbeats !== undefined ? heartbeats : null,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
    },
    content: `> ${mdSafe(t.name)}

**VERIFIED** — proven in Lean (\`by ${t.tactic}\`, sorry-free) · skill **${t.skill}** · principle **${t.principle}**

## Statement (formula)

\`\`\`lean
${t.statement}
\`\`\`

## Proof

\`\`\`lean
${t.lean}
\`\`\`

| field | value |
| --- | --- |
| content-address | \`${handle}\` — DOI-class door \`https://uuidna.com/${handle}\` |
| skill | ${t.skill} |
| principle | ${mdSafe(t.principle)} — ${mdSafe(blurb[t.principle] || '')} |
| verdict | **VERIFIED** — \`by ${t.tactic}\` sorry-free |
| decide-step cost | ${HB[t.address] !== undefined ? `**${HB[t.address]} heartbeats**` : `not yet measured`} |
| real energy cost | Landauer floor *kT·ln2* — heartbeat ≠ joules |

## Cross-links

<RefererCompass />

${compass('Skill', t.skill, bySkill[t.skill](t))}
${compass('Principle', t.principle, byPrin[t.principle](t))}
${compass('Sequence', 'ledger order', bySeq(t))}

${rotation(t)}

${neighbourFold(t)}

${developNext(t)}

Re-verify with \`npm run lean\`. Cite DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) and handle \`https://uuidna.com/${handle}\`.

<a class="object-deposit-btn" href="https://revolut.me/ceccec?note=${encodeURIComponent('https://uuidna.com/' + handle)}" target="_blank" rel="noopener noreferrer external">🪙 Captain coins · revolut.me/ceccec</a>
`,
  }
}

/** composePublication(p) → same catch-all ObjectPage shape (hero via params, not YAML-in-content). */
export function composePublication(p) {
  const handle = (p.address || p.receipt).replace(/-/g, '').slice(0, 8)
  const handleDoor = 'https://uuidna.com/' + handle
  const body = p.markdown.replace(/^#\s+[^\n]+\n+/, '')
  return {
    params: {
      kind: 'publications',
      id: p.slug,
      slug: p.slug,
      address: p.address,
      receipt: p.receipt,
      abstract: p.abstract,
      name: p.title,
      objectKind: 'publication',
      title: p.title,
      heroTitle: p.title,
      handle,
      handleUrl: handleDoor,
      depositReferrer: handleDoor,
      sealCount: p.count,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
    },
    content: `${body}

**Audited before published** · handle \`https://uuidna.com/${handle}\` · DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) · receipt \`${p.receipt.slice(0, 8)}\` · ${p.count} seals.

<a class="object-deposit-btn" href="https://revolut.me/ceccec?note=${encodeURIComponent('https://uuidna.com/' + handle)}" target="_blank" rel="noopener noreferrer external">🪙 Captain coins · revolut.me/ceccec</a>
`,
  }
}

/** allObjectPaths() → every object for the catch-all [kind]/[id] route. */
export function allObjectPaths() {
  const pubs = publications()
  const refused = pubs.filter((p) => !p.publishable)
  if (refused.length) {
    const why = refused.map((p) => `  • ${p.slug}: ${p.findings.map((f) => `[${f.token}] "${f.unit}"`).join('; ')}`).join('\n')
    throw new Error(`publications: ${refused.length} note(s) REFUSED —\n${why}`)
  }
  return [
    ...ALL.map(composeTheorem),
    ...pubs.map(composePublication),
  ]
}
