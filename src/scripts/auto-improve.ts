#!/usr/bin/env node
// @non-harmonic: spawns build and generator processes, holds the writer lock, and reads the working tree —
// automation at the scripts boundary. Never imported by the harmonic core.
//
// auto-improve — DRIVE THE DERIVED LAYER TO ITS FIXED POINT, AND PROVE IT REACHED ONE.
//
// WHAT PROBLEM THIS AUTOMATES, precisely, because "automate improving everything" is not a thing a program can
// be handed. This tree's actual recurring failure is NOT that generators are unrun; it is that the derived
// layer HAD NO FIXED POINT. A generator sealed a raw wall-clock timing, so every run produced a different
// answer, so README.md and lean/quantum-capacity.* alternated between exactly two states, and a run of
// `Reconcile:` commits in the log were each other's undoing rather than anyone's fix. Nobody noticed for a
// while because each individual run looked like progress.
//
// So the improvement this automates is the one that was missing: RUN THE GENERATORS UNTIL NOTHING MOVES, AND
// SAY WHETHER THEY CONVERGED. A round that changes a derived file has improved something. A round that changes
// nothing has converged, and convergence is the result — not the absence of one. A generator that never
// converges is reported by name as the defect it is, which is exactly the signal that was missing when the
// capacity report was flip-flopping.
//
// WHAT IT WILL NOT DO, and each refusal is a hazard this checkout has actually produced today:
//   · IT DOES NOT COMMIT, STAGE OR PUSH. Several sessions share this ONE working tree — not a worktree each —
//     so a tree-wide `git add` publishes whoever's half-finished source happens to be sitting there. Staging is
//     a human decision about paths a human can name.
//   · IT DOES NOT RUN THE OTHER SESSIONS' GENERATORS. `docs:build` chains gen-mcp, gen-captain-claims,
//     lean-payload-seeds and payload-sync ahead of the site build, and those write derived files belonging to
//     work in flight elsewhere. The site build itself runs; the chain around it does not.
//
// THE DOCS BUILD RUNS, AND IT RUNS UNDER THE LOCK. `vitepress build docs` is not concurrency-safe — `.temp` and
// `dist` are fixed per docs root, so two simultaneous builds share one scratch directory and which phase dies is
// luck. The cure for that is mutual exclusion, not avoidance, and this script is already holding the only
// mutual-exclusion primitive the tree has: it takes `.uuidna-writer.lock` for the whole run and releases it in a
// finally. Running the site build inside that hold is therefore the CORRECT place for it — one docs build at a
// time across sessions is exactly what the lock buys, and skipping the build would mean the automation never
// learns that the derived layer it just converged cannot actually render.
//   · IT DOES NOT RUN THE FULL GATE. gate-all's `one-writer acquire` is an ARM in its concurrent fan-out rather
//     than a wrapper around it, so `generate` writes the derived layer BEFORE the lock is taken — a green
//     acquire over writes made outside it, which is worse than no lock because it certifies.
//   · IT HOLDS THE LOCK AROUND ITS OWN WRITES, for the whole run, and releases in a finally. That is the whole
//     difference between this and the gate.
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { acquire, release, currentWriter } from './one-writer.js'
import { sha256 } from '../sha256.js'

/** THE GENERATORS THIS DRIVES, and the derived files each is responsible for. Deliberately a SHORT, NAMED list
 *  rather than "every gen-* on disk": a generator that writes into another session's paths would turn this into
 *  the tree-wide writer the header just promised it is not. Extending the list is a decision, not a discovery. */
//  THE COMMAND IS WRITTEN OUT IN FULL, on one line, and that line is the one that runs. Building the path from
//  a bare name (`join(HERE, name + '.js')`) worked and was still wrong twice over: the dormancy law wants one
//  line carrying both a runner and a filename — a MENTION of a generator elsewhere is explicitly not proof that
//  anything runs it — and a reader scanning this file could not see what gets executed either. The literal below
//  IS the source of truth: it is parsed and spawned, so it cannot drift from what happens.
interface Job { cmd: string; writes: string[] }

const JOBS: readonly Job[] = [
  { cmd: 'node dist/scripts/gen-quantum-advantage.js',
    writes: ['lean/quantum-advantage.json', 'lean/quantum-advantage.md', 'docs/public/quantum-advantage.jsonld'] },
  { cmd: 'node dist/scripts/gen-alpine-apps.js',
    writes: ['lean/alpine-apps.json', 'lean/alpine-apps.md'] },
  // AXIOM-HUNT BECAME A GENERATOR the day it started filing. It ran in the audit chain and wrote nothing — an
  // exposed axiom lived in console output and never reached a leads surface, so the gap → axiom → theorem chain
  // broke at the first hop. Now that it seals lean/exposed-axioms.json, that file is derived and owes the same
  // fixed point as every other: two runs, byte-identical, or the set of assumptions this tree runs on is not
  // stable enough to be published.
  { cmd: 'node dist/scripts/axiom-hunt.js',
    writes: ['lean/exposed-axioms.json'] },
  { cmd: 'node dist/scripts/alpine-discovery.js',
    writes: ['lean/alpine-discovery.json'] },
]

/** the job's own name, read off the command it runs — never stored twice */
const nameOf = (job: Job): string => (job.cmd.split(/\s+/).pop() ?? '').replace(/^.*\//, '').replace(/\.js$/, '')

const MAX_ROUNDS = 4
const args = process.argv.slice(2)
const rounds = (() => {
  const at = args.indexOf('--rounds')
  const n = at < 0 ? MAX_ROUNDS : Number(args[at + 1])
  return Number.isInteger(n) && n > 0 && n <= 20 ? n : MAX_ROUNDS
})()
const dryRun = args.includes('--dry-run')

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** the content-address of a derived file, or a named absence — an ABSENT file and an EMPTY one must not fold
 *  alike, or a generator that deleted its own output would read as converged */
const digestOf = (rel: string): string => {
  const path = join(ROOT, rel)
  if (!existsSync(path)) return 'absent'
  return `${statSync(path).size}:${hex(sha256(new Uint8Array(readFileSync(path))))}`
}

const snapshot = (job: Job): Record<string, string> =>
  Object.fromEntries(job.writes.map((w) => [w, digestOf(w)]))

const moved = (before: Record<string, string>, after: Record<string, string>): string[] =>
  Object.keys(after).filter((k) => before[k] !== after[k])

interface RoundResult { round: number; job: string; moved: string[]; ok: boolean; error?: string }

const runJob = (job: Job): { ok: boolean; error?: string } => {
  // `node` is spawned as THIS interpreter rather than by name: it is not on PATH on every development host here,
  // and a runner that resolves differently from the one already running is a second opinion about the host.
  const [, ...argv] = job.cmd.split(/\s+/)
  try {
    execFileSync(process.execPath, argv.map((a) => join(ROOT, a)), { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' })
    return { ok: true }
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string }
    return { ok: false, error: (err.stderr || err.stdout || err.message || 'unknown').trim().split('\n').slice(-6).join('\n      ') }
  }
}

// ── the run ──────────────────────────────────────────────────────────────────────────────────────────────────
const held = currentWriter()
if (held && held.pid !== process.pid) {
  console.error(`✗ auto-improve — the tree is HELD by pid ${held.pid} (${held.purpose}).`)
  console.error('  Waiting is deliberately NOT automatic here: a peer session holding the lock is usually mid-edit,')
  console.error('  and generators read the working tree, so a queued run would seal whatever they are halfway through.')
  process.exit(1)
}

const got = acquire('auto-improve', process.pid)
if (!got.ok) {
  console.error(`✗ auto-improve — could not take the writer lock; pid ${got.holder.pid} (${got.holder.purpose}) has it.`)
  process.exit(1)
}

const results: RoundResult[] = []
let converged = false
let failed = false

try {
  console.log(`auto-improve — ${JOBS.length} generators, up to ${rounds} rounds, holding the writer lock as pid ${process.pid}`)
  if (dryRun) console.log('  --dry-run: generators still RUN (that is how convergence is measured); nothing is staged, committed or pushed either way')

  for (let round = 1; round <= rounds; round++) {
    let movedThisRound = 0
    for (const job of JOBS) {
      const before = snapshot(job)
      const r = runJob(job)
      const after = snapshot(job)
      const changed = moved(before, after)
      results.push({ round, job: nameOf(job), moved: changed, ok: r.ok, error: r.error })
      if (!r.ok) {
        failed = true
        console.log(`  round ${round}  ${nameOf(job).padEnd(22)} ✗ FAILED`)
        console.log(`      ${r.error}`)
        continue
      }
      movedThisRound += changed.length
      console.log(`  round ${round}  ${nameOf(job).padEnd(22)} ${changed.length === 0 ? '· stable' : `→ moved ${changed.length}: ${changed.join(', ')}`}`)
    }
    if (movedThisRound === 0 && !failed) {
      converged = true
      console.log(`\n✓ converged after ${round} round${round === 1 ? '' : 's'} — every generator reproduced its own output byte for byte.`)
      console.log('  THAT is the property worth automating: the derived layer has a fixed point, so two sessions')
      console.log('  regenerating in either order reach the same state and cannot undo each other.')
      break
    }
  }

  if (!converged && !failed) {
    const restless = [...new Set(results.filter((r) => r.moved.length).map((r) => r.job))]
    console.error(`\n✗ auto-improve — NO FIXED POINT after ${rounds} rounds. Still moving: ${restless.join(', ')}`)
    console.error('  A generator that never reproduces its own output is the defect, not the tree. The usual cause is')
    console.error('  a measured value sealed raw instead of as its decade — a wall-clock figure has no fixed point.')
  }

  // ── THE SITE MUST STILL RENDER ─────────────────────────────────────────────────────────────────────────────
  // A derived layer that converged and cannot be rendered has converged on something unusable, so the site build
  // is part of the improvement rather than a separate errand. It runs INSIDE the lock: vitepress fixes .temp and
  // dist per docs root, so two concurrent builds share one scratch directory, and holding the writer lock is
  // precisely the mutual exclusion that prevents it. The binary is spawned through THIS interpreter rather than
  // through `npx` — npx resolves to a .cmd shim on Windows and would need a shell, which is the host assumption
  // that broke gate-all in the first place.
  if (!failed) {
    const bin = join(ROOT, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
    if (!existsSync(bin)) {
      failed = true
      console.error(`\n✗ auto-improve — vitepress is not installed at ${bin}; run npm install.`)
      console.error('  The docs build is NOT skipped when it cannot run: a site that was never built must not report as one that did.')
    } else {
      console.log('\n  docs — building the site under the writer lock (one build at a time across sessions)')
      try {
        // THE HEAP IS PINNED HERE TOO, and it was not: `docs:build` spawns vitepress with
        // --max-old-space-size=8192 while this spawned it bare, so the same build that succeeds from the npm
        // script died of "Ineffective mark-compacts near heap limit" here and in the `audit` chain. The site is
        // ~3000 pages and the render retains per page; node's default ceiling is under what it needs. One flag,
        // in every place that spawns it, or the gate fails on a limit the working path does not have.
        execFileSync(process.execPath, ['--max-old-space-size=8192', bin, 'build', 'docs'], { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' })
        console.log('  ✓ docs — the site renders from the converged derived layer')
      } catch (e) {
        failed = true
        const err = e as { stdout?: string; stderr?: string; message?: string }
        console.error('  ✗ docs — vitepress build FAILED:')
        console.error('      ' + (err.stderr || err.stdout || err.message || 'unknown').trim().split('\n').slice(-8).join('\n      '))
        console.error('  If this is ERR_MODULE_NOT_FOUND on a .vitepress/.temp chunk, a PEER built concurrently —')
        console.error('  this run held the writer lock, so the other build was started by something that does not take it.')
      }
    }
  }
} finally {
  release(process.pid)
}

const changedFiles = [...new Set(results.flatMap((r) => r.moved))]
console.log(`\nsummary · ${results.length} generator runs · ${changedFiles.length} derived files moved · lock released`)
if (changedFiles.length) {
  console.log('  changed: ' + changedFiles.join(', '))
  console.log('  NOT staged and NOT committed — several sessions share this working tree, so which paths go into a')
  console.log('  commit is a decision only someone who knows whose work is whose can make.')
}
process.exit(failed || !converged ? 1 : 0)
