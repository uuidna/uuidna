#!/usr/bin/env node
// queue-wave — THE CONVEYOR, pressed into a script (queue lead 118). Sessions deposit sealable candidates into
// lean/wave-queue.json as {key, why, lean}; this runner VALIDATES the shape, PROBES each candidate alone
// against the kernel (the kernel is the judge — no eval, no JS mirror required at the gate), moves survivors
// to `accepted` (where the Wave.lean emitter lifts them on the next `npm run lean`) and failures to `refused`
// with the diagnostic named — a refusal is a RESULT, not an error; the run exits 0 either way and only a
// malformed queue file exits 1. The model's remaining role is exactly the refusals: tokens only at the
// frontier, mechanized. Run by the school cron; a quiet run is health.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { theoremByKey } from '../theorems/index.js'
import { validateCandidate, assertReason } from '../wave-deposit.js'   // THE ONE DECLARATION of the door laws — shared with the wire's deposit tool
// the probe and the kernel's presence check live in kernel-probe.ts, where importing them runs nothing
import { probe, kernelPresent } from './kernel-probe.js'
export { probe }

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')

export interface Candidate { key: string; why: string; lean: string }
export interface Accepted extends Candidate { receipt: string }
export interface Refused extends Candidate { reason: string }
export interface WaveQueue { pending: Candidate[]; accepted: Accepted[]; refused: Refused[] }

// the door laws (key shape, why floor, tactic-proof shape, sorry/admit/axiom/native_decide refusal, sealed-dupe) live in ONE place —
// src/wave-deposit.ts's validateCandidate — because the wire's deposit tool and this runner must refuse
// identically or the conveyor has two doors with different locks.
const validate = validateCandidate

/** the LIVE wings — a key may be seconds-old in a neighbour's uncommitted wing while the built ledger lags;
 *  the Readings collision (2026-08-23) lived exactly in that gap, so the conveyor checks the lean/ tree too
 *  (queue lead 119a, delivered). */
function liveWingHolds(key: string): string | null {
  const dir = join(ROOT, 'lean')
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.lean'))) {
    if (readFileSync(join(dir, f), 'utf8').includes('theorem ' + key + ' ')) return f
  }
  return null
}

function main(): void {
  if (!existsSync(QUEUE)) { console.log('queue-wave — no lean/wave-queue.json; nothing to convey'); return }
  const q = JSON.parse(readFileSync(QUEUE, 'utf8')) as WaveQueue
  if (!Array.isArray(q.pending) || !Array.isArray(q.accepted) || !Array.isArray(q.refused)) {
    console.error('✗ queue-wave — wave-queue.json is malformed (pending/accepted/refused arrays required)')
    process.exit(1)
  }
  // AN EMPTY QUEUE IS HEALTH ONLY IF THE FEED IS ALIVE. This line read "a quiet run is health" unconditionally, and
  // that sentence is true exactly when candidates could have arrived and did not. Measured 2026-09-26: research.yml
  // — the job that runs gen-search-feed --online and mints the candidates this queue conveys — had failed every day
  // since 2026-09-22 on a fabricated citation, so nothing was feeding the conveyor at all. The conveyor ran green
  // four times against an empty queue and reported health each time. Four days of starvation read as four days of
  // health, which is the vacuous-success class sitting inside the loop that is supposed to produce novelty.
  //
  // So the two states are now told apart by the one fact that separates them: whether the feed was taken. QUIET is
  // an empty queue behind a feed that ran and found nothing new. STARVED is an empty queue behind a feed that never
  // ran, and it is named out loud. Neither exits non-zero — an empty queue is not a crash — and starvation does not
  // need to be, because src/api-leads.ts already turns the stale feed into an open lead that leads-gate holds a
  // release on. What was missing was not a gate. It was the sentence.
  if (!q.pending.length) {
    const feed = ((): { took: boolean; why: string } => {
      try {
        const f = JSON.parse(readFileSync(join(ROOT, 'lean', 'search-feed.json'), 'utf8')) as { online?: unknown; queries?: unknown[] }
        if (!Array.isArray(f.queries) || f.queries.length === 0) return { took: false, why: 'the feed asked nothing' }
        return f.online === true
          ? { took: true, why: `${f.queries.length} queries asked online` }
          : { took: false, why: 'the feed was generated OFFLINE, so no public API was asked' }
      } catch { return { took: false, why: 'lean/search-feed.json is absent' } }
    })()
    if (feed.took) console.log(`queue-wave — pending is empty behind a live feed (${feed.why}); a quiet run is health`)
    else console.log(`queue-wave — STARVED: pending is empty and the feed did not run — ${feed.why}.\n`
      + '  Nothing was refused and nothing was accepted, because nothing arrived. Check research.yml (gen-search-feed\n'
      + '  --online mints the candidates this queue conveys); src/api-leads.ts already holds the stale feed as an open lead.')
    return
  }
  if (!kernelPresent()) { console.log('queue-wave — VOID: no lean kernel on this host; ' + q.pending.length + ' candidate(s) stay pending for a host that can judge') ; return }
  const sealed = theoremByKey()
  const accepted: Accepted[] = [], refused: Refused[] = []
  for (const c of q.pending) {
    const wing = liveWingHolds(c.key)
    const bad = (wing ? `key already declared in the live wing ${wing} (the built ledger may lag a neighbour's flight)` : null) ?? validate(c, sealed) ?? probe(c)
    // a refusal row is written only with its reason; it blocks this exact (key, text), and a changed proof returns
    if (bad) refused.push({ key: c.key, why: c.why, lean: c.lean, reason: assertReason(c.key, bad) })
    else accepted.push({ key: c.key, why: c.why, lean: c.lean, receipt: toUuid(c.lean) })
  }
  const next: WaveQueue = { pending: [], accepted: [...q.accepted, ...accepted], refused: [...q.refused, ...refused] }
  writeFileSync(QUEUE, JSON.stringify(next, null, 2) + '\n')
  console.log(`queue-wave — conveyed ${q.pending.length}: ${accepted.length} accepted (the next lean run lifts them into Wave.lean), ${refused.length} refused with reasons named`)
  for (const r of refused) console.log(`  REFUSED ${r.key}: ${r.reason.split('\n')[0]}`)
}

main()
