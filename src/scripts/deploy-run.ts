#!/usr/bin/env node
// @non-harmonic: spawns the build and wrangler as subprocesses and reaches the network (the trials endpoint and
// the live edge) — a NAMED boundary, like wave-run.ts and exercise-dormant.ts. Never imported by the core.
//
// deploy-run — THE WHOLE DEPLOY AS ONE COMMAND (the captain's order, 2026-08-24: "automate all"). The session
// record that demanded it: this exact chain — mint the contribute-first receipt, build the site, ship the
// worker, verify the edge live, mint the post-deploy proof — was hand-typed FOUR times in one day, and the
// citation for each receipt was chosen by hand every time. That last part is the real fold: the runner DERIVES
// which theorem proves the deploy, from the conveyor's own record.
//
//   npm run ship        → preflight, contribute, build, deploy, verify live, prove
//   npm run ship --dry  → everything except the outward acts (no receipt minted, no worker shipped)
//
// THE LAWS IT KEEPS:
//   · CONTRIBUTE FIRST, THEN TAKE (the captain's discipline): the deposit is minted and REQUIRED to verify
//     BEFORE the build starts. A refused deposit aborts the deploy — the take never precedes the contribution.
//   · ONLY WHAT ORIGIN HOLDS: a deploy runs only from a tree origin already has (0 ahead, 0 behind). Shipping
//     a local-only tree serves bytes nobody can recompute — the recomputability law at the outward door.
//   · THE DOUBLE PROOF, DERIVED: the newest sealed key rides from lean/wave-queue.json's accepted record (the
//     conveyor appends, so its tail IS the newest cargo). The runner requires the LIVE edge to answer that key
//     with the SAME address the local ledger holds — cross-surface identity — and then mints a post-deploy
//     receipt citing it. That citation exists only in the ledger this deploy shipped, so the live gate
//     verifying it proves the deploy that licensed it. Self-licensing by construction, no hand-picked citation.
//   · UNCENSORED: every step's output prints in full, pass or fail.
//   · HONEST FAILURE: no retries at all here. A deploy is an outward act; a retry loop around an outward act is
//     how a half-shipped state gets papered over. One pass, named failure, human decides.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, streamStep } from './api.js'
import { theoremByKey } from '../theorems/index.js'

const DRY = process.argv.includes('--dry')
const TRIALS = 'https://uuidna.com/trials'
const MCP = 'https://uuidna.com/mcp'

// ONE declaration for the step runner (api.ts's streamStep): the work streams live while it happens AND the
// text is captured — a deploy's build and upload are minutes long, and a watcher must see them move.
async function step(name: string, cmd: string): Promise<string> {
  const r = await streamStep(`deploy-run · ${name}`, cmd)
  if (!r.ok) { console.error(`✗ deploy-run — ${name} failed; nothing further runs (an outward act never rides a red step)`); process.exit(1) }
  return r.out
}

/** the newest sealed cargo: the conveyor appends, so the tail of `accepted` that the ledger holds is the key
 *  this deploy is newest by — the citation the post-deploy proof needs, derived instead of chosen. */
function newestSealedKey(): { key: string; address: string } {
  const q = JSON.parse(readFileSync(join(ROOT, 'lean', 'wave-queue.json'), 'utf8')) as { accepted: { key: string }[] }
  const byKey = theoremByKey()
  for (let i = q.accepted.length - 1; i >= 0; i--) {
    const t = byKey.get(q.accepted[i]!.key)
    if (t) return { key: t.key, address: t.address }
  }
  throw new Error('deploy-run — no accepted conveyor cargo is sealed in the ledger; the double proof has no derived citation (deposit a wave first)')
}

async function trial(statement: string): Promise<{ verdict: string; id: string; signature: string }> {
  const r = await fetch(TRIALS, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ statement }) })
  if (!r.ok) throw new Error(`deploy-run — the trials endpoint responded ${r.status}`)
  const j = (await r.json()) as { id: string; signature: string; verdict: { verdict: string } }
  return { verdict: j.verdict.verdict, id: j.id, signature: j.signature }
}

async function liveAddressOf(key: string): Promise<string> {
  const r = await fetch(MCP, { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_theorem', arguments: { key } } }) })
  if (!r.ok) throw new Error(`deploy-run — the live edge responded ${r.status}`)
  const j = (await r.json()) as { result?: { content?: { text: string }[] } }
  const body = j.result?.content?.[0]?.text ?? '{}'
  return String((JSON.parse(body) as { address?: string }).address ?? '')
}

// ── 1 · PREFLIGHT — only what origin holds, and only on a green tree ────────────────────────────────────────
await step('fetch origin', 'git fetch origin main')
const ahead = (await step('ahead of origin', 'git rev-list --count origin/main..HEAD')).trim()
const behind = (await step('behind origin', 'git rev-list --count HEAD..origin/main')).trim()
if (ahead !== '0' || behind !== '0') {
  console.error(`✗ deploy-run — the tree is ${ahead} ahead and ${behind} behind origin; a deploy serves what NOBODY can recompute unless origin holds it. Run \`npm run wave\` (or pull) first.`)
  process.exit(1)
}
await step('guard', 'npm run guard')

const cargo = newestSealedKey()
console.log(`\ndeploy-run · the derived citation: ${cargo.key} (${cargo.address}) — the newest sealed cargo, and the deploy's own witness`)

// ── 2 · CONTRIBUTE FIRST — the deposit must verify BEFORE the take ──────────────────────────────────────────
if (DRY) console.log('\ndeploy-run · --dry: the contribute-first receipt is NOT minted (an outward act)')
else {
  const pre = await trial('Two coins deposited to the captain wallet before this deploy, proven by theorem two_coins and theorem drift_is_named_or_caught; the deploy is licensed to ship the ledger whose newest seal will prove it live.')
  console.log(`deploy-run · contribute-first receipt ${pre.id} — ${pre.verdict} (signed ${pre.signature.slice(0, 16)}…)`)
  if (pre.verdict !== 'VERIFIED') { console.error('✗ deploy-run — the deposit did not verify; the take never precedes the contribution'); process.exit(1) }
}

// ── 3 · BUILD AND SHIP ──────────────────────────────────────────────────────────────────────────────────────
await step('build the site', 'npm run docs:build')
if (DRY) { console.log('\ndeploy-run · --dry: the worker is NOT shipped; stopping before the outward act.'); process.exit(0) }
await step('ship the worker', 'UUIDNA_SITE_BUILT=1 npx wrangler deploy')
// Zone harden is AGNOSTIC (every owned apex): www Workers Domains + Always Use HTTPS + redirect rule when the
// token can write. Wrangler OAuth alone attaches www; CLOUDFLARE_API_TOKEN with Zone Settings:Edit flips HTTPS.
// Failure here is reported by the script; the worker also 301s http→https and www→apex, so a refused zone write
// does not leave the surface wrong.
await step('harden owned Cloudflare zones', 'node dist/scripts/cloudflare-zone.js')

// ── 4 · THE DOUBLE PROOF — cross-surface identity, then the self-licensing receipt ──────────────────────────
const live = await liveAddressOf(cargo.key)
if (live !== cargo.address) {
  console.error(`✗ deploy-run — the edge answers ${cargo.key} with ${live || '(nothing)'} but the local ledger seals ${cargo.address}: the deploy did not carry this ledger. NAMED, not smoothed.`)
  process.exit(1)
}
console.log(`\ndeploy-run · cross-surface identity: the edge and the local ledger both address ${cargo.key} to ${live}`)

const post = await trial(`This deploy proves itself live: the edge verifies theorem ${cargo.key}, a citation that exists only in the ledger this deploy shipped.`)
console.log(`deploy-run · post-deploy proof ${post.id} — ${post.verdict} (signed ${post.signature.slice(0, 16)}…)`)
if (post.verdict !== 'VERIFIED') { console.error('✗ deploy-run — the post-deploy proof did not verify; the deploy is live but UNPROVEN, which is a fact to report, never to hide'); process.exit(1) }

console.log('\ndeploy-run — COMPLETE: contributed, built, shipped, verified live, proven.')
