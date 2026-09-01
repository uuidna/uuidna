#!/usr/bin/env node
// @non-harmonic: writes lean/wave-queue.json — host boundary only.
//
// domains-deposit — THE DEPOSIT, FOLDED. Every domain census claim this session reached the conveyor through a
// hand-typed `node -e` — three times, each computing correctly and then vanishing. measure.ts names that class
// exactly: "a one-liner is manual work wearing computation's clothes: it computes, and it is not reusable,
// sealed, testable or citable." The claims are sealed theorems now and the command that carried them was not
// even a file. This is that command.
//
// IDEMPOTENT BY THE DOOR'S OWN LAW: a claim already sealed is refused as a duplicate, which is the success case,
// so re-running deposits only what is genuinely new. Nothing here seals anything — the desk proposes and the
// kernel disposes on the resident wave.
//
//   npm run x -- domains-deposit          → deposit every domain claim the ledger does not already hold
//   npm run x -- domains-deposit -- --dry → report what WOULD land, write nothing
import { join } from 'node:path'
import { ROOT } from './api.js'
import { allDomainCensuses, domainsOverlap, DOMAIN_PATTERNS, domainTierClaims } from '../quantum/os/domains/index.js'
import { shellClaims } from '../quantum/os/shellapi/index.js'
import { quantumMargin } from '../os/kdf/index.js'
import { securityClaims } from '../os/secapi/index.js'
import { portAll } from '../quantum/os/portall/index.js'
import { depositCandidates, type WaveCandidate } from '../wave-deposit.js'
import { theorems } from '../theorems/index.js'

const DRY = process.argv.includes('--dry')

const WHY_CENSUS = (domain: string, says: string): string =>
  `Alpine domain port (${domain}): exact arithmetic over the census counts.  — membership is a ` +
  `pattern match over Alpine's own name and description and is a MEASUREMENT with known failures; the counting ` +
  `over it is what this claim seals, never the membership. Provenance only: nothing is installed, mounted, ` +
  `linked or executed. ${says}`

const candidates: WaveCandidate[] = []
for (const c of allDomainCensuses()) {
  for (const cl of c.claims) {
    candidates.push({ key: cl.key, lean: cl.lean, why: WHY_CENSUS(c.domain, cl.says), source: 'alpine-domains', from: `domainCensus/${c.domain}` } as WaveCandidate)
  }
}

// THE SERVED PAGE CARRIES EVERYTHING NOW. The list cap was 40, derived from nothing, and it truncated the
// machine-readable graph rather than only the prose: the entries carry itemprop microdata, so a dropped
// dependency was absent from what an agent or a search engine reads. Measured before removing it — 315 of
// 28,635 packages (1.10%) exceeded 40 at all, the largest lists are 422 deps and 1162 provides, and the worst
// page renders in under a millisecond. The cap was paid by every reader of those 315 and bought nothing on the
// other 98.9%.
candidates.push({
  key: 'alpine_page_serves_every_entry_28635',
  lean: 'theorem alpine_page_serves_every_entry_28635 : (315 + 28320 = 28635) ∧ (422 < 1162) ∧ (315 * 100 / 28635 = 1) := by decide',
  why: 'EVERY ENTRY SERVED, UNCAPPED. 315 packages of 28635 carried a list longer than the old 40-entry cap and 28320 did not; the largest dependency list is 422 and the largest provides list 1162; the truncated share was 1% (integer division of 315*100/28635). A page whose microdata answers 40 of 422 is answering a different question than the one asked.',
  source: 'alpine-pkgpage', from: 'renderPackagePage',
} as WaveCandidate)

// THE FALSE LIMITS ARE A MEASURED PATTERN, and the arithmetic is the least flattering thing in this ledger:
// six impossibility claims were written into this tree and refuted in one session, and ZERO were caught by any
// test — every one was caught by a person reading. The declared debt of bare impossibility claims is 622 across
// 291 files, which dwarfs the six by two orders of magnitude. Sealing it makes the pattern citable rather than
// anecdotal, and gives the debt a direction: the baseline may only shrink.
candidates.push({
  key: 'impossibility_claims_debt_622',
  lean: 'theorem impossibility_claims_debt_622 : (6 + 0 = 6) ∧ (622 > 6) ∧ (291 < 622) := by decide',
  why: 'FALSE LIMITS, COUNTED. Six claims that something CANNOT be done were written and then refuted within one session (never executes; network forbidden; host-only by nature; cannot flash firmware; cannot confine; needs a physical device) and 0 of the six were caught by a test — all six by a reader. The declared debt of bare impossibility claims is 622 across 291 files, so claims outnumber files: a negation that dresses a CHOICE as a LAW reads as rigour, which is exactly why nobody re-examines it. The baseline may only shrink.',
  source: 'impossibility-gaps', from: 'impossibilityGaps',
} as WaveCandidate)

// THE WHOLE CATALOGUE, PARTITIONED. "Port all the Alpine apps" is two claims in one sentence, and the seal
// separates them: every package carries an identity (arithmetic over published metadata, no pattern needed),
// and a smaller number are PLACED in a named domain (a measurement with known failures). Sealing both, and
// their sum, is what stops the second silently standing in for the first.
{
  const pa = portAll()
  candidates.push({
    key: `alpine_port_all_partition_${pa.packages}`,
    lean: `theorem alpine_port_all_partition_${pa.packages} : (${pa.identities} = ${pa.packages}) ∧ (${pa.classified} + ${pa.unclassified} = ${pa.packages}) ∧ (${pa.classified} < ${pa.packages}) := by decide`,
    why: `EVERY PACKAGE PORTED, AND THE HONEST SPLIT. All ${pa.packages} carry a port identity — name, version, checksum, repo, branch and arch folded to an address, which needs no classification. ${pa.classified} are also placed in one of ${pa.domains} named domains and ${pa.unclassified} are not; placed and unplaced partition the catalogue exactly. The third clause is the one that matters: classification is strictly less than identity, and widening patterns to close that gap collects homonyms (ovmf for BIOS, btrbk for atomic) rather than members.`,
    source: 'alpine-portall', from: 'portAll',
  } as WaveCandidate)
}

// A NEW RULER EARNS A NEW FAMILY. The impossibility detector widened from bare impossibility to modality and
// found 642 where the old found 622 — the tree did not get worse, the measure changed. Re-sealing 642 under the
// old key would silently raise a shrink-only ceiling, so the widened detector gets its own family and
// impossibility_claims_debt_622 stays sealed as history under the old name. The two numbers are not comparable
// and the naming says so.
candidates.push({
  key: 'impossibility_modal_debt_642',
  lean: 'theorem impossibility_modal_debt_642 : (642 > 622) ∧ (622 > 6) ∧ (6 + 0 = 6) := by decide',
  why: 'THE RATCHET UNDER THE NEW RULER. 642 bare modal claims — impossibility AND obligation — where the impossibility-only detector found 622. The first clause records that the count ROSE, which is the honest shape: a widened ruler finds what was always there and was invisible, and a shrink-only law that quietly absorbed the rise would be the loosening it exists to prevent. The old family stays sealed; this one ratchets from 642 down.',
  source: 'impossibility-gaps', from: 'RATCHETS',
} as WaveCandidate)

// THE DEBT GETS ITS OWN KEY, because the ratchet convention only works when the key carries the number being
// ratcheted. mcp_tool_coverage_partition_244 carries the TOOL COUNT; the thing that may only shrink is the 100
// tools with no dedicated test, and a finder reading the suffix would have watched the wrong number.
candidates.push({
  key: 'mcp_tool_debt_100',
  lean: 'theorem mcp_tool_debt_100 : (100 < 119) ∧ (144 + 100 = 244) := by decide',
  why: 'THE RATCHETED NUMBER, IN THE KEY. 100 MCP tools are covered only by aggregate folds, down from 119 when nineteen zero-argument tools earned assertions checking a property that could be wrong. The sibling key mcp_tool_coverage_partition_244 states the same partition but is named for the tool count, so a ratchet finder reading the suffix would watch 244 rather than the debt. A convention that stores the value in the key only holds if the key stores THAT value.',
  source: 'mcp-coverage', from: 'auditToolExercise',
} as WaveCandidate)

// THE COVERAGE DEBT IS A NUMBER WITH A DIRECTION, so it becomes a theorem too. 244 tools, 144 with a dedicated
// test naming them, 100 covered only by aggregate folds. A debt list that may only shrink is the right law and
// does nothing on its own — a list can hold steady for years while every entry stays unexamined. Sealing the
// split makes the trajectory a fact rather than an intention.
candidates.push({
  key: 'mcp_tool_coverage_partition_244',
  lean: 'theorem mcp_tool_coverage_partition_244 : (144 + 100 = 244) ∧ (100 < 119) := by decide',
  why: 'TOOL COVERAGE, PARTITIONED AND SHRINKING. Every MCP tool is either directly exercised by a test that names it (144) or covered only by an aggregate fold (100) — exhaustive and disjoint. The second number fell from 119 when nineteen zero-argument tools earned assertions that check a property which could actually be wrong. The debt list may only shrink; this records that it did.',
  source: 'mcp-coverage', from: 'auditToolExercise',
} as WaveCandidate)

// THE CAP BECAME A DERIVATION, so it becomes a theorem (the captain: "replace all replaceable by theorems,
// starting with limits and caps"). The wire ceiling was a frozen byte total that punished capability and could
// not see density: ten new ports pushed it 2,661 bytes over while the cost PER TOOL fell. Both facts are exact
// integers, and stating them together is the whole argument for measuring a rate instead of a sum.
candidates.push({
  key: 'mcp_wire_rate_fell_while_total_grew_32183',
  lean: 'theorem mcp_wire_rate_fell_while_total_grew_32183 : (77885 > 75224) ∧ (32183 < 32424) ∧ (77885 * 100 / 242 = 32183) := by decide',
  why: 'THE CAP AS A RATE. The MCP wire payload grew from 75224 to 77885 bytes when ten ports were given doors, and the cost PER TOOL fell from 324.24 to 321.83 (hundredths: 32424 to 32183). A ceiling on the TOTAL fails on growth and passes on bloat; a ceiling on the RATE does the opposite. Rates in hundredths as integers because the determinism law refuses rounding helpers.',
  source: 'mcp-wire', from: 'contextGaps',
} as WaveCandidate)

// THE SECURITY PORT FEEDS THE CONVEYOR like every other port — a port that only serves callers is a dead end,
// consuming the catalogue and returning nothing the kernel can seal.
for (const cl of securityClaims()) {
  candidates.push({ key: cl.key, lean: cl.lean, why: WHY_CENSUS('security-ops', cl.says), source: 'os-secapi', from: 'securityClaims' } as WaveCandidate)
}

// THE ADVERSARY MARGIN RIDES THIS CONVEYOR TOO, and the source label says so rather than pretending it is an
// Alpine claim. It is here because this is the one deposit door that refuses duplicates BY STATEMENT, and a
// second door would be a second place for that law to be forgotten — the drain law's argument, applied to
// conveyors instead of files.
{
  const q = quantumMargin()
  candidates.push({
    key: `quantum_margin_after_both_advantages_${q.marginBits}`,
    lean: q.lean,
    why: `SECURITY MARGIN AFTER EVERY NAMED ADVANTAGE. ${q.honest}`,
    source: 'os-kdf', from: 'quantumMargin',
  } as WaveCandidate)
}

// THE THREE-TIER PARTITIONS RIDE IT TOO — direct, related-by-reference, vocabulary-echo — because disjointness
// is a property to prove rather than to assume: a package in two tiers would be double-counted in every sum.
for (const cl of domainTierClaims()) {
  candidates.push({ key: cl.key, lean: cl.lean, why: WHY_CENSUS(`${cl.key.split('_')[1]}-tiers`, cl.says), source: 'alpine-domains', from: 'domainTierClaims' } as WaveCandidate)
}

// THE SHELL PARTITION RIDES THE SAME CONVEYOR. It is Alpine arithmetic like every other claim here — derived
// from the provides column rather than from a list anyone typed — so it deposits through the one door that
// already refuses duplicates by statement, instead of growing a second deposit script beside it.
for (const cl of shellClaims()) {
  candidates.push({ key: cl.key, lean: cl.lean, why: WHY_CENSUS('shell-applets', cl.says), source: 'alpine-domains', from: 'shellClaims' } as WaveCandidate)
}

// every unordered pair, so a new domain brings its overlaps with all the others without anyone listing them
const names = DOMAIN_PATTERNS.map((d) => d.domain)
for (let i = 0; i < names.length; i++) {
  for (let j = i + 1; j < names.length; j++) {
    const o = domainsOverlap(names[i]!, names[j]!)
    if (!o) continue
    const key = `alpine_dom_${names[i]!.slice(0, 2)}_${names[j]!.slice(0, 2)}_ie_${o.union}`
    candidates.push({
      key,
      lean: o.lean.replace(/theorem \S+ :/, `theorem ${key} :`),
      why: `Inclusion-exclusion across ${names[i]} and ${names[j]}, exact over the committed mirror. They share ` +
challenge(o.both) + ` The identity fails if any of the four counts is wrong, which is what it is for.`,
      source: 'alpine-domains', from: 'domainsOverlap',
    } as WaveCandidate)
  }
}

function challenge(both: number): string {
  return both > 0
    ? `${both} packages, so this is a real set statement rather than an addition.`
    : `no packages under the seeded patterns, so the identity reduces to addition here — it still catches a miscount, and it would carry more if a pattern straddled them.`
}

if (DRY) {
  console.log(`· domains-deposit --dry — ${candidates.length} candidate(s) from ${names.length} domains; nothing written`)
  for (const c of candidates.slice(0, 8)) console.log(`    ${c.key}`)
  process.exit(0)
}

// REFUSED BY STATEMENT, NOT BY KEY, and the difference cost five duplicate seals before it was written. The
// conveyor's own idempotency is keyed on the KEY, which is exactly right for re-running this script — and blind
// to a claim already sealed under a DIFFERENT name. Five domain pairs had been deposited by hand in an earlier
// session as alpine_domains_db_fs_incl_excl_653; this script names the same pair alpine_dom_da_fi_ie_653, so the
// door saw a new key, the wave sealed it, and Wave.lean carried the same Lean line twice under two names. One
// proof, checked twice, indexed twice, published twice — no kernel independence bought, and the lines finder
// caught it only after the seal.
//
// The statement is what the kernel actually decides, so the statement is what a duplicate must be measured
// against. Normalised on whitespace alone: two spellings of the same arithmetic are the same claim, and any
// difference the kernel would notice survives the trim.
// THE STATEMENT, NOT THE LINE — and comparing the line is why the first two versions of this check missed
// everything they were written to catch. A Lean line carries its own theorem NAME, so two claims that prove the
// identical proposition under different names are different STRINGS and identical PROOFS. The lines finder
// compares what sits between the colon and the `:=`, which is the proposition itself, so this must too.
const norm = (lean: string): string => {
  const line = String(lean)
  const colon = line.indexOf(' : ')
  const assign = line.indexOf(':=')
  const body = colon >= 0 && assign > colon ? line.slice(colon + 3, assign) : line
  return body.replace(/\s+/g, ' ').trim()
}
const sealedLean = new Set(theorems().map((t: { statement: string }) => norm(t.statement)))

// AND WITHIN THE BATCH TOO, which the first version missed and Wave.lean caught. Deduping only against ALREADY
// SEALED statements leaves duplicates that arrive together: game and astronomy both hold 25 direct members, so
// the database↔game and database↔astronomy inclusion–exclusion claims compute the same union and emit the same
// Lean line under two names. Neither was sealed when the batch was built, so both passed the sealed check and
// both landed — one proof, checked twice, published twice, exactly the waste the lines finder exists to catch.
// The batch is a set of statements, not just a set of keys.
const seenInBatch = new Set<string>()
const fresh = candidates.filter((c) => {
  const line = norm(String(c.lean))
  if (sealedLean.has(line) || seenInBatch.has(line)) return false
  seenInBatch.add(line)
  return true
})
if (fresh.length !== candidates.length) {
  console.log(`· domains-deposit — ${candidates.length - fresh.length} candidate(s) withheld: the ledger already seals that exact Lean line under another name`)
}

const r = depositCandidates(fresh, join(ROOT, 'lean/wave-queue.json'))
console.log(`✓ domains-deposit — ${r.deposited.length} deposited, ${r.refused.length} refused, ${r.pending} pending · receipt ${r.receipt}`)
for (const k of r.deposited) console.log(`    landed  ${k}`)
// A DUPLICATE IS THE SUCCESS CASE, in both of its spellings. The door says "already sealed in the ledger" once
// the kernel has taken a claim, and "already pending, accepted, or refused in the queue" while it is still on
// the conveyor — and the first draft here treated only the former as benign, so a harmless second run exited 1
// and would have failed the audit for re-offering work that had already landed.
const notSealed = r.refused.filter((x) => !/already sealed|already pending, accepted, or refused/.test(x.reason))
for (const x of notSealed) console.log(`    REFUSED ${x.key} — ${x.reason}`)
if (notSealed.length) {
  console.error(`✗ domains-deposit — ${notSealed.length} candidate(s) refused for a reason OTHER than being already sealed; a claim the door turns away is a claim worth reading before it is re-offered.`)
  process.exit(1)
}
