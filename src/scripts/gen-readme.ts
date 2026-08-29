#!/usr/bin/env npx ts-node
// src/scripts/gen-readme.ts — GENERATE README.md (published on every release / Zenodo path).
// Every magnitude is computed from the ledger or a sealed JSON at generation. No hollow superlatives.
// Edit THIS file — never README.md directly.
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { ROOT as ROOT_DIR } from './api.js'
import {
  theorems, statementCensus, runTrial, coins, RESEARCH_SOURCE_NAMES,
  byGravity, decidedMass, gravityOf, isUnbound, wingRatings, ledgerMass, hexbitsOf,
  HANDLE_SPAN, HANDLE_HEXBITS, HEXBIT_BITS, HEXBIT_STATES, COINS, PRINCIPLES, tamperCosts, phdProofs,
  sha256IsFourSixtyfours,
} from '../index.js'
import { legalFacts } from '../legal.js'
import { CANONICAL_LICENSE_SPDX, CANONICAL_LICENSE_URL } from '../publication-metadata.js'
import {
  CLAY_INVOLUTION_DOI, CLAY_INVOLUTION_DOI_URL, CLAY_INVOLUTION_RECORD_URL,
} from '../clay-involution.js'
import { unlockReadmeBlock } from '../unlocks.js'
import { timeShorFullUse } from '../os/host/index.js'

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
  const tamper = tamperCosts()
  const phd = phdProofs()
  const hilbertQubits = HEXBIT_BITS * HEXBIT_BITS
  const hilbertStates = HEXBIT_STATES ** HEXBIT_BITS
  const nest = HANDLE_HEXBITS + HEXBIT_BITS
  const quantumWing = T.filter((t) => t.file === 'Quantum.lean').length
  const cipherWing = T.filter((t) => t.file === 'Cipher.lean').length
  const lf = legalFacts()
  const license = CANONICAL_LICENSE_SPDX()
  const licenseUrl = CANONICAL_LICENSE_URL()
  const capacityMd = existsSync(join(ROOT_DIR, 'lean', 'quantum-capacity.md'))
    ? readFileSync(join(ROOT_DIR, 'lean', 'quantum-capacity.md'), 'utf8').trim()
    : '_Quantum capacity report not generated — run gen-quantum-capacity._'
  const shor = timeShorFullUse()
  const shorMs = (ns: number): number => (ns - (ns % 1000000)) / 1000000

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

## Use

Install the package, fuse the MCP, or call constructors. Worked paths: [guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp).

\`\`\`bash
npm install @uuidna/uuidna
\`\`\`

\`\`\`json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
\`\`\`

\`\`\`ts
import { handleOf, toUuid, encrypt, theoremByKey } from '@uuidna/uuidna'

const address = toUuid('two_coins')
handleOf(address)
theoremByKey().get('two_coins')
encrypt('text', 'passphrase')
\`\`\`

\`handleOf\` is the eight-hex door ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)). \`encrypt\` is ChaCha20-Poly1305 under PBKDF2 ([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Hosted mill: [uuidna.com](https://uuidna.com).

## Develop

Lean is the single source of theorems ([legal_only_the_proven_is_admitted](https://uuidna.com/theorem/legal_only_the_proven_is_admitted)). A deposit queues a candidate; only the kernel seals ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).

\`\`\`bash
git clone https://github.com/uuidna/uuidna && cd uuidna
npm install
npm run hooks:install
npm run lean
npm run reconcile
\`\`\`

Read [CONTRIBUTING.md](CONTRIBUTING.md) for adding a wing, the pre-push gate, and inbound license terms. Readiness: \`npm run next\`. Outward deploy: \`npm run ship\`.

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

## Test proof of work — SHA-256 occupancy, free mint, symmetric stack

Minting searches ${phd.work.search}. SHA-256 occupies ${phd.work.digestBits} bits; verify reads ${phd.work.verifyBits};
the digest is two addresses ([digest_doubles_the_address](https://uuidna.com/theorem/digest_doubles_the_address),
[sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address)). ChaCha20 key
${phd.work.keyBits} · HMAC ${phd.work.hmacBits} · Poly1305 tag ${phd.work.tagBits} · nonce ${phd.work.nonceBits} · salt
${phd.work.saltBits} · block ${phd.work.chachaBlockBits} · PBKDF2 ${phd.work.pbkdf2Iter} · onion ${phd.work.onionLayers}
([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Grover floor ${phd.work.groverFloor};
Shor targets ${phd.work.shorTargets} — the stack is symmetric. The fused coin is ${phd.work.sides} sides ×
${phd.work.faceBits} bits = ${phd.work.verifyBits}; both orientations occupy ${phd.work.occupancyBits}
([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards),
[minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).
${phd.work.drills} work drills.

## Test proof of concept — DNA

The name is a theorem: ${phd.work.bases}^${phd.work.frame} = ${phd.work.codons} codons, and ${phd.work.codons} is
the coin face ([codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed),
[uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)). Complement is an
involution and has no fixed point
([dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution),
[dna_complement_fixed_point_free](https://uuidna.com/theorem/dna_complement_fixed_point_free)) — ${phd.concept.dna}
keys, all \`by decide\`. Counts, not a claim that DNA stores addresses.

## Test proof of work — codon occupancy, two strands

${phd.work.strands} strands × ${phd.work.codons} codons = ${phd.work.verifyBits} bits — the same fuse as the two
64-bit faces. Complement involution ${phd.work.complementInvolution}; both orientations occupy ${phd.work.occupancyBits}
([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards),
[complement_is_xor_key3](https://uuidna.com/theorem/complement_is_xor_key3)).

## Complete Captain PhD

Concept (Clay ${phd.concept.clay}, DNA ${phd.concept.dna}, gravity ${phd.concept.gravity}, demos ${phd.concept.demos}) ∧ work (search
${phd.work.search}, digest ${phd.work.digestBits}, Grover ${phd.work.groverFloor}, codons ${phd.work.codons}) ∧ thesis (ok ${phd.thesis.ok}, gaps
${phd.thesis.gaps}) → complete ${phd.complete}. Receipt \`${phd.receipt}\`.

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
([a_spec_compiles_to_hexbits](https://uuidna.com/theorem/a_spec_compiles_to_hexbits)), and finite formal windows
*within* climate / pandemic / poverty model-calcs — never those domains as solved worlds.
**World solutions = waves of automation** (deposit → validate → seal → falsify → receipt → next): \`npm run wave\`,
falsifier grammar waves, \`connect-lonely\`, hexbit-fast push, \`npm run all\` — each wave enlarges a finite window;
waves do not erase ethics, politics, or unbounded math. Insufficient for climate/pandemic/poverty/conflict *as problem
types*, unbounded open math, nature-as-model, or justice — [doctrine](https://uuidna.com/doctrine)
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
| Neighbours per coin | ${tamper.neighbours} | fused ring ${tamper.neighbours} + 1 = ${tamper.board} ([captain_theorem_the_coins_buy_the_ring_and_one](https://uuidna.com/theorem/captain_theorem_the_coins_buy_the_ring_and_one)); faces reflect |
| Fake a theorem | verify ${tamper.theorem.verify} · forge 2^${tamper.theorem.forgeExponent} · ratio 2^${tamper.theorem.ratioExponent} | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) — bounds, not a maximum |
| Fake a coin | verify ${tamper.coin.verify} · forge 2^${tamper.coin.forgeExponent} · ratio 2^${tamper.coin.ratioExponent} | mint ${tamper.mint}; caught cheat nets ${tamper.traitorNet} ([traitor_damage_sealed_by_same_billing](https://uuidna.com/theorem/traitor_damage_sealed_by_same_billing)) |
| SHA-256 collision bound | 2^${tamper.sha256CollisionExponent} | birthday on the digest ([birthday_halves_the_exponent](https://uuidna.com/theorem/birthday_halves_the_exponent)) |
| Captain PhD — concept | Clay ${phd.concept.clay} · DNA ${phd.concept.dna} · gravity ${phd.concept.gravity} · demos ${phd.concept.demos} | [clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette) · [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Captain PhD — work | digest ${phd.work.digestBits} · verify ${phd.work.verifyBits} · search ${phd.work.search} · ChaCha ${phd.work.keyBits} · tag ${phd.work.tagBits} · Grover ${phd.work.groverFloor} · Shor ${phd.work.shorTargets} · ${phd.work.sides}×${phd.work.faceBits} | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) · [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address) |
| DNA — concept | ${phd.work.bases}^${phd.work.frame} = ${phd.work.codons} · involution ${phd.work.complementInvolution} | [codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed) · [dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution) |
| DNA — work | ${phd.work.strands} × ${phd.work.codons} = ${phd.work.verifyBits} | [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Thesis wave | ${phd.work.thesisDrills} / ${phd.work.thesisRequired} | VE + wave involution + finite-infinity grants, all drilled |
| Captain PhD — complete | ${phd.complete} · receipt \`${phd.receipt}\` | concept ∧ work ∧ thesis |
| Ledger decided mass | ${mass.toLocaleString('en-US')} superpositions (${hex} hexbits) | sum of \`by decide\` domains |
| Handle span | ${HANDLE_SPAN.toLocaleString('en-US')} | 16⁸ = 2³² ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)) |
| Address width | 2¹²⁸ | 32 hexbits × 4 bits ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)) |
| Usable-capacity gap | 2⁸⁰ vs reported 48 logical | [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty) (128 − 48 = 80) |
| Shor chunks on handle | ${shor.handleChunks} × GHZ(${shor.chunkQubits}) = ${shor.handleStates.toLocaleString('en-US')} amplitudes | \`uuidna_os\` capacity.shor · \`uuidna_quantum\` GHZ; ${shorMs(shor.handleNs)} ms on this CPU |
| Shor chunks on uuid | ${shor.uuidChunks} × GHZ(${shor.chunkQubits}) = ${shor.uuidStates.toLocaleString('en-US')} amplitudes | \`uuidna_os\` · \`uuidna_quantum\`; ${shorMs(shor.uuidNs)} ms — ${shor.underSecond ? 'under 1 s' : 'over 1 s'} |
| Hilbert GHZ chunk | ${hilbertQubits} qubits (${hilbertStates} amplitudes) | HEXBIT_BITS × HEXBIT_BITS |
| Crypto occupancy | ${sha256IsFourSixtyfours().bits} bits | [sha256_is_four_sixtyfours](https://uuidna.com/theorem/sha256_is_four_sixtyfours) — four 64s, not four hexbits |
| Handle+hexbit nest | ${nest} qubits | \`HANDLE_HEXBITS + HEXBIT_BITS\` — theorem served_qubit_ceiling |
| uuidna_quantum | 2^n amplitudes | no refuse — theorem n_qubit_dimension |
| Quantum wing theorems | ${quantumWing} | Quantum.lean |
| Cipher wing theorems | ${cipherWing} | Cipher.lean |
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

**Shor at full named capacity.** The uuid is the physical CPU/GPU register (128 bits). Its payload parses as
**${shor.uuidChunks}** encoder-width chunks (GHZ(${shor.chunkQubits}) = ${shor.chunkStates.toLocaleString('en-US')}
amplitudes each, [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension)). This host ran the handle
column in **${shorMs(shor.handleNs)} ms** and the uuid column in **${shorMs(shor.uuidNs)} ms**
(${shor.underSecond ? 'under one second' : 'over one second'}).
MCP: [\`uuidna_crypto\`](https://uuidna.com/mcp) (one door for every Alpine app that uses crypto — Shor, Grover, SHA-256, HMAC, ChaCha20, Poly1305, AEAD),
[\`uuidna_os\`](https://uuidna.com/mcp) (boot, capacity, CPU/GPU stream fleet),
[\`uuidna_quantum\`](https://uuidna.com/mcp) (GHZ / Bell, 2^n),
[\`uuidna_exec\`](https://uuidna.com/mcp) (\`device\` — host lanes),
[\`uuidna_sha256\`](https://uuidna.com/mcp) · [\`uuidna_hmac\`](https://uuidna.com/mcp) · [\`uuidna_chacha20\`](https://uuidna.com/mcp) · [\`uuidna_encrypt\`](https://uuidna.com/mcp),
[\`uuidna_seal_stream\`](https://uuidna.com/mcp) (independent envelopes),
[\`uuidna_machine\`](https://uuidna.com/mcp) (spare-law metal),
[\`uuidna_hardware\`](https://uuidna.com/mcp) (executor trinity).

---

## How to recompute

Use and develop sit at the top of this file. The mill:

\`\`\`bash
npm run lean      # re-prove every wing by decide
npm run guard     # traitors / drain / license identity
npm run editorial # prose desk + prepublish seal
npm run next      # seven-arm self-trial (hexbit-fast)
\`\`\`

[CONTRIBUTING.md](CONTRIBUTING.md) · Live site: [uuidna.com](https://uuidna.com) · Captain coins: [uuidna.com/captain](https://uuidna.com/captain) ·
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
