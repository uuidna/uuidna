// compose-object — THE ONE CATCH-ALL CONTENT COMPOSER. Every URL is a monograph: params (relations) + body.
// @ts-nocheck — ported from docs/.vitepress; SSG composer, not a typed API surface.
//
// Theorems, publications, handle targets, and link-objects all feed THIS composer → ObjectPage (theme Layout).
// No per-type page templates. Locale/i18n is data-driven on ObjectPage (seven DIMENSIONS rays + hexbit readings).
// URLs stay frozen: /theorem/<key>, /publications/<slug>. Handle doors 301 via worker HANDLES.
// Naming: publication = audited domain prose (one kind of monograph). principle = derivation wing.
// A listing (/theorems, /topics, …) is the monograph of that axis — composed into page data, not a second app.
//
// Body law (dry-clean): statement · proof · field table · cite line.
// Navigation chrome = stock VPDocFooter (prev/next) + ObjectBreadcrumbs (doc-before) + ObjectCrosslinks.
// Crosslinks live in params; the client does not recompute them from the census. No hero YAML bag leak.
import { theorems, PRINCIPLES, theoremAxioms } from './theorems/index.js'
import { typeset, formulaCensus } from './formula.js'
import { axiomWitness } from './axiom-witness.js'
import { publications } from './publish.js'
import { monographFaceOf, channelAudit } from './hexagram.js'
import { handleOf } from './handle.js'
import { buildChunks } from './handle-chunks.js'
import { mirrorRows, legsFor } from './rosetta-legs.js'
import { rdRoot } from './boundary.js'
import { richPublicationMetadata } from './publication-metadata.js'
import { ZENODO_SEALS } from './zenodo-seals.js'
import { theoremDemoOf, alpineWitnessByTheorem } from './quantum/apps/theorem-demos.js'
import {
  theoremGraph, publicationGraph, objectBreadcrumbs, shortTitle, buildRelatedMaps,
  theoremRef, dedupeRefs,
} from './object-graph.js'

const HB = (() => {
  try { return JSON.parse(rdRoot('lean/heartbeats.json')).costs || {} } catch { return {} }
})()

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const ALL = theorems()
const ALPINE_WITNESS = (() => {
  try {
    const raw = JSON.parse(rdRoot('lean/alpine-apps.json'))
    return alpineWitnessByTheorem(raw.bySkill || [], ALL)
  } catch { return new Map() }
})()
const LEGS_ROWS = mirrorRows()
const AXIOM_HOLDS = (() => { try { return !!axiomWitness().holds } catch { return false } })()

const bySkill = new Map()
const byPrin = new Map()
const byKey = new Map()
for (const t of ALL) {
  byKey.set(t.key, t)
  if (!bySkill.has(t.skill)) bySkill.set(t.skill, [])
  bySkill.get(t.skill).push(t)
  if (!byPrin.has(t.principle)) byPrin.set(t.principle, [])
  byPrin.get(t.principle).push(t)
}

const ALL_PUBS = publications().filter((p) => p.publishable)
const RELATED_MAPS = buildRelatedMaps(ALL_PUBS)

/** Zenodo rich metadata + seal surfaces bound to a domain note's Lean file. */
function zenodoBundleForFile(file) {
  const seals = ZENODO_SEALS.filter((s) => s.leanFiles?.includes(file))
  const rich = seals.length ? richPublicationMetadata(seals[0]) : null
  return { rich, seals }
}

// PROSE → MARKDOWN-SAFE inline text. Theorem names are full prose sentences computed from Lean — they carry
// markdown specials (| * _ [ ] < > `) that break links and tables, and braces Vue would try to interpolate. Escape
// at the COMPOSITION seam only: params/frontmatter keep the raw values (transformPageData escapes its own meta).
const mdSafe = (v) => String(v).replace(/[\\`*_[\]|]/g, (c) => '\\' + c).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')

/** Legs row for a theorem key (rosetta census) — empty legs if unknown. */
function legsRowOf(key) {
  try { return legsFor(LEGS_ROWS, key) } catch {
    return { key, legs: [], missing: ['symbol', 'proof', 'witness', 'falsifier', 'address'], claimedBy: 'captain' }
  }
}

/** composeTheorem(t) → one catch-all ObjectPage payload (params + body).
 * H1 / document title = the eight-hex handle. Prose name + Lean are the lead under it.
 * Hex face stamps (hexbits, hexagrams, occupancy, aura) live in params for ObjectPage.
 * Crosslinks live in params (prev/next for stock VPDocFooter; graph for ObjectCrosslinks).
 * Breadcrumbs: Home → Theorems → key (handle as leaf annotation) — not the related graph.
 * Do NOT emit YAML frontmatter in content — VitePress injects @content after the
 * route template preamble, so gray-matter never sees it and the bag leaks into the body. */
// DERIVED, never typed: how much of the sealed ledger typesets exactly. Computed once, on first use.
let FAMILY = ''
function formulaFamily() {
  if (!FAMILY) {
    const c = formulaCensus(ALL.map((t) => t.statement))
    FAMILY = `${c.formula} of ${c.total}`
  }
  return FAMILY
}

/** statementSection(statement) → the statement set as mathematics when it IS mathematics, and as the Lean
 *  computation it is when it is not. The Lean source stays on the page either way: the typeset line is derived
 *  FROM it and the kernel decided THAT, so hiding it would leave the reader trusting the prettier copy. The
 *  MathML is static and needs no script or webfont, which is what makes the printed page a paper. */
function statementSection(statement) {
  const t = typeset(statement, 'block')
  const lean = '```lean\n' + statement + '\n```'
  if (t.classification === 'program') {
    return `${lean}

This statement is a *computation* — a fold, a filter, a range — so it has no standard formula form and is left
as the Lean the kernel decided. Only ${formulaFamily()} sealed statements are formulas; this is not one of
them, and typesetting it as an equation would dress a program as mathematics.`
  }
  return `<figure class="formula">

${t.mathml}

</figure>

${lean}

For a manuscript: \`${t.tex}\` — or take the whole ledger as one XeLaTeX article,
<a href="/uuidna-ledger.tex">uuidna-ledger.tex</a> (every theorem, its Lean and its content-address; generated,
never edited). The anchor is deliberate: the .tex is a PUBLIC ASSET, served from docs/public at that exact path,
and VitePress's dead-link check resolves a markdown link as a ROUTE — so 1358 pages each reported a dead link for
a file that is really there. Ignoring the check was not available (the captain: do not ignore dead links), and it
should not be: stating the truth in a form the checker reads correctly is the fix, not silencing the checker.`
}

export function composeTheorem(t) {
  const face = monographFaceOf(t.address)
  const handle = face.handle
  const heartbeats = HB[t.address]
  const use = theoremDemoOf(t.key, t.skill, ALPINE_WITNESS.get(t.key) ?? 0)
  const axioms = theoremAxioms(t.key)
  const graph = { ...theoremGraph(t, ALL, bySkill, byPrin, legsRowOf(t.key), AXIOM_HOLDS, RELATED_MAPS, axioms, face), use }
  const ten = face.aura?.ten
  const channel = channelAudit(t.address)
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
      title: handle,
      heroTitle: handle,
      abstract: t.statement,
      ...face,
      heartbeats: heartbeats !== undefined ? heartbeats : null,
      use,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      // Stock VitePress docFooter surfaces (themeConfig.prev/next via transformPageData).
      prev: graph.prev,
      next: graph.next,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: 'theorem', id: t.key, handle }),
    },
    content: `# ${mdSafe(handle)}

> ${mdSafe(t.name)}

## Statement

${statementSection(t.statement)}

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
| kernel | ${axioms?.unbound ? '**unbound** — cites no wing def; kernel numerals only' : `**bound** — cites ${axioms?.depCount ?? 0} wing def${(axioms?.depCount ?? 0) === 1 ? '' : 's'}`} |
| wing defs | ${axioms?.dependsOn?.length ? axioms.dependsOn.map((d) => `\`${d}\``).join(' · ') : '—'} |
| gravity | ${axioms?.unbound ? '0 (unbound)' : `${axioms?.gravity ?? 0} hexbits across ${axioms?.depCount ?? 0} deps`} |
| neighbours | ${axioms?.neighbourCount ?? 0} in principle clique |
| 10D aura | ${ten ? `free residue ${ten.residue} · ray ${ten.ray} · wave ${ten.wave} — compactified period ${ten.period}s · rotation ${ten.rotation}°` : '—'} ([ten_square_computes_ten_dimensions](/theorem/ten_square_computes_ten_dimensions)) |
| uuid channel | handle \`${channel.handle}\` · trinities \`${channel.trinities.join('·')}\` · tail \`${channel.tail}\` · torus ${channel.torusHome ? 'home' : '—'} ([layout_groups_thirtytwo](/theorem/layout_groups_thirtytwo)) |
| station-10 | ${face.stations?.ten ?? '—'} = hexagram + hexbit ([station_ten_is_hexagram_plus_hexbit](/theorem/station_ten_is_hexagram_plus_hexbit)) |
| wing axioms | [reverse index](/axioms) · [theorem list](/theorems) |
| decide-step cost | ${HB[t.address] !== undefined ? `**${HB[t.address]} heartbeats**` : `not yet measured`} |
| real energy cost | Landauer floor *kT·ln2* — heartbeat ≠ joules |

<ClientOnly><TheoremUse /></ClientOnly>

Re-verify with \`npm run lean\`. Cite DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) and handle \`https://uuidna.com/${handle}\`.
`,
  }
}

/** composePublication(p) → same catch-all ObjectPage shape (stock H1 + abstract lead in content). */
export function composePublication(p) {
  const pubs = publications()
  const address = p.address || p.receipt
  const face = monographFaceOf(address)
  const handle = handleOf(address)
  const body = p.markdown.replace(/^#\s+[^\n]+\n+/, '')
  const lead = `> ${mdSafe(p.title)}\n\n` + (p.abstract ? `> ${mdSafe(p.abstract)}\n\n` : '')
  const { rich, seals } = zenodoBundleForFile(p.file)
  const graph = publicationGraph(p, pubs, byKey, rich, seals)
  return {
    params: {
      kind: 'publications',
      id: p.slug,
      slug: p.slug,
      address,
      receipt: p.receipt,
      abstract: p.abstract,
      name: p.title,
      objectKind: 'publication',
      title: handle,
      heroTitle: handle,
      ...face,
      sealCount: p.count,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      prev: graph.prev,
      next: graph.next,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: 'publication', id: p.slug, handle }),
    },
    content: `# ${mdSafe(handle)}

${lead}${body}

**Audited before published** · handle \`https://uuidna.com/${handle}\` · DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) · receipt \`${handleOf(p.receipt)}\` · ${p.count} seals.
`,
  }
}

/** composeChunk(c) → ObjectPage for one statement chunk (algebra handle, not a theorem key). */
export function composeChunk(c) {
  const face = monographFaceOf(c.address)
  const handle = face.handle
  const abstract = c.statement
  const relatedTheorems = dedupeRefs(
    (c.keys || []).slice(0, 8).map((key) => {
      const t = byKey.get(key)
      return t ? theoremRef(t) : { key, title: key, link: `/theorem/${key}` }
    }),
  )
  const graph = {
    objectKind: 'chunk',
    handle,
    address: c.address,
    relatedTheorems,
    relatedTheoremCount: (c.keys || []).length,
    sequence: { prev: null, next: null },
    unlocks: { link: '/unlocks', text: 'Unlock board' },
    waves: { link: '/waves', text: 'Automation waves' },
  }
  return {
    params: {
      kind: 'chunk',
      id: handle,
      address: c.address,
      statement: c.statement,
      tactic: c.tactic,
      keys: c.keys,
      files: c.files,
      objectKind: 'chunk',
      title: handle,
      heroTitle: handle,
      name: c.statement,
      abstract,
      ...face,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      prev: false,
      next: false,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: 'chunk', id: handle, handle }),
    },
    content: `# ${mdSafe(handle)}

> Distinct proven fact — content-addressed; ${c.keys.length} key(s) cite it.

## Statement

\`\`\`lean
${c.statement}
\`\`\`

| field | value |
| --- | --- |
| content-address | \`${handle}\` — DOI-class door \`https://uuidna.com/${handle}\` |
| keys | ${c.keys.map((k) => `\`${k}\``).join(', ')} |
| files | ${c.files.map((f) => `\`${f}\``).join(', ')} |
| tactic | \`by ${c.tactic}\` |

Cite handle \`https://uuidna.com/${handle}\`.
`,
  }
}

/** composeSequence(t) / composeVe(t) → ObjectPage keyed by theorem handle for Sequence / VE wings. */
function composeWingHandle(t, kind, kindLabel) {
  const face = monographFaceOf(t.address)
  const handle = face.handle
  const use = theoremDemoOf(t.key, t.skill, ALPINE_WITNESS.get(t.key) ?? 0)
  const graph = { ...theoremGraph(t, ALL, bySkill, byPrin, legsRowOf(t.key), AXIOM_HOLDS, RELATED_MAPS), use, objectKind: kind }
  return {
    params: {
      kind,
      id: handle,
      key: t.key,
      name: t.name,
      principle: t.principle,
      skill: t.skill,
      statement: t.statement,
      tactic: t.tactic,
      address: t.address,
      objectKind: kind,
      title: handle,
      heroTitle: handle,
      abstract: t.statement,
      ...face,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      use,
      prev: graph.prev,
      next: graph.next,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: kind, id: handle, handle }),
    },
    content: `# ${mdSafe(handle)}

> ${mdSafe(t.name)}

**${kindLabel}** — proven in Lean (\`by ${t.tactic}\`, sorry-free) · theorem key \`${t.key}\`

## Statement

\`\`\`lean
${t.statement}
\`\`\`

| field | value |
| --- | --- |
| content-address | \`${handle}\` — DOI-class door \`https://uuidna.com/${handle}\` |
| theorem | [\`${t.key}\`](/theorem/${t.key}) |
| principle | ${mdSafe(t.principle)} |
| verdict | **VERIFIED** — \`by ${t.tactic}\` sorry-free |

Cite handle \`https://uuidna.com/${handle}\`.
`,
  }
}

export function composeSequence(t) {
  return composeWingHandle(t, 'sequence', 'SEQUENCE')
}

export function composeVe(t) {
  return composeWingHandle(t, 've', 'VECTOR EQUILIBRIUM')
}

/** allObjectPaths() → every object for the catch-all [kind]/[id] route.
 *  Theorems + publications + sequence / chunk / VE handles — one ObjectPage, new kinds. */
export function allObjectPaths() {
  const pubs = publications()
  const refused = pubs.filter((p) => !p.publishable)
  if (refused.length) {
    const why = refused.map((p) => `  • ${p.slug}: ${p.findings.map((f) => `[${f.token}] "${f.unit}"`).join('; ')}`).join('\n')
    throw new Error(`publications: ${refused.length} note(s) REFUSED —\n${why}`)
  }
  const chunks = buildChunks()
  const sequence = ALL.filter((t) => t.file === 'Sequence.lean')
  const ve = ALL.filter((t) => t.file === 'VectorEquilibrium.lean')
  return [
    ...ALL.map(composeTheorem),
    ...pubs.map(composePublication),
    ...chunks.map(composeChunk),
    ...sequence.map(composeSequence),
    ...ve.map(composeVe),
  ]
}

export { shortTitle, theoremGraph, publicationGraph, objectBreadcrumbs }
