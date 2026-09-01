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
import { depositCandidates, type WaveCandidate } from '../wave-deposit.js'
import { theorems } from '../theorems/index.js'

const DRY = process.argv.includes('--dry')

const WHY_CENSUS = (domain: string, says: string): string =>
  `Alpine domain port (${domain}): exact arithmetic over the census counts. HONEST SCOPE — membership is a ` +
  `pattern match over Alpine's own name and description and is a MEASUREMENT with known failures; the counting ` +
  `over it is what this claim seals, never the membership. Provenance only: nothing is installed, mounted, ` +
  `linked or executed. ${says}`

const candidates: WaveCandidate[] = []
for (const c of allDomainCensuses()) {
  for (const cl of c.claims) {
    candidates.push({ key: cl.key, lean: cl.lean, why: WHY_CENSUS(c.domain, cl.says), source: 'alpine-domains', from: `domainCensus/${c.domain}` } as WaveCandidate)
  }
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
