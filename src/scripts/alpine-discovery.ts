#!/usr/bin/env node
// @non-harmonic: optional --online fold (searchFeedOnline) and optional wave deposit — host boundary only.
//
// alpine-discovery — PORT THE CATALOGUE, DISCOVER THEOREMS AND AXIOMS AT SCALE.
//
// Walks the committed mirror (28k+ packages), classifies harmonised / crypto / port bindings, harvests decidable
// arithmetic from Alpine's own words, and folds axiom-hunt exposed assumptions. Desk proposes; never auto-seals.
//
//   npm run alpine-discovery           → census + lean/alpine-discovery.json
//   npm run alpine-discovery -- --online  → also fold live search-feed titles (named fetch doors)
//   npm run alpine-discovery -- --deposit → deposit harvest candidates onto the wave conveyor
//   npm run alpine-discovery -- --dry     → report only, no writes or deposits
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { alpineDiscoveryCensus, ALPINE_DISCOVERY_PATH } from '../quantum/os/discovery/index.js'
import { depositCandidates, waveQueueState, type WaveCandidate } from '../wave-deposit.js'
import { readRepoJson } from '../desk/repo/json/index.js'
import { mintLeadsToCandidates } from '../harvest.js'
import { searchFeedOnline } from '../search-feed-online.js'
import { hexbitDoorOf } from '../hexbit/index.js'
import { toUuid } from '../address.js'

const DRY = process.argv.includes('--dry')
const ONLINE = process.argv.includes('--online')
const DEPOSIT = process.argv.includes('--deposit')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.slice('--limit='.length)) : undefined
const QUEUE = join(ROOT, 'lean', 'wave-queue.json')

const census = alpineDiscoveryCensus({
  limit: Number.isFinite(LIMIT) && LIMIT! > 0 ? LIMIT : undefined,
})

type OnlineFold = { doors: number; leads: number; silent: number; receipt: string }
let online: OnlineFold | undefined
if (ONLINE) {
  const wave = waveQueueState(readRepoJson('lean/wave-queue.json'))
  const feed = await searchFeedOnline(wave.refused)
  online = {
    doors: feed.results.length,
    leads: feed.leads.length,
    silent: feed.silent.length,
    receipt: feed.receipt,
  }
}

const candidates: WaveCandidate[] = mintLeadsToCandidates(
  census.harvest.map((h) => ({
    key: h.key,
    fragment: h.fragment,
    lean: h.lean,
    why: `Alpine port harvest: ${h.origins} project(s), ${h.packages} package(s) attest "${h.fragment.slice(0, 80)}" — sample ${h.sample}`,
    source: 'alpine-catalogue',
    from: h.sample,
    receipt: toUuid(`alpine-harvest|${h.key}`),
  })),
)

let deposited: string[] = []
let depositRefused: { key: string; reason: string }[] = []
let pending = 0
if (DEPOSIT && !DRY && candidates.length) {
  const dep = depositCandidates(candidates, QUEUE)
  deposited = dep.deposited
  depositRefused = dep.refused
  pending = dep.pending
}

const out = {
  ...census,
  ...(online ? { online } : {}),
  deposit: DEPOSIT ? { deposited, refused: depositRefused, pending } : undefined,
}

if (!DRY) {
  writeFileSync(join(ROOT, ALPINE_DISCOVERY_PATH), JSON.stringify(out, null, 2) + '\n')
}

const door = hexbitDoorOf(census.receipt)
console.log(
  `${census.axiomHunt.refuted ? '✗' : '✓'} alpine-discovery — `
  + `${census.packages} packages · ${census.origins} origins · `
  + `harmonised ${census.bindings.harmonised} · crypto ${census.bindings.crypto} · port ${census.bindings.port} · `
  + `harvest ${census.harvestTotal} (${census.harvest.length} in report) · `
  + `axiom-hunt ${census.axiomHunt.proven} proven / ${census.axiomHunt.exposed} exposed`
  + (online ? ` · online ${online.doors} doors / ${online.leads} leads` : '')
  + (DEPOSIT ? ` · deposited ${deposited.length}` : '')
  + ` · receipt ${census.receipt} · door ${door.door}`,
)
if (census.exposedAxioms.length) {
  console.log('  exposed axioms (desk → captain):')
  for (const e of census.exposedAxioms.slice(0, 8)) console.log(`    · ${e.lead.split(' — ')[0]}`)
}
if (census.harvest.length) {
  console.log('  top harvest (unsealed, decide() TRUE):')
  for (const h of census.harvest.slice(0, 5)) {
    console.log(`    · ${h.key} ← ${h.origins} origins / ${h.packages} pkgs — ${h.fragment.slice(0, 60)}`)
  }
}
if (!DRY) console.log(`  wrote ${ALPINE_DISCOVERY_PATH}`)
if (census.axiomHunt.refuted) process.exit(1)
