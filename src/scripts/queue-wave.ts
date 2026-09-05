#!/usr/bin/env node
// queue-wave — THE CONVEYOR, pressed into a script (queue lead 118). Sessions deposit sealable candidates into
// lean/wave-queue.json as {key, why, lean}; this runner VALIDATES the shape, PROBES each candidate alone
// against the kernel (the kernel is the judge — no eval, no JS mirror required at the gate), moves survivors
// to `accepted` (where the Wave.lean emitter lifts them on the next `npm run lean`) and failures to `refused`
// with the diagnostic named — a refusal is a RESULT, not an error; the run exits 0 either way and only a
// malformed queue file exits 1. The model's remaining role is exactly the refusals: tokens only at the
// frontier, mechanized. Run by the school cron; a quiet run is health.
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { theoremByKey } from '../theorems/index.js'
import { validateCandidate } from '../wave-deposit.js'   // THE ONE DECLARATION of the door laws — shared with the wire's deposit tool
import { disallowedAxioms } from '../axiom-report.js'

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
// ONE PROBE FILE PER PROCESS. The path was fixed, so two conveyors on this shared tree — or a test calling probe
// while a wave runs — would write and unlink the SAME file underneath each other, and the loser reads either a
// truncated file or the other candidate's statement. The pid is the one-writer law's own discriminator, not a
// clock and not a random: same process, same path, every time.
const PROBE = join(ROOT, 'lean', `_wave_probe.${process.pid}.lean`)

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

// AND THE PROBE ASKS THE KERNEL WHAT THE TERM COST, in the SAME invocation. A candidate can pass `by decide` and
// still drag an axiom: `(i == j) == (l.getD i 0 == l.getD j 0)` needs propext, because an equality of two
// Bool-valued comparisons at Prop level is propositional extensionality. This ledger's trust base is the bare
// kernel with allowed axioms ∅, so that candidate is refusable — but until now nothing could refuse it, because
// the axiom audit runs over the SEALED ledger. And that audit will not certify partially ("this run could not
// cover the ledger, so it has nothing to certify"), so ONE propext row blocks the witness for all 2656.
// `#print axioms` costs nothing here: the probe already spawns `lean` on a file, and the query goes in that file.
// A REGEX WOULD BE THE WRONG INSTRUMENT — `^^^` on Nat drags propext too, and so does the next spelling nobody
// has met yet. The kernel reports on the term it just checked; that is the only answer that stays true.
export function probe(c: Candidate): string | null {
  writeFileSync(PROBE, c.lean + '\n#print axioms ' + c.key + '\n')
  let out: string
  try { out = String(execSync(`lean ${JSON.stringify(PROBE)}`, { cwd: ROOT, stdio: 'pipe' }) ?? '') }
  catch (e) {
    // LEAN WRITES ITS ERRORS TO STDOUT, NOT STDERR. This read `err.stderr ?? err.message`, and on a refusal
    // `err.stderr` is an EMPTY BUFFER — not null, so `??` never fell through — which stringified to ''. The
    // caller does `if (bad) refused.push(...) else accepted.push(...)`, and '' is falsy: every candidate the
    // KERNEL REFUSED was filed as ACCEPTED, with the diagnostic thrown away. Caught 2026-09-05 by a test that
    // fed the door `2 + 2 = 5` and asserted the refusal was non-empty. Read both streams, and never return a
    // falsy diagnostic: a refusal that cannot be printed is still a refusal.
    const err = e as { stdout?: Buffer; stderr?: Buffer; message?: string }
    const said = (String(err.stdout ?? '') + String(err.stderr ?? '')).trim()
    return (said || String(err.message ?? '') || 'the kernel refused the proof and said nothing').slice(0, 300)
  }
  finally { try { unlinkSync(PROBE) } catch { /* the probe is disposable */ } }
  // NULL AND [] ARE DIFFERENT ANSWERS. [] is the kernel vouching for the term; null is NO verdict, and an absent
  // instrument may never be read as a pass — the same law the wave already obeys for an absent kernel (it VOIDS).
  const bad = disallowedAxioms(out, c.key)
  if (bad === null) return 'the kernel accepted the proof but printed no axiom verdict for ' + c.key + ' — an absent instrument is not a pass'
  if (bad.length) return `the proof depends on ${bad.length === 1 ? 'a disallowed axiom' : 'disallowed axioms'}: [${bad.join(', ')}] — this ledger's trust base is the bare kernel (allowed axioms ∅). Restate it decidably: an equality of two Bool comparisons drags propext, where .eraseDups.length or a + b - 2*(a &&& b) does not`
  return null
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
    const wing = liveWingHolds(c.key)
    const bad = (wing ? `key already declared in the live wing ${wing} (the built ledger may lag a neighbour's flight)` : null) ?? validate(c, sealed) ?? probe(c)
    if (bad) refused.push({ key: c.key, why: c.why, lean: c.lean, reason: bad })
    else accepted.push({ key: c.key, why: c.why, lean: c.lean, receipt: toUuid(c.lean) })
  }
  const next: WaveQueue = { pending: [], accepted: [...q.accepted, ...accepted], refused: [...q.refused, ...refused] }
  writeFileSync(QUEUE, JSON.stringify(next, null, 2) + '\n')
  console.log(`queue-wave — conveyed ${q.pending.length}: ${accepted.length} accepted (the next lean run lifts them into Wave.lean), ${refused.length} refused with reasons named`)
  for (const r of refused) console.log(`  REFUSED ${r.key}: ${r.reason.split('\n')[0]}`)
}

main()
