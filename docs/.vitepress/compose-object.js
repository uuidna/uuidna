// compose-object — THE ONE CATCH-ALL CONTENT COMPOSER for every object type (captain, 2026-08-26).
//
// Theorems, publications, handle targets, and link-objects all feed THIS composer → ObjectPage (theme Layout).
// No per-type page templates. Locale/i18n is data-driven on ObjectPage (seven DIMENSIONS rays + hexbit readings).
// URLs stay frozen: /theorem/<key>, /publications/<slug>. Handle doors 301 via worker HANDLES.
//
// Body law (dry-clean): statement · proof · field table · cite line.
// Navigation chrome = stock VPDocFooter (prev/next) + ObjectBreadcrumbs (doc-before) + ObjectCrosslinks.
// Do NOT regenerate cross-link essays or capacity/OS QA cards in content — no hero YAML bag leak.
import { theorems, PRINCIPLES, publications, axiomWitness, hexbitDoorOf } from '../../dist/index.js'
import { buildChunks } from '../../dist/scripts/gen-handle-chunks.js'
import { mirrorRows, legsFor } from '../../dist/rosetta-legs.js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { richPublicationMetadata } from '../../dist/publication-metadata.js'
import { ZENODO_SEALS } from '../../dist/zenodo-seals.js'
import { theoremDemoOf, alpineWitnessByTheorem } from '../../dist/quantum/apps/theorem-demos.js'
import {
  theoremGraph, publicationGraph, objectBreadcrumbs, shortTitle, buildRelatedMaps,
} from './object-graph.js'

const HB = (() => {
  try { return JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../lean/heartbeats.json'), 'utf8')).costs || {} } catch { return {} }
})()

const ALPINE_WITNESS = (() => {
  try {
    const raw = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../lean/alpine-apps.json'), 'utf8'))
    return alpineWitnessByTheorem(raw.bySkill || [])
  } catch { return new Map() }
})()

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const ALL = theorems()
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

/** Plain short title for stock markdown H1 / document <title> (no markdown escapes). */
const heroTitleOf = (t) => {
  const head = (t.name.split('—')[0]).trim() || t.key
  return head.length <= 120 ? head : head.slice(0, 117) + '…'
}

/** Legs row for a theorem key (rosetta census) — empty legs if unknown. */
function legsRowOf(key) {
  try { return legsFor(LEGS_ROWS, key) } catch {
    return { key, legs: [], missing: ['symbol', 'proof', 'witness', 'falsifier', 'address'], claimedBy: 'captain' }
  }
}

/** composeTheorem(t) → one catch-all ObjectPage payload (params + body).
 * Stock VitePress H1 from markdown (`# title`); abstract/tagline is the lead under it.
 * Title/abstract also live in params (merged into frontmatter by transformPageData).
 * Crosslinks live in params (prev/next for stock VPDocFooter; graph for ObjectCrosslinks).
 * Breadcrumbs: Home → Theorems → key (handle as leaf annotation) — not the related graph.
 * Do NOT emit YAML frontmatter in content — VitePress injects @content after the
 * route template preamble, so gray-matter never sees it and the bag leaks into the body. */
export function composeTheorem(t) {
  const door = hexbitDoorOf(t.address)
  const handle = door.handle
  const handleDoor = door.door
  const heroTitle = heroTitleOf(t)
  const heartbeats = HB[t.address]
  const use = theoremDemoOf(t.key, t.skill, ALPINE_WITNESS.get(t.key) ?? 0)
  const graph = { ...theoremGraph(t, ALL, bySkill, byPrin, legsRowOf(t.key), AXIOM_HOLDS, RELATED_MAPS), use }
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
      use,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      // Stock VitePress docFooter surfaces (themeConfig.prev/next via transformPageData).
      prev: graph.prev,
      next: graph.next,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: 'theorem', id: t.key, handle }),
    },
    // Stock H1 = hero; full prose name is the tagline/lead under it (Lean statement stays in the formula block).
    content: `# ${mdSafe(heroTitle)}

> ${mdSafe(t.name)}

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

<ClientOnly><TheoremUse /></ClientOnly>

Re-verify with \`npm run lean\`. Cite DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) and handle \`https://uuidna.com/${handle}\`.
`,
  }
}

/** composePublication(p) → same catch-all ObjectPage shape (stock H1 + abstract lead in content). */
export function composePublication(p) {
  const pubs = publications()
  const handle = (p.address || p.receipt).replace(/-/g, '').slice(0, 8)
  const handleDoor = 'https://uuidna.com/' + handle
  const body = p.markdown.replace(/^#\s+[^\n]+\n+/, '')
  const lead = p.abstract ? `> ${mdSafe(p.abstract)}\n\n` : ''
  const { rich, seals } = zenodoBundleForFile(p.file)
  const graph = publicationGraph(p, pubs, byKey, rich, seals)
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
      prev: graph.prev,
      next: graph.next,
      crosslinks: graph,
      breadcrumbs: objectBreadcrumbs({ objectKind: 'publication', id: p.slug, handle }),
    },
    content: `# ${mdSafe(p.title)}

${lead}${body}

**Audited before published** · handle \`https://uuidna.com/${handle}\` · DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) · receipt \`${p.receipt.slice(0, 8)}\` · ${p.count} seals.
`,
  }
}

/** composeChunk(c) → ObjectPage for one statement chunk (algebra handle, not a theorem key). */
export function composeChunk(c) {
  const handle = c.handle
  const handleDoor = 'https://uuidna.com/' + handle
  const title = `chunk ${handle}`
  const abstract = c.statement
  return {
    params: {
      kind: 'chunk',
      id: handle,
      handle,
      address: c.address,
      statement: c.statement,
      tactic: c.tactic,
      keys: c.keys,
      files: c.files,
      objectKind: 'chunk',
      title,
      heroTitle: title,
      abstract,
      handleUrl: handleDoor,
      depositReferrer: handleDoor,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      breadcrumbs: objectBreadcrumbs({ objectKind: 'chunk', id: handle, handle }),
    },
    content: `# ${mdSafe(title)}

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
  const door = hexbitDoorOf(t.address)
  const handle = door.handle
  const handleDoor = door.door
  const heroTitle = heroTitleOf(t)
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
      title: heroTitle,
      heroTitle,
      abstract: t.statement,
      handle,
      handleUrl: handleDoor,
      depositReferrer: handleDoor,
      locales: ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'],
      breadcrumbs: objectBreadcrumbs({ objectKind: kind, id: handle, handle }),
    },
    content: `# ${mdSafe(heroTitle)}

> ${mdSafe(t.name)}

**${kindLabel}** — proven in Lean (\`by ${t.tactic}\`, sorry-free) · theorem key \`${t.key}\` · skill **${t.skill}**

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
