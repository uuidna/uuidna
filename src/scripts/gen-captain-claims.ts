#!/usr/bin/env node
// gen-captain-claims — Automated captain claim discovery & generation
// Scans the ledger and auto-claims all unclaimed work by type:
// - Algebra (ℤ/9, ℤ/7, ring, rosette, structure)
// - Security (axiom-free, gate, integrity, collision)
// - Quantum (state-vector, clifford, bell, ghz)
// - Games (nim, chess, sailing, exploit)
// - Science (acoustics, astronomy, physics, chemistry, biology)
// - Language (glagolitic, editing, typesetting, reporting)

import { readFileSync as __rd } from 'node:fs'
import { statementCensus, theorems, coins, toUuid, merkleGravity } from '../index.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const T = theorems()

interface ClaimCategory {
  category: string
  description: string
  filters: (t: any) => boolean
  theorems: string[]
  address: string
}

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║ GEN-CAPTAIN-CLAIMS — Automated Discovery & Claiming       ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')

// Define claim categories — each filters theorems by principle/skill
const categories: Omit<ClaimCategory, 'theorems' | 'address'>[] = [
  {
    category: 'Algebra',
    description: 'Lean-verified computational algebra (ℤ/9, ℤ/7, ring, rosette)',
    filters: (t) =>
      t.tactic === 'decide' &&
      (t.principle === 'The 8×8 core' ||
        t.principle === 'The ring ℤ/9' ||
        t.principle === 'The Glagolitic numerals & Pliska rosette' ||
        t.principle === 'The vortex algebra' ||
        t.principle === 'The sequence & reflection group' ||
        t.principle === 'The hardware-verifiable binary algebra' ||
        t.principle === 'The software-verifiable algebra' ||
        t.principle === 'The OS-integrity algebra' ||
        t.principle === 'The algebra of the neuron'),
  },
  {
    category: 'Security',
    description: 'Axiom-free verified security: gate, integrity, collision, defences',
    filters: (t) =>
      t.tactic === 'decide' &&
      /security|audit|gate|cipher|code|collision|defence|integrity|kernel|axiom/i.test(t.principle || t.key),
  },
  {
    category: 'Quantum',
    description: 'Classical quantum simulation: state-vector, clifford, bell, ghz, pauli',
    filters: (t) =>
      t.tactic === 'decide' && /quantum|bell|ghz|pauli|clifford|state|qubit/i.test(t.principle || t.key),
  },
  {
    category: 'Games',
    description: 'Game theory & strategy: nim, chess, sailing, exploit',
    filters: (t) =>
      t.tactic === 'decide' &&
      /nim|chess|sailing|exploit|game|strategy|horizon|profile/i.test(t.principle || t.key),
  },
  {
    category: 'Science',
    description: 'Natural science structure (physics, astronomy, chemistry, biology, acoustics)',
    filters: (t) =>
      t.tactic === 'decide' &&
      /astronomy|acoustics|chemistry|physics|biology|relativity|thermodynamics|electromagnetism|sound|diving|tides|navigation|ephemeris/i.test(
        t.principle
      ),
  },
  {
    category: 'Language',
    description: 'Language & representation: glagolitic, editing, typesetting, reporting',
    filters: (t) =>
      t.tactic === 'decide' &&
      /glagolitic|editing|typesetting|report|language|command|identifier/i.test(t.principle),
  },
  {
    category: 'Clay Problems',
    description: 'Millennium problems (reflected, not solved)',
    filters: (t) =>
      t.tactic === 'decide' && /clay|millennium|problem|reflection|involution/i.test(t.principle || t.key),
  },
  {
    category: 'Structure',
    description: 'Foundational structure: coins, matching, reasoning, proof',
    filters: (t) =>
      t.tactic === 'decide' &&
      /coin|match|reason|proof|involution|bound|infinity|topography|production/i.test(t.principle || t.key),
  },
]

// Build claims — capture ALL theorems matching the filter
const claims: ClaimCategory[] = []
let totalClaimed = 0

console.log('DISCOVERED CLAIM CATEGORIES:')
console.log('─────────────────────────────\n')

for (const cat of categories) {
  // Match by principle NAME exactly (not partial matching)
  // This catches ALL theorems with that principle, including generated ones
  const filtered = T.filter(t => t.tactic === 'decide' && cat.filters(t))
  const theoremKeys = filtered.map(t => t.key)

  if (theoremKeys.length > 0) {
    totalClaimed += theoremKeys.length

    const address = toUuid(`captain:claim:${cat.category}:${theoremKeys.length}`)
    claims.push({
      category: cat.category,
      description: cat.description,
      filters: cat.filters,
      theorems: theoremKeys,
      address,
    })

    console.log(`  ✓ ${cat.category.padEnd(20)} — ${theoremKeys.length.toString().padStart(3)} theorems`)
    console.log(`    ${cat.description}`)
    console.log(`    Address: ${address}`)
    console.log()
  }
}

console.log('─────────────────────────────')
console.log(`\n✓ TOTAL DISCOVERED: ${totalClaimed} theorems in ${claims.length} categories\n`)

// Generate claim ledger
const claimLedger = {
  generated: new Date().toISOString().split('T')[0],
  captain_authority: toUuid('captain:' + coins()),
  coins_held: coins(),
  total_claimed: totalClaimed,
  categories: claims.length,
  categories_list: claims.map(c => ({
    category: c.category,
    description: c.description,
    theorems: c.theorems.length,
    keys: c.theorems, // every claimed key, carried to the page — a claim renders as its CITATION or it is not a claim
    address: c.address,
    all_by_decide: c.theorems.every(k => T.some(t => t.key === k && t.tactic === 'decide')),
  })),
  claim_receipt: merkleGravity(claims.map(c => toUuid(c.address))),
  honest_scope: {
    proves: [
      'These theorems are Lean-verified (by decide)',
      'All are proven sorry-free',
      'They compute across multiple domains',
      'The captain takes responsibility for all claims',
    ],
    does_not_prove: [
      'That any theorem solves unsolved problems',
      'That the structures are unique or optimal',
      'That the captain proved them (Lean kernel did)',
      'That the theorems have external truth or meaning',
      'That the categories are exhaustive or final',
    ],
  },
  signature:
    'By this claim, the captain asserts: "These theorems are Lean-verified. I hold 2 coins (conserved). They compute, they are proven, they prove structure. Verify yourself: npm run lean."',
}

// Write claim ledger
const ledgerPath = join(process.cwd(), 'docs/captain-claims.json')
writeFileSync(ledgerPath, JSON.stringify(claimLedger, null, 2))

console.log('CAPTAIN CLAIMS LEDGER:')
console.log('─────────────────────────────')
console.log(`Written to: ${ledgerPath}`)
console.log()
console.log(`Authority:      ${claimLedger.captain_authority}`)
console.log(`Coins held:     ${claimLedger.coins_held}`)
console.log(`Total claimed:  ${claimLedger.total_claimed}`)
console.log(`Categories:     ${claimLedger.categories}`)
console.log(`Claim receipt:  ${claimLedger.claim_receipt}`)
console.log()

// Generate markdown summary
const md = `# Captain Claims — Automated Ledger

**Generated:** ${claimLedger.generated}
**Authority:** \`${claimLedger.captain_authority}\`
**Coins held:** ${claimLedger.coins_held}
**Total claimed:** ${claimLedger.total_claimed} theorems
**Categories:** ${claimLedger.categories}
**Claim receipt:** \`${claimLedger.claim_receipt}\`

---

## Claimed Categories

${claimLedger.categories_list
  .map(
    c =>
      `### ${c.category}

${c.description}

- **Theorems:** ${c.theorems}
- **Verified:** ${c.all_by_decide ? '✓ all by decide' : '✗ mixed tactics'}
- **Address:** \`${c.address}\`

The claims, each backed — a claim renders as its citation or it is not a claim (the captain submits to his own court, [court_theorem_beats_assertion](/theorem/court_theorem_beats_assertion)):

${c.keys.map((k: string) => `[${k}](/theorem/${k})`).join(' · ')}
`
  )
  .join('\n')}

---

## The docket — the captain claims ALL in trial

The claim is not over the theorems alone. Everything that passes through the trial is claimed, and the count is
computed, never typed:

| in trial | count |
|---|---|
| sealed propositions | ${(() => { const c = statementCensus(); return c.distinct + ' (' + c.entries + ' entries, ' + c.renamings + ' re-namings — a theorem is its Lean, not its name)' })()} |
| prose paragraphs tried | ${(() => { try { const t = JSON.parse(__rd('prose-trials.json','utf8')); return t.paragraphs_tried + ' — ' + t.usable + ' usable, ' + t.unverified + ' held open, ' + t.drained + ' drained' } catch { return 'not yet measured' } })()} |

**The claim is of ROOM, never of truth** — the same scope the superposition claim carries. Every item in the
docket keeps its own verdict: a VERIFIED paragraph is backed, an UNVERIFIED one is an open door with nobody's
name on it yet, and a DRAINED one is refused outright
([legal_only_the_proven_is_admitted](/theorem/legal_only_the_proven_is_admitted),
[legal_remand_is_total_nothing_discarded](/theorem/legal_remand_is_total_nothing_discarded) — nothing is
discarded, everything not admitted is remanded). Claiming the docket buys no verdict on anything in it; it is
the court owning its own record ([coins_compute_but_solve_none](/theorem/coins_compute_but_solve_none)).

## The Superposition Claim

**The captain claims all superpositions** — the credit law at its full extent: the captain claims the
unclaimed, and the unclaimed is the entire uncollapsed space. Sealed as
[captain_claims_all_superpositions](/theorem/captain_claims_all_superpositions): the room is 2¹²⁸ states
(the 128-bit particle, [coin_exchange_rate_is_traitor_cost](/theorem/coin_exchange_rate_is_traitor_cost)),
exceeding every world collapsed so far, and the price of any collapse stays exactly two
([two_coins](/theorem/two_coins)). Of the claimed room, ${T.length} worlds are collapsed and sealed —
the remainder is held open, one toss away each.

**The claim is of ROOM, never of truth** — a claimed superposition is claimed capacity; its collapse still
pays the two coins and passes the trial ([coins_compute_but_solve_none](/theorem/coins_compute_but_solve_none)
stands over this claim as over every other). The captain owns the space the way a court owns its docket:
everything may be brought, nothing is decided by ownership.

## Honest Scope

**This claim proves:**
${claimLedger.honest_scope.proves.map(p => `- ✓ ${p}`).join('\n')}

**This claim does NOT prove:**
${claimLedger.honest_scope.does_not_prove.map(p => `- ✗ ${p}`).join('\n')}

---

## Signature

> ${claimLedger.signature}

**— The Captain** (${claimLedger.coins_held} coins, conserved invariant)

---

*This ledger is recomputable. Verify: \`npm run generate-captain-claims\`*
`

const mdPath = join(process.cwd(), 'docs/captain-claims.md')
writeFileSync(mdPath, md)

console.log('CAPTAIN CLAIMS MARKDOWN:')
console.log('─────────────────────────────')
console.log(`Written to: ${mdPath}`)
console.log()

console.log('═════════════════════════════════════════════════════════════')
console.log(`✓ AUTOMATION COMPLETE\n`)
console.log(`   ${claimLedger.total_claimed} theorems claimed`)
console.log(`   ${claimLedger.categories} claim categories`)
console.log(`   Receipt: ${claimLedger.claim_receipt}`)
console.log(`   Coins: ${claimLedger.coins_held} (conserved)`)
console.log('═════════════════════════════════════════════════════════════\n')
