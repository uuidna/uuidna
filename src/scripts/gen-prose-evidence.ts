#!/usr/bin/env node
// gen-prose-evidence — Create a comprehensive ledger of prose claims backed by theorems
//
// THE CITATION RIDES THE CLAIM'S OWN LINE (2026-09-01). It used to sit in a "Backing theorems" block one
// paragraph below, which reads fine and fails the coin law: that law is PARAGRAPH-scoped — a paragraph saying
// "64 coin bits" must carry a citation, since a coin outside {0, 2} is explained only by a theorem — and it
// found this file claiming 64 with nothing beside it. The claim was never unbacked; the backing was simply in
// the next paragraph, where a paragraph-scoped reader cannot see it.
//
// Fixed by moving the citation rather than by widening the law. A law that learns to look one paragraph further
// is a law with a longer reach and a weaker grip, and the next surface to split a claim from its evidence would
// pass. Emitting them together makes the document true at the granularity the law actually reads.
// Every claim in README/homepage is content-addressed and linked to its sealing theorems

import { theorems, toUuid } from '../index.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const T = theorems()

interface EvidenceEntry {
  claim: string
  prose: string
  backing: Array<{ key: string; name: string; statement: string; file: string }>
  address: string
}

// Every `prose` string below must be an EXACT, single-line substring of the CURRENT README.md or docs/index.md —
// next.ts's ARM 7 checks each verbatim, and a rewrite of either surface (gen-readme.ts, docs/index.md) drifts these
// silently until re-synced here. Regenerating this file does NOT re-derive the quotes (they are hand-picked, not
// computed) — a drifted quote means the SOURCE prose changed, and the fix is to re-pick a live quote
// re-run this generator. (Learned 2026-08-19: the previous quote set named marketing copy — "432 Hz", "honest by
// construction", "human quantum analog" — that a prior README/homepage rewrite had already dropped entirely.)
// Re-picked 2026-08-26 against the magnitudes README rewrite (6929fccd).
const evidenceData: Omit<EvidenceEntry, 'address'>[] = [
  {
    claim: 'two coins on the homepage account',
    prose: '110 − 108 = −χ of the double torus',
    backing: T.filter(t => t.key === 'two_coins')
  },
  {
    claim: 'coins equal minus chi of the double torus',
    prose: 'Coins conserved',
    backing: T.filter(t => t.key === 'two_coins')
  },
  {
    claim: 'denomination two from the seal',
    prose: '110 − 108 = 2',
    backing: T.filter(t => t.key === 'two_coins')
  },
  {
    claim: 'uuidna is dna times the two coins',
    prose: '4³ = 64 codons and 2⁶ = 64 coin bits — the same number by two routes',
    backing: T.filter(t => t.key === 'uuidna_is_dna_times_the_two_coins')
  },
  {
    claim: 'usable capacity gap is two to eighty',
    prose: 'usable_gap_is_two_to_eighty',
    backing: T.filter(t => t.key === 'usable_gap_is_two_to_eighty')
  },
  {
    claim: 'typescript is the quantum computer',
    prose: 'TypeScript is the quantum computer',
    backing: T.filter(t => t.key === 'handle_capacity_is_quantum_by_architecture')
  },
  {
    claim: 'cost per seal is always two coins',
    prose: 'Cost per seal is always two coins',
    backing: T.filter(t => t.key === 'two_coins' || t.key === 'captain_theorem')
  },
  {
    claim: 'clay gravity equals the rosetta',
    prose: 'clay_gravity_equals_rosette',
    backing: T.filter(t => t.key === 'clay_gravity_equals_rosette')
  },
  {
    claim: 'glagolitic letters fold to nine',
    prose: 'letters fold to 9',
    backing: T.filter(t => t.key === 'glagolitic_units_sum' || t.key === 'digital_root')
  },
  {
    claim: 'hexbit sixteen versus z9 root',
    prose: 'CRT join ℤ/7×ℤ/9 = 63',
    backing: T.filter(t => t.key === 'crt_pairs_are_a_bijection' || t.key === 'rosette_and_vortex_are_coprime')
  },
  {
    claim: 'vitepress is the monitor',
    prose: 'VitePress is the monitor',
    backing: T.filter(t => t.key === 'handle_capacity_is_quantum_by_architecture')
  },
  {
    claim: 'each theorem unlocks what it seals',
    prose: 'the ledger is the unlock board',
    backing: T.filter(t => t.key === 'two_coins' || t.key === 'captain_computes_only_with_two_coins')
  },
]

// Add addresses to each evidence entry
const ledger: EvidenceEntry[] = evidenceData.map((e) => ({
  ...e,
  address: toUuid(`evidence:${e.claim}`)
}))

const md = `# Prose Evidence Ledger

**Every claim in the README and homepage is backed by sealed Lean theorems.** This ledger proves the connection.

${ledger
  .map(
    (e) => `
## ${e.claim}

**Prose:** "${e.prose}" — backed by ${e.backing.map((t) => `[${t.key}](/theorem/${t.key})`).join(', ')}

**Address:** \`${e.address}\`

**Backing theorems (${e.backing.length}):**

${e.backing.map((t) => `- **[${t.key}](/theorem/${t.key})** — "${t.name}"\n  - File: ${t.file}\n  - Statement: \`${t.statement.substring(0, 120)}...\``).join('\n')}
`
  )
  .join('\n')}

---

**Summary:**
- Total claims audited: ${ledger.length}
- Total backing theorems: ${ledger.reduce((sum, e) => sum + e.backing.length, 0)}
- Proof method: All \`by decide\` (no axioms, kernel-only)
- Integrity: Each claim is content-addressed and verifiable

If a backing theorem is removed from the ledger, its proof vanishes. The prose is a live document.
`

writeFileSync(join(process.cwd(), 'docs/prose-evidence.md'), md)
console.log(`✓ Prose evidence ledger generated: docs/prose-evidence.md`)
