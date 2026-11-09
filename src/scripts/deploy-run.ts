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
import { builtSite } from './ship-build.js'
import { callHosted, DoorError } from './mcp-call.js'

const DRY = process.argv.includes('--dry')

// ONE declaration for the step runner (api.ts's streamStep): the work streams live while it happens AND the
// text is captured — a deploy's build and upload are minutes long, and a watcher must see them move.
async function step(name: string, cmd: string): Promise<string> {
  const r = await streamStep(`deploy-run · ${name}`, cmd)
  if (!r.ok) { console.error(`✗ deploy-run — ${name} failed; nothing further runs (an outward act never rides a red step)`); process.exit(1) }
  return r.out
}

/** the newest sealed cargo: the conveyor appends, so the tail of `accepted` that the ledger holds is the key
 *  this deploy is newest by — the citation the post-deploy proof needs, derived instead of chosen. */
function newestSealedKey(): { key: string; address: string; name: string } {
  const q = JSON.parse(readFileSync(join(ROOT, 'lean', 'wave-queue.json'), 'utf8')) as { accepted: { key: string }[] }
  const byKey = theoremByKey()
  for (let i = q.accepted.length - 1; i >= 0; i--) {
    const t = byKey.get(q.accepted[i]!.key)
    if (t) return { key: t.key, address: t.address, name: String(t.name ?? '') }
  }
  throw new Error('deploy-run — no accepted conveyor cargo is sealed in the ledger; the double proof has no derived citation (deposit a wave first)')
}

/** trial(statement) → uuidna_adjudicate on the hosted door (not REST /trials). */
async function trial(statement: string): Promise<{ verdict: string; via: string }> {
  const a = await callHosted('uuidna_adjudicate', { statement })
  const v = a.value as { verdict?: string }
  return { verdict: String(v.verdict ?? ''), via: a.name }
}

/** liveAddressOf(key) → uuidna_theorem.address on the hosted door. */
async function liveAddressOf(key: string): Promise<string> {
  const a = await callHosted('uuidna_theorem', { key })
  return String((a.value as { address?: string }).address ?? '')
}

// ── 1 · PREFLIGHT — only what origin holds, and only on a green tree ────────────────────────────────────────
await step('fetch origin', 'git fetch origin main')
const ahead = (await step('ahead of origin', 'git rev-list --count origin/main..HEAD')).trim()
const behind = (await step('behind origin', 'git rev-list --count HEAD..origin/main')).trim()
if (ahead !== '0' || behind !== '0') {
  console.error(`✗ deploy-run — the tree is ${ahead} ahead and ${behind} behind origin; a deploy serves what NOBODY can recompute unless origin holds it. Run \`npm run wave\` (or pull) first.`)
  process.exit(1)
}
await step('gate-receipt --verify', 'node dist/scripts/gate-receipt.js --verify')

const cargo = newestSealedKey()
console.log(`\ndeploy-run · the derived citation: ${cargo.key} (${cargo.address}) — the newest sealed cargo, and the deploy's own witness`)

// ── 2 · CONTRIBUTE FIRST — the deposit must verify BEFORE the take ──────────────────────────────────────────
if (DRY) console.log('\ndeploy-run · --dry: the contribute-first receipt is NOT minted (an outward act)')
else {
  // THE DOOR THIS RECEIPT IS MINTED ON IS THE PRIOR DEPLOY. A door that answers nothing is not a verdict: the receipt
  // law reads a run with no saved log as not measured, never as refused. Measured 2026-11-08: the live edge's row source
  // had died under it, every trial door answered empty, and this refusal kept the cure from shipping — the one act that
  // could restore the door. UNVERIFIED still refuses; only an answer that never came reads UNMEASURED, and the
  // contribution is then minted on the shipped door at step 4, the first door this deploy can be measured on.
  const pre = await trial('Two coins deposited to the captain wallet before this deploy, proven by theorem two_coins and theorem drift_is_named_or_caught; the deploy is licensed to ship the ledger whose newest seal will prove it live.')
    .catch((e: unknown) => {
      if (!(e instanceof DoorError)) throw e
      return { verdict: 'UNMEASURED', via: `no answer (${e.kind}: ${e.message.slice(0, 160)})` }
    })
  console.log(`deploy-run · contribute-first ${pre.verdict} via ${pre.via}`)
  if (pre.verdict === 'UNMEASURED') console.log('deploy-run · the prior door is silent; the contribution is minted on the shipped door below, where it can be measured')
  else if (pre.verdict !== 'VERIFIED') { console.error('✗ deploy-run — the deposit did not verify; the take never precedes the contribution'); process.exit(1) }
}

// ── 3 · VERIFY THE PRIOR SEALED SITE, THEN SHIP ─────────────────────────────────────────────────────────────
const site = builtSite()
if (!site.present || !site.index) {
  console.error('✗ deploy-run — no built site at docs/.vitepress/dist. Prior sealed build: npm run docs:build (off this path). Deploy verifies; it does not recompute the SSG.')
  process.exit(1)
}
if (!site.ledger) {
  console.error('✗ deploy-run — the built site does not serve the ledger manifest this worker is baked with; a site built before the last bake would make every row-reading door refuse. Rebuild it: npm run docs:build, then npm run ship.')
  process.exit(1)
}
console.log(`\ndeploy-run · site present — ${site.pages} page(s); SSG is not this path`)
if (DRY) { console.log('\ndeploy-run · --dry: the worker is NOT shipped; stopping before the outward act.'); process.exit(0) }
await step('ship the worker', 'UUIDNA_SITE_BUILT=1 npx wrangler deploy')
// Zone harden is AGNOSTIC (every owned apex). DEPLOYMENTS MUST SUCCEED: cloudflare-zone fails closed (no --soft),
// so a refused Always Use HTTPS / www attach aborts the ship — never COMPLETE over a failed harden.
await step('harden owned Cloudflare zones', 'node dist/scripts/cloudflare-zone.js')

// ── 4 · THE DOUBLE PROOF — cross-surface identity, then the self-licensing receipt ──────────────────────────
const live = await liveAddressOf(cargo.key)
if (live !== cargo.address) {
  console.error(`✗ deploy-run — the edge answers ${cargo.key} with ${live || '(nothing)'} but the local ledger seals ${cargo.address}: the deploy did not carry this ledger. NAMED, not smoothed.`)
  process.exit(1)
}
console.log(`\ndeploy-run · cross-surface identity: the edge and the local ledger both address ${cargo.key} to ${live}`)

// THE SENTENCE CARRIES THE THEOREM'S OWN WORDS. The gate's relevance floor (adjudicate.ts contentWords) strips the
// `theorem <key>` clause before it looks for shared vocabulary, so a sentence that named the cargo only by its key shared
// nothing with it and read UNVERIFIED — measured live on 2026-11-08 with mass_comply_demux_never_both_hot: "cites a real
// sealed theorem that shares NO vocabulary with the claim". The key's words, spelled out, and the theorem's own gloss are
// what the cargo IS about; a proof that this deploy serves that theorem is a sentence about those words.
const words = cargo.key.split('_').join(' ')
const post = await trial(`This deploy proves itself live: the edge verifies theorem ${cargo.key} — ${words}${cargo.name && /^[a-z]/i.test(cargo.name.trim()) ? `, "${cargo.name.trim()}"` : ''} — a citation that exists only in the ledger this deploy shipped.`)
console.log(`deploy-run · post-deploy ${post.verdict} via ${post.via}`)
if (post.verdict !== 'VERIFIED') { console.error('✗ deploy-run — the post-deploy proof did not verify; the deploy is live but UNPROVEN, which is a fact to report, never to hide'); process.exit(1) }

console.log('\ndeploy-run — COMPLETE: contributed, built, shipped, verified live, proven.')
