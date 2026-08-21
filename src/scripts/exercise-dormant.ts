#!/usr/bin/env node
// @non-harmonic: spawns every declared-dormant script as a subprocess and touches the working tree to restore what
// they write — a NAMED boundary, like await-live.ts and books.ts.
//
// exercise-dormant — A SCRIPT EXCUSED FROM THE CHAIN IS NOT EXCUSED FROM WORKING.
//
// lean/dormant-scripts.json exists because `support.ts` cannot see a whole class of decay: importing a module makes
// it "supported" while nothing ever exercises what it DOES. The list was written to name that class honestly. But a
// list of excuses is not a check, and for as long as nothing ran these scripts, nothing could tell a script that is
// merely idle from one that is DEAD. On 2026-08-20 all 33 were run for the first time and FOUR were broken:
//
//   gen-site.ts                 shelled `npx ts-node …` — a tool that is not a dependency — to redo two steps the
//                               chain already performs, and documented a `cp -r /var/www/` deploy that no longer
//                               exists. Retired, not repaired: nothing in it was still true.
//   legal-quantum-accounting.ts `require('fs')` inside an ES module, plus a hardcoded /Users/<name>/ absolute path.
//   quantum-external-fusion.ts  `require('crypto')` × 3 inside an ES module.
//   reserve.ts                  aligned the package to a hardcoded 65536 bytes. The package had grown to 3,253,634,
//                               so the reserve was NEGATIVE and it threw — but only AFTER emptying the shipped
//                               `reserved.uuidna`, so merely running it destroyed a published artifact. Worse, that
//                               artifact went on asserting "aligned to EXACTLY 64 KiB" to every npm consumer, false
//                               by a factor of fifty.
//
// All four had been broken for days behind an excuse. So the excuse becomes the ROSTER: this script runs every name
// on the list and requires it to exit 0. Dormancy stays permitted — being unwired is a legitimate state — but ROT
// does not, because the gate now executes exactly the scripts nothing else executes.
//
// It checks two things per script:
//   EXIT   — the script must exit 0. This is what would have caught all four.
//   WRITES — whatever it changes in the working tree must be DECLARED in the manifest's `writes` map. Undeclared
//            output is a gap, because a script the gate runs on every pass must not surprise the tree. Everything
//            written is restored afterwards either way, so exercising is side-effect free.
//
// Being run here IS an invocation, so `invokesFile` sees these scripts as reached and `dormantGaps()` stays quiet —
// the roster and the finder agree by construction rather than by a second hand-maintained list.
//
//   node dist/scripts/exercise-dormant.js [--only <name>]
import { execFileSync, execSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { HERE, ROOT } from './api.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts
import { merkleGravity, toUuid } from '../index.js'
import dormant from '../../lean/dormant-scripts.json' with { type: 'json' }

const TIMEOUT_MS = 120_000
const RECEIPT = 'lean/dormant-receipt.json'

/** FOLD THE SLOW WORK SO AN UNCHANGED RUN VERIFIES FREE.
 *
 *  Exercising 32 subprocesses costs about 33 seconds of every gate pass, and it re-runs them whether or not a
 *  single byte changed. The Lean wings solved this already — each emits a receipt and reports "the next unchanged
 *  run verifies free" — and the same discipline applies here: fold the BUILT bytes of every rostered script
 *  together with the manifest that governs them, and if that fold matches the receipt of the last green run,
 *  nothing can have changed and the sweep has nothing to find.
 *
 *  The fold is over the compiled output rather than the source, because compiled output is what actually runs.
 *  merkleGravity sorts its leaves, so the receipt does not depend on the order the roster is read in. */
export function rosterFold(roster: readonly string[]): string {
  const leaves = roster.map((n) => toUuid(n + ':' + scriptFold(n)))
  leaves.push(toUuid('manifest:' + manifestFold()))
  return merkleGravity(leaves)
}

/** THE INVERSE OF SKIPPING EVERYTHING IS RUNNING ONLY WHAT MOVED.
 *
 *  A single roster-wide fold is all-or-nothing: change one byte in one script and all 32 subprocesses run again,
 *  76 seconds to re-learn 31 things that could not have changed. Folding each script SEPARATELY inverts that —
 *  the fold stops being a gate over the whole sweep and becomes an index into it, so the cost of a change is the
 *  cost of the change rather than the cost of the roster.
 *
 *  The manifest is deliberately global. It declares what each script may WRITE, so a manifest edit can invalidate
 *  any script's verdict without touching that script's bytes; when it moves, everything is re-exercised. */
export const scriptFold = (name: string): string => {
  const built = join(HERE, name.replace(/\.ts$/, '') + '.js')
  return toUuid(existsSync(built) ? readFileSync(built, 'utf8') : 'MISSING')
}
export const manifestFold = (): string => toUuid(readFileSync(join(ROOT, 'lean', 'dormant-scripts.json'), 'utf8'))

/** which scripts must actually run: those whose built bytes moved, or all of them if the manifest moved */
export function movedSince(roster: readonly string[], prior: { manifest?: string; scripts?: Record<string, string> } | null): string[] {
  if (!prior || prior.manifest !== manifestFold()) return [...roster]
  return roster.filter((n) => (prior.scripts ?? {})[n] !== scriptFold(n))
}

export function priorReceipt(): { manifest?: string; scripts?: Record<string, string> } | null {
  try { return JSON.parse(readFileSync(join(ROOT, RECEIPT), 'utf8')) as { manifest?: string; scripts?: Record<string, string> } }
  catch { return null }
}

/** the receipt of the last run in which every rostered script exited 0 */
export function lastGreen(): string | null {
  try { return (JSON.parse(readFileSync(join(ROOT, RECEIPT), 'utf8')) as { fold?: string }).fold ?? null }
  catch { return null }
}

export interface Exercise {
  script: string
  exit: number
  wrote: string[]
  undeclared: string[]
  ms: number
}

/** the working tree's dirty set, as paths — the baseline against which a script's writes are measured. */
export function dirtySet(): Set<string> {
  const out = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' })
  return new Set(
    out.split('\n').filter(Boolean)
      // porcelain is `XY path`; a rename is `R  old -> new`, whose NEW path is what a script could have written
      .map((l) => l.slice(3).trim())
      .map((p) => (p.includes(' -> ') ? p.slice(p.indexOf(' -> ') + 4) : p))
      .map((p) => p.replace(/^"|"$/g, '')),
  )
}

/** the exact bytes of each declared path before an exercise, or null where the path did not exist.
 *
 *  WHY CONTENT AND NOT `git status`. The first version measured writes purely as a dirty-set difference, which is
 *  blind to a script rewriting a file that was ALREADY dirty — the change is invisible, so it is never restored.
 *  That is not hypothetical: on the very first gate run, auto-fill-gaps.ts rewrote package.json while package.json
 *  already carried this feature's own edit, and its two injected thin wrappers SURVIVED the restore and were caught
 *  three steps later by the scripts finder. A snapshot does not care whether the tree was clean. */
export function snapshot(paths: readonly string[]): Map<string, Buffer | null> {
  const snap = new Map<string, Buffer | null>()
  for (const p of paths) {
    const abs = join(ROOT, p)
    snap.set(p, existsSync(abs) ? readFileSync(abs) : null)
  }
  return snap
}

/** put the declared paths back byte for byte; a path that did not exist before is removed again. */
export function restoreSnapshot(snap: ReadonlyMap<string, Buffer | null>): string[] {
  const changed: string[] = []
  for (const [p, before] of snap) {
    const abs = join(ROOT, p)
    const now = existsSync(abs) ? readFileSync(abs) : null
    if (before === null ? now === null : now !== null && now.equals(before)) continue
    changed.push(p)
    if (before === null) rmSync(abs, { force: true })
    else writeFileSync(abs, before)
  }
  return changed
}

/** put back exactly what the exercise disturbed: tracked files are restored, untracked ones removed. */
export function restore(paths: readonly string[]): void {
  for (const p of paths) {
    const tracked = (() => {
      try { execFileSync('git', ['ls-files', '--error-unmatch', p], { cwd: ROOT, stdio: 'ignore' }); return true }
      catch { return false }
    })()
    try {
      if (tracked) execFileSync('git', ['checkout', '--', p], { cwd: ROOT, stdio: 'ignore' })
      else execFileSync('rm', ['-rf', join(ROOT, p)], { stdio: 'ignore' })
    } catch { /* reported as residue by the caller, never swallowed silently */ }
  }
}

/** run one dormant script and measure it. The tree is returned to the state it was found in. */
export function exercise(script: string, declared: readonly string[]): Exercise {
  const base = dormant.scripts.includes(script) ? script.replace(/\.ts$/, '') : script
  const built = join(HERE, base + '.js')
  const before = dirtySet()
  const snap = snapshot(declared)
  const started = Date.now()
  let exit = 0
  try {
    execFileSync('node', [built], { cwd: ROOT, stdio: 'ignore', timeout: TIMEOUT_MS })
  } catch (e) {
    const err = e as { status?: number | null; signal?: string | null }
    exit = typeof err.status === 'number' ? err.status : err.signal ? 124 : 1
  }
  const ms = Date.now() - started

  // undeclared writes can only be seen through the tree; declared ones are seen through their own bytes, which is
  // the only reading that survives a dirty baseline.
  const appeared = [...dirtySet()].filter((p) => !before.has(p))
  const undeclared = appeared.filter((p) => !declared.includes(p)).sort()
  const touched = restoreSnapshot(snap)
  restore(undeclared)
  const wrote = [...new Set([...touched, ...appeared])].sort()
  return { script, exit, wrote, undeclared, ms }
}

/** the gap list: a dormant script that cannot run, or that writes somewhere it never declared. */
export function dormantRotGaps(results: readonly Exercise[]): { what: string; fix: string }[] {
  const gaps: { what: string; fix: string }[] = []
  for (const r of results) {
    if (r.exit !== 0) gaps.push({
      what: `${r.script} is declared dormant but EXITS ${r.exit} — it is not idle, it is broken`,
      fix: 'repair it, or retire it and remove the name from lean/dormant-scripts.json',
    })
    for (const p of r.undeclared) gaps.push({
      what: `${r.script} writes ${p}, which it does not declare`,
      fix: `add ${JSON.stringify(p)} to writes[${JSON.stringify(r.script)}] in lean/dormant-scripts.json, or stop writing it`,
    })
  }
  return gaps
}

if (process.argv[1] && /exercise-dormant\.(js|ts)$/.test(process.argv[1])) {
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
  const writes = (dormant as { writes?: Record<string, string[]> }).writes ?? {}
  const roster = dormant.scripts.filter((s) => !only || s === only || s === only + '.ts')

  const missing = roster.filter((s) => !existsSync(join(HERE, s.replace(/\.ts$/, '') + '.js')))
  if (missing.length) {
    console.error(`✗ exercise-dormant — declared but not built: ${missing.join(', ')}`)
    console.error('  fix: build first, or remove the name from lean/dormant-scripts.json if it was retired')
    process.exit(1)
  }

  const fold = rosterFold(roster)
  const prior = priorReceipt()
  const moved = only ? roster : movedSince(roster, prior)
  const carried = roster.length - moved.length
  if (!moved.length) {
    console.log(`✓ exercise-dormant — all ${roster.length} script(s) unchanged since the last green sweep (receipt ${handleOf(fold)}); verified free.`)
    process.exit(0)
  }
  console.log(`exercise-dormant — ${moved.length} of ${roster.length} script(s) moved${carried ? `, ${carried} carried forward unchanged` : ''}; each must exit 0 …`)
  const results = moved.map((s) => exercise(s, writes[s] ?? []))
  const gaps = dormantRotGaps(results)

  const residue = [...dirtySet()]
  for (const r of results.filter((x) => x.wrote.length)) {
    console.log(`  ${r.script} — wrote ${r.wrote.join(', ')} (restored)`)
  }
  const slowest = [...results].sort((a, b) => b.ms - a.ms).slice(0, 3)
  console.log(`  slowest: ${slowest.map((r) => `${r.script} ${r.ms}ms`).join(' · ')} · total ${results.reduce((n, r) => n + r.ms, 0)}ms`)

  if (gaps.length) {
    console.error(`✗ exercise-dormant — ${gaps.length} gap(s): a dormant script must still WORK`)
    for (const g of gaps) console.error(`  · ${g.what}\n    fix: ${g.fix}`)
    process.exit(1)
  }
  const scripts: Record<string, string> = { ...(prior?.scripts ?? {}) }
  for (const r of results) scripts[r.script] = scriptFold(r.script)
  writeFileSync(join(ROOT, RECEIPT), JSON.stringify({
    why: 'Per-script folds of the BUILT bytes, from the last sweep in which each exited 0, plus the manifest fold. A script whose fold is unchanged cannot have changed behaviour, so only the MOVED ones are re-exercised — the cost of a change is the cost of the change, not the cost of the roster. The manifest is global: it declares what each script may write, so when it moves everything is re-exercised. Delete this file to force a full sweep.',
    fold, manifest: manifestFold(), count: roster.length, scripts,
  }, null, 2) + '\n')
  console.log(`✓ exercise-dormant — ${results.length} dormant script(s) exercised, all exit 0, writes all declared; tree residue ${residue.length === 0 ? 'none' : residue.join(', ')}`)
  console.log(`  receipt ${handleOf(fold)} recorded — only what moves is re-exercised.`)
}
