// kernel-probe — the one probe that asks the kernel about a Lean text: compile it, read `#print axioms` for one
// key, and name the refusal. Two consumers: the wave conveyor (scripts/queue-wave.ts) and the school's grader
// (scripts/school-grade.ts). It lives outside queue-wave.ts because that script runs its main() on import.
import { writeFileSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { axiomsOf, inadmissibleIn } from './axiom-report.js'

export interface ProbeOptions {
  /** the directory lean runs in */
  cwd: string
  /** wall-clock budget for the lean process; on expiry the process is killed and the reading is a refusal */
  timeoutMs?: number
  /** lean's own heap ceiling (`--memory`, megabytes) */
  memoryMb?: number
  /** the child's environment; absent, the parent's is inherited */
  env?: NodeJS.ProcessEnv
  /** absolute paths stripped from a diagnostic, so a recorded refusal names no host */
  hide?: readonly string[]
}

/** reason null = the kernel accepted the text and vouched for `key` with no axioms. axioms null = no verdict was read. */
export interface ProbeReading { reason: string | null; axioms: string[] | null }

/** probeLean(lean, key, file, opts) — writes `lean` plus `#print axioms key` to `file`, runs the kernel on it, and
 *  deletes the file. */
export function probeLean(lean: string, key: string, file: string, opts: ProbeOptions): ProbeReading {
  writeFileSync(file, lean + '\n#print axioms ' + key + '\n')
  const args = [...(opts.memoryMb ? [`--memory=${opts.memoryMb}`] : []), file]
  let out: string
  try {
    out = String(execFileSync('lean', args, {
      cwd: opts.cwd, stdio: 'pipe', env: opts.env,
      ...(opts.timeoutMs ? { timeout: opts.timeoutMs, killSignal: 'SIGKILL' as const } : {}),
    }) ?? '')
  } catch (e) {
    // LEAN WRITES ITS ERRORS TO STDOUT, NOT STDERR. On a refusal `err.stderr` is an EMPTY BUFFER — not null, so
    // `??` never falls through — and stringifies to ''. A falsy diagnostic would read as an acceptance to a caller
    // that tests `if (bad)`, so both streams are read and the diagnostic is never empty.
    const err = e as { stdout?: Buffer; stderr?: Buffer; message?: string; code?: string }
    if (err.code === 'ETIMEDOUT')
      return { reason: `the kernel did not finish within ${(opts.timeoutMs ?? 0) / 1000} s, so it vouched for nothing`, axioms: null }
    const said = (String(err.stdout ?? '') + String(err.stderr ?? '')).trim()
    // A REFUSAL IS A RECORD. Lean prints the probe's absolute path; the record must name no host.
    const hostless = (s: string): string =>
      (opts.hide ?? []).reduce((t, p) => t.split(p).join('.'), s).replace(/\/(?:Users|home)\/[A-Za-z0-9_.-]+/g, '.')
    return { reason: hostless(said || String(err.message ?? '') || 'the kernel refused the proof and said nothing').slice(0, 300), axioms: null }
  }
  finally { try { unlinkSync(file) } catch { /* the probe file is disposable */ } }
  // NULL AND [] ARE DIFFERENT ANSWERS. [] is the kernel vouching for the term; null is no verdict, and an absent
  // instrument may never be read as a pass.
  const bad = axiomsOf(out, key)
  if (bad === null) return { reason: 'the kernel accepted the proof but printed no axiom verdict for ' + key + ' — an absent instrument is not a pass', axioms: null }
  if (bad.length) {
    // NAME THE CONSTRUCT, not just the axiom: of fourteen List primitives, only .getD and [i]! drag propext.
    const known = inadmissibleIn(lean)
    const named = known.length
      ? ` The cause is in your statement: ${known.map((k) => `\`${k.form}\` — ${k.why}; instead ${k.instead}`).join('; ')}.`
      : ' No known-inadmissible form is present, so the cause is elsewhere in the term — bisect it with `#print axioms` on each conjunct.'
    return { reason: `the proof depends on ${bad.length === 1 ? 'an axiom' : 'axioms'}: [${bad.join(', ')}] — all of it Lean, but outside this ledger's axiom-free receipt; restate it so the kernel needs none.${named}`, axioms: bad }
  }
  return { reason: null, axioms: [] }
}
