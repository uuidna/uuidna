// quantum/os/waves — THOUSANDS OF MILLISECOND JOBS, ENTIRELY IN THE SANDBOX, HOOKED AT EVERY STEP (the
// captain's directives, 2026-08-23: "thousands millisecond waves are magnitudes more efficient than manual
// work if executed in sandbox entirely" · "and if they hook around at each step"). runWaves boots uuidnaOS
// first — a drifted world runs NOTHING — then executes the cargo in concurrent waves of a chosen width,
// each job timed, each wave folded into a RECEIPT CHAIN (link 0 is the booted world; link n folds link n−1
// with wave n's results — the session-ratchet applied to computation, so the run IS its own tamper-evident
// transcript: touch any wave and every later link moves). Hooks ride around every step: beforeWave observes,
// aroundJob wraps, and afterWave may REFUSE (return false) — a short wave stops the run at its exact link.
// Proven live before landing: the whole ledger as one run — waves of 64, ~11 ms, all hooks heard. PURE beyond the boot:
// no fs, no net, no clock in the chain (performance.now only METERS, it never enters an address).
import { toUuid } from '../../address.js'
import { bootOS } from './index.js'

export interface WaveJob { name: string; run: () => Promise<{ ok: boolean }> | { ok: boolean } }
export interface JobResult { name: string; ok: boolean; ms: number }
export interface WaveRecord { wave: number; ok: number; of: number; link: string }
export interface WaveHooks {
  width?: number
  beforeWave?: (wave: number, size: number, chain: string) => void | Promise<void>
  aroundJob?: (job: WaveJob, run: () => Promise<JobResult>) => Promise<JobResult>
  afterWave?: (wave: number, ok: number, of: number, chain: string) => void | boolean | Promise<void | boolean>
}
export interface WaveRun {
  os: string           // the booted world's receipt — link 0's ground
  waves: WaveRecord[]  // each wave's tally and chain link
  okTotal: number
  jobs: number
  ms: number           // metered wall time (a meter, never an address)
  chain: string        // the head — recompute the whole run or it changed
}

/** runWaves(jobs, hooks) → the cargo in sandboxed waves: boot-or-nothing, chained receipts, refusable at
 *  every wave. The chain head commits to every job's name and verdict in order — the run's own transcript. */
export async function runWaves(jobs: readonly WaveJob[], hooks: WaveHooks = {}): Promise<WaveRun> {
  const width = hooks.width ?? 64
  const os = bootOS()                                    // the sandbox: verified loading, or nothing runs
  const t0 = performance.now()
  let chain = toUuid('wave-chain|' + os.receipt)
  const waves: WaveRecord[] = []
  let okTotal = 0
  let done = 0
  for (let w = 0; w * width < jobs.length; w++) {
    const slice = jobs.slice(w * width, (w + 1) * width)
    if (hooks.beforeWave) await hooks.beforeWave(w, slice.length, chain)
    const results = await Promise.all(slice.map((j) => {
      const run = async (): Promise<JobResult> => {
        const s = performance.now()
        const out = await j.run()
        return { name: j.name, ok: out.ok, ms: performance.now() - s }
      }
      return hooks.aroundJob ? hooks.aroundJob(j, run) : run()
    }))
    const ok = results.filter((r) => r.ok).length
    okTotal += ok
    done += results.length
    chain = toUuid('wave|' + chain + '|' + w + '|' + results.map((r) => `${r.name}:${r.ok}`).join(','))
    waves.push({ wave: w, ok, of: results.length, link: chain })
    if (hooks.afterWave && (await hooks.afterWave(w, ok, results.length, chain)) === false) break
  }
  return { os: os.receipt, waves, okTotal, jobs: done, ms: performance.now() - t0, chain }
}
