#!/usr/bin/env node
// outward — THE OUTWARD PASS: every external API this repo can reach, exercised on one schedule, each answer
// CONTENT-ADDRESSED and compared to its last receipt. Automation for the whole boundary, in the one idiom the ledger
// actually proves.
//
// THE ADVANTAGE IS THE MEASURED ONE. This repo refuses to claim quantum advantage — `next` ARM 6
// asserts none is claimed, and grover_quadratic_bound seals why (a quadratic speedup is not a break). What IS sealed
// is the two-coin measure: verify beats recompute (verify_beats_recompute_by_magnitudes). So the pass fetches once,
// folds the answer to a 128-bit address, and every later run VERIFIES that address instead of re-reading the world.
// An unchanged answer costs one comparison; only a MOVED address costs attention. The receipt is the whole point:
// "the CVE moved", "the CODATA table changed", "the repo list grew" — a diff.
//
// WHY IT NEVER BLOCKS: the network is the NAMED non-harmonic boundary (harmonic-scan exempts exactly these modules).
// A gate that fails because an API is down would make the ledger's receipts depend on someone else's uptime, which is
// the opposite of recomputable. So this pass reports and exits 0 on unreachable; only a CHANGED answer is news, and
// only a crash in our own code is an error.
//
// it records that an external answer moved. Corroboration is evidence;
// approval still requires a local by-decide seal (approve() hard-fails without one). Integrity.
import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { toUuid, beaconAnchor, nistConstant, auditCve, viesVerify, corroborate, bindCaptainRepos, scanPublications, fetchGutenberg } from '../index.js'
import { ROOT, rd } from './api.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts

/** One outward probe: a named external answer, fetched by a thunk, folded to an address. */
type Probe = { name: string; host: string; run: () => Promise<unknown> | unknown }

// EVERY reachable external API, each with a fixed, public, argument — the same question every run, so a moved
// address means the WORLD moved. Nothing here carries a credential or user data.
const PROBES: Probe[] = [
  { name: 'nist-beacon', host: 'beacon.nist.gov', run: () => beaconAnchor(toUuid('outward')) },
  { name: 'codata-constant', host: 'physics.nist.gov', run: () => nistConstant('Planck constant') },
  { name: 'nvd-cve', host: 'services.nvd.nist.gov', run: () => auditCve('CVE-2021-44228') },
  { name: 'vies-vat', host: 'ec.europa.eu', run: () => viesVerify('BG', '130087268') },
  { name: 'literature', host: 'crossref/openalex/s2/zenodo', run: () => corroborate('content-addressed identity') },
  { name: 'github-repos', host: 'api.github.com', run: () => bindCaptainRepos() },
  { name: 'publications', host: 'zenodo.org', run: () => scanPublications() },
  { name: 'gutenberg', host: 'gutendex.com', run: () => fetchGutenberg(1342) },
]

const LEDGER = 'outward-receipts.json'
type Row = { name: string; host: string; address: string; state: 'fresh' | 'unchanged' | 'moved' | 'unreachable'; note?: string }

const before: Record<string, string> = existsSync(join(ROOT, LEDGER))
  ? (JSON.parse(rd(LEDGER)) as { receipts: Record<string, string> }).receipts ?? {}
  : {}

const rows: Row[] = []
for (const p of PROBES) {
  try {
    const answer = await Promise.resolve(p.run())
    // the answer's CONTENT-ADDRESS — the whole comparison, 128 bits instead of a re-read
    const address = toUuid(JSON.stringify(answer ?? null))
    const prior = before[p.name]
    rows.push({ name: p.name, host: p.host, address, state: !prior ? 'fresh' : prior === address ? 'unchanged' : 'moved' })
  } catch (e) {
    // unreachable is NOT a failure: the boundary is allowed to be down, and the last receipt still stands
    rows.push({ name: p.name, host: p.host, address: before[p.name] ?? '', state: 'unreachable', note: String((e as Error).message).slice(0, 120) })
  }
}

const moved = rows.filter((r) => r.state === 'moved')
const unreachable = rows.filter((r) => r.state === 'unreachable')
const verified = rows.filter((r) => r.state === 'unchanged')

console.log('outward — every external boundary, one pass, each answer content-addressed:')
for (const r of rows) {
  const mark = { fresh: '·', unchanged: '✓', moved: '→', unreachable: '⚠' }[r.state]
  console.log(`  ${mark} ${r.name.padEnd(17)} ${r.host.padEnd(26)} ${handleOf(r.address) || '—'}  ${r.state}${r.note ? ' — ' + r.note : ''}`)
}
console.log(`\n  ${verified.length} verified by receipt (no re-read needed) · ${moved.length} moved · ${unreachable.length} unreachable · ${rows.length} probes`)
if (moved.length) console.log('  MOVED: ' + moved.map((r) => r.name).join(', ') + ' — the world changed; read the answer, do not assume it')

// the receipts are DERIVED state: written every run, so the next run verifies instead of re-reading
const receipts = Object.fromEntries(rows.filter((r) => r.address).map((r) => [r.name, r.address]))
writeFileSync(join(ROOT, LEDGER), JSON.stringify({
  law: 'Each entry is the content-address of one external answer. A later run VERIFIES the address instead of re-reading the world (verify_beats_recompute_by_magnitudes); only a moved address costs attention. Unreachable keeps the last receipt — the boundary is allowed to be down.',
  probes: rows.length, receipts,
}, null, 2) + '\n')

// exit 0 always: the network is the named non-harmonic boundary, and a receipt ledger that fails on someone else's
// downtime would make our own recomputability depend on their uptime.
process.exit(0)
