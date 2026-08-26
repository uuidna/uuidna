// compose-object — THE ONE CATCH-ALL CONTENT COMPOSER for every object type (captain, 2026-08-26).
//
// Theorems, publications, handle targets, and link-objects all feed THIS composer → ObjectPage (theme Layout).
// No per-type page templates. Locale/i18n is data-driven on ObjectPage (seven DIMENSIONS rays + hexbit readings).
// URLs stay frozen: /theorem/<key>, /publications/<slug>. Handle doors 301 via worker HANDLES.
//
// Body law (dry-clean): statement · proof · field table · cite line.
// Navigation chrome lives in VPDocFooter pager + ObjectCrosslinks — do not regenerate cross-link essays here.
import { theorems, PRINCIPLES, publications } from '../../dist/index.js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HB = (() => {
  try { return JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../lean/heartbeats.json'), 'utf8')).costs || {} } catch { return {} }
})()

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const ALL = theorems()

// PROSE → MARKDOWN-SAFE inline text. Theorem names are full prose sentences computed from Lean — they carry
// markdown specials (| * _ [ ] < > `) that break links and tables, and braces Vue would try to interpolate. Escape
// at the COMPOSITION seam only: params/frontmatter keep the raw values (transformPageData escapes its own meta).
const mdSafe = (v) => String(v).replace(/[\\`*_[\]|]/g, (c) => '\\' + c).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')

/** Plain short title for stock markdown H1 / document <title> (no markdown escapes). */
const heroTitleOf = (t) => {
  const head = (t.name.split('—')[0]).trim() || t.key
  return head.length <= 120 ? head : head.slice(0, 117) + '…'
}

/** composeTheorem(t) → one catch-all ObjectPage payload (params + body).
 * Stock VitePress H1 from markdown (`# title`); abstract/tagline is the lead under it.
 * Title/abstract also live in params (merged into frontmatter by transformPageData).
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

Re-verify with \`npm run lean\`. Cite DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) and handle \`https://uuidna.com/${handle}\`.
`,
  }
}

/** composePublication(p) → same catch-all ObjectPage shape (stock H1 + abstract lead in content). */
export function composePublication(p) {
  const handle = (p.address || p.receipt).replace(/-/g, '').slice(0, 8)
  const handleDoor = 'https://uuidna.com/' + handle
  const body = p.markdown.replace(/^#\s+[^\n]+\n+/, '')
  const lead = p.abstract ? `> ${mdSafe(p.abstract)}\n\n` : ''
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
    content: `# ${mdSafe(p.title)}

${lead}${body}

**Audited before published** · handle \`https://uuidna.com/${handle}\` · DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144) · receipt \`${p.receipt.slice(0, 8)}\` · ${p.count} seals.
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
