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
import {
  CLAY_INVOLUTION_DOI, CLAY_INVOLUTION_DOI_URL, CLAY_INVOLUTION_RECORD_URL,
} from '../clay-involution.js'
import { unlockReadmeBlock } from '../unlocks.js'

interface AlpineMonitor {
  all?: { total: number; ported: number }
  community?: { total: number; ported: number }
  completeness?: { total: number; witnessed: number; pct?: number; definition?: string; missing?: string[] }
}

function alpineLine(): string {
  const p = join(ROOT_DIR, 'lean', 'alpine-hexbit-monitor.json')
  if (!existsSync(p)) return '_Alpine hexbit monitor not sealed yet — run gen-os._'
  const j = JSON.parse(readFileSync(p, 'utf8')) as AlpineMonitor & {
    man?: { all?: { total: number; ported: number } }
    receipt?: string
  }
  const all = j.all
  const community = j.community
  if (!all || !community) return '_Alpine monitor present but missing all/community rows._'
  const allPct = all.total === 0 ? 0 : ((all.ported * 100) - ((all.ported * 100) % all.total)) / all.total
  const cPct = community.total === 0 ? 0 : ((community.ported * 100) - ((community.ported * 100) % community.total)) / community.total
  const man = j.man?.all
  const manLine = man
    ? ` man compile ${man.ported.toLocaleString('en-US')} / ${man.total.toLocaleString('en-US')};`
    : ''
  const driven = j.completeness
  const drivenPct = driven
    ? (driven.pct ?? (driven.total === 0 ? 0 : ((driven.witnessed * 100) - ((driven.witnessed * 100) % driven.total)) / driven.total))
    : null
  const completenessLine = driven && drivenPct !== null
    ? ` man→app→hexbit ${driven.witnessed.toLocaleString('en-US')} / ${driven.total.toLocaleString('en-US')} (${drivenPct}%)`
      + (driven.missing?.length ? `; orphans \`${driven.missing.join('`, `')}\`` : '')
      + ';'
    : ''
  const receipt = j.receipt ? ` monitor receipt \`${j.receipt}\`;` : ''
  return [
    `- **Alpine catalogue (hexbit port — upgraded with the captain unlocks):** completeness is **man pages testing the apps** folded into hexbits${completenessLine}`,
    `  provenance compile ${all.ported.toLocaleString('en-US')} / ${all.total.toLocaleString('en-US')} packages (${allPct}%)`,
    `  ([lean/alpine-hexbit-monitor.json](lean/alpine-hexbit-monitor.json);`,
    `  community ${community.ported.toLocaleString('en-US')} / ${community.total.toLocaleString('en-US')} = ${cPct}%;${manLine}${receipt}`,
    `  VitePress monitor [/os](https://uuidna.com/os)). Nothing installed or executed — provenance on the hexbit lattice`,
    `  ([the_os_is_bootable_quantum](https://uuidna.com/theorem/the_os_is_bootable_quantum)).`,
    `  Captain unlocks ride every sealed key — each theorem unlocks what it states`,
    `  (illustrations: [metonic_is_the_intercalation](https://uuidna.com/theorem/metonic_is_the_intercalation),`,
    `  [grover_quadratic_bound](https://uuidna.com/theorem/grover_quadratic_bound) — no asymmetric Shor target).`,
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

## Test proof of concept — Clay

Clay is the visible test of this system's work: seven finite instances in [lean/Clay.lean](lean/Clay.lean), each a
**computational claim** — proven \`by decide\`, content-addressed on the ledger. Prior art (initial clay
σ-involution): DOI [${CLAY_INVOLUTION_DOI}](${CLAY_INVOLUTION_DOI_URL})
([Zenodo record](${CLAY_INVOLUTION_RECORD_URL})) credited first; captain next. Live surface:
[uuidna.com/articles/clay](https://uuidna.com/articles/clay). Each key names the decided window drawn from that
problem's mathematics — the claim is exactly what Lean decides, not an invented conjecture.
**Clay gravity equals the rosetta at full capacity** — theorem
[clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette): the seven match ℤ/7 rays
([z7rays_seven](https://uuidna.com/theorem/z7rays_seven)), pairs 21 / quantum 42, three-sevens
7+7+7 = 21 ([three_sevens_twentyone](https://uuidna.com/theorem/three_sevens_twentyone)), and the rosette doubling
2·64 = 128 ([rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins))
— same architectural width as [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture).
Credit law: prior art DOI first, captain next.

## Rosette ℤ/7 · Pliska · three-sevens

The Pliska rosette is the ℤ/7 computing structure
([z7rays_seven](https://uuidna.com/theorem/z7rays_seven), [pliska_seven_rays](https://uuidna.com/theorem/pliska_seven_rays),
[pliska_seven_is_prime](https://uuidna.com/theorem/pliska_seven_is_prime)): seven rays, six units sum 21
([z7units_sum_21](https://uuidna.com/theorem/z7units_sum_21)), directed quantum 7·6 = 42
([rosette_quantum_fortytwo](https://uuidna.com/theorem/rosette_quantum_fortytwo)), three-sevens 7+7+7 = 21.
Live index: [uuidna.com/rosetta](https://uuidna.com/rosetta) — ray = address mod 7, decidable partition, no numerology.

## Glagolitic · letters on 9 · digit × self

Glagolitic **computes in 7** on the Pliska geometry (same ℤ/7 stack); **letters fold to 9** — units 1..9
([glagolitic_units](https://uuidna.com/theorem/glagolitic_units)), sum 45 → digital root 9
([glagolitic_units_sum](https://uuidna.com/theorem/glagolitic_units_sum), [digital_root](https://uuidna.com/theorem/digital_root)).
Digit × self is the sealed ℤ/9 table ([mul9_1_1](https://uuidna.com/theorem/mul9_1_1) … mul9_8_8 in Core.lean) and the
vortex orbit 1→2→4→8→7→5 ([vortex_orbit](https://uuidna.com/theorem/vortex_orbit), [two_order_six](https://uuidna.com/theorem/two_order_six)).
Hypothesis page: [uuidna.com/rosetta-glagolitic](https://uuidna.com/rosetta-glagolitic) — sealed arithmetic only; meanings stay research.

## Hexbit 16 · 128 = 2⁷ · ℤ/9 root — distinct rings, CRT joins

- **Hexbit lattice:** 16 = 2⁴ states per tile ([the_page_admits_sixteen](https://uuidna.com/theorem/the_page_admits_sixteen),
  [halfword_is_the_reflection_crossed](https://uuidna.com/theorem/halfword_is_the_reflection_crossed)); address =
  32×4 = 128 = 2⁷ ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture),
  [t7_betti_row_is_the_uuid](https://uuidna.com/theorem/t7_betti_row_is_the_uuid)).
- **ℤ/9 root:** digital-root fold identifies to 1..9 — different object from the 2¹²⁸ address fold
  ([fold_compresses_without_bound_and_never_recovers](https://uuidna.com/theorem/fold_compresses_without_bound_and_never_recovers)).
- **CRT join:** ℤ/7 × ℤ/9 = 63 when coprime ([crt_pairs_are_a_bijection](https://uuidna.com/theorem/crt_pairs_are_a_bijection),
  [rosette_and_vortex_are_coprime](https://uuidna.com/theorem/rosette_and_vortex_are_coprime)); rings stay distinct until the join says so.

## Compute · monitor · hexbit-fast · handles · deposit

TypeScript is the quantum computer (quantum by *architecture*); VitePress is the monitor — stock chrome, capacity door
[uuidna.com/quantum](https://uuidna.com/quantum) (no per-page QA cards). Push verifies sealed receipts
(\`gate-receipt.json\`, \`usable_gap_is_two_to_eighty\`) — **hexbit-fast**, remeasure off-path.
Permanent citation: \`https://uuidna.com/<handle>\` (8 hex; worker \`HANDLES\` 301 → freeze-map).
Captain coins: \`https://revolut.me/ceccec?note=<referrer>\` (\`encodeURIComponent\` of the page handle door).
**One license** for every publication and Zenodo deposit: **${license}**.

**Sufficient / insufficient.** Sufficient for finite \`by decide\` seals, axiom-free kernel proofs, falsifiers, receipts
(verify ≪ recompute — [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)),
handle capacity ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)),
captain-coin fair-exchange ([two_coins](https://uuidna.com/theorem/two_coins)), Alpine/hexbit catalogue
([a_spec_compiles_to_hexbits](https://uuidna.com/theorem/a_spec_compiles_to_hexbits)). Insufficient for climate,
pandemics, poverty/conflict, unbounded open math, nature-as-model, or justice — [doctrine](https://uuidna.com/doctrine)
(computational claims only; no Shor/world-problem seal).

${unlockReadmeBlock()}

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

---

## The seven heaviest theorems — gravity in hexbits

A \`by decide\` proof settles every case in its domain at once. Gravity is that coverage in hexbits (4 bits /
tile; a uuid is 32 tiles). Cost per seal is always two coins.

The ledger covers **${mass.toLocaleString('en-US')}** superpositions across **${wings}** wings.

${heaviest}

---

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
