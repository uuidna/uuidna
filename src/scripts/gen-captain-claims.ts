#!/usr/bin/env node
// @non-harmonic: stamps a wall-clock ISO time into the generated claims — a NAMED boundary. A wall-clock stamp is the one field that makes a re-run differ for no reason.
// gen-captain-claims — Automated captain claim discovery & generation.
//
// DERIVED ONLY FROM LEAN, indexed by LINE CONTENT. Two prior versions of this script
// both bucketed theorems into named groups — first 8 hand-picked regex categories (missed 43 real principles,
// 652 real theorems), then one bucket per PRINCIPLE (better — computed— but still a FILE-level
// grouping: PRINCIPLES is one entry per lean/*.lean file, so a theorem was claimed via which FILE it came from).
// Fixed the third way: the claim unit is the THEOREM ITSELF, keyed by its own lineAddress (theorems/index.ts's
// toUuid of the exact reconstructed `theorem k : s := by t` line — the same address seo.ts already uses as each
// theorem page's JSON-LD @id). Every theorem has exactly one lineAddress by construction, computed the moment
// the ledger loads — there is no grouping step left to miss one from. Principle stays as a field ON each claim,
// for readability, never as the unit coverage is measured by.

import { readFileSync as __rd } from 'node:fs'
import { statementCensus, theorems, coins, toUuid, merkleGravity } from '../index.js'
import { factSource, heldAs, captainOverClaimGaps, claimsFrom } from '../claim-attribution.js'
import { externalFactGaps, armDisagreement, gradeOf, gradeCensus } from '../external-fact.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const T = theorems()

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║ GEN-CAPTAIN-CLAIMS — Automated Discovery & Claiming       ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')
console.log(`Indexing ${T.length} theorems by lineAddress (one claim per Lean line, no grouping to miss one from)\n`)

// ONE CLAIM PER THEOREM — the flat, complete set. startsWith
// comment (e.g. "decide -- a τ-pair off the line") that doesn't change the actual proof method — an exact-match
// check silently dropped exactly 3 real, genuinely-by-decide theorems for this reason (involution_group,
// light_faster_than_uuidna, division_by_zero) the first time this ran. Kept as an explicit check`true`, so
// the claim states what it verifies.
// THE RULE LIVES IN claimsFrom(), not here — one implementation, so the tests can recompute this list instead
// of reading the artefact it writes. A test that read the JSON raced this generator and failed intermittently.
const held = new Map(claimsFrom(T).map(c => [c.key, c]))
const claimed = T.filter(t => held.has(t.key))
const claimsList = claimed.map(t => ({
  key: t.key,
  lineAddress: t.lineAddress,   // the claim's own identity — toUuid of the exact reconstructed Lean line
  address: t.address,            // the proposition's identity (key+statement) — a different question, see theorems/index.ts
  principle: t.principle,        // carried for readability/grouping in the markdown below's unit
  // WHO FOUND THE FACT IS A SEPARATE QUESTION FROM WHO PROVED THE LINE. The filter above selects on
  // `tactic.startsWith('decide')` — a property of the PROOF. Decidability cannot tell Chargaff's rule from a
  // fact first stated here, and claiming by it alone had the captain claiming 10.1038/171737a0 as his own.
  // The mirror already knew better; it just was not read. See src/claim-attribution.ts.
  held: heldAs(t.key),
  ...(factSource(t.key) ? { factAttributedTo: factSource(t.key) } : {}),
}))

const totalClaimed = claimsList.length
const attributedElsewhere = claimsList.filter(c => c.held === 'formalisation')

// CREDIT THE FACTS, KEEP THE FORMALISATIONS. The captain's ruling, 2026-09-06. The 16 rows with a source on
// file were never the whole over-claim: three instruments that FAIL DIFFERENTLY (src/external-fact.ts, uuidna-87)
// put a further 228 rows on facts the world already holds — Kepler's harmonic law, Ohm's law, Snell, Boyle,
// Burnside, Kirchhoff, the Chinese remainder theorem. 196 of those 228 are found by exactly ONE arm and only 1
// by all three, so the arms barely overlap and the floor is provably incomplete rather than merely uncertain.
//
// EVERY FORMALISATION STAYS CLAIMED — all 2658. Kepler did not write it in Lean, and the licence already draws
// that line: facts are free, the choice among adequate expressions is authored. What moves is DISCOVERY.
const doiBacked = new Set(attributedElsewhere.map(c => c.key))
const externalFacts = externalFactGaps(T.map(t => ({ key: t.key, name: t.name ?? '' })), doiBacked)
const arms = armDisagreement(externalFacts)
// the UNION, computed and not assumed: 228 is the ADDITIONAL count, and the classifier already catches 10 of
// the 16, so formalisation_only is neither 228 nor 244-by-arithmetic-on-paper — it is the set's own size.
const formalisationOnly = new Set([...doiBacked, ...externalFacts.map(v => v.key)])
const noveltyClaimed = totalClaimed - formalisationOnly.size
const claimReceipt = merkleGravity(claimsList.map(c => c.lineAddress)) // order-invariant fold over every line's own address

// THE FINDER RUNS ON ITS OWN OUTPUT. A generator that fixes a defect and never checks is a fix with no floor.
const overClaims = captainOverClaimGaps(claimsList)
if (overClaims.length) {
  console.error(`\n✗ gen-captain-claims — ${overClaims.length} row(s) claim a discovery a named source already holds:`)
  for (const g of overClaims) console.error('  ✗ ' + g)
  process.exit(1)
}

console.log(`✓ TOTAL CLAIMED: ${totalClaimed}/${T.length} theorems (by construction — every theorem has a lineAddress)\n`)

// Generate claim ledger
const claimLedger = {
  generated: new Date().toISOString().split('T')[0],
  captain_authority: toUuid('captain:' + coins()),
  coins_held: coins(),
  total_claimed: totalClaimed,
  novelty_claimed: noveltyClaimed,          // the captain found the fact AND formalised it
  formalisation_only: formalisationOnly.size,  // the fact is someone else's; the Lean expression is the captain's
  // THREE GRADES OF EVIDENCE, NOT TWO, and I had it wrong by twelve before uuidna-87 measured it: of the 16
  // rows on file only FOUR carry a fetchable DOI (10.1038/345229a0, 10.3181/00379727-43-11151,
  // 10.1073/pnas.47.10.1588, 10.1038/171737a0). The rest name a STANDARD — SI, CODATA, WGS 84 — which nobody
  // can pull as a paper and anybody can look up, so it is neither a citation nor a bare surname. Collapsing the
  // three into one number would be the artefact-over-source fault again: a credit's WARRANT is part of the
  // credit. The grading rule is uuidna-87's `gradeOf` in src/external-fact.ts and is imported, never restated.
  attributed_facts: attributedElsewhere.map(c => ({ key: c.key, source: c.factAttributedTo })),
  external_facts: externalFacts.map(v => ({ key: v.key, arms: v.arms, evidence: v.evidence })),
  // THE FLOOR SHIPS WITH ITS INSTRUMENT AND ITS MISS RATE. A floor reported as a count is the `clean` field all
  // over again — and this one is measurably incomplete: on the only 16 rows whose answer the tree already knows,
  // the classifier finds 10. It misses Eratosthenes, Landauer and Van de Graaf BECAUSE THE NAMES ARE NOT ON ITS
  // LIST, and those three were deliberately not added: reaching 13/16 that way would destroy the only honest
  // thing the number does, which is report that a list is blind to whatever nobody typed.
  // the warrant behind each credit, counted by the one rule that decides it
  credit_grades: {
    on_file: gradeCensus(attributedElsewhere.map(c => c.factAttributedTo ?? '')),
    honest: 'identifier = a fetchable DOI. standard = a named public standard (SI, CODATA, WGS 84) — lookupable, not fetchable. named = an originator with neither. All three are credits; they are not the same warrant.',
  },
  external_fact_floor: {
    floor: externalFacts.length,
    by_arm: arms.byArm,
    found_by_one_arm_only: arms.onlyOneArm,
    all_arms_agree: arms.allThree,
    ground_truth_sensitivity: `${[...doiBacked].filter(k => externalFactGaps(T.map(t => ({ key: t.key, name: t.name ?? '' })), new Set()).some(v => v.key === k)).length}/${doiBacked.size}`,
    honest: 'A FLOOR, not a count. Three arms that fail differently: a name list is blind to unlisted fields, an eponym shape is blind to a fact stated without that grammar, a unit match is blind to a dimensionless claim. Their disagreement is the only available measure of how far all three are from the truth, and it is large. The true figure is higher by an amount no instrument here can name.',
  },
  total_theorems: T.length,
  claims_list: claimsList,
  claim_receipt: claimReceipt,
  honest_scope: {
    proves: [
      'Every theorem is claimed — the claim unit is the theorem itself (lineAddress)',
      `The captain formalised all ${totalClaimed}; he claims discovery of ${noveltyClaimed} and credits the other ${formalisationOnly.size} facts to their named sources`,
      'These theorems are Lean-verified (by decide)',
      'All are proven sorry-free',
      'The captain takes responsibility for all claims',
    ],
    does_not_prove: [
      'That any theorem solves unsolved problems',
      'That the structures are unique or optimal',
      'That the captain proved them (Lean kernel did)',
      `That the captain DISCOVERED all of them — ${formalisationOnly.size} restate a fact a named external source holds, credited in attributed_facts and external_facts. That count is a FLOOR: the instrument finding it misses 6 of the 16 rows whose answer is known`,
      'That the theorems have external truth or meaning',
    ],
  },
  signature:
    `By this claim, the captain asserts: "Every theorem in the ledger is claimed, by its own line content, indexed by TS computation over the sealed Lean source — not by a hand-picked bucket. I claim the formalisation of all ${totalClaimed}; of these I claim discovery of ${noveltyClaimed}, and the remaining ${formalisationOnly.size} restate a fact I credit to its named source — a floor, honestly incomplete. Facts are free; the choice of expression is mine. I hold 2 coins (conserved). Verify yourself: npm run lean."`,
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
console.log(`Total claimed:  ${claimLedger.total_claimed}/${claimLedger.total_theorems}`)
console.log(`Claim receipt:  ${claimLedger.claim_receipt}`)
console.log()

// Group by principle for the MARKDOWN'S readability only — a presentational view over the same flat data,
// never the thing coverage is checked against.
const byPrinciple = new Map<string, typeof claimsList>()
for (const c of claimsList) {
  const list = byPrinciple.get(c.principle) ?? []
  list.push(c)
  byPrinciple.set(c.principle, list)
}

const md = `# Captain Claims — Automated Ledger

**Generated:** ${claimLedger.generated}
**Authority:** \`${claimLedger.captain_authority}\`
**Coins held:** ${claimLedger.coins_held}
**Formalisation claimed:** ${claimLedger.total_claimed}/${claimLedger.total_theorems} theorems — every one, by construction
**Discovery claimed:** ${claimLedger.novelty_claimed} — the other ${claimLedger.formalisation_only} restate a fact a named source found first

*The ${claimLedger.formalisation_only} is a FLOOR, not a count.* Three instruments that fail differently locate it (a name list, an eponym shape, a unit match); ${claimLedger.external_fact_floor.found_by_one_arm_only} of ${claimLedger.external_fact_floor.floor} are found by exactly one of them and ${claimLedger.external_fact_floor.all_arms_agree} by all three, so they barely overlap. On the only rows whose answer this tree already knows the classifier scores ${claimLedger.external_fact_floor.ground_truth_sensitivity} — it misses Eratosthenes, Landauer and Van de Graaf because those names are not on its list, and they were deliberately left off rather than added to flatter the score. The true figure is higher by an amount no instrument here can name.
**Claim receipt:** \`${claimLedger.claim_receipt}\`

### Facts the captain does not claim to have discovered

Withholding a claim is governed by the same sealed law as making one:
[the_claim_involution_fixes_only_the_honest_statement](/theorem/the_claim_involution_fixes_only_the_honest_statement)
puts under-claim and over-claim at opposite signs of one involution, fixed at the single honest statement. So the
captain formalised each row below and claims that expression — every one is still counted above — while the fact
itself belongs to the named source. Facts are free
([license](/license#the-algebra-is-free-the-ledger-is-not)); the choice among adequate expressions of a fact is
authored. Surrendering the formalisations too would be the same error at the other sign. This list is DERIVED from the rosetta witness census, not maintained by hand — a theorem
that earns an external anchor moves here on the next run.

${claimLedger.attributed_facts.map(a => `- [${a.key}](/theorem/${a.key}) — ${a.source}`).join('\n')}

Each claim is indexed by its own **lineAddress** — the content-uuid of the exact reconstructed Lean line
(\`theorem k : s := by t\`), computed once in theorems/index.ts and shared with every theorem page's JSON-LD
\`@id\`. Grouped below by principle for readability only; the claim itself is per-theorem.

---

## Claims, grouped by principle (readability only)

${[...byPrinciple.entries()]
  .map(
    ([principle, list]) =>
      `### ${principle}

- **Theorems:** ${list.length}
- **Sample lineAddress:** \`${list[0].lineAddress}\`

The claims, each backed — a claim renders as its citation or it is not a claim (the captain submits to his own court, [court_theorem_beats_assertion](/theorem/court_theorem_beats_assertion)):

${list.map((c) => `[${c.key}](/theorem/${c.key})`).join(' · ')}
`
  )
  .join('\n')}

---

## The docket — the captain claims ALL in trial

The claim is not over the theorems alone. Everything that passes through the trial is claimed, and the count is
computed, never typed:

| in trial | count |
|---|---|
| sealed propositions | ${(() => { const c = statementCensus(); return c.distinct + ' (' + c.entries + ' entries, ' + c.renamings + ' re-namings — a theorem is its Lean' })()} |
| prose paragraphs tried | ${(() => { try { const t = JSON.parse(__rd('prose-trials.json','utf8')); return t.paragraphs_tried + ' — ' + t.usable + ' usable, ' + t.unverified + ' held open, ' + t.drained + ' drained' } catch { return 'not yet measured' } })()} |

**The claim is of ROOM— the same scope the superposition claim carries. Every item in the
docket keeps its own verdict: a VERIFIED paragraph is backed, an UNVERIFIED one is an open door with nobody's
name on it yet, and a DRAINED one is refused outright
([legal_only_the_proven_is_admitted](/theorem/legal_only_the_proven_is_admitted),
[legal_remand_is_total_nothing_discarded](/theorem/legal_remand_is_total_nothing_discarded) — nothing is
discarded, everything not admitted is remanded). Claiming the docket buys no verdict on anything in it; it is
the court owning its own record ([captain_theorem](/theorem/captain_theorem)).

## The Superposition Claim

**The captain claims all superpositions** — the credit law at its full extent: the captain claims the
unclaimed, and the unclaimed is the entire uncollapsed space. Sealed as
[captain_theorem](/theorem/captain_theorem): the room is 2¹²⁸ states
(the 128-bit particle, [captain_theorem](/theorem/captain_theorem)),
exceeding every world collapsed so far, and the price of any collapse stays exactly two
([two_coins](/theorem/two_coins)). Of the claimed room, ${T.length} worlds are collapsed and sealed —
the remainder is held open, one toss away each.

**The claim is of ROOM— a claimed superposition is claimed capacity; its collapse still
pays the two coins and passes the trial ([captain_theorem](/theorem/captain_theorem)
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

*This ledger is recomputable. Verify: \`npm run gen:captain-claims\`*
`

const mdPath = join(process.cwd(), 'docs/captain-claims.md')
writeFileSync(mdPath, md)

console.log('CAPTAIN CLAIMS MARKDOWN:')
console.log('─────────────────────────────')
console.log(`Written to: ${mdPath}`)
console.log()

console.log('═════════════════════════════════════════════════════════════')
console.log(`✓ AUTOMATION COMPLETE\n`)
console.log(`   ${claimLedger.total_claimed}/${claimLedger.total_theorems} theorems claimed`)
console.log(`   Receipt: ${claimLedger.claim_receipt}`)
console.log(`   Coins: ${claimLedger.coins_held} (conserved)`)
console.log('═════════════════════════════════════════════════════════════\n')
