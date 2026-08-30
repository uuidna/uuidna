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
import { SITE } from '../site/index.js'

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
  const capacityRef = capacityMd.replace(/^## Quantum capacity/m, '### Quantum capacity')

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

## Contents

Typography graph — heading depth is document depth (school-paths law).

| Depth | Part | Section |
| ---: | --- | --- |
| 1 | **Hero** | [Abstract](#abstract) — tagline, ledger, name theorem |
| 1 | **Thesis** | [Thesis](#thesis) — Captain PhD seal |
| 2 | ↳ concept | [Proof of concept](#proof-of-concept) — Clay · DNA |
| 2 | ↳ work | [Proof of work](#proof-of-work) — crypto stack · codon occupancy |
| 2 | ↳ geometry | [Geometry](#geometry) — rosette · hexbit |
| 1 | **Use** | [Use](#use) — install · MCP · security ladder |
| 2 | ↳ channel | [UUID channel](#uuid-channel) — wire format |
| 1 | **Develop** | [Develop](#develop) — clone · lean · guard · monitor |
| 2 | ↳ monitor | [Compute · monitor](#compute--monitor--hexbit-fast--handles--deposit) |
| 1 | **Reference** | [Reference](#reference) — magnitudes · gravity · capacity · handle · license |

---

## Abstract

> **${SITE.tagline}.** Two coins conserved; cite by DOI-class handle.

Every proof \`by decide\`, sorry-free, no Mathlib, axiom-free against the bare leanprover/lean4 kernel. TypeScript is the quantum computer (quantum by *architecture*); VitePress is the monitor. Recompute: \`npm run lean\`.

**The name is a theorem.** \`uuid\` + \`dna\`: 4³ = 64 codons and 2⁶ = 64 coin bits — the same number by two routes — fused as 128 = 2·64 ([uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)).

---

## Thesis

> Captain PhD — concept (Clay ${phd.concept.clay}, DNA ${phd.concept.dna}, gravity ${phd.concept.gravity}, demos ${phd.concept.demos}) ∧ work (search ${phd.work.search}, digest ${phd.work.digestBits}, Grover ${phd.work.groverFloor}, codons ${phd.work.codons}) ∧ thesis (ok ${phd.thesis.ok}, gaps ${phd.thesis.gaps}) → **complete ${phd.complete}**. Thesis wave ${phd.work.thesisDrills} / ${phd.work.thesisRequired}. Receipt \`${phd.receipt}\`.

### Proof of concept

#### Clay

Seven finite instances in [lean/Clay.lean](lean/Clay.lean), each a computational claim proven \`by decide\`. Prior art (initial clay σ-involution): DOI [${CLAY_INVOLUTION_DOI}](${CLAY_INVOLUTION_DOI_URL}) ([Zenodo record](${CLAY_INVOLUTION_RECORD_URL})) credited first; captain next. Live: [uuidna.com/articles/clay](https://uuidna.com/articles/clay). Clay gravity equals the rosetta at full capacity ([clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette)): seven ℤ/7 rays ([z7rays_seven](https://uuidna.com/theorem/z7rays_seven)), pairs 21 / quantum 42, three-sevens 21, rosette doubling 2·64 = 128 ([rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins)).

#### DNA

${phd.work.bases}^${phd.work.frame} = ${phd.work.codons} codons = coin face ([codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed), [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)). Complement involution, no fixed point — ${phd.concept.dna} keys ([dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution), [dna_complement_fixed_point_free](https://uuidna.com/theorem/dna_complement_fixed_point_free)). Counts, not a claim that DNA stores addresses.

### Proof of work

#### Crypto stack

Mint searches ${phd.work.search}. SHA-256 ${phd.work.digestBits} bits; verify ${phd.work.verifyBits}; digest is two addresses ([digest_doubles_the_address](https://uuidna.com/theorem/digest_doubles_the_address), [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address)). ChaCha20 ${phd.work.keyBits} · HMAC ${phd.work.hmacBits} · Poly1305 ${phd.work.tagBits} · PBKDF2 ${phd.work.pbkdf2Iter} · onion ${phd.work.onionLayers} ([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Grover floor ${phd.work.groverFloor}; Shor targets ${phd.work.shorTargets} — symmetric stack. Fused coin ${phd.work.sides}×${phd.work.faceBits} = ${phd.work.verifyBits}; both orientations ${phd.work.occupancyBits} ([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards), [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)). ${phd.work.drills} work drills.

#### Codon occupancy

${phd.work.strands} strands × ${phd.work.codons} codons = ${phd.work.verifyBits} bits — the same fuse as the two 64-bit faces. Complement involution ${phd.work.complementInvolution}; both orientations ${phd.work.occupancyBits} ([complement_is_xor_key3](https://uuidna.com/theorem/complement_is_xor_key3)).

### Geometry

- **Pliska rosette (ℤ/7):** seven rays, units sum 21, directed quantum 42, three-sevens 21 ([z7rays_seven](https://uuidna.com/theorem/z7rays_seven), [rosette_quantum_fortytwo](https://uuidna.com/theorem/rosette_quantum_fortytwo)). Live: [uuidna.com/rosetta](https://uuidna.com/rosetta).
- **Glagolitic (ℤ/9):** letters fold to 9, digital root 9, vortex orbit 1→2→4→8→7→5 ([glagolitic_units](https://uuidna.com/theorem/glagolitic_units), [vortex_orbit](https://uuidna.com/theorem/vortex_orbit)). Hypothesis: [uuidna.com/rosetta-glagolitic](https://uuidna.com/rosetta-glagolitic).
- **Hexbit lattice:** 16 = 2⁴ states per tile; address = 32×4 = 128 = 2⁷ ([the_page_admits_sixteen](https://uuidna.com/theorem/the_page_admits_sixteen), [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)). ℤ/9 root fold ≠ 2¹²⁸ address fold ([fold_compresses_without_bound_and_never_recovers](https://uuidna.com/theorem/fold_compresses_without_bound_and_never_recovers)). CRT join ℤ/7×ℤ/9 = 63 ([crt_pairs_are_a_bijection](https://uuidna.com/theorem/crt_pairs_are_a_bijection)).

---

## Use

Install the package, fuse the MCP, or call constructors. Worked paths: [guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp).

### Install

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

### Quick reference

| Goal | Entry |
| --- | --- |
| Address from text | \`toUuid('…')\` · door \`handleOf(addr)\` |
| Encrypt / seal | \`encrypt(text, passphrase)\` · \`sealStream\` |
| Theorem lookup | \`theoremByKey().get('two_coins')\` |
| UUID wire slice | \`uuidChannel(addr)\` · [layout_groups_thirtytwo](https://uuidna.com/theorem/layout_groups_thirtytwo) |
| MCP (stdio) | \`npx @uuidna/uuidna\` |
| Hosted MCP | [uuidna.com/mcp](https://uuidna.com/mcp) |
| Docs site | \`npm run docs:dev\` |
| Re-prove ledger | \`npm run lean\` |
| Pre-push gate | \`npm run guard\` |
| Release trial | \`npm run next\` |

| MCP tool | Role |
| --- | --- |
| [\`uuidna_os\`](https://uuidna.com/mcp) | boot, capacity, CPU/GPU stream |
| [\`uuidna_crypto\`](https://uuidna.com/mcp) | Shor, Grover, SHA-256, HMAC, ChaCha20, AEAD |
| [\`uuidna_coins\`](https://uuidna.com/mcp) | supply + tamper ladder |
| [\`uuidna_quantum\`](https://uuidna.com/mcp) | GHZ / Bell, 2ⁿ amplitudes |
| [\`uuidna_exec\`](https://uuidna.com/mcp) | host lanes (\`device\`) |
| [\`uuidna_encrypt\`](https://uuidna.com/mcp) · [\`uuidna_seal_stream\`](https://uuidna.com/mcp) | independent envelopes |

### Security ladder

handle ⊂ coin ⊂ uuid — ${tamper.handlesPerCoin} handles per coin, ${tamper.handlesPerUuid} handle quarters per uuid ([handle_carries_hexbits_and_coins](https://uuidna.com/theorem/handle_carries_hexbits_and_coins), [handle_string_spans_the_quarter](https://uuidna.com/theorem/handle_string_spans_the_quarter)).

Mint is free; verify is one forward recompute ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not), [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)). Forging must close the whole graph — content-address, both 64-bit faces, ${tamper.coin.neighbourWitnesses} neighbour witnesses + ${tamper.coin.closure} closure per face, reflecting boards, handle quarters, ${tamper.locateLegs} rosetta locate legs — 2^${tamper.theorem.forgeWithWitnessesExponent} at uuid ([captain_theorem](https://uuidna.com/theorem/captain_theorem)). No field patches; spin fixed-point or the gate rejects.

| Tier | Verify (bits) | Forge with witnesses |
| --- | ---: | --- |
| Handle (door) | ${tamper.handle.verify} | 2^${tamper.handle.forgeWithWitnessesExponent} |
| Coin (one face) | ${tamper.coin.verify} | 2^${tamper.coin.forgeWithWitnessesExponent} (${tamper.coin.neighbourWitnesses}+${tamper.coin.closure}) |
| Theorem (uuid) | ${tamper.theorem.verify} | 2^${tamper.theorem.forgeWithWitnessesExponent} (${tamper.theorem.neighbourWitnesses}+${tamper.theorem.closure}) |

[guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp) · [OS](https://uuidna.com/os) · [School](https://uuidna.com/school) · [doctrine](https://uuidna.com/doctrine)

### UUID channel

The printed uuid is the wire format — RFC 9562 groups sealed as [layout_groups_thirtytwo](https://uuidna.com/theorem/layout_groups_thirtytwo) and [groups_are_four_apart](https://uuidna.com/theorem/groups_are_four_apart). TypeScript reads them through \`uuidChannel\`, \`channelAudit\`, and \`monographFaceOf\` (\`src/hexagram.ts\`).

| Slice | Width | Constructor | What moves |
| --- | ---: | --- | --- |
| Handle | 8 hex | [handle_is_the_first_group](https://uuidna.com/theorem/handle_is_the_first_group) · \`handleOf\` | 3D door (residue · ray · wave); one coin of the double torus |
| Hex trinities | 3×4 hex | [message_cap_is_four_hexbits](https://uuidna.com/theorem/message_cap_is_four_hexbits) · \`executableStates\` | 7D action — three caps = 12 hexbits of program |
| Tail | 12 hex | \`tailStates\` · \`encrypt\` / \`sealStream\` | sealed micro-message envelope in the uuid chain |

Payload store is lazy — route, verify, aura, and secure messaging need only the address; prose body loads when required ([payload_carries_the_strand](https://uuidna.com/theorem/payload_carries_the_strand)). Full channel: [uuidna.com/quantum#uuid-channel](https://uuidna.com/quantum#uuid-channel).

---

## Develop

Lean is the single source of theorems ([legal_only_the_proven_is_admitted](https://uuidna.com/theorem/legal_only_the_proven_is_admitted)). A deposit queues a candidate; only the kernel seals ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).

\`\`\`bash
git clone https://github.com/uuidna/uuidna && cd uuidna
npm install
npm run hooks:install
npm run lean          # re-prove every wing by decide
npm run reconcile
npm run guard         # traitors / drain / license identity
npm run editorial     # prose desk + prepublish seal
npm run next          # seven-arm self-trial (hexbit-fast)
\`\`\`

Read [CONTRIBUTING.md](CONTRIBUTING.md) for adding a wing, the pre-push gate, and inbound license terms. Outward deploy: \`npm run ship\`. Live site: [uuidna.com](https://uuidna.com) · Captain coins: [uuidna.com/captain](https://uuidna.com/captain).

### Compute · monitor · hexbit-fast · handles · deposit

TypeScript is the quantum computer (quantum by *architecture*); VitePress is the monitor — stock chrome, capacity door
[uuidna.com/quantum](https://uuidna.com/quantum) (no per-page QA cards). Push verifies sealed receipts
(\`gate-receipt.json\`, \`usable_gap_is_two_to_eighty\`) — **hexbit-fast**, remeasure off-path.
Permanent citation: \`https://uuidna.com/<handle>\` (8 hex; worker \`HANDLES\` 301 → freeze-map).
Captain coins: \`https://revolut.me/ceccec?note=<referrer>\` (\`encodeURIComponent\` of the page handle door).
**One license** for every publication and Zenodo deposit: **${license}**.

Scope charter — sufficient / insufficient, world solutions as waves: [doctrine](https://uuidna.com/doctrine) (computational claims only; verify ≪ recompute — [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)).

${unlockReadmeBlock()}

---

## Reference

### Magnitudes (computed at generation)

| Measure | Value | Backing |
| --- | ---: | --- |
| Distinct theorems | ${census.distinct.toLocaleString('en-US')} | statement census (a Lean statement sealed under two keys is one theorem) |
| Theorem keys | ${T.length.toLocaleString('en-US')} | \`theorems().length\` |
| Principles / wings | ${principles} / ${wings} | PRINCIPLES + wing ratings |
| Skills | ${skills} | distinct \`skill\` tags |
| Coins per seal | ${coinN} | [two_coins](https://uuidna.com/theorem/two_coins) — 110 − 108 = 2 |
| Neighbours per coin | ${tamper.neighbours} | fused ring ${tamper.neighbours} + 1 = ${tamper.board} ([captain_theorem_the_coins_buy_the_ring_and_one](https://uuidna.com/theorem/captain_theorem_the_coins_buy_the_ring_and_one)); faces reflect |
| Fake a handle | verify ${tamper.handle.verify} · forge 2^${tamper.handle.forgeExponent} · completes 2^${tamper.handle.completionExponent} · with witnesses 2^${tamper.handle.forgeWithWitnessesExponent} | ${tamper.handlesPerUuid} quarters span the uuid ([handle_string_spans_the_quarter](https://uuidna.com/theorem/handle_string_spans_the_quarter)); ${tamper.handle.relatedWitnesses} related handles |
| Fake a coin | verify ${tamper.coin.verify} · forge 2^${tamper.coin.forgeExponent} · with ${tamper.coin.neighbourWitnesses} neighbours + ${tamper.coin.closure} closure = 2^${tamper.coin.forgeWithWitnessesExponent} | ${tamper.handlesPerCoin} handles per coin ([handle_carries_hexbits_and_coins](https://uuidna.com/theorem/handle_carries_hexbits_and_coins)); ${tamper.coin.relatedWitnesses} reflecting face |
| Fake a theorem | verify ${tamper.theorem.verify} · forge 2^${tamper.theorem.forgeExponent} · ratio 2^${tamper.theorem.ratioExponent} · ${tamper.theorem.neighbourWitnesses} neighbour + ${tamper.theorem.closure} coin witnesses + ${tamper.theorem.relatedWitnesses} locate legs = 2^${tamper.theorem.forgeWithWitnessesExponent} | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) · [captain_theorem](https://uuidna.com/theorem/captain_theorem) (${tamper.theorem.neighbourWitnesses}+${tamper.theorem.closure}=${tamper.theorem.forgeWithWitnessesExponent}); mint ${tamper.mint}; caught cheat nets ${tamper.traitorNet} |
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

### Gravity — seven heaviest theorems

A \`by decide\` proof settles every case in its domain at once. Gravity is that coverage in hexbits (4 bits /
tile; a uuid is 32 tiles). Cost per seal is always two coins.

The ledger covers **${mass.toLocaleString('en-US')}** superpositions across **${wings}** wings.

${heaviest}

${capacityRef}

### What a handle spans

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
(${shor.underSecond ? 'under one second' : 'over one second'}). MCP tools: see **Use → Quick reference** above.

### License

**CC BY-NC-ND 4.0** (\`${license}\`) — © ${lf.license.attribution}. Free to read and redistribute **unchanged, with attribution,
non-commercially**; no derivatives. Canonical terms: [${licenseUrl}](${licenseUrl}) · [LICENSE](LICENSE).
The mathematical facts themselves are free for all — facts are not copyrightable; this license covers this
specific expression and record. **One license for every uuidna publication and Zenodo deposit** — no per-publication drift.
`
}

writeFileSync(join(process.cwd(), 'README.md'), generateReadme())
console.log(`✓ Generated README.md (${readFileSync(join(process.cwd(), 'README.md'), 'utf8').length} bytes)`)
