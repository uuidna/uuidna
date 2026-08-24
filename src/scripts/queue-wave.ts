#!/usr/bin/env node
// queue-wave — THE CONVEYOR, pressed into a script (queue lead 118). Sessions deposit sealable candidates into
// lean/wave-queue.json as {key, why, lean}; this runner VALIDATES the shape, PROBES each candidate alone
// against the kernel (the kernel is the judge — no eval, no JS mirror required at the gate), moves survivors
// to `accepted` (where the Wave.lean emitter lifts them on the next `npm run lean`) and failures to `refused`
// with the diagnostic named — a refusal is a RESULT, not an error; the run exits 0 either way and only a
// malformed queue file exits 1. The model's remaining role is exactly the refusals: tokens only at the
// frontier, mechanized. Run by the school cron; a quiet run is health.
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { theoremByKey } from '../theorems/index.js'
import { validateCandidate } from '../wave-deposit.js'   // THE ONE DECLARATION of the door laws — shared with the wire's deposit tool

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const PROBE = join(ROOT, 'lean', '_wave_probe.lean')

export interface Candidate { key: string; why: string; lean: string }
export interface Accepted extends Candidate { receipt: string }
export interface Refused extends Candidate { reason: string }
export interface WaveQueue { pending: Candidate[]; accepted: Accepted[]; refused: Refused[] }

// the door laws (key shape, why floor, by-decide court, sorry/axiom refusal, sealed-dupe) live in ONE place —
// src/wave-deposit.ts's validateCandidate — because the wire's deposit tool and this runner must refuse
// identically or the conveyor has two doors with different locks.
const validate = validateCandidate

/** probe(c) → null when the kernel accepts the statement alone, else the diagnostic (bounded). */
/** the instrument must exist before it may judge — an absent kernel VOIDS the wave (candidates stay pending),
 *  it never refuses: a refusal is a verdict and only the kernel may issue one (learned from the first cron
 *  wave, which falsely refused five sound candidates with "lean: not found" — the trial-protocol law applied:
 *  a trial whose instrument is missing carries no information about the subject). */
function kernelPresent(): boolean {
  try { execSync('lean --version', { cwd: ROOT, stdio: 'pipe' }); return true } catch { return false }
}

function probe(c: Candidate): string | null {
  writeFileSync(PROBE, c.lean + '\n')
  try { execSync(`lean ${JSON.stringify(PROBE)}`, { cwd: ROOT, stdio: 'pipe' }); return null }
  catch (e) { const err = e as { stderr?: Buffer; message?: string }; return String(err.stderr ?? err.message ?? 'kernel refused').slice(0, 300) }
  finally { try { unlinkSync(PROBE) } catch { /* the probe is disposable */ } }
}

function main(): void {
  if (!existsSync(QUEUE)) { console.log('queue-wave — no lean/wave-queue.json; nothing to convey'); return }
  const q = JSON.parse(readFileSync(QUEUE, 'utf8')) as WaveQueue
  if (!Array.isArray(q.pending) || !Array.isArray(q.accepted) || !Array.isArray(q.refused)) {
    console.error('✗ queue-wave — wave-queue.json is malformed (pending/accepted/refused arrays required)')
    process.exit(1)
  }
  if (!q.pending.length) { console.log('queue-wave — pending is empty; a quiet run is health') ; return }
  if (!kernelPresent()) { console.log('queue-wave — VOID: no lean kernel on this host; ' + q.pending.length + ' candidate(s) stay pending for a host that can judge') ; return }
  const sealed = theoremByKey()
  const accepted: Accepted[] = [], refused: Refused[] = []
  for (const c of q.pending) {
    const bad = validate(c, sealed) ?? probe(c)
    if (bad) refused.push({ key: c.key, why: c.why, lean: c.lean, reason: bad })
    else accepted.push({ key: c.key, why: c.why, lean: c.lean, receipt: toUuid(c.lean) })
  }
  const next: WaveQueue = { pending: [], accepted: [...q.accepted, ...accepted], refused: [...q.refused, ...refused] }
  writeFileSync(QUEUE, JSON.stringify(next, null, 2) + '\n')
  console.log(`queue-wave — conveyed ${q.pending.length}: ${accepted.length} accepted (the next lean run lifts them into Wave.lean), ${refused.length} refused with reasons named`)
  for (const r of refused) console.log(`  REFUSED ${r.key}: ${r.reason.split('\n')[0]}`)
}

main()
