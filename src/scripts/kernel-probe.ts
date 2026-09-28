// kernel-probe — the conveyor's probe: one statement, alone, sent to the kernel with `#print axioms` in the same
// file. queue-wave judges wave candidates with it and lean-involutions judges formalised leads with it; the body is
// src/kernel-probe.ts probeLean, which the school's grader calls too, so every door refuses by one instrument. It
// lives apart from queue-wave because importing queue-wave RUNS the conveyor (its top level is main(), and
// scripts/run.ts dispatches by import, so a script carries no main-guard).
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { probeLean } from '../kernel-probe.js'

// ONE PROBE FILE PER PROCESS. The path was fixed, so two conveyors on this shared tree — or a test calling probe
// while a wave runs — would write and unlink the SAME file underneath each other, and the loser reads either a
// truncated file or the other candidate's statement. The pid is the one-writer law's own discriminator, not a
// clock and not a random: same process, same path, every time.
//
// AND ONE PER CALL, WHICH THE PID ALONE DID NOT GIVE. The suite runs with --test-isolation=none, so every test file
// shares ONE process and therefore one pid: two probes in that process resolved to the same path and each unlinked
// under the other. Measured 2026-09-28 inside a landing's clean worktree, where it failed as
// `ENOENT ... lean/_wave_probe.29013.lean` while passing standalone — a green that held only while nothing else probed.
// The counter is the discriminator the pid was meant to be: an integer that rises once per call, so it is exact on
// every host, carries no clock and no random, and two calls cannot meet. The pid stays, because two PROCESSES on one
// shared tree are the case the line above was written for.
let probes = 0
const probePath = (): string => join(ROOT, 'lean', `_wave_probe.${process.pid}.${++probes}.lean`)

/** what the probe needs: the theorem whose axioms are asked, and the Lean text that declares it */
export interface ProbeCandidate { key: string; why: string; lean: string }

/** the instrument must exist before it may judge — an absent kernel VOIDS the wave (candidates stay pending),
 *  it never refuses: a refusal is a verdict and only the kernel may issue one (learned from the first cron
 *  wave, which falsely refused five sound candidates with "lean: not found" — the trial-protocol law applied:
 *  a trial whose instrument is missing carries no information about the subject). */
export function kernelPresent(): boolean {
  try { execSync('lean --version', { cwd: ROOT, stdio: 'pipe' }); return true } catch { return false }
}

/** probe(c) → null when the kernel accepts the statement alone and vouches for its key with no axiom, else the
 *  kernel's diagnostic (bounded, naming no host). */
export function probe(c: ProbeCandidate): string | null {
  return probeLean(c.lean, c.key, probePath(), { cwd: ROOT, hide: [ROOT] }).reason
}
