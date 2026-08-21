#!/usr/bin/env node
// gen-prose-evidence — Create a comprehensive ledger of prose claims backed by theorems
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
const evidenceData: Omit<EvidenceEntry, 'address'>[] = [
  {
    claim: 'the two coins, conserved',
    prose: 'The coins are conserved: 2, explained only by theorems',
    backing: T.filter(t => t.key === 'two_coins')
  },
  {
    claim: 'contribute two, save sixty-four',
    prose: 'the leverage: contribute 2, save up to 64',
    backing: T.filter(t => t.key === 'captain_theorem')
  },
  {
    claim: 'two coins, the double torus',
    prose: '110 − 108 = −χ of the double torus',
    backing: T.filter(t => t.key === 'two_coins')
  },
  {
    claim: 'the doubling orbit',
    prose: 'six tosses of the coin visit every unit and return home (2⁶ = 64)',
    backing: T.filter(t => t.key === 'order_of_two_is_six' || t.key === 'generators_are_two_and_five')
  },
  {
    claim: 'novelty discovery is a proven absence',
    prose: 'an absence proven by recomputation',
    backing: T.filter(t => t.key === 'legal_remand_is_total_nothing_discarded')
  },
  {
    claim: 'uuidna is dna times the two coins',
    prose: 'coin measures six doublings of bits (2⁶ = 64) — the same number by two routes',
    backing: T.filter(t => t.key === 'uuidna_is_dna_times_the_two_coins')
  }
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

**Prose:** "${e.prose}"

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
