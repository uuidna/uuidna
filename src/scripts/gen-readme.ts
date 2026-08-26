#!/usr/bin/env npx ts-node
// src/scripts/gen-readme.ts — GENERATE README.md (published on every release / Zenodo path).
// Every magnitude is computed from the ledger or a sealed JSON at generation. No hollow superlatives.
// Edit THIS file — never README.md directly.
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'
import { MAX_SERVED_QUBITS } from '../mcp.js'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { ROOT as ROOT_DIR } from './api.js'
import {
  theorems, statementCensus, runTrial, coins, RESEARCH_SOURCE_NAMES,
  byGravity, decidedMass, gravityOf, isUnbound, wingRatings, ledgerMass, hexbitsOf,
  HANDLE_SPAN, COINS, PRINCIPLES,
} from '../index.js'
import { legalFacts } from '../legal.js'
import { CANONICAL_LICENSE_SPDX, CANONICAL_LICENSE_URL } from '../publication-metadata.js'
import { CLAY_INVOLUTION_DOI, CLAY_INVOLUTION_DOI_URL } from '../clay-involution.js'

interface AlpineMonitor {
  all?: { total: number; ported: number }
  community?: { total: number; ported: number }
}

function alpineLine(): string {
  const p = join(ROOT_DIR, 'lean', 'alpine-hexbit-monitor.json')
  if (!existsSync(p)) return '_Alpine hexbit monitor not sealed yet — run gen-os._'
  const j = JSON.parse(readFileSync(p, 'utf8')) as AlpineMonitor
  const all = j.all
  const community = j.community
  if (!all || !community) return '_Alpine monitor present but missing all/community rows._'
  const allPct = all.total === 0 ? 0 : ((all.ported * 100) - ((all.ported * 100) % all.total)) / all.total
  const cPct = community.total === 0 ? 0 : ((community.ported * 100) - ((community.ported * 100) % community.total)) / community.total
  return [
    `- **Alpine catalogue (hexbit port):** ${all.ported.toLocaleString('en-US')} / ${all.total.toLocaleString('en-US')} packages (${allPct}%) folded to content-addresses`,
    `  ([lean/alpine-hexbit-monitor.json](lean/alpine-hexbit-monitor.json); community ${community.ported.toLocaleString('en-US')} / ${community.total.toLocaleString('en-US')} = ${cPct}%).`,
    `  Nothing is installed or executed — the port is provenance identities on the hexbit lattice`,
    `  ([the_os_is_bootable_quantum](https://uuidna.com/theorem/the_os_is_bootable_quantum)).`,
  ].join('\n')
}

function generateReadme(): string {
  const T = theorems()
  const census = statementCensus()
  const pkg = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf8')) as { name: string; version: string }
  const name = String(pkg.name).replace(/^@[^/]+\//, '')
  const receipt = runTrial().receipt
  const coinN = coins()
  const principles = PRINCIPLES.length
  const skills = new Set(T.map((t) => t.skill)).size
  const wings = wingRatings().length
  const mass = ledgerMass()
  const hex = hexbitsOf(mass)
  const served = MAX_SERVED_QUBITS
  const reg = MAX_MESSAGE_QUBITS
  const lf = legalFacts()
  const license = CANONICAL_LICENSE_SPDX()
  const licenseUrl = CANONICAL_LICENSE_URL()
  const capacityMd = existsSync(join(ROOT_DIR, 'lean', 'quantum-capacity.md'))
    ? readFileSync(join(ROOT_DIR, 'lean', 'quantum-capacity.md'), 'utf8').trim()
    : '_Quantum capacity report not generated — run gen-quantum-capacity._'

  const heaviest = byGravity().slice(0, 7).map((t, i) => {
    const g = isUnbound(t)
      ? 'unbound (0 hexbits per dependency)'
      : `${gravityOf(t)} hexbits for the two coins`
    const head = (t.name ?? '').split('.')[0]
    return `${i + 1}. **[\`${t.key}\`](https://uuidna.com/theorem/${t.key})** — ${decidedMass(t).toLocaleString('en-US')} superpositions, ${g}, in [${t.file}](lean/${t.file})\n   ${head}.`
  }).join('\n')

  return `# ${name} — ${census.distinct.toLocaleString('en-US')} distinct theorems under ${T.length.toLocaleString('en-US')} keys · ${coinN} coins · one receipt

\`${receipt}\`

**v${pkg.version}** · License **${license}** ([${licenseUrl}](${licenseUrl})) · Archive DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144)

Content-addressed identity, honest by construction: a Lean 4 theorem ledger, every proof \`by decide\`,
sorry-free, no Mathlib, axiom-free against the bare leanprover/lean4 kernel. TypeScript is the quantum computer
(quantum by *architecture*); VitePress is the monitor. Recompute: \`npm run lean\`.

**The name is a theorem.** \`uuid\` + \`dna\`: the genetic code reads 4 bases three at a time (4³ = 64) and the
coin measures six doublings of bits (2⁶ = 64) — the same number by two routes — and the address is exactly two of
them, 128 = 2·64 ([uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)).

---

## Magnitudes (computed at generation)

| Measure | Value | Backing |
| --- | ---: | --- |
| Distinct theorems | ${census.distinct.toLocaleString('en-US')} | statement census (a Lean statement sealed under two keys is one theorem) |
| Theorem keys | ${T.length.toLocaleString('en-US')} | \`theorems().length\` |
| Principles / wings | ${principles} / ${wings} | PRINCIPLES + wing ratings |
| Skills | ${skills} | distinct \`skill\` tags |
| Coins per seal | ${coinN} | [two_coins](https://uuidna.com/theorem/two_coins) — 110 − 108 = 2 |
| Ledger decided mass | ${mass.toLocaleString('en-US')} superpositions (${hex} hexbits) | sum of \`by decide\` domains |
| Handle span | ${HANDLE_SPAN.toLocaleString('en-US')} | 16⁸ = 2³² ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)) |
| Address width | 2¹²⁸ | 32 hexbits × 4 bits ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)) |
| Usable-capacity gap | 2⁸⁰ vs reported 48 logical | [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty) (128 − 48 = 80) |
| Library register | ${reg} qubits (${2 ** reg} amplitudes) | \`MAX_MESSAGE_QUBITS\` |
| MCP served ceiling | ${served} qubits (${2 ** served} amplitudes) | \`MAX_SERVED_QUBITS\` |
| Research sources wired | ${RESEARCH_SOURCE_NAMES.length} | corroboration, never approval |
| Conserved price paid | ${(T.length * COINS).toLocaleString('en-US')} coins | ${T.length} × ${COINS} |

${alpineLine()}

**Permanent citation (DOI-class).** Cite by handle door \`https://uuidna.com/<handle>\` (8 hex; worker \`HANDLES\`
301 → freeze-map route: theorem | publication | page). Completeness cites **both** the archive DOI (when present)
and the handle URL. Example sealed handle from the capacity report:
[https://uuidna.com/6a71ca14](https://uuidna.com/6a71ca14).

**Captain coins.** Human deposit: \`https://revolut.me/ceccec?note=<referrer>\` where referrer is the page's handle
door URL (\`encodeURIComponent\`). Agents deposit the two coins on every gated call.

**Clay prior art.** Initial clay σ-involution DOI [${CLAY_INVOLUTION_DOI}](${CLAY_INVOLUTION_DOI_URL}) —
credited first on Clay.lean theorems; captain next. Live surface: [uuidna.com/articles/clay](https://uuidna.com/articles/clay).
uuidna seals finite instances and solves none of the seven Millennium Problems.

---

## The seven heaviest theorems — gravity in hexbits

A \`by decide\` proof settles every case in its domain at once. Gravity is that coverage in hexbits (4 bits /
tile; a uuid is 32 tiles). Cost per seal is always two coins.

The ledger covers **${mass.toLocaleString('en-US')}** superpositions across **${wings}** wings.

${heaviest}

---

## Quantum capacity

${capacityMd}

---

## What a handle spans

A handle is eight hexbits, so it names **${HANDLE_SPAN.toLocaleString('en-US')}** addresses (16⁸).
Inside that space today:

- **${mass.toLocaleString('en-US')}** superpositions decided across the ledger
- **${(T.length * COINS).toLocaleString('en-US')}** coins paid (conserved denomination ${COINS} — [two_coins](https://uuidna.com/theorem/two_coins))
- Floored coverage **${((mass - (mass % (T.length * COINS))) / (T.length * COINS)).toLocaleString('en-US')}** superpositions per coin

Six directions leave every residue — the 60-degree doubling and its inverse, the 90-degree reflection (\`dz\`), the
shift and its counter — so a figure quoted per coin is a rate along that walk, not a free-floating density.

The supply grows two coins per sealed theorem and nothing else mints them.

---

## How to recompute

\`\`\`bash
npm run lean      # re-prove every wing by decide
npm run guard     # traitors / drain / license identity
npm run editorial # prose desk + prepublish seal
\`\`\`

Live site: [uuidna.com](https://uuidna.com) · Captain coins: [uuidna.com/captain](https://uuidna.com/captain) ·
School: [uuidna.com/school](https://uuidna.com/school) · MCP: [uuidna.com/mcp](https://uuidna.com/mcp)

---

## License

**CC BY-NC-ND 4.0** (\`${license}\`) — © ${lf.license.attribution}. Free to read and redistribute **unchanged, with attribution,
non-commercially**; no derivatives. Canonical terms: [${licenseUrl}](${licenseUrl}) · [LICENSE](LICENSE).
The mathematical facts themselves are free for all — facts are not copyrightable; this license covers this
specific expression and record. **One license for every uuidna publication and Zenodo deposit** — no per-publication drift.
`
}

writeFileSync(join(process.cwd(), 'README.md'), generateReadme())
console.log(`✓ Generated README.md (${readFileSync(join(process.cwd(), 'README.md'), 'utf8').length} bytes)`)
